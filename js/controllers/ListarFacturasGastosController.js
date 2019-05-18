/* Setup general page controller */
angular.module('MetronicApp').controller('ListarFacturasGastosController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		var facturasSelect = Array();
		var ticketsSelected = Array();
		var esNuevaAsignacion;
		
		
		
		$(".mask-currency").inputmask('S/ 999,999.99', {
			numericInput : true,
			autoUnmask : true,
			removeMaskOnSubmit: true
		});
		
		$('.date-picker').datepicker({
			autoclose: true
		});
		
		//$('#desde').datepicker('update', new Date());
		//$('#hasta').datepicker('update', new Date());
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});	
		
		
		$("#filtrar").click(function() { 
			
				var formData = $("#form_search").serialize();
				var new_url = "database/TicketsGet.php?" + $("#form_search").serialize() + "&action_type=search"

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
			
				var new_url = "database/TicketsGet.php?" + $("#form_search").serialize() + "&action_type=search";		
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
                "bStateSave": true, 
				"buttons": [
				{ 
						extend: 'print', 
						//message: 'This print was produced using the Print button for DataTables',
						className: 'btn default',
						autoPrint: true,
						orientation: 'landscape',
						stripHtml: true,
						exportOptions: {
							columns: [1,2,3,4,5,6,7,8,9,10]
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
							columns: [1,2,3,4,5,6,7,8,9,10]
						} 
					},
					{ 
						extend: 'pdf', 
						orientation: 'landscape',
						className: 'btn default',
						orientation: 'landscape',
						exportOptions: {
							columns: [1,2,3,4,5,6,7,8,9,10]
						}
					},
					{ 
						extend: 'excel',
						className: 'btn default',
						exportOptions: {
							columns: [1,2,3,4,5,6,7,8,9,10]
						}
					},
					{ 
						extend: 'csv',
						className: 'btn default',
						exportOptions: {
							columns: [1,2,3,4,5,6,7,8,9,10]
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
                "pageLength": 10, // default record count per page
                "ajax": {
                    url: "database/FacturasGastosGet.php?action_type=list", // ajax source
                    dataSrc: "data"
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
						"className": "dt-center", 
						"targets": [0]
					}
				],
                "footerCallback": function ( row, data, start, end, display ) {
					
						var api = this.api(), data;
			 
						// Remove the formatting to get integer data for summation
						var intVal = function ( i ) {
							return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
								typeof i === 'number' ?
									i : 0;
						};
			 
									 
			 
						//TOTAL GALONES
						totalGalones = api
							.column( 6, { page: 'current'} )
							.data()
							.reduce( function (a, b) {
								return intVal(a) + intVal(b);
							}, 0 );
			 
						$( api.column( 6 ).footer() ).html( totalGalones );
						
						//TOTAL GALONES
						totalSoles = api
							.column( 7, { page: 'current'} )
							.data()
							.reduce( function (a, b) {
								return intVal(a) + intVal(b);
							}, 0 );
			 
						$( api.column( 7 ).footer() ).html('S/'+totalSoles );
						
						//TOTAL GALONES
						totalKilometros = api
							.column( 8, { page: 'current'} )
							.data()
							.reduce( function (a, b) {
								return intVal(a) + intVal(b);
							}, 0 );
			 
						$( api.column( 8 ).footer() ).html( totalKilometros );
						
						
						
				},
                columns: [
							{
							  "mData": null,
							  "bSortable": false,
							  "mRender": function(data, type, full) {
									 return data['idfacturas_combustible'];
							  }
							},	
							{
								  "mData": null,
								  "bSortable": false,
								  "mRender": function(data, type, full) {
											return '<a href=#/private/registrar_factura_gasto/' + data['idfacturas_combustible'] + '>' + data['nro_factura'] + '</a>';
														
								  }
							},
							{ data : "placa_vehiculo" },
							{ data : "nombre_chofer" },
							{ data : "nombre_chofer" },
							{ data : "tipo_combustible" },
							{ data : "cantidad_combustible", render: $.fn.dataTable.render.number(',', '.', 3, '') },
							{ data : "importe_total_combustible",  render: $.fn.dataTable.render.number(',', '.', 2, 'S/') },
							{ data : "kilometraje_factura", render: $.fn.dataTable.render.number(',', '', 0, '') },
							{ data : "fecha_factura"},
							{ data : "fecha_factura" },
							{
							  "mData": null,
							  "bSortable": false,
							  "mRender": function(data, type, full) {
	
								return '<div class="btn-group">' +
											'<button class="btn btn-xs btn-warning dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Acciones <i class="fa fa-angle-down"></i></button>' +
											 '<ul class="dropdown-menu pull-right" role="menu">' +
												'<li><a href=#/private/registrar_factura_gasto/' + data['idfacturas_combustible'] + '><i class="fa fa-pencil"></i> Editar ticket</a></li>' +
												'<li><a href="javascript:;" data-id="' + data['idfacturas_combustible'] + '" class="mt-sweetalert delete"><i class="fa fa-times"></i> Eliminar ticket</a></li>' +
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
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_tickets tbody').on( 'click', 'a.delete', function () {
			
			var data = grid.getDataTable().row( $(this).parents('tr') ).data();
			
			var rowToDelete = $(this).parents('tr');
			
			console.log(data);
										
					swal({
					  title: "CONFIRMACION REQUERIDA",
					  text: "Una vez eliminada, no será posible recuperar la información!",
					  type: "warning",
					  showCancelButton: true,
					  confirmButtonClass: "btn-danger",
					  confirmButtonText: "Eliminar",
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
								url: 'database/FacturasGastosGet.php?action_type=delete&id='+data['idfacturas_combustible'],
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
		
		
    });
}]);
