var DatatableReporteCombustible = function () {

    var initPickers = function () {
        //init date pickers
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            autoclose: true
        });
    }

    var handleRecords = function () {

        var grid = new Datatable();

        grid.init({
            src: $("#datatable_ajax"),
            onSuccess: function (grid) {
                // execute some code after table records loaded
            },
            onError: function (grid) {
                // execute some code on network or other general error  
            },
            loadingMessage: 'Cargando...',
            dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 

                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/scripts/datatable.js). 
                // So when dropdowns used the scrollable div should be removed. 
                "dom": "<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r>t<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>>",
                
				"language": {
					"aria": {
						"sortAscending": ": activate to sort column ascending",
						"sortDescending": ": activate to sort column descending"
					},
					"emptyTable": "No data available in table",
					"info": "Mostrando _START_ al _END_ de _TOTAL_ registros",
					"infoEmpty": "No entries found",
					"infoFiltered": "(filtered1 de _MAX_ total registros)",
					"lengthMenu": "Mostrar _MENU_ registros",
					"search": "Buscar:",
					"zeroRecords": "No se encontraron registros con los criterios de busqueda",
					"paginate": {
						"first":      "First",
						"last":       "Last",
						"next":       "Next",
						"previous":   "Previous"
					}
				},
				
                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
				"bAutoWidth": true,
				/*'aoColumnDefs':[
					{"bSortable":false, "aTargets":[2,3,5,6]},
					{"aTargets":[7], "sType":'pin-group'}
				],*/
				

				/*
				buttons: [
					{ extend: 'print', className: 'btn yellow', text: 'Imprimir' },
					{ extend: 'pdf', className: 'btn green', text: 'Exportar PDF' },
					{ extend: 'excel', className: 'btn blue', text: 'Exportar EXCEL' },
					{ extend: 'csv', className: 'btn purple ', text: 'Exportar CSV | Transparencia' },
					{ extend: 'colvis', className: 'btn dark', text: 'Columnas'}
				],
				
				"sDom": 'T<"clear">lfrtip',
				"oTableTools": {
					"aButtons": [
						"copy",
						"print",
						{
							"sExtends":    "collection",
							"sButtonText": "Save",
							"aButtons":    [ "csv", "xls", "pdf" ]
						}
					]
				},*/
				"sDom": 'T<"clear">lfrtip',
				"sPlaceHolder": "head:after",
                "lengthMenu": [
                    [10, 20, 50, 100, 150, -1],
                    [10, 20, 50, 100, 150, "Todo"] // change per page values here
                ],
                "pageLength": 10, // default record count per page
                "ajax": {
                    "url": "js/database/ReporteCombustible.php", // ajax source
                },
                /*"order": [
                    [1, "asc"],
                ] */// set first column as a default sort by asc
				order: [[1, 'asc']],
			    columnDefs: [{
				  targets: "_all",
				  orderable: false
			    }]
            }
        });

        // handle group actionsubmit button click
        grid.getTableWrapper().on('click', '.table-group-action-submit', function (e) {
            e.preventDefault();
            var action = $(".table-group-action-input", grid.getTableWrapper());
            if (action.val() != "" && grid.getSelectedRowsCount() > 0) {
                grid.setAjaxParam("customActionType", "group_action");
                grid.setAjaxParam("customActionName", action.val());
                grid.setAjaxParam("id", grid.getSelectedRows());
                grid.getDataTable().ajax.reload();
                grid.clearAjaxParams();
            } else if (action.val() == "") {
                App.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: 'Please select an action',
                    container: grid.getTableWrapper(),
                    place: 'prepend'
                });
            } else if (grid.getSelectedRowsCount() === 0) {
                App.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: 'No record selected',
                    container: grid.getTableWrapper(),
                    place: 'prepend'
                });
            }
        });
    }

    return {

        //main function to initiate the module
        init: function () {

            initPickers();
            handleRecords();
        }

    };

}();