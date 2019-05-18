/* Setup general page controller */
angular.module('MetronicApp').controller('ListarAreasController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		/*      	  CARGAR DATATABLE   		   */
		/*******************************************/
		
        var grid = new Datatable();

        grid.init({
            src: $("#datatable_areas"),
            onSuccess: function (grid) {
                
            },
            onError: function (grid) {
            },
            loadingMessage: 'Cargando...',
            dataTable: { 
                "language": {
                    "aria": {
                        "sortAscending": ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    },
                    "emptyTable": "No se encontraron registros en la tabla",
                    "info": "Mostrando _START_ al _END_ de _TOTAL_ registros",
                    "infoEmpty": "No se encontraron registros",
                    "infoFiltered": "(filtered1 de _MAX_ total registros)",
                    "lengthMenu": "Mostrar _MENU_ registros",
                    "search": "Buscar:",
                    "zeroRecords": "No se encontraron registros con los criterios de busqueda",
                    "paginate": {
                        "first":      "Primero",
                        "last":       "Ultimo",
                        "next":       "Siguiente",
                        "previous":   "Anterior"
                    }
                },
                "bStateSave": true, 
                "bAutoWidth": true,
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
							swal("Actualizada!", "El listado de contratos se actualizo correctamente.", "success");
						}
					}
				],
                "sDom": '',
                "sPlaceHolder": "head:after",
                "lengthMenu": [
                    [10, 20, 50, -1],
                    [10, 20, 50, "Todo"] // change per page values here
                ],
                "processing": true,
				"serverSide": true,
                "pageLength": -1, // default record count per page
                "ajax": {
                    url: "database/AreasGet.php?action_type=list", // ajax source
                    dataSrc: "data",
					type: "POST",
                },
                columns: [
								
                        { data : "idareas" },
						{
							  "mData": null,
							  "bSortable": false,
							  "mRender": function(data, type, full) {
										return '<a href=#/private/registrar_area/' + data['idareas'] + '>' + data['nombre_area'] + '</a>';
													
							  }
						},
                        { data : "nombre_sede" },	
						{
                            "mData": null,
                            "bSortable": false,
                            "mRender": function(data, type, full) {

                                if(data['estado_area'] == 1) 
                                    $label = '<span class="label label-sm label-success">ACTIVA</span>';
                                else
                                    $label = '<span class="label label-sm label-danger">INACTIVA</span>';

                                return $label;
                            }
                            
                        },
                        {
                          "mData": null,
                          "bSortable": false,
                          "mRender": function(data, type, full) {

                            return '<div class="btn-group">' +
                                        '<button class="btn btn-xs btn-warning dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Acciones <i class="fa fa-angle-down"></i></button>' +
                                         '<ul class="dropdown-menu pull-right" role="menu">' +
                                            '<li><a href=#/private/registrar_area/' + data['idareas'] + '><i class="fa fa-pencil"></i> Editar area</a></li>' +
                                            '<li><a href="javascript:;" data-id="' + data['idareas'] + '" class="mt-sweetalert delete"><i class="fa fa-times"></i> Eliminar area</a></li>' +
                                        '</ul>' +
                                    '</div>';               
                          }
                        }
                ]
                
            }
        });
		
		/*******************************************/
		/*      	  	FIN TEMPLATE   		 	   */
		/*******************************************/
		
		/*******************************/
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_areas tbody').on( 'click', 'a.mt-sweetalert', function () {
			
			var data = grid.getDataTable().row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
							
		var confirm_delete = swal({
					  title: "¿CONFIRMACION REQUERIDA?",
					  text: "Una vez eliminada, no será posible recuperar la información!",
					  type: "warning",
					  showCancelButton: true,
					  confirmButtonClass: "btn-success",
					  confirmButtonText: "Si, eliminar",
					  cancelButtonText: "Cancelar",
					  closeOnConfirm: false,
					},
					function(){
					
							
							/*******************************/
							/*       BORRAR REGISTRO       */
							/*******************************/
							$.ajax({
								dataType:'JSON',
								type: 'POST',
								url: 'database/AreasGet.php?action_type=delete&id='+data['idareas'],
								success:function(data){
																
									switch(data.code){
									
										case "200"	:	swal("CONFIRMACION", "El registro ha sido eliminado.", "success");
														grid.getDataTable().row(rowToDelete).remove().draw( false );
														break;
															
										case "1451"	:	swal("ERROR", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar la area, deberá eliminar todos los registros asociados.", "error");
														break;
															
										default		:	swal("ERROR", "El registro no se puede eliminar.", "error");

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
