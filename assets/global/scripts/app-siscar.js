/**
Core script to handle the entire theme and core functions
**/
var AppSiscar = function() {

    // Handles Bootstrap Modals.
	var sesion;
	var configuracion;
	var parametro;
	
    var handleSession = function() {    
	
			$.ajax({
					dataType:'JSON',
					type: 'POST',
					data : { action_type : 'login_sesion' },
					url: 'database/LoginGet.php',
					success:function(data){
						
						AppSiscar.setSesion(data);
						
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
			});
			
			return sesion;
		
    };
	
	var handleConfiguration = function() {    
	
			$.ajax({
					dataType:'JSON',
					type: 'POST',
					data : { action_type : 'sesion_configuracion' },
					url: 'database/ConfiguracionGet.php',
					success:function(configuracion){
						
						AppSiscar.setConfiguracion(configuracion);
						
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
			});
			
			return configuracion;
		
    };


	var handleMenu = function() {    
			
		if (typeof(sesion) != 'undefined'){
		
			if(sesion['codrol'] == "USU") {
			
				$('.hide_to_user').addClass('hide');
				
			}else if(sesion['codrol'] == "ADM") {
				
				$('.hide_to_user').removeClass('hide');
				
			}else if(sesion['codrol'] == "CHO") {
				
				$('.hide_to_user').addClass('hide');
				$('.show_to_chofer').removeClass('hide');
				
			}
		
		}
		
    };
    
    //* END:CORE HANDLERS *//

    return {

        init: function() {
            handleSession();
			handleConfiguration(); 
			handleMenu();	
        },
        initAjax: function() {
            handleSession(); 
			handleConfiguration(); 
			handleMenu();	 
        },
		initMenu: function() {
            this.initAjax();
        },
		setSesion: function(data) {
            sesion = data;
        },
		getSesion: function() {
            return sesion;
        },
		setConfiguracion: function(data) {
            configuracion = data;
        },
		getConfiguracion: function() {
            return configuracion;
        },  
		getParametro: function(param) {
			
			var params = configuracion.parametros;
			var len = params.length;
			var valor;
			
			for(var i=0; i<len; i++){
				
				if(params[i].nombre_parametro == param){
					valor = configuracion.parametros[i]['valor_parametro'];
					break;
				}
				
			}		
			
            return valor;
        }  

    };

}();

<!-- END THEME LAYOUT SCRIPTS -->
/*
jQuery(document).ready(function() {    
   AppSiscar.init();
});*/


//if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {   
        AppSiscar.init(); // init metronic core componets
    });
//}