/* Setup general page controller */
/* Setup general page controller */
angular.module('MetronicApp').controller('ListarSolicitudesMantenimientosController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
				
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});	
		
		$("#filtrar").click(function() { 
			
				var formData = $("#form_search").serialize();
				var new_url = "database/MantenimientoSolicitudesGet.php?" + $("#form_search").serialize() + "&action_type=list"

				grid.getDataTable().ajax.url(new_url).load();
								
		});
		
		
		$("#limpiar").click(function() { 
		
				$('#idvehiculos').val("all");
				$('#idvehiculos').selectpicker('refresh');
				
				$('#desde').val('').datepicker('update');
				$('#hasta').val('').datepicker('update');
				
				$('#sedes_idsedes').val("all");
				$('#sedes_idsedes').selectpicker('refresh');
			
				var new_url = "database/MantenimientoSolicitudesGet.php?" + $("#form_search").serialize() + "&action_type=list";		
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
				
				$("#sedes_idsedes").empty();
				$("#sedes_idsedes").append('<option value="all" selected="selected">TODAS</option>');
				
				for( var i = 0; i<len; i++){
					var idsedes = response.data[i]['idsedes'];
					var nombre_sede = response.data[i]['nombre_sede'];
												
					$('#sedes_idsedes').append($('<option>', { value: idsedes, text: nombre_sede })).selectpicker('refresh');
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
            src: $("#datatable_solicitudes_mantenimiento"),
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
               // "bStateSave": true, 
                "bAutoWidth": true,
                "buttons": [
					{ 
						extend: 'print', 
					  	className: 'btn default',
            			autoPrint: true,
						orientation: 'landscape',
						stripHtml: true,
						exportOptions: {
							columns: [0,1,2,3,4]
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
							columns: [0,1,2,3,4]
						} 
					},
					{ 
						extend: 'pdf', 
						orientation: 'landscape',
					  	className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4]
						}
					},
					{ 
						extend: 'excel',
						className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4]
						}
					},
					{ 
						extend: 'csv',
						className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4]
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
                    [10, 20, 50, "Todo"] // change per page values here
                ],
                "processing": true,
                "pageLength": 20, // default record count per page
                "ajax": {
                    url: "database/MantenimientoSolicitudesGet.php?action_type=list", // ajax source
                    dataSrc: "data"/*,
					data: function ( d ) { console.log(d);  },
					error: function(result){ console.log(result); },
					success: function(result){ console.log(result); }*/
                },
				"order": [[ 6, "desc" ]],
				"columnDefs": [
					{
						"className": "dt-center", 
						"targets": [0]
					}
				],
                columns: [	
                        { data : "idmantenimiento_solicitudes" },
						{
                          "mData": null,
                          "bSortable": false,
                          "mRender": function(data, type, full) {

                            return '<a href=#/private/registrar_solicitud_mantenimiento/' + data['idmantenimiento_solicitudes'] + '>' + data['descripcion_solicitud'] + '</a>';               
                          }
                        },
						{ data : "placa_vehiculo" },
						{ data : "marca_vehiculo" },
						{ data : "modelo_vehiculo" },
						{ data : "nombre_sede" },
						{ data : "fecha_solicitud" },
                        {
                          "mData": null,
                          "bSortable": false,
                          "mRender": function(data, type, full) {

                            return '<div class="btn-group">' +
                                        '<button class="btn btn-xs btn-warning dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-gear"></i> Acciones <i class="fa fa-angle-down"></i></button>' +
                                         '<ul class="dropdown-menu pull-right" role="menu">' +
                                            '<li><a href=#/private/registrar_solicitud_mantenimiento/' + data['idmantenimiento_solicitudes'] + '><i class="fa fa-pencil"></i> Editar solicitud</a></li>' +
                                            '<li><a href="javascript:;" data-id="' + data['idmantenimiento_solicitudes'] + '" class="mt-sweetalert delete"><i class="fa fa-times"></i> Eliminar solicitud</a></li>' +
											'<li class="divider"></li>' +
											'<li><a href="javascript:;" class="generar_evaluacion"><i class="fa fa-bar-chart"></i> Generar evaluacion</a></li>' +
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
		
		/*******************************************/
		/*      	  	FIN TEMPLATE   		 	   */
		/*******************************************/
		
		
		/*********************************/
		/*   CLICK BOTON GENERAR ORDEN   */
		/*********************************/
		$('#datatable_solicitudes_mantenimiento tbody').on( 'click', 'a.generar_evaluacion', function () {
			
			var data = grid.getDataTable().row( $(this).parents('tr') ).data();
			$rootScope.$state.go('private.registrar_evaluacion_mantenimiento', {"id" : "nuevo", "idsolicitud" : data['idmantenimiento_solicitudes'] });
			
		});
		
		
		/*******************************/
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_solicitudes_mantenimiento tbody').on( 'click', 'a.mt-sweetalert', function () {
			
			var data = grid.getDataTable().row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
							
					swal({
					  title: "¡Esta seguro?",
					  text: "Una vez eliminado, no será posible recuperar la información.",
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
								url: 'database/MantenimientoSolicitudesGet.php?action_type=delete&id='+data['idmantenimiento_solicitudes'],
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
