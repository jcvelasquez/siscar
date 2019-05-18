/* Setup general page controller */
angular.module('MetronicApp').controller('ListarFichasTecnicasController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {   
    	// initialize core components
    	//DATOS DE LOGIN PARA TODAS LAS PAGINAS
		App.initAjax();
		
		//DATOS DE LOGIN PARA TODAS LAS PAGINAS
		$rootScope.settings.sesion = AppSiscar.getSesion();
		//FINALIZACION DE DATOS PARA TODAS LAS PAGINAS
if (typeof($rootScope.settings.sesion) != 'undefined'){
if($rootScope.settings.sesion.authorize == null || $rootScope.settings.sesion.authorize == false) $rootScope.$state.go('login');
}else{
$rootScope.$state.go('login');
}
		

    	// set default layout mode
    	$rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
		
		/*******************************************/
		/*      	DATATABLES Y FUNCIONES		   */
		/*******************************************/
        var grid = new Datatable();
			
        grid.init({
            src: $("#datatable_vehiculos"),
            onSuccess: function (table) {	
                
            },
            onError: function (grid) {
				//console.log(grid);
            },
            loadingMessage: 'Cargando...',
            dataTable: { 
                "language": {
                    "aria": {
                        "sortAscending": ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    },
                    "emptyTable": "No hay registros disponibles en la tabla",
                    "info": "Mostrando _START_ al _END_ de _TOTAL_ registros",
                    "infoEmpty": "No se encontraron registros",
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
                "bStateSave": true, 
				"buttons": [
					{ extend: 'print', className: 'btn default' },
					{ extend: 'copy', className: 'btn default' },
					{ extend: 'pdf', className: 'btn default' },
					{ extend: 'excel', className: 'btn default' },
					{ extend: 'csv', className: 'btn default' },
					{
						text: 'Reload',
						className: 'btn default',
						action: function ( e, dt, node, config ) {
							dt.ajax.reload();
							swal("Actualizada!", "El listado de tickets se actualizo correctamente.", "success");
						}
					}
				],
                "sDom": 'T<"clear">lfrtip',
				"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
				"serverSide": true,
                "lengthMenu": [
                    [10, 20, 50, -1],
                    [10, 20, 50, "Todo"] // change per page values here
                ],
                "processing": true,
                "pageLength": 10, // default record count per page
                "ajax": {
                    url: "database/FichaTecnicaGet.php?action_type=list", // ajax source
                    dataSrc: "data"
                },
                columns: [		
						{
							  "mData": null,
							  "bSortable": true,
							  "mRender": function(data, type, full) {
										return '<a href=#/private/ficha_tecnica/' + data['idvehiculos'] + '>' + data['placa_vehiculo'] + '</a>';
													
							  }
						},
						{ data : "descripcion_vehiculo" },
						{ data : "nombre_sede" },
						{ data : "marca_vehiculo" },
						{ data : "modelo_vehiculo" },
						{ data : "ano_fabricacion" },
						{ data : "kilometraje_inicio" },
                        {
                          "mData": null,
                          "bSortable": false,
                          "mRender": function(data, type, full) {
							  
							  return '<a class="btn btn-sm btn-info" href=#/private/ficha_tecnica/' + data['idvehiculos'] + '><i class="fa fa-car"></i>  Ver ficha técnica</a>';

       
                          }
                        }
						
                ]
                
            }
        });
		/*
		var tableWrapper = jQuery('#datatable_tickets_wrapper');

		tableWrapper.find('.group-checkable').change(function () {
			
			var set = jQuery(this).attr("data-set");
			var checked = jQuery(this).is(":checked");
			
			jQuery(set).each(function () {
				if (checked) {
					$(this).prop("checked", true);
					$(this).parents('tr').addClass("active");
				} else {
					$(this).prop("checked", false);
					$(this).parents('tr').removeClass("active");
				}
			});
		});

		tableWrapper.on('change', 'tbody tr .checkboxes', function () {
			$(this).parents('tr').toggleClass("active");
		});
		
		*/
		$('#datatable_ajax_tools > li > a.tool-action').on('click', function() {
			var action = $(this).attr('data-action');
			grid.getDataTable().button(action).trigger();
		});
		/*******************************************/
		/*      	DATATABLES Y FUNCIONES		   */
		/*******************************************/
		
		
		/*******************************/
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_vehiculos tbody').on( 'click', 'a.mt-sweetalert', function () {
			
			var data = grid.getDataTable().row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
										
					swal({
					  title: "¡Esta seguro?",
					  text: "Una vez eliminada, no será posible recuperar la información!",
					  type: "warning",
					  showCancelButton: true,
					  confirmButtonClass: "btn-success",
					  confirmButtonText: "Si, eliminar!",
					  cancelButtonText: "Cancelar",
					  closeOnConfirm: false
					},
					function(){
					
							/*******************************/
							/*       BORRAR REGISTRO       */
							/*******************************/
							$.ajax({
								dataType:'JSON',
								type: 'POST',
								url: 'database/VehiculosGet.php?action_type=delete&id='+data['idvehiculos'],
								success:function(data){
									
									switch(data.code){
									
										case "200"	:	swal("Eliminado!", "El registro ha sido eliminado.", "success");
														grid.getDataTable().row(rowToDelete).remove().draw( false );
														break;
															
										case "1451"	:	swal("Error al eliminar!", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar el ticket, deberá eliminar todos los registros asociados.", "error");
														break;
															
										default		:	swal("Error al elimnar!!", "El registro no se puede eliminar.", "error");

									}

					
								},
								error: function(xhr) { 
									console.log(xhr.statusText + xhr.responseText);
								}
							});
							/*******************************/
							/*    FIN BORRAR REGISTRO      */
							/*******************************/
							
					});
				
		} );
		/*******************************/
		/*  FIN CLICK BOTON ELIMINAR   */
		/*******************************/
		
    });
}]);
