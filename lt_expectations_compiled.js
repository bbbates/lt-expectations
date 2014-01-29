if(!lt.util.load.provided_QMARK_('lt.plugins.lt-expectations')) {
goog.provide('lt.plugins.lt_expectations');
goog.require('cljs.core');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.tabs');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
goog.require('lt.plugins.watches');
goog.require('lt.plugins.watches');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.tabs');
goog.require('lt.objs.editor');
goog.require('lt.objs.command');
lt.plugins.lt_expectations.clj_lang = lt.object.create.call(null,new cljs.core.Keyword(null,"langs.clj","langs.clj",2528862058));
lt.plugins.lt_expectations.append_run_all_tests = (function append_run_all_tests(editor){var curr_ns = new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)));return [cljs.core.str(lt.plugins.watches.watched_range.call(null,editor,null,null,(cljs.core.truth_(lt.object.has_tag_QMARK_.call(null,editor,new cljs.core.Keyword(null,"editor.cljs","editor.cljs",4270230213)))?lt.plugins.lt_expectations.cljs_watch:lt.plugins.lt_expectations.clj_watch))),cljs.core.str("(run-all-tests #\"^"),cljs.core.str(curr_ns),cljs.core.str("$\")")].join('');
});
lt.plugins.lt_expectations.__BEH__expect_result = (function __BEH__expect_result(obj,res){return cljs.core.println.call(null,">>>>",res);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.lt-expectations","expect-result","lt.plugins.lt-expectations/expect-result",1538268661),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.lt_expectations.__BEH__expect_result,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.result.expect","editor.eval.clj.result.expect",1319666046),null], null), null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.lt-expectations","run-expectations-curr-file","lt.plugins.lt-expectations/run-expectations-curr-file",4026242247),new cljs.core.Keyword(null,"desc","desc",1016984067),"Expectations: Run expectations in current file",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;return lt.object.raise.call(null,lt.plugins.lt_expectations.clj_lang,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),ed,new cljs.core.Keyword(null,"info","info",1017141280),cljs.core.assoc.call(null,cljs.core.deref.call(null,ed).call(null,new cljs.core.Keyword(null,"info","info",1017141280)),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"expect","expect",4019707851)], null),new cljs.core.Keyword(null,"print-length","print-length",3960797560),lt.object.raise_reduce.call(null,ed,new cljs.core.Keyword(null,"clojure.print-length+","clojure.print-length+",4366367949),null),new cljs.core.Keyword(null,"code","code",1016963423),lt.plugins.lt_expectations.append_run_all_tests.call(null,ed))], null));
} else
{return null;
}
})], null));
}

//# sourceMappingURL=lt_expectations_compiled.js.map