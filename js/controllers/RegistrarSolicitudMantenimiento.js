/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarSolicitudMantenimiento', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		var formdata = "";
		var msg;
		var shortCutFunction;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg ="";
		var idVehiculo;
		var idServicio;
		
		
		
		$('#fecha_solicitud').datepicker({
			autoclose: true,
			endDate : new Date()
		});
		
		$('#fecha_solicitud').datepicker('setDate','+0');
				
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});
		
		//AL SELECCIONAR UN CONTRATO
		$('#sedes_idsedes').on('change', function(){
			var idSede = $(this).val();	
			if(idSede != ''){ 
				initSelectVehiculos("", idSede); 
			}else{
				$('#idvehiculos').empty();
				$("#idvehiculos").append('<option value="">Seleccione una sede</option>');
				$('#idvehiculos').prop('disabled', true);
		  		$('#idvehiculos').selectpicker('refresh');	
			}
		});	
		
		$('#idmantenimiento_sistemas').on('change', function(){
			
			var idMantenimientoSistema = $(this).val();	
			
			$('#idmantenimiento_servicios').empty();
			$("#idmantenimiento_servicios").append('<option value="">Seleccione un sistema</option>');
			$('#idmantenimiento_servicios').selectpicker('refresh');	
			
			$('#idmantenimiento_componentes').empty();
			$("#idmantenimiento_componentes").append('<option value="">Seleccione un sistema</option>');
			$('#idmantenimiento_componentes').selectpicker('refresh');
			
			$('#idmantenimiento_alertas').empty();
			$("#idmantenimiento_alertas").append('<option value="">Seleccione un sistema</option>');
			$('#idmantenimiento_alertas').selectpicker('refresh');
			
			$("#seleccionar_alerta").addClass('hide');	
			$("#is_alerta").val(0);					
				
			if(idMantenimientoSistema != ''){ 
				initSelectServicios("",idMantenimientoSistema); 
				initSelectComponentes("",idMantenimientoSistema); 
			}
			
		});
		
		
		//AL SELECCIONAR UN CONTRATO
		$('#idvehiculos').on('change', function(){
			idVehiculo = $(this).val();	
			initSelectAlertas(idServicio, idVehiculo);
		});	
		
		//AL SELECCIONAR UN CONTRATO
		$('#idmantenimiento_servicios').on('change', function(){
			idServicio = $(this).val();	
			initSelectAlertas(idServicio, idVehiculo);
		});
		
		
		
		var gridServicios = new Datatable();
		
		function initServiciosXsolicitud(){
			
				gridServicios = $('#datatable_servicios').DataTable({
							src: $("#datatable_servicios"),
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
								url: "database/MantenimientoSolicitudesGet.php?action_type=list_servicios_x_solicitudes&id=" + idItem
							},
							columns: [	
														
										{ data : "nombre_sistema" },
										{ data : "nombre_servicio"  },
										{ data : "nombre_componente" },
										{ data : "tipo_servicio_mantenimiento" },
										{ data : "descripcion_problema" },
										{
											"mData": null,
											"bSortable": false,
											"mRender": function(data, type, full) {
				
												if(data['is_alerta'] == 0) 
													$label = '<span class="label label-sm label-danger">NO</span>';
												else
													$label = '<span class="label label-sm label-success">SI</span>';
				
												return $label;
											}
											
										},
										{
										  "mData": null,
										  "bSortable": false,
										  "mRender": function(data, type, full) {
				
											return '<a href="javascript:;" data-id="' + data['idservicios_x_solicitudes'] + '" class="mt-sweetalert delete btn btn-xs btn-danger"><i class="fa fa-times"></i> Eliminar</a>';   			
																
										  }
										}
							]
							
							
					})
				
			
		}
		
		
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
		/*       	  CARGAR  SISTEMAS         */
		/***************************************/
		function initSelectSistemas(SelectedIndex){


			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/MantenimientoSistemasGet.php?action_type=list',
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
		/*     CARGAR  SELECT ALERTAS        */
		/***************************************/
		function initSelectAlertas(idmantenimiento_servicios, vehiculos_idvehiculos){
			
				//console.log("serv : " + idmantenimiento_servicios);
				//console.log("vehi : " + vehiculos_idvehiculos);
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/MantenimientoAlertasGet.php',
					data: { 
						action_type : 'alertas_x_servicio_vehiculo', 
						idmantenimiento_servicios : idmantenimiento_servicios ,
						vehiculos_idvehiculos : vehiculos_idvehiculos 
					},
					success:function(response){
												
						var len = response.data.length;
												
						if(len > 0) {
							
							swal({title: "ALERTA ENCONTRADA",
								  text: "Existe una alerta asociada al vehiculo y servicio seleccionado. ¿Desea revisar la alerta?",
								  type: "warning",
								  showCancelButton: true,
								  confirmButtonClass: "btn-success",
								  confirmButtonText: "Si, seleccionar",
								  cancelButtonText: "Ignorar alerta",
								  closeOnConfirm: true
								},
								function(){ 
									$("#seleccionar_alerta").removeClass('hide'); 
									$("#is_alerta").val(1);
								});
								
						}
						
						$("#idmantenimiento_alertas").empty();
						$("#idmantenimiento_alertas").append('<option value="">Seleccione una alerta</option>');
						
						for( var i = 0; i<len; i++){
							var idmantenimiento_alertas = response.data[i]['idmantenimiento_alertas'];
							var descripcion_alerta = response.data[i]['descripcion_alerta'];
														
							$('#idmantenimiento_alertas').append($('<option>', { value: idmantenimiento_alertas, text: descripcion_alerta })).selectpicker('refresh');
						}
						
						//ACTIVO EL SELECT
						//$('#idmantenimiento_alertas').prop('disabled', false);
	  					//$('#idmantenimiento_alertas').selectpicker('refresh');
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						/*if(SelectedIndex != ""){
							$("#idmantenimiento_alertas option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmantenimiento_alertas').selectpicker('refresh');
						}*/

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
					url: 'database/MantenimientoComponentesGet.php?action_type=componentes_x_sistema&id=' + idSistemas,
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
		/*      CARGAR  TIPOS DE SERVICIOS     */
		/***************************************/
		function initSelectTiposServicios(SelectedIndex){

			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/MantenimientoTiposServiciosGet.php?action_type=list',
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
		/*      CARGAR  TIPOS DE SERVICIOS     */
		/***************************************/
		function initSelectTiposServiciosModal(){

			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/MantenimientoTiposServiciosGet.php?action_type=list',
				success:function(response){
					
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#idmantenimiento_tipos_servicios_nuevo").empty();
					$("#idmantenimiento_tipos_servicios_nuevo").append('<option value="">Seleccione un tipo</option>');
					
					for( var i = 0; i<len; i++){
						var idmantenimiento_tipos_servicios = response.data[i]['idmantenimiento_tipos_servicios'];
						var tipo_servicio_mantenimiento = response.data[i]['tipo_servicio_mantenimiento'];
													
						$('#idmantenimiento_tipos_servicios_nuevo').append($('<option>', { value: idmantenimiento_tipos_servicios, text: tipo_servicio_mantenimiento })).selectpicker('refresh');
					}
					//FIN CARGA DE REGISTROS EN EL SELECT
	
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
						url: 'database/MantenimientoSolicitudesGet.php?action_type=edit&id='+idItem,
						success:function(data){
							
							
							$('#fecha_solicitud').datepicker('update', data.fecha_solicitud);
							$('#descripcion_solicitud').val(data.descripcion_solicitud);
							
							initSedes(data.sedes_idsedes);
							initSelectVehiculos(data.vehiculos_idvehiculos, data.sedes_idsedes);
							initSelectSistemas("");
							initSelectTiposServicios("");
							
							idVehiculo = data.vehiculos_idvehiculos;							
			
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
					
					
					
				
				}else{
					

					$('#idmantenimiento_servicios').prop('disabled', true);
	  				$('#idmantenimiento_servicios').selectpicker('refresh');
					
					$('#idmantenimiento_componentes').prop('disabled', true);
	  				$('#idmantenimiento_componentes').selectpicker('refresh');
											
					//initSelectVehiculos("");
					initSelectSistemas("");
					initSelectTiposServicios("");
					initSedes("");
				
					App.blockUI({
						target: '#items_sistemas',
						boxed: true,
						textOnly: true,
						message: 'Esta sección esta bloqueda hasta que la solicitud sea guardada.'
					});
					
		
		
				}
				
				/***************************************/
				/*   FIN DE  CARGAR REGISTRO A EDITAR   */
				/***************************************/					
			
		}
		
				
		
		
		


		
		/******************************************/
		/*            VALIDAR FORMULARIO          */
		/******************************************/
		

		$( "#grabar_solicitud" ).click(function() {

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
							idvehiculos: {
								required: true
							},
							descripcion_solicitud: {
								required: true
							},
							fecha_solicitud: {
								required: true
							}
						},

						invalidHandler: function (event, validator) { 
							error1.show();
							App.scrollTo(error1, -200);
						},

						errorPlacement: function (error, element) { 
						
							var cont = $(element).parent('.form-group');
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
								
								if (idItem == 'nuevo' || idItem == '') {
	
									formdata = $("#form").serialize()+'&action_type=create';
									msg = "Registro guardado correctamente!";

								}else if (idItem != '' && idItem != 'nuevo') {

									formdata = $("#form").serialize()+'&action_type=update&id='+idItem;
									msg = "Registro actualizado correctamente!";

								}
																																	
								swal({
								  title: "CONFIRMACION REQUERIDA",
								  text: "¿Esta seguro que desea grabar la solicitud?",
								  type: "warning",
								  showCancelButton: true,
								  confirmButtonClass: "btn-success",
								  confirmButtonText: "Si, guardar!",
								  cancelButtonText: "Cancelar",
								  closeOnConfirm: false
								},
								function(){
											
									/*****************************************************/
									/*            AGREGAR O ACTUALIZAR REGISTRO          */
									/*****************************************************/		
									
									$.ajax({
										
											dataType:'JSON',
											type: 'POST',
											url: 'database/MantenimientoSolicitudesGet.php',
											data: formdata,
											success:function(response){
																								
												//CAMBIA EL NUEVO ID DE LA SOLICITUD
												if (idItem == 'nuevo' || idItem == ''){
													
													idItem = response;
												
													swal({
													  title: "CONFIRMACION",
													  text: "Ahora puede agregar servicios y componentes asociados a esta solicitud. La pantalla se actualizará al pulsar Aceptar.",
													  type: "success",
													  showCancelButton: false,
													  confirmButtonClass: "btn-sucess",
													  confirmButtonText: "Aceptar",
													  closeOnConfirm: true
													},
													function(){
													
														$rootScope.$state.go('private.registrar_solicitud_mantenimiento', {"id" : idItem});											
															
													});
													
												}else{
													
													swal("CONFIRMACION", "La solicitud ha sido actualizada correctamente.", "success");
													
												}
												/*
												toastIndex = toastCount++;
												toastr.options = {"positionClass": "toast-top-right"}
												var $toast = toastr["success"](msg); */
												
											},
											error: function(xhr) { 
												console.log(xhr.statusText + xhr.responseText);
											}
									});
									
									/*****************************************************/
									/*        FIN DE AGREGAR O ACTUALIZAR REGISTRO       */
									/*****************************************************/	
								
										
										
								});

								

						}

				});

		});
		
		
		/*******************************************/
		/*      	    FIN TEMPLATE     		   */
		/*******************************************/
		
		
		
		/**********************************************/
		/*          GRABAR SISTEMAS ADJUDICADOS		  */
		/**********************************************/
		$( "#grabar_servicios" ).click(function() {

				 var form_servicios = $('#form_servicios');
				 var error_items = $('.alert-danger.items', form_servicios);

				 form_servicios.validate({

						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						rules: {
							idmantenimiento_sistemas: {
								required: true
							},
							idmantenimiento_servicios: {
								required: true
							},
							idmantenimiento_componentes: {
								required: true
							},
							idmantenimiento_tipos_servicios: {
								required: true
							},
							descripcion_problema: {
								required: true
							}
						},

						invalidHandler: function (event, validator) { 
							error_items.show();
							App.scrollTo(error_items, -55);
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

								error_items.hide();

								/*****************************************************/
								/*           GRABAR SERVICIOS DE SOLICITUD           */
								/*****************************************************/		
								
								formdata = $("#form_servicios").serialize()+'&action_type=create_servicios_x_solicitudes&id=' + idItem;
								msg = "Servicio agregado correctamente a la solicitud!";
								
								//console.log(formdata);
																
								$.ajax({
										dataType:'JSON',
										type: 'POST',
										url: 'database/MantenimientoSolicitudesGet.php',
										data: formdata,
										success:function(response){
												
											toastIndex = toastCount++;
											toastr.options = {"positionClass": "toast-top-right"}
											var $toast = toastr["success"](msg); 
											
											$("#form_servicios")[0].reset();
											
											$("#idmantenimiento_sistemas option").selectpicker('deselectAll');
											$('#idmantenimiento_sistemas').selectpicker('refresh');

											$("#idmantenimiento_tipos_servicios option").selectpicker('deselectAll');
											$('#idmantenimiento_tipos_servicios').selectpicker('refresh');
											
											$("#idmantenimiento_alertas option").selectpicker('deselectAll');
											$('#idmantenimiento_alertas').selectpicker('refresh');
											
											$("#idmantenimiento_componentes").empty();
											$("#idmantenimiento_componentes").append('<option value="">Seleccione un sistema primero</option>');
											$('#idmantenimiento_componentes').selectpicker('refresh');
											
											$("#idmantenimiento_servicios").empty();
											$("#idmantenimiento_servicios").append('<option value="">Seleccione un sistema primero</option>');
											$('#idmantenimiento_servicios').selectpicker('refresh');
			
											$("#seleccionar_alerta").addClass('hide');
											$("#is_alerta").val(0);
											
											var new_url_items = "database/MantenimientoSolicitudesGet.php?action_type=list_servicios_x_solicitudes&id=" + idItem
											gridServicios.ajax.url(new_url_items).load();
												
											
										},
										error: function(xhr) { 
											console.log(xhr.statusText + xhr.responseText);
										}
								});
	
								/*****************************************************/
								/*        FIN DE AGREGAR O ACTUALIZAR REGISTRO       */
								/*****************************************************/	

						}

				});

		});
		
		/*************************************************/
		/*            VALIDAR ITEMS ADJUDICADOS          */
		/*************************************************/
				
				
		/*******************************/
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_servicios tbody').on( 'click', 'a.mt-sweetalert', function () {
			
			var data = gridServicios.row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
							
							
					swal({
					  title: "¿Está seguro?",
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
							
							var formdataservicios = '&action_type=delete_servicios_x_solicitudes&id=' + data['idservicios_x_solicitudes'];
							 
							$.ajax({
								dataType:'JSON',
								type: 'POST',
								url: 'database/MantenimientoSolicitudesGet.php',
								data : formdataservicios,
								success:function(data){
									

									switch(data.code){
									
										case "200"		:	swal("Eliminado!", "El registro ha sido eliminado.", "success");
															gridServicios.row(rowToDelete).remove().draw( false );
															break;
															
										case "1451"		:	swal("Error al eliminar!", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar el contrato, deberá todos los documentos asociados a este registro.", "error");
															break;
															
										default			:	swal("Error al elimnar!!", "El registro no se puede eliminar.", "error");
																	
									
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
		
		/**********************************************/
		/*          GRABAR SISTEMAS ADJUDICADOS		  */
		/**********************************************/
		
		var idSistemaSeleccionado = "";
		var nomSistemaSeleccionado = "";
		
		$( "#agregar_servicio" ).click(function(){
			
			idSistemaSeleccionado = $('#idmantenimiento_sistemas').find("option:selected").val();
			nomSistemaSeleccionado = $('#idmantenimiento_sistemas').find("option:selected").text();
			
			if(idSistemaSeleccionado != ""){
				
				$('#modal_servicios').modal('show');
				$('#modal_servicios').find('h4.modal-title').html("AGREGAR SERVICIO A " + nomSistemaSeleccionado);
				
				initSelectTiposServiciosModal();
				
			}else{
				swal("ERROR", "Debe seleccionar un sistema para agregar un servicio.", "error");
			}
				
			
		});
		
		$( "#agregar_componente" ).click(function(){
			
			idSistemaSeleccionado = $('#idmantenimiento_sistemas').find("option:selected").val();
			nomSistemaSeleccionado = $('#idmantenimiento_sistemas').find("option:selected").text();
			
			if(idSistemaSeleccionado != ""){
				
				$('#modal_componentes').modal('show');
				$('#modal_componentes').find('h4.modal-title').html("AGREGAR COMPONENTE A " + nomSistemaSeleccionado);
								
			}else{
				swal("ERROR", "Debe seleccionar un sistema para agregar un componente.", "error");
			}
				
			
		});
		
		
		
		/******************************************/
		/*         GRABAR NUEVO SERVICIO          */
		/******************************************/
				
		$("#grabar_seleccionar_servicio").click(function() {
			
		  var form_nuevo_servicio = $('#form_nuevo_servicio');
		  
		  var error_nuevo_servicio = $('.alert-danger', form_nuevo_servicio);

		  form_nuevo_servicio.validate({errorElement: 'span', 
									errorClass: 'help-block help-block-error', 
									focusInvalid: false, 
									ignore: "",  
									rules: {
											nombre_servicio: {
												required: true
											},
											descripcion_servicio: {
												required: true
											},
											cod_servicio: {
												required: true
											},
											idmantenimiento_tipos_servicios_nuevo: {
												required: true
											}
									},
									invalidHandler: function (event, validator) { 
										error_nuevo_servicio.show();
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
										
											error_nuevo_servicio.hide();
		
											/*****************************************/
											/*            AGREGAR  REGISTRO          */
											/*****************************************/		
											$.ajax({
											
												dataType:'JSON',
												type: 'POST',
												url: 'database/MantenimientoServiciosGet.php',
												data: {
													action_type : "create",
													idmantenimiento_sistemas : idSistemaSeleccionado,
													idmantenimiento_tipos_servicios : $('#idmantenimiento_tipos_servicios_nuevo').val(),
													cod_servicio : $('#cod_servicio').val(),
													nombre_servicio : $('#nombre_servicio').val(),
													descripcion_servicio : $('#descripcion_servicio').val(),
													usuario_creacion : $rootScope.settings.sesion.usuario
												},
												success:function(idNuevoServicio){
																										
													var msg_toast_servicio = "Se grabo el nuevo servicio con #ID " + idNuevoServicio + " y se selecciono correctamente.";
															
													toastIndex = toastCount++;
													toastr.options = {"positionClass": "toast-top-right"}
													var $toast = toastr["success"](msg_toast_servicio); 
													
													initSelectServicios(idNuevoServicio, idSistemaSeleccionado);
													
													$("#idmantenimiento_sistemas_nuevo option").selectpicker('deselectAll');
													$('#idmantenimiento_sistemas_nuevo').selectpicker('refresh');
													
													$("#form_nuevo_servicio")[0].reset();
													$('#modal_servicios').modal('hide');
																			
												},
												error: function(xhr) { 
													console.log(xhr.statusText + xhr.responseText);
												}
												
											});
											/*****************************************/
											/*        FIN DE AGREGAR  REGISTRO       */
											/*****************************************/		
											
									}
	
								});
					
					
		});	
		
		/******************************************/
		/*        FIN VALIDAR FORMULARIO          */
		/******************************************/
		
		
		/******************************************/
		/*         GRABAR NUEVO SERVICIO          */
		/******************************************/
				
		$("#grabar_seleccionar_componente").click(function() {
			
		  var form_nuevo_componente = $('#form_nuevo_componente');
		  
		  var error_nuevo_componente = $('.alert-danger', form_nuevo_componente);

		  form_nuevo_componente.validate({errorElement: 'span', 
									errorClass: 'help-block help-block-error', 
									focusInvalid: false, 
									ignore: "",  
									rules: {
											nombre_componente: {
												required: true
											},
											cod_componente: {
												required: true
											}
									},
									invalidHandler: function (event, validator) { 
										error_nuevo_componente.show();
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
										
											error_nuevo_componente.hide();
		
											/*****************************************/
											/*            AGREGAR  REGISTRO          */
											/*****************************************/		
											$.ajax({
											
												dataType:'JSON',
												type: 'POST',
												url: 'database/MantenimientoComponentesGet.php',
												data: {
													action_type : "create",
													idmantenimiento_sistemas : idSistemaSeleccionado,
													nombre_componente : $('#nombre_componente').val(),
													cod_componente : $('#cod_componente').val(),
													estado_componente : 1,
													usuario_creacion : $rootScope.settings.usuario
												},
												success:function(idNuevoComponente){
																										
													var msg_toast_servicio = "Se grabo el nuevo componente con #ID " + idNuevoComponente + " y se selecciono correctamente.";
															
													toastIndex = toastCount++;
													toastr.options = {"positionClass": "toast-top-right"}
													var $toast = toastr["success"](msg_toast_servicio); 
													
													initSelectComponentes(idNuevoComponente, idSistemaSeleccionado);
													
													$("#form_nuevo_componente")[0].reset();
													$('#modal_componentes').modal('hide');
																			
												},
												error: function(xhr) { 
													console.log(xhr.statusText + xhr.responseText);
												}
												
											});
											/*****************************************/
											/*        FIN DE AGREGAR  REGISTRO       */
											/*****************************************/		
											
									}
	
								});
					
					
		});	
		
		/******************************************/
		/*        FIN VALIDAR FORMULARIO          */
		/******************************************/
			
		
				
				
				
		//SE INICIAN LAS FUNCIONES
		initEditContent();
		initServiciosXsolicitud();
		
		
		
		
		
    });
}]);
