var $_table = $('#table');
var $_data = [];



function cargardatosTabla() {

    $.ajax({
        url: '/Home/ListaConcesiones?estado=A&nombres=%&sede=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        beforeSend: function () {
            $('#myModalLoading').removeAttr('hidden');
            $('#myModalLoading').modal("show");

        },
        complete: function () {

            $('#myModalLoading').attr('hidden', true);
            $('#myModalLoading').modal('hide');
            $('#liconcesion').addClass('active');
        },
        success: function (data) {
            
            var datos = data.data;
            $_data = datos;
            $_table.bootstrapTable('destroy').bootstrapTable({
                data: $_data,
                columns: [
                    {
                        field: 'v_CODCONCESION',
                        title: 'CÓDIGO CONCESIÓN:',

                        sortable: true
                    },
                    {
                        field: 'v_NOMCONCESION',
                        title: 'NOMBRE CONCESIÓN:',

                        sortable: true
                    },

                    {
                        field: 'v_NOMSEDE',
                        title: 'SEDE:',

                        sortable: true
                    },

                    {
                        field: 'v_CODCONCESION',
                        title: '<i class="fa fa-cog text-secondary-d1 text-130"></i>',

                        formatter: formatTableCellActions,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,

                    },

                ],

                icons: {
                    columns: 'fa-th-list text-orange-d1',

                    detailClose: 'fa-minus text-blue',
                    export: 'fa-download text-blue',
                    print: 'fa-print text-purple-d1',
                    fullscreen: 'fa fa-expand',

                    search: 'fa-search text-blue'
                },


                toolbar: "#table-toolbar",
                theadClasses: "bgc-white text-grey text-uppercase text-80",
                clickToSelect: true,

                checkboxHeader: true,
                search: true,
                searchAlign: "left",
                //showSearchButton: true,

                sortable: true,

                detailView: false,
                detailFormatter: "detailFormatter",

                pagination: true,
                paginationLoop: false,

                buttonsClass: "outline-default btn-smd bgc-white btn-h-light-primary btn-a-outline-primary py-1",

                showExport: true,
                showPrint: false,
                showColumns: true,
                showFullscreen: false,


                printPageBuilder: function (table) {
                    var bsHref = $('link[rel=stylesheet][href*="/bootstrap.css"], link[rel=stylesheet][href*="/bootstrap.min.css"]').attr('href');
                    //get bootstrap.css

                    return '<html>\
                                <head>\
                                  <link rel="stylesheet" type="text/css" href="'+ bsHref + '">\
                                  <title>REPORETE</title>\
                                </head>\
                                <body class="container">\
                                  <p>IMPRESO POR: TRAZABILIDAD</p>\
                                  <div>\
                                    <table class="table table-bordered">'
                        + table +
                        '</table>\
                                  </div>\
                                </body>\
                              </html>';
                }

            });
        
        },
        

    });


    function formatTableCellActions(value, row, index, field) {
        return '<div class="action-buttons">\
                                <a class="text-success mx-2px" href="#" onclick="getConcesion(\'' + value + '\') ">\
                                  <i class="fa fa-pencil-alt text-105"></i>\
                                </a>\
        <a class="text-danger-m1 mx-2px" href="#" onclick="DeleteProveedor(\'' + value + '\')">\
                                  <i class="fa fa-trash-alt text-105"></i>\
                                </a>\
                              </div > ';
    }
        //<a class="text-danger-m1 mx-2px" href="#" onclick="DeleteProveedor(\'' + value + '\')">\
    //                              <i class="fa fa-trash-alt text-105"></i>\
     //                           </a>\

    //enable/disable 'remove' button
    var $removeBtn = $('#remove-btn');

    $_table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        $removeBtn.prop('disabled', !$_table.bootstrapTable('getSelections').length);
    });

    //remove an item
    $removeBtn.click(function () {
        var ids = $.map($_table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });


        $_table.bootstrapTable('remove', {
            field: 'n_CODREINFO',
            values: ids
        });

        $removeBtn.prop('disabled', true)
    });


}
jQuery(function ($) {
    //initiate the plugin
    cargardatosTabla();

    ListaSedes();
});
function AgregarOeditarConcesion() {

    if (fnValidarConcesion()) {

        if ($('#TxtIndicador').val() == 1) {

            var EdiConce = {
                objConce: {
                    V_CODCONCESION: $("#txtCodConcesion").val().trim(),
                    V_NOMCONCESION: $("#txtNomConcesion").val().trim(),
                    V_DEPCON: "",
                    V_PROCON: "",
                    V_DISCON: "",
                    V_TPPROP: "T",
                    N_CODSEDE: $("#cmbSede").val(),
                    N_CODEMP: 0,
                    V_EST: "A",
                    V_TRAZABLE: "T",
                    V_DESCUENTOS: "",
                    V_CONDICIONES: "",
                    V_ZONAGEO: "125",
                    V_NOMSEDE: $("#cmbSede option:selected").text(),
                    V_SETID: $("#txtId_Concesion").val()

                }
            }
            $.ajax({
                url: '/Home/UpdateConcesion',
                type: 'POST',
                dataType: 'json',
                data: EdiConce,
                success: function (data) {

                    if (data.data != null) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Se Actualizó la Concesión',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'No se pudo actualizar el registro',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }


                    cargardatosTabla();
                    $("#myModalConcesion").modal('hide');
                },

            });
        } else {

            var RegConce = {
                objConce: {
                    V_CODCONCESION: $("#txtCodConcesion").val().trim(),
                    V_NOMCONCESION: $("#txtNomConcesion").val().trim(),
                    V_DEPCON: "",
                    V_PROCON: "",
                    V_DISCON: "",
                    V_TPPROP: "T",  
                    N_CODSEDE: $("#cmbSede").val(),
                    N_CODEMP: 0,
                    V_EST: "A",
                    V_TRAZABLE: "T",
                    V_DESCUENTOS: "",
                    V_ZONAGEO: "125",
                    V_CONDICIONES: "",
                    V_NOMSEDE: $("#cmbSede option:selected").text()
                }
            }
            $.ajax({
                url: '/Home/InsertConcesion',
                type: 'POST',
                dataType: 'json',
                data: RegConce,
                success: function (data) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se guardó la concesión',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    cargardatosTabla();
                    LimpiarTextos();
                    $("#myModalConcesion").modal('hide');
                },

            });
        }
    }
}

function getConcesion(id) {

    if (id == "0") {
        LimpiarLabels();
        LimpiarTextos();
  

        $('#TxtIndicador').val(0);
        $("#myModalConcesion").modal({ backdrop: 'static', keyboard: false })
        $("#myModalConcesion").modal('show');

    } else {
        LimpiarLabels();
        $.ajax({
            url: '/Home/GetConcesion?codConcesion=' + id,
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                $(datos).each(function (index, value) {

                    $("#txtCodConcesion").val(value.v_CODCONCESION);
                    $("#txtNomConcesion").val(value.v_NOMCONCESION);
                    $("#cmbSede").val(value.n_CODSEDE);

                    $("#txtId_Concesion").val(value.v_CODCONCESION)
                    $('#TxtIndicador').val(1);
                    $("#myModalConcesion").modal({ backdrop: 'static', keyboard: false });
                    $("#myModalConcesion").modal('show');
                });

            },


        });
    }



}


function DeleteReporte(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
        title: 'Esta seguro de eliminar los datos del reporte?',
        text: "",
        icon: 'warning',
        confirmButtonColor: "#228B22",
        cancelButtonColor: "#DD6B55",
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Si',

        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: '/Home/EliminarReporte?N_CODREPORTE=' + id,
                type: 'POST',
                dataType: 'json',
                data: 'data',
                success: function (data) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se Eliminaron los datos',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    cargardatosTabla();


                },

            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {

        }
    })
}

function fnValidarConcesion() {
    var isSave = true;
    var cmbSede = $("#cmbSede").val();
    var txtCodConcesion = $("#txtCodConcesion").val().trim();
    var txtNomConcesion = $("#txtNomConcesion").val().trim();



    if (cmbSede == "0") {
        isSave = false;
        $('#lblErrorcmbSede').css("display", "block");
        $("#lblErrorcmbSede").text("(*) Datos Obligatorios");
        $("#cmbSede").addClass("brc-danger-m1 pr-45 pl-25");
    }
    else {
        $('#lblErrorcmbSede').css("display", "none");
        $("#lblErrorcmbSede").text("");
        $("#cmbSede").removeClass("brc-danger-m1 pr-45 pl-25");
    }

    if (txtCodConcesion == "") {
        isSave = false;
        $('#lblErrortxtCodConcesion').css("display", "block");
        $("#lblErrortxtCodConcesion").text("(*) Datos Obligatorios");
        $("#txtCodConcesion").addClass("brc-danger-m1 pr-45 pl-25");
    }
    else {
        $('#lblErrortxtCodConcesion').css("display", "none");
        $("#lblErrortxtCodConcesion").text("");
        $("#txtCodConcesion").removeClass("brc-danger-m1 pr-45 pl-25");
    }

    if (txtNomConcesion == "") {
        isSave = false;
        $('#lblErrortxtNomConcesion').css("display", "block");
        $("#lblErrortxtNomConcesion").text("(*) Datos Obligatorios");
        $("#txtNomConcesion").addClass("brc-danger-m1 pr-45 pl-25");
    }
    else {
        $('#lblErrortxtNomConcesion').css("display", "none");
        $("#lblErrortxtNomConcesion").text("");
        $("#txtNomConcesion").removeClass("brc-danger-m1 pr-45 pl-25");
    }

    return isSave;
}

function LimpiarLabels() {

    $('#lblErrorcmbSede').css("display", "none");
    $("#lblErrorcmbSede").text("");
    $("#cmbSede").removeClass("brc-danger-m1 pr-45 pl-25");

    $('#lblErrortxtCodConcesion').css("display", "none");
    $("#lblErrortxtCodConcesion").text("");
    $("#txtCodConcesion").removeClass("brc-danger-m1 pr-45 pl-25");

    $('#lblErrortxtNomConcesion').css("display", "none");
    $("#lblErrortxtNomConcesion").text("");
    $("#txtNomConcesion").removeClass("brc-danger-m1 pr-45 pl-25");
}
function LimpiarTextos() {
    $("#cmbSede").val('0');
    $("#txtCodConcesion").val('');
    $("#txtNomConcesion").val('');
}

function ListaSedes() {
    $.ajax({
        url: '/Home/ListaSedes',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $('#cmbSede').empty();
            $('#cmbSede').append('<option selected value="0">ELEGIR...</option>');
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#cmbSede').append('<option value=' + value.n_CODSEDE + '>' + value.v_NOMSEDE + '</option > ');
            });
        }


    });
}

function fnValidaSesion() {
    $.ajax({
        url: '/Home/ValidaSesion',
        type: 'POST',
        //data: { "activo_filtro.VIdactivo": idactivo },
        success: function (data) {
            if (data.cod_ret_out < 0) {
                window.location.replace(data.msg_ope_out)
                window.opener.document.location = data.msg_ope_out;
            }
        }
    });
}