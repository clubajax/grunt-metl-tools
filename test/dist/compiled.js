(function (define) {
	define(["dom", "on"], function (dom, on) {

    "use strict";

    function main () {

    }



    function sub1 () {

    }



    function sub2 () {

    }

	});
}(
	typeof define === "function" && define.amd ? define : function (ids, factory) {
		var deps = ids.map(function (id) {
		return typeof require === "function" ? require(id) : window[id];
	});
	typeof module !== "undefined" ? module.exports = factory.apply(null, deps) : factory.apply(null, deps);
	}
));