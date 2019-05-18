/* Setup general page controller */
angular.module('MetronicApp').controller('ListarFacturasController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		
		
		$.fn.datepicker.dates['es'] = {
			days: ["Domingo", "Lunes", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			daysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
			daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
			today: "Today",
			clear: "Clear",
			format: "dd/mm/yyyy",
			weekStart: 0
		};

		$('.date-picker').datepicker({
			autoclose: true,
			todayBtn: true,
			todayHighlight: true,
			format: 'dd/mm/yyyy'
		});
		
		
		/***************************************/
		/*       	CARGAR O/C   	   		   */
		/***************************************/
		$.ajax({
			dataType:'JSON',
			type: 'POST',
			url: 'database/OcGet.php?action_type=list',
			success:function(response){
											
				//CARGA DE REGISTROS EN EL SELECT
				var len = response.data.length;
				
				$("#idordenes_compra").empty();
				$("#idordenes_compra").append('<option value="all" selected="selected">TODAS</option>');
				
				for( var i = 0; i<len; i++){
					var idordenes_compra = response.data[i]['idordenes_compra'];
					var nro_orden_compra = response.data[i]['nro_orden_compra'];
												
					$('#idordenes_compra').append($('<option>', { value: idordenes_compra, text: nro_orden_compra })).selectpicker('refresh');
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
		/*    	    FIN SELECT CARGA		   */
		/***************************************/
		
		/***************************************/
		/*       	CARGAR SELECT PROVEEDORES    	   */
		/***************************************/
		$.ajax({
			dataType:'JSON',
			type: 'POST',
			url: 'database/ProveedorGet.php?action_type=list',
			success:function(response){
											
				//CARGA DE REGISTROS EN EL SELECT
				var len = response.data.length;
				
				$("#idproveedores").empty();
				$("#idproveedores").append('<option value="all" selected="selected">TODAS</option>');
				
				for( var i = 0; i<len; i++){
					var idproveedores = response.data[i]['idproveedores'];
					var razon_social = response.data[i]['razon_social'];
												
					$('#idproveedores').append($('<option>', { value: idproveedores, text: razon_social })).selectpicker('refresh');
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
		/*      	  INICIO TEMPLATE   		   */
		/*******************************************/
		
		$("#filtrar").click(function() { 
			
				var new_url = "database/FacturasGet.php?" + $("#form_search").serialize() + "&action_type=list"
				grid.getDataTable().ajax.url(new_url).load();
				
		});
		
		$("#limpiar").click(function() { 
			
				$('#idordenes_compra').val("all");
				$('#idordenes_compra').selectpicker('refresh');
				
				$('#sedes_idsedes').val("all");
				$('#sedes_idsedes').selectpicker('refresh');
				
				$('#idproveedores').val("all");
				$('#idproveedores').selectpicker('refresh');
				
				$('#desde').val('').datepicker('update');
				$('#hasta').val('').datepicker('update');
			
				var new_url = "database/FacturasGet.php?" + $("#form_search").serialize() + "&action_type=list";
				
				grid.getDataTable().ajax.url(new_url).load();
				
		});
		
        var grid = new Datatable();

        grid.init({
            src: $("#datatable_facturas"),
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
					"decimal": ".",
        			"thousands": ",",
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
				"buttons": [
					{ 
						extend: 'print', 
					  	//message: 'This print was produced using the Print button for DataTables',
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
				"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                //"sPlaceHolder": "head:after",
                "lengthMenu": [
                    [10, 20, 50, -1],
                    [10, 20, 50, "Todo"] // change per page values here
                ],
                "processing": true,
                "pageLength": 20, // default record count per page
                "ajax": {
                    url: "database/FacturasGet.php?action_type=list", // ajax source
                    dataSrc: "data"/*,
					data: function ( d ) { console.log(d);  },
					error: function(result){ console.log(result); },
					success: function(result){ console.log(result); }*/
                },
				"order": [[ 4, "desc" ]],
				"columnDefs": [
					{  
						'orderable': true,
						targets: '_all'
					}
				],
                columns: [		
						{
							  "mData": null,
							  "bSortable": false,
							  "mRender": function(data, type, full) {
										return '<a href=#/private/registrar_factura/' + data['idfacturas'] + '>' + data['nro_factura'] + '</a>';
							  }
						},
                        { data : "descrip_factura" },
						{ data : "nombre_sede" },
						{ data : "razon_social" },
						{ data : "nro_orden_compra" },
						{ data : "fecha_factura"},
						/*{ data : "cantidad_factura", render: $.fn.dataTable.render.number(',', '.', 3, '') },
						{ data : "precio_unit_factura", render: $.fn.dataTable.render.number(',', '.', 2, 'S/') },
						{ data : "importe_total_factura", render: $.fn.dataTable.render.number(',', '.', 2, 'S/') },*/
                        {
                          "mData": null,
                          "bSortable": false,
                          "mRender": function(data, type, full) {

                            return '<div class="btn-group">' +
                                        '<button class="btn btn-xs btn-warning dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-gear"></i> Acciones <i class="fa fa-angle-down"></i></button>' +
                                         '<ul class="dropdown-menu pull-right" role="menu">' +
                                            '<li><a href=#/private/registrar_factura/' + data['idfacturas'] + '><i class="fa fa-pencil"></i> Editar ticket</a></li>' +
                                            '<li><a href="javascript:;" data-id="' + data['idfacturas'] + '" class="mt-sweetalert delete"><i class="fa fa-times"></i> Eliminar factura</a></li>' +
											'<li class="divider"></li>' +
											'<li><a data-target="#tickets_asociados" class="tickets_asociados" data-toggle="modal" data-id="' + data['idfacturas'] + '"> <i class="fa fa-external-link"></i> Tickets asociados</a></li>' +
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
		$('#datatable_facturas tbody').on( 'click', 'a.mt-sweetalert', function () {
			
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
								url: 'database/FacturasGet.php?action_type=delete&id='+data['idfacturas'],
								success:function(data){
									
									switch(data.code){
									
										case "200"	:	swal("CONFIRMACION", "El registro ha sido eliminado.", "success");
														grid.getDataTable().row(rowToDelete).remove().draw( false );
														break;
															
										case "1451"	:	swal("ERROR", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar la factura, deberá eliminar todos los documentos asociados a este registro.", "error");
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
		
		
		/*******************************************/
		/*      	 	 ABRIR MODAL     		   */
		/*******************************************/
		var gridSeleccionados;
		
		$('#datatable_facturas tbody').on( 'click', 'a.tickets_asociados', function () {
			
			if(gridSeleccionados) gridSeleccionados.destroy();
			
			var idFactura = $(this).data("id");
			var montoFactura;
			
			//CARGAR CABECERA						
			 $.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/FacturasGet.php?action_type=edit&id='+idFactura,
				success:function(data){
	
					//INICIO DE PERSONALIZACION DE CAMPOS
					$("#nro_factura").val(data.nro_factura);
					$("#descripcion_factura").val(data.descrip_factura);
					$("#importe_total_factura").val(data.importe_total_factura);
					$("#fecha_factura").val(data.fecha_factura);
					
					montoFactura = data.importe_total_factura;
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
			
			gridSeleccionados = $('#datatable_tickets').DataTable({
										src: $("#datatable_tickets"),
										"paging":   false,
										"ordering": false,
										"info":     false,
										"sDom": 'T<"clear">lrtip',
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
										"ajax": {
											url: "database/TicketsGet.php?action_type=tickets_x_factura&id=" + idFactura // ajax source
											//dataSrc: "data"
										},
										columns: [	
													{ data : "nro_ticket" },
													{ data : "placa_vehiculo" },
													{ data : "nombre_chofer" },
													{ data : "tipo_combustible" },
													{ data : "cantidad_combustible", render: $.fn.dataTable.render.number(',', '.', 3, '') },
													{ data : "importe_total_combustible"/*, render: $.fn.dataTable.render.number(',', '.', 2, 'S/ ') */},
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
													'S/ ' + roundVal(total, 3) 
												);
												
												
												
												//MOSTRAR ESTADO DE CUADRE
												if(total < 1){
													$('#estado_factura').addClass('label-warning').html("NO DISPONIBLE");
												}else{
													if(montoFactura == roundVal(total, 3)){
														$('#estado_factura').removeClass('label-warning').removeClass('label-danger').addClass('label-success').html("CUADRADO");
													}else{
														$('#estado_factura').removeClass('label-warning').addClass('label-danger').html("NO CUADRADO");
													}	
												}
												
												
												
										}
									})
				
			
		});

		
		/*******************************************/
		/*      	  	FIN TEMPLATE   		 	   */
		/*******************************************/
		
    });
}]);
