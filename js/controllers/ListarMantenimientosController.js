angular.module('MetronicApp').controller('ListarMantenimientosController', function($rootScope, $scope, $http, $timeout) {
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
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
		
	
			$('.easy-pie-chart .number.transactions').easyPieChart({
				animate: 1000,
				size: 75,
				lineWidth: 3,
				barColor: App.getBrandColor('yellow')
			});

			$('.easy-pie-chart .number.visits').easyPieChart({
				animate: 1000,
				size: 75,
				lineWidth: 3,
				barColor: App.getBrandColor('green')
			});

			$('.easy-pie-chart .number.bounce').easyPieChart({
				animate: 1000,
				size: 75,
				lineWidth: 3,
				barColor: App.getBrandColor('red')
			});
			

			$('#reload').click(function() {
				
			
				$('.easy-pie-chart .number').each(function() {
					var newValue = Math.floor(100 * Math.random());
					$(this).data('easyPieChart').update(newValue);
					$('span', this).text(newValue);
				});
				
			})
						
						
});

