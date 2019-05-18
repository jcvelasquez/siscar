/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
			
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout3',
		uploadPathContratos: 'adjuntos/contratos',
		uploadPathFacturas: 'adjuntos/facturas',
		uploadPathOrdenCompra: 'adjuntos/ordenescompra',
		uploadPathTicket: 'adjuntos/tickets',
		uploadPathVehiculos: 'adjuntos/vehiculos',
		imagesPath: 'images',
		sesion: [],
		configuracion: []
    };

    $rootScope.settings = settings;
	
    return settings;
	
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
		
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
		AppSiscar.initMenu(); // init header
    });
}]);



/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar($state); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */

MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('PageHeadController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {        
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
		//AppSiscar.initMenu(); // init header
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
	// Redirect any unmatched url
	$urlRouterProvider.otherwise("/login");  
	

	/************************/
    /*        PUBLIC        */
	/************************/
		$stateProvider
		
				 // LISTAR CONTRATOS
				 .state("login", {
					url: "/login",
					templateUrl: "views/login.html",
					data: {pageTitle: 'LISTAR CONTRATOS'},
					controller: "LoginController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files: [
									'assets/global/plugins/backstretch/jquery.backstretch.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/select2/js/select2.full.min.js',
									'assets/global/plugins/select2/css/select2.min.css',
									'assets/pages/css/login-4.css',
									'js/controllers/LoginController.js'
								]
							});
						}]
					}
					
				})
	
	
		
				// User Profile
				.state("private", {
					url: "/private",
					templateUrl: "views/private/main.html",
					data: {pageTitle: 'Private'},
					controller: "BlankController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',  
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'js/controllers/BlankController.js'
								]                    
							});
						}]
					}
				})

		  
				  // LISTAR CONTRATOS
				 .state("private.listar_contratos", {
					url: "/listar_contratos",
					templateUrl: "views/listar_contratos.html",
					data: {pageTitle: 'LISTAR CONTRATOS'},
					controller: "ListarContratosController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files: [
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
									'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css',
									'assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css',
									'assets/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js',
									'assets/global/plugins/bootstrap-modal/js/bootstrap-modal.js',
									'js/controllers/ListarContratosController.js'
								]
							});
						}]
					}
					
				})
		  
				
				.state('private.generar_reportes', {
					url: "/generar_reportes.html",
					templateUrl: "views/generar_reportes.html",
					data: {pageTitle: 'GENERAR REPORTES'},
					controller: "GenerarReportesController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [   
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | VALIDATE
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'js/controllers/GenerarReportesController.js'
				
								]
							});
						}]
					}
				})
		
				
				/*****************************/
				/*							 */
				/*		 	DASHBOARD 	 	 */		
				/*							 */
				/*****************************/
				
				/*
				.state('dashboard', {
					url: "/dashboard.html",
					templateUrl: "views/dashboard.html",            
					data: {pageTitle: 'SISTEMA DE MANTENIMINETO VEHICULAR - SISCAR v1.0'},
					controller: "DashboardController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/morris/morris.css',                            
									'assets/global/plugins/morris/morris.min.js',
									'assets/global/plugins/morris/raphael-min.js',                            
									'assets/global/plugins/jquery.sparkline.min.js',
									'assets/pages/scripts/dashboard.min.js',
									'js/controllers/DashboardController.js',
								] 
							});
						}]
					}
				})
				
				*/
				
				/*****************************/
				/*							 */
				/*		 MENU SERVICIOS 	 */		
				/*							 */
				/*****************************/
		
		
				// LISTAR SERVICIOS DE COMISION
				
				.state("private.listar_servicios", {
					url: "/listar_servicios",
					templateUrl: "views/listar_servicios.html",
					data: {pageTitle: 'LISTAR SERVICIOS'},
					controller: "ListarServiciosController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.js',
									'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarServiciosController.js'
									
								]
							});
						}]
					}
					
				})
				
				
									
				// LISTAR SERVICIOS DE COMISION
				.state("private.listar_roles", {
					url: "/listar_roles",
					templateUrl: "views/listar_roles.html",
					data: {pageTitle: 'LISTAR ROLES DE USUARIOS'},
					controller: "ListarRolesController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarRolesController.js'
									
								]
							});
						}]
					}
					
				})
				
				
				// LISTAR SERVICIOS DE COMISION
				.state("private.listar_areas", {
					url: "/listar_areas",
					templateUrl: "views/listar_areas.html",
					data: {pageTitle: 'LISTAR AREAS'},
					controller: "ListarAreasController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarAreasController.js'
									
								]
							});
						}]
					}
				})
				
				
				// LISTAR SERVICIOS DE COMISION
				.state("private.listar_vales", {
					url: "/listar_vales",
					templateUrl: "views/listar_vales.html",
					data: {pageTitle: 'LISTAR VALES'},
					controller: "ListarValesController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarValesController.js'
									
								]
							});
						}]
					}
				})
				
				// LISTAR SERVICIOS DE COMISION
				.state("private.listar_tipos_identificacion", {
					url: "/listar_tipos_identificacion",
					templateUrl: "views/listar_tipos_identificacion.html",
					data: {pageTitle: 'LISTAR TIPOS DE IDENTIFICACION'},
					controller: "ListarTiposIdentificacion",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarTiposIdentificacion.js'
									
								]
							});
						}]
					}
					
				})
				
				
				
				// LISTAR SERVICIOS DE COMISION
				.state("private.listar_medidas_uso", {
					url: "/listar_medidas_uso",
					templateUrl: "views/listar_medidas_uso.html",
					data: {pageTitle: 'LISTAR UNIDADES DE MEDIDA DE USO'},
					controller: "ListarMedidasUsoController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarMedidasUsoController.js'
									
								]
							});
						}]
					}
					
				})
				
				// LISTAR SERVICIOS DE COMISION
				.state("private.listar_medidas_combustible", {
					url: "/listar_medidas_combustible",
					templateUrl: "views/listar_medidas_combustible.html",
					data: {pageTitle: 'LISTAR UNIDADES DE MEDIDA DE COMBUSTIBLE'},
					controller: "ListarMedidasCombustibleController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarMedidasCombustibleController.js'
									
								]
							});
						}]
					}
					
				})


	
				// LISTAR SERVICIOS DE COMISION
				.state("private.listar_tipos_licencias", {
					url: "/listar_tipos_licencias",
					templateUrl: "views/listar_tipos_licencias.html",
					data: {pageTitle: 'LISTAR TIPOS DE LICENCIA'},
					controller: "ListarTiposLicencia",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarTiposLicencia.js'
									
								]
							});
						}]
					}
					
				})
				
				// LISTAR SERVICIOS DE COMISION
				.state("private.listar_tipos_combustibles", {
					url: "/listar_tipos_combustibles",
					templateUrl: "views/listar_tipos_combustibles.html",
					data: {pageTitle: 'LISTAR TIPOS DE COMBUSTIBLES'},
					controller: "ListarTiposCombustiblesController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarTiposCombustiblesController.js'
									
								]
							});
						}]
					}
					
				})
				
				
				
				
				// SOLICITAR SERVICIO
				.state("private.listar_servicios_chofer", {
					url: "/listar_servicios_chofer",
					templateUrl: "views/listar_servicios_chofer.html",
					data: {pageTitle: 'LISTAR SERVICIOS DE CHOFER'},
					controller: "ListarServiciosChoferController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
									'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
									'assets/global/plugins/fullcalendar3.4.0/fullcalendar.min.css',
									'assets/global/plugins/fullcalendar3.4.0/fullcalendar.js',
									'js/controllers/ListarServiciosChoferController.js'
								] 
							}]);
						}] 
					}
				})
				
				
				
				
				// SOLICITAR SERVICIO
				.state("private.disponibilidad_vehiculos", {
					url: "/disponibilidad_vehiculos",
					templateUrl: "views/disponibilidad_vehiculos.html",
					data: {pageTitle: 'DISPONIBILIDAD SERVICIOS'},
					controller: "DisponibilidadVehiculosController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
									'assets/global/plugins/bootstrap-wizard/jquery.bootstrap.wizard.min.js',
									'assets/global/plugins/jquery-repeater/jquery.repeater.js', 	
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
									'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
									'assets/global/plugins/fullcalendar3.4.0/fullcalendar.min.css',
									'assets/global/plugins/fullcalendar3.4.0/fullcalendar.js',	
									'assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css',
        							'assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css',
									'assets/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js',
        							'assets/global/plugins/bootstrap-modal/js/bootstrap-modal.js',
									'js/controllers/DisponibilidadVehiculosController.js'
									
								] 
							}]);
						}] 
					}
				})
				
			
				// SOLICITUD DE COMISION
				.state("private.asignar_servicio", {
					url: "/asignar_servicio/:id",
					templateUrl: "views/asignar_servicio.html",
					data: {pageTitle: 'VER DISPONIBILIDAD'},
					controller: "AsignarServicioController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css',
        							'assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css',
									'assets/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js',
        							'assets/global/plugins/bootstrap-modal/js/bootstrap-modal.js',
									'assets/global/plugins/fullcalendar3.4.0/fullcalendar.min.css',
									'assets/global/plugins/fullcalendar3.4.0/fullcalendar.js',
									//'assets/global/plugins/jquery-ui/jquery-ui.min.js',
									//'assets/global/plugins/fullcalendar/fullcalendar.min.css',
									//'assets/global/plugins/fullcalendar/fullcalendar.min.js',
									//'assets/global/plugins/fullcalendar/locale-all.js',
									//'assets/apps/scripts/calendar.js',
									//'assets/global/plugins/select2/css/select2.min.css',
									//'assets/global/plugins/select2/css/select2-bootstrap.min.css',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									//'assets/pages/scripts/components-bootstrap-select.min.js',
									'js/controllers/AsignarServicioController.js'
								]
							});
						}]
					}
					
				})
				
				

				// SOLICITUD DE COMISION
				.state("private.calificar_servicio_usuario", {
					url: "/calificar_servicio_usuario/:id",
					templateUrl: "views/calificar_servicio_usuario.html",
					data: {pageTitle: 'CALIFICAR SERVICIO - USUARIO'},
					controller: "CalificarServicioUsuarioController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
									'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'js/controllers/CalificarServicioUsuarioController.js'
								]
							});
						}]
					}
					
				})
				
				
				// SOLICITUD DE COMISION
				.state("private.finalizar_servicio_chofer", {
					url: "/finalizar_servicio_chofer/:id",
					templateUrl: "views/finalizar_servicio_chofer.html",
					data: {pageTitle: 'FINALIZAR SERVICIO - CHOFER'},
					controller: "FinalizarServicioChoferController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									
									'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
									'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
									
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									
									
									'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css',
									
									'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
									
		
									'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.js',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
									'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
		
									'js/controllers/FinalizarServicioChoferController.js'
								]
							});
						}]
					}
					
				})
				
				
				// SOLICITUD DE COMISION
				.state("private.cancelar_servicio", {
					url: "/cancelar_servicio/:id",
					templateUrl: "views/cancelar_servicio.html",
					data: {pageTitle: 'CANCELAR SERVICIO'},
					controller: "CancelarServicioController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
									'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'js/controllers/CancelarServicioController.js'
								]
							});
						}]
					}
					
				})
				
				
				// SOLICITUD DE COMISION
				.state("private.registrar_vale", {
					url: "/registrar_vale/:id",
					templateUrl: "views/registrar_vale.html",
					data: {pageTitle: 'REGISTRAR VALE'},
					controller: "RegistrarValeController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
									'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'js/controllers/RegistrarValeController.js'
								]
							});
						}]
					}
					
				})
				
				
				// SOLICITUD DE COMISION
				.state("private.reanudar_servicio", {
					url: "/reanudar_servicio/:id",
					templateUrl: "views/reanudar_servicio.html",
					data: {pageTitle: 'REANUDAR SERVICIO'},
					controller: "ReanudarServicioController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
									'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'js/controllers/ReanudarServicioController.js'
								]
							});
						}]
					}
					
				})
				
				// SOLICITUD DE COMISION
				.state("private.detalle_servicio", {
					url: "/detalle_servicio/:id",
					templateUrl: "views/detalle_servicio.html",
					data: {pageTitle: 'DETALLE SERVICIO'},
					controller: "DetalleServicioController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
									'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'js/controllers/DetalleServicioController.js'
								]
							});
						}]
					}
					
				})
				
								
				
				// SOLICITUD DE COMISION
				.state("private.configuracion_parametros", {
					url: "/configuracion_parametros",
					templateUrl: "views/configuracion_parametros.html",
					data: {pageTitle: 'CONFIGURACIÓN DE PARÁMETROS DEL SERVICIO DE TRANSPORTE'},
					controller: "ConfiguracionParametrosController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
									'assets/global/plugins/bootstrap-editable/bootstrap-editable/css/bootstrap-editable.css',
									'assets/global/plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
									'assets/global/plugins/bootstrap-editable/inputs-ext/address/address.css',
									'assets/global/plugins/select2/css/select2.min.css',
									'assets/global/plugins/select2/css/select2-bootstrap.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
									'assets/global/plugins/jquery.mockjax.js',
									'assets/global/plugins/bootstrap-editable/bootstrap-editable/js/bootstrap-editable.js',
									'assets/global/plugins/bootstrap-typeahead/bootstrap3-typeahead.min.js',
									'assets/global/plugins/select2/js/select2.full.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'js/controllers/ConfiguracionParametrosController.js'
								]
							});
						}]
					}
					
				})
				
				
				
				
	
				
				// SOLICITUD DE COMISION
				.state("private.finalizar_servicio", {
					url: "/finalizar_servicio",
					templateUrl: "views/finalizar_servicio.html",
					data: {pageTitle: 'FINALIZAR SERVICIO'},
					controller: "FinalizarServicioController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
									'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
									'assets/global/plugins/select2/js/select2.full.min.js',
									'js/controllers/FinalizarServicioController.js'
								]
							});
						}]
					}
					
				})
				
		
		/*****************************/
		/*							 */
		/*		  MENU TICKETS  	 */		
		/*							 */
		/*****************************/
		
		
				// LISTAR RECARGAS
				.state("private.listar_facturas_gastos", {
					url: "/listar_facturas_gastos",
					templateUrl: "views/listar_facturas_gastos.html",
					data: {pageTitle: 'FACTURAS DE GASTOS COMBUSTIBLE EN VIAJES DE COMISION DE SERVICIOS'},
					controller: "ListarFacturasGastosController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files: [
									//GLOBAL SCRIPTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | VALIDATE
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									//'assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css',
        							//'assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css',
									//'assets/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js',
        							//'assets/global/plugins/bootstrap-modal/js/bootstrap-modal.js',
									'js/controllers/ListarFacturasGastosController.js'
								]
							});
						}]
					}
					
				})
				
		
				// LISTAR RECARGAS
				.state("private.listar_tickets", {
					url: "/listar_tickets",
					templateUrl: "views/listar_tickets.html",
					data: {pageTitle: 'LISTAR TICKETS'},
					controller: "ListarTicketsController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files: [
									//GLOBAL SCRIPTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | VALIDATE
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.js',
									'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									
									'assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css',
        							'assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css',
									'assets/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js',
        							'assets/global/plugins/bootstrap-modal/js/bootstrap-modal.js',
									
									'js/controllers/ListarTicketsController.js'
								]
							});
						}]
					}
					
				})
				

				
				// LISTAR VEHICULOS
				.state("private.avance_contrato", {
					url: "/avance_contrato/:id",
					templateUrl: "views/avance_contrato.html",
					data: {pageTitle: 'AVANCE DE CONTRATO'},
					controller: "AvanceContratoController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files: [
									//'assets/global/plugins/datatables/datatables.min.css', 
									//'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									//'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									//'assets/global/plugins/datatables/datatables.all.min.js',
									//'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/echarts/echarts.js',
									'js/controllers/AvanceContratoController.js'
								]
							});
						}]
					}
					
				})
				
				
				// LISTAR OC
				.state("private.listar_oc", {
					url: "/listar_oc",
					templateUrl: "views/listar_oc.html",
					data: {pageTitle: 'ORDENES DE COMPRA'},
					controller: "ListarOrdenCompraController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files: [
									//GLOBAL SCRIPTS
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/select2/css/select2.min.css',
									'assets/global/plugins/select2/css/select2-bootstrap.min.css',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/select2/js/select2.full.min.js',
									'assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css',
        							'assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css',
									'assets/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js',
        							'assets/global/plugins/bootstrap-modal/js/bootstrap-modal.js',
									'js/controllers/ListarOrdenCompraController.js'
								]
							});
						}]
					}
					
				})
				
				
			
				// LISTAR MANTENIMIENTO DE SISTEMAS DE VEHICULOS
				.state("private.listar_mantenimiento_sistemas", {
					url: "/listar_mantenimiento_sistemas",
					templateUrl: "views/listar_mantenimiento_sistemas.html",
					data: {pageTitle: 'SISTEMAS DE VEHICULO'},
					controller: "ListarMantenimientoSistemasController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/select2/js/select2.full.min.js',
									'js/controllers/ListarMantenimientoSistemasController.js'
								]
							});
						}]
					}
					
				})
				
				// LISTAR MANTENIMIENTO DE SISTEMAS DE VEHICULOS
				.state("private.listar_mantenimiento_servicios", {
					url: "/listar_mantenimiento_servicios",
					templateUrl: "views/listar_mantenimiento_servicios.html",
					data: {pageTitle: 'SERVICIOS DE SISTEMAS VEHICULARES'},
					controller: "ListarMantenimientoServiciosController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/select2/js/select2.full.min.js',
									'js/controllers/ListarMantenimientoServiciosController.js'
								]
							});
						}]
					}
					
				})
				
				// LISTAR MANTENIMIENTO DE SISTEMAS DE VEHICULOS
				.state("private.listar_mantenimiento_componentes", {
					url: "/listar_mantenimiento_componentes",
					templateUrl: "views/listar_mantenimiento_componentes.html",
					data: {pageTitle: 'COMPONENTES POR SISTEMAS'},
					controller: "ListarMantenimientoComponentesController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/select2/js/select2.full.min.js',
									'js/controllers/ListarMantenimientoComponentesController.js'
								]
							});
						}]
					}
					
				})
				
				
				
				
				
				// LISTAR FACTURAS
				.state("private.listar_facturas", {
					url: "/listar_facturas",
					templateUrl: "views/listar_facturas.html",
					data: {pageTitle: 'FACTURAS'},
					controller: "ListarFacturasController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/select2/css/select2.min.css',
									'assets/global/plugins/select2/css/select2-bootstrap.min.css',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/select2/js/select2.full.min.js',
									'assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css',
        							'assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css',
									'assets/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js',
        							'assets/global/plugins/bootstrap-modal/js/bootstrap-modal.js',
									'js/controllers/ListarFacturasController.js'
								]
							});
						}]
					}
					
				})
				
		
		
				
				
				// RECARGAR COMBUSTIBLE
				/*.state("registrar_ticket_chofer", {
					url: "/registrar_ticket_chofer",
					templateUrl: "views/registrar_ticket_chofer.html",
					data: {pageTitle: 'REGISTRAR TICKET - CHOFER'},
					controller: "RegistrarTicketChoferController",
					
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'angularFileUpload',
								files: [
									'js/angular-file-upload.min.js',
								] 
							}, {
								name: 'MetronicApp',
								files: [
									'assets/global/plugins/select2/css/select2.min.css',
									'assets/global/plugins/select2/css/select2-bootstrap.min.css',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
									'assets/pages/scripts/components-date-time-pickers.min.js',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
									'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
									'assets/global/plugins/select2/js/select2.full.min.js',
									'assets/pages/scripts/components-bootstrap-select.min.js',
									'assets/pages/scripts/components-select2.min.js',
									'js/controllers/RegistrarTicketChoferController.js'
								]
							}]);
						}]
					}
					
				})*/
				
				
				// LISTAR RECARGAS
				.state("private.registrar_contrato", {
					url: "/registrar_contrato/:id",
					templateUrl: "views/registrar_contrato.html",
					data: {pageTitle: 'REGISTRAR CONTRATO'},
					controller: "RegistrarContratoController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'angularFileUpload',
								files: [
									'js/angular-file-upload.min.js',
								] 
							}, {
								name: 'MetronicApp',
								files: [
									'assets/global/plugins/jquery.blockui.min.js', //BLOQUEAR PORTLET
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | VALIDATE
									//'assets/global/plugins/select2/css/select2.min.css',
									//'assets/global/plugins/select2/css/select2-bootstrap.min.css',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
									//'assets/global/plugins/jquery-repeater/jquery.repeater.js', 
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
									'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
									//'assets/global/plugins/select2/js/select2.full.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									//'assets/pages/scripts/components-bootstrap-select.min.js',
									'js/controllers/RegistrarContratoController.js'
								]
							}]);
						}]
					}
					
					
				})
				
				// LISTAR VEHICULOS
				.state("private.registrar_oc", {
					url: "/registrar_oc/:id",
					templateUrl: "views/registrar_oc.html",
					data: {pageTitle: 'REGISTRAR ORDEN COMPRA'},
					controller: "RegistrarOrdenCompraController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'angularFileUpload',
								files: [
									'js/angular-file-upload.min.js',
								] 
							}, {
								name: 'MetronicApp',
								files: [
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css',
        							'assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css',
									'assets/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js',
        							'assets/global/plugins/bootstrap-modal/js/bootstrap-modal.js',
                                    'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
                                    'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
                                    'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                                    'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
                                    'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                                    'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'js/controllers/RegistrarOrdenCompraController.js'
								]
							}]);
						}]
					}
					
					
				})
				
				
				
				// LISTAR VEHICULOS
				.state("private.registrar_alerta", {
					url: "/registrar_alerta/:id",
					templateUrl: "views/registrar_alerta.html",
					data: {pageTitle: 'REGISTRAR ALERTA'},
					controller: "RegistrarAlertaController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'MetronicApp',
								files: [
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
                                    'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/ion.rangeslider/js/ion.rangeSlider.min.js',
									'assets/global/plugins/ion.rangeslider/css/ion.rangeSlider.css',
									'assets/global/plugins/ion.rangeslider/css/ion.rangeSlider.skinFlat.css',
									'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
                                    'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                                    'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
                                    'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'js/controllers/RegistrarAlertaController.js'
								]
							}]);
						}]
					}
					
				})
				
				
				// LISTAR VEHICULOS
				.state("private.registrar_solicitud_mantenimiento", {
					url: "/registrar_solicitud_mantenimiento/:id",
					templateUrl: "views/registrar_solicitud_mantenimiento.html",
					data: {pageTitle: 'REGISTRAR SOLICITUD DE MANTENIMIENTO'},
					controller: "RegistrarSolicitudMantenimiento",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'angularFileUpload',
								files: [
									'js/angular-file-upload.min.js',
								] 
								}, {
								name: 'MetronicApp',
								files: [
									'assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css',
        							'assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css',
									'assets/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js',
        							'assets/global/plugins/bootstrap-modal/js/bootstrap-modal.js',
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
                                    'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                                    'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'js/controllers/RegistrarSolicitudMantenimiento.js'
								]
							}]);
						}]
					}
					
				})
				
				
				
				// LISTAR VEHICULOS
				.state("private.registrar_evaluacion_mantenimiento", {
					url: "/registrar_evaluacion_mantenimiento/:id/:idsolicitud",
					templateUrl: "views/registrar_evaluacion_mantenimiento.html",
					data: {pageTitle: 'REGISTRAR EVALUACION DE MANTENIMIENTO'},
					controller: "RegistrarEvaluacionMantenimiento",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'angularFileUpload',
								files: [
									'js/angular-file-upload.min.js',
								] 
								}, {
								name: 'MetronicApp',
								files: [
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
                                    'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                                    'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'js/controllers/RegistrarEvaluacionMantenimiento.js'
								]
							}]);
						}]
					}
					
				})
				
				
				// LISTAR VEHICULOS
				.state("private.registrar_aprobacion_evaluacion", {
					url: "/registrar_aprobacion_evaluacion/:id/:idsolicitud",
					templateUrl: "views/registrar_aprobacion_evaluacion.html",
					data: {pageTitle: 'APROBAR EVALUACIONES DE MANTENIMIENTO'},
					controller: "RegistrarAprobacionEvaluacionController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'angularFileUpload',
								files: [
									'js/angular-file-upload.min.js',
								] 
								}, {
								name: 'MetronicApp',
								files: [
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
                                    'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                                    'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css',
									'assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css',
									'assets/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js',
									'assets/global/plugins/bootstrap-modal/js/bootstrap-modal.js',
									'js/controllers/RegistrarAprobacionEvaluacionController.js'
								]
							}]);
						}]
					}
					
				})			
				
				
				
				// LISTAR VEHICULOS
				.state("private.registrar_orden_trabajo", {
					url: "/registrar_orden_trabajo/:id/:idevaluacion",
					templateUrl: "views/registrar_orden_trabajo.html",
					data: {pageTitle: 'REGISTRAR ORDEN DE TRABAJO'},
					controller: "RegistrarOrdenTrabajoController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'angularFileUpload',
								files: [
									'js/angular-file-upload.min.js',
								] 
								}, {
								name: 'MetronicApp',
								files: [
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
                                    'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                                    'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'js/controllers/RegistrarOrdenTrabajoController.js'
								]
							}]);
						}]
					}
					
				})
				
				
				// LISTAR VEHICULOS
				.state("private.ejecutar_tareas_orden_trabajo", {
					url: "/ejecutar_tareas_orden_trabajo/:id",
					templateUrl: "views/ejecutar_tareas_orden_trabajo.html",
					data: {pageTitle: 'EJECUTAR TAREAS DE ORDEN DE TRABAJO'},
					controller: "EjecutarTareasOrdenTrabajoController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'angularFileUpload',
								files: [
									'js/angular-file-upload.min.js',
								] 
								}, {
								name: 'MetronicApp',
								files: [
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
									'assets/global/plugins/ion.rangeslider/js/ion.rangeSlider.min.js',
									'assets/global/plugins/ion.rangeslider/css/ion.rangeSlider.css',
									'assets/global/plugins/ion.rangeslider/css/ion.rangeSlider.skinFlat.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
                                    'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                                    'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'js/controllers/EjecutarTareasOrdenTrabajoController.js'
								]
							}]);
						}]
					}
					
				})
				
				
				
	 
				
				
				
				// LISTAR RECARGAS
				.state("private.registrar_factura", {
					url: "/registrar_factura/:id",
					templateUrl: "views/registrar_factura.html",
					data: {pageTitle: 'REGISTRAR FACTURA'},
					controller: "RegistrarFacturaController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'angularFileUpload',
								files: [
									'js/angular-file-upload.min.js',
								] 
							}, {
								name: 'MetronicApp',
								files: [
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/RegistrarFacturaController.js'
								]
							}]);
						}]
					}

				})
				
				
				
		
		
				// RECARGAR COMBUSTIBLE
				.state("private.registrar_factura_gasto", {
					url: "/registrar_factura_gasto/:id",
					templateUrl: "views/registrar_factura_gasto.html",
					data: {pageTitle: 'REGISTRAR FACTURAS DE GASTOS COMBUSTIBLES EN VIAJES DE COMISION DE SERVICIOS'},
					controller: "RegistrarFacturaGastoController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'angularFileUpload',
								files: [
									'js/angular-file-upload.min.js',
								] 
							}, {
								name: 'MetronicApp',
								files: [
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | VALIDATE
									//'assets/global/plugins/select2/css/select2.min.css',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/select2/css/select2-bootstrap.min.css',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
									//'assets/pages/scripts/components-date-time-pickers.min.js',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
									'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
									//'assets/global/plugins/select2/js/select2.full.min.js',
									'js/controllers/RegistrarFacturaGastoController.js'
								]
							}]);
						}]
					}
					
				})

		
				
				// RECARGAR COMBUSTIBLE
				.state("private.registrar_ticket", {
					url: "/registrar_ticket/:id",
					templateUrl: "views/registrar_ticket.html",
					data: {pageTitle: 'REGISTRAR TICKET'},
					controller: "RegistrarTicketController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'angularFileUpload',
								files: [
									'js/angular-file-upload.min.js',
								] 
							}, {
								name: 'MetronicApp',
								files: [
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | VALIDATE
									'assets/global/plugins/select2/css/select2.min.css',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/select2/css/select2-bootstrap.min.css',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
									'assets/pages/scripts/components-date-time-pickers.min.js',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
									'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
									'assets/global/plugins/select2/js/select2.full.min.js',
									'js/controllers/RegistrarTicketController.js'
								]
							}]);
						}]
					}
					
				})
				
				
				
				
		
				// LISTAR VEHICULOS
				
				.state("private.listar_fichas_tecnicas", {
					url: "/listar_fichas_tecnicas",
					templateUrl: "views/listar_fichas_tecnicas.html",
					data: {pageTitle: 'FICHAS TECNICAS'},
					controller: "ListarFichasTecnicasController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/jquery-easypiechart/jquery.easypiechart.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarVehiculosController.js',
									'js/controllers/ListarFichasTecnicasController.js'
								]
							});
						}]
					}
				
				})
				
		
				.state("private.listar_sucursales", {
					url: "/listar_sucursales",
					templateUrl: "views/listar_sucursales.html",
					data: {pageTitle: 'SUCURSALES DE PROVEEDORES'},
					controller: "ListarSucursalesController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/jquery-easypiechart/jquery.easypiechart.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarSucursalesController.js',
								]
							});
						}]
					}
				
				})
				
				
				.state("private.listar_escala_movilidad", {
					url: "/listar_escala_movilidad",
					templateUrl: "views/listar_escala_movilidad.html",
					data: {pageTitle: 'ESCALAS DE MOVILIDAD'},
					controller: "ListarEscalasMovilidadController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/jquery-easypiechart/jquery.easypiechart.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarEscalasMovilidadController.js',
								]
							});
						}]
					}
				
				})
				
				
		
				.state("private.listar_talleres", {
					url: "/listar_talleres",
					templateUrl: "views/listar_talleres.html",
					data: {pageTitle: 'TALLERES'},
					controller: "ListarTalleresController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/jquery-easypiechart/jquery.easypiechart.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarTalleresController.js',
								]
							});
						}]
					}
				
				})
		
		
				.state("private.listar_proveedores", {
					url: "/listar_proveedores",
					templateUrl: "views/listar_proveedores.html",
					data: {pageTitle: 'PROVEEDORES'},
					controller: "ListarProveedoresController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/jquery-easypiechart/jquery.easypiechart.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarProveedoresController.js',
								]
							});
						}]
					}
				
				})
		
				// RECARGAR COMBUSTIBLE
				.state("private.ficha_tecnica", {
					url: "/ficha_tecnica/:id",
					templateUrl: "views/ficha_tecnica.html",
					data: {pageTitle: 'FICHA TECNICA'},
					controller: "FichaTecnicaController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'angularFileUpload',
								name: 'MetronicApp',
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/jquery-easypiechart/jquery.easypiechart.min.js',
									//'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									//'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									//'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									//'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | VALIDATE
									//'assets/global/plugins/select2/css/select2.min.css',
									//'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									//'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									//'assets/global/plugins/select2/css/select2-bootstrap.min.css',
									//'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									//'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
									//'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									//'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
									//'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									//'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									//'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
									//'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
									//'assets/global/plugins/select2/js/select2.full.min.js',
									'js/controllers/FichaTecnicaController.js'
								]
							}]);
						}]
					}
					
				})
		
				
				
				.state("private.listar_sedes", {
					url: "/listar_sedes",
					templateUrl: "views/listar_sedes.html",
					data: {pageTitle: 'SEDES'},
					controller: "ListarSedesController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'js/controllers/ListarSedesController.js'
								]
							});
						}]
					}
					
				})
		
				.state("private.listar_usuarios", {
					url: "/listar_usuarios",
					templateUrl: "views/listar_usuarios.html",
					data: {pageTitle: 'USUARIOS'},
					controller: "ListarUsuariosController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									//'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'js/controllers/ListarUsuariosController.js'
								]
							});
						}]
					}
					
				})
		
		
				.state("private.listar_alertas", {
					url: "/listar_alertas",
					templateUrl: "views/listar_alertas.html",
					data: {pageTitle: 'ALERTAS'},
					controller: "ListarAlertasController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarAlertasController.js'
								]
							});
						}]
					}
					
				})
		
				.state("private.listar_solicitudes_mantenimiento", {
					url: "/listar_solicitudes_mantenimiento",
					templateUrl: "views/listar_solicitudes_mantenimiento.html",
					data: {pageTitle: 'SOLICITUDES DE MANTENIMIENTO'},
					controller: "ListarSolicitudesMantenimientosController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.js',
									'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarSolicitudesMantenimientosController.js'
								]
							});
						}]
					}
					
				})
				
				
				.state("private.listar_evaluaciones_mantenimiento", {
					url: "/listar_evaluaciones_mantenimiento",
					templateUrl: "views/listar_evaluaciones_mantenimiento.html",
					data: {pageTitle: 'EVALUACIONES DE MANTENIMIENTO'},
					controller: "ListarEvaluacionesMantenimientoController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.js',
									'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarEvaluacionesMantenimientoController.js'
								]
							});
						}]
					}
					
				})
				
				.state("private.listar_aprobaciones_evaluaciones", {
					url: "/listar_aprobaciones_evaluaciones",
					templateUrl: "views/listar_aprobaciones_evaluaciones.html",
					data: {pageTitle: 'APROBAR EVALUACIONES'},
					controller: "ListarAprobacionesEvaluacionesController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.js',
									'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarAprobacionesEvaluacionesController.js'
								]
							});
						}]
					}
					
				})
		
		
				.state("private.listar_ordenes_trabajo", {
					url: "/listar_ordenes_trabajo",
					templateUrl: "views/listar_ordenes_trabajo.html",
					data: {pageTitle: 'ORDENES DE TRABAJOS'},
					controller: "ListarOrdenesTrabajoController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.js',
									'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css',
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarOrdenesTrabajoController.js'
								]
							});
						}]
					}
					
				})
				
				
				.state("private.listar_componentes", {
					url: "/listar_componentes",
					templateUrl: "views/listar_componentes.html",
					data: {pageTitle: 'COMPONENTES DE SISTEMAS'},
					controller: "ListarComponentesController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
								
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarComponentesController.js'
								]
							});
						}]
					}
					
				})
				
				
				.state("private.listar_calidad", {
					url: "/listar_calidad",
					templateUrl: "views/listar_calidad.html",
					data: {pageTitle: 'LISTAR CALIDAD'},
					controller: "ListarCalidadController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
								
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarCalidadController.js'
								]
							});
						}]
					}
					
				})
		
		
		/*****************************/
		/*							 */
		/*	     MENU VEHICULOS 	 */		
		/*							 */
		/*****************************/
		
				// LISTAR VEHICULOS
				.state("private.listar_vehiculos", {
					url: "/listar_vehiculos",
					templateUrl: "views/listar_vehiculos.html",
					data: {pageTitle: 'VEHICULOS'},
					controller: "ListarVehiculosController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarVehiculosController.js'
								]
							});
						}]
					}
					
				})
				
				// LISTAR TIPOS DE VEHICULOS
				.state("private.listar_tipos_vehiculos", {
					url: "/listar_tipos_vehiculos",
					templateUrl: "views/listar_tipos_vehiculos.html",
					data: {pageTitle: 'TIPOS DE VEHICULOS'},
					controller: "ListarTiposVehiculosController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarTiposVehiculosController.js'
								]
							});
						}]
					}
					
				})
		
				
				// REGISTRAR TIPOS VEHICULOS
				.state("private.registrar_tipo_vehiculo", {
					url: "/registrar_tipo_vehiculo/:id",
					templateUrl: "views/registrar_tipo_vehiculo.html",
					data: {pageTitle: 'REGISTRAR TIPO DE VEHICULO'},
					controller: "RegistrarTipoVehiculoController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | VALIDATE
									'js/controllers/RegistrarTipoVehiculoController.js'
								]
							});
						}]
					}
					
				})
				
				
				// REGISTRAR TIPOS VEHICULOS
				.state("private.registrar_tipo_combustible", {
					url: "/registrar_tipo_combustible/:id",
					templateUrl: "views/registrar_tipo_combustible.html",
					data: {pageTitle: 'REGISTRAR TIPO DE COMBUSTIBLE'},
					controller: "RegistrarTipoCombustibleController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | VALIDATE
									'js/controllers/RegistrarTipoCombustibleController.js'
								]
							});
						}]
					}
					
				})
				
				
				
				
				
				// REGISTRAR TIPOS VEHICULOS
				.state("private.registrar_medida_uso", {
					url: "/registrar_medida_uso/:id",
					templateUrl: "views/registrar_medida_uso.html",
					data: {pageTitle: 'REGISTRAR UNIDAD DE MEDIDA DE USO'},
					controller: "RegistrarMedidaUsoController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | VALIDATE
									'js/controllers/RegistrarMedidaUsoController.js'
								]
							});
						}]
					}
					
				})
				
				// REGISTRAR TIPOS VEHICULOS
				.state("private.registrar_medida_combustible", {
					url: "/registrar_medida_combustible/:id",
					templateUrl: "views/registrar_medida_combustible.html",
					data: {pageTitle: 'REGISTRAR UNIDAD DE MEDIDA DE COMBUSTIBLE'},
					controller: "RegistrarMedidaCombustibleController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | VALIDATE
									'js/controllers/RegistrarMedidaCombustibleController.js'
								]
							});
						}]
					}
					
				})
				
				
				// REGISTRAR TIPOS VEHICULOS
				.state("private.registrar_tipo_licencia", {
					url: "/registrar_tipo_licencia/:id",
					templateUrl: "views/registrar_tipo_licencia.html",
					data: {pageTitle: 'REGISTRAR TIPO DE LICENCIA'},
					controller: "RegistrarTipoLicenciaController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | VALIDATE
									'js/controllers/RegistrarTipoLicenciaController.js'
								]
							});
						}]
					}
					
				})
				
				// REGISTRAR TIPOS VEHICULOS
				.state("private.registrar_tipo_identificacion", {
					url: "/registrar_tipo_identificacion/:id",
					templateUrl: "views/registrar_tipo_identificacion.html",
					data: {pageTitle: 'REGISTRAR TIPO DE IDENTIFICACION'},
					controller: "RegistrarTipoIdentificacionController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | VALIDATE
									'js/controllers/RegistrarTipoIdentificacionController.js'
								]
							});
						}]
					}
					
				})
				
				
			
				// REGISTRAR TIPOS VEHICULOS
				.state("private.registrar_vehiculo", {
					url: "/registrar_vehiculo/:id",
					templateUrl: "views/registrar_vehiculo.html",
					data: {pageTitle: 'REGISTRAR VEHICULOS'},
					controller: "RegistrarVehiculoController",
					
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'angularFileUpload',
									files: [
										'js/angular-file-upload.min.js',
									] 
								}, {
								name: 'MetronicApp',
								files: [
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/pages/scripts/components-bootstrap-select.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/jquery-minicolors/jquery.minicolors.css',
									'assets/global/plugins/jquery-minicolors/jquery.minicolors.min.js',
									'js/controllers/RegistrarVehiculoController.js'
								]
							}]);
						}]
					}
					
				})
				
					
		
		/*****************************/
		/*							 */
		/*	  	 MENU TARJETAS	     */		
		/*							 */
		/*****************************/
		
				// LISTAR RECARGAS
				.state("private.listar_tarjetas_combustible", {
					url: "/listar_tarjetas_combustible",
					templateUrl: "views/listar_tarjetas_combustible.html",
					data: {pageTitle: 'TARJETAS DE VEHICULOS'},
					controller: "ListarTarjetasCombustibleController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									//'assets/pages/scripts/components-bootstrap-select.min.js',
									//'assets/pages/scripts/components-select2.min.js',
									'js/controllers/ListarTarjetasCombustibleController.js'
								]
							});
						}]
					}
					
				})
				
				
				
				
				
				
						
				/*****************************/
				/*							 */
				/*	  	 MENU MARCAS	     */		
				/*							 */
				/*****************************/

				// LISTAR RECARGAS
				.state("private.listar_marcas", {
					url: "/listar_marcas",
					templateUrl: "views/listar_marcas.html",
					data: {pageTitle: 'MARCAS DE VEHICULOS'},
					controller: "ListarMarcasController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/select2/css/select2.min.css',
									'assets/global/plugins/select2/css/select2-bootstrap.min.css',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/select2/js/select2.full.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarMarcasController.js'
								]
							});
						}]
					}
					
				})
				
				
				// LISTAR RECARGAS
				.state("private.registrar_tarjeta_combustible", {
					url: "/registrar_tarjeta_combustible/:id",
					templateUrl: "views/registrar_tarjeta_combustible.html",
					data: {pageTitle: 'REGISTRAR TARJETA DE COMBUSTIBLE'},
					controller: "RegistrarTarjetaCombustibleController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									//'assets/pages/scripts/components-bootstrap-select.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/RegistrarTarjetaCombustibleController.js'
								]
							});
						}]
					}
					
				})
				
				
				
				
				// LISTAR RECARGAS
				.state("private.registrar_marca", {
					url: "/registrar_marca/:id",
					templateUrl: "views/registrar_marca.html",
					data: {pageTitle: 'REGISTRAR MARCA DE VEHICULO'},
					controller: "RegistrarMarcaController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-toastr/toastr.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
        							//'assets/pages/scripts/components-bootstrap-select.min.js',
									//'assets/pages/scripts/components-select2.min.js',
									'js/controllers/RegistrarMarcaController.js'
								]
							});
						}]
					}
					
				})
				
				// LISTAR RECARGAS
				.state("private.registrar_taller", {
					url: "/registrar_taller/:id",
					templateUrl: "views/registrar_taller.html",
					data: {pageTitle: 'REGISTRAR TALLER'},
					controller: "RegistrarTallerController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-toastr/toastr.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
        							//'assets/pages/scripts/components-bootstrap-select.min.js',
									'js/controllers/RegistrarTallerController.js'
								]
							});
						}]
					}
					
				})
				
				// LISTAR RECARGAS
				.state("private.registrar_proveedor", {
					url: "/registrar_proveedor/:id",
					templateUrl: "views/registrar_proveedor.html",
					data: {pageTitle: 'REGISTRAR PROVEEDOR'},
					controller: "RegistrarProveedorController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'js/controllers/RegistrarProveedorController.js'
								]
							});
						}]
					}
					
				})
				
				
				// LISTAR RECARGAS
				.state("private.registrar_sucursal", {
					url: "/registrar_sucursal/:id",
					templateUrl: "views/registrar_sucursal.html",
					data: {pageTitle: 'REGISTRAR SUCURSAL  DE PROVEEDOR'},
					controller: "RegistrarSucursalController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'js/controllers/RegistrarSucursalController.js'
								]
							});
						}]
					}
					
				})
				
				
				
				// LISTAR RECARGAS
				.state("private.registrar_modelo", {
					url: "/registrar_modelo/:id",
					templateUrl: "views/registrar_modelo.html",
					data: {pageTitle: 'REGISTRAR MODELO DE VEHICULO'},
					controller: "RegistrarModeloController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-toastr/toastr.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.js',
									//'assets/global/plugins/select2/css/select2.min.css',
									//'assets/global/plugins/select2/css/select2-bootstrap.min.css',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									//'assets/global/plugins/select2/js/select2.full.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
        							'assets/pages/scripts/components-bootstrap-select.min.js',
									'assets/pages/scripts/components-select2.min.js',
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'js/controllers/RegistrarModeloController.js'
								]
							});
						}]
					}
					
				})
				
				
				
				// LISTAR RECARGAS
				.state("private.listar_modelos", {
					url: "/listar_modelos",
					templateUrl: "views/listar_modelos.html",
					data: {pageTitle: 'LISTAR MODELOS DE VEHICULOS'},
					controller: "ListarModelosController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/select2/css/select2.min.css',
									'assets/global/plugins/select2/css/select2-bootstrap.min.css',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/select2/js/select2.full.min.js',
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/ListarModelosController.js'
								]
							});
						}]
					}
					
				})
								
				// LISTAR RECARGAS
				.state("private.registrar_usuario", {
					url: "/registrar_usuario/:id",
					templateUrl: "views/registrar_usuario.html",
					data: {pageTitle: 'REGISTRAR USUARIO'},
					controller: "RegistrarUsuarioController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([{
								name: 'angularFileUpload',
									files: [
										'js/angular-file-upload.min.js',
									] 
								}, {
								name: 'MetronicApp',
								files: [
									'assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/jquery.blockui.min.js', //BLOQUEAR PORTLET
									'assets/global/plugins/bootstrap-toastr/toastr.min.css', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-toastr/toastr.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'js/controllers/RegistrarUsuarioController.js'
								]
							}]);
						}]
					}
					
				})
				
				
				// LISTAR RECARGAS
				.state("private.registrar_sede", {
					url: "/registrar_sede/:id",
					templateUrl: "views/registrar_sede.html",
					data: {pageTitle: 'REGISTRAR SEDE'},
					controller: "RegistrarSedeController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-toastr/toastr.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.js',
									'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'js/controllers/RegistrarSedeController.js'
								]
							});
						}]
					}
					
				})
				
				
				// LISTAR RECARGAS
				.state("private.registrar_rol", {
					url: "/registrar_rol/:id",
					templateUrl: "views/registrar_rol.html",
					data: {pageTitle: 'REGISTRAR ROL'},
					controller: "RegistrarRolController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css',
									'assets/global/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'js/controllers/RegistrarRolController.js'
								]
							});
						}]
					}
					
				})
				
				// LISTAR RECARGAS
				.state("private.registrar_area", {
					url: "/registrar_area/:id",
					templateUrl: "views/registrar_area.html",
					data: {pageTitle: 'REGISTRAR AREA'},
					controller: "RegistrarAreaController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-toastr/toastr.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
									'js/controllers/RegistrarAreaController.js'
								]
							});
						}]
					}
				})
				
				
				// LISTAR RECARGAS
				.state("private.registrar_escala_movilidad", {
					url: "/registrar_escala_movilidad/:id",
					templateUrl: "views/registrar_escala_movilidad.html",
					data: {pageTitle: 'REGISTRAR ESCALA DE MOVILIDAD'},
					controller: "RegistrarEscalaMovilidadController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-toastr/toastr.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'js/controllers/RegistrarEscalaMovilidadController.js'
								]
							});
						}]
					}
				})
				
				
				
				// LISTAR RECARGAS
				.state("private.registrar_mantenimiento_sistema", {
					url: "/registrar_mantenimiento_sistema/:id",
					templateUrl: "views/registrar_mantenimiento_sistema.html",
					data: {pageTitle: 'REGISTRAR SISTEMA DE VEHICULO'},
					controller: "RegistrarMantenimientoSistemaController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-toastr/toastr.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'js/controllers/RegistrarMantenimientoSistemaController.js'
								]
							});
						}]
					}
					
				})
				
				
				// LISTAR RECARGAS
				.state("private.registrar_mantenimiento_servicio", {
					url: "/registrar_mantenimiento_servicio/:id",
					templateUrl: "views/registrar_mantenimiento_servicio.html",
					data: {pageTitle: 'REGISTRAR SERVICIO DE SISTEMA'},
					controller: "RegistrarMantenimientoServicioController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css',
									'assets/global/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js',
									'assets/global/plugins/ion.rangeslider/js/ion.rangeSlider.min.js',
									'assets/global/plugins/ion.rangeslider/css/ion.rangeSlider.css',
									'assets/global/plugins/ion.rangeslider/css/ion.rangeSlider.skinFlat.css',
									'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'js/controllers/RegistrarMantenimientoServicioController.js'
								]
							});
						}]
					}
					
				})
				
				
				// LISTAR RECARGAS
				.state("private.registrar_mantenimiento_componente", {
					url: "/registrar_mantenimiento_componente/:id",
					templateUrl: "views/registrar_mantenimiento_componente.html",
					data: {pageTitle: 'REGISTRAR COMPONENTE DE SISTEMA'},
					controller: "RegistrarMantenimientoComponenteController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css',
									'assets/global/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js',
									'assets/global/plugins/ion.rangeslider/js/ion.rangeSlider.min.js',
									'assets/global/plugins/ion.rangeslider/css/ion.rangeSlider.css',
									'assets/global/plugins/ion.rangeslider/css/ion.rangeSlider.skinFlat.css',
									'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
									'assets/global/plugins/bootstrap-toastr/toastr.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.js',
									'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
									'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'js/controllers/RegistrarMantenimientoComponenteController.js'
								]
							});
						}]
					}
					
				})
				
					
					
				/*****************************/
				/*							 */
				/*	  	 MENU CHOFERES	     */		
				/*							 */
				/*****************************/

				// LISTAR RECARGAS
				
				.state("private.listar_choferes", {
					url: "/listar_choferes",
					templateUrl: "views/listar_choferes.html",
					data: {pageTitle: 'LISTAR CHOFERES'},
					controller: "ListarChoferesController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', 
								files: [
									
                                    'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
                                    'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
                                    'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                                    'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
                                    'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                                    'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
									'assets/global/plugins/datatables/datatables.min.css', 
									'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
									'assets/global/plugins/datatables/datatables.all.min.js',
									'assets/global/scripts/datatable.min.js',
									'js/controllers/ListarChoferesController.js'
								]
							});
						}]
					}
					
				})
				
				.state("private.registrar_chofer", {
					url: "/registrar_chofer/:id",
					templateUrl: "views/registrar_chofer.html",
					data: {pageTitle: 'REGISTRAR CHOFER'},
					controller: "RegistrarChoferController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-toastr/toastr.min.css',
									'assets/global/plugins/bootstrap-toastr/toastr.min.js',
                                    'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
                                    'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
                                    'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                                    'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
                                    'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                                    'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
									'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
									'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js', //COPIAR EN TODOS LOS REGISTROS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.css', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js', //COPIAR EN TODAS LAS LISTAS | SWEETALERTS
									'js/controllers/RegistrarChoferController.js'
								]
							});
						}]
					}
					
				})		
				
				/*****************************/
				/*							 */
				/*	  	 MENU PERFIL	     */		
				/*							 */
				/*****************************/		
						
					 // User Profile
				.state("perfil", {
					url: "/perfil",
					templateUrl: "views/perfil/main.html",
					data: {pageTitle: 'MI PERFIL'},
					controller: "UserProfileController",
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'MetronicApp',  
								insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
								files: [
									'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
									'assets/pages/css/profile.css',
									'assets/global/plugins/jquery.sparkline.min.js',
									'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
									'assets/pages/scripts/profile.min.js',
									'js/controllers/UserProfileController.js'
								]                    
							});
						}]
					}
				})
		
				// User Profile Dashboard
				.state("perfil.dashboard", {
					url: "/dashboard",
					templateUrl: "views/perfil/dashboard.html",
					data: {pageTitle: 'RESUMEN'}
				})
					
		
		
				// User Profile Account
				.state("perfil.cuenta", {
					url: "/cuenta",
					templateUrl: "views/perfil/cuenta.html",
					data: {pageTitle: 'MIS DATOS'}
				})
		
				
				// Todo
				.state('perfil.historico', {
					url: "/historico",
					templateUrl: "views/perfil/historico.html",
					data: {pageTitle: 'REPORTES'},
					controller: "TodoController" ,
					resolve: {
						deps: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({ 
								name: 'MetronicApp',  
								insertBefore: '#ng_load_plugins_before', 
								files: [
									'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
									'assets/apps/css/todo-2.css',
									'assets/global/plugins/select2/css/select2.min.css',
									'assets/global/plugins/select2/css/select2-bootstrap.min.css',
									'assets/global/plugins/select2/js/select2.full.min.js',
									'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
									'assets/apps/scripts/todo-2.min.js',
									'js/controllers/TodoController.js'  
								]                    
							});
						}]
					}
				})
				
				// User Profile Help
				.state("perfil.ayuda", {
					url: "/ayuda",
					templateUrl: "views/perfil/ayuda.html",
					data: {pageTitle: 'AYUDA'}      
				})

}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);