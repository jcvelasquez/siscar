/* Setup general page controller */
angular.module('MetronicApp').controller('EjecutarTareasOrdenTrabajoController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
			autoclose: true
		});
		
		$('#fecha_trabajo_ejecutado').datepicker({
			autoclose: true
		});
		
		//$('#fecha_trabajo_ejecutado').datepicker('update', new Date());
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});
		
		$("#porcentaje_trabajo_ejecutado").ionRangeSlider({ 
			postfix : "%", 
			grid: true, 
			grid_num: 10, 
			from: 0,
			min: 0,
            max: 100,
			from_shadow: true
		});	
		
		$('#se_ejecuto_trabajo').on('switchChange.bootstrapSwitch', function (event, state) {
			
			var x = $(this).data('on-text');
			var y = $(this).data('off-text');
			
			if($("#se_ejecuto_trabajo").is(':checked')) {
				$('#se_ejecuto_trabajo').val(1);
				$('#motivo_no_ejecuto_section').addClass('hide');
				$('#motivo_no_ejecuto').val("");
			}else{
				
				$('#se_ejecuto_trabajo').val(0);
				$('#motivo_no_ejecuto_section').removeClass('hide');	
			}
			
		});
		
		// Saving it's instance to var
		//var porcentaje_trabajo_ejecutado = $("#porcentaje_trabajo_ejecutado").data("ionRangeSlider");	

		
		/*******************************************/
		/*       INICIALIZACION DE VARIABLES       */
		/*******************************************/

		var idItem = $rootScope.$state.params.id; 
		var formdata = "";
		var msg;
		var shortCutFunction;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg ="";
		
		
		
		/********************************************/
		/*     CLICK BOTON REGISTRAR EVALUACIONES    */
		/********************************************/
		var dataTarea;
		
		$('#datatable_tareas tbody').on( 'click', 'a.ejecutar', function () {
			
			dataTarea = gridTareas.row( $(this).parents('tr') ).data();
			
			$('#se_ejecuto_trabajo').bootstrapSwitch('state', true); // true || false
			$('#se_ejecuto_trabajo').val(1);
						
			$('#actions_ejecucion').removeClass('hide');
			$('#registro_tareas').removeClass('hide');
			$('#descripcion_problema').val(dataTarea.descripcion_problema);
			$('#descripcion_diagnostico').val(dataTarea.descripcion_diagnostico);
			$('#descripcion_accion').val(dataTarea.descripcion_accion);
			$('#costo_accion').val(dataTarea.costo_accion);
			
			//LLAVES PARA TABLA DE EVALUACIONES
			$('#idtrabajos_x_evaluaciones').val(dataTarea.idtrabajos_x_evaluaciones);							
				
		} );
		/********************************************/
		/*  FIN CLICK BOTON REGISTRAR  EVALUACIONES  */
		/********************************************/	
		
		
		$( "#cancelar_ejecucion" ).click(function() {
			
			$('#actions_ejecucion').addClass('hide');
			$('#registro_tareas').addClass('hide');
			$("#form_ejecucion")[0].reset();
			
		});
		
		
		/*******************************************/
		/*      	DATATABLES Y FUNCIONES		   */
		/*******************************************/
		var tableWrapper = $('#datatable_tareas');

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
			/*
			var gridApi = $('#datatable_servicios').dataTable().api();
				
			gridApi.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
				var data = this.data();
				
				if(data['idtrabajos_x_evaluaciones'] == null) {
				
				}
				
				console.log(data);
				
			} );
					
			
			gridApi.columns('.costo').every(function () {
				
					var column = this;
		
					var sum = column
					   .data()
					   .reduce(function (a, b) { 
						   a = parseInt(a, 10);
						   if(isNaN(a)){ a = 0; }
						   
						   b = parseInt(b, 10);
						   if(isNaN(b)){ b = 0; }
						   
						   return a + b;
					   });
		
					$(column.footer()).html('Sum: ' + sum);
				});
			*/
			$(this).parents('tr').toggleClass("active");
			
			
		});
		
		
		/***************************************/
		/*         CARGAR EVALUACIONES          */
		/***************************************/		
		
		var gridTareas = new Datatable();
		
		function initTrabajosXevaluaciones(idOrdenTrabajo){
			
				gridTareas = $('#datatable_tareas').DataTable({
							src: $("#datatable_tareas"),
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
								url: "database/OrdenTrabajoGet.php?action_type=ejecuciones_x_ordentrabajo&id=" + idOrdenTrabajo
							},
							"columnDefs": [
							{  // set default column settings
								'orderable': true,
								'targets': [0]
							}, 
							{
								"searchable": true,
								"targets": [0]
							},
							{
								"className": "dt-left", 
								"targets": [0]
							}
						],
						"footerCallback": function ( row, data, start, end, display ) {
				
								var api = this.api(), data, totalSum = 0;
								
								var intVal = function ( i ) {
									return typeof i === 'string' ?
										i.replace(/[\$,]/g, '')*1 :
										typeof i === 'number' ?
											i : 0;
								};
								
								data.forEach(function (x){	if(x['idtrabajos_x_evaluaciones'] != null) totalSum += intVal(x['costo_accion']); });

								$( api.column( 3 ).footer() ).html('S/' + totalSum);
								
						},
						columns: [		
								{ data : "descripcion_problema" },
								{ data : "descripcion_diagnostico" },
								{ data : "descripcion_accion" },
								{ data : "costo_accion", render: $.fn.dataTable.render.number(',', '.', 2, 'S/') },
								{
									"mData": null,
									"bSortable": false,
									"mRender": function(data, type, full) {
										
										if(data['idtrabajos_x_evaluaciones'] == null){
											$label = '<span class="label label-sm label-danger">NO REGISTRADO</span>';
										}else{
											if(data['se_ejecuto_trabajo'] == 1) 
												$label = '<span class="label label-sm label-success"><i class="fa fa-check"></i> SI</span>';
											else
												$label = '<span class="label label-sm label-danger"><i class="fa fa-times"></i> NO</span>';
										}
										
										return $label;
									},
									className : 'dt-center'
								},
								{
								  "mData": null,
								  "bSortable": false,
								  "mRender": function(data, type, full) {
									  
									  
									  if(data['se_ejecuto_trabajo'] == 1 || data['porcentaje_trabajo_ejecutado'] > 0) {
										  
										 return '<a href="javascript:;" data-id="' + data['idtrabajos_x_evaluaciones'] + '" class="mt-sweetalert btn btn-xs btn-success ver_detalles"><i class="fa fa-reorder"></i> VER DETALLES</a>';  
												
										}else{
											
											return '<a href="javascript:;" data-id="' + data['idtrabajos_x_evaluaciones'] + '" class="mt-sweetalert btn btn-xs btn-info ejecutar"><i class="fa fa-tachometer"></i> EJECUTAR</a>';  
													
										}
										
												
														
								  }
								}
						]
							
							
					})
				
			
		}
		
		
		/* Formatting function for row details - modify as you need */
		function format ( data ) {
			// `d` is the original data object for the row
			
			var table = "";
			var label_ejecucion = ""; 
			var label_calificacion = ""; 
			
			//LABEL EJECUCION
			if(data.se_ejecuto_trabajo == 1){
				label_ejecucion = '<span class="label label-sm label-success"><i class="fa fa-check"></i> SI</span>';
			}else{
				label_ejecucion = '<span class="label label-sm label-danger"><i class="fa fa-times"></i> NO</span>';
			}
			
			//LABEL CALIFICACION
			switch(data.calificacion_trabajo_ejecutado){
				
				case 1	:	label_calificacion = '<i class="fa fa-star"></i>';
							break;
							
				case 2	:	label_calificacion = '<i class="fa fa-star"></i><i class="fa fa-star"></i>';
							break;
							
				case 3	:	label_calificacion = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
							break;
							
				case 4	:	label_calificacion = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
							break;
							
				case 5	:	label_calificacion = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
							break;
							
				default	:	label_calificacion = 'SIN CALIFICACION';
				
			}

			table += '<table width="100%" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
							'<tr>'+
								'<td width="25%"><b>Fecha de ejecucion:</b></td>'+
								'<td>'+data.fecha_trabajo_ejecutado+'</td>'+
							'</tr>'+
							'<tr>'+
								'<td><b>Calificacion de ejecucion:</b></td>'+
								'<td>' + label_calificacion + '</td>'+
							'</tr>'+
							'<tr>'+
								'<td><b>Resultados de la ejecución:</b></td>'+
								'<td>'+data.comentarios_trabajo_ejecutado+'</td>'+
							'</tr>'+
							'<tr>'+
								'<td><b>% de la ejecución:</b></td>'+
								'<td>'+data.porcentaje_trabajo_ejecutado+'</td>'+
							'</tr>'+
							'<tr>'+
								'<td><b>¿Se ejecuto tarea?</b></td>'+
								'<td>' + label_ejecucion + '</td>'+
							'</tr>';
							
							
							
							if(data.motivo_no_ejecuto != null){
										
								table += '<tr>'+
											'<td><b>Motivo porque no<br>se ejecuto tarea</td>'+
											'<td>'+data.motivo_no_ejecuto+'</td>'+
										'</tr>';
							}	
							
					table += '</table>';
					
					return table;
		}
		
		
		// Add event listener for opening and closing details
		$('#datatable_tareas tbody').on('click', 'a.ver_detalles', function () {
			var tr = $(this).closest('tr');
			var row = gridTareas.row( tr );
	 
			if ( row.child.isShown() ) {
				// This row is already open - close it
				row.child.hide();
				tr.removeClass('shown');
				$(this).html('<i class="fa fa-reorder"></i> VER DETALLES');
				
			}else {
				// Open this row
				row.child( format(row.data()) ).show();
				tr.addClass('shown');
				$(this).html('<i class="fa fa-reorder"></i> OCULTAR DETALLES');
			}
		} );
		

		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/		
		
		function initEditContent(){
			
				 $.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/OrdenTrabajoGet.php?action_type=edit&id='+idItem,
						success:function(data){
																	
							initTrabajosXevaluaciones(data.idorden_trabajo);
													
							$('#usuario').val(data.nombres + ', ' + data.apellidos);
							$('#fecha_orden_trabajo').val(data.fecha_orden_trabajo);
							$('#fecha_estimada_inicio').val(data.fecha_estimada_inicio);
							$('#fecha_estimada_fin').val(data.fecha_estimada_fin);
							$('#nombre_sede').val(data.nombre_sede);
							$('#estado_orden_trabajo').val(data.estado_orden_trabajo);
							$('#placa_vehiculo').val(data.placa_vehiculo);
							$('#descripcion_evaluacion').val(data.descripcion_evaluacion);
							$('#idorden_trabajo').val(data.idorden_trabajo);
							
							
							//porcentaje_trabajo.update({ from: data.porcentaje_trabajo  });
							
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
					
			
				/***************************************/
				/*   FIN DE  CARGAR REGISTRO A EDITAR   */
				/***************************************/					
			
		}
		
		
		
		
		/******************************************/
		/*            VALIDAR FORMULARIO          */
		/******************************************/

		$( "#grabar_ejecucion" ).click(function() {

				 var form_ejecucion = $('#form_ejecucion');
				 var error_ejecucion = $('.alert-danger', form_ejecucion);

				 form_ejecucion.validate({

						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						rules: {
							fecha_trabajo_ejecutado: {
								required: true
							},
							calificacion_trabajo_ejecutado: {
								required: true
							},
							comentarios_trabajo_ejecutado: {
								required: true
							},
							porcentaje_trabajo_ejecutado: {
								required: true,
								min:10
							},
							motivo_no_ejecuto: {
								required: function(element) {
									if($("#se_ejecuto_trabajo").is(':checked'))
										return false;
									else
										return true;
								}
							}
						},
						messages: {
							fecha_trabajo_ejecutado: "Ingrese una fecha válida"
						},
						invalidHandler: function (event, validator) { 
							error_ejecucion.show();
							App.scrollTo(error_ejecucion, -80);
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
							$(element).closest('.form-group').find('span.helper').removeClass('hide');
						},
						unhighlight: function (element) { 
							$(element).closest('.form-group').removeClass('has-error'); 
							$(element).closest('.form-group').find('span.helper').addClass('hide');
						},
						success: function (label) {
								label.closest('.form-group').removeClass('has-error'); 
						},
						submitHandler: function (form) {

								error_ejecucion.hide();
								
								swal({
									  title: "CONFIRMACION REQUERIDA",
									  text: "¿Esta seguro que desea registrar la ejecucion de la tarea? Ya no podrá modificar la ejecucion una vez registrada.",
									  type: "warning",
									  showCancelButton: true,
									  confirmButtonClass: "btn-success",
									  confirmButtonText: "Si, registrar",
									  cancelButtonText: "Cancelar",
									  closeOnConfirm: false
									},
									function(){
										
											/*****************************************************/
											/*        FIN DE AGREGAR O ACTUALIZAR REGISTRO       */
											/*****************************************************/	
											formejecucion = $("#form_ejecucion").serialize()+'&action_type=update_trabajos_x_evaluaciones';
																						
											$.ajax({
												dataType:'JSON',
												type: 'POST',
												url: 'database/OrdenTrabajoGet.php',
												data: formejecucion,
												success:function(response){
																										
													swal("CONFIRMACION", "La ejecución de la tarea fue registrada", "success");
													
													$('#actions_ejecucion').addClass('hide');
													$('#registro_tareas').addClass('hide');
													$("#form_ejecucion")[0].reset();
													
													gridTareas.ajax.reload();	
																			
												},
												error: function(xhr) { 
													console.log(xhr.statusText + xhr.responseText);
												}
												
											});
												
											//}
											/*****************************************************/
											/*        FIN DE AGREGAR O ACTUALIZAR REGISTRO       */
											/*****************************************************/	
										
									
									});
									
						}

				});

		});
		


		/*******************************************/
		/*      	    FIN TEMPLATE     		   */
		/*******************************************/
		
		initEditContent();
		
		
    });
}]);
