/* Setup general page controller */
angular.module('MetronicApp').controller('ListarServiciosController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
				var new_url = "database/ServiciosSolicitudGet.php?" + $("#form_search").serialize() + "&action_type=list"

				grid.getDataTable().ajax.url(new_url).load();
				
				esFiltrado = true;
				
		});
		
		
		$("#limpiar").click(function() { 
		
				$('#idchofer').val("all");
				$('#idchofer').selectpicker('refresh');
				
				$('#idvehiculos').val("all");
				$('#idvehiculos').selectpicker('refresh');
				
				$('#desde').val('').datepicker('update');
				$('#hasta').val('').datepicker('update');
				
				$('#idsedes').val("all");
				$('#idsedes').selectpicker('refresh');
			
				var new_url = "database/ServiciosSolicitudGet.php?" + $("#form_search").serialize() + "&action_type=list";		
				grid.getDataTable().ajax.url(new_url).load();
				
				esFiltrado = false;
			
		});
		
		
		
		/***************************************/
		/*       	CARGAR VEHICULO    	   */
		/***************************************/
		$.ajax({
			dataType:'JSON',
			type: 'POST',
			url: 'database/VehiculosGet.php?action_type=list&estado=1',
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
		/*       	CARGAR CHOFERES    	   */
		/***************************************/
		$.ajax({
			dataType:'JSON',
			type: 'POST',
			url: 'database/ChoferesGet.php?action_type=list&estado=1',
			success:function(response){
											
				//CARGA DE REGISTROS EN EL SELECT
				var len = response.data.length;
				
				$("#idchofer").empty();
				$("#idchofer").append('<option value="all" selected="selected">TODOS</option>');
				
				for( var i = 0; i<len; i++){
					var idchofer = response.data[i]['idchofer'];
					var nombre_chofer = response.data[i]['nombres_chofer'] + ', ' + response.data[i]['apellidos_chofer'];
												
					$('#idchofer').append($('<option>', { value: idchofer, text: nombre_chofer })).selectpicker('refresh');
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
            src: $("#datatable_servicios"),
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
                "bAutoWidth": true,
                "buttons": [
					{ 
						extend: 'print', 
						message: 'LEYENDA COLUMNAS: (A*) Asignado | (E*) Espera | (V*) Vale | (C*) Cancelado | (F*) Finalizado',
					  	className: 'btn default',
            			autoPrint: true,
						orientation: 'landscape',
						stripHtml: true,
						exportOptions: {
							columns: [0,1,2,3,4,5,6,7,8,9,10,11,12,13]
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
							columns: [0,1,2,3,4,5,6,7,8,9,10,11,12,13]
						} 
					},
					{ 
						extend: 'pdf', 
						orientation: 'landscape',
					  	className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6,7,8,9,10,11,12,13]
						}
					},
					{ 
						extend: 'excel',
						className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6,7,8,9,10,11,12,13]
						}
					},
					{ 
						extend: 'csv',
						className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6,7,8,9,10,11,12,13]
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
				//"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                //"sPlaceHolder": "head:after",
                "lengthMenu": [
                    [10, 20, 50, -1],
                    [10, 20, 50, "Todo"] // change per page values here
                ],
                "processing": true,
				//"serverSide": true,
                "pageLength": 20, // default record count per page
                "ajax": {
                    url: "database/ServiciosSolicitudGet.php?action_type=list", // ajax source
                    dataSrc: "data",
					type: "POST"/*,
					data: function ( result ) { console.log(result); },
					error: function(result){ console.log(result); },
					success: function(result){ console.log(result); }*/
                },
				"columnDefs": [
					{  
						"orderable": true,
						targets: "_all"
					}
				],
				"order": [[ 6, "desc" ]],
                columns: [
												
                        { data : "idservicio_solicitud" },
						{
                            "mData": null,
                            "bSortable": false,
                            "mRender": function(data, type, full) {
                                return data['nombres'] + ' ' + data['apellidos'];
                            }
                        },
						{
                            "mData": "motivo_comision",
                            "mRender": function(data, type, row) {
								
                                  return '<a href=#/private/detalle_servicio/' + row.idservicio_solicitud + '><i class="fa fa-search"></i> ' + row.motivo_comision + '</a>';
								  
                            }
                        },
                        { data : "lugar_destino" },
						{ data : "fecha_inicio" },
						{ data : "fecha_fin" },
						{ data : "fecha_creacion" },
						{
                            "mData": null,
                            "mRender": function(data, type, full) {
								
								if(data['es_vale'] == 1) 
                                    $label = '<span class="label label-sm" style="background:#E08283; font-weight:bold;">VALE</span>';
								else
									$label = '<span class="label label-sm" style="background:' + data['color_calendario'] + '; font-weight:bold;">' + data['placa_vehiculo'] + '</span>';	
									
                                  return $label;
								  
                            }
                        },
						{ data : "nombre_chofer" },
						{
                            "mData": null,
                            "bSortable": false,
                            "mRender": function(data, type, full) {

                                if(data['es_asignado'] == 1) 
                                    $label = '<span class="label label-sm label-success">SI</span>';
                                else
                                    $label = '<span class="label label-sm label-danger">NO</span>';

                                return $label;
                            }
                            
                        },
						{
                            "mData": null,
                            "bSortable": false,
                            "mRender": function(data, type, full) {

                                if(data['es_espera'] == 1) 
                                    $label = '<span class="label label-sm label-success">SI</span>';
                                else
                                    $label = '<span class="label label-sm label-danger">NO</span>';

                                return $label;
                            }
                            
                        },
						{
                            "mData": null,
                            "bSortable": false,
                            "mRender": function(data, type, full) {

                                if(data['es_vale'] == 1) 
                                    $label = '<span class="label label-sm label-success">SI</span>';
                                else
                                    $label = '<span class="label label-sm label-danger">NO</span>';

                                return $label;
                            }
                            
                        },
						{
                            "mData": null,
                            "bSortable": false,
                            "mRender": function(data, type, full) {

                                if(data['es_cancelado'] == 1) 
                                    $label = '<span class="label label-sm label-success">SI</span>';
                                else
                                    $label = '<span class="label label-sm label-danger">NO</span>';

                                return $label;
                            }
                            
                        },	
						{
                            "mData": null,
                            "bSortable": false,
                            "mRender": function(data, type, full) {

                                if(data['es_finalizado'] == 1) 
                                    $label = '<span class="label label-sm label-success">SI</span>';
                                else
                                    $label = '<span class="label label-sm label-danger">NO</span>';

                                return $label;
                            }
                            
                        },	
						{
                            "mData": null,
                            "bSortable": false,
                            "mRender": function(data, type, full) {

                                if(data['calificacion'] == 1) 
                                    $label = '<i class="fa fa-star"></i>';
                                else if(data['calificacion'] == 2) 
                                    $label = '<i class="fa fa-star"></i><i class="fa fa-star"></i>';
								else if(data['calificacion'] == 3) 
                                    $label = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
								else if(data['calificacion'] == 4) 
                                    $label = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
								else if(data['calificacion'] == 5) 
                                    $label = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
								else
									$label = '';
												
                                return $label;
                            }
                            
                        },	
                        {
                          "mData": null,
                          "bSortable": false,
                          "mRender": function(data, type, full) {

								if($rootScope.settings.sesion.codrol == 'ADM'){
								
								   $buttons = '<div class="btn-group">' +
												'<button class="btn btn-xs btn-warning dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Acciones <i class="fa fa-angle-down"></i></button>' +
												 '<ul class="dropdown-menu pull-right" role="menu">';
												 
												 $buttons += '<li><a href=#/private/detalle_servicio/' + data['idservicio_solicitud'] + '><i class="fa fa-search"></i> Ver detalle</a></li>';
												 
												 
												 if(data['es_cancelado'] == 0 && data['es_finalizado'] == 0 && data['es_asignado'] == 1) 
													
													$buttons += '<li><a href=#/private/cancelar_servicio/' + data['idservicio_solicitud'] + '><i class="fa fa-calendar-times-o"></i> Cancelar servicio</a></li><li><a href="javascript:;" data-id="' + data['idservicio_solicitud'] + '" class="borrar_solicitud"><i class="fa fa-times"></i> Eliminar solicitud</a></li>';	
												 
												 else
												 
													$buttons += '';
													
												 if(data['es_asignado'] == 1 && data['es_finalizado'] == 0) 
													
													$buttons += '<li><a href=#/private/finalizar_servicio_chofer/' + data['idservicio_solicitud'] + '><i class="fa fa-calendar-check-o"></i> Finalizar servicio - chofer</a></li>';
												 else
													$buttons += '';
													
		
												if(data['es_finalizado'] == 1) 
													
													$buttons += '<li><a href=#/private/calificar_servicio_usuario/' + data['idservicio_solicitud'] + '><i class="fa fa-calendar-check-o"></i> Calificar servicio - usuario</a></li>';
												 else
													$buttons += '';
												
												'</ul>' +
											'</div>'; 											
											
							  	}else if($rootScope.settings.sesion.codrol == 'CHO'){
								  
									  if(data['usuario_chofer'] == $rootScope.settings.sesion.usuario && data['es_finalizado'] == 0) {
										  
									  		$buttons = '<a class="btn btn-sm btn-warning" href=#/private/finalizar_servicio_chofer/' + data['idservicio_solicitud'] + '><i class="fa fa-calendar-check-o"></i> Finalizar servicio</a>';
									  
									  }else{
										 	$buttons = '<a class="btn btn-sm btn-info" href=#/private/detalle_servicio/' + data['idservicio_solicitud'] + '><i class="fa fa-search"></i> Ver detalle</a>'; 
									  }
								  
							  	}else if($rootScope.settings.sesion.codrol == 'USU'){
								  
									  if(data['es_finalizado'] == 1 && data['existe_calificacion'] == 0 && data['usuarios_idusuarios'] == $rootScope.settings.sesion.idusuario) {

									  		$buttons = '<a class="btn btn-sm btn-warning" href=#/private/calificar_servicio_usuario/' + data['idservicio_solicitud'] + '><i class="fa fa-calendar-check-o"></i> Calificar servicio</a>';
									  
									  }else{
										 	$buttons = '<a class="btn btn-sm btn-info" href=#/private/detalle_servicio/' + data['idservicio_solicitud'] + '><i class="fa fa-search"></i> Ver detalle</a>'; 
									  }
								  
							  	}
							  
							  return $buttons;
						  		
									             
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
		
		
		/*******************************/
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_servicios tbody').on( 'click', 'a.borrar_solicitud', function () {
			
			var data = grid.getDataTable().row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
						
			if(data['es_finalizado'] == 0){
							
					var confirm_delete = swal({
					  title: "CONFIRMACION REQUERIDA",
					  text: "Una vez eliminada, no será posible recuperar la información!",
					  type: "warning",
					  showCancelButton: true,
					  confirmButtonClass: "btn-danger",
					  confirmButtonText: "Si, eliminar",
					  cancelButtonText: "Cancelar",
					  closeOnConfirm: false,
					},
					function(){
					
							
							/*******************************/
							/*       BORRAR REGISTRO       */
							/*******************************/
							$.ajax({
								dataType:'JSON',
								type: 'POST',
								url: 'database/ServiciosSolicitudGet.php?action_type=delete&id='+data['idservicio_solicitud'],
								success:function(data){
																
									switch(data.code){
									
										case "200"	:	swal("CONFIRMACION", "La solicitud ha sido eliminada.", "success");
														grid.getDataTable().row(rowToDelete).remove().draw( false );
														break;
															
										case "1451"	:	swal("ERROR", "La solicitud no se puede eliminar ya que está asociado a otro registro. Para poder eliminar la sede, deberá eliminar estos.", "error");
														break;
															
										default		:	swal("ERROR", "La solicitud no se puede eliminar.", "error");

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
					
			}else{
				swal("ERROR", "Esta solicitud no se puede eliminar ya que fue ejecutado. Solo los servicios que no estan finalizados pueden eliminarse.", "error");	
			}
				
		} );
		/*******************************/
		/*  FIN CLICK BOTON ELIMINAR   */
		/*******************************/
		
		
		
    });
}]);
