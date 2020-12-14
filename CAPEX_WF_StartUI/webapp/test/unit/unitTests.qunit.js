/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sap/wf/demo/CAPEX_WF_StartUI/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
