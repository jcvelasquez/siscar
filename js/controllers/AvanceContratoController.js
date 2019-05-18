/* Setup general page controller */
angular.module('MetronicApp').controller('AvanceContratoController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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

		/*
		$('.date-picker').datepicker({
			autoclose: true
		});
		
		$('#fecha_orden_trabajo').datepicker({
			autoclose: true,
			endDate : new Date()
		});
		
		$('#fecha_orden_trabajo').datepicker('update', new Date());
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});
		
		$("#porcentaje_trabajo").ionRangeSlider({ 
			postfix : "%", 
			grid: true, 
			grid_num: 10, 
			from: 0,
			min: 0,
            max: 100,
			from_shadow: true
		});	*/
		
		// Saving it's instance to var
		//var porcentaje_trabajo = $("#porcentaje_trabajo").data("ionRangeSlider");	

		
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
		
		
		
		
		
		/*******************************************/
		/*       INICIALIZACION DE VARIABLES       */
		/*******************************************/
		
		/*
		 var gridItems = new Datatable();

        gridItems.init({
            src: $("#datatable_items_adjudicados"),
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
                "bStateSave": true, 
                "bAutoWidth": true,
				"sDom": 'T<"clear">lfrtip',
                "lengthMenu": [
                    [10, 20, 50, -1],
                    [10, 20, 50, "Todo"] // change per page values here
                ],
                "processing": true,
                "pageLength": 10, // default record count per page
                "ajax": {
                    url: "database/ContratosGet.php?action_type=list_items_contrato&id=" + idItem
                },
                
                columns: [	
					{ data : "tipo_combustible" },
					{ data : "cantidad"},
					{ data : "medida_combustible" },
					{ data : "precio_unitario" },
					{ data : "precio_total" },
					{ data : "ficha_tecnica" },
					{
					  "mData": null,
					  "bSortable": false,
					  "mRender": function(data, type, full) {

						return '<a href="javascript:;" data-id="' + data['id_item_adjudicados'] + '" class="mt-sweetalert delete btn btn-xs btn-danger"><i class="fa fa-times"></i> Eliminar tipo</a>';   			
											
					  }
					}
				]
                
            }
        });
		
		
		
		*/
		
		

		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/		
		
		function initEditContent(){
			
				if (idItem != '' && idItem != 'nuevo') {
						
					 $.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/ContratosGet.php?action_type=edit&id='+idItem,
						success:function(data){
							
							$('#nombre_contrato').val(data.nombre_contrato);
							$('#nombre_sede').val(data.nombre_sede);
							$('#plazo_desde').val(data.plazo_desde);
							$('#plazo_hasta').val(data.plazo_hasta);
							$('#fecha_contrato').val(data.fecha_contrato);
							$('#monto_contrato').val(data.monto_contrato);
							$('#nro_contrato').val(data.nro_contrato);
							$('#razon_social').val(data.razon_social);
							
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
					
				
				}else{
					
					//initTrabajosXevaluaciones("")
		
		
				}
				
				/***************************************/
				/*   FIN DE  CARGAR REGISTRO A EDITAR   */
				/***************************************/					
			
		}
		
		
		
		
	
	
    require.config({
        paths: {
            echarts: 'assets/global/plugins/echarts/'
        }
    });

    require(
        [
            'echarts',
            'echarts/chart/bar',
            'echarts/chart/chord',
            'echarts/chart/eventRiver',
            'echarts/chart/force',
            'echarts/chart/funnel',
            'echarts/chart/gauge',
            'echarts/chart/heatmap',
            'echarts/chart/k',
            'echarts/chart/line',
            'echarts/chart/map',
            'echarts/chart/pie',
            'echarts/chart/radar',
            'echarts/chart/scatter',
            'echarts/chart/tree',
            'echarts/chart/treemap',
            'echarts/chart/venn',
            'echarts/chart/wordCloud'
        ],
        function(ec) {
			
					var myChart = ec.init(document.getElementById('echarts_bar'));
					
					
					myChart.setOption({
						
								legend: {
									data : ['GASOHOL 95', 'GASOHOL 90']
								},
								xAxis: {
									type: 'category',
									data: ['GASOHOL 95', 'GASOHOL 90']
								},
								yAxis: [{
									type: 'value',
									splitArea: {
										show: true
									}
								}],
								toolbox: {
									show: true,
									feature: {
										mark: {
											show: true
										},
										dataView: {
											show: true,
											readOnly: false
										},
										magicType: {
											show: true,
											type: ['line', 'bar']
										},
										restore: {
											show: true
										},
										saveAsImage: {
											show: true
										}
									}
								},
								calculable: true
								
							});
					
					myChart.showLoading({text: 'Cargando gráfico.. por favor espere.'});
					
					 $.ajax({
						dataType:'JSON',
						type: 'GET',
						url: 'database/ContratosGet.php?action_type=avance_contrato&idContrato=1',
						success:function(response){
														
							myChart.hideLoading();
							
							console.log(response);

							myChart.setOption({
								
								xAxis: {
									type: 'category',
									data: response.periodo
								},
								
								series: [{
									type: 'bar',
									data: [2.6, 5.9]
								}, {
									type: 'bar',
									data: [2.6, 5.9]
								}]
								
							});
							
							
							
							var chartData = response;
							
							console.log(chartData);

							if(response === 'eventError')
							{
								//$(document).find('.loaderWrapper').find('.loader').html('<span class="alert alert-danger farsi">choose event</span>');
								return false;
							}//if eventError
			
							if(response === 'dbError')
							{
								//$(document).find('.loaderWrapper').find('.loader').html('<span class="alert alert-danger farsi">error</span>');
								return false;
							}//if eventError
			
							var channelsArray = [];
			
							for( var i=0; i < objSize(chartData.allChannels); i++ )
							{
								channelsArray.push(chartData.allChannels[i].channel);
							}
							
							
							
							console.log(channelsArray);

							
							myChart.setOption({
								legend: {
									data: channelsArray
								}
							});
							
							
							
							
							
						},
						error: function(xhr) { 
							console.log(xhr.responseText);
						}
					});
					
					
				
					
					
					/*
					myChart.setOption({
						title: {
							text: 'asynchronous data loading example'
						},
						tooltip: {},
						legend: {
							data:['Sales']
						},
						xAxis: {
							data: []
						},
						yAxis: {},
						series: [{
							name: 'Sales',
							type: 'bar',
							data: []
						}],
						legend: {
							data:['Sales']
						},
					});
					

					
					myChart.setOption({
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							data: ['Cost', 'Expenses']
						},
						toolbox: {
							show: true,
							feature: {
								mark: {
									show: true
								},
								dataView: {
									show: true,
									readOnly: false
								},
								magicType: {
									show: true,
									type: ['line', 'bar']
								},
								restore: {
									show: true
								},
								saveAsImage: {
									show: true
								}
							}
						},
						calculable: true,
						xAxis: [{
							type: 'category',
							data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
						}],
						yAxis: [{
							type: 'value',
							splitArea: {
								show: true
							}
						}],
						series: [{
							name: 'Cost',
							type: 'bar',
							data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
						}, {
							name: 'Expenses',
							type: 'bar',
							data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
						}]
					});
					
			
*/
            

				
			}
		);
		
		
	

		/*******************************************/
		/*      	    FIN TEMPLATE     		   */
		/*******************************************/
		
		initEditContent();
		//initItemsAdjudicadosContent();
		
		
    });
}]);
