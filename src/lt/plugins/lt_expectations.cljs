(ns lt.plugins.lt-expectations
	(:require [lt.object :as object]
						[lt.objs.tabs :as tabs]
						[lt.objs.command :as cmd]
						[lt.objs.editor	:as editor]
						[lt.plugins.watches :as watches]
						[lt.objs.editor.pool :as editor-pool]
						[cljs.reader :as reader])
  (:require-macros [lt.macros :refer [behavior]]))


(defn- run-expectations
	[namespace-name]
	(let [exec `'(let [ns-pattern# (re-pattern (str "^" ~(str namespace-name) "$"))]
								 (with-redefs [expectations/colorize-choice (constantly false)] ;; we don't want the ansi colour symbols in our results
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
	(let [exec `'(remove-ns '~namespace-name)]
		(pr-str (second exec))))

(def clj-lang (object/create :langs.clj))

;; TODO: bind our own reporters, and dump out the results we need to be able to inline the results in the editor
(defn- append-run-all-tests
	[editor]
	(let [curr-ns (-> @editor :info :ns)]
		(str "(System/getenv \"EXPECTATIONS_COLORIZE\")"
		 		(remove-expectations-ns curr-ns)
		 		(watches/watched-range
					editor
					nil
					nil (if (object/has-tag? editor :editor.cljs)
								cljs-watch
								clj-watch))
				 (run-expectations curr-ns))))


;;TODO: create macro that binds the fail and summary functions
;; fail func will add failure details to atomic set
;; maybe an easier way would be once tests are finished, to look at the metadata that expectations puts on the test vars?
;; (reader/read-string "({:status [:fail \"[36m(expect 2 (+ 1 1000))\n[0m\n           expected: 2 \n                was: 1001\" 12],  :name G__11007, :expectation true, :column 1, :expectations/run true, :line 12, :file \"/Users/brendan/dev/icm/lt-expectations/test/lt_expectations/test_expects.clj\"} {:status [:success \"\" 6], :name G__10997, :expectation true, :column 1, :expectations/run true, :line 6, :file \"/Users/brendan/dev/icm/lt-expectations/test/lt_expectations/test_expects.clj\"})")

(behavior ::expect-result
					:triggers #{:editor.eval.clj.result.expect}
					:reaction (fn [obj res]
											(println res)
											(let [expect-results (reader/read-string (:result (last (:results res))))]
												(doseq [result expect-results]
													(let [loc {:line (dec (:line result))
																		 :ch 0 :start-line (dec (:line result))}]
														(if (= :success (first (:status result)))
															(object/raise obj :editor.result "<<< Pass >>>" loc)
															(object/raise obj :editor.exception (second (:status result)) loc))))

												)
												)


											)



(cmd/command {:command ::run-expectations-curr-file
              :desc "Expectations: Run expectations in current file"
              :exec (fn []
											(when-let [ed (editor-pool/last-active)]
												(object/add-behavior! ed ::expect-result) ;;FIXME: shouldn't have to do this!
												(object/raise clj-lang :eval!
											 {:origin ed
												:info (assoc (@ed :info)
																:meta {:result-type :expect}
																:print-length (object/raise-reduce ed :clojure.print-length+ nil)
																:code (append-run-all-tests ed))})))})





;; TODO:
;; - behaviour for running expects in current file
;; - show tick next to passed tests
;; - use notifos? to show test test failure summary
;; - show failure reason next to failed expect
;; - obj/raise to show result in editor....see https://github.com/LightTable/Clojure/blob/master/src/lt/plugins/clojure.cljs#L325
