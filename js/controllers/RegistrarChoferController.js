/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarChoferController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		/*       	    VARIABLES    	       */
		/***************************************/	
		var idItem = $rootScope.$state.params.id; 
		var title;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg = "";
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
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
		
		
		
		
		/***************************************************/
		/*       	CARGAR SELECT TIPO LICENCIA      	   */
		/***************************************************/		
		function initTiposLicencia(SelectedIndex){
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/TipoLicenciaGet.php?action_type=list',
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#idtipo_licencia").empty();
						$("#idtipo_licencia").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idtipo_licencia = response.data[i]['idtipo_licencia'];
							var tipo_licencia = response.data[i]['tipo_licencia'];
							$('#idtipo_licencia').append($('<option>', { value: idtipo_licencia, text: tipo_licencia })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idtipo_licencia option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idtipo_licencia').selectpicker('refresh');
						}
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
			
		}
		
		
		/***************************************************/
		/*       	CARGAR SELECT IDENTIFICACION    	   */
		/***************************************************/		
		function initTiposIdentificacion(SelectedIndex){
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/TipoIdentificacioneGet.php?action_type=list',
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#idtipo_identificacion").empty();
						$("#idtipo_identificacion").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idtipo_identificacion = response.data[i]['idtipo_identificacion'];
							var tipo_identificacion = response.data[i]['tipo_identificacion'];
							$('#idtipo_identificacion').append($('<option>', { value: idtipo_identificacion, text: tipo_identificacion })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idtipo_identificacion option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idtipo_identificacion').selectpicker('refresh');
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
						url: 'database/ChoferesGet.php?action_type=edit&id='+idItem,
						success:function(data){

							//INICIO DE PERSONALIZACION DE CAMPOS
							$('#nombres_chofer').val(data.nombres_chofer);
							$('#apellidos_chofer').val(data.apellidos_chofer);
							$("#estado_chofer").val(data.estado_chofer).change();
							$('#email_chofer').val(data.email_chofer);
							$('#nro_identificacion').val(data.nro_identificacion);
							$('#estado_usuario').val(data.estado_usuario).change();
							$('#nro_licencia').val(data.nro_licencia);
							$('#usuario_chofer').val(data.usuario_chofer);
							$('#clave_chofer').val(data.clave_chofer);
							
							initSedes(data.sedes_idsedes);
							initTiposIdentificacion(data.idtipo_identificacion);
							initTiposLicencia(data.idtipo_licencia);
							
							initSelectVehiculos(data.vehiculos_idvehiculos, data.sedes_idsedes);
							
							//FIN DE PERSONALIZACION DE CAMPOS
							
							$('#usuario_chofer').attr("readonly", true);
										
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
							
				
				}else{
					
					initSedes("");	
					initTiposIdentificacion("");
					initTiposLicencia("");
					
					$('#estado_chofer').val(1).change().selectpicker('refresh');
					
					/*
					App.blockUI({
						target: '#documentos_adjuntos',
						boxed: true,
						textOnly: true,
						message: 'Esta sección esta bloqueda hasta que el usuario sea guardado.'
					});*/
						
				}
				
							
			
		}
		
		initEditContent();
		/***************************************/
		/*   FIN DE  CARGAR REGISTRO A EDITAR   */
		/***************************************/
		
		
		/***************************************/
		/*       VALIDAR FUERZA DE CLAVE       */
		/***************************************/
		var initialized = false;
		
        var input = $("#clave");

        input.keydown(function () {
            if (initialized === false) {
                // set base options
                input.pwstrength({
					ui: { showVerdictsInsideProgressBar: true, verdicts: ["Debil", "Normal", "Media", "Segura", "Muy segura"] },
                    raisePower: 1.4,
                    minChar: 8,
                    scores: [17, 26, 40, 50, 60]
                });

                // add your own rule to calculate the password strength
                input.pwstrength("addRule", "demoRule", function (options, word, score) {
                    return word.match(/[a-z].[0-9]/) && score;
                }, 10, true);

                // set as initialized 
                initialized = true;
            }
        });
		
		
		
		
		/***************************************/
		/*  FUNCION VALIDAR NOMBRE DE USUARIO   */
		/***************************************/
		function validarChofer(){
		
				var input = $("#usuario_chofer");
				
				if (input.val() === "") {
					input.closest('.form-group').removeClass('has-error').removeClass('has-success');
					$('.fa-check, fa-warning', input.closest('.form-group')).remove();
					$("#helper_usuario").addClass('hide');
					return;
				}
	
				input.attr("readonly", true).
				attr("disabled", true).
				addClass("spinner");
				
				
				//CAMPOS DE EDICION							
				 $.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ChoferesGet.php?action_type=validar_usuario&usuario_chofer='+input.val(),
					success:function(data){
	
						input.attr("readonly", false).attr("disabled", false).removeClass("spinner");
						$("#helper_usuario").removeClass('hide').html(data.message);
	
						if (data.status == 'false') {
							
							input.closest('.form-group').removeClass('has-success').addClass('has-error');
							$('.fa-check', input.closest('.form-group')).remove();
							input.before('<i class="fa fa-warning" data-original-title="El usuario ' + input.val() + ' no está disponible."></i>');
														
						} else {
							
							input.closest('.form-group').removeClass('has-error').addClass('has-success');
							$('.fa-warning', input.closest('.form-group')).remove();
							input.before('<i class="fa fa-check" data-original-title="El usuario ' + input.val() + ' está disponible."></i>');
							
							
														
						}
						
						
									
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
				
		
			
		}
		
		
		/***************************************/
		/*  FUNCION VALIDAR NOMBRE DE USUARIO   */
		/***************************************/
		function datosChofer(){
		
				var input = $("#usuario_chofer");
				
				if (input.val() === "") {
					input.closest('.form-group').removeClass('has-error').removeClass('has-success');
					$('.fa-check, fa-warning', input.closest('.form-group')).remove();
					$("#helper_usuario").addClass('hide');
					return;
				}
	
				//input.attr("readonly", true).attr("disabled", true).addClass("spinner");
				
				
				//CAMPOS DE EDICION							
				 $.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ChoferesGet.php?action_type=datos_sigap&usuario_chofer='+input.val(),
					success:function(response){
						
						console.log(response);
						
						if(response.authorize == true){
							
							$('#nombres_chofer').val(response.datos.nom_pers);
							$('#apellidos_chofer').val(response.datos.apepat_pers + ' ' + response.datos.apemat_pers);
							$('#email_chofer').val(response.datos.mail_pers);
						
						}else{
						
							$('#nombres_chofer').val("");
							$('#apellidos_chofer').val("");
							$('#email_chofer').val("");
								
						}
						
									
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
				
		
			
		}
		
		
		
		/***************************************/
		/*     VALIDAR NOMBRE DE USUARIO       */
		/***************************************/
		
		$("#usuario_chofer").keyup(function () {
						
			datosChofer();

        });
			
		
		
		/******************************************/
		/*            VALIDAR FORMULARIO          */
		/******************************************/
		var validatorObject;
		$( "#grabar_chofer" ).click(function() {

				 var form1 = $('#form');
				 var error1 = $('.alert-danger', form1);

		validatorObject = form1.validate({
						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "", 
						messages: {
							usuario_chofer: {
								required: "Ingrese un usuario",
								remote: jQuery.validator.format("El usuario {0} no está disponible.")
							},
							email_chofer: {
								required: "Ingrese un email valido",
								minlength: "Ingrese un email valido"
							}
						},
						rules: {
							nombres_chofer: {
								required: true
							},
							apellidos_chofer: {
								required: true
							},
							email_chofer: {
								required: true,
								email: true
							},
							idtipo_identificacion: {
								required: true
							},
							nro_identificacion: {
								required: true
							},
							idtipo_licencia: {
								required: true
							},
							nro_licencia: {
								required: true
							},
							sedes_idsedes: {
								required: true
							},
							estado_chofer: {
								required: true
							},
							usuario_chofer: {
								required: true,
								remote: {
									url: "database/ChoferesGet.php",
									type: "post",
									data: {
									  action_type: 'validar_chofer',
									  idItem: idItem,
									  usuario_chofer: function() {
										return $( "#usuario_chofer" ).val();
									  }
									  
									}
								}
							}/*,
							clave_chofer: {
								required: true
							}*/
						},
						invalidHandler: function (event, validator) { 
							error1.show();
							App.scrollTo(error1, -200);
						},
						errorPlacement: function (error, element) { 
						
							var icon = $(element).parent('.input-icon').children('i');
							icon.removeClass('fa-check').addClass("fa-warning");  
							icon.attr("data-original-title", error.text()).tooltip({'container': 'body'});
							
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
						success: function (label, element) {
							
								var icon = $(element).parent('.input-icon').children('i');
								$(element).closest('.form-group').removeClass('has-error').addClass('has-success'); 
								icon.removeClass("fa-warning").addClass("fa-check");
					
								label.closest('.form-group').removeClass('has-error'); 
						},
						submitHandler: function (form) {
						
							    swal({title: "CONFIRMACION REQUERIDA",
									  text: "¿Esta seguro que desea grabar la informacion del chofer?",
									  type: "warning",
									  showCancelButton: true,
									  confirmButtonClass: "btn-success",
									  confirmButtonText: "Si, grabar",
									  cancelButtonText: "Cancelar",
									  closeOnConfirm: true,
									},
									function(){
										
												
												/*****************************************************/
												/*            AGREGAR O ACTUALIZAR REGISTRO          */
												/*****************************************************/		
												if (idItem == 'nuevo' || idItem == '') {
				
													var formdata = $("#form").serialize()+'&action_type=create';
													msg = "Registro guardado correctamente!";
				
												}else if (idItem != '' && idItem != 'nuevo') {
				
													var formdata = $("#form").serialize()+'&action_type=update&id='+idItem;
													msg = "Registro actualizado correctamente!";
				
												}
																						
												$.ajax({
														dataType:'JSON',
														type: 'POST',
														url: 'database/ChoferesGet.php',
														data: formdata,
														success:function(data){
																			
															toastIndex = toastCount++;
															toastr.options = {"positionClass": "toast-top-right"}
															var $toast = toastr["success"](msg); 
																																											
															$rootScope.$state.go('private.listar_choferes');
																					
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
				
				//console.log(validatorObject);

		});	
		
		/******************************************/
		/*        FIN VALIDAR FORMULARIO          */
		/******************************************/
		
		
		
		
		
    });
}]);
