/* Setup general page controller */
/* Setup general page controller */
angular.module('MetronicApp').controller('ListarAprobacionesEvaluacionesController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
				var new_url = "database/MantenimientoEvaluacionesGet.php?" + $("#form_search").serialize() + "&action_type=list"

				grid.getDataTable().ajax.url(new_url).load();
								
		});
		
		
		$("#limpiar").click(function() { 
		
				$('#idvehiculos').val("all");
				$('#idvehiculos').selectpicker('refresh');
				
				$('#desde').val('').datepicker('update');
				$('#hasta').val('').datepicker('update');
				
				$('#idsedes').val("all");
				$('#idsedes').selectpicker('refresh');
			
				var new_url = "database/MantenimientoEvaluacionesGet.php?" + $("#form_search").serialize() + "&action_type=list";		
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
		
		/*******************************************/
		/*      	  CARGAR DATATABLE   		   */
		/*******************************************/
		
        var grid = new Datatable();

        grid.init({
            src: $("#datatable_evaluaciones"),
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
							columns: [0,1,2,3,4,5,6,7]
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
							columns: [0,1,2,3,4,5,6,7]
						} 
					},
					{ 
						extend: 'pdf', 
						orientation: 'landscape',
					  	className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6,7]
						}
					},
					{ 
						extend: 'excel',
						className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6,7]
						}
					},
					{ 
						extend: 'csv',
						className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6,7]
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
                //"sPlaceHolder": "head:after",
                "lengthMenu": [
                    [10, 20, 50, -1],
                    [10, 20, 50, "Todo"] 
                ],
                "processing": true,
                "pageLength": 20, 
                "ajax": {
                    url: "database/MantenimientoEvaluacionesGet.php?action_type=list", // ajax source
                    dataSrc: "data"/*,
					data: function ( d ) { console.log(d);  },
					error: function(result){ console.log(result); },
					success: function(result){ console.log(result); }*/
                },
				"order": [[ 4, "desc" ]],
				"columnDefs": [
					{
						"className": "dt-center", 
						"targets": [0]
					}
				],
                columns: [	
                        { data : "idmantenimiento_evaluaciones" },
						{
                          "mData": null,
                          "bSortable": false,
                          "mRender": function(data, type, full) {

                            return '<a href=#/private/registrar_aprobacion_evaluacion/' + data['idmantenimiento_evaluaciones'] + '/' + data['idmantenimiento_solicitudes'] + '>' + data['descripcion_evaluacion'] + '</a>';               
                          }
                        },
						{ data : "placa_vehiculo" },
						{ data : "nombre_sede" },
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
                        {
                          "mData": null,
                          "bSortable": false,
                          "mRender": function(data, type, full) {
							
							return '<a href=#/private/registrar_aprobacion_evaluacion/' + data['idmantenimiento_evaluaciones'] + '/' + data['idmantenimiento_solicitudes'] + ' class="btn btn-xs btn-warning"><i class="fa fa-thumbs-up"></i> Aprobar evaluaciones</a>';  
									             
                          }
                        }
                ]
                
            }
        });
		
		$('#datatable_ajax_tools > li > a.tool-action').on('click', function() {
			var action = $(this).attr('data-action');
			grid.getDataTable().button(action).trigger();
		});
		
		
		/*******************************************/
		/*      	  	FIN TEMPLATE   		 	   */
		/*******************************************/
		
		
		/*********************************/
		/*   CLICK BOTON GENERAR ORDEN   */
		/*********************************/
		$('#datatable_evaluaciones tbody').on( 'click', 'a.generar_orden', function () {
			
			var data = grid.getDataTable().row( $(this).parents('tr') ).data();
			$rootScope.$state.go('private.registrar_orden_trabajo', {"id" : "nuevo", "idevaluacion" : data['idmantenimiento_evaluaciones'] });
			
		});
		
		/*******************************/
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_evaluaciones tbody').on( 'click', 'a.mt-sweetalert', function () {
			
			var data = grid.getDataTable().row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
							
					swal({
					  title: "CONFIRMACION REQUERIDA",
					  text: "Una vez eliminado, no será posible recuperar la información.",
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
							$.ajax({
								dataType:'JSON',
								type: 'POST',
								url: 'database/MantenimientoEvaluacionesGet.php?action_type=delete&id='+data['idmantenimiento_evaluaciones'],
								success:function(data){
									
										switch(data.code){
									
											case "200"	:	swal("CONFIRMACION", "El registro ha sido eliminado.", "success");
															grid.getDataTable().row(rowToDelete).remove().draw( false );
															break;
																
											case "1451"	:	swal("ERROR", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar la marca contrato, deberá todos los registros asociados a este registro.", "error");
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
