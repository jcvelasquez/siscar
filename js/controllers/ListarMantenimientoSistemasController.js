/* Setup general page controller */
/* Setup general page controller */
angular.module('MetronicApp').controller('ListarMantenimientoSistemasController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		
		/***************************************/
		/*    	    FIN SELECT CARGA		   */
		/***************************************/
						
		var grid = new Datatable();
		
		grid.init({
			src: $("#datatable_mantenimiento_sistemas"),
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
							swal("Actualizada!", "El listado de contratos se actualizo correctamente.", "success");
						}
					}
				],
				"sDom": '',
				"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
				//"sPlaceHolder": "head:after",
				"lengthMenu": [
					[10, 20, 50, -1],
					[10, 20, 50, "Todo"] 
				],
				"processing": true,
				"pageLength": 10, 
				"ajax": {
					url: "database/MantenimientoSistemasGet.php?action_type=list",
					dataSrc: "data"
				},
				columns: [
						{ data : "idmantenimiento_sistemas" },		
						{
							  "mData": null,
							  "bSortable": false,
							  "mRender": function(data, type, full) {
										return '<a href=#/private/registrar_mantenimiento_sistema/' + data['idmantenimiento_sistemas'] + '>' + data['cod_sistema'] + '</a>';
													
							  }
						},		
						{ data : "nombre_sistema" },
						{
                            "mData": null,
                            "bSortable": false,
                            "mRender": function(data, type, full) {

                                if(data['estado_sistema'] == 1) 
                                    $label = '<span class="label label-sm label-success">ACTIVO</span>';
                                else
                                    $label = '<span class="label label-sm label-danger">INACTIVO</span>';

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
											'<li><a href=#/private/registrar_mantenimiento_sistema/' + data['idmantenimiento_sistemas'] + '><i class="icon-docs"></i> Editar</a></li>' +
											'<li><a href="javascript:;" data-id="' + data['idmantenimiento_sistemas'] + '" class="mt-sweetalert delete"><i class="icon-docs"></i> Eliminar</a></li>' +
										'</ul>' +
									'</div>';               
						  }
						}
						
						
						
				]
				
			}
		});
		
		/*******************************/
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_mantenimiento_sistemas tbody').on( 'click', 'a.mt-sweetalert', function () {
			
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
								url: 'database/MantenimientoSistemasGet.php?action_type=delete&id='+data['idmantenimiento_sistemas'],
								success:function(data){
									
									switch(data.code){
									
										case "200"	:	swal("Eliminado!", "El registro ha sido eliminado.", "success");
														grid.getDataTable().row(rowToDelete).remove().draw( false );
														break;
															
										case "1451"	:	swal("Error al eliminar!", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar el sistema, deberá eliminar todos los servicios asociados a este registro.", "error");
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
					
				
		// handle datatable custom tools
		$('#datatable_ajax_tools > li > a.tool-action').on('click', function() {
			var action = $(this).attr('data-action');
			grid.getDataTable().button(action).trigger();
		});
		
    });
}]);
