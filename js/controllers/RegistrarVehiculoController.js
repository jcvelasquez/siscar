/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarVehiculoController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		var path = $rootScope.settings.uploadPathVehiculos;
		var formdata = "";
		var msg;
		var shortCutFunction;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg ="";
		
		var d = new Date();
		var year = d.getFullYear();

		$("#ano_fabricacion").TouchSpin({min: 1960, max: year, step: 1 });
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});	
		
		$('#vencimiento_soat').datepicker({
			autoclose: true,
			startDate: new Date(),
			format: 'dd/mm/yyyy'
		});
		
		$("#color_calendario").minicolors();
		
		//AL SELECCIONAR UN CONTRATO
		$('#idmarcas_vehiculos').on('change', function(){
			
			var idMarca = $(this).val();	
			initModelos("", idMarca);			
			
		});	
		
		
		
		
		
		/***************************************/
		/*     CARGAR  SELECT SERVICIOS        */
		/***************************************/
		function initModelos(SelectedIndex, idMarca){
								
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ModelosVehiculosGet.php?action_type=modelos_x_marca&id=' + idMarca + '&estado=1',
					success:function(response){
												
						var len = response.data.length;
						
						$("#idmodelos_vehiculos").empty();
						$("#idmodelos_vehiculos").append('<option value="">Seleccione un modelo</option>');
						
						for( var i = 0; i<len; i++){
							var idmodelos_vehiculos = response.data[i]['idmodelos_vehiculos'];
							var modelo_vehiculo = response.data[i]['modelo_vehiculo'];
														
							$('#idmodelos_vehiculos').append($('<option>', { value: idmodelos_vehiculos, text: modelo_vehiculo })).selectpicker('refresh');
						}
						
						//ACTIVO EL SELECT
						$('#idmodelos_vehiculos').prop('disabled', false);
	  					$('#idmodelos_vehiculos').selectpicker('refresh');
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idmodelos_vehiculos option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmodelos_vehiculos').selectpicker('refresh');
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
		/*      CARGAR SELECT TIPO VEHICULO    */
		/***************************************/		
		function initTiposVehiculo(SelectedIndex){
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/TipoVehiculoGet.php?action_type=list&estado=1',
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#idtipos_vehiculo").empty();
						$("#idtipos_vehiculo").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idtipos_vehiculo = response.data[i]['idtipos_vehiculo'];
							var tipo_vehiculo = response.data[i]['tipo_vehiculo'];
							$('#idtipos_vehiculo').append($('<option>', { value: idtipos_vehiculo, text: tipo_vehiculo })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idtipos_vehiculo option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idtipos_vehiculo').selectpicker('refresh');
						}
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
			
		}		
		
		
		/***************************************/
		/*            CARGAR SELECT            */
		/***************************************/	
		function initTiposCombustibles(SelectedIndex){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					cache: false,
					url: 'database/TipoCombustibleGet.php?action_type=list&estado=1',
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#idtipo_combustible").empty();
						$("#idtipo_combustible").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idtipo_combustible = response.data[i]['idtipo_combustible'];
							var tipo_combustible = response.data[i]['tipo_combustible'];
							$('#idtipo_combustible').append($('<option>', { value: idtipo_combustible, text: tipo_combustible })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idtipo_combustible option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idtipo_combustible').selectpicker('refresh');
						}
						
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
						
		}
		
		
		/***************************************/
		/*            CARGAR SELECT            */
		/***************************************/
		function initTiposMedida(SelectedIndex){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					cache: false,
					url: 'database/MedidaCombustibleGet.php?action_type=list&estado=1',
					success:function(response){
													
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#idmedida_combustible").empty();
						$("#idmedida_combustible").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idmedida_combustible = response.data[i]['idmedida_combustible'];
							var medida_combustible = response.data[i]['medida_combustible'];
							$('#idmedida_combustible').append($('<option>', { value: idmedida_combustible, text: medida_combustible })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idmedida_combustible option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmedida_combustible').selectpicker('refresh');
						}
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
				
		}
		
		
		/***************************************/
		/*            CARGAR SELECT            */
		/***************************************/
		function initMedidaUso(SelectedIndex){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					cache: false,
					url: 'database/MedidaUsoGet.php?action_type=list&estado=1',
					success:function(response){
													
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#idmedida_uso").empty();
						$("#idmedida_uso").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var id_medida_uso = response.data[i]['id_medida_uso'];
							var medida_uso = response.data[i]['medida_uso'];
							$('#idmedida_uso').append($('<option>', { value: id_medida_uso, text: medida_uso })).selectpicker('refresh');
						}
						
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idmedida_uso option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmedida_uso').selectpicker('refresh');
						}
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
				
		}
		
		
		/***************************************/
		/*            CARGAR SELECT            */
		/***************************************/
		function initMarcasVehiculos(SelectedIndex){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					cache: false,
					url: 'database/MarcasVehiculosGet.php?action_type=list&estado=1',
					success:function(response){
													
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#idmarcas_vehiculos").empty();
						$("#idmarcas_vehiculos").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idmarcas_vehiculos = response.data[i]['idmarcas_vehiculos'];
							var marca_vehiculo = response.data[i]['marca_vehiculo'];
							$('#idmarcas_vehiculos').append($('<option>', { value: idmarcas_vehiculos, text: marca_vehiculo })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idmarcas_vehiculos option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmarcas_vehiculos').selectpicker('refresh');
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
						url: 'database/VehiculosGet.php?action_type=edit&id='+idItem,
						success:function(data){
			
							//INICIO DE PERSONALIZACION DE CAMPOS
							$('#sedes_idsedes').val(data.nombre_contrato);
							$('#descripcion_vehiculo').val(data.descripcion_vehiculo);
							$('#ano_fabricacion').val(data.ano_fabricacion);
							$('#nro_serie').val(data.nro_serie);
							$('#nro_motor').val(data.nro_motor);
							$('#placa_vehiculo').val(data.placa_vehiculo);
							$('#kilometraje_inicio').val(data.kilometraje_inicio);
							$('#color_calendario').minicolors('value', data.color_calendario);
							
							$('#es_pool').val(data.es_pool).change();
							
							$('#clase_transparencia').val(data.clase_transparencia).change();
							
							$('#estado_vehiculo').val(data.estado_vehiculo).change();
							
							$('#vencimiento_soat').datepicker('update', data.vencimiento_soat);
							
							initSedes(data.sedes_idsedes);
							initTiposCombustibles(data.idtipo_combustible);
							initTiposMedida(data.idmedida_combustible);
							initTiposVehiculo(data.idtipos_vehiculo);
							initMedidaUso(data.idmedida_uso);
							initMarcasVehiculos(data.idmarcas_vehiculos);
							initModelos(data.idmodelos_vehiculos, data.idmarcas_vehiculos)
							//FIN DE PERSONALIZACION DE CAMPOS
			
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
							
				
				}else{
					initSedes("");
					initTiposCombustibles("");
					initTiposMedida("");
					initTiposVehiculo("");
					initMedidaUso("");
					initMarcasVehiculos("");
					
					$('#estado_vehiculo').val(1).change().selectpicker('refresh');
						
				}
				
				/***************************************/
				/*   FIN DE  CARGAR REGISTRO A EDITAR   */
				/***************************************/					
			
		}
		
		
		
		var gridArchivos = new Datatable();

		function initArchivosAdjuntos(){
			
			gridArchivos = $('#datatable_adjuntos').DataTable({
						src: $("#datatable_adjuntos"),
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
						"sDom": 'T<"clear">lrtip',
						"ajax": {
							url: "database/VehiculosGet.php?action_type=adjuntos_x_vehiculo&id=" + idItem // ajax source
						},
								
						columns: [	
									{ 
										"mData": null,
									  "bSortable": false,
									  "mRender": function(data, type, full) {
			
										return '<img src=" ' + path + '/' + data['archivo_vehiculo'] + '" width="150" />';   			
															
									  }
									},															
									{ data : "archivo_vehiculo" },
									{ data : "size_archivo_vehiculo" },
									{ 
										"mData": null,
									  "bSortable": false,
									  "mRender": function(data, type, full) {
			
										return '<a href=" ' + path + '/' + data['archivo_vehiculo'] + '" data-id="' + data['idadjuntos_vehiculos'] + '" class="btn btn-xs btn-info" target="_blank"><i class="fa fa-download"></i> Descargar archivo</a>';   			
															
									  }
									},
									{
									  "mData": null,
									  "bSortable": false,
									  "mRender": function(data, type, full) {
			
										return '<a href="javascript:;" data-id="' + data['idadjuntos_vehiculos'] + '" class="mt-sweetalert delete_archivo btn btn-xs btn-danger"><i class="fa fa-times"></i> Eliminar archivo</a>';   			
															
									  }
									}
						],
				})
				
			
		}
		
		
		/*******************************/
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_adjuntos tbody').on( 'click', 'a.delete_archivo', function () {
			
			var data = gridArchivos.row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
							
							
					swal({
					  title: "CONFIRMACION REQUERIDA",
					  text: "Una vez eliminado, no será posible recuperar la información!",
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
							
							formdata = '&action_type=delete_adjunto_vehiculo&id=' + data['idadjuntos_vehiculos'];
							 
							$.ajax({
								dataType:'JSON',
								type: 'POST',
								url: 'database/VehiculosGet.php',
								data : formdata,
								success:function(data){
									

									switch(data.code){
									
										case "200"		:	swal("CONFIRMACION", "El archivo adjunti  ha sido eliminado.", "success");
															gridArchivos.row(rowToDelete).remove().draw( false );
															break;
															
										case "1451"		:	swal("ERROR", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar el contrato, deberá todos los documentos asociados a este registro.", "error");
															break;
															
										default			:	swal("ERROR", "El registro no se puede eliminar.", "error");
																	
									
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
		
		
		/******************************************/
		/*            VALIDAR FORMULARIO          */
		/******************************************/
		$( "#grabar_vehiculo" ).click(function() {

				 var form1 = $('#form');
				 var error1 = $('.alert-danger', form1);

				 form1.validate({

						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						rules: {
								sedes_idsedes: {
									required: true
								},
								descripcion_vehiculo: {
									required: true
								},
								idmarcas_vehiculos: {
									required: true
								},
								idmodelos_vehiculos: {
									required: true
								},
								idtipos_vehiculo: {
									required: true
								},
								estado_vehiculo: {
									required: true
								},
								idmedida_combustible: {
									required: true
								},
								idmedida_uso: {
									required: true
								},
								idtipo_combustible: {
									required: true
								},
								ano_fabricacion: {
									required: true
								},
								nro_serie: {
									required: true
								},
								placa_vehiculo: {
									required: true
								},
								kilometraje_inicio: {
									required: true
								},
								ano_fabricacion: {
									required: true
								},
								es_pool: {
									required: true
								},
								clase_transparencia: {
									required: true
								},
								vencimiento_soat: {
									required: true
								},
								nro_motor: {
									required: true
								}
						},

						invalidHandler: function (event, validator) { 
							error1.show();
							App.scrollTo(error1, -200);
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

								error1.hide();

								/*****************************************************/
								/*            AGREGAR O ACTUALIZAR REGISTRO          */
								/*****************************************************/		

								if (idItem == 'nuevo' || idItem == '') {

									formdata = $("#form").serialize()+'&action_type=create';
									msg = "Registro guardado correctamente!";

								}else if (idItem != '' && idItem != 'nuevo') {

									formdata = $("#form").serialize()+'&action_type=update&id='+idItem;
									msg = "Registro actualizado correctamente!";

								}
															
								$.ajax({
										dataType:'JSON',
										type: 'POST',
										url: 'database/VehiculosGet.php',
										data: formdata,
										success:function(data){

											toastIndex = toastCount++;
											toastr.options = {"positionClass": "toast-top-right"}
											var $toast = toastr["success"](msg); 
											
											$rootScope.$state.go('private.listar_vehiculos');

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

		});
				
		/*************************************************/
		/*            VALIDAR ITEMS ADJUDICADOS          */
		/*************************************************/
		
		
		//SE INICIAN LAS FUNCIONES
		initEditContent();
		initArchivosAdjuntos();
		
		
		
		
    });
}]);
