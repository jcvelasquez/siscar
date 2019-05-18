/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarRolController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		
		var idItem = $rootScope.$state.params.id; 
		var title;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg = "";
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});	
		
		
		$('.mt-multiselect').each(function(){
				var btn_class = $(this).attr('class');
				var clickable_groups = ($(this).data('clickable-groups')) ? $(this).data('clickable-groups') : false ;
				var collapse_groups = ($(this).data('collapse-groups')) ? $(this).data('collapse-groups') : false ;
				var drop_right = ($(this).data('drop-right')) ? $(this).data('drop-right') : false ;
				var drop_up = ($(this).data('drop-up')) ? $(this).data('drop-up') : false ;
				var select_all = ($(this).data('select-all')) ? $(this).data('select-all') : false ;
				var width = ($(this).data('width')) ? $(this).data('width') : '' ;
				var height = ($(this).data('height')) ? $(this).data('height') : '' ;
				var filter = ($(this).data('filter')) ? $(this).data('filter') : false ;
	
				// advanced functions
				var onchange_function = function(option, checked, select) {
					alert('Changed option ' + $(option).val() + '.');
				}
				var dropdownshow_function = function(event) {
					alert('Dropdown shown.');
				}
				var dropdownhide_function = function(event) {
					alert('Dropdown Hidden.');
				}
	
				// init advanced functions
				var onchange = ($(this).data('action-onchange') == true) ? onchange_function : '';
				var dropdownshow = ($(this).data('action-dropdownshow') == true) ? dropdownshow_function : '';
				var dropdownhide = ($(this).data('action-dropdownhide') == true) ? dropdownhide_function : '';
	
				// template functions
				// init variables
				var li_template;
				if ($(this).attr('multiple')){
					li_template = '<li class="mt-checkbox-list"><a href="javascript:void(0);"><label class="mt-checkbox"> <span></span></label></a></li>';
				} else {
					li_template = '<li><a href="javascript:void(0);"><label></label></a></li>';
				}
	
				// init multiselect
				$(this).multiselect({
					enableClickableOptGroups: clickable_groups,
					enableCollapsibleOptGroups: collapse_groups,
					disableIfEmpty: true,
					enableFiltering: filter,
					includeSelectAllOption: select_all,
					dropRight: drop_right,
					buttonWidth: width,
					maxHeight: height,
					onChange: onchange,
					onDropdownShow: dropdownshow,
					onDropdownHide: dropdownhide,
					buttonClass: btn_class,
					//optionClass: function(element) { return "mt-checkbox"; },
					//optionLabel: function(element) { console.log(element); return $(element).html() + '<span></span>'; },
					/*templates: {
						li: li_template,
					}*/
				});   
		});
		
		
		
		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/		
		
		function initEditContent(){
		
			if (idItem != '' && idItem != 'nuevo') {
					
				//CAMPOS DE EDICION							
				 $.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/RolesGet.php?action_type=edit&id='+idItem,
					success:function(data){
						
						//INICIO DE PERSONALIZACION DE CAMPOS
						$('#nombre_rol').val(data.nombre_rol);
						$('#descripcion_rol').val(data.descripcion_rol);
						$('#cod_rol').val(data.cod_rol);
						$("#estado_rol").val(data.estado_rol).change();
						//FIN DE PERSONALIZACION DE CAMPOS
						
						$('#cod_rol').attr('disabled',true);
									
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
						
			}else{
				$('#estado_rol').val(1).change().selectpicker('refresh');	
			}
			
		}
		
		initEditContent();
		/***************************************/
		/*   FIN DE  CARGAR REGISTRO A EDITAR   */
		/***************************************/	
		
		
		/******************************************/
		/*            VALIDAR FORMULARIO          */
		/******************************************/

		$( "#grabar" ).click(function() {

				 var form1 = $('#form');
				 var error1 = $('.alert-danger', form1);

				 form1.validate({
						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						rules: {
							nombre_rol: {
								required: true
							},
							descripcion_rol: {
								required: true
							},
							cod_rol: {
								required: true
							},
							estado_rol: {
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

								/*****************************************************/
								/*            AGREGAR O ACTUALIZAR REGISTRO          */
								/*****************************************************/		
								if (idItem == 'nuevo' || idItem == '') {

									var formdata = $("#form").serialize()+'&action_type=create';
									msg = "Registro guardado correctamente!";

								}else if (idItem != '' && idItem != 'nuevo') {

									var formdata = $("#form").serialize()+'&action_type=update&id='+idItem;
									msg = "Registro actualizado correctamente!";

								}
								
								console.log(formdata);
							
								$.ajax({
									
										dataType:'JSON',
										type: 'POST',
										url: 'database/RolesGet.php',
										data: formdata,
										success:function(data){
				
											console.log(data);
											
											toastIndex = toastCount++;
											toastr.options = {"positionClass": "toast-top-right"}
											var $toast = toastr["success"](msg); 
											
											$("#form")[0].reset();
																								
											$rootScope.$state.go('private.listar_roles');
																	
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
		
		/******************************************/
		/*        FIN VALIDAR FORMULARIO          */
		/******************************************/
		
		
		
    });
}]);
