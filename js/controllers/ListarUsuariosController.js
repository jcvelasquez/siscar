angular.module('MetronicApp').controller('ListarUsuariosController', function($rootScope, $scope, $http, $timeout) {
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
		
		
		 // set sidebar closed and body solid layout mode
		$rootScope.settings.layout.pageContentWhite = true;
		$rootScope.settings.layout.pageBodySolid = false;
		$rootScope.settings.layout.pageSidebarClosed = false;
		
		
		/*******************************************/
		/*      	  CARGAR DATATABLE   		   */
		/*******************************************/
		
        var grid = new Datatable();

        grid.init({
            src: $("#datatable_usuarios"),
            onSuccess: function (grid) {
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
                //"bStateSave": true, 
                //"bAutoWidth": true,
                "buttons": [
					{ 
						extend: 'print', 
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
                "sDom": 'Tf<"clear">lrtip',
                "sPlaceHolder": "head:after",
                "lengthMenu": [
                    [10, 20, 50, -1],
                    [10, 20, 50, "Todo"] // change per page values here
                ],
                "processing": true,
				"serverSide": true,
                "pageLength": 10, // default record count per page
                "ajax": {
                    url: "database/UsuariosGet.php?action_type=list", // ajax source
                    dataSrc: "data",
					type: "POST"/*,
					data: function ( d ) { d.init = true; },
					error: function(result){ console.log(result); },
					success: function(result){ console.log(result); }*/
                },
                "order": [[ 1, "desc" ]],
				"columnDefs": [
					{  
						'orderable': true,
						targets: '_all'
					}
				],
                columns: [
                        { data : "idusuarios" },
						{
                            "mData": "apellidos",
                            "bSortable": true,
                            "mRender": function(data, type, row ) {

                                return '<a href=#/private/registrar_usuario/' + row.idusuarios + '>' + row.apellidos + ', ' + row.nombres + '</a>';
                            }
                            
                        },
                        { data : "email" },
                        { data : "nombre_sede" },
						{ data : "nombre_rol" },
						{
                            "mData": null,
                            "bSortable": false,
                            "mRender": function(data, type, full) {

                                if(data['estado_usuario'] == 1) 
                                    $label = '<span class="label label-sm label-success">ACTIVO</span>';
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
                                            '<li><a href=#/private/registrar_usuario/' + data['idusuarios'] + '><i class="icon-docs"></i> Editar</a></li>' +
                                            '<li><a href="javascript:;" data-id="' + data['idusuarios'] + '" class="mt-sweetalert delete"><i class="fa fa-times"></i> Eliminar</a></li>' +
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
		
		
		
		/*******************************************/
		/*      	  CARGAR DATATABLE   		   */
		/*******************************************/
		
        var gridUsuariosSigap = new Datatable();

        gridUsuariosSigap.init({src: $("#datatable_usuarios_sigap"),
								onSuccess: function (grid) {
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
										url: "database/UsuariosGet.php?action_type=usuarios_sigap", // ajax source
										dataSrc: "data",
										type: "POST",
										//data: function ( d ) { d.init = true; },
										//error: function(result){ console.log(result); },
										//success: function(result){ console.log(result); }
									},
									
									columns: [
											{ data : "id_user", "bSortable": false },
											{ data : "nom_pers", "bSortable": false },
											{
												"mData": null,
												"bSortable": false,
												"mRender": function(data, type, full) {
					
													return data['apepat_pers'] + ' ' + data['apemat_pers'];
												}
												
											},
											
											{ data : "mail_pers", "bSortable": false },
											{ data : "nom_user", "bSortable": false },
											{
												"mData": null,
												"bSortable": false,
												"mRender": function(data, type, full) {
					
													if(data['estado_pers'] == 1) 
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
												  
												  if(data['estado_pers'] == 1) 
														$button = '<a href="javascript:;" data-id="' + data['id_user'] + '" class="btn btn-xs btn-info sincronizar"><i class="fa fa-exchange"></i> SINCRONIZAR</a>'; 
													else
														$button = '';
					
													return $button;
					
											  }
											}
									]
									
								}
        });
		
		/*******************************************/
		/*      	  	FIN TEMPLATE   		 	   */
		/*******************************************/
		
		
		
		/***************************************/
		/*  FUNCION VALIDAR NOMBRE DE USUARIO   */
		/***************************************/
		function validarUsuario(usuario){
			
				var accion;
		
				//CAMPOS DE EDICION							
				 $.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/UsuariosGet.php?action_type=validar_usuario&usuario=' + usuario + '&idItem=nuevo',
					success:function(data){
						
						console.log(data);
		
						if (data == false) {
							
							//console.log('<i class="fa fa-warning" data-original-title="El usuario ' + usuario + ' no está disponible."></i>');
							
							accion = 'update';
														
						} else {
							
							//console.log('<i class="fa fa-warning" data-original-title="El usuario ' + usuario + ' está disponible."></i>');
							
							accion =  'create';
														
						}
						
						console.log(accion);
						
						return accion;
									
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
				
				
				
		}
		
		
		/*******************************/
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_usuarios_sigap tbody').on( 'click', 'a.sincronizar', function () {
			
			var dataUsuario = gridUsuariosSigap.getDataTable().row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
			
			console.log(dataUsuario);
			
			$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/UsuariosGet.php?action_type=validar_usuario&usuario=' + dataUsuario.nom_user + '&idItem=nuevo',
					success:function(data){
						
						
		
						if (data == false) {
							
							


														
						} else {
							
							swal({title: "CONFIRMACION REQUERIDA",
								  text: "Se procederá a crear el usuario en la base de datos del SISCAR. Luego será redireccionado a la página del usuario y deberá actualizar la informacion.",
								  type: "warning",
								  showCancelButton: true,
								  confirmButtonClass: "btn-success",
								  confirmButtonText: "Si, sincronizar",
								  cancelButtonText: "Cancelar",
								  closeOnConfirm: false,
								},
								function(){
								
										
										$.ajax({
											dataType:'JSON',
											type: 'POST',
											url: 'database/UsuariosGet.php?action_type=create',
											data: 
											{
												nombres : dataUsuario.nom_pers,
												apellidos : dataUsuario.apepat_pers + ' ' + dataUsuario.apemat_pers, 
												sexo : dataUsuario.sex_pers,
												direccion_uno : dataUsuario.dir_pers,
												email : dataUsuario.mail_pers,
												telefono : dataUsuario.cel_pers,
												idtipo_identificacion : 1, 
												nro_identificacion : 0,
												roles_idroles : 4,
												estado_usuario : 1,
												idtipo_licencia : 1,
												areas_idareas : 5,
												nro_licencia : 0,
												codigo : dataUsuario.cod_pers,
												usuario : dataUsuario.nom_user,
												clave : dataUsuario.clave_user,
												usuario_creacion : $rootScope.settings.sesion.usuario,
												prioridad : 2
											},
											success:function(data){
													
													swal("CONFIRMACION", "Usuario sincronizado!", "success");													
													grid.getDataTable().ajax.reload();
																					
											},
											error: function(xhr) { 
												console.log(xhr.statusText + xhr.responseText);
											}
										});
										
										
								});
														
						}

									
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
				
				
					
				
		} );
		/*******************************/
		/*  FIN CLICK BOTON ELIMINAR   */
		/*******************************/
		
		
		
		
		/*******************************/
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_usuarios tbody').on( 'click', 'a.mt-sweetalert', function () {
			
			var data = grid.getDataTable().row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
							
		var confirm_delete = swal({
					  title: "¡Esta seguro?",
					  text: "Una vez eliminada, no será posible recuperar la información!",
					  type: "warning",
					  showCancelButton: true,
					  confirmButtonClass: "btn-success",
					  confirmButtonText: "Si, eliminar!",
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
								url: 'database/UsuariosGet.php?action_type=delete&id='+data['idusuarios'],
								success:function(data){
																
									switch(data.code){
									
										case "200"	:	swal("Eliminado!", "El registro ha sido eliminado.", "success");
														grid.getDataTable().row(rowToDelete).remove().draw( false );
														break;
															
										case "1451"	:	swal("Error al eliminar!", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar la sede, deberá eliminar todos los registros asociados.", "error");
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
		
		
		/*******************************/
		/*     ACCIONES DATATABLE      */
		/*******************************/
		$('#datatable_ajax_tools > li > a.tool-action').on('click', function() {
			var action = $(this).attr('data-action');
			grid.getDataTable().button(action).trigger();
		});
		/*******************************/
		/*     ACCIONES DATATABLE      */
		/*******************************/
		
		
		
		
    });

   
				
						
});

