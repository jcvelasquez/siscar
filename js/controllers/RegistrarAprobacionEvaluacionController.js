/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarAprobacionEvaluacionController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		var idSolicitud = $rootScope.$state.params.idsolicitud; 
		var formdata = "";
		var msg_toast_cabecera = "";
		var msg;
		var shortCutFunction;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg ="";
		
		/*$('#fecha_evaluacion').datepicker({
			autoclose: true,
			endDate : new Date()
		});*/
		
		//$('#fecha_evaluacion').datepicker('update', new Date());
		
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
													return '<span class="badge badge-success">' + data['total_evaluaciones'] + '</span>';
												}
													
											},
											className : 'dt-center'
										},
										/*{
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
										},*/
										{
										  "mData": null,
										  "bSortable": false,
										  "mRender": function(data, type, full) {
												/*
												return '<div class="btn-group">' +
														'<button class="btn btn-xs btn-info dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Acciones <i class="fa fa-angle-down"></i></button>' +
														 '<ul class="dropdown-menu pull-right" role="menu">' +
														 	'<li><a href="javascript:;" data-id="' + data['idservicios_x_solicitudes'] + '" class="agregar_evaluacion"><i class="fa fa-plus"></i> Agregar evaluacion</a></li>' +
															'<li><a href="javascript:;" data-id="' + data['idservicios_x_solicitudes'] + '" class="ver_evaluaciones"><i class="fa fa-bar-chart"></i> Ver evaluaciones</a></li>' +
														'</ul>' +
													'</div>'; 
													*/
													return '<a href="javascript:;" data-id="' + data['idservicios_x_solicitudes'] + '" class="btn btn-warning btn-sm ver_evaluaciones"><i class="fa fa-search"></i> Ver evaluaciones</a>';											 			
																
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
										{
										  "mData": null,
										  "bSortable": false,
										  "mRender": function(data, type, full) {
											  
											  	if(data['es_taller_seleccionado'] == 1) 
													return '<div><label><input type="radio" name="idevaluaciones_x_servicios" value="' + data['idevaluaciones_x_servicios'] + '" checked="checked"></label></div>';
												else
													return '<div><label><input type="radio" name="idevaluaciones_x_servicios" value="' + data['idevaluaciones_x_servicios'] + '"></label></div>';
													
												  
												 
						  
										  }
										},	
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
													$label = '<span class="label label-sm label-warning">SI</span>';
				
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
										},
										{ data : "motivo_taller_seleccionado" }
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
							
							//$('#fecha_evaluacion').datepicker('update', data.fecha_evaluacion);
							$('#fecha_evaluacion').val(data.fecha_evaluacion);
							
							
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
1010					
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
		/*        CLICK BOTON VER EVALUACIONES      */
		/********************************************/
		$( "#cancelar_aprobacion" ).click(function() {
			
			$('#actions_aprobar').addClass('hide');
			$('#evaluaciones_registradas').addClass('hide');
			
			//trActive.toggleClass("active");
									
		});
		
		/********************************************/
		/*        CLICK BOTON VER EVALUACIONES      */
		/********************************************/
		var trActive;
		var dataParaAprobar;
		
		$('#datatable_servicios tbody').on( 'click', '.ver_evaluaciones', function () {
			
			trActive = $(this).parents('tr');
			
			var data = gridServicios.row( trActive ).data();
			
			dataParaAprobar = gridServicios.row( trActive ).data();
			
			//trActive.toggleClass("active");
			
			var new_url_items = "database/MantenimientoEvaluacionesGet.php?action_type=list_evaluaciones_x_servicios&id=" + data['idservicios_x_solicitudes'] + '&tipo_evaluacion_x_servicio=detalle';
			gridEvaluaciones.ajax.url(new_url_items).load();
			gridEvaluaciones.columns.adjust().draw();
			
			$('#evaluaciones_registradas').removeClass('hide');
			$('#actions_aprobar').removeClass('hide');
			
		});
		
		
		
		/*******************************************/
		/*      	DATATABLES Y FUNCIONES		   */
		/*******************************************/
		/*var tableWrapper = jQuery('#datatable_evaluaciones');

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
		
		
		/**********************************************/
		/*          GRABAR SISTEMAS ADJUDICADOS		  */
		/**********************************************/
		
		$( "#aprobar_evaluacion" ).click(function() {
			
				var seAprobo = false;
				
				if(gridEvaluaciones.rows().count() == 0){
					swal("ERROR", "Debe seleccionar al menos una evaluacion para aprobar.", "error");		
					return false;
				}
				
				 
				 gridEvaluaciones.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
					 var data = this.data();
					 if(data['es_taller_seleccionado'] == 1) seAprobo = true;
				 });
				 
				 if(seAprobo){
					 swal("ERROR", "Ya existe una evaluacion aprobada para este problema.", "error");
					 return false;
				 }
				 	
				 
						
				 var form_aprobacion = $('#form_aprobacion');
				 var error_aprobacion = $('.alert-danger', form_aprobacion);

				  form_aprobacion.validate({
							errorElement: 'span', 
							errorClass: 'help-block help-block-error', 
							focusInvalid: false, 
							ignore: "",  
							rules: {
								idevaluaciones_x_servicios: {
									required: true
								}
							},
							invalidHandler: function (event, validator) { 
								error_aprobacion.show();
								App.scrollTo(error_aprobacion, -55);
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
	
									error_aprobacion.hide();
									
									swal({title: "INFORMACION REQUERIDA",
										  text: "Para aprobar esta evaluacion, debe registrar el motivo por el cual eligió a este taller.",
										  type: "warning",
										  showCancelButton: true,
										  confirmButtonClass: "btn-success",
										  confirmButtonText: "Registrar",
										  cancelButtonText: "Cancelar",
										  closeOnConfirm: true
										},
										function(){
											
											$('#modal_motivo_aprobacion').modal('show');
											
										});
																										
							}

				});

		});
		
		/*************************************************/
		/*            VALIDAR ITEMS ADJUDICADOS          */
		/*************************************************/
		
		/**********************************************/
		/*          GRABAR SISTEMAS ADJUDICADOS		  */
		/**********************************************/
		$( "#grabar_aprobar" ).click(function() {
						
				 var form_motivo = $('#form_motivo');
				 var error_motivo = $('.alert-danger', form_motivo);

				  form_motivo.validate({
							errorElement: 'span', 
							errorClass: 'help-block help-block-error', 
							focusInvalid: false, 
							ignore: "",  
							rules: {
								motivo_taller_seleccionado: {
									required: true
								}
							},
							invalidHandler: function (event, validator) { 
								error_motivo.show();
								App.scrollTo(error_motivo, -55);
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
	
									error_motivo.hide();
											
													
									$.ajax({
										dataType:'JSON',
										type: 'POST',
										url: 'database/MantenimientoEvaluacionesGet.php',
										data: {
											action_type : "aprobar_evaluacion_x_servicio",
											usuario_aprobacion : $rootScope.settings.sesion.usuario,
											es_evaluacion_aprobada : 1,
											es_taller_seleccionado : 1,
											motivo_taller_seleccionado : $('#motivo_taller_seleccionado').val(),
											idevaluaciones_x_servicios : $("input[name='idevaluaciones_x_servicios']:checked").val()
										},
										success : function(response){
											
											$('#form_motivo')[0].reset();
											
											$('#modal_motivo_aprobacion').modal('hide');
											
											swal("CONFIRMACION", "La aprobacion se registró correctamente.", "success");
											
											var new_url_items = "database/MantenimientoEvaluacionesGet.php?action_type=list_evaluaciones_x_servicios&id=" + dataParaAprobar['idservicios_x_solicitudes'] + '&tipo_evaluacion_x_servicio=detalle';
											gridEvaluaciones.ajax.url(new_url_items).load();
											gridEvaluaciones.columns.adjust().draw();
																	
										},
										error: function(xhr) { 
											console.log(xhr.statusText + xhr.responseText);
										}
										
									});
											
																										
							}

				});

		});
		
		/*************************************************/
		/*            VALIDAR ITEMS ADJUDICADOS          */
		/*************************************************/
		
		
		//SE INICIAN LAS FUNCIONES
		initEditContent();
		initEvaluacionesXsolicitud();
		
		
    });
}]);
