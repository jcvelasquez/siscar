/* Setup general page controller */
/* Setup general page controller */
angular.module('MetronicApp').controller('ListarOrdenesTrabajoController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});	
		
		$('#desde').datepicker({
			autoclose: true,
			format: 'dd/mm/yyyy',
			todayHighlight: true
		});
		
		$('#hasta').datepicker({
			autoclose: true,
			format: 'dd/mm/yyyy',
			todayHighlight: true
		});
		
		$("#filtrar").click(function() { 
			
				var formData = $("#form_search").serialize();
				var new_url = "database/OrdenTrabajoGet.php?" + $("#form_search").serialize() + "&action_type=list"

				grid.getDataTable().ajax.url(new_url).load();
								
		});
		
		
		$("#limpiar").click(function() { 
		
				$('#idvehiculos').val("all");
				$('#idvehiculos').selectpicker('refresh');
				
				$('#desde').val('').datepicker('update');
				$('#hasta').val('').datepicker('update');
				
				$('#idsedes').val("all");
				$('#idsedes').selectpicker('refresh');
			
				var new_url = "database/OrdenTrabajoGet.php?" + $("#form_search").serialize() + "&action_type=list";		
				grid.getDataTable().ajax.url(new_url).load();
							
		});
		
		/***************************************/
		/*       	CARGAR SELECT SEDES    	   */
		/***************************************/
		$.ajax({
			dataType:'JSON',
			type: 'POST',
			url: 'database/SedesGet.php?action_type=list',
			success:function(response){
											
				//CARGA DE REGISTROS EN EL SELECT
				var len = response.data.length;
				
				$("#idsedes").empty();
				$("#idsedes").append('<option value="all" selected="selected">TODAS</option>');
				
				for( var i = 0; i<len; i++){
					var idsedes = response.data[i]['idsedes'];
					var nombre_sede = response.data[i]['nombre_sede'];
												
					$('#idsedes').append($('<option>', { value: idsedes, text: nombre_sede })).selectpicker('refresh');
				}

			},
			error: function(xhr) { 
				console.log(xhr.statusText + xhr.responseText);
			}
		});
		
		/***************************************/
		/*    	    FIN SELECT SEDES		   */
		/***************************************/
		
		
		/***************************************/
		/*       	CARGAR VEHICULO    	   */
		/***************************************/
		$.ajax({
			dataType:'JSON',
			type: 'POST',
			url: 'database/VehiculosGet.php?action_type=list',
			success:function(response){
											
				//CARGA DE REGISTROS EN EL SELECT
				var len = response.data.length;
				
				$("#idvehiculos").empty();
				$("#idvehiculos").append('<option value="all" selected="selected">TODAS</option>');
				
				for( var i = 0; i<len; i++){
					var idvehiculos = response.data[i]['idvehiculos'];
					var nombre_vehiculo = response.data[i]['marca_vehiculo'] + ' | ' + response.data[i]['placa_vehiculo'] ;
												
					$('#idvehiculos').append($('<option>', { value: idvehiculos, text: nombre_vehiculo })).selectpicker('refresh');
				}

			},
			error: function(xhr) { 
				console.log(xhr.statusText + xhr.responseText);
			}
		});
		
		/***************************************/
		/*    	    FIN SELECT CARGA		   */
		/***************************************/
		
		/***************************************/
		/*    	    FIN SELECT CARGA		   */
		/***************************************/
						
		var grid = new Datatable();
		
		grid.init({
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
				
				//"bStateSave": true, 
                "bAutoWidth": true,
                "buttons": [
					{ 
						extend: 'print', 
					  	className: 'btn default',
            			autoPrint: true,
						orientation: 'landscape',
						stripHtml: true,
						exportOptions: {
							columns: [0,1,2,3,4,5,6]
						},
						customize: function (win) {
							$(win.document.body).find('*').addClass('display').css('font-size', '10px');
							$(win.document.body).find('td').each(function(index){
								$(this).css('padding','5px');
							});
							$(win.document.body).find('tr:nth-child(odd) td').each(function(index){
								$(this).css('background-color','#D0D0D0');
							});
							$(win.document.body).find('h1').css('text-align','center');
							$(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
						}
					},
					{ 
						extend: 'copy', 
					 	className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6]
						} 
					},
					{ 
						extend: 'pdf', 
						orientation: 'landscape',
					  	className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6]
						}
					},
					{ 
						extend: 'excel',
						className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6]
						}
					},
					{ 
						extend: 'csv',
						className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6]
						}	
					},
					{
						text: 'Reload',
						className: 'btn default',
						action: function ( e, dt, node, config ) {
							dt.ajax.reload();
							swal("Actualizada!", "El listado de contratos se actualizo correctamente.", "success");
						}
					}
				],
				"sDom": 'T<"clear">lfrtip',
				"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
				"lengthMenu": [
					[10, 20, 50, -1],
					[10, 20, 50, "Todo"] 
				],
				"processing": true,
				"pageLength": 20, 
				"order": [[ 2, "desc" ]],
				"columnDefs": [
					{  
						"orderable": true,
						targets: "_all"
					}
				],
				"ajax": {
					url: "database/OrdenTrabajoGet.php?action_type=list",
					dataSrc: "data"
				},			
				columns: [
						{ data : "idorden_trabajo" },
						{
							  "mData": null,
							  "bSortable": false,
							  "mRender": function(data, type, full) {
										return '<a href=#/private/registrar_orden_trabajo/' + data['idorden_trabajo'] + '/' + data['idmantenimiento_evaluaciones'] + '>' + data['descripcion_orden_trabajo'] + '</a>';
													
							  }
						},	
						{ data : "fecha_orden_trabajo" },
						{ data : "nro_orden_sigap" },
						{ data : "placa_vehiculo" },
						{ data : "nombre_sede" },
						{ data : "idmantenimiento_solicitudes" },
						{ data : "idmantenimiento_evaluaciones" },
						{
						  "mData": null,
						  "bSortable": false,
						  "mRender": function(data, type, full) {

							return '<div class="btn-group">' +
										'<button class="btn btn-xs btn-warning dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> <i class="fa fa-gear"></i> Acciones <i class="fa fa-angle-down"></i></button>' +
										 '<ul class="dropdown-menu pull-right" role="menu">' +
											'<li><a href=#/private/registrar_orden_trabajo/' + data['idorden_trabajo'] + '/' + data['idmantenimiento_evaluaciones'] + '><i class="fa fa-pencil"></i> Editar orden trabajo</a></li>' +
											'<li><a href="javascript:;" data-id="' + data['idorden_trabajo'] + '" class="mt-sweetalert delete"><i class="fa fa-times"></i> Eliminar orden trabajo</a></li>' +
											'<li class="divider"></li>' +
											'<li><a href=#/private/ejecutar_tareas_orden_trabajo/' + data['idorden_trabajo'] + '><i class="fa fa-tasks"></i> Registrar ejecucion</a></li>' +
										'</ul>' +
									'</div>';               
						  }
						}
						
						
						
				]
				
			}
		});
		
		
		$('#datatable_ajax_tools > li > a.tool-action').on('click', function() {
			var action = $(this).attr('data-action');
			grid.getDataTable().button(action).trigger();
		});
			
			
			
		/*******************************/
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_orden_trabajo tbody').on( 'click', 'a.mt-sweetalert', function () {
			
			var data = grid.getDataTable().row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
							
				swal({
				  title: "CONFIRMACION REQUERIDA",
				  text: "Una vez eliminada, no será posible recuperar la información!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Si, eliminar!",
				  cancelButtonText: "Cancelar",
				  closeOnConfirm: false
				},
				function(){
				
						/*******************************/
						/*       BORRAR REGISTRO       */
						/*******************************/
						$.ajax({
							dataType:'JSON',
							type: 'POST',
							url: 'database/OrdenTrabajoGet.php?action_type=delete&id='+data['idorden_trabajo'],
							success:function(data){
								
								switch(data.code){
								
									case "200"	:	swal("EXITO", "El registro ha sido eliminado.", "success");
													grid.getDataTable().row(rowToDelete).remove().draw( false );
													break;
														
									case "1451"	:	swal("ERROR", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar el contrato, deberá eliminar todos los documentos asociados a este registro.", "error");
													break;
														
									default		:	swal("ERROR", "El registro no se puede eliminar.", "error");

								}
				
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
		/*******************************/
		/*  FIN CLICK BOTON ELIMINAR   */
		/*******************************/
		
		
		
		
    });
}]);
