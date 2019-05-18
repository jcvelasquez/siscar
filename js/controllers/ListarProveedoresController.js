/* Setup general page controller */
angular.module('MetronicApp').controller('ListarProveedoresController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
            src: $("#datatable_proveedores"),
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
					{ 
						extend: 'print', 
					  	//message: 'This print was produced using the Print button for DataTables',
					  	className: 'btn default',
            			autoPrint: true,
						orientation: 'landscape',
						stripHtml: true,
						exportOptions: {
							columns: [0,1,2,3,4,5,6]
						},
						customize: function (win) {
							$(win.document.body).find('*').addClass('display').css('font-size', '10px');
							$(win.document.body).find('td').each(function(index){
								$(this).css('padding','5px');
							});
							$(win.document.body).find('tr:nth-child(odd) td').each(function(index){
								$(this).css('background-color','#D0D0D0');
							});
							$(win.document.body).find('h1').css('text-align','center');
							$(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
						}
					},
					{ 
						extend: 'copy', 
					 	className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6]
						} 
					},
					{ 
						extend: 'pdf', 
						orientation: 'landscape',
					  	className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6]
						}
					},
					{ 
						extend: 'excel',
						className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6]
						}
					},
					{ 
						extend: 'csv',
						className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6]
						}	
					},
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
				"serverSide": true,
                "lengthMenu": [
                    [10, 20, 50, -1],
                    [10, 20, 50, "Todo"] // change per page values here
                ],
                "processing": true,
                "pageLength": 10, // default record count per page
                "ajax": {
                    url: "database/ProveedorGet.php?action_type=list", // ajax source
                    dataSrc: "data"
                },
                columns: [	
								
						{ data : "idproveedores" }	,
						{
							  "mData": null,
							  "bSortable": true,
							  "mRender": function(data, type, full) {
										return '<a href=#/private/registrar_proveedor/' + data['idproveedores'] + '>' + data['razon_social'] + '</a>';
													
							  }
						},
						{ data : "domicilio_fiscal" },
						{ data : "ruc_proveedor" },
						{ data : "representante_legal" },
						{ data : "telefono_proveedor" },
						{
                            "mData": null,
                            "bSortable": false,
                            "mRender": function(data, type, full) {

                                if(data['estado_proveedor'] == 1) 
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
                                            '<li><a href=#/private/registrar_proveedor/' + data['idproveedores'] + '><i class="icon-docs"></i> Editar proveedor</a></li>' +
                                            '<li><a href="javascript:;" data-id="' + data['idproveedores'] + '" class="mt-sweetalert delete"><i class="icon-docs"></i> Eliminar proveedor</a></li>' +
                                        '</ul>' +
                                    '</div>';   

       
                          }
                        }
						
                ]
                
            }
        });


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
		$('#datatable_proveedores tbody').on( 'click', 'a.mt-sweetalert', function () {
			
			var data = grid.getDataTable().row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
										
					swal({
					  title: "CONFIRMACION REQUERIDA",
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
								url: 'database/ProveedorGet.php?action_type=delete&id='+data['idproveedores'],
								success:function(data){
									
									switch(data.code){
									
										case "200"	:	swal("EXITO", "El registro ha sido eliminado.", "success");
														grid.getDataTable().row(rowToDelete).remove().draw( false );
														break;
															
										case "1451"	:	swal("ERROR", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar el proveedor, deberá eliminar todos los registros asociados a este.", "error");
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
