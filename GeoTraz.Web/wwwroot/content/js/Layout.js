
$(document).ready(function () {

    //CARGAR MODULOS
    //$.ajax({
    //    async:false,
    //    url: '/Home/ListaMenu?userId=prueba&rol=prueba',
    //    type: 'GET',
    //    dataType: 'json',
    //    data: 'data',
    //    success: function (data) {
    //        var datos = data.data;
    //        let html = "";
    //        let iconos = ["fa-cog", "fa-building", "fa-id-card", "fa-list-alt", "fa-tasks",
    //            "fa-industry", "fa-id-card", "fa fa-file", "fa-file", "fa-file-excel", "fa-folder", "fa-paperclip",
    //            "fa-handshake", "fa-archive", "fa-clipboard", "fa-book"];
    //        var a = 0;
    //        $(datos).each(function (index, value) {
    //           if (value.hijos_List==null) {
    //               html = html + '<li class="nav-item" id ="li' + value.v_FUNC + '">\
    //                       <a href = "Home/'+ value.v_FUNC + '" class="nav-link" >\
    //                       <i class="nav-icon fa '+iconos[a]+'"></i>\
    //                                   <span class="nav-text fadeable">\
    //                                       <span>'+ value.v_NAME + '</span>\
    //                                   </span>\
    //                           </a>\
    //                           <b class="sub-arrow"></b>\
    //                       </li>';
    //               a++;
    //           }
    //          else {
    //               html = html + '<li class="nav-item" id ="P' + value.v_NAME.substr(0, 3) + '">\
    //              <a href="#" class="nav-link dropdown-toggle">\
    //                  <i class="nav-icon fa '+ iconos[a] +'"></i>\
    //                  <span class="nav-text fadeable">\
    //                      <span>'+ value.v_NAME + '</span>\
    //                  </span><b class="caret fa fa-angle-left rt-n90"></b>\
    //              </a>';
    //               a++;
    //               html = html + '<div class="hideable submenu collapse">\
    //                  <ul class= "submenu-inner">';
    //                  for (var i = 0; i <= 1; i++) {
    //                      html = html + '<li class="nav-item" id="li' + value.hijos_List[i].v_FUNC + '">\
    //                                <a href="Home/'+ value.hijos_List[i].v_FUNC + '" class="nav-link">\
    //                                    <i class="nav-icon fa '+ iconos[a] +'"></i>\
    //                                    <span class="nav-text fadeable">\
    //                                        <span>'+ value.hijos_List[i].v_NAME + '</span>\
    //                                    </span>\
    //                                </a>\
    //                                <b class="sub-arrow"></b>\
    //                            </li>';
    //                      a++;
    //                  }
    //               html = html + '<ul></div>';
    //          }
    //          html = html + '<b class= "sub-arrow"></b></li>';
    //        });
    //        $('#ulMenu').append(html);
    //        $.ajax({
    //            async: false,
    //            url: '/Home/CargarUser',
    //            type: 'GET',
    //            dataType: 'json',
    //            data: 'data',
    //            success: function (data) {
    //                var datos = data.data;
    //                $(datos).each(function (index, value) {
    //                    $('#lblusuario').text(value.v_LOGIN);
    //                    $.ajax({
    //                        url: '/Home/ListaSedes',
    //                        type: 'GET',
    //                        dataType: 'json',
    //                        data: 'data',
    //                        success: function (data) {
    //                            var datos = data.data;
    //                            $('#txtSedeUser').empty();
    //                            var datos = data.data;
    //                            $(datos).each(function (index, val) {
    //                                if (value.n_CODSEDE == val.n_CODSEDE) {
    //                                    $('#txtSedeUser').append('<u>Sede</u><p><strong>' + val.v_NOMSEDE + '</strong></p>');
    //                                }
    //                            });
    //                        }
    //                    });
    //                // var condicion = value.v_LOGIN;
    //                // if (condicion.substr(0, 2) == "TZ" || condicion.substr(0, 2) == "tz") {
    //                //    //if (condicion.substr(0, 2) == "DE" || condicion.substr(0, 2) == "DE") {
    //                //        $("#liReinfo").css("display", "none");
    //                //     $("#PRep").css("display", "none");
    //                //     $("#liReporte").css("display", "none");
    //                //     $("#liReporteGeneral").css("display", "none");
    //                //    } else {
    //                //     $("#PMan").css("display", "none");
    //                //     $("#liProveedor").css("display", "none");
    //                //     $("#liConcesion").css("display", "none");
    //                //     $("#liReinfo").css("display", "none");
    //                //     $("#liIgafom").css("display", "none");
    //                //     $("#liDeclaracionMinera").css("display", "none");
    //                //     $("#liFormalizados").css("display", "none");
    //                //     $("#PRep").css("display", "none");
    //                //     $("#liReporte").css("display", "none");
    //                //     $("#liReporteGeneral").css("display", "none");
    //                //     $("#PMat").css("display", "none");
    //                //     $("#liDocumentos").css("display", "none");
    //                //     $("#liDocuCapacitacion").css("display", "none");
    //                //     $("#PDoc").css("display", "none");
    //                //     $("#liDocuProveedor").css("display", "none");
    //                //     $("#liCatalogo").css("display", "none");
    //                //    }
    //               });
    //            },
    //        });
    //    },
    //});

    $(document).ready(function () {
        $.ajax({
            async: false,
            url: '/Home/CargarUser',
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                $(datos).each(function (index, value) {
                    $('#lblusuario').text(value.v_LOGIN);
                    $.ajax({
                        url: '/Home/ListaSedes',
                        type: 'GET',
                        dataType: 'json',
                        data: 'data',
                        success: function (data) {
                            var datos = data.data;
                            $('#txtSedeUser').empty();
                            var datos = data.data;
                            $(datos).each(function (index, val) {
                                if (value.n_CODSEDE == val.n_CODSEDE) {
                                    $('#txtSedeUser').append('<u>Sede</u><p><strong>' + val.v_NOMSEDE + '</strong> </p>');
                                }
                            });
                        }
                    });
                    var condicion = value.v_LOGIN;

                    if (condicion.substr(0, 2) == "TZ" || condicion.substr(0, 2) == "tz")  {
                        $("#liReinfo").css("display", "block");
                        $("#liReporte").css("display", "block");
                    } else {
                        $("#liMantenimiento").css("display", "block");
                        $("#liReinfo").css("display", "block");
                        $("#liigafom").css("display", "block");
                        $("#lideclaracionminera").css("display", "block");
                        $("#liformalizados").css("display", "block");
                        $("#liReporte").css("display", "block");
                        $("#liDocumentosGeneral").css("display", "block");
                        $("#lidocumentosayuda").css("display", "block");
                        $("#lidocumentocapacitacion").css("display", "block");
                        $("#liDocDeProveedor").css("display", "block");

                    }
                });
            },
        });
    });

});

   
$('#imgLaytaruma').click(function () {
    window.location.href = '@Url.Action("Reinfo", "Home")';
});
$('#imgLaytaruma2').click(function () {
    window.location.href = '@Url.Action("Reinfo", "Home")';
});

