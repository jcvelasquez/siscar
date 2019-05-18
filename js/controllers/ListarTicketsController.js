/* Setup general page controller */
angular.module('MetronicApp').controller('ListarTicketsController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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

    	// set default layout mode
    	$rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
		
		/*******************************************/
		/*      	  INICIO TEMPLATE   		   */
		/*******************************************/
		
		var monto_total_asignacion = 0;
		var totalTicketsSeleccionados = 0;
		var esFiltrado = false;
		var totalTicketsAsignados = 0;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg = "";
		var total_factura;
		var facturasSede = Array();
		var ticketsSeleccionados = Array();
		var esNuevaAsignacion;
		
			
		
		$(".mask-currency").inputmask('S/ 999,999.99', {
			numericInput : true,
			autoUnmask : true,
			removeMaskOnSubmit: true
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
				
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});	
		
		
		$("#filtrar").click(function() { 
			
				var formData = $("#form_search").serialize();
				var new_url = "database/TicketsGet.php?" + $("#form_search").serialize() + "&action_type=list"

				grid.getDataTable().ajax.url(new_url).load();
				
				esFiltrado = true;
				
		});
		
		
		$("#limpiar").click(function() { 
		
				$('#idchofer').val("all");
				$('#idchofer').selectpicker('refresh');
				
				$('#idtipo_combustible').val("all");
				$('#idtipo_combustible').selectpicker('refresh');
				
				$('#idvehiculos').val("all");
				$('#idvehiculos').selectpicker('refresh');
				
				$('#desde').val('').datepicker('update');
				$('#hasta').val('').datepicker('update');
				
				$('#sedes_idsedes').val("all");
				$('#sedes_idsedes').selectpicker('refresh');
			
				var new_url = "database/TicketsGet.php?" + $("#form_search").serialize() + "&action_type=list";		
				grid.getDataTable().ajax.url(new_url).load();
				
				esFiltrado = false;
			
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
		
		
		/***************************************/
		/*       	CARGAR CHOFERES    	   */
		/***************************************/
		$.ajax({
			dataType:'JSON',
			type: 'POST',
			url: 'database/ChoferesGet.php?action_type=list',
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
		
		
		/***************************************/
		/*       	CARGAR COMBUSTIBLES    	   */
		/***************************************/
		$.ajax({
			dataType:'JSON',
			type: 'POST',
			url: 'database/TipoCombustibleGet.php?action_type=list',
			success:function(response){
											
				//CARGA DE REGISTROS EN EL SELECT
				var len = response.data.length;
				
				$("#idtipo_combustible").empty();
				$("#idtipo_combustible").append('<option value="all" selected="selected">TODOS</option>');
				
				for( var i = 0; i<len; i++){
					var idtipo_combustible = response.data[i]['idtipo_combustible'];
					var tipo_combustible = response.data[i]['tipo_combustible'];
												
					$('#idtipo_combustible').append($('<option>', { value: idtipo_combustible, text: tipo_combustible })).selectpicker('refresh');
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
		/*      	DATATABLES Y FUNCIONES		   */
		/*******************************************/
        var grid = new Datatable();
			
        grid.init({
            src: $("#datatable_tickets"),
            onSuccess: function (table) {	
                
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
				"buttons": [
					{ 
						extend: 'print', 
					  	className: 'btn default',
            			autoPrint: true,
						orientation: 'landscape',
						stripHtml: true,
						exportOptions: {
							columns: [0,1,2,3,4,5,6,7,8,9,10,11]
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
							columns: [0,1,2,3,4,5,6,7,8,9,10,11]
						} 
					},
					{ 
						extend: 'pdf', 
						orientation: 'landscape',
					  	className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6,7,8,9,10,11]
						}
					},
					{ 
						extend: 'excel',
						className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6,7,8,9,10,11]
						}
					},
					{ 
						extend: 'csv',
						className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5,6,7,8,9,10,11]
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
                    [10, 20, 50, "Todo"] // change per page values here
                ],
                "processing": true,
                "pageLength": 20, // default record count per page
                "ajax": {
                    url: "database/TicketsGet.php?action_type=list", // ajax source
                    dataSrc: "data"/*,
					data: function ( d ) { console.log(d);  },
					error: function(result){ console.log(result); },
					success: function(result){ console.log(result); }*/
                },
				"order": [[ 10, "desc" ]],
				"columnDefs": [
					{  
						'orderable': true,
						targets: '_all'
					}, 
					{
						"className": "dt-center", 
						"targets": [0]
					}
				],
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
						 /*
						totalGalones = api
							.column( 6, { page: 'current'} )
							.data()
							.reduce( function (a, b) {
								return intVal(a) + intVal(b);
							}, 0 );
			 
						$( api.column( 6 ).footer() ).html( roundVal(totalGalones, 3) );
						*/
						//TOTAL GALONES
						totalSoles = api
							.column( 8, { page: 'current'} )
							.data()
							.reduce( function (a, b) {
								return intVal(a) + intVal(b);
							}, 0 );
			 
						$( api.column( 8 ).footer() ).html('S/'+ roundVal(totalSoles, 2) );					
						
				},
                columns: [	
						{
                          "mData": null,
                          "bSortable": false,
                          "mRender": function(data, type, full) {
								  
								 if(data['nro_factura'] == null) {
								 	return '<div><label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">' +
								 				'<input type="checkbox" class="checkboxes" value="' + data['idticket_combustible'] + '" /><span></span>' +
										'</label></div>';
								 } else {
								 	return data['idticket_combustible'];
								 }
          
                          }
                        },	
						{
							  "mData": null,
							  "bSortable": false,
							  "mRender": function(data, type, full) {
										return '<a href=#/private/registrar_ticket/' + data['idticket_combustible'] + '>' + data['nro_ticket'] + '</a>';
													
							  }
						},
						
						{
							  "mData": null,
							  "bSortable": false,
							  "mRender": function(data, type, full) {
								  
								    if(data['es_ticket'] == 1) 
										$label = '<span class="label label-sm label-success">TICKET</span>';
									else
										$label = '<span class="label label-sm label-info">VALE</span>';
	
									return $label;
								
													
							  }
						},
						{ data : "placa_vehiculo" },
						{ data : "nombre_chofer" },
						{ data : "nombre_sede" },
						{ data : "tipo_combustible" },
						{ data : "cantidad_combustible" /*, render: $.fn.dataTable.render.number(',', '.', 3, '') */},
						{ data : "importe_total_combustible" /*,  render: $.fn.dataTable.render.number(',', '.', 2, 'S/')*/ },
						{ data : "kilometraje", render: $.fn.dataTable.render.number(',', '', 0, '') },
						{ data : "fecha_ticket"},
						{ data : "hora_ticket", "bSortable": false },
						{
							  "mData": null,
							  "bSortable": false,
							  "mRender": function(data, type, full) {

								 if(data['nro_factura'] == null) 
										$label = '<span class="label label-sm label-danger">SIN ASIGNAR</span>';
									else
										$label = data['nro_factura'];
	
									return $label;
								 
										
							  },
                              className : 'dt-center'
						},
                        {
                          "mData": null,
                          "bSortable": false,
                          "mRender": function(data, type, full) {

                            return '<div class="btn-group">' +
                                        '<button class="btn btn-xs btn-warning dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> <i class="fa fa-gear"></i> Acciones <i class="fa fa-angle-down"></i></button>' +
                                         '<ul class="dropdown-menu pull-right" role="menu">' +
                                            '<li><a href=#/private/registrar_ticket/' + data['idticket_combustible'] + '><i class="fa fa-pencil"></i> Editar ticket</a></li>' +
											'<li><a href="javascript:;" data-id="' + data['idticket_combustible'] + '" class="mt-sweetalert delete"><i class="fa fa-times"></i> Eliminar ticket</a></li>' +
                                        '</ul>' +
                                    '</div>';               
                          }
                        }
						
                ]
                
            }
        });
		
		
		/*******************************************/
		/*      	DATATABLES Y FUNCIONES		   */
		/*******************************************/
		var tableWrapper = jQuery('#datatable_tickets_wrapper');

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
		});
		
		
		$('#datatable_ajax_tools > li > a.tool-action').on('click', function() {
			var action = $(this).attr('data-action');
			grid.getDataTable().button(action).trigger();
		});
		
		
		
		
		/*******************************/
		/*   GRID ITEMS SELECCIONADOS  */
		/*******************************/
		
		
		var gridSeleccionados = $('#datatable_tickets_seleccionados').DataTable({
			src: $("#datatable_tickets_seleccionados"),
			"paging":   false,
        	"ordering": false,
        	"info":     false,
			"sDom": 'T<"clear">lrtip',
			columns: [	
						{ data : "nro_ticket" },
						{ data : "placa_vehiculo" },
						{ data : "nombre_chofer" },
						{ data : "tipo_combustible" },
						{ data : "cantidad_combustible", render: $.fn.dataTable.render.number(',', '.', 3, '') },
						{ data : "importe_total_combustible", render: $.fn.dataTable.render.number(',', '.', 2, 'S/ ') },
						{ data : "kilometraje", render: $.fn.dataTable.render.number(',', '', 0, '') },
						{ data : "fecha_ticket" },
						{ data : "hora_ticket" }
            ],
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
					
					totalTicketsSeleccionados = total;
										
					monto_total_asignacion = totalTicketsSeleccionados + totalTicketsAsignados;
					
					monto_total_asignacion = roundVal(monto_total_asignacion, 2)
					
					$('#monto_asignacion').val(monto_total_asignacion);
					
					if(monto_total_asignacion == $('#importe_total_factura').val()){
						$('#estado_asignacion').removeClass('label-danger').removeClass('label-warning').addClass('label-success').html("CUADRADO");
					}else{
						$('#estado_asignacion').addClass('label-danger').html("NO CUADRADO");
					}	
					
					
					
			}
			
		})
		
		/*******************************/
		/*   GRID ITEMS ASIGNADOS      */
		/*******************************/
		
		var gridAsignados = $('#datatable_tickets_asignados').DataTable({
							src: $("#datatable_tickets_asignados"),
							"paging":   false,
							"ordering": false,
							"info":     false,
							"sDom": 'T<"clear">lrtip',
							columns: [	
								{ data : "nro_ticket" },
								{ data : "placa_vehiculo" },
								{ data : "nombre_chofer" },
								{ data : "tipo_combustible" },
								{ data : "cantidad_combustible", render: $.fn.dataTable.render.number(',', '.', 3, '') },
								{ data : "importe_total_combustible", render: $.fn.dataTable.render.number(',', '.', 2, 'S/ ') },
								{ data : "kilometraje", render: $.fn.dataTable.render.number(',', '', 0, '') },
								{ data : "fecha_ticket" },
								{ data : "hora_ticket" },
								{
								  "mData": null,
								  "bSortable": false,
								  "mRender": function(data, type, full) {
		
									return '<a href="javascript:;" data-id="' + data['idticket_combustible'] + '" class="btn btn-xs btn-danger delete-ticket-asignado"><i class="icon-docs"></i> Eliminar</a>';   			
														
								  }
								}
							],
							"language": {
								"aria": {
									"sortAscending": ": activate to sort column ascending",
									"sortDescending": ": activate to sort column descending"
								},
								"emptyTable": "No hay registros disponibles porque no selecciono una factura, o la factura seleccionada no cuenta con tickets asignados previamente.",
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
									
									//totalTicketsAsignados = roundVal(total, 3);
									totalTicketsAsignados = total;
									
									monto_total_asignacion = roundVal(totalTicketsSeleccionados + totalTicketsAsignados,2);
									
									var nota_credito = roundVal($('#importe_total_factura').val() - monto_total_asignacion, 3);
									$('#nota_credito').val(nota_credito);
									
									monto_total_asignacion = roundVal(monto_total_asignacion, 2)
									
									$('#monto_asignacion').val(monto_total_asignacion);
									
									//MOSTRAR ESTADO DE CUADRE
									if(monto_total_asignacion == $('#importe_total_factura').val()){
										$('#estado_asignacion').removeClass('label-danger').removeClass('label-warning').addClass('label-success').html("CUADRADO");
									}else{
										$('#estado_asignacion').addClass('label-danger').html("NO CUADRADO");
									}	
									
									
									
									
														
							}
						})
		
		
		
		
		/*******************************/
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_tickets_asignados tbody').on( 'click', 'a.delete-ticket-asignado', function () {
			
			var data = gridAsignados.row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
			
			var msg_toast;
			var type_toast;

			
					/*******************************/
					/*       BORRAR REGISTRO       */
					/*******************************/
					$.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/TicketsGet.php?action_type=delete_ticket_x_factura_detalle&id='+data['idticket_combustible'],
						success:function(data){
							
									switch(data.code){
									
										case "200"	:	msg_toast = "Se elimino el ticket asignado a la factura";
														type_toast = "success";
														gridAsignados.row(rowToDelete).remove().draw( false );
														break;
															
										case "1451"	:	msg_toast = "Error al eliminar";
														type_toast = "error";
														break;
															
										default		:	msg_toast = "Error al eliminar";
														type_toast = "error";

									}
									
							
									toastIndex = toastCount++;
									toastr.options = {"positionClass": "toast-top-right"}
									var $toast = toastr[type_toast](msg_toast); 
	
			
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
					/*******************************/
					/*    FIN BORRAR REGISTRO      */
					/*******************************/
			
		});
		
		/*******************************/
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_tickets tbody').on( 'click', 'a.mt-sweetalert', function () {
			
			var data = grid.getDataTable().row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
										
					swal({
					  title: "¡Esta seguro?",
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
								url: 'database/TicketsGet.php?action_type=delete&id='+data['idticket_combustible'],
								success:function(data){
									
									switch(data.code){
									
										case "200"	:	swal("CONFIRMACION", "El registro ha sido eliminado.", "success");
														grid.getDataTable().row(rowToDelete).remove().draw( false );
														break;
															
										case "1451"	:	swal("ERROR", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar el ticket, deberá eliminar todos los registros asociados.", "error");
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
		
		$('#modal_asignacion').click( function () {
			
			if(grid.getDataTable().rows( '.active' ).count() == 0 || esFiltrado == false){
				swal("ERROR DE ASIGNACION", "Debe filtrar los tickets por sede y seleccionar al menos un registro para asignar a una factura.", "error");		
				return false;
			}
			
			error_asignar.hide();
					
			//LIMPIA ARRAY
			ticketsSeleccionados = [];
			
			//SETEA NUEVA ASIGNACION
			esNuevaAsignacion = true;
			
			//LIMPIO EL GRID ASIGNADOS
			gridAsignados.clear().draw(); //LIMPIAR DATATABLE POR CADA VEZ QUE SE VA A AGREGAR
			
			//LIMPIO EL GRID SELECCIONADOS
			gridSeleccionados.clear().draw();
			
			//LIMPIO LAS ALERTAS DEL FORMULARIO
			$("#importe_total_factura").closest('.form-group').removeClass('has-error'); 
			$("#monto_asignacion").closest('.form-group').removeClass('has-error'); 
			
			//LIMPIA CAMPOS EN VENTANA
			$("#importe_total_factura").val("");
			$("#fecha_factura").val("");
			$("#descrip_factura").val("");
			$("#descripcion_cabecera").val("");
			$("#monto_asignacion").val("");
				
			/***************************************/
			/*       	CARGAR FACTURAS			   */
			/***************************************/
			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/FacturasGet.php?action_type=facturas_x_sede&id=' + $('#sedes_idsedes').val(),
				success:function(response){
												
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#facturas_idfacturas").empty();
					$("#facturas_idfacturas").append('<option value="">Seleccione</option>');
					
					for( var i = 0; i<len; i++){
						var idfacturas = response.data[i]['idfacturas'];
						var nro_factura = "# " + response.data[i]['nro_factura'];
						
						facturasSede[i] = response.data[i];
													
						$('#facturas_idfacturas').append($('<option>', { value: idfacturas, text: nro_factura })).selectpicker('refresh');
					}
					
					//COPIAR LOS REGISTROS SELECCIONADOS A LA NUEVA TABLA
					grid.getDataTable().rows('.active').every( function ( rowIdx, tableLoop, rowLoop ) {
						
						var data = this.data();
						
						gridSeleccionados.row.add(data).draw();
						
						ticketsSeleccionados.push(data);
						
					});
					//FIN COPIAR LOS REGISTROS SELECCIONADOS A LA NUEVA TABLA
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			

		} );
		
		
		//AL SELECCIONAR UNA FACTURA
		$('#facturas_idfacturas').on('change', function(){
			
			var IdFactura = $(this).val();	
			
			$('#importe_total_factura').val("");
			$('#fecha_factura').val("");
			$('#descrip_factura').val("");
			$('#descripcion_cabecera').val("");
			$('#idtickets_x_factura_cabecera').val("");
			
			
			
			if(IdFactura != ""){
				
				var new_url_tickets = "database/TicketsGet.php?action_type=tickets_x_factura&id=" + IdFactura;
				gridAsignados.ajax.url( new_url_tickets).load();	
							
				var len = facturasSede.length;
				
				for( var i = 0; i<len; i++){
						
					if(facturasSede[i]['idfacturas'] == IdFactura){
						
						$('#importe_total_factura').val(facturasSede[i]['importe_total_factura']);
						$('#fecha_factura').val(facturasSede[i]['fecha_factura']);
						$('#descrip_factura').val(facturasSede[i]['descrip_factura']);
						$('#descripcion_cabecera').val(facturasSede[i]['descripcion_cabecera']);
						
						//ACTUALIZO LA LLAVE
						$('#idtickets_x_factura_cabecera').val(facturasSede[i]['idtickets_x_factura_cabecera']);
						
						break;
													
					}
												
				}
				
			}
					

		});		
		
		
		
		/*******************************************/
		/*       INICIALIZACION DE VARIABLES       */
		/*******************************************/
		
		var form_asignar = $('#form_asignar');
		var error_asignar = $('.alert-danger.asignar', form_asignar);
					 
		$('#confirmar_asignacion').click( function () {

			//var form_asignar = $('#form_asignar');
			//var error_asignar = $('.alert-danger.asignar', form_asignar);
			total_factura = $('#importe_total_factura').val();
		
				//INICIO DE VALIDATE
				form_asignar.validate({

						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						rules: {
							facturas_idfacturas: {
								required: true
							},
							descripcion_cabecera: {
								required: true
							}
						},
						invalidHandler: function (event, validator) { 
							error_asignar.show();
							//App.scrollTo(error_asignar, -50);
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
															
								if(monto_total_asignacion > total_factura){
									error_asignar.html("El monto de asignacion no puede ser mayor al monto de la factura. Elimine primero unos tickes para poder asignar unos nuevos.").show();
									$('#importe_total_factura').closest('.form-group').addClass('has-error');
									$('#monto_asignacion').closest('.form-group').addClass('has-error');
									return false;
								}
									
								error_asignar.hide();
								
								/*****************************************************/
								/*            AGREGAR O ACTUALIZAR REGISTRO          */
								/*****************************************************/		
								
								var IdFactura = $('#facturas_idfacturas').val();	
								var IdticketsXfacturaCabecera = $('#idtickets_x_factura_cabecera').val();
																
								if (IdticketsXfacturaCabecera == "" || IdticketsXfacturaCabecera == null) {
									formcabecera = $("#form_asignar").serialize()+'&action_type=create_tickets_x_factura_cabecera';
								}else{
									formcabecera = $("#form_asignar").serialize()+'&action_type=update_tickets_x_factura_cabecera&id=' + IdticketsXfacturaCabecera;
								}
								
								
								//CREACION DE LA CABECERA DE LA AGRUPACION DE FACTURAS									
								$.ajax({
									dataType:'JSON',
									url: 'database/TicketsGet.php',
									type: 'POST',
									cache: false,
									data: formcabecera,
									success:function(response){
																														
										var msg_toast = "Se creo la asignacion con #ID " + response.idcabecera;
														
										toastIndex = toastCount++;
										toastr.options = {"positionClass": "toast-top-right"}
										var $toast = toastr["success"](msg_toast); 
														
										for (var i=0; i< ticketsSeleccionados.length; i++) {
													
												//CREACION DE DETALLES DE LA AGRUPACION DE FACTURAS							
												$.ajax({
													url: 'database/TicketsGet.php',
													data : {
														action_type : 'create_tickets_x_factura_detalle',
														idtickets_x_factura_cabecera : response.idcabecera,
														idticket_combustible : ticketsSeleccionados[i].idticket_combustible
													},
													type: 'POST',
													cache: false,
													success:function(iddetalle){
														
														var msg_toast = "Se registro el ticket con #ID " + iddetalle;
														
														toastIndex = toastCount++;
														toastr.options = {"positionClass": "toast-top-right"}
														var $toast = toastr["success"](msg_toast); 
																					
													},
													error: function(xhr) { 
														console.log(xhr.statusText + xhr.responseText);
													}
												});
												
										  }
										  
										  $('#asignar_factura').modal('hide');
										  grid.getDataTable().ajax.reload();
										  
										
										
									},
									error: function(xhr) { 
										console.log(xhr.statusText + xhr.responseText);
									}
								});
								
								
								/*****************************************************/
								/*        FIN DE AGREGAR O ACTUALIZAR REGISTRO       */
								/*****************************************************/	

						}

				});
				//FIN DE VALIDATE
				
				
			
			
		} );

	
		
		
    });
}]);
