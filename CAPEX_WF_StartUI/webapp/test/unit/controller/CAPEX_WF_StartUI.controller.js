/*global QUnit*/

sap.ui.define([
	"sap/wf/demo/CAPEX_WF_StartUI/controller/CAPEX_WF_StartUI.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CAPEX_WF_StartUI Controller");

	QUnit.test("I should test the CAPEX_WF_StartUI controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
