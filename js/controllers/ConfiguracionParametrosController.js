/* Setup general page controller */
angular.module('MetronicApp').controller('ConfiguracionParametrosController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {   
    	// initialize core components
    	//DATOS DE LOGIN PARA TODAS LAS PAGINAS
		App.initAjax();
		
		//DATOS DE LOGIN PARA TODAS LAS PAGINAS
		$rootScope.settings.sesion = AppSiscar.getSesion();
		$rootScope.settings.configuracion = AppSiscar.getConfiguracion();
		//FINALIZACION DE DATOS PARA TODAS LAS PAGINAS
		if (typeof($rootScope.settings.sesion) != 'undefined'){
if($rootScope.settings.sesion.authorize == null || $rootScope.settings.sesion.authorize == false) $rootScope.$state.go('login');
}else{
$rootScope.$state.go('login');
}
    	$rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

		//global settings 
		$.fn.editable.defaults.inputclass = 'form-control';
		$.fn.editable.defaults.mode = 'inline';
		$.mockjaxSettings.responseTime = 500;


		/***********************************/
		/* CARGAR LOS PARAMETROS A EDITAR  */
		/***********************************/
		/*$.ajax({
			dataType:'JSON',
			type: 'POST',
			url: 'database/ConfiguracionGet.php?action_type=cargar_configuracion',
			success:function(data){
				
				console.log(data);*/
				
				/*$('#razon_social').val(data.razon_social);
				$("#ruc_proveedor").val(data.ruc_proveedor);
				$("#telefono_proveedor").val(data.telefono_proveedor);
				$("#celular_proveedor").val(data.celular_proveedor);
				$("#domicilio_fiscal").val(data.domicilio_fiscal);
				$("#correo_electronico").val(data.correo_electronico);
				$("#representante_legal").val(data.representante_legal);
				$("#dni_representante_legal").val(data.dni_representante_legal);	
				$("#estado_proveedor").val(data.estado_proveedor).change();	*/		
				//FIN DE PERSONALIZACION DE CAMPOS

			/*},
			error: function(xhr) { 
				console.log(xhr.statusText + xhr.responseText);
			}
		});*/
				

		//editables element samples 
		$('#anticipacion_servicio').editable({
			url: 'database/ConfiguracionGet.php?action_type=update',
			type: 'text',
			value: AppSiscar.getParametro('MINIMO_HORAS_ANTICIPACION'),
			display: function(value) {
			  $(this).text( AppSiscar.getParametro('MINIMO_HORAS_ANTICIPACION') );
			},
			validate: function(value) {
				if ($.trim(value) == '') return 'Este campo es obligatorio';
			},
			success: function(response, newValue) {
				//
				//return {newValue: response.newValue};
				//$(this).editable('setValue',newValue);
				//$('#anticipacion_servicio').editable('setValue',"blah blah blah");
				$('#anticipacion_servicio').html(newValue);
				
			}
		});
		
		$('#duracion_min_servicio').editable({
			url: 'database/ConfiguracionGet.php?action_type=update',
			type: 'text',
			value: AppSiscar.getParametro('MINIMO_HORAS_DURACION'),
			validate: function(value) {
				if ($.trim(value) == '') return 'Este campo es obligatorio';
			},
			display: function(value) {
			  $(this).text( AppSiscar.getParametro('MINIMO_HORAS_DURACION') );
			},
			success: function(response, newValue) {

			}
		});
		
		$('#duracion_max_servicio').editable({
			url: 'database/ConfiguracionGet.php?action_type=update',
			type: 'text',
			value: AppSiscar.getParametro('MAXIMO_HORAS_DURACION'),
			validate: function(value) {
				if ($.trim(value) == '') return 'Este campo es obligatorio';
			},
			display: function(value) {
			  $(this).text( AppSiscar.getParametro('MAXIMO_HORAS_DURACION') );
			},
			success: function(response, newValue) {

			}
		});
		
		
		$('#tiempo_tolerancia').editable({
			url: 'database/ConfiguracionGet.php?action_type=update',
			type: 'text',
			value: AppSiscar.getParametro('MAXIMO_MINUTOS_TOLERANCIA'),
			validate: function(value) {
				if ($.trim(value) == '') return 'Este campo es obligatorio';
			},
			display: function(value) {
			  $(this).text( AppSiscar.getParametro('MAXIMO_MINUTOS_TOLERANCIA') );
			},
			success: function(response, newValue) {

			}
		});
		
		
		/*

		$('#vehiculos_pool').editable({
			inputclass: 'form-control input-medium',
			select2: {
				data: ['Vehiculo1', 'Vehiculo2', 'Vehiculo3', 'Vehiculo4'],
				tags: true,
				tokenSeparators: [',', ' '],
				multiple: true
			}
		});

	
		*/	



    });
}]);
