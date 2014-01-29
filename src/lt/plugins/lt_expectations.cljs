(ns lt.plugins.lt-expectations
	(:require [lt.object :as object]
						[lt.objs.tabs :as tabs]
						[lt.objs.command :as cmd]
						[lt.objs.editor	:as editor]
						[lt.plugins.watches :as watches]
						[lt.objs.editor.pool :as editor-pool])
  (:require-macros [lt.macros :refer [behavior]]))


(def clj-lang (object/create :langs.clj))

;; TODO: bind our own reporters, and dump out the results we need to be able to inline the results in the editor
(defn- append-run-all-tests
	[editor]
	(let [curr-ns (-> @editor :info :ns)]
		(str (watches/watched-range
					editor
					nil
					nil (if (object/has-tag? editor :editor.cljs)
								cljs-watch
								clj-watch))
				 "(run-all-tests #\"^" curr-ns "$\")")))


(behavior ::expect-result
					:triggers #{:editor.eval.clj.result.expect}
					:reaction (fn [obj res]
											(println ">>>>" res)))



(cmd/command {:command ::run-expectations-curr-file
              :desc "Expectations: Run expectations in current file"
              :exec (fn []
											(when-let [ed (editor-pool/last-active)]
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
