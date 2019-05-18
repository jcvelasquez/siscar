/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarOrdenTrabajoController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		/*       INICIALIZACION DE VARIABLES       */
		/*******************************************/

		var idItem = $rootScope.$state.params.id; 
		var idEvaluacion = $rootScope.$state.params.idevaluacion; 
		var formdata = "";
		var msg;
		var shortCutFunction;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg ="";
		
		
		
		$('.date-picker').datepicker({
			autoclose: true
		});
		
		$('#fecha_orden_trabajo').datepicker({
			autoclose: true,
			endDate : new Date()
		});
		
		$('#fecha_orden_trabajo').datepicker('update', new Date());
		
		$('#fecha_orden_trabajo').datepicker('setDate','+0');
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});
		
		
		
		//AL SELECCIONAR UNA SEDE
		$('#sedes_idsedes').on('change', function(){
			
			var idSede = $(this).val();	
				
			$('#idmantenimiento_evaluaciones').empty();
			$("#idmantenimiento_evaluaciones").append('<option value="">Seleccione un vehiculo</option>');
			$('#idmantenimiento_evaluaciones').prop('disabled', true);
			$('#idmantenimiento_evaluaciones').selectpicker('refresh');	
			
			gridTrabajos.clear().draw(); //LIMPIAR DATATABLE POR CADA VEZ QUE SE VA A AGREGAR
							
			if(idSede != ''){ 
				initSelectVehiculos("", idSede); 
			}else{
				$('#vehiculos_idvehiculos').empty();
				$("#vehiculos_idvehiculos").append('<option value="">Seleccione una sede</option>');
				$('#vehiculos_idvehiculos').prop('disabled', true);
		  		$('#vehiculos_idvehiculos').selectpicker('refresh');	
				
			}
			
		});	
		
		
		//AL SELECCIONAR UN CONTRATO
		$('#vehiculos_idvehiculos').on('change', function(){
			
			var idVehiculo = $(this).val();	
			gridTrabajos.clear().draw(); //LIMPIAR DATATABLE POR CADA VEZ QUE SE VA A AGREGAR
						
			if(idVehiculo != ''){ 
				initEvaluaciones("", idVehiculo); 
			}else{
				$('#idmantenimiento_evaluaciones').empty();
				$("#idmantenimiento_evaluaciones").append('<option value="">Seleccione un vehiculo</option>');
				$('#idmantenimiento_evaluaciones').prop('disabled', true);
		  		$('#idmantenimiento_evaluaciones').selectpicker('refresh');	
			}
			
		});	
		
		
		//AL SELECCIONAR UN CONTRATO
		$('#idmantenimiento_evaluaciones').on('change', function(){
			
			var idmantenimiento_evaluaciones = $(this).val();	
			gridTrabajos.clear().draw(); //LIMPIAR DATATABLE POR CADA VEZ QUE SE VA A AGREGAR
						
			if(idmantenimiento_evaluaciones != ''){ 
				var new_url_items = "database/OrdenTrabajoGet.php?action_type=trabajos_x_evaluaciones&id=" + idmantenimiento_evaluaciones
				gridTrabajos.ajax.url(new_url_items).load();
			}
					
			
		});
		
		
		/***************************************/
		/*       	CARGAR SELECT SEDES    	   */
		/***************************************/		
		function initSedes(SelectedIndex){
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/SedesGet.php?action_type=list',
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#sedes_idsedes").empty();
						$("#sedes_idsedes").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idsedes = response.data[i]['idsedes'];
							var nombre_sede = response.data[i]['nombre_sede'];
							$('#sedes_idsedes').append($('<option>', { value: idsedes, text: nombre_sede })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#sedes_idsedes option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#sedes_idsedes').selectpicker('refresh');
						}
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
			
		}	
		
		
		/***************************************/
		/*           GRABAR EJECUCION          */
		/***************************************/	
		$( "#grabar_ejecucion" ).click(function() {
				
				if(gridTrabajos.rows( '.active' ).count() == 0){
					swal("ERROR", "Debe seleccionar al menos un registro para agregar a la orden de trabajo.", "error");		
					return false;
				}
				
				
				swal({title: "CONFIRMACION REQUERIDA",
					  text: "¿Está seguro que desea grabar los registros a la orden de trabajo?",
					  type: "warning",
					  showCancelButton: true,
					  confirmButtonClass: "btn-success",
					  confirmButtonText: "Si, grabar!",
					  cancelButtonText: "Cancelar",
					  closeOnConfirm: true
					},
					function(){
						
							//LEO TODAS LAS FILAS DE LA TABLA E INSERTO				
							gridTrabajos.rows('.active').every( function ( rowIdx, tableLoop, rowLoop ) {
									
								var rowData = this.data();
																
								if(rowData['idtrabajos_x_evaluaciones'] == null){
									
									$.ajax({
										url: 'database/OrdenTrabajoGet.php',
										type: 'POST',
										data: {
											action_type: 'create_trabajos_x_evaluaciones',
											idorden_trabajo : idItem,
											idevaluaciones_x_servicios : rowData['idevaluaciones_x_servicios'],
											estado_trabajo : 1
										},
										cache: false,
										success:function(response){
											
											var msg_toast_detalle = "Se registro la evaluación a la orden de trabajo, con #ID " + response;
											
											toastIndex = toastCount++;
											toastr.options = {"positionClass": "toast-top-right"}
											var $toast = toastr["success"](msg_toast_detalle); 
											
											gridTrabajos.ajax.reload();
																		
										},
										error: function(xhr) { 
											console.log(xhr.statusText + xhr.responseText);
										}
									});
									
								
								}
								
							});
						
					});
						
		});
		
		
		/*******************************************/
		/*      	DATATABLES Y FUNCIONES		   */
		/*******************************************/
		var tableWrapper = $('#datatable_trabajos');

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
		
		
		/***************************************/
		/*         CARGAR EVALUACIONES          */
		/***************************************/		
		
		var gridTrabajos = new Datatable();
				
		function initTrabajosXevaluaciones(idMantenimientoEvaluacion){
			
				gridTrabajos = $('#datatable_trabajos').DataTable({
							src: $("#datatable_trabajos"),
							"paging":   false,
							"ordering": false,
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
							"info":     false,
							"sDom": '',
							"ajax": {
								url: "database/OrdenTrabajoGet.php?action_type=trabajos_x_evaluaciones&id=" + idMantenimientoEvaluacion
							},
							"columnDefs": [
							{   
								'orderable': true,
								'targets': [0]
							}, 
							{
								"searchable": true,
								"targets": [0]
							},
							{
								"className": "dt-center table-checkbox", 
								"targets": [0]
							}
						],
						columns: [		
									{
									  "mData": null,
									  "bSortable": false,
									  "mRender": function(data, type, full) {
										  
											if(data['idtrabajos_x_evaluaciones'] == null && data['es_taller_seleccionado'] == 1) {
											  
												return '<div><label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">' +
															'<input type="checkbox" class="checkboxes" value="' + data['idtrabajos_x_evaluaciones'] + '" /><span></span>' +
													'</label></div>';
													
											}else{
												
												return data['idtrabajos_x_evaluaciones'];
														
											}
					  
									  },
									  className : 'dt-center'
									},	
									{ data : "nombre_taller"  },
									{ data : "descripcion_problema" },
									{ data : "descripcion_diagnostico" },
									{ data : "descripcion_accion"  },
									{ data : "costo_accion" },
									{
										"mData": null,
										"bSortable": false,
										"mRender": function(data, type, full) {
			
											if(data['es_cambio_componente'] == 0) 
												$label = '<span class="label label-sm label-danger">NO</span>';
											else
												$label = '<span class="label label-sm label-success">SI</span>';
			
											return $label;
										},
										className : 'dt-center'
									},
									{ data : "motivo_cambio_componente" },
									{
										"mData": null,
										"bSortable": false,
										"mRender": function(data, type, full) {
			
											if(data['es_taller_seleccionado'] == 0) 
												$label = '<span class="label label-sm label-danger">NO</span>';
											else
												$label = '<span class="label label-sm label-success">SI</span>';
			
											return $label;
										},
										className : 'dt-center'
									},
									{ data : "motivo_taller_seleccionado" },
									{
									  "mData": null,
									  "bSortable": false,
									  "mRender": function(data, type, full) {
										  
										  
											if(data['idtrabajos_x_evaluaciones'] == null && data['es_taller_seleccionado'] == 1) {
											  
												return '<span class="label label-sm label-warning">NO ASIGNADA A O/T</span>';
												
											}else if(data['es_taller_seleccionado'] == 0){
												
												return '';
												
											}else{
												
												if(data['se_ejecuto_trabajo'] == 0){
												
												return '<a href="javascript:;" data-id="' + data['idservicios_x_solicitudes'] + '" class="mt-sweetalert btn btn-danger btn-sm  eliminar_evaluacion"><i class="fa fa-times"></i> Desasignar de O/T</a>'; 
												}else{
													return '';	
												}
												//return '<span class="label label-sm label-info">ASIGNADA A O/T</span>'; 
														
											}
											
											
												
													
															
									  }
									}
							]
							
							
					})
				
			
		}
		
		
		/***************************************/
		/*       	  CARGAR  VEHICULOS        */
		/***************************************/
		function initSelectVehiculos(SelectedIndex, IdSede){

			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/VehiculosGet.php?action_type=vehiculo_x_sede&id=' + IdSede,
				success:function(response){
					
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#vehiculos_idvehiculos").empty();
					$("#vehiculos_idvehiculos").append('<option value="">Seleccione un vehiculo</option>');
					
					for( var i = 0; i<len; i++){
						var idvehiculos = response.data[i]['idvehiculos'];
						var nombre_vehiculo = response.data[i]['marca_vehiculo'] + ' | ' + response.data[i]['modelo_vehiculo'] + ' | ' + response.data[i]['placa_vehiculo'];
													
						$('#vehiculos_idvehiculos').append($('<option>', { value: idvehiculos, text: nombre_vehiculo })).selectpicker('refresh');
					}
					//FIN CARGA DE REGISTROS EN EL SELECT
					
					$('#vehiculos_idvehiculos').prop('disabled', false);
		  			$('#vehiculos_idvehiculos').selectpicker('refresh');
				
					//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#vehiculos_idvehiculos option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#vehiculos_idvehiculos').selectpicker('refresh');
						}
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
		}
		
		
		
		/***************************************/
		/*      CARGAR SELECT SOLICITUDES  	   */
		/***************************************/		
		function initEvaluaciones(SelectedIndex, IdVehiculo){
				
				$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/OrdenTrabajoGet.php?action_type=evaluaciones_x_vehiculo&id=' + IdVehiculo,
				success:function(response){
										
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#idmantenimiento_evaluaciones").empty();
					$("#idmantenimiento_evaluaciones").append('<option value="">Seleccione un vehiculo</option>');
					
					for( var i = 0; i<len; i++){
						var idmantenimiento_evaluaciones = response.data[i]['idmantenimiento_evaluaciones'];
						var nombre_evaluacion = ' #ID ' + response.data[i]['idmantenimiento_evaluaciones'] + ' | ' + response.data[i]['descripcion_evaluacion'];
													
						$('#idmantenimiento_evaluaciones').append($('<option>', { value: idmantenimiento_evaluaciones, text: nombre_evaluacion })).selectpicker('refresh');
					}
					//FIN CARGA DE REGISTROS EN EL SELECT
					
					$('#idmantenimiento_evaluaciones').prop('disabled', false);
		  			$('#idmantenimiento_evaluaciones').selectpicker('refresh');
				
					//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idmantenimiento_evaluaciones option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmantenimiento_evaluaciones').selectpicker('refresh');
						}
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
			
		}	
		
		
		
		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/		
		
		function initEditContent(){
			
				if (idItem != '' && idItem != 'nuevo') {
						
					//CAMPOS DE EDICION	
										
					 $.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/OrdenTrabajoGet.php?action_type=edit&id='+idItem,
						success:function(data){
										
							initSedes(data.sedes_idsedes);
							initSelectVehiculos(data.vehiculos_idvehiculos, data.sedes_idsedes);
							initEvaluaciones(data.idmantenimiento_evaluaciones, data.vehiculos_idvehiculos);
							
							initTrabajosXevaluaciones(data.idmantenimiento_evaluaciones);
														
							$('#descripcion_orden_trabajo').val(data.descripcion_orden_trabajo);
							$('#estado_orden_trabajo ').val(data.estado_orden_trabajo ).change();
							$('#fecha_orden_trabajo').datepicker('update', data.fecha_orden_trabajo);
							$('#fecha_estimada_fin').datepicker('update', data.fecha_estimada_fin);
							$('#fecha_estimada_inicio').datepicker('update', data.fecha_estimada_inicio);
							
							$('#nro_orden_sigap').val(data.nro_orden_sigap);
							$('#kilometraje_internamiento').val(data.kilometraje_internamiento);
							
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
					
				
				}else{
					
				
					if (idEvaluacion != '' && idEvaluacion != 'nuevo'){
						
						$.ajax({
							dataType:'JSON',
							type: 'POST',
							url: 'database/MantenimientoEvaluacionesGet.php?action_type=cabecera_evaluacion&id='+idEvaluacion,
							success:function(data){
								
								initSedes(data.sedes_idsedes);
								initSelectVehiculos(data.vehiculos_idvehiculos, data.sedes_idsedes);
								initEvaluaciones(data.idmantenimiento_evaluaciones, data.vehiculos_idvehiculos);
																							
							},
							error: function(xhr) { 
								console.log(xhr.statusText + xhr.responseText);
							}
						});
						
					}else{
						initSedes("");
						initTrabajosXevaluaciones("");	
					}
					
					App.blockUI({
						target: '#items_diagnostico',
						boxed: true,
						textOnly: true,
						message: 'Esta sección esta bloqueda hasta que la evaluacion sea guardada'
					});
				
		
		
				}
				
				/***************************************/
				/*   FIN DE  CARGAR REGISTRO A EDITAR   */
				/***************************************/					
			
		}
		
		
		
		
		/******************************************/
		/*            VALIDAR FORMULARIO          */
		/******************************************/

		$( "#grabar_ot" ).click(function() {

				 var form1 = $('#form');
				 var error1 = $('.alert-danger', form1);

				 form1.validate({

						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						rules: {
							sedes_idsedes: {
								required: true
							},
							fecha_orden_trabajo: {
								required: true
							},
							fecha_estimada_inicio: {
								required: true
							},
							fecha_estimada_fin: {
								required: true
							},
							vehiculos_idvehiculos: {
								required: true
							},
							idmantenimiento_evaluaciones: {
								required: true
							},
							descripcion_orden_trabajo: {
								required: true
							},
							nro_orden_sigap: {
								required: true
							},
							kilometraje_internamiento: {
								required: true
							}
						},
						messages: {
							fecha_estimada_inicio: "Ingrese una fecha válida",
							fecha_estimada_fin: "Ingrese una fecha válida",
							fecha_orden_trabajo: "Ingrese una fecha válida"
						},
						invalidHandler: function (event, validator) { 
							error1.show();
							App.scrollTo(error1, -200);
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

								error1.hide();
								
								
								/*****************************************************/
								/*            AGREGAR O ACTUALIZAR REGISTRO          */
								/*****************************************************/		
								
								if (idItem == 'nuevo' || idItem == '') {
	
									formdata = $("#form").serialize()+'&action_type=create';
									title = "ORDEN DE TRABAJO REGISTRADA"
									msg = "Ahora puede registrar evaluaciones para los servicios de la solicitud. Si desea modificar los datos principales de la evaluacion, deberá salir y volver a entrar.";
									
								}else if (idItem != '' && idItem != 'nuevo') {
	
									formdata = $("#form").serialize()+'&action_type=update&id='+idItem;
									title = "ORDEN DE TRABAJO ACTUALIZADA"
									msg = "Toda la informacion fue guardada correctamente.";
	
								}
								
								swal({
								  title: "CONFIRMACION REQUERIDA",
								  text: "¿Esta seguro que desea generar la orden de trabajo?",
								  type: "warning",
								  showCancelButton: true,
								  confirmButtonClass: "btn-success",
								  confirmButtonText: "Si, generar!",
								  cancelButtonText: "Cancelar",
								  closeOnConfirm: false
								},
								function(){
									
										$.ajax({
												dataType:'JSON',
												type: 'POST',
												url: 'database/OrdenTrabajoGet.php',
												data: formdata,
												success:function(data){
																									
														//CAMBIA EL NUEVO ID DE LA SOLICITUD
														if (idItem == 'nuevo' || idItem == ''){
															
															idItem = data.idordentrabajo;
															
															var idordentrabajo = data.idordentrabajo;
															var idevaluaciones = data.idevaluaciones;
															
														
															swal({
															  title: "CONFIRMACION",
															  text: "Ahora puede seleccionar los servicios a ejecutar, en esta orden de trabajo. La pantalla se actualizá despues de pulsar aceptar.",
															  type: "success",
															  showCancelButton: false,
															  confirmButtonClass: "btn-sucess",
															  confirmButtonText: "Aceptar",
															  closeOnConfirm: true
															},
															function(){
																
																$rootScope.$state.go('private.registrar_orden_trabajo', {"id" : idordentrabajo, "idevaluacion" : idevaluaciones});
																	
															});
															
														}else{
															swal("CONFIRMACION", "La evaluacion ha sido actualizada correctamente.", "success");
														}
												
													
												},
												error: function(xhr) { 
													console.log(xhr.statusText + xhr.responseText);
												}
										});
										
										
								});
								/*****************************************************/
								/*        FIN DE AGREGAR O ACTUALIZAR REGISTRO       */
								/*****************************************************/	

						}

				});

		});
		
		
		/*******************************/
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_trabajos tbody').on( 'click', 'a.mt-sweetalert', function () {
			
			var data = gridTrabajos.row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
							
							
					swal({
					  title: "CONFIRMACION REQUERIDA",
					  text: "Una vez eliminado, no será posible recuperar la información!",
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
							
							var formdataservicios = '&action_type=delete_trabajos_x_evaluaciones&id=' + data['idtrabajos_x_evaluaciones'];
							 
							$.ajax({
								dataType:'JSON',
								type: 'POST',
								url: 'database/OrdenTrabajoGet.php',
								data : formdataservicios,
								success:function(data){
									
									switch(data.code){
									
										case "200"		:	swal("EXITO", "El registro ha sido desasociado.", "success");
															gridTrabajos.row(rowToDelete).remove().draw( false );
															break;
															
										case "1451"		:	swal("ERROR", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar la evaluacion, deberá quitar todos los documentos asociados a este registro.", "error");
															break;
															
										default			:	swal("ERROR", "El registro ha sido desasociado.", "error");
																	
									}
									
									gridTrabajos.ajax.reload();
					
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
		

		
		
		

		/*******************************************/
		/*      	    FIN TEMPLATE     		   */
		/*******************************************/
		
		initEditContent();
		
		
    });
}]);
