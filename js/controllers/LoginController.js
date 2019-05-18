angular.module('MetronicApp').controller('LoginController', function($rootScope, $scope, $http, $timeout) {
	
    $scope.$on('$viewContentLoaded', function() {   
		App.initAjax();
	});

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;


	$('.login-form input').keypress(function (e) {
		if (e.which == 13) {
			
		}
	});


	$('.forget-form').validate({
			errorElement: 'span', //default input error message container
			errorClass: 'help-block', // default input error message class
			focusInvalid: false, // do not focus the last invalid input
			ignore: "",
			rules: {
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				email: {
					required: "Ingrese su correo electronico."
				}
			},
			invalidHandler: function (event, validator) { //display error alert on form submit   

			},
			highlight: function (element) { // hightlight error inputs
				$(element)
					.closest('.form-group').addClass('has-error'); // set error class to the control group
			},
			success: function (label) {
				label.closest('.form-group').removeClass('has-error');
				label.remove();
			},
			errorPlacement: function (error, element) {
				error.insertAfter(element.closest('.input-icon'));
			},
			submitHandler: function (form) {
				form.submit();
			}
    });

	$('.forget-form input').keypress(function (e) {
		if (e.which == 13) {
			if ($('.forget-form').validate().form()) {
				$('.forget-form').submit();
			}
			return false;
		}
	});

	$('#forget-password').click(function () {
		$('.login-form').hide();
		$('.forget-form').show();
	});

	$('#back-btn').click(function () {
		$('.login-form').show();
		$('.forget-form').hide();
	});


	
	$("#acceder").click(function() {
			
			 var form_login = $('#form_login');
			 var error1 = $('.alert-danger', form_login);

			 form_login.validate({
						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "", 
						rules: {
							usuario: {
								required: true
							},
							clave: {
								required: true
							},
							recordarme: {
								required: false
							}
						},
						messages: {
							usuario: {
								required: "El usuario es obligatorio."
							},
							clave: {
								required: "La clave es obligatoria."
							}
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
						success: function (label, element) {
								//var icon = $(element).parent('.input-icon').children('i');
								$(element).closest('.form-group').removeClass('has-error').addClass('has-success'); 
								//icon.removeClass("fa-warning").addClass("fa-check");
								label.closest('.form-group').removeClass('has-error'); 
						},
						submitHandler: function (form) {

								/*****************************************************/
								/*    CONSULTO DATOS DE ACCESO A SIGAP PRIMERO       */
								/*****************************************************/		
																
								$.ajax({
										dataType:'JSON',
										type: 'POST',
										data: $('#form_login').serialize()+'&action_type=login_sigap',
										url: 'database/LoginGet.php',
										success:function(credentials){
																																	
											if(!credentials.authorize){
												
												swal("SISTEMA DE CONTROL VEHICULAR - SISCAR v1.0", credentials.mensaje, "error");
												
											}else{
																																								
												$.ajax({
														dataType:'JSON',
														type: 'POST',
														data: 'action_type=login_siscar&usuario=' + credentials.usuario + '&codigo=' + credentials.codigo,
														url: 'database/LoginGet.php',
														success:function(sesion){
															
															if(!sesion.authorize){
												
																swal("SISTEMA DE CONTROL VEHICULAR - SISCAR v1.0", sesion.mensaje, "error");
																
															}else{
																																
																	$rootScope.settings.sesion = sesion;
														
																	AppSiscar.initAjax();
																	
																	$.ajax({
																			dataType:'JSON',
																			type: 'POST',
																			data : { action_type : 'cargar_configuracion' },
																			url: 'database/ConfiguracionGet.php',
																			success:function(configuracion){
																					
																																								
																					$rootScope.settings.configuracion = configuracion;
																					$rootScope.$state.go('private.disponibilidad_vehiculos');
																																																																						
																					var mensaje = "Bienvenido, " + $rootScope.settings.sesion.nombres + ' ' + $rootScope.settings.sesion.apellidos;
																																																	
																					swal("SISTEMA DE CONTROL VEHICULAR - SISCAR v1.0", mensaje, "success");
																					
																					$.backstretch('destroy');
																					
																										
																			},
																			error: function(xhr) { 
																				console.log(xhr.statusText + xhr.responseText);
																			}
																	});
																	
																	
																
															}
																
														},
														error: function(xhr) { 
															console.log(xhr.statusText + xhr.responseText);
														}
												});
												
											}
																	
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


/*
	$('.register-form input').keypress(function (e) {
		if (e.which == 13) {
			if ($('.register-form').validate().form()) {
				$('.register-form').submit();
			}
			return false;
		}
	});

	$('#register-btn').click(function () {
		$('.login-form').hide();
		$('.register-form').show();
	});

	$('#register-back-btn').click(function () {
		$('.login-form').show();
		$('.register-form').hide();
	});

*/
	// init background slide images
	$.backstretch([
		"images/bg_siscar1.png",
		"images/bg_siscar2.png",
		"images/bg_siscar3.png"
		], {
		  fade: 1000,
		  duration: 8000
		}
	);


});