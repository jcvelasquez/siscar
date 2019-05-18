/* Setup general page controller */
angular.module('MetronicApp').controller('DetalleServicioController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		
		var idItem = $rootScope.$state.params.id; 
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg ="";
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});	
		
		
		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/		
		
		function initContent(){
									
				 /********************************/
				 /*			CABECERA			 */	
				 /********************************/				
				 $.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ServiciosSolicitudGet.php?action_type=edit&id='+idItem,
					success:function(data){
		
						//INICIO DE PERSONALIZACION DE CAMPOS
						$('#cabecera_servicio div[data-display="nombre_area"').html(data.nombre_area);
						$('#cabecera_servicio div[data-display="tipo_vehiculo"').html(data.tipo_vehiculo);
						$('#cabecera_servicio div[data-display="motivo_comision"').html(data.motivo_comision);
						$('#cabecera_servicio div[data-display="fecha_inicio"').html(data.fecha_inicio + ' - ' + data.hora_inicio);
						$('#cabecera_servicio div[data-display="fecha_fin"').html(data.fecha_fin + ' - ' + data.hora_fin);
						$('#cabecera_servicio div[data-display="lugar_destino"').html(data.lugar_destino);
						$('#cabecera_servicio div[data-display="usuario_solicita"').html(data.nombres + ' ' + data.apellidos);
						
						$('#departamento').val(data.departamento);
						$('#provincia').val(data.provincia);
						$('#distrito').val(data.distrito);
						$('#motivo_comision').val(data.motivo_comision);
						$('#direccion_destino').val(data.direccion_destino);
						$('#lugar_destino').val(data.lugar_destino);
						$('#tipo_vehiculo').val(data.tipo_vehiculo);
						$('#nombre_chofer').val(data.nombre_chofer);
						$('#placa_vehiculo').val(data.placa_vehiculo);
						
						if(data.es_ida_vuelta == 0)
							$('#es_ida_vuelta').val("IDA");
						else
							$('#es_ida_vuelta').val("IDA Y VUELTA");
						
						if(data.es_asignado == 0)
							$('#cabecera_servicio span[data-display="es_asignado"').removeClass('label-success').addClass('label-danger').html("NO ASIGNADO");
						else
							$('#cabecera_servicio span[data-display="es_asignado"').html("ASIGNADO");
							
						if(data.es_finalizado == 0)
							$('#cabecera_servicio span[data-display="es_finalizado"').removeClass('label-success').addClass('label-danger').html("NO FINALIZADO");
						else
							$('#cabecera_servicio span[data-display="es_finalizado"').html("FINALIZADO");	
									
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
				

				/********************************/
				/*	    CIERRE DE SERVICIO      */	
				/********************************/							
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ServiciosSolicitudGet.php?action_type=cierre_chofer_x_servicios&id='+idItem,
					success:function(data){
						
						if(data == 0){
							
							$('#section_cierre').addClass('hide');
							
						}else{
		
							$('#fecha_inicio_real').val(data.fecha_inicio_real);
							$('#fecha_fin_real').val(data.fecha_fin_real);
							$('#hora_inicio_real').val(data.hora_inicio_real);
							$('#hora_fin_real').val(data.hora_fin_real);
							$('#kilometraje_inicio').val(data.kilometraje_inicio);
							$('#kilometraje_fin').val(data.kilometraje_fin);
							$('#observaciones_chofer').val(data.observaciones_chofer);
							
						}
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
				
				
				/********************************/
				/*	    CIERRE DE SERVICIO      */	
				/********************************/							
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ServiciosSolicitudGet.php?action_type=calificacion_usuario_x_servicios&id='+idItem,
					success:function(data){
						
						if(data == 0){
							
							$('#section_calificacion').addClass('hide');
							
						}else{
		
							if(data.calificacion_usuario == 1) $('#radio1').attr('checked',true);	
							if(data.calificacion_usuario == 2) $('#radio2').attr('checked',true);	
							if(data.calificacion_usuario == 3) $('#radio3').attr('checked',true);	
							if(data.calificacion_usuario == 4) $('#radio4').attr('checked',true);	
							if(data.calificacion_usuario == 5) $('#radio5').attr('checked',true);	
							
							$('#observaciones_usuario').val(data.observaciones_usuario);
							
						}
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
				
				
				/********************************/
				/*	   		COMISIONADOS        */	
				/********************************/	
				
				
				/*******************************************/
				/*      	  CARGAR DATATABLE   		   */
				/*******************************************/
				
				var grid = new Datatable();
		
				grid.init({
					src: $("#datatable_comisionados"),
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
						buttons: [
							{ extend: 'print', className: 'btn yellow', text: 'Imprimir' },
							{ extend: 'pdf', className: 'btn green', text: 'Exportar PDF' },
							{ extend: 'excel', className: 'btn blue', text: 'Exportar EXCEL' },
							{ extend: 'csv', className: 'btn purple ', text: 'Exportar CSV | Transparencia' },
							{ extend: 'colvis', className: 'btn dark', text: 'Columnas'}
						],
						"sDom": '',
						"sPlaceHolder": "head:after",
						"lengthMenu": [
							[10, 20, 50, -1],
							[10, 20, 50, "Todo"] // change per page values here
						],
						"processing": true,
						"pageLength": -1, // default record count per page
						"ajax": {
							url: "database/ServiciosSolicitudGet.php?action_type=comisionados_x_servicios&id=" + idItem, // ajax source
							dataSrc: "data",
						},
						
										
						columns: [
							{ data : "usuarios_idusuarios" },
							{ data : "nombre_comisionado" },
							{ data : "email" }
						]
						
					}
				});
				
				/*******************************************/
				/*      	  	FIN TEMPLATE   		 	   */
				/*******************************************/
				
				
				
				/*******************************************/
				/*      	  CARGAR DATATABLE   		   */
				/*******************************************/
				
				var gridEstados = new Datatable();
		
				gridEstados.init({
					src: $("#datatable_servicios_estados"),
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
						buttons: [
							{ extend: 'print', className: 'btn yellow', text: 'Imprimir' },
							{ extend: 'pdf', className: 'btn green', text: 'Exportar PDF' },
							{ extend: 'excel', className: 'btn blue', text: 'Exportar EXCEL' },
							{ extend: 'csv', className: 'btn purple ', text: 'Exportar CSV | Transparencia' },
							{ extend: 'colvis', className: 'btn dark', text: 'Columnas'}
						],
						"sDom": '',
						"sPlaceHolder": "head:after",
						"lengthMenu": [
							[10, 20, 50, -1],
							[10, 20, 50, "Todo"] // change per page values here
						],
						"processing": true,
						"pageLength": -1, // default record count per page
						"ajax": {
							url: "database/ServiciosSolicitudGet.php?action_type=estados_x_servicios&id=" + idItem, // ajax source
							dataSrc: "data",
						},
						
										
						columns: [
							{ data : "idservicios_estados" },
							{ data : "estado_servicio" },
							{ data : "observaciones_estado" },
							{ data : "fecha_creacion" },
							{ data : "usuario_creacion" }
						]
						
					}
				});
				
				/*******************************************/
				/*      	  	FIN TEMPLATE   		 	   */
				/*******************************************/
				
				
				
				

			
		}
		
		initContent();
		
		/***************************************/
		/*    	    FIN SELECT CARGA		   */
		/***************************************/


		/**********************************************/
		/*            GRABAR ITEMS ADJUDICADOS		  */
		/**********************************************/
		$( "#grabar_cierre" ).click(function() {
			
				 var form_cierre = $('#form_cierre_servicio');
				 var error_cierre = $('.alert-danger.items', form_cierre);

				 form_cierre.validate({

						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						rules: {
							fecha_inicio_real: {
								required: true
							},
							hora_inicio_real: {
								required: true
							},
							fecha_fin_real: {
								required: true
							},
							hora_fin_real: {
								required: true
							},
							kilometraje_inicio: {
								required: true
							},
							kilometraje_fin: {
								required: true
							},
							observaciones_chofer: {
								required: true
							}
						},
						invalidHandler: function (event, validator) { 
							error_cierre.show();
							App.scrollTo(error_cierre, -55);
						},
						errorPlacement: function (error, element) { 
							var cont = $(element).parent('.input-group');
							if (cont) {
								cont.after(error);
							} else {
								element.after(error);
							}
						},
						highlight: function (element) { 
							$(element).closest('.form-group').addClass('has-error'); 
						},
						unhighlight: function (element) { 
							$(element).closest('.form-group').removeClass('has-error'); 
						},
						success: function (label) {
								label.closest('.form-group').removeClass('has-error'); 
						},
						submitHandler: function (form) {

								error_cierre.hide();
								
								formdata = $("#form_cierre_servicio").serialize()+'&action_type=create_cierre_chofer&idservicio_solicitud=' + idItem;
								
								swal({title: "CONFIRMACION REQUERIDA",
									  text: "¿Esta seguro que desea registrar el cierre del servicio?",
									  type: "warning",
									  showCancelButton: true,
									  confirmButtonClass: "btn-success",
									  confirmButtonText: "Si, cerrar",
									  cancelButtonText: "Cancelar",
									  closeOnConfirm: true,
									},
									function(){

												$.ajax({
														dataType:'JSON',
														type: 'POST',
														url: 'database/ServiciosSolicitudGet.php',
														data: formdata,
														success:function(data){
															
															msg = "El cierre del servicio se registro correctamente con #ID " + data.idservicios_cierre_chofer;
															
															toastIndex = toastCount++;
															toastr.options = {"positionClass": "toast-top-right"}
															var $toast = toastr["success"](msg); 
															
															$rootScope.$state.go('private.listar_servicios');
															
														},
														error: function(xhr) { 
															console.log(xhr.statusText + xhr.responseText);
														}
												});
										
										
									});

								

						}

				});

		});

		
    });
}]);
