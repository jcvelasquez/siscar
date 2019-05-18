/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarMantenimientoServicioController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		var title;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg = "";
		var modelosSelect = new Array();
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});	
		
		$("#ejecucion_alerta").ionRangeSlider({ 
			postfix : "%", 
			grid: true, 
			grid_num: 10, 
			from: 0,
			min: 0,
            max: 100,
			from_shadow: true
		});	
		
		// Saving it's instance to var
		var ejecucion_alerta = $("#ejecucion_alerta").data("ionRangeSlider");	
		
		$("#ciclo_alerta").TouchSpin({min: 0, max: 99999999, step: 1 });
		
		
		
		/***************************************/
		/*     CARGAR  SELECT SERVICIOS        */
		/***************************************/
		function initModelos(SelectedIndex){
								
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ModelosVehiculosGet.php?action_type=list&estado=1',
					success:function(response){
												
						var len = response.data.length;
						
						$("#idmodelos_vehiculos").empty();
						$("#idmodelos_vehiculos").append('<option value="">Seleccione un modelo</option>');
						
						for( var i = 0; i<len; i++){
							var idmodelos_vehiculos = response.data[i]['idmodelos_vehiculos'];
							var modelo_vehiculo = response.data[i]['marca_vehiculo'] + ' | ' + response.data[i]['modelo_vehiculo'];
														
							modelosSelect[i] = response.data[i];
														
							$('#idmodelos_vehiculos').append($('<option>', { value: idmodelos_vehiculos, text: modelo_vehiculo })).selectpicker('refresh');
						}
						
						//ACTIVO EL SELECT
						$('#idmodelos_vehiculos').prop('disabled', false);
	  					$('#idmodelos_vehiculos').selectpicker('refresh');
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idmodelos_vehiculos option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmodelos_vehiculos').selectpicker('refresh');
						}
						
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});	
				
		}
		
		
		
		
		
		var oGridModelos = new Datatable();
		
		function initDataTableModelos(){
					
				oGridModelos = $('#datatable_modelos').DataTable({
						src: $("#datatable_modelos"),
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
							url: "database/ModelosVehiculosGet.php?action_type=list_modelos_x_servicios&id=" + idItem
						},
						columns: [	
									{ data : "marca_vehiculo" },
									{ data : "modelo_vehiculo" },
									{
									  "mData": null,
									  "bSortable": false,
									  "mRender": function(data, type, full) {
			
										return '<a href="javascript:;" data-id="' + data['idmodelos_x_servicios'] + '" class="mt-sweetalert delete btn btn-xs btn-danger"><i class="fa fa-times"></i> Eliminar</a>';   			
															
									  }
									}
						]
							
						
				})
			
		}

		/***************************************/
		/*       	  CARGAR  SISTEMAS         */
		/***************************************/
		function initSelectSistemas(SelectedIndex){


			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/MantenimientoSistemasGet.php?action_type=list&estado=1',
				success:function(response){
					
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#idmantenimiento_sistemas").empty();
					$("#idmantenimiento_sistemas").append('<option value="">Seleccione un sistema</option>');
					
					for( var i = 0; i<len; i++){
						var idmantenimiento_sistemas = response.data[i]['idmantenimiento_sistemas'];
						var nombre_sistema = response.data[i]['nombre_sistema'];
													
						$('#idmantenimiento_sistemas').append($('<option>', { value: idmantenimiento_sistemas, text: nombre_sistema })).selectpicker('refresh');
					}
					//FIN CARGA DE REGISTROS EN EL SELECT
					
					//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idmantenimiento_sistemas option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmantenimiento_sistemas').selectpicker('refresh');
						}
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
		}
		
		
		/***************************************/
		/*      CARGAR  TIPOS DE SERVICIOS     */
		/***************************************/
		function initSelectTiposServicios(SelectedIndex){


			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/MantenimientoTiposServiciosGet.php?action_type=list&estado=1',
				success:function(response){
					
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#idmantenimiento_tipos_servicios").empty();
					$("#idmantenimiento_tipos_servicios").append('<option value="">Seleccione un sistema</option>');
					
					for( var i = 0; i<len; i++){
						var idmantenimiento_tipos_servicios = response.data[i]['idmantenimiento_tipos_servicios'];
						var tipo_servicio_mantenimiento = response.data[i]['tipo_servicio_mantenimiento'];
													
						$('#idmantenimiento_tipos_servicios').append($('<option>', { value: idmantenimiento_tipos_servicios, text: tipo_servicio_mantenimiento })).selectpicker('refresh');
					}
					//FIN CARGA DE REGISTROS EN EL SELECT
					
					//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idmantenimiento_tipos_servicios option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmantenimiento_tipos_servicios').selectpicker('refresh');
						}
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
		}
		
		
		/***************************************/
		/*     CARGAR  SELECT SERVICIOS        */
		/***************************************/
		function initSelectServicios(SelectedIndex, idSistemas){
								
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/MantenimientoServiciosGet.php?action_type=servicios_x_sistema&id=' + idSistemas,
					success:function(response){
												
						var len = response.data.length;
						
						$("#idmantenimiento_servicios").empty();
						$("#idmantenimiento_servicios").append('<option value="">Seleccione un servicio</option>');
						
						for( var i = 0; i<len; i++){
							var idmantenimiento_servicios = response.data[i]['idmantenimiento_servicios'];
							var nombre_servicio = response.data[i]['nombre_servicio'];
														
							$('#idmantenimiento_servicios').append($('<option>', { value: idmantenimiento_servicios, text: nombre_servicio })).selectpicker('refresh');
						}
						
						//ACTIVO EL SELECT
						$('#idmantenimiento_servicios').prop('disabled', false);
	  					$('#idmantenimiento_servicios').selectpicker('refresh');
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idmantenimiento_servicios option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmantenimiento_servicios').selectpicker('refresh');
						}

					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});	
				
		}
		
		/***************************************/
		/*     CARGAR  SELECT COMPONENTES      */
		/***************************************/
		function initSelectComponentes(SelectedIndex, idSistemas){
								
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/MantenimientoComponentesGet.php?action_type=componentes_x_sistema&estado=1&id=' + idSistemas,
					success:function(response){
												
						var len = response.data.length;
						
						$("#idmantenimiento_componentes").empty();
						$("#idmantenimiento_componentes").append('<option value="">Seleccione un componente</option>');
						
						for( var i = 0; i<len; i++){
							var idmantenimiento_componentes = response.data[i]['idmantenimiento_componentes'];
							var nombre_componente = response.data[i]['nombre_componente'];
														
							$('#idmantenimiento_componentes').append($('<option>', { value: idmantenimiento_componentes, text: nombre_componente })).selectpicker('refresh');
						}
						
						//ACTIVO EL SELECT
						$('#idmantenimiento_componentes').prop('disabled', false);
	  					$('#idmantenimiento_componentes').selectpicker('refresh');
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idmantenimiento_componentes option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmantenimiento_componentes').selectpicker('refresh');
						}

					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});	
				
		}
		
		
		
		
		/***************************************/
		/*         CARGAR  MEDIDA USO          */
		/***************************************/
		function initSelectMedidaUso(SelectedIndex){


			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/MedidaUsoGet.php?action_type=list&estado=1',
				success:function(response){
					
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#id_medida_uso").empty();
					$("#id_medida_uso").append('<option value="">Seleccione una medida</option>');
					
					for( var i = 0; i<len; i++){
						var id_medida_uso = response.data[i]['id_medida_uso'];
						var medida_uso = response.data[i]['medida_uso'];
													
						$('#id_medida_uso').append($('<option>', { value: id_medida_uso, text: medida_uso })).selectpicker('refresh');
					}
					//FIN CARGA DE REGISTROS EN EL SELECT
					
					//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
					if(SelectedIndex != ""){
						$("#id_medida_uso option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
						$('#id_medida_uso').selectpicker('refresh');
					}
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
		}
		
		
		
		$('#idmantenimiento_tipos_servicios').on('change', function(){
			
			var idTipoMantenimiento = $(this).val();
			
				//LIMPIA LOS SELECTES
				$('#idmodelos_vehiculos').selectpicker('val', '');
				$('#idmodelos_vehiculos').selectpicker('refresh');
				
				//LIMPIA LOS SELECTES
				$('#id_medida_uso').selectpicker('val', '');
				$('#id_medida_uso').selectpicker('refresh');
				
				ejecucion_alerta.reset();	
						
			if(idTipoMantenimiento == '1'){
				$("#extras_mantenimiento_preventivo").removeClass('hide');
			}else{
				$("#extras_mantenimiento_preventivo").addClass('hide');
			}
			
			
		});	
		
		
		
		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/
		
		function initContent(){
			
				if (idItem != '' && idItem != 'nuevo') {
					
					 $.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/MantenimientoServiciosGet.php?action_type=edit&id='+idItem,
						success:function(data){
														
							initSelectSistemas(data.idmantenimiento_sistemas);
							initSelectMedidaUso(data.id_medida_uso);
							initSelectTiposServicios(data.idmantenimiento_tipos_servicios);
							
							$('#estado_servicio').val(data.estado_servicio).change();
							$('#nombre_servicio').val(data.nombre_servicio);
							$('#descripcion_servicio').val(data.descripcion_servicio);
							$('#cod_servicio').val(data.cod_servicio);
							
							if(data.idmantenimiento_tipos_servicios == '1'){ 
								$("#extras_mantenimiento_preventivo").removeClass('hide');
								ejecucion_alerta.update({ from: data.ejecucion_alerta  });
								$("#ciclo_alerta").val(data.ciclo_alerta);
							}
							
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
					
					
				}else{

					initSelectSistemas("");
					initSelectMedidaUso("");
					initSelectTiposServicios("");
					
					$('#estado_servicio').val(1).change().selectpicker('refresh');
					
				}
				
				
				initModelos("");
				initDataTableModelos();
		}
				
				
		initContent();	
		
		
		
		/******************************************/
		/*            VALIDAR FORMULARIO          */
		/******************************************/
				
		$( "#grabar" ).click(function() {

		  var form_ms = $('#form');
		  
		  var error1 = $('.alert-danger', form_ms);

		  form_ms.validate({errorElement: 'span', 
							errorClass: 'help-block help-block-error', 
							focusInvalid: false, 
							ignore: "",  
							rules: {
								idmantenimiento_sistemas: {
									required: true
								},
								nombre_servicio: {
									required: true
								},
								descripcion_servicio: {
									required: true
								},
								cod_servicio: {
									required: true
								},
								estado_servicio: {
									required: true
								},
								idmantenimiento_tipos_servicios: {
									required: true
								},
								id_medida_uso: {
									required: function(element) {
										if($('#idmantenimiento_tipos_servicios').find("option:selected").val() == 1)
											return true;
										else
											return false;
									}
								},
								ciclo_alerta: {
									min: function(element) {
											if($('#idmantenimiento_tipos_servicios').find("option:selected").val() == 1)
												return 1;
											else
												return 0;
									},
									required : function(element) {
										if($('#idmantenimiento_tipos_servicios').find("option:selected").val() == 1)
											return true;
										else
											return false;
									}
								},
								ejecucion_alerta: {
									min: function(element) {
											if($('#idmantenimiento_tipos_servicios').find("option:selected").val() == 1)
												return 1;
											else
												return 0;
									},
									required : function(element) {
										if($('#idmantenimiento_tipos_servicios').find("option:selected").val() == 1)
											return true;
										else
											return false;
									}
								}
							},
							invalidHandler: function (event, validator) { 
								error1.show();
								App.scrollTo(error1, -200);
							},
							errorPlacement: function (error, element) { 
							/*
								var cont = $(element).parent('.input-group');
								if (cont) {
									cont.after(error);
								} else {
									element.after(error);
								}*/
							},
							highlight: function (element) { 
								$(element).closest('.form-group').addClass('has-error'); 
								$(element).closest('.form-group').find('span.helper').removeClass('hide');
							},
							unhighlight: function (element) { 
								$(element).closest('.form-group').removeClass('has-error'); 
								$(element).closest('.form-group').find('span.helper').addClass('hide');
							},
							success: function (label) {
									label.closest('.form-group').removeClass('has-error'); 
							},
							submitHandler: function (form) {
								
									error1.hide();
									
									
									swal({
									  title: "CONFIRMACION REQUERIDA",
									  text: "¿Esta seguro que desea grabar el servicio de sistema?",
									  type: "warning",
									  showCancelButton: true,
									  confirmButtonClass: "btn-success",
									  confirmButtonText: "Si, grabar!",
									  cancelButtonText: "Cancelar",
									  closeOnConfirm: true
									},
									function(){

											/*****************************************/
											/*            AGREGAR  REGISTRO          */
											/*****************************************/		
											if (idItem == 'nuevo' || idItem == '') {
			
												var formdata = $("#form").serialize()+'&action_type=create';
												msg = "Registro guardado correctamente!";
												
												$.ajax({
												
													dataType:'JSON',
													type: 'POST',
													url: 'database/MantenimientoServiciosGet.php',
													data: formdata,
													success:function(idmantenimiento_servicios){
														
														var msg_toast_cabecera = "Se creo la cabecera de servicio de sistema con #ID " + idmantenimiento_servicios;
																
														toastIndex = toastCount++;
														toastr.options = {"positionClass": "toast-top-right"}
														var $toast = toastr["success"](msg_toast_cabecera); 
														
														//LEO TODAS LAS FILAS DE LA TABLA E INSERTO				
														oGridModelos.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
																
															var rowData = oGridModelos.row( rowIdx ).data();
																														
															$.ajax({
																url: 'database/ModelosVehiculosGet.php',
																type: 'POST',
																data: {
																	action_type: 'create_modelos_x_servicios',
																	idmantenimiento_servicios : idmantenimiento_servicios,
																	idmodelos_vehiculos : rowData['idmodelos_vehiculos'],
																	estado_modelo_x_servicio : 1
																},
																cache: false,
																success:function(iddetalle){
																	
																	var msg_toast_detalle = "Se registro el modelo " + rowData['modelo_vehiculo'] + " al servicio, con #ID " + iddetalle;
																	
																	toastIndex = toastCount++;
																	toastr.options = {"positionClass": "toast-top-right"}
																	var $toast = toastr["success"](msg_toast_detalle); 
																								
																},
																error: function(xhr) { 
																	console.log(xhr.statusText + xhr.responseText);
																}
															});
															
															
															
														} );
													
														$rootScope.$state.go('private.listar_mantenimiento_servicios');
													
																				
													},
													error: function(xhr) { 
														console.log(xhr.statusText + xhr.responseText);
													}
													
												});
			
											/*****************************************/
											/*          ACTUALIZAR REGISTRO          */
											/*****************************************/	
											}else if (idItem != '' && idItem != 'nuevo') {
			
												var formdata = $("#form").serialize()+'&action_type=update&id='+idItem;
												
												$.ajax({
												
													dataType:'JSON',
													type: 'POST',
													url: 'database/MantenimientoServiciosGet.php',
													data: formdata,
													success:function(idmantenimiento_servicios){
																														
														toastIndex = toastCount++;
														toastr.options = {"positionClass": "toast-top-right"}
														var $toast = toastr["success"]("Registro actualizado correctamente!"); 
														
														//LEO TODAS LAS FILAS DE LA TABLA E INSERTO				
														oGridModelos.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
																
															var rowData = oGridModelos.row( rowIdx ).data();
															
															if(rowData['status'] == 'new'){
																														
																$.ajax({
																	url: 'database/ModelosVehiculosGet.php',
																	type: 'POST',
																	data: {
																		action_type: 'create_modelos_x_servicios',
																		idmantenimiento_servicios : idItem,
																		idmodelos_vehiculos : rowData['idmodelos_vehiculos'],
																		estado_modelo_x_servicio : 1
																	},
																	cache: false,
																	success:function(iddetalle){
																		
																		var msg_toast_detalle = "Se registro el modelo " + rowData['modelo_vehiculo'] + " al servicio, con #ID " + iddetalle;
																		
																		toastIndex = toastCount++;
																		toastr.options = {"positionClass": "toast-top-right"}
																		var $toast = toastr["success"](msg_toast_detalle); 
																									
																	},
																	error: function(xhr) { 
																		console.log(xhr.statusText + xhr.responseText);
																	}
																});
															
															}
															
														} );
														
														
														$rootScope.$state.go('private.listar_mantenimiento_servicios');
													
																				
													},
													error: function(xhr) { 
														console.log(xhr.statusText + xhr.responseText);
													}
													
												});
												
												
			
											}
											/*****************************************************/
											/*        FIN DE AGREGAR O ACTUALIZAR REGISTRO       */
											/*****************************************************/	
											
											
											
									});
									
							}
	
					});
					
					
		});	
		
		/******************************************/
		/*        FIN VALIDAR FORMULARIO          */
		/******************************************/
		
		
		
		/**************************************/
		/*     CLICK BOTON ELIMINAR MODELO    */
		/**************************************/
		$('#datatable_modelos tbody').on( 'click', 'a.mt-sweetalert', function () {
			
			var data = oGridModelos.row( $(this).parents('tr') ).data();
						
			var rowToDelete = $(this).parents('tr');
										
					swal({
					  title: "¡Esta seguro?",
					  text: "Una vez eliminada, no será posible recuperar la información!",
					  type: "warning",
					  showCancelButton: true,
					  confirmButtonClass: "btn-success",
					  confirmButtonText: "Si, eliminar!",
					  cancelButtonText: "Cancelar",
					  closeOnConfirm: true
					},
					function(){
					
							/*******************************/
							/*    BORRAR REGISTRO EN BD    */
							/*******************************/
							$.ajax({
								dataType:'JSON',
								type: 'POST',
								url: 'database/ModelosVehiculosGet.php?action_type=delete_modelos_x_servicios&id='+data['idmodelos_x_servicios'],
								success:function(data){
																		
									switch(data.code){
									
										case "200"	:	swal("Eliminado!", "El registro ha sido eliminado.", "success");
														oGridModelos.row(rowToDelete).remove().draw( false );
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
							/*    BORRAR REGISTRO EN BD    */
							/*******************************/
								
							
					});
				
		} );
		/*******************************/
		/*  FIN CLICK BOTON ELIMINAR   */
		/*******************************/
		
		
		/******************************************/
		/*        AGREGAR MODELO AL DATATABLE     */
		/******************************************/
		$( "#agregar_modelo" ).click(function() {
						
				//SI ESTA SELECCIONADO EL MANTENIMIENTO PREVENTIVO
				if($('#idmantenimiento_tipos_servicios').find("option:selected").val() == 1){
	
						var idModelo = $('#idmodelos_vehiculos').find("option:selected").val();
						var existe = false;
						
						if(idModelo != ""){
							
							//LEO TODAS LAS FILAS DE LA TABLA PARA SABER SI YA EXISTE UNO IGUAL			
							oGridModelos.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
									
								var rowData = oGridModelos.row( rowIdx ).data();
								if(idModelo == rowData['idmodelos_vehiculos']) existe = true;
																																							
							});
							
								
							if(!existe){	
											
								var len = modelosSelect.length;
								
								for( var i = 0; i<len; i++){	
									if(idModelo == modelosSelect[i]['idmodelos_vehiculos']){
										
										modelosSelect[i]['status'] = 'new';
										
										oGridModelos.row.add(modelosSelect[i]).draw();
										break;
									}
								}
								
								swal("CONFIRMACION", "El modelo fue agregado correctamente.", "success");
							
							}else{
								swal("ERROR", "Este modelo ya fue agregado previamente.", "error");
							}
							
							$('#idmodelos_vehiculos').selectpicker('val', '');
							$('#idmodelos_vehiculos').selectpicker('refresh');
							
						}else{
							swal("ERROR", "Seleccione un modelo para agregar a la tabla.", "error");
						}
				
				}


		});	
		
		/******************************************/
		/*        FIN VALIDAR FORMULARIO          */
		/******************************************/
		
		
		
		
		
		
    });
}]);
