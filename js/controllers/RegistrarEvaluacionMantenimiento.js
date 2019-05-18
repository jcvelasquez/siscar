/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarEvaluacionMantenimiento', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {   
    	// initialize core components
    	//DATOS DE LOGIN PARA TODAS LAS PAGINAS
		App.initAjax();
		AppSiscar.initAjax();
		
		//DATOS DE LOGIN PARA TODAS LAS PAGINAS
		
		$rootScope.settings.sesion = AppSiscar.getSesion();
		//FINALIZACION DE DATOS PARA TODAS LAS PAGINAS
		if (typeof($rootScope.settings.sesion) != 'undefined'){
		if($rootScope.settings.sesion.authorize == null || $rootScope.settings.sesion.authorize == false) $rootScope.$state.go('login');
		}else{
		$rootScope.$state.go('login');
		}		
		//console.log($rootScope.settings.sesion);


    	// set default layout mode
    	$rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
		
		
		/*******************************************/
		/*       INICIALIZACION DE VARIABLES       */
		/*******************************************/
		var idItem = $rootScope.$state.params.id; 
		var idSolicitud = $rootScope.$state.params.idsolicitud; 
		var formdata = "";
		var msg_toast_cabecera = "";
		var msg;
		var shortCutFunction;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg ="";
		
		$('#fecha_evaluacion').datepicker({
			autoclose: true,
			endDate : new Date()
		});
		
		$('#fecha_evaluacion').datepicker('setDate','+0');
				
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});
		
		
		$('#es_taller_seleccionado').on('switchChange.bootstrapSwitch', function (event, state) {
			var x = $(this).data('on-text');
			var y = $(this).data('off-text');
			
			if($("#es_taller_seleccionado").is(':checked')) {
				$('#es_taller_seleccionado').val(1);
				$('#motivo_taller_seleccionado_section').removeClass('hide');
			}else{
				$('#es_taller_seleccionado').val(0);
				$('#motivo_taller_seleccionado_section').addClass('hide');
				$('#motivo_taller_seleccionado').val("");
			}
		});
		
		$('#es_cambio_componente').on('switchChange.bootstrapSwitch', function (event, state) {
			var x = $(this).data('on-text');
			var y = $(this).data('off-text');
			
			if($("#es_cambio_componente").is(':checked')) {
				$('#es_cambio_componente').val(1);
				$('#motivo_cambio_componente_section').removeClass('hide');
			}else{
				$('#es_cambio_componente').val(0);
				$('#motivo_cambio_componente_section').addClass('hide');
				$('#motivo_cambio_componente').val("");				
			}
		});
		
		
		
		/***************************************/
		/*    GRID DE SERVICIOS SOLICITADOS    */
		/***************************************/	
		var gridServicios = new Datatable();
		
		function initServiciosXsolicitud(idSolicitud){
			
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
								url: "database/MantenimientoEvaluacionesGet.php?action_type=list_evaluaciones_x_servicios&id=" + idSolicitud + "&tipo_evaluacion_x_servicio=total"
							},
							"autoWidth": true,
							columns: [		
										
										//{ data : "nombre_sistema" },
										{ data : "nombre_servicio"  },
										{ data : "nombre_componente" },
										{ data : "tipo_servicio_mantenimiento" },
										
										{ data : "descripcion_problema" },
										{
											"mData": null,
											"bSortable": false,
											"mRender": function(data, type, full) {
												
												if(data['total_evaluaciones'] < 1){
													return '<span class="badge badge-danger">' + data['total_evaluaciones'] + '</span>';
												}else{
													return '<span class="badge badge-info">' + data['total_evaluaciones'] + '</span>';
												}
													
											},
											className : 'dt-center'
										},
										{
											"mData": null,
											"bSortable": false,
											"mRender": function(data, type, full) {
				
												if(data['is_alerta'] == 0) 
													$label = '<span class="label label-sm label-danger">NO</span>';
												else
													$label = '<span class="label label-sm label-success">SI</span>';
				
												return $label;
											},
											className : 'dt-center'
										},
										{
										  "mData": null,
										  "bSortable": false,
										  "mRender": function(data, type, full) {
												
												return '<div class="btn-group">' +
														'<button class="btn btn-xs btn-info dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-gear"></i> Acciones <i class="fa fa-angle-down"></i></button>' +
														 '<ul class="dropdown-menu pull-right" role="menu">' +
														 	'<li><a href="javascript:;" data-id="' + data['idservicios_x_solicitudes'] + '" class="agregar_evaluacion"><i class="fa fa-plus"></i> Agregar evaluacion</a></li>' +
															'<li><a href="javascript:;" data-id="' + data['idservicios_x_solicitudes'] + '" class="ver_evaluaciones"><i class="fa fa-bar-chart"></i> Ver evaluaciones</a></li>' +
														'</ul>' +
													'</div>';  
													
													//return '<a href="javascript:;" data-id="' + data['idservicios_x_solicitudes'] + '" class="btn btn-warning btn-xs agregar_evaluacion"><i class="fa fa-plus"></i> Agregar evaluacion</a>';											 			
																
										  }
										}
							]
							
							
					})
				
			
		}
		
		
		/***************************************/
		/*         GRID DE EVALUACIONES        */
		/***************************************/
		var gridEvaluaciones = new Datatable();
		
		function initEvaluacionesXsolicitud(idSolicitud){
						
				gridEvaluaciones = $('#datatable_evaluaciones').DataTable({
							src: $("#datatable_evaluaciones"),
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
							//"autoWidth": true,
							"sDom": '',
							/*"ajax": {
								url: "database/MantenimientoEvaluacionesGet.php?action_type=list_evaluaciones_x_servicios&id=" + idSolicitud + "&tipo_evaluacion_x_servicio=detalle"
							},*/
							columns: [	
										{ data : "nombre_taller"  },
										{ data : "descripcion_diagnostico" },
										{ data : "descripcion_accion"  },
										{ data : "costo_accion" },
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
										{ data : "motivo_cambio_componente" },
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
										},/*
										{ data : "motivo_taller_seleccionado" },*/
										{
										  "mData": null,
										  "bSortable": false,
										  "mRender": function(data, type, full) {
												
												if(data['es_taller_seleccionado'] == 0) {
												
												return '<div class="btn-group">' +
														'<button class="btn btn-xs btn-warning dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> <i class="fa fa-gear"></i> Acciones <i class="fa fa-angle-down"></i></button>' +
														 '<ul class="dropdown-menu pull-right" role="menu">' +
														 	'<li><a href="javascript:;" data-id="' + data['idservicios_x_solicitudes'] + '" class="editar_evaluacion"><i class="fa fa-pencil"></i> Editar evaluacion</a></li>' +
														 	'<li><a href="javascript:;" data-id="' + data['idservicios_x_solicitudes'] + '" class="mt-sweetalert eliminar_evaluacion"><i class="fa fa-times"></i> Eliminar evaluacion</a></li>' +
														'</ul>' +
													'</div>';  
												
												} else {
													return	'';
												}
											 			
																
										  }
										}
							]
							
							
					})
				
			
		}
		
		
		/***************************************/
		/*      AL SELECCIONAR UNA SEDE 	   */
		/***************************************/	
		$('#sedes_idsedes').on('change', function(){
			
			var idSede = $(this).val();	
				
			$('#idmantenimiento_solicitudes').empty();
			$("#idmantenimiento_solicitudes").append('<option value="">Seleccione un vehiculo</option>');
			$('#idmantenimiento_solicitudes').prop('disabled', true);
			$('#idmantenimiento_solicitudes').selectpicker('refresh');	
			
			gridServicios.clear().draw(); //LIMPIAR DATATABLE POR CADA VEZ QUE SE VA A AGREGAR
							
			if(idSede != ''){ 
				initSelectVehiculos("", idSede); 
				$('#vehiculos_idvehiculos').prop('disabled', false);
				$('#vehiculos_idvehiculos').selectpicker('refresh');	
			}else{
				$('#vehiculos_idvehiculos').empty();
				$("#vehiculos_idvehiculos").append('<option value="">Seleccione una sede</option>');
				$('#vehiculos_idvehiculos').prop('disabled', true);
		  		$('#vehiculos_idvehiculos').selectpicker('refresh');	
				
			}
			
		});	
		
		
		/***************************************/
		/*      AL SELECCIONAR UN VEHICULO 	   */
		/***************************************/	
		$('#vehiculos_idvehiculos').on('change', function(){
			
			var idVehiculo = $(this).val();	
			gridServicios.clear().draw(); //LIMPIAR DATATABLE POR CADA VEZ QUE SE VA A AGREGAR
						
			if(idVehiculo != ''){ 
				initSolicitudes("", idVehiculo); 
				
				$('#idmantenimiento_solicitudes').prop('disabled', false);
		  		$('#idmantenimiento_solicitudes').selectpicker('refresh');	
				
			}else{
				$('#idmantenimiento_solicitudes').empty();
				$("#idmantenimiento_solicitudes").append('<option value="">Seleccione un vehiculo</option>');
				$('#idmantenimiento_solicitudes').prop('disabled', true);
		  		$('#idmantenimiento_solicitudes').selectpicker('refresh');	
			}
			
		});	
		
		
		/***************************************/
		/*      CARGAR SELECT SOLICITUDES  	   */
		/***************************************/	
		$('#idmantenimiento_solicitudes').on('change', function(){
			
			var idmantenimiento_solicitudes = $(this).val();	
			gridServicios.clear().draw(); //LIMPIAR DATATABLE POR CADA VEZ QUE SE VA A AGREGAR
						
			if(idmantenimiento_solicitudes != ''){ 
				var new_url_items = "database/MantenimientoEvaluacionesGet.php?action_type=list_evaluaciones_x_servicios&id=" + idmantenimiento_solicitudes + "&tipo_evaluacion_x_servicio=total";
				gridServicios.ajax.url(new_url_items).load();
			}
			
		});
		

		
		/***************************************/
		/*      CARGAR SELECT SOLICITUDES  	   */
		/***************************************/		
		function initSolicitudes(SelectedIndex, IdVehiculo){
				
				$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/MantenimientoSolicitudesGet.php?action_type=solicitudes_x_vehiculo&id=' + IdVehiculo,
				success:function(response){
					
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#idmantenimiento_solicitudes").empty();
					$("#idmantenimiento_solicitudes").append('<option value="">Seleccione un vehiculo</option>');
					
					for( var i = 0; i<len; i++){
						var idmantenimiento_solicitudes = response.data[i]['idmantenimiento_solicitudes'];
						var nombre_solicitud = ' #ID ' + response.data[i]['idmantenimiento_solicitudes'] + ' | ' + response.data[i]['descripcion_solicitud'];
													
						$('#idmantenimiento_solicitudes').append($('<option>', { value: idmantenimiento_solicitudes, text: nombre_solicitud })).selectpicker('refresh');
					}
					//FIN CARGA DE REGISTROS EN EL SELECT
					
					//$('#idmantenimiento_solicitudes').prop('disabled', false);
		  			//$('#idmantenimiento_solicitudes').selectpicker('refresh');
				
					//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idmantenimiento_solicitudes option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmantenimiento_solicitudes').selectpicker('refresh');
						}
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
			
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
		/*       	CARGAR SELECT SEDES    	   */
		/***************************************/		
		function initTalleres(SelectedIndex){
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/TalleresGet.php?action_type=list',
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#talleres_idtalleres").empty();
						$("#talleres_idtalleres").append('<option value="">Seleccione un taller</option>');
						
						for( var i = 0; i<len; i++){
							var idtalleres = response.data[i]['idtalleres'];
							var nombre_taller = response.data[i]['nombre_taller'];
							$('#talleres_idtalleres').append($('<option>', { value: idtalleres, text: nombre_taller })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#talleres_idtalleres option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#talleres_idtalleres').selectpicker('refresh');
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
					
					//$('#vehiculos_idvehiculos').prop('disabled', false);
		  			//$('#vehiculos_idvehiculos').selectpicker('refresh');
				
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
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/		
		
		function initEditContent(){
			
				if (idItem != '' && idItem != 'nuevo') {
						
					//CAMPOS DE EDICION	
										
					 $.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/MantenimientoEvaluacionesGet.php?action_type=edit&id='+idItem,
						success:function(data){
										
							initSedes(data.sedes_idsedes);
							
							initSelectVehiculos(data.vehiculos_idvehiculos, data.sedes_idsedes);
														
							initSolicitudes(data.idmantenimiento_solicitudes, data.vehiculos_idvehiculos);
							
							initServiciosXsolicitud(data.idmantenimiento_solicitudes);
							
							
							$('#descripcion_evaluacion').val(data.descripcion_evaluacion);
							
							$('#fecha_evaluacion').datepicker('update', data.fecha_evaluacion);
							
							$('#idmantenimiento_evaluaciones').val(data.idmantenimiento_evaluaciones);
							
							//DESAXTIVO  LOS SELECT DE SOLICITUD
							$('#idmantenimiento_solicitudes').prop('disabled', true);
	  					    $('#idmantenimiento_solicitudes').selectpicker('refresh');
							
							$('#vehiculos_idvehiculos').prop('disabled', true);
	  					    $('#vehiculos_idvehiculos').selectpicker('refresh');
							
							$('#sedes_idsedes').prop('disabled', true);
	  					    $('#sedes_idsedes').selectpicker('refresh');
			
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
					
				
				}else{
					
					if (idSolicitud != '' && idSolicitud != 'nuevo'){
						
						$.ajax({
							dataType:'JSON',
							type: 'POST',
							url: 'database/MantenimientoSolicitudesGet.php?action_type=cabecera_solicitud&id='+idSolicitud,
							success:function(data){
								
								initSedes(data.sedes_idsedes);
								
								initSelectVehiculos(data.vehiculos_idvehiculos, data.sedes_idsedes);
								
								initSolicitudes(data.idmantenimiento_solicitudes, data.vehiculos_idvehiculos);
								
							},
							error: function(xhr) { 
								console.log(xhr.statusText + xhr.responseText);
							}
						});
						
					}else{
						
						initSedes("");
						
						initServiciosXsolicitud("");	
						
						//$('#idmantenimiento_solicitudes').prop('disabled', false);
		  				//$('#idmantenimiento_solicitudes').selectpicker('refresh');
					
					}

					App.blockUI({
						target: '#items_diagnostico',
						boxed: true,
						textOnly: true,
						message: 'Esta sección esta bloqueda hasta que la evaluacion sea guardada'
					});
				
		
		
				}
				
				/***************************************/
				/*   FIN DE  CARGAR REGISTRO A EDITAR   */
				/***************************************/					
			
		}
		
		
		
		
		
		/********************************************/
		/*     CLICK BOTON REGISTRAR EVALUACIONES    */
		/********************************************/
		var dataEvaluacion;
		
		$('#datatable_servicios tbody').on( 'click', 'a.agregar_evaluacion', function () {
			
			var data = gridServicios.row( $(this).parents('tr') ).data();
			//var rowToDelete = $(this).parents('tr');
			dataEvaluacion = data;
			
			$("#form_evaluacion")[0].reset();
			$('.descripcion_problema').val(data.descripcion_problema);
			
			//SCROLL AL PRIMER CAMPO DE REGISTRO
			var form_evaluacion = $('#form_evaluacion');
			var button_grabar = $('#grabar_evaluacion', form_evaluacion);
			App.scrollTo(button_grabar, 750);
									 
			//MOSTRAR TODOS LOS COMPNENTES DE REGISTRO O EDICION
			$('#grabar_evaluacion').removeClass('hide');
			$('#cancelar_evaluacion').removeClass('hide');
			$('#registro_evaluacion').removeClass('hide');
			
			//OCULTAR TODOS LOS COMPONENTES DE VER EVALUACIONES
			$('#evaluaciones_registradas').addClass('hide');
			$('#ver_evaluaciones').addClass('hide');
			$('#cerrar_evaluaciones').addClass('hide');
			
			//LLAVES PARA TABLA DE EVALUACIONES
			$('#idservicios_x_solicitudes').val(data.idservicios_x_solicitudes);
			$('#idevaluaciones_x_servicios').val(data.idevaluaciones_x_servicios);	
			
			initTalleres("");
			
			//initEvaluacionesXsolicitud(data.idmantenimiento_solicitudes);
			
		} );
		
		
		/**********************************************/
		/*  CLICK BOTON OCULTAR AGREGAR EVALUACIONES  */
		/**********************************************/	
		$( "#cancelar_evaluacion" ).click(function() {
				
				//OCULTAR TODOS LOS COMPNENTES DE REGISTRO O EDICION
				$('#grabar_evaluacion').addClass('hide');
				$('#cancelar_evaluacion').addClass('hide');
				$('#registro_evaluacion').addClass('hide');
				
				//MOSTRAR BOTON VER EVALUACIONES
				//$('#ver_evaluaciones').removeClass('hide');
				
				var form_evaluacion = $( "#form_evaluacion" );
				$("#form_evaluacion")[0].reset();
							
				var validator = form_evaluacion.validate();
				validator.resetForm();
				
				var error_evaluacion = $('.alert-danger', form_evaluacion);
				error_evaluacion.hide();
			
		});
		
		
		/********************************************/
		/*        CLICK BOTON VER EVALUACIONES      */
		/********************************************/
		$( "#cerrar_evaluaciones" ).click(function() {
			/*
			var new_url_items = "database/MantenimientoEvaluacionesGet.php?action_type=list_evaluaciones_x_servicios&id=" + idSolicitud + '&tipo_evaluacion_x_servicio=detalle'
			gridEvaluaciones.ajax.url(new_url_items).load();
			gridEvaluaciones.columns.adjust().draw();
			*/
			$('#evaluaciones_registradas').addClass('hide');
			//$('#ver_evaluaciones').removeClass('hide');
			
			//$('#ver_evaluaciones').removeClass('hide');
			$('#cerrar_evaluaciones').addClass('hide');
								
				
				
		});
		
		/********************************************/
		/*        CLICK BOTON VER EVALUACIONES      */
		/********************************************/
		$('#datatable_servicios tbody').on( 'click', 'a.ver_evaluaciones', function () {
			
			var data = gridServicios.row( $(this).parents('tr') ).data();
			
			$(this).parents('tr').toggleClass("active");
						
			var new_url_items = "database/MantenimientoEvaluacionesGet.php?action_type=list_evaluaciones_x_servicios&id=" + data['idservicios_x_solicitudes'] + '&tipo_evaluacion_x_servicio=detalle'
			gridEvaluaciones.ajax.url(new_url_items).load();
			gridEvaluaciones.columns.adjust().draw();
			
			$('#registro_evaluacion').addClass('hide');
			$('#grabar_evaluacion').addClass('hide');
			$('#cancelar_evaluacion').addClass('hide');
			
			
			$('#evaluaciones_registradas').removeClass('hide');
			
			//$('#ver_evaluaciones').addClass('hide');
			$('#cerrar_evaluaciones').removeClass('hide');
			
				
				
		});
		
		
		/*******************************************/
		/*      	DATATABLES Y FUNCIONES		   */
		/*******************************************/
		/*var tableWrapper = $('#datatable_servicios');

		tableWrapper.find('.group-checkable').change(function () {
			
			var set = jQuery(this).attr("data-set");
			var checked = jQuery(this).is(":checked");
			
			jQuery(set).each(function () {
				if (checked) {
					$(this).prop("checked", true);
					$(this).parents('tr').addClass("active");
				} else {
					$(this).prop("checked", false);
					$(this).parents('tr').removeClass("active");
				}
			});
		});

		tableWrapper.on('change', 'tbody tr .checkboxes', function () {
			
			$(this).parents('tr').toggleClass("active");
						
		});*/
		
		


		
		/********************************************/
		/*     CLICK BOTON ELIMINAR EVALUACIONES    */
		/********************************************/
		
		$('#datatable_evaluaciones tbody').on( 'click', 'a.editar_evaluacion', function () {
			
				var data = gridEvaluaciones.row( $(this).parents('tr') ).data();
								
				dataEvaluacion = data;
				
				//CAMBIO LAS PANTALLAS
				//$('#actions_agregar_evaluaciones').removeClass('hide');
				//$('#registro_evaluacion').removeClass('hide');	
				
				//$('#actions_agregar_evaluaciones').removeClass('hide');	
				//$('#actions_ver_evaluaciones').addClass('hide');	
				
				//MOSTRAR TODOS LOS COMPNENTES DE REGISTRO O EDICION
				$('#grabar_evaluacion').removeClass('hide');
				$('#cancelar_evaluacion').removeClass('hide');
				$('#registro_evaluacion').removeClass('hide');
				$('#cerrar_evaluaciones').addClass('hide');
				
				
				$('.descripcion_problema').val(data.descripcion_problema);
				
				//DATOS A EDITAR
				initTalleres(data.talleres_idtalleres);
				
				$('#descripcion_diagnostico').val(data.descripcion_diagnostico);
				
				$('#descripcion_accion').val(data.descripcion_accion);
				$('#costo_accion').val(data.costo_accion);
												
				if(data.es_cambio_componente == 1){
					$('#es_cambio_componente').bootstrapSwitch('state', true); // true || false
					$('#es_cambio_componente').val(data.es_cambio_componente);
				}
				
				$('#motivo_cambio_componente').val(data.motivo_cambio_componente);
				
				/*
				if(data.es_taller_seleccionado == 1){
					$('#es_taller_seleccionado').bootstrapSwitch('state', true); // true || false
					$('#es_taller_seleccionado').val(data.es_taller_seleccionado);
				}
				
				$('#motivo_taller_seleccionado').val(data.motivo_taller_seleccionado);
				*/
				
				//LLAVES PARA TABLA DE EVALUACIONES
				$('#idmantenimiento_evaluaciones').val(data.idmantenimiento_evaluaciones);
				$('#idservicios_x_solicitudes').val(data.idservicios_x_solicitudes);
				$('#idevaluaciones_x_servicios').val(data.idevaluaciones_x_servicios);
					
							
				
		} );


		
		/********************************************/
		/*     CLICK BOTON ELIMINAR EVALUACIONES    */
		/********************************************/
		
		$('#datatable_evaluaciones tbody').on( 'click', 'a.eliminar_evaluacion', function () {
			
			var data = gridEvaluaciones.row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
			
							
					swal({
					  title: "CONFIRMACION REQUERIDA",
					  text: "Una vez eliminada, no será posible recuperar la información!",
					  type: "warning",
					  showCancelButton: true,
					  confirmButtonClass: "btn-success",
					  confirmButtonText: "Si, eliminar",
					  cancelButtonText: "Cancelar",
					  closeOnConfirm: false
					},
					function(){
					
							/*******************************/
							/*       BORRAR REGISTRO       */
							/*******************************/
							
							var formdataevaluaciones = '&action_type=delete_evaluaciones_x_servicios&id=' + data['idevaluaciones_x_servicios'];
							var idmantenimiento_solicitudes = data['idmantenimiento_solicitudes']
							 
							$.ajax({
								dataType:'JSON',
								type: 'POST',
								url: 'database/MantenimientoEvaluacionesGet.php',
								data : formdataevaluaciones,
								success:function(data){
									

									switch(data.code){
									
										case "200"	:	swal("EXITO", "La evaluacion ha sido eliminada.", "success");
															gridEvaluaciones.row(rowToDelete).remove().draw( false );
															break;
															
										case "1451"		:	swal("ERROR", "La evaluacion no se puede eliminar ya que está asociada a otro registro. Para poder eliminarla, deberá borrar todos los registros asociados o prueba anulandola en vez de eliminarla", "error");
															break;
															
										default		:	swal("ERROR", "El registro no se puede eliminar.", "error");
																	
									
									}
																	
									gridServicios.ajax.reload();	
									gridEvaluaciones.ajax.reload();	

					
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
		/********************************************/
		/*  FIN CLICK BOTON ELIMINAR  EVALUACIONES  */
		/********************************************/	
		
		
		/**********************************************/
		/*          GRABAR SISTEMAS ADJUDICADOS		  */
		/**********************************************/
		$( "#grabar_evaluacion" ).click(function() {
						
				 var form_evaluacion = $('#form_evaluacion');
				 var error_evaluacion = $('.alert-danger.items', form_evaluacion);

				  form_evaluacion.validate({
							errorElement: 'span', 
							errorClass: 'help-block help-block-error', 
							focusInvalid: false, 
							ignore: "",  
							rules: {
								talleres_idtalleres: {
									required: true
								},
								descripcion_diagnostico: {
									required: true
								},
								descripcion_accion: {
									required: true
								},
								costo_accion: {
									required: true
								},
								motivo_cambio_componente: {
									required: function(element) {
										if($("#es_cambio_componente").is(':checked'))
											return true;
										else
											return false;
									}
								}/*,
								motivo_taller_seleccionado: {
									required: function(element) {
										if($("#es_taller_seleccionado").is(':checked'))
											return true;
										else
											return false;
									}
								}*/
							},
							invalidHandler: function (event, validator) { 
								error_evaluacion.show();
								App.scrollTo(error_evaluacion, -55);
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
	
									error_evaluacion.hide();
									
									swal({title: "CONFIRMACION REQUERIDA",
										  text: "¿Esta seguro que desea registrar la evaluación?",
										  type: "warning",
										  showCancelButton: true,
										  confirmButtonClass: "btn-success",
										  confirmButtonText: "Si, registrar",
										  cancelButtonText: "Cancelar",
										  closeOnConfirm: false
										},
										function(){
											
												if(dataEvaluacion['idevaluaciones_x_servicios'] == null){
										
													formdata = $("#form_evaluacion").serialize()+'&action_type=create_evaluaciones_x_servicios';
													msg_toast_cabecera = "Se creo la evaluacion del servicio exitosamente.";
													
												}else{
													formdata = $("#form_evaluacion").serialize()+'&action_type=update_evaluaciones_x_servicios';
													msg_toast_cabecera = "Se actualizo la evaluacion del servicio exitosamente.";
												}
												
													
												$.ajax({
													dataType:'JSON',
													type: 'POST',
													url: 'database/MantenimientoEvaluacionesGet.php',
													data: formdata,
													success:function(idevaluaciones_x_servicios){
																																								
														swal("CONFIRMACION", msg_toast_cabecera, "success");
														
														$('#actions_agregar_evaluaciones').addClass('hide');
														$('#registro_evaluacion').addClass('hide');
														
														/*******************************/
														var new_url_items_servicios = "database/MantenimientoEvaluacionesGet.php?action_type=list_evaluaciones_x_servicios&id=" + dataEvaluacion['idmantenimiento_solicitudes'] + "&tipo_evaluacion_x_servicio=total";
																						
														gridServicios.ajax.url(new_url_items_servicios).load();
						
														/*******************************/
														var new_url_items_evaluaciones = "database/MantenimientoEvaluacionesGet.php?action_type=list_evaluaciones_x_servicios&id=" + dataEvaluacion['idservicios_x_solicitudes'] + "&tipo_evaluacion_x_servicio=detalle";
																						
														gridEvaluaciones.ajax.url(new_url_items_evaluaciones).load();	
														
														$('#grabar_evaluacion').addClass('hide');
														$('#cancelar_evaluacion').addClass('hide');
												
																				
													},
													error: function(xhr) { 
														console.log(xhr.statusText + xhr.responseText);
													}
													
												});
										
										
											
										});
																										
							}

				});

		});
		
		/*************************************************/
		/*            VALIDAR ITEMS ADJUDICADOS          */
		/*************************************************/
		
		
		/******************************************/
		/*            VALIDAR FORMULARIO          */
		/******************************************/
		$( "#grabar" ).click(function() {

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
							fecha_evaluacion: {
								required: true
							},
							vehiculos_idvehiculos: {
								required: true
							},
							idmantenimiento_solicitudes: {
								required: true
							},
							descripcion_evaluacion: {
								required: true
							},
							estado_evaluacion: {
								required: true
							}
						},
						messages: {
							fecha_evaluacion: "Ingrese una fecha válida"
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
						success: function (label) {
								label.closest('.form-group').removeClass('has-error'); 
						},
						submitHandler: function (form) {

								error1.hide();

								/*****************************************************/
								/*            AGREGAR O ACTUALIZAR REGISTRO          */
								/*****************************************************/		
								
								if (idItem == 'nuevo' || idItem == '') {
	
									formdata = $("#form").serialize()+'&action_type=create';
									title = "EVALUACION REGISTRADA"
									msg = "Ahora puede registrar evaluaciones para los servicios de la solicitud. Si desea modificar los datos principales de la evaluacion, deberá salir y volver a entrar.";
										
								}else if (idItem != '' && idItem != 'nuevo') {
	
									formdata = $("#form").serialize()+'&action_type=update&id='+idItem;
									title = "¡El contrato ha sido actualizado!"
									msg = "Toda la informacion fue guardada correctamente.";
	
								}
								
								
								swal({
								  title: "CONFIRMACION REQUERIDA",
								  text: "¿Esta seguro que desea grabar la evaluacion?",
								  type: "warning",
								  showCancelButton: true,
								  confirmButtonClass: "btn-success",
								  confirmButtonText: "Si, guardar!",
								  cancelButtonText: "Cancelar",
								  closeOnConfirm: false
								},
								function(){
									
										$.ajax({
												dataType:'JSON',
												type: 'POST',
												url: 'database/MantenimientoEvaluacionesGet.php',
												data: formdata,
												success:function(data){
													
														//CAMBIA EL NUEVO ID DE LA SOLICITUD
														if (idItem == 'nuevo' || idItem == ''){
																														
															var idevaluacion = data.idevaluacion;
															var idsolicitud = data.idsolicitud;
														
															swal({
															  title: "CONFIRMACION",
															  text: "La cabecera de la evaluacion ha sido registrada. Ahora puede agregar las evaluaciones individuales por cada problema registrado en la solicitud, así como las acciones para solucionar el problema y costos asociados. La pantalla se actualizará al pulsar aceptar...",
															  type: "success",
															  showCancelButton: false,
															  confirmButtonClass: "btn-sucess",
															  confirmButtonText: "Aceptar",
															  closeOnConfirm: true
															},
															function(){
																
																$rootScope.$state.go('private.registrar_evaluacion_mantenimiento', {"id" : idevaluacion, "idsolicitud" : idsolicitud });
																	
															});
															
														}else{
															
															
															switch(data.code){
										
																case "200"		:	swal("CONFIRMACION", "La evaluacion ha sido modificada.", "success");
																					break;
																
																case "1452"		:	swal("ERROR", "La evaluacion no se puede modificar ya que está asociada a otro registro. Para poder modificarla, deberá borrar todos los registros asociados a esta.", "error");
																					break;
																										
																default		:	swal("ERROR", "El registro no se puede modificar.", "error");
																							
															
															}
															
															
															
														}
												
													
												},
												error: function(xhr) { 
													console.log(xhr.statusText + xhr.responseText);
												}
										});
										
										
								});
								/*****************************************************/
								/*        FIN DE AGREGAR O ACTUALIZAR REGISTRO       */
								/*****************************************************/	

						}

				});

		});
				


		
		
		
		
		
		//SE INICIAN LAS FUNCIONES
		initEditContent();
		initEvaluacionesXsolicitud();
		
		
    });
}]);
