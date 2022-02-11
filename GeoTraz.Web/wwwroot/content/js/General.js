//VALIDA QUE SOLO INGRESE NUMEROS 
$('.input-number').on('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

function filterFloat(evt, input) {
    // Backspace = 8, Enter = 13, ‘0′ = 48, ‘9′ = 57, ‘.’ = 46, ‘-’ = 43
    var key = window.Event ? evt.which : evt.keyCode;
    var chark = String.fromCharCode(key);
    var tempValue = input.value + chark;
    if (key >= 48 && key <= 57) {
        if (filter(tempValue) === false) {
            return false;
        } else {
            return true;
        }
    } else {
        if (key == 8 || key == 13 || key == 0) {
            return true;
        } else if (key == 46) {
            if (filter(tempValue) === false) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}
function filter(__val__) {
    var preg = /^([0-9]+\.?[0-9]{0,3})$/;
    if (preg.test(__val__) === true) {
        return true;
    } else {
        return false;
    }
}

function mayus(e) {
    e.value = e.value.toUpperCase();
}

//var base_url = 'fake_url';
var timeout;
document.onmousemove = function () {
    clearTimeout(timeout);
    contadorSesion(); //aqui cargamos la funcion de inactividad
}

function contadorSesion() {
    timeout = setTimeout(function () {
        $.confirm({
            title: 'Alerta de Inactividad!',
            content: 'La sesión esta a punto de expirar..',
            autoClose: 'expirar|10000',//cuanto tiempo necesitamos para cerrar la session automaticamente
            type: 'red',
            icon: 'fa fa-spinner fa-spin',
            buttons: {
                expirar: {
                    text: 'Cerrar Sesión',
                    btnClass: 'btn-red',
                    action: function () {
                        salir();
                    }
                },
                permanecer: function () {
                    clearTimeout(timeout);
                    contadorSesion(); //reinicia el conteo
                    //window.location.href = base_url + "dashboard";
                }
            }
        });
    }, 3600000);//1800000
}

function salir() {
    $.ajax({
        url: '/Home/Logout',
        type: 'POST',
        //data: { "activo_filtro.VIdactivo": idactivo },
        success: function (data) {
            window.location.href = '../Home/Logout';
        }
    });
}
