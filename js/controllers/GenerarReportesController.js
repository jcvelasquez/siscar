/* Setup general page controller */
angular.module('MetronicApp').controller('GenerarReportesController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		
		$('.date-picker').datepicker({
			autoclose: true,
			format: 'mm/yyyy',
			startView: "months", 
			minViewMode: "months"
		});
		
		
		$('#periodo_transparencia').datepicker({
			autoclose: true,
			format: 'mm/yyyy',
			startView: "months", 
			minViewMode: "months"
		});
		
		
		
		
		$( "#generar_reporte_mantenimiento" ).click(function() {

				 var form_mantenimiento = $('#form_mantenimiento');
				 var error_mantenimiento = $('.alert-danger', form_mantenimiento);

				 form_mantenimiento.validate({
						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						rules: {
							desde_mantenimiento: {
								required: true
							},
							hasta_mantenimiento: {
								required: true
							}
						},
						invalidHandler: function (event, validator) { 
							error_mantenimiento.show();
							App.scrollTo(error_mantenimiento, -200);
						},
						errorPlacement: function (error, element) { 
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

							var formdatamantenimiento = 'database/ReporteMantenimiento.php?' + $("#form_mantenimiento").serialize();
							window.open(formdatamantenimiento);

						}

				});

		});	
		
		/******************************************/
		/*        FIN VALIDAR FORMULARIO          */
		/******************************************/
		
		
		$( "#generar_reporte_combustible" ).click(function() {

				 var form_combustible = $('#form_combustible');
				 var error_combustible = $('.alert-danger', form_combustible);

				 form_combustible.validate({
						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						rules: {
							desde_combustible: {
								required: true
							},
							hasta_combustible: {
								required: true
							}
						},
						invalidHandler: function (event, validator) { 
							error_combustible.show();
							App.scrollTo(error_combustible, -200);
						},
						errorPlacement: function (error, element) { 
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

							var formdatacombustible = 'database/ReporteCombustible.php?' + $("#form_combustible").serialize();
							window.open(formdatacombustible);

						}

				});

		});	
		
		/******************************************/
		/*        FIN VALIDAR FORMULARIO          */
		/******************************************/
		
		
		$( "#generar_reporte_transparencia" ).click(function() {

				 var form_transparencia = $('#form_transparencia');
				 var error_transparencia = $('.alert-danger', form_transparencia);

				 form_transparencia.validate({
						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						rules: {
							desde_transparencia: {
								required: true
							},
							hasta_transparencia: {
								required: true
							}
						},
						invalidHandler: function (event, validator) { 
							error_transparencia.show();
							App.scrollTo(error_transparencia, -200);
						},
						errorPlacement: function (error, element) { 
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

							var formdatacombustible = 'database/ReporteTransparencia.php?' + $("#form_transparencia").serialize();
							window.open(formdatacombustible);

						}

				});

		});	
		
		
		
		
    });
}]);
