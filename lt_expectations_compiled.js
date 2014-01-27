if(!lt.util.load.provided_QMARK_('lt.plugins.lt-expectations')) {
goog.provide('lt.plugins.lt_expectations');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.command');
goog.require('lt.objs.tabs');
goog.require('lt.objs.tabs');
goog.require('lt.object');
goog.require('lt.object');
lt.plugins.lt_expectations.hello_panel = (function hello_panel(this$){var e__7931__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",1013907515),"Boo yeah!"], null));var seq__8175_8181 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,cljs.core.PersistentVector.EMPTY));var chunk__8176_8182 = null;var count__8177_8183 = 0;var i__8178_8184 = 0;while(true){
if((i__8178_8184 < count__8177_8183))
{var vec__8179_8185 = cljs.core._nth.call(null,chunk__8176_8182,i__8178_8184);var ev__7932__auto___8186 = cljs.core.nth.call(null,vec__8179_8185,0,null);var func__7933__auto___8187 = cljs.core.nth.call(null,vec__8179_8185,1,null);lt.util.dom.on.call(null,e__7931__auto__,ev__7932__auto___8186,func__7933__auto___8187);
{
var G__8188 = seq__8175_8181;
var G__8189 = chunk__8176_8182;
var G__8190 = count__8177_8183;
var G__8191 = (i__8178_8184 + 1);
seq__8175_8181 = G__8188;
chunk__8176_8182 = G__8189;
count__8177_8183 = G__8190;
i__8178_8184 = G__8191;
continue;
}
} else
{var temp__4092__auto___8192 = cljs.core.seq.call(null,seq__8175_8181);if(temp__4092__auto___8192)
{var seq__8175_8193__$1 = temp__4092__auto___8192;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8175_8193__$1))
{var c__7307__auto___8194 = cljs.core.chunk_first.call(null,seq__8175_8193__$1);{
var G__8195 = cljs.core.chunk_rest.call(null,seq__8175_8193__$1);
var G__8196 = c__7307__auto___8194;
var G__8197 = cljs.core.count.call(null,c__7307__auto___8194);
var G__8198 = 0;
seq__8175_8181 = G__8195;
chunk__8176_8182 = G__8196;
count__8177_8183 = G__8197;
i__8178_8184 = G__8198;
continue;
}
} else
{var vec__8180_8199 = cljs.core.first.call(null,seq__8175_8193__$1);var ev__7932__auto___8200 = cljs.core.nth.call(null,vec__8180_8199,0,null);var func__7933__auto___8201 = cljs.core.nth.call(null,vec__8180_8199,1,null);lt.util.dom.on.call(null,e__7931__auto__,ev__7932__auto___8200,func__7933__auto___8201);
{
var G__8202 = cljs.core.next.call(null,seq__8175_8193__$1);
var G__8203 = null;
var G__8204 = 0;
var G__8205 = 0;
seq__8175_8181 = G__8202;
chunk__8176_8182 = G__8203;
count__8177_8183 = G__8204;
i__8178_8184 = G__8205;
continue;
}
}
} else
{}
}
break;
}
return e__7931__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.lt-expectations","lt-expectations.hello","lt.plugins.lt-expectations/lt-expectations.hello",4669236260),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lt-expectations.hello","lt-expectations.hello",776282546)], null),new cljs.core.Keyword(null,"name","name",1017277949),"lt-expectations",new cljs.core.Keyword(null,"init","init",1017141378),(function (this$){return lt.plugins.lt_expectations.hello_panel.call(null,this$);
}));
lt.plugins.lt_expectations.__BEH__on_close_destroy = (function __BEH__on_close_destroy(this$){var temp__4092__auto___8206 = new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",3378091779).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));if(cljs.core.truth_(temp__4092__auto___8206))
{var ts_8207 = temp__4092__auto___8206;if(cljs.core._EQ_.call(null,cljs.core.count.call(null,new cljs.core.Keyword(null,"objs","objs",1017308622).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ts_8207))),1))
{lt.objs.tabs.rem_tabset.call(null,ts_8207);
} else
{}
} else
{}
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"destroy","destroy",2571277164));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.lt-expectations","on-close-destroy","lt.plugins.lt-expectations/on-close-destroy",3909406027),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.lt_expectations.__BEH__on_close_destroy,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close","close",1108660586),null], null), null));
lt.plugins.lt_expectations.hello = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.lt-expectations","lt-expectations.hello","lt.plugins.lt-expectations/lt-expectations.hello",4669236260));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.lt-expectations","say-hello","lt.plugins.lt-expectations/say-hello",2665447956),new cljs.core.Keyword(null,"desc","desc",1016984067),"lt-expectations: Say Hello",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.objs.tabs.add_or_focus_BANG_.call(null,lt.plugins.lt_expectations.hello);
})], null));
}

//# sourceMappingURL=lt_expectations_compiled.js.map