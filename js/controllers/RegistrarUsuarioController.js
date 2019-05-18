/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarUsuarioController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});	
		
		
		//AL SELECCIONAR UN CONTRATO
		$('#sedes_idsedes').on('change', function(){
			
			var IdSede = $(this).val();	
			
			$("#areas_idareas").empty();
			$("#areas_idareas").append('<option value="">Seleccione un area</option>');
			$('#areas_idareas').selectpicker('refresh');
			
			if(IdSede != ''){
			
				initAreas("", IdSede);
									
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
		/*       	CARGAR SELECT AREAS    	   */
		/***************************************/	
		function initAreas(SelectedIndex, IdSede){
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/AreasGet.php?action_type=areas_x_sedes&id=' + IdSede,
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#areas_idareas").empty();
						$("#areas_idareas").append('<option value="">Seleccione una area</option>');
						
						for( var i = 0; i<len; i++){
							var idareas = response.data[i]['idareas'];
							var nombre_area = response.data[i]['nombre_area'];
							$('#areas_idareas').append($('<option>', { value: idareas, text: nombre_area })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#areas_idareas option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#areas_idareas').selectpicker('refresh');
						}
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
			
		}	
		
		
		
		
		/***************************************/
		/*       	CARGAR SELECT ROLES    	   */
		/***************************************/		
		function initRoles(SelectedIndex){
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/RolesGet.php?action_type=list',
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#roles_idroles").empty();
						$("#roles_idroles").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idroles = response.data[i]['idroles'];
							var nombre_rol = response.data[i]['nombre_rol'];
							$('#roles_idroles').append($('<option>', { value: idroles, text: nombre_rol })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#roles_idroles option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#roles_idroles').selectpicker('refresh');
						}
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
			
		}	
		
		
		
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
						url: 'database/UsuariosGet.php?action_type=edit&id='+idItem,
						success:function(data){
							
							//INICIO DE PERSONALIZACION DE CAMPOS
							$('#nombres').val(data.nombres);
							$('#apellidos').val(data.apellidos);
							$("#sexo").val(data.sexo).change();
							$('#direccion_uno').val(data.direccion_uno);
							$('#email').val(data.email);
							$('#telefono').val(data.telefono);
							$('#tipo_identificacion').val(data.tipo_identificacion);
							$('#nro_identificacion').val(data.nro_identificacion);
							$('#estado_usuario').val(data.estado_usuario).change();
							$('#tipo_licencia').val(data.tipo_licencia).change();
							$('#nro_licencia').val(data.nro_licencia);
							$('#usuario').val(data.usuario);
							$('#clave').val(data.clave);
							$('#prioridad').val(data.prioridad).change().selectpicker('refresh');
							
							$('#codigo').val(data.codigo);
							
							
							initSedes(data.sedes_idsedes);
							initRoles(data.roles_idroles);
							initTiposIdentificacion(data.idtipo_identificacion);
							initTiposLicencia(data.idtipo_licencia);
							initAreas(data.areas_idareas, data.sedes_idsedes);
							
							
							//FIN DE PERSONALIZACION DE CAMPOS
							
							$('#usuario').attr("readonly", true);
										
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
							
				
				}else{
					
					initSedes("");	
					initRoles("");
					initTiposIdentificacion("");
					initTiposLicencia("");
					
					$('#estado_usuario').val(1).change().selectpicker('refresh');	
					
					App.blockUI({
						target: '#documentos_adjuntos',
						boxed: true,
						textOnly: true,
						message: 'Esta sección esta bloqueda hasta que el usuario sea guardado.'
					});
						
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
		function validarUsuario(){
		
				var input = $("#usuario");
				
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
					url: 'database/UsuariosGet.php?action_type=validar_usuario&usuario='+input.val(),
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
		/*     VALIDAR NOMBRE DE USUARIO       */
		/***************************************/
		
		$("#usuario").change(function () {
						
			//validarUsuario();

        });
			
		
		
		/******************************************/
		/*            VALIDAR FORMULARIO          */
		/******************************************/
		var validatorObject;
		$( "#grabar_usuario" ).click(function() {

				 var form1 = $('#form');
				 var error1 = $('.alert-danger', form1);

		validatorObject = form1.validate({
						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "", 
						messages: {
							usuario: {
								required: "Ingrese un usuario",
								remote: jQuery.validator.format("El usuario {0} no está disponible.")
							},
							email: {
								required: "Ingrese un email valido",
								minlength: "Ingrese un email valido"
							}
						},
						rules: {
							nombres: {
								required: true
							},
							apellidos: {
								required: true
							},
							sexo: {
								required: true
							},
							direccion_uno: {
								required: true
							},
							email: {
								required: true,
								email: true
							},
							telefono: {
								required: true
							},
							idtipo_identificacion: {
								required: true
							},
							nro_identificacion: {
								required: true
							},
							sedes_idsedes: {
								required: true
							},
							areas_idareas: {
								required: true
							},
							roles_idroles: {
								required: true
							},
							estado_usuario: {
								required: true
							},
							idtipo_licencia: {
								required: true
							},
							nro_licencia: {
								required: true
							},
							prioridad: {
								required: true
							},
							usuario: {
								required: true,
								remote: {
									url: "database/UsuariosGet.php",
									type: "post",
									data: {
									  action_type: 'validar_usuario',
									  idItem: idItem,
									  usuario: function() {
										return $( "#usuario" ).val();
									  }
									  
									}
								}
							}
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
						
							    swal({title: "¿Esta seguro?",
									  text: "Se registrará toda la información el usuario!",
									  type: "warning",
									  showCancelButton: true,
									  confirmButtonClass: "btn-success",
									  confirmButtonText: "Si, grabar!",
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
														url: 'database/UsuariosGet.php',
														data: formdata,
														success:function(data){
																			
															toastIndex = toastCount++;
															toastr.options = {"positionClass": "toast-top-right"}
															var $toast = toastr["success"](msg); 
																																											
															$rootScope.$state.go('private.listar_usuarios');
																					
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
