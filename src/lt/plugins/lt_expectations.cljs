(ns lt.plugins.lt-expectations
	(:require [lt.object :as object]
						[lt.objs.tabs :as tabs]
						[lt.objs.command :as cmd]
						[lt.objs.editor	:as editor]
						[lt.objs.notifos :as notifos]
						[lt.plugins.watches :as watches]
						[lt.objs.editor.pool :as editor-pool]
						[cljs.reader :as reader])
  (:require-macros [lt.macros :refer [behavior]]))


(defn- run-expectations
	[namespace-name]
	(let [exec `'(let [ns-pattern# (re-pattern (str "^" ~(str namespace-name) "$"))]
								 (with-redefs [expectations/colorize-choice (constantly false)
															 expectations/show-raw-choice (constantly false)] ;; we don't want the ansi colour symbols in our results
									 (binding [expectations/summary (fn [msg#])
														 expectations/fail (fn [test-name# test-meta# msg#])]
										 (expectations/run-all-tests ns-pattern#)
										 (->> (symbol '~namespace-name)
													ns-interns
													vals
													(filter #(:expectation (meta %)))
													(map meta)
													(map #(assoc % :ns (ns-name (:ns %))))))))] ;; cljs reader can't read namespace objects refs, for obvious reasons
		(pr-str (second exec))))

(defn- remove-expectations-ns
	[namespace-name]
	(let [exec `'(when (find-ns '~namespace-name) (remove-ns '~namespace-name))]
		(pr-str (second exec))))

(def clj-lang (object/create :lt.plugins.clojure/langs.clj))

(defn- append-run-all-tests
	[editor]
	(let [curr-ns (-> @editor :info :ns)]
		(str
		 		(remove-expectations-ns curr-ns)
		 		(watches/watched-range
					editor
					nil
					nil (if (object/has-tag? editor :editor.cljs)
								cljs-watch
								clj-watch))
				 (run-expectations curr-ns))))

(defn- update-status-bar
	[failures passed other-results]
	(let [errors (filter :ex other-results)]
		(cond
		 (seq errors) (notifos/set-msg!
									 (str "✘ Compilation errors found in expectations file.")
									 {:class "error"})
		 (and (empty? failures) (empty? passed)) (notifos/set-msg!
																							(str "✘ No expectations found in file")
																							{:class "error"})
		 (seq failures) (notifos/set-msg!
										 (str "✘ Expectation failures! Failed: " (count failures) ", Passed: " (count passed))
										 {:class "error"})
		 :else (notifos/set-msg!
						"✔︎ All expectations passed"
						{:class "result"}))))

(defn- handle-other-results
	[obj other-results]
	(object/raise obj :editor.eval.clj.result.inline {:results other-results}))

(defn- handle-results
	[obj res]
	(let [expect-results (reader/read-string (:result (last (:results res))))
				other-results (butlast (:results res))
				failures (filter #(not= :success (first (:status %))) expect-results)
				passed (filter #(= :success (first (:status %))) expect-results)]
		(do
			(handle-other-results obj other-results)
			(update-status-bar failures passed other-results)
			(doseq [result expect-results]
				(let [loc {:line (dec (:line result))
									 :ch 0 :start-line (dec (:line result))}]
					(if (= :success (first (:status result)))
						(object/raise obj :editor.result "✔︎" loc)
						(object/raise obj :editor.exception (second (:status result)) loc)))))))


(behavior ::expect-result
					:triggers #{:editor.eval.clj.result.expect}
					:desc "Report expectation results to the clojure editor"
					:reaction (fn [obj res]
											(handle-results obj res)))

(defn- eval-expectations
	[ed]
	(object/raise clj-lang :eval!
								{:origin ed
								 :info (assoc (@ed :info)
												 :meta {:result-type :expect}
												 :print-length (object/raise-reduce ed :clojure.print-length+ nil)
												 :code (append-run-all-tests ed))}))

(behavior ::expect-after-eval
					:triggers #{:editor.eval.clj.result}
					:reaction (fn [ed res]
											(object/rem-behavior! ed ::expect-after-eval)
											(eval-expectations ed)))


(cmd/command {:command ::run-expectations-curr-file
              :desc "Expectations: Run expectations in current file"
              :exec (fn []
											(when-let [ed (editor-pool/last-active)]
												(object/add-behavior! ed ::expect-result) ;;FIXME: shouldn't have to do this!
												(if (-> @ed :info :ns nil?)
													(do (object/raise ed :eval)
														(object/add-behavior! ed ::expect-after-eval))
													(eval-expectations ed))))})

;; TODO:
;; - run all expectations in project
