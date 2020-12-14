sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageBox"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller) {
        "use strict";
        
        var oController;
        var orderBusyDialog;
        var oSuccessMessageDialog;

		return Controller.extend("sap.wf.demo.CAPEX_WF_StartUI.controller.CAPEX_WF_StartUI", {
			onInit: function () {

                oController = this;

                var workflowModel = new sap.ui.model.json.JSONModel();
                workflowModel.loadData("/capexwfstartui.sapwfdemoCAPEX_WF_StartUI/model/StartPayload.json", null, false);
                oController.getView().setModel(workflowModel);

            },
            
            onStartPress: function (oEvent) {
                // create busy dialog
                orderBusyDialog = new sap.m.BusyDialog();
                orderBusyDialog.open();

                var startContext = oController.getView().getModel().oData;
                var workflowStartPayload = {definitionId: "CAPEX_WF_Workflow", context: startContext}

                // Start workflow 
                $.ajax({
                    url: "/capexwfstartui.sapwfdemoCAPEX_WF_StartUI/bpmworkflowruntime/v1/xsrf-token",
                    method: "GET",
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (result, xhr, data) {
                        var token = data.getResponseHeader("X-CSRF-Token");
                        if (token === null) return;
 
                        // Start workflow 
                        $.ajax({
                            url: "/capexwfstartui.sapwfdemoCAPEX_WF_StartUI/bpmworkflowruntime/v1/workflow-instances",
                            type: "POST",
                            data: JSON.stringify(workflowStartPayload),
                             headers: {
                                "X-CSRF-Token": token,
                                "Content-Type": "application/json"
                            },
                            async: false,
                            success: function (data) {
                                orderBusyDialog.close();
                                sap.m.MessageBox.information("The workflow is started");
                            },
                            error: function (data) {
                                orderBusyDialog.close();
                            }
                        });
                    }
                });
            }

		});
	});
