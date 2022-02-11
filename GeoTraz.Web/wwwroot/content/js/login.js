

$(document).ready(function () {
    $("#TxtUsuario").focus();

});

$(document).on('keypress', function (e) {
    if (e.which == 13) {
        login();
    }
});
function login() {

    var usuario = {
        V_LOGIN: $('#TxtUsuario').val(),
        V_PASS: $('#TxtPassword').val()
    }
        if (fnValidarUsuario()) {
        $('#myModalLoading').modal('show');
        $.ajax({
            type: "post",
            url: "/Home/LoginUsuario",
            data: usuario,
            success: function (data) {
                var result = data.data;
                if (result == null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Acceso Degenado',
                        text: 'Las credenciales ingresadas no son correctas.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setTimeout(function () { $('#myModalLoading').modal('hide'); }, 50);
                    $('#TxtPassword').val("");

                    } else {
                    $('#myModalLoading').modal('hide');
                        window.location.href = "Home/Reinfo";
                }
            },
               error: (error) => {
                     console.log(JSON.stringify(error));
            }

        });
      
    }ñ
 
};

//VALIDAR TEXTOS VACIOS
function fnValidarUsuario() {
    var isSave = true;
    var TxtUsuario = $("#TxtUsuario").val().trim();
    var TxtPassword = $("#TxtPassword").val().trim();
  /*  var cmbPerfil = $("#cmbPerfil").val();*/

    if (TxtUsuario == "") {
        isSave = false;
        $("#lblErrorTxtUsuario").text("Datos Obligatorios");
        $('#TxtUsuario').addClass("error");
    }
    else {
        $("#lblErrorTxtUsuario").text("");
        $('#TxtUsuario').removeClass("error");
    }
    if (TxtPassword == "") {
        isSave = false;
        $("#lblErrorTxtPassword").text("Datos Obligatorios");
        $('#TxtPassword').addClass("error");
    }
    else {
        $("#lblErrorTxtPassword").text("");
        $('#TxtPassword').removeClass("error");
    }
    //if (cmbPerfil == "0") {
    //    isSave = false;
    //    $("#lblErrorcmbPerfil").text("Debe seleccionar un perfil");
    //    $('#TxtPassword').addClass("error");
    //}
    //else {
    //    $("#lblErrorcmbPerfil").text("");
    //    $('#TxtPassword').removeClass("error");
    //}


    return isSave;
}

//CODIGO PARA USAR CON ROLES

//function login() {
//    var usuario = {
//        V_LOGIN: $('#TxtUsuario').val(),
//        V_PASS: $('#TxtPassword').val()
//    }
//    if (fnValidarUsuario()) {
//        $.ajax({
//            type: "post",
//            url: "/Home/LoginUsuario",
//            data: usuario,
//            success: function (data) {
//                var result = data.data;
//                if (result == null) {
//                    Swal.fire({
//                        icon: 'error',
//                        title: 'Acceso Degenado',
//                        text: 'Las credenciales ingresadas no son correctas.',
//                        showConfirmButton: false,
//                        timer: 2000
//                    });
//                    setTimeout(function () { $('#myModalLoading').modal('hide'); }, 50);
//                    $('#TxtPassword').val("");
//                } else {
//                    if ($('#cmbPerfil option').length > 0) {
//                        if ($('#cmbPerfil').val() == "0") {
//                            Swal.fire({
//                                icon: 'error',
//                                title: 'Debe Seleccionar un Rol',
//                                text: '',
//                                showConfirmButton: false,
//                                timer: 2000
//                            });
//                        } else {
//                            $('#myModalLoading').modal('hide');
//                            window.location.href = "Home/Reinfo";
//                        }
//                    } else {
//                        $('#cmbPerfil').empty();
//                        $.ajax({
//                            async: false,
//                            url: '/Home/CargarUser',
//                            type: 'GET',
//                            dataType: 'json',
//                            data: 'data',
//                            success: function (data) {
//                                var datos = data.data;
//                                $(datos).each(function (index, value) {
//                                    $('#cmbPerfil').append('<option value="0">SELECCIONE PERFIL</option>')
//                                    for (var i = 0; i < value.userRolesApp.length; i++) {
//                                        $('#cmbPerfil').append('<option value="' + value.userRolesApp[i]['v_IDROLE'] + '">' + value.userRolesApp[i]['v_NAMEROLE'] + '</option>');
//                                   }
//                                });
//                                $('#cmbPerfil').css("display", "block");
//                            },
//                        });
//                    }
//                }
//            },
//            error: (error) => {
//               console.log(JSON.stringify(error));
//            }
//        });
//    }
//};