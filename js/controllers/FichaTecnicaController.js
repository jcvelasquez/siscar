angular.module('MetronicApp').controller('FichaTecnicaController', function($rootScope, $scope, $http, $timeout) {
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
		
		// set sidebar closed and body solid layout mode
		$rootScope.settings.layout.pageContentWhite = true;
		$rootScope.settings.layout.pageBodySolid = false;
		$rootScope.settings.layout.pageSidebarClosed = false;
		
		/*******************************************/
		/*       INICIALIZACION DE VARIABLES       */
		/*******************************************/

		var idVehiculo = $rootScope.$state.params.id; 
		var formdata = "";
		var msg;
		var shortCutFunction;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg ="";
		
		
		$('.easy-pie-chart .number.transactions').easyPieChart({
			animate: 1000,
			size: 75,
			lineWidth: 3,
			scaleColor: '#cccccc',
			trackColor: '#cccccc',
			barColor: App.getBrandColor('yellow')
		});

		$('.easy-pie-chart .number.visits').easyPieChart({
			animate: 1000,
			size: 75,
			lineWidth: 3,
			scaleColor: '#cccccc',
			trackColor: '#cccccc',
			barColor: App.getBrandColor('green')
		});

		$('.easy-pie-chart .number.bounce').easyPieChart({
			animate: 1000,
			size: 75,
			lineWidth: 3,
			scaleColor: '#cccccc',
			trackColor: '#cccccc',
			barColor: App.getBrandColor('red')
		});
		
		$('.big .number.visits').easyPieChart({
			animate: 2000,
			size: 190,
			lineWidth: 7,
			scaleColor: '#cccccc',
			trackColor: '#cccccc',
			barColor: '#337ab7'
		});
		

		$('#reload').click(function() {
		
			$('.easy-pie-chart .number').each(function() {
				var newValue = Math.floor(100 * Math.random());
				$(this).data('easyPieChart').update(newValue);
				$('span', this).text(newValue);
			});
			
		})
		
		
		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/		
		
		function initFichaTecnicaContent(){
						
				//CAMPOS DE EDICION							
				 $.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/FichaTecnicaGet.php?action_type=view&id='+idVehiculo,
					success:function(data){
													
						initAlertas(data.idvehiculos);
						initSolicitudes(data.idvehiculos);
						initEvaluaciones(data.idvehiculos);
						initOrdenTrabajo(data.idvehiculos);
						initComponentes(data.idvehiculos);
						initTalleres(data.idvehiculos);

						//INICIO DE PERSONALIZACION DE CAMPOS						
						$('#placa_vehiculo').html(data.placa_vehiculo);
						$('#nombre_sede').html(data.nombre_sede);
						$('#ano_fabricacion').html(data.ano_fabricacion);
						$('#marca_vehiculo').html(data.marca_vehiculo);
						$('#modelo_vehiculo').html(data.modelo_vehiculo);
						$('#kilometraje_inicio').html(data.kilometraje_inicio);
						//FIN DE PERSONALIZACION DE CAMPOS
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});

				
				/***************************************/
				/*   FIN DE  CARGAR REGISTRO A EDITAR   */
				/***************************************/					
			
		}
		
		
		/*******************************************/
		/*      	  CARGAR DATATABLE   		   */
		/*******************************************/
		
        var gridAlertas = new Datatable();

		function initAlertas(idVehiculo){
			
			gridAlertas.init({
				src: $("#datatable_alertas"),
				onSuccess: function (grid) {
					
				},
				onError: function (grid) {
					
				},
				loadingMessage: 'Cargando...',
				dataTable: { 
					"language": {
						"aria": {
							"sortAscending": ": activate to sort column ascending",
							"sortDescending": ": activate to sort column descending"
						},
						"emptyTable": "No se encontraron registros en la tabla",
						"info": "Mostrando _START_ al _END_ de _TOTAL_ registros",
						"infoEmpty": "No se encontraron registros",
						"infoFiltered": "(filtered1 de _MAX_ total registros)",
						"lengthMenu": "Mostrar _MENU_ registros",
						"search": "Buscar:",
						"zeroRecords": "No se encontraron registros con los criterios de busqueda",
						"paginate": {
							"first":      "Primero",
							"last":       "Ultimo",
							"next":       "Siguiente",
							"previous":   "Anterior"
						}
					},
					"bStateSave": true, 
					"bAutoWidth": true,
					buttons: [
						{ extend: 'print', className: 'btn yellow', text: 'Imprimir' },
						{ extend: 'pdf', className: 'btn green', text: 'Exportar PDF' },
						{ extend: 'excel', className: 'btn blue', text: 'Exportar EXCEL' },
						{ extend: 'csv', className: 'btn purple ', text: 'Exportar CSV | Transparencia' },
						{ extend: 'colvis', className: 'btn dark', text: 'Columnas'}
					],
					"sDom": '',
					"sPlaceHolder": "head:after",
					"lengthMenu": [
						[10, 20, 50, -1],
						[10, 20, 50, "Todo"] // change per page values here
					],
					"initComplete": function (settings, json) {//here is the tricky part 
							var total = settings.aoData.length;
							if(total >0) $('#total_alertas').addClass('badge-success').removeClass('badge-danger').html(total);
							else  $('#total_alertas').html(total);
						},
					"processing": true,
					"pageLength": -1, // default record count per page
					"ajax": {
						url: "database/MantenimientoAlertasGet.php?action_type=alertas_x_vehiculo&id=" + idVehiculo, 
						dataSrc: "data"
					},
					columns: [
						{ data : "idmantenimiento_alertas" },
						{
						  "mData": null,
						  "bSortable": false,
						  "mRender": function(data, type, full) {

							return '<a href=#/private/registrar_alerta/' + data['idmantenimiento_alertas'] + '>' + data['descripcion_alerta'] + '</a>';               
						  }
						},
						{ data : "nombre_sistema" },
						{ data : "nombre_servicio" },
						{
							"mData": null,
							"bSortable": false,
							"mRender": function(data, type, full) {

								if(data['estado_alerta'] == 1) 
									$label = '<span class="label label-sm label-success">ACTIVA</span>';
								else
									$label = '<span class="label label-sm label-danger">INACTIVA</span>';

								return $label;
							}
							
						}
					]
					
				}
			});
			
			
		}
		/*******************************************/
		/*      	  	FIN TEMPLATE   		 	   */
		/*******************************************/
		
		
		/*******************************************/
		/*      	  CARGAR DATATABLE   		   */
		/*******************************************/
		
        var gridSolicitudes = new Datatable();
		
		function initSolicitudes(idVehiculo){
			
				gridSolicitudes.init({
					src: $("#datatable_solicitudes"),
					onSuccess: function (grid) {
						
					},
					onError: function (grid) {
					},
					loadingMessage: 'Cargando...',
					dataTable: { 
						"language": {
							"aria": {
								"sortAscending": ": activate to sort column ascending",
								"sortDescending": ": activate to sort column descending"
							},
							"emptyTable": "No se encontraron registros en la tabla",
							"info": "Mostrando _START_ al _END_ de _TOTAL_ registros",
							"infoEmpty": "No se encontraron registros",
							"infoFiltered": "(filtered1 de _MAX_ total registros)",
							"lengthMenu": "Mostrar _MENU_ registros",
							"search": "Buscar:",
							"zeroRecords": "No se encontraron registros con los criterios de busqueda",
							"paginate": {
								"first":      "Primero",
								"last":       "Ultimo",
								"next":       "Siguiente",
								"previous":   "Anterior"
							}
						},
						"bStateSave": true, 
						"bAutoWidth": true,
						buttons: [
							{ extend: 'print', className: 'btn yellow', text: 'Imprimir' },
							{ extend: 'pdf', className: 'btn green', text: 'Exportar PDF' },
							{ extend: 'excel', className: 'btn blue', text: 'Exportar EXCEL' },
							{ extend: 'csv', className: 'btn purple ', text: 'Exportar CSV | Transparencia' },
							{ extend: 'colvis', className: 'btn dark', text: 'Columnas'}
						],
						"initComplete": function (settings, json) {//here is the tricky part 
							var total = settings.aoData.length;
							if(total >0) $('#total_solicitudes').addClass('badge-success').removeClass('badge-danger').html(total);
							else  $('#total_solicitudes').html(total);
						},
						"sDom": '',
						"sPlaceHolder": "head:after",
						"lengthMenu": [
							[10, 20, 50, -1],
							[10, 20, 50, "Todo"] // change per page values here
						],
						"processing": true,
						"pageLength": -1, // default record count per page
						"ajax": {
							url: "database/MantenimientoSolicitudesGet.php?action_type=solicitudes_x_vehiculo&id="+idVehiculo, // ajax source
							dataSrc: "data"
						},
						columns: [	
							{ data : "idmantenimiento_solicitudes", className : 'dt-center' },
							{
							  "mData": null,
							  "bSortable": false,
							  "mRender": function(data, type, full) {
	
								return '<a href=#/private/registrar_solicitud_mantenimiento/' + data['idmantenimiento_solicitudes'] + '>' + data['descripcion_solicitud'] + '</a>';               
							  }
							},
							{ data : "fecha_solicitud" },
							{
								"mData": null,
								"bSortable": false,
								"mRender": function(data, type, full) {
	
									if(data['is_aprobado_solicitud'] == 1) 
										$label = '<span class="label label-sm label-success">SI</span>';
									else
										$label = '<span class="label label-sm label-danger">NO</span>';
	
									return $label;
								}
								
							}
								
						]
						
					}
				});
		}
		/*******************************************/
		/*      	  	FIN TEMPLATE   		 	   */
		/*******************************************/
		

		
		/*******************************************/
		/*      	  CARGAR DATATABLE   		   */
		/*******************************************/
		
        var gridEvaluaciones = new Datatable();

		function initEvaluaciones(idVehiculo){
			
				gridEvaluaciones.init({
					src: $("#datatable_evaluaciones"),
					onSuccess: function () {
					},
					onError: function (grid) {
					},
					loadingMessage: 'Cargando...',
					dataTable: { 
						"language": {
							"aria": {
								"sortAscending": ": activate to sort column ascending",
								"sortDescending": ": activate to sort column descending"
							},
							"emptyTable": "No se encontraron registros en la tabla",
							"info": "Mostrando _START_ al _END_ de _TOTAL_ registros",
							"infoEmpty": "No se encontraron registros",
							"infoFiltered": "(filtered1 de _MAX_ total registros)",
							"lengthMenu": "Mostrar _MENU_ registros",
							"search": "Buscar:",
							"zeroRecords": "No se encontraron registros con los criterios de busqueda",
							"paginate": {
								"first":      "Primero",
								"last":       "Ultimo",
								"next":       "Siguiente",
								"previous":   "Anterior"
							}
						},
						"bStateSave": true, 
						"bAutoWidth": true,
						buttons: [
							{ extend: 'print', className: 'btn yellow', text: 'Imprimir' },
							{ extend: 'pdf', className: 'btn green', text: 'Exportar PDF' },
							{ extend: 'excel', className: 'btn blue', text: 'Exportar EXCEL' },
							{ extend: 'csv', className: 'btn purple ', text: 'Exportar CSV | Transparencia' },
							{ extend: 'colvis', className: 'btn dark', text: 'Columnas'}
						],
						"initComplete": function (settings, json) {//here is the tricky part 
							var total = settings.aoData.length;
							if(total >0) $('#total_evaluaciones').addClass('badge-success').removeClass('badge-danger').html(total);
							else  $('#total_evaluaciones').html(total);
						},
						"sDom": '',
						"sPlaceHolder": "head:after",
						"lengthMenu": [
							[10, 20, 50, -1],
							[10, 20, 50, "Todo"] // change per page values here
						],
						"processing": true,
						"pageLength": -1, // default record count per page
						"ajax": {
							url: "database/MantenimientoEvaluacionesGet.php?action_type=evaluaciones_x_vehiculo&id=" + idVehiculo, // ajax source
							dataSrc: "data",
							//success: function(data) {
								//console.log(gridEvaluaciones.getDataTable().data().count());
								//console.log(gridEvaluaciones.getDataTable().closest('.uib-tab').children('.badge').html("asdasd"));
								//console.log(gridEvaluaciones.getDataTable().parent('.uib-tab').children('.badge').html("asdasd"));
								
							//}
						},
						columns: [	
										
								{ data : "idmantenimiento_evaluaciones" },
								{
								  "mData": null,
								  "bSortable": false,
								  "mRender": function(data, type, full) {
		
									return '<a href=#/private/registrar_evaluacion_mantenimiento/' + data['idmantenimiento_evaluaciones'] + '/' +  data['idmantenimiento_solicitudes'] + '>' + data['descripcion_evaluacion'] + '</a>';               
								  }
								},
								{ data : "fecha_evaluacion" },
								{
									"mData": null,
									"bSortable": false,
									"mRender": function(data, type, full) {
		
										if(data['total_evaluaciones_aprobadas'] > 0) 
											$total_evaluaciones_aprobadas = '<span class="label label-sm label-success">' + data['total_evaluaciones_aprobadas'] + '</span>';
										else
											$total_evaluaciones_aprobadas = '<span class="label label-sm label-danger">' + data['total_evaluaciones_aprobadas'] + '</span>';
		
										return $total_evaluaciones_aprobadas;
									},
									className : 'dt-center'
								},
								{ data : "idmantenimiento_solicitudes" },
								{ data : "fecha_solicitud" },
						]
						
					}
				});
				
		}
		/*******************************************/
		/*      	  	FIN TEMPLATE   		 	   */
		/*******************************************/
		
		
		/***************************************/
		/*    	    FIN SELECT CARGA		   */
		/***************************************/
						
		var gridOrdenTrabajo = new Datatable();
		
		function initOrdenTrabajo(idVehiculo){
			
					gridOrdenTrabajo.init({
						src: $("#datatable_orden_trabajo"),
						onSuccess: function (grid) {
							
						},
						onError: function (grid) {
						},
						loadingMessage: 'Cargando...',
						dataTable: { 
							"language": {
								"aria": {
									"sortAscending": ": activate to sort column ascending",
									"sortDescending": ": activate to sort column descending"
								},
								"emptyTable": "No data available in table",
								"info": "Mostrando _START_ al _END_ de _TOTAL_ registros",
								"infoEmpty": "No entries found",
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
							
							"bStateSave": true, 
							"bAutoWidth": true,
							"initComplete": function (settings, json) {//here is the tricky part 
								var total = settings.aoData.length;
								if(total >0) $('#total_ordenes_trabajo').addClass('badge-success').removeClass('badge-danger').html(total);
								else  $('#total_ordenes_trabajo').html(total);
							},
							"buttons": [
								{ extend: 'print', className: 'btn default' },
								{ extend: 'copy', className: 'btn default' },
								{ extend: 'pdf', className: 'btn default' },
								{ extend: 'excel', className: 'btn default' },
								{ extend: 'csv', className: 'btn default' },
								{
									text: 'Reload',
									className: 'btn default',
									action: function ( e, dt, node, config ) {
										dt.ajax.reload();
										swal("Actualizada!", "El listado de contratos se actualizo correctamente.", "success");
									}
								}
							],
							"sDom": '',
							"dom": "",
							"lengthMenu": [
								[10, 20, 50, -1],
								[10, 20, 50, "Todo"] 
							],
							"processing": true,
							"pageLength": 10, 
							"ajax": {
								url: "database/OrdenTrabajoGet.php?action_type=ordenes_trabajo_x_vehiculo&id=" + idVehiculo,
								dataSrc: "data"
							},			
											
							columns: [
									{ data : "idorden_trabajo" },
									{
										  "mData": null,
										  "bSortable": false,
										  "mRender": function(data, type, full) {
													return '<a href=#/private/registrar_orden_trabajo/' + data['idorden_trabajo'] + '>' + data['descripcion_orden_trabajo'] + '</a>';
																
										  }
									},	
									{ data : "fecha_orden_trabajo" },
									{ data : "idmantenimiento_solicitudes" },
									{ data : "idmantenimiento_evaluaciones" },
									
									
							]
							
						}
					});
					
					
		}
		/*******************************************/
		/*      	  	FIN TEMPLATE   		 	   */
		/*******************************************/
		
		
		/***************************************/
		/*    	    FIN SELECT CARGA		   */
		/***************************************/
						
		var gridComponentes = new Datatable();
		
		function initComponentes(idVehiculo){
			
					gridComponentes.init({
						src: $("#datatable_componentes"),
						onSuccess: function (grid) {
							
						},
						onError: function (grid) {
						},
						loadingMessage: 'Cargando...',
						dataTable: { 
							"language": {
								"aria": {
									"sortAscending": ": activate to sort column ascending",
									"sortDescending": ": activate to sort column descending"
								},
								"emptyTable": "No data available in table",
								"info": "Mostrando _START_ al _END_ de _TOTAL_ registros",
								"infoEmpty": "No entries found",
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
							
							"bStateSave": true, 
							"bAutoWidth": true,
							"initComplete": function (settings, json) {//here is the tricky part 
								var total = settings.aoData.length;
								if(total >0) $('#total_componentes').addClass('badge-success').removeClass('badge-danger').html(total);
								else  $('#total_componentes').html(total);
							},
							"buttons": [
								{ extend: 'print', className: 'btn default' },
								{ extend: 'copy', className: 'btn default' },
								{ extend: 'pdf', className: 'btn default' },
								{ extend: 'excel', className: 'btn default' },
								{ extend: 'csv', className: 'btn default' },
								{
									text: 'Reload',
									className: 'btn default',
									action: function ( e, dt, node, config ) {
										dt.ajax.reload();
										swal("Actualizada!", "El listado de contratos se actualizo correctamente.", "success");
									}
								}
							],
							"sDom": '',
							"dom": "",
							"lengthMenu": [
								[10, 20, 50, -1],
								[10, 20, 50, "Todo"] 
							],
							"processing": true,
							"pageLength": 10,
							"autoWidth": false, 
							"ajax": {
								url: "database/MantenimientoComponentesGet.php?action_type=componentes_x_vehiculo&id=" + idVehiculo,
								dataSrc: "data"
							},
							"footerCallback": function ( row, data, start, end, display ) {
					
									var api = this.api(), data;
						 
									var intVal = function ( i ) {
										return typeof i === 'string' ?
											i.replace(/[\$,]/g, '')*1 :
											typeof i === 'number' ?
												i : 0;
									};
									
									var roundVal = function (number, places) {
									   number = parseFloat(number, 10);
									   var e  = parseInt(places || 2, 10);
									   var m = Math.pow(10, e);
									   return Math.floor(number * m) / m;
									}
						 
									total = api
										.column( 5 )
										.data()
										.reduce( function (a, b) {
											return intVal(a) + intVal(b);
										}, 0 );
						 
						 
									$( api.column( 5 ).footer() ).html(
										'S/' + roundVal(total, 2)
									);
										
									
							},			
							columns: [
									{ data : "idmantenimiento_componentes" },
									{ data : "nombre_componente" },
									{ data : "descripcion_problema" },
									{ data : "descripcion_diagnostico" },
									{ data : "descripcion_accion"  },
									{ data : "costo_accion", render: $.fn.dataTable.render.number(',', '.', 2, 'S/') },
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
									{ data : "motivo_cambio_componente" }

							]
							
						}
					});
					
					
		}
		/*******************************************/
		/*      	  	FIN TEMPLATE   		 	   */
		/*******************************************/
		
		
		/***************************************/
		/*    	    FIN SELECT CARGA		   */
		/***************************************/
						
		var gridTalleres = new Datatable();
		
		function initTalleres(idVehiculo){
			
					gridTalleres.init({
						src: $("#datatable_talleres"),
						onSuccess: function (grid) {
							
						},
						onError: function (grid) {
						},
						loadingMessage: 'Cargando...',
						dataTable: { 
							"language": {
								"aria": {
									"sortAscending": ": activate to sort column ascending",
									"sortDescending": ": activate to sort column descending"
								},
								"emptyTable": "No data available in table",
								"info": "Mostrando _START_ al _END_ de _TOTAL_ registros",
								"infoEmpty": "No entries found",
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
							
							"bStateSave": true, 
							"bAutoWidth": true,
							"initComplete": function (settings, json) {//here is the tricky part 
								var total = settings.aoData.length;
								if(total >0) $('#total_talleres').addClass('badge-success').removeClass('badge-danger').html(total);
								else  $('#total_talleres').html(total);
							},
							"buttons": [
								{ extend: 'print', className: 'btn default' },
								{ extend: 'copy', className: 'btn default' },
								{ extend: 'pdf', className: 'btn default' },
								{ extend: 'excel', className: 'btn default' },
								{ extend: 'csv', className: 'btn default' },
								{
									text: 'Reload',
									className: 'btn default',
									action: function ( e, dt, node, config ) {
										dt.ajax.reload();
										swal("Actualizada!", "El listado de contratos se actualizo correctamente.", "success");
									}
								}
							],
							"sDom": '',
							"dom": "",
							"lengthMenu": [
								[10, 20, 50, -1],
								[10, 20, 50, "Todo"] 
							],
							"processing": true,
							"pageLength": 10, 
							"ajax": {
								url: "database/MantenimientoComponentesGet.php?action_type=componentes_x_vehiculo&id=" + idVehiculo,
								dataSrc: "data"
							},			
							"footerCallback": function ( row, data, start, end, display ) {
					
									var api = this.api(), data;
						 
									var intVal = function ( i ) {
										return typeof i === 'string' ?
											i.replace(/[\$,]/g, '')*1 :
											typeof i === 'number' ?
												i : 0;
									};
									
									var roundVal = function (number, places) {
									   number = parseFloat(number, 10);
									   var e  = parseInt(places || 2, 10);
									   var m = Math.pow(10, e);
									   return Math.floor(number * m) / m;
									}
						 
									total = api
										.column( 5 )
										.data()
										.reduce( function (a, b) {
											return intVal(a) + intVal(b);
										}, 0 );
						 
						 
									$( api.column( 5 ).footer() ).html(
										'S/' + roundVal(total, 2)
									);
										
									
							},				
							columns: [
									{ data : "idtrabajos_x_evaluaciones" },	
									{ data : "nombre_taller"  },
									{ data : "descripcion_problema" },
									{ data : "descripcion_diagnostico" },
									{ data : "descripcion_accion"  },
									{ data : "costo_accion", render: $.fn.dataTable.render.number(',', '.', 2, 'S/') },
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
									{ data : "motivo_taller_seleccionado" }

							]
							
						}
					});
					
					
		}
		/*******************************************/
		/*      	  	FIN TEMPLATE   		 	   */
		/*******************************************/
		
		
		
		
		initFichaTecnicaContent();
		
	
					
					
    });					
});

