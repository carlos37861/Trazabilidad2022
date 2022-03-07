var UsuarioNom = '';

    var $_table = $('#table');
    var $_data = [];
var $_tableDecMin = $('#tableCargoDecMin');
var $_dataDecMin = [];
var UserSede = 0;
var sedeReinfo = 0;
var datosPrueba = "";
function cargardatosTabla() {

    $.ajax({
        url: '/Home/ListaReinfo',
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
            $('#lideclaracionminera').addClass('active');
        },
        success: function (data) {
            var datos = data.data;
            $_data = datos;
            $_table.bootstrapTable('destroy').bootstrapTable({
                data: $_data,
                columns: [
                    [
                        {
                            field: '',
                            title: '',
                            colspan: 7,
                            align: 'center',
                        },
                        {
                            field: '',
                            title: 'CARGO DECLARACIÓN MINERA',
                            width: 140,
                            colspan: 4,
                            align: 'center',
                        },
                        {
                            field: '',
                            title: '',
                            width: 140,
                            colspan: 1,
                            align: 'center',
                        },
                    ],
                    [
                        {
                            field: '',
                            title: 'DATOS DE REINFO',
                            colspan: 7,
                            align: 'center',
                        },
                        {
                            field: '',
                            title: '2021',
                            width: 140,
                            colspan: 2,
                            align: 'center',
                        },
                        {
                            field: '',
                            title: '2022',
                            width: 140,
                            colspan: 2,
                            align: 'center',
                        },
                        {
                            field: '',
                            title: '',
                            width: 140,
                            colspan: 1,
                            align: 'center',
                        },
                    ],
                    [{
                        field: 'n_SEDE',
                        title: '<label style="width:120px">Sede</label>',
                        formatter: Sede,
                        sortable: true
                    },
                    {
                        field: 'v_RUC',
                        title: 'Ruc',
                        sortable: true
                    },
                    {
                        field: 'v_PROVEEDOR',
                        width: 340,
                        title: '<label style="width:350px">Proveedor</label>',
                        sortable: true,
                    },
                    {
                        field: 'v_CODCONSECION',
                        title: 'Código Concesión',
                        sortable: true,
                    },
                    {
                        field: 'v_NOMCONSECION',
                        title: 'Nombre Concesión',
                        sortable: true,
                    },
                    {
                        field: 'v_NOMDERECHMINE',
                        title: 'Derecho Minero',
                        sortable: true,
                    },
                    {
                        field: 'v_FECREINFO',
                        title: 'Fecha Reinfo',
                        sortable: true,
                    },
                    {
                        field: 'v_2021SEM1',
                        formatter: DecMinera2021S1,
                        title: 'SEMESTRE 1',
                        align: 'center',
                        sortable: true
                    },
                    {
                        field: 'v_2021SEM2',
                        formatter: DecMinera2021S2,
                        title: 'SEMESTRE 2',
                        align: 'center',
                        sortable: true
                    },
                    {
                        field: 'v_2022SEM1',
                        formatter: DecMinera2022S1,
                        title: 'SEMESTRE 1',
                        align: 'center',
                        sortable: true
                    },
                    {
                        field: 'v_2022SEM2',
                        formatter: DecMinera2022S2,
                        title: 'SEMESTRE 2',
                        align: 'center',
                        sortable: true
                    },
                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cog text-secondary-d1 text-130"></i>',
                        formatter: formatTableCellActions,
                        width: 50,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    }],
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
                search: false,
                searchAlign: "left",
                sortable: true,
                detailView: false,
                detailFormatter: "detailFormatter",
                pagination: true,
                paginationLoop: false,
                buttonsClass: "outline-default btn-smd bgc-white btn-h-light-primary btn-a-outline-primary py-1",
                showExport: false,
                showPrint: false,
                showColumns: false,
                showFullscreen: false,
                printPageBuilder: function (table) {
                    var bsHref = $('link[rel=stylesheet][href*="/bootstrap.css"], link[rel=stylesheet][href*="/bootstrap.min.css"]').attr('href');
                    //get bootstrap.css
                    return '<html>\
                                <head>\
                                  <link rel="stylesheet" type="text/css" href="'+ bsHref + '">\
                                  <title></title>\
                                </head>\
                                <body class="container">\
                                  <p></p>\
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
        if (sedeReinfo == UserSede || UserSede==1) {
            return '<div class="action-buttons">\
                                <a class="text-purple mx-2px" href="#" onclick=getReinfo('+ value + ',0) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div > ';
        } else {
            return '<div class="action-buttons">\
                                <a class="text-purple mx-2px" href="#" onclick=getReinfo('+ value + ',1) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div > ';
        }
    }
    function Sede(value, row, index, field) {
        var nomSede = ""
        $.ajax({
            async: false,
            url: '/Home/ListaSedes',
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                $(datos).each(function (index, val) {
                    if (val.n_CODSEDE == value) {
                        nomSede = val.v_NOMSEDE;
                        sedeReinfo = value;
                    }
                });
            },
        });
        return '<label>' + nomSede + '</label>';
    }

    function DecMinera2021S1(value, row, index, field) {
        if (value > 0) {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled checked value="second_checkbox">\
                                      </div>';
        } else {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled value="second_checkbox">\
                                      </div>';
        }
    }
    function DecMinera2021S2(value, row, index, field) {
        if (value > 0) {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled checked value="second_checkbox">\
                                      </div>';
        } else {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled value="second_checkbox">\
                                      </div>';
        }
    }
    function DecMinera2022S1(value, row, index, field) {
        if (value > 0) {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled checked value="second_checkbox">\
                                      </div>';
        } else {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled value="second_checkbox">\
                                      </div>';
        }
    }
    function DecMinera2022S2(value, row, index, field) {
        if (value > 0) {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled checked value="second_checkbox">\
                                      </div>';
        } else {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled value="second_checkbox">\
                                      </div>';
        }
    }
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
    nombreUsuario();
    //initiate the plugin
    ListaSedes();
    cargardatosTabla();
    ListaSedesFiltrar();
    //ocultar por semestre
    $("#tb2Semestre").hide();
    $("#btnModificar").attr('disabled', true);
    $("#cmbDepartamento").attr('disabled', true);
    $("#cmbProvincia").attr('disabled', true);
    $("#cmbCiudad").attr('disabled', true);
    ListaDepartamentos();
    $.ajax({
        async: false,
        url: '/Home/CargarUser',
        type: 'GET', 
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                UserSede = value.n_CODSEDE;
            });
        },
    });

});

//exportar a excel
$('#btnExportar').click(function () {
    
    var V_RUC = $('#txtRucFiltrar').val();
    var V_PROVEEDOR = encodeURIComponent($('#txtRazonSocialFiltrar').val());
    var V_CODCONSECION = $('#txtCodConcesionFiltrar').val();
    var V_NOMCONSECION = $('#txNombreConceFiltrar').val();
    var V_NOMDERECHMINE = $('#txtNomDerechoMineroFiltrar').val();
    var V_FECREINFO = $('#txtFechaReinfoFiltrar').val();
    var V_RESULTADOS = $('#cmbResultadoFiltrar').val();
    var N_SEDES = $('#cmbSedeFiltrar').val();
    var parametros = "V_RUC=" + V_RUC + "%&V_PROVEEDOR=%" + V_PROVEEDOR + "%&V_CODCONSECION=%" + V_CODCONSECION + "%&V_NOMCONSECION=%" + V_NOMCONSECION + "%&V_NOMDERECHMINE=%" + V_NOMDERECHMINE + "%&V_FECREINFO=" + V_FECREINFO + "%&V_RESULTADOS=" + V_RESULTADOS + "&N_SEDES=" + N_SEDES;
    var w=window.open("/Home/ExportaExcelDecMinera?" + parametros, "_blank");
    toastr["info"]("La descarga de archivo puede tardar unos minutos...");
    //$(w).ready(function () {
    //    toastr["success"]("Se descargó el archivo.. ");
    //});
});

function ListaSedesFiltrar() {
    $.ajax({
        url: '/Home/ListaSedes',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $('#cmbSedeFiltrar').empty();
            $('#cmbSedeFiltrar').append('<option selected value="0">TODOS...</option>');
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#cmbSedeFiltrar').append('<option value=' + value.n_CODSEDE + '>' + value.v_NOMSEDE + '</option > ');
            });
        }
    });
}

function getReinfo(id,condicion) {
        LimpiarLabels();
        $.ajax({
            url: '/Home/BuscarReinfo?N_CODREINFO=' + id,
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                $(datos).each(function (index, value) {
                    var dep = (value.v_UBIGEO).substring(0, 2);
                    var prov = (value.v_UBIGEO).substring(0, 4);
                    var dist = (value.v_UBIGEO).substring(0, 6);
                    $("#txtRazonSocial").val(value.v_PROVEEDOR);
                    $("#txtRucProveedor").val(value.v_RUC);
                    $("#txtCodConcesion").val(value.v_CODCONSECION);
                    $("#txtNomConcesion").val(value.v_NOMCONSECION);
                    $("#txtNomDerechoMinero").val(value.v_NOMDERECHMINE);
                    $("#txtTipoActividad").val(value.v_CODTIPOACT);
                    //ZONA DE UBIGEO
                    $("#cmbDepartamento").val(dep + '0000');
                    $("#cmbProvincia").val(prov + '00');
                    $("#cmbCiudad").val(dist);
                    $("#cmbSede").val(value.n_SEDE);
                    //FIN ZONA UBIGEO
                    $('#txtId_IdReinfo').val(value.n_CODREINFO);
                    $.ajax({
                        url: '/Home/ListRepLegales?codAnexo=' + value.v_RUC + '&tipo=P',
                        type: 'GET',
                        dataType: 'json',
                        data: 'data',
                        success: function (data) {
                            var datos = data.data;
                            $(datos).each(function (index, value) {
                                $("#txtNombreRepLegal").val(value.v_NOM);
                                $("#txtApePat").val(value.v_PAT);
                                $("#txtApeMat").val(value.v_MAT);
                                $("#txtTelefono").val(value.v_TLF);
                                $("#txtEmail").val(value.v_EMAIL);
                                $("#txtDireccion").val(value.v_DIRE);
                                $("#txtEmailPass").val(value.v_PASSEMAIL);
                                $('#TxtIndicador').val(1);
                            });
                         },
                    });
                    cargardatosTablaCargoDecMinera(id,condicion);
                    $.ajax({
                        url: '/Home/BuscarProveedor?V_CODANE=' + value.v_RUC,
                        type: 'GET',
                        dataType: 'json',
                        data: 'data',
                        success: function (data) {

                            var datos = data.data;
                            $(datos).each(function (index, value) {
                                $("#txtUsuMem").val(value.v_USUMEM);
                                $("#txtPassMem").val(value.v_CLAVEMEM);
                                $("#txtUsuSunat").val(value.v_USUSUNAT);
                                $("#txtClaveSol").val(value.v_CLAVESUNAT);
                                if (value.v_TPPER == "J") {
                                    $("#DivPerNat").hide();
                                    $("#DivRepLegal").show();
                                } else if (value.v_TPPER == "N") {
                                    $("#txtCorreoPerNat").val(value.v_EMAIL);
                                    $("#txtDirecPerNat").val(value.v_DIRE);
                                    $("#txtTelPerNat").val(value.v_CEL);
                                    $("#DivPerNat").show();
                                    $("#DivRepLegal").hide();
                                }
                            });
                            //var fecha = new Date();
                            //var anio = fecha.getFullYear();
                            if (condicion == 1) {
                                $("#txtObsDecMin").attr('disabled', true);
                                $("#txtNomContador").attr('disabled', true);
                                $("#txtCelContador").attr('disabled', true);
                                $("#txtCorreoContador").attr('disabled', true);
                                $("#divDecMinera").css("display", "none");
                                $("#btnAgregarEditarDeclaracion").attr('disabled', true);
                            } else {
                                $("#txtObsDecMin").attr('disabled', false);
                                $("#txtNomContador").attr('disabled', false);
                                $("#txtCelContador").attr('disabled', false);
                                $("#txtCorreoContador").attr('disabled', false);
                                $("#divDecMinera").css("display", "block");
                                $("#btnAgregarEditarDeclaracion").attr('disabled', false);
                            }
                            $.ajax({
                                url: '/Home/ValidaDeclaracionMinera?N_CODREIN=' + id,
                                type: 'GET',
                                dataType: 'json',
                                data: 'data',
                                success: function (data) {
                                    var datos = data.data;
                                    if (data.data.length == "0") {
                                        LimpiarTextos();
                                    }
                                    $(datos).each(function (index, value) {
                                        if (data.data.length > 0) {
                                            $("#txtObsDecMin").val(value.v_OBSERVACION),
                                            $("#txtNomContador").val(value.v_NOMCONTADOR),
                                            $("#txtCelContador").val(value.v_CELCONTADOR),
                                            $("#txtCorreoContador").val(value.v_CORREOCONTADOR)
                                        }
                                    });
                                    $("#myModalDeclaracionMinera").modal({ backdrop: 'static', keyboard: false })
                                    $("#myModalDeclaracionMinera").modal('show');
                                }
                            });
                        },
                    });
                });
            },
        });
}

function AgregarOeditarDeclaracion() {
    if (fnValidarDeclaracion()) {

        $.ajax({
            url: "/Home/ValidaDeclaracionMinera?N_CODREIN=" + $('#txtId_IdReinfo').val(),
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {

                if (data.data.length > 0) {
                    var EditDec = {
                        objDec: {
                            N_CODREIN: $("#txtId_IdReinfo").val(),
                            V_OBSERVACION: $("#txtObsDecMin").val(),
                            V_NOMCONTADOR: $("#txtNomContador").val(),
                            V_CELCONTADOR: $("#txtCelContador").val(),
                            V_CORREOCONTADOR: $("#txtCorreoContador").val(),
                            V_USUMODIF: UsuarioNom,
                        }
                    }
                    $.ajax({
                        url: '/Home/EditarDeclaracionMinera',
                        type: 'POST',
                        dataType: 'json',
                        data: EditDec,
                        success: function (data) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Se Actualizó la declaración minera',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            $("#myModalDeclaracionMinera").modal('hide');
                        },

                    });

                } else {

                    var RegDec = {
                        objDec: {
                            N_CODREIN: $("#txtId_IdReinfo").val(),
                            V_OBSERVACION: $("#txtObsDecMin").val(),
                            V_NOMCONTADOR: $("#txtNomContador").val(),
                            V_CELCONTADOR: $("#txtCelContador").val(),
                            V_CORREOCONTADOR: $("#txtCorreoContador").val(),
                            V_USUREGISTRO: UsuarioNom,
                        }
                    }
                    $.ajax({
                        url: '/Home/AgregarDeclaracionMinera',
                        type: 'POST',
                        dataType: 'json',
                        data: RegDec,
                        success: function (data) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Se guardó la declaración minera',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            $("#myModalDeclaracionMinera").modal('hide');
                        },

                    });
                }
            }
        }
        );


    }
}

function fnValidarDeclaracion() {
    var isSave = true;
    var txtObsDecMin = $("#txtObsDecMin").val().trim();
    var txtNomContador = $("#txtNomContador").val().trim();
    var txtCelContador = $("#txtCelContador").val().trim();
    var txtCorreoContador = $("#txtCorreoContador").val().trim();

    //if (txtObsDecMin == "") {
    //    isSave = false;
    //    $("#lblErrortxtObsDecMin").text("Datos Obligatorios");
    //    $('#lblErrortxtObsDecMin').css("display", "block");
    //}
    //else {
    //    $("#lblErrortxtObsDecMin").text("");
    //    $('#lblErrortxtObsDecMin').css("display", "none");
    //}
    //if (txtNomContador == "") {
    //    isSave = false;
    //    $("#lblErrortxtNomContador").text("Datos Obligatorios");
    //    $('#lblErrortxtNomContador').css("display", "block");

    //}
    //else {
    //    $("#lblErrortxtNomContador").text("");
    //    $('#lblErrortxtNomContador').css("display", "none");

    //}
    //if (txtCelContador == "") {
    //    isSave = false;
    //    $("#lblErrortxtCelContador").text("Datos Obligatorios");
    //    $('#lblErrortxtCelContador').css("display", "block");
    //}
    //else {
    //    $("#lblErrortxtCelContador").text("");
    //    $('#lblErrortxtCelContador').css("display", "none");

    //}
    //if (txtCorreoContador == "") {
    //    isSave = false;
    //    $("#lblErrortxtCorreoContador").text("Datos Obligatorios");
    //    $('#lblErrortxtCorreoContador').css("display", "block");
    //}
    //else {
    //    $("#lblErrortxtCorreoContador").text("");
    //    $('#lblErrortxtCorreoContador').css("display", "none");

    //}

    return isSave;
}

function LimpiarTextos() {

    $("#txtObsDecMin").val('');
    $("#txtNomContador").val('');
    $("#txtCelContador").val('');
    $("#txtCorreoContador").val('');


}
function LimpiarLabels() {

    $("#lblErrortxtObsDecMin").text("");
    $('#lblErrortxtObsDecMin').css("display", "none");

    $("#lblErrortxtNomContador").text("");
    $('#lblErrortxtNomContador').css("display", "none");

    $("#lblErrortxtCelContador").text("");
    $('#lblErrortxtCelContador').css("display", "none");

    $("#lblErrortxtCorreoContador").text("");
    $('#lblErrortxtCorreoContador').css("display", "none");

}

$("#cmbSemestre").change(function () {
    if ($("#cmbSemestre").val() == "1") {
        $("#tb1Semestre").show();
        $("#tb2Semestre").hide();
    } else if ($("#cmbSemestre").val() == "2") {
        $("#tb2Semestre").show();
        $("#tb1Semestre").hide();
    } else {
        $("#tb1Semestre").hide();
        $("#tb2Semestre").hide();
    }
});

$("#cmbAnio").change(function () {
    
    $.ajax({
        url: '/Home/ValidaDeclaracionMinera?N_CODREIN=' + $('#txtId_IdReinfo').val() + "&V_ANIO=" + $('#cmbAnio').val(),
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;

            if (data.data.length == "0") {
                LimpiarTextos();
            }
            $(datos).each(function (index, value) {
              
                if (data.data.length > 0) {
                    $("#cmbTipoSustancia").val(value.v_TIPOSUS),
                        $("#cmbSituacion").val(value.v_SITUACION),
                        $("#cmbRecursoExtraido").val(value.v_RECURSO),
                        $("#cmbDestinoRecur").val(value.v_DESTINORECURSO),
                        $("#cmbCondicionMinero").val(value.v_CONDICIONMIN),
                        $("#txtEneroT").val(value.n_ENEROT),
                        $("#txtFebreroT").val(value.n_FEBREROT),
                        $("#txtMarzoT").val(value.n_MARZOT),
                        $("#txtAbrilT").val(value.n_ABRILT),
                        $("#txtMayoT").val(value.n_MAYOT),
                        $("#txtJunioT").val(value.n_JUNIOT),
                        $("#txtTotalS1T").val(value.n_SEMESTRE1T),
                        $("#txtJulioT").val(value.n_JULIOT),
                        $("#txtAgostoT").val(value.n_AGOSTOT),
                        $("#txtSetiembreT").val(value.n_SETIEMBRET),
                        $("#txtOctubreT").val(value.n_OCTUBRET),
                        $("#txtNoviembreT").val(value.n_NOVIEMBRET),
                        $("#txtDiciembreT").val(value.n_DICIEMBRET),
                        $("#txtTotalS2T").val(value.n_SEMESTRE2T),
                        $("#txtEneroL").val(value.n_ENEROL),
                        $("#txtFebreroL").val(value.n_FEBREROL),
                        $("#txtMarzoL").val(value.n_MARZOL),
                        $("#txtAbrilL").val(value.n_ABRILL),
                        $("#txtMayoL").val(value.n_MAYOL),
                        $("#txtJunioL").val(value.n_JUNIOL),
                        $("#txtTotalS1L").val(value.n_SEMESTRE1L),
                        $("#txtJulioL").val(value.n_JULIOL),
                        $("#txtAgostoL").val(value.n_AGOSTOL),
                        $("#txtSetiembreL").val(value.n_SETIEMBREL),
                        $("#txtOctubreL").val(value.n_OCTUBREL),
                        $("#txtNoviembreL").val(value.n_NOVIEMBREL),
                        $("#txtDiciembreL").val(value.n_DICIEMBREL),
                        $("#txtTotalS2L").val(value.n_SEMESTRE2L)
                
                       
                } 
            });

        }


    });

});

//LIMPIAR TEXTOS DE FILTROS DE BUSQUEDA
$('#btnReset').click(function () {

    cargardatosTabla();
    LimpiarFiltros();
});

$('#btnSearch').click(function () {
    Filtrar();
});

function Filtrar() {
    $.ajax({
        url: '/Home/FiltrarReinfo?V_RUC=' + $('#txtRucFiltrar').val() + '%&V_PROVEEDOR=%' + encodeURIComponent($('#txtRazonSocialFiltrar').val()) + '%&V_CODCONSECION=' + $('#txtCodConcesionFiltrar').val() + '%&V_NOMCONSECION=' + $('#txNombreConceFiltrar').val() + '%&V_NOMDERECHMINE=' + $('#txtNomDerechoMineroFiltrar').val() + '%&V_FECREINFO=' + $('#txtFechaReinfoFiltrar').val() + '%&V_RESULTADOS=' + $('#cmbResultadoFiltrar').val() + '&N_SEDES=' + $('#cmbSedeFiltrar').val(),
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

        },
        success: function (data) {
            var datos = data.data;
            $_data = datos;
            $_table.bootstrapTable('destroy').bootstrapTable({
                data: $_data,
                columns: [
                    [
                        {
                            field: '',
                            title: '',
                            colspan: 7,
                            align: 'center',
                        },
                        {
                            field: '',
                            title: 'CARGO DECLARACIÓN MINERA',
                            width: 140,
                            colspan: 4,
                            align: 'center',
                        },
                        {
                            field: '',
                            title: '',
                            width: 140,
                            colspan: 1,
                            align: 'center',
                        },
                    ],
                    [
                        {
                            field: '',
                            title: 'DATOS DE REINFO',
                            colspan: 7,
                            align: 'center',
                        },
                        {
                            field: '',
                            title: '2021',
                            width: 140,
                            colspan: 2,
                            align: 'center',
                        },
                        {
                            field: '',
                            title: '2022',
                            width: 140,
                            colspan: 2,
                            align: 'center',
                        },
                        {
                            field: '',
                            title: '',
                            width: 140,
                            colspan: 1,
                            align: 'center',
                        },
                    ],
                    [{
                        field: 'n_SEDE',
                        title: '<label style="width:120px">Sede</label>',
                        formatter: Sede,
                        sortable: true
                    },
                    {
                        field: 'v_RUC',
                        title: 'Ruc',
                        sortable: true
                    },
                    {
                        field: 'v_PROVEEDOR',
                        width: 340,
                        title: '<label style="width:350px">Proveedor</label>',
                        sortable: true,
                    },
                    {
                        field: 'v_CODCONSECION',
                        title: 'Código Concesión',
                        sortable: true,
                    },
                    {
                        field: 'v_NOMCONSECION',
                        title: 'Nombre Concesión',
                        sortable: true,
                    },
                    {
                        field: 'v_NOMDERECHMINE',
                        title: 'Derecho Minero',
                        sortable: true,
                    },
                    {
                        field: 'v_FECREINFO',
                        title: 'Fecha Reinfo',
                        sortable: true,
                    },
                    {
                        field: 'n_CODREINFO',
                        formatter: DecMinera2021S1,
                        title: 'SEMESTRE 1',
                        align: 'center',
                        sortable: true
                    },
                    {
                        field: 'n_CODREINFO',
                        formatter: DecMinera2021S2,
                        title: 'SEMESTRE 2',
                        align: 'center',
                        sortable: true
                    },
                    {
                        field: 'n_CODREINFO',
                        formatter: DecMinera2022S1,
                        title: 'SEMESTRE 1',
                        align: 'center',
                        sortable: true
                    },
                    {
                        field: 'n_CODREINFO',
                        formatter: DecMinera2022S2,
                        title: 'SEMESTRE 2',
                        align: 'center',
                        sortable: true
                    },
                    {
                        field: 'n_CODREINFO',
                        title: '<i class="fa fa-cog text-secondary-d1 text-130"></i>',
                        formatter: formatTableCellActions,
                        width: 50,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    }],
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
                search: false,
                searchAlign: "left",
                //showSearchButton: true,

                sortable: true,

                detailView: false,
                detailFormatter: "detailFormatter",

                pagination: true,
                paginationLoop: false,

                buttonsClass: "outline-default btn-smd bgc-white btn-h-light-primary btn-a-outline-primary py-1",

                showExport: false,
                showPrint: false,
                showColumns: false,
                showFullscreen: false,


                printPageBuilder: function (table) {
                    var bsHref = $('link[rel=stylesheet][href*="/bootstrap.css"], link[rel=stylesheet][href*="/bootstrap.min.css"]').attr('href');
                    //get bootstrap.css

                    return '<html>\
                                <head>\
                                  <link rel="stylesheet" type="text/css" href="'+ bsHref + '">\
                                  <title>AMBIENTES</title>\
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
    
    //Creación de iconos
    function formatTableCellActions(value, row, index, field) {
        if (sedeReinfo == UserSede || UserSede==1) {
            return '<div class="action-buttons">\
                                <a class="text-purple mx-2px" href="#" onclick=getReinfo('+ value + ',0) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div > ';
        } else {
            return '<div class="action-buttons">\
                                <a class="text-purple mx-2px" href="#" onclick=getReinfo('+ value + ',1) >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                              </div > ';
        }
    }

    function DecMinera2021S1(value, row, index, field) {
        var lenghdatos = 0;
        $.ajax({
            async: false,
            url: '/Home/ListaArchivo?N_CODIGAFOM=2&N_CODREIN=' + value + '&V_TIPOIMAG=2021&V_TIPOIGAFOM=SEMESTRE1',
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                lenghdatos = datos.length;
            },
        });
        if (lenghdatos > 0) {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled checked value="second_checkbox">\
                                      </div>';
        } else {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled value="second_checkbox">\
                                      </div>';
        }
    }
    function DecMinera2021S2(value, row, index, field) {
        var lenghdatos = 0;
        $.ajax({
            async: false,
            url: '/Home/ListaArchivo?N_CODIGAFOM=2&N_CODREIN=' + value + '&V_TIPOIMAG=2021&V_TIPOIGAFOM=SEMESTRE2',
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                lenghdatos = datos.length;
            },
        });
        if (lenghdatos > 0) {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled checked value="second_checkbox">\
                                      </div>';
        } else {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled value="second_checkbox">\
                                      </div>';
        }
    }
    function DecMinera2022S1(value, row, index, field) {
        var lenghdatos = 0;
        $.ajax({
            async: false,
            url: '/Home/ListaArchivo?N_CODIGAFOM=2&N_CODREIN=' + value + '&V_TIPOIMAG=2022&V_TIPOIGAFOM=SEMESTRE1',
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                lenghdatos = datos.length;
            },
        });
        if (lenghdatos > 0) {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled checked value="second_checkbox">\
                                      </div>';
        } else {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled value="second_checkbox">\
                                      </div>';
        }
    }
    function DecMinera2022S2(value, row, index, field) {
        var lenghdatos = 0;
        $.ajax({
            async: false,
            url: '/Home/ListaArchivo?N_CODIGAFOM=2&N_CODREIN=' + value + '&V_TIPOIMAG=2022&V_TIPOIGAFOM=SEMESTRE2',
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                //cuenta los elementos del json
                lenghdatos = datos.length;
            },
        });
        if (lenghdatos > 0) {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled checked value="second_checkbox">\
                                      </div>';
        } else {
            return '<div class="action-buttons">\
                                       <input type="checkbox" id="cbox2" disabled value="second_checkbox">\
                                      </div>';
        }
    }
    function Sede(value, row, index, field) {
        var nomSede = ""
        $.ajax({
            async: false,
            url: '/Home/ListaSedes',
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                $(datos).each(function (index, val) {
                    if (val.n_CODSEDE == value) {
                        nomSede = val.v_NOMSEDE;
                        sedeReinfo = value;
                    }
                });
            },
        });
        return '<label>' + nomSede + '</label>';
    }
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

//#endregion
function ListaDepartamentos() {
    $.ajax({
        url: '/Home/ListaDepartamento',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            $('#cmbDepartamento').empty();
            $('#cmbDepartamento').append('<option selected value="0">ELEGIR...</option>');
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#cmbDepartamento').append('<option value=' + value.v_UBIGEO + '>' + value.v_DEP + '</option > ');
            });
            $.ajax({
                url: '/Home/ListaTodasProvincias',
                type: 'GET',
                dataType: 'json',
                data: 'data',
                success: function (data) {
                    $('#cmbProvincia').empty();
                    $('#cmbProvincia').append('<option selected value="0">ELEGIR...</option>');
                    var datos = data.data;
                    $(datos).each(function (index, value) {
                        $('#cmbProvincia').append('<option value=' + value.v_UBIGEO + '>' + value.v_PROV + '</option > ');
                    });
                    $.ajax({
                        url: '/Home/ListaTodosDistritos',
                        type: 'GET',
                        dataType: 'json',
                        data: 'data',
                        success: function (data) {
                            $('#cmbCiudad').empty();
                            $('#cmbCiudad').append('<option selected value="0">ELEGIR...</option>');
                            var datos = data.data;
                            $(datos).each(function (index, value) {
                                $('#cmbCiudad').append('<option value=' + value.v_UBIGEO + '>' + value.v_DIST + '</option > ');
                            });
                        },
                    });
                },
            });
        },
    });
}
function LimpiarFiltros() {
    $('#txtRucFiltrar').val('');
    $('#txtRazonSocialFiltrar').val('');
    $('#txNombreConceFiltrar').val('');
    $('#txtNomDerechoMineroFiltrar').val('');
    $('#txtCodConcesionFiltrar').val('');
    $('#txtFechaReinfoFiltrar').val('');
    $('#txtFechaReinfoFiltrar').val('');
    $('#cmbResultadoFiltrar').val('0');
    $('#cmbSedeFiltrar').val('0');
}


function SumaToneladas1semestre() {
    var txtEneroT = parseFloat($("#txtEneroT").val());
    var txtFebreroT = parseFloat($("#txtFebreroT").val());
    var txtMarzoT = parseFloat($("#txtMarzoT").val());
    var txtAbrilT = parseFloat($("#txtAbrilT").val());
    var txtMayoT = parseFloat($("#txtMayoT").val());
    var txtJunioT = parseFloat($("#txtJunioT").val());
    var txtTotalS1T = parseFloat(txtEneroT + txtFebreroT + txtMarzoT + txtAbrilT + txtMayoT + txtJunioT );
    if (isNaN(txtEneroT)) {
        txtEneroT = parseFloat(0);
    }
    if (isNaN(txtFebreroT)) {
        txtFebreroT = parseFloat(0);
    }
    if (isNaN(txtMarzoT)) {
        txtMarzoT = parseFloat(0);
    }
    if (isNaN(txtAbrilT)) {
        txtAbrilT = parseFloat(0);
    }
    if (isNaN(txtMayoT)) {
        txtMayoT = parseFloat(0);
    }
    if (isNaN(txtJunioT)) {
        txtJunioT = parseFloat(0);
    }
    if (isNaN(txtTotalS1T)) {
        $("#txtTotalS1T").val((txtEneroT + txtFebreroT + txtMarzoT + txtAbrilT + txtMayoT + txtJunioT).toFixed(3));
    } else {
        $("#txtTotalS1T").val(txtTotalS1T.toFixed(3));
    }
}

function SumaToneladas2semestre() {
    var txtJulioT = parseFloat($("#txtJulioT").val());
    var txtAgostoT = parseFloat($("#txtAgostoT").val());
    var txtSetiembreT = parseFloat($("#txtSetiembreT").val());
    var txtOctubreT = parseFloat($("#txtOctubreT").val());
    var txtNoviembreT = parseFloat($("#txtNoviembreT").val());
    var txtDiciembreT = parseFloat($("#txtDiciembreT").val());

    var txtTotalS2T = parseFloat(txtJulioT + txtAgostoT + txtSetiembreT + txtOctubreT + txtNoviembreT + txtDiciembreT);
    if (isNaN(txtJulioT)) {
        txtJulioT = parseFloat(0);
    }
    if (isNaN(txtAgostoT)) {
        txtAgostoT = parseFloat(0);
    }
    if (isNaN(txtSetiembreT)) {
        txtSetiembreT = parseFloat(0);
    }
    if (isNaN(txtOctubreT)) {
        txtOctubreT = parseFloat(0);
    }
    if (isNaN(txtNoviembreT)) {
        txtNoviembreT = parseFloat(0);
    }
    if (isNaN(txtDiciembreT)) {
        txtDiciembreT = parseFloat(0);
    }

    if (isNaN(txtTotalS1T)) {
        $("#txtTotalS2T").val((txtJulioT + txtAgostoT + txtSetiembreT + txtOctubreT + txtNoviembreT + txtDiciembreT).toFixed(3));
    } else {
        $("#txtTotalS2T").val(txtTotalS2T.toFixed(3));
    }
}

function PromLey1semestre() {
    var txtEneroL = parseFloat($("#txtEneroL").val());
    var txtFebreroL = parseFloat($("#txtFebreroL").val());
    var txtMarzoL = parseFloat($("#txtMarzoL").val());
    var txtAbrilL = parseFloat($("#txtAbrilL").val());
    var txtMayoL = parseFloat($("#txtMayoL").val());
    var txtJunioL = parseFloat($("#txtJunioL").val());
    var txtTotalS1L = parseFloat((txtEneroL + txtFebreroL + txtMarzoL + txtAbrilL + txtMayoL + txtJunioL)/6);
    if (isNaN(txtEneroL)) {
        txtEneroL = parseFloat(0);
    }
    if (isNaN(txtFebreroL)) {
        txtFebreroL = parseFloat(0);
    }
    if (isNaN(txtMarzoL)) {
        txtMarzoL = parseFloat(0);
    }
    if (isNaN(txtAbrilL)) {
        txtAbrilL = parseFloat(0);
    }
    if (isNaN(txtMayoL)) {
        txtMayoL = parseFloat(0);
    }
    if (isNaN(txtJunioL)) {
        txtJunioL = parseFloat(0);
    }
    if (isNaN(txtTotalS1L)) {
        $("#txtTotalS1L").val(((txtEneroL + txtFebreroL + txtMarzoL + txtAbrilL + txtMayoL + txtJunioL) / 6).toFixed(3));
    } else {
        $("#txtTotalS1L").val(txtTotalS1L.toFixed(3));
    }
}

function PromLey2semestre() {
    var txtJulioL = parseFloat($("#txtJulioL").val());
    var txtAgostoL = parseFloat($("#txtAgostoL").val());
    var txtSetiembreL = parseFloat($("#txtSetiembreL").val());
    var txtOctubreL = parseFloat($("#txtOctubreL").val());
    var txtNoviembreL = parseFloat($("#txtNoviembreL").val());
    var txtDiciembreL = parseFloat($("#txtDiciembreL").val());
    var txtTotalS2L = parseFloat((txtJulioL + txtAgostoL + txtSetiembreL + txtOctubreL + txtNoviembreL + txtDiciembreL) / 6);
    if (isNaN(txtJulioL)) {
        txtJulioL = parseFloat(0);
    }
    if (isNaN(txtAgostoL)) {
        txtAgostoL = parseFloat(0);
    }
    if (isNaN(txtSetiembreL)) {
        txtSetiembreL = parseFloat(0);
    }
    if (isNaN(txtOctubreL)) {
        txtOctubreL = parseFloat(0);
    }
    if (isNaN(txtNoviembreL)) {
        txtNoviembreL = parseFloat(0);
    }
    if (isNaN(txtDiciembreL)) {
        txtDiciembreL = parseFloat(0);
    }
    if (isNaN(txtTotalS2L)) {
        $("#txtTotalS2L").val(((txtJulioL + txtAgostoL + txtSetiembreL + txtOctubreL + txtNoviembreL + txtDiciembreL) / 6).toFixed(3));
    } else {
        $("#txtTotalS2L").val(txtTotalS2L.toFixed(3));
    }
}


function cargardatosTablaCargoDecMinera(id,condicion){

    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=2&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;

            $_dataDecMin = datos;
            $_tableDecMin.bootstrapTable('destroy').bootstrapTable({
                data: $_dataDecMin,
                columns: [
                    {
                        field: 'v_TIPOIMAG',
                        title: 'AÑO',
                        sortable: true
                    },
                    {
                        field: 'v_TIPOIGAFOM',
                        title: 'SEMESTRE',
                        sortable: true,
                    },
                    {
                        field: 'v_NOMBRE',
                        title: 'Nombre de Archivo',
                        sortable: true,
                    },
                    {
                        field: 'v_NOMBRE',
                        title: '<i class="fa fa-cog text-white-d1 text-130"></i>',
                        formatter: formatTableCellActions2,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                    {
                        field: 'n_CODARCHIVO',
                        title: '<i class="fa fa-cog text-white-d1 text-130"></i>',
                        formatter: formatTableCellActions,
                        width: 140,
                        align: 'center',
                        printIgnore: true,
                        clickToSelect: false,
                    },
                ],

                icons: {
                    columns: 'fa-th-list text-orange-d1',
                    search: 'fa-search text-blue'
                },


                toolbar: "#table-toolbar",
                theadClasses: "bgc-primary-tp2 text-white text-uppercase text-80",
                clickToSelect: true,
                checkboxHeader: true,
                search: false,
                //Alinea la caja de texto busqueda a la izquierda
                searchAlign: "left",
                //showSearchButton: true,
                sortable: false,
                detailView: false,
                detailFormatter: "detailFormatter",
                pagination: true,
                paginationLoop: false,
                buttonsClass: "outline-default btn-smd bgc-white btn-h-light-primary btn-a-outline-primary py-1",
                //sección de exportar
                showExport: false,
                showPrint: false,
                showColumns: false,
                showFullscreen: false,
                //sección de impresión.
                printPageBuilder: function (table) {
                    var bsHref = $('link[rel=stylesheet][href*="/bootstrap.css"], link[rel=stylesheet][href*="/bootstrap.min.css"]').attr('href');
                    //get bootstrap.css

                    return '<html>\
                                <head>\
                                  <link rel="stylesheet" type="text/css" href="'+ bsHref + '">\
                                  <title>ARCHIVOS</title>\
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
        if (condicion == 0) {
            return '<div class="action-buttons">\
                                <a class="text-danger-m1 mx-2px" href="#" onclick=DeleteArchivoDec('+ value + ')>\
                                  <i class="fa fa-trash-alt text-105"></i>\
                                </a>\
                              </div > ';
        } else {
            return '<div class="action-buttons">\
                                  <i class="fa fa-ban text-105"></i>\
                              </div > ';
        }
    }
    function formatTableCellActions2(value, row, index, field) {
        return '<div class="action-buttons">\
                                <a class="text-success mx-2px" style="cursor:pointer;"  id="btnDescarga" onclick="descargar(\'' + value + '\')"   >\
                                  <i class="fa fa-download text-105"></i>\
                                </a></div>';
    }

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
            field: 'n_CODARCHIVO',
            values: ids
        });
        $removeBtn.prop('disabled', true)
    });
}
//function fnValidaSesion() {
//    $.ajax({
//        url: '/Home/ValidaSesion',
//        type: 'POST',
//        //data: { "activo_filtro.VIdactivo": idactivo },
//        success: function (data) {
//            if (data.cod_ret_out < 0) {
//                window.location.replace(data.msg_ope_out)
//                window.opener.document.location = data.msg_ope_out;
//            }
//        }
//    });
//}

function descargar(value) {
    var parametros = "fileName=" + value;
    $.ajax({
        async: false,
        url: '/Home/ConsultaArchivo?' + parametros,
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            if (data == 0) {
                toastr["error"]("Ocurrio un error o no existe el archivo");
            } else {
                w = window.open("/Home/Descargar?" + parametros, "_blank");
                $(w).ready(function () {
                    toastr["success"]("Se descargó el archivo:  " + value);
                });
            }
        }
    });
}


//CÓDIGO QUE SE EJECUTA AL CAMBIAR EL ESTADO DEL BOTON
$("#filesDocMin").change(function () {
        uploadFilesCargoDecMinera('filesDocMin', $("#txtId_IdReinfo").val());
});

function DeleteArchivoDec(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
        title: '¿Esta seguro de eliminar el archivo seleccionado?',
        text: "Eliminar Archivo",
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
                url: '/Home/EliminarArchivoId?N_CODARCHIVO=' + id,
                type: 'POST',
                dataType: 'json',
                data: 'data',
                success: function (data) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se eliminó la imagen seleccionada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    cargardatosTablaCargoDecMinera($("#txtId_IdReinfo").val(),0);
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
//SUBIDA DECLARACION MINERA CARGO
function uploadFilesCargoDecMinera(inputId, id) {
        var input = document.getElementById(inputId);
        var files = input.files;
        var formData = new FormData();
        for (var i = 0; i != files.length; i++) {
            formData.append("files", files[i]);
            formData.append("N_CODREIN", id);
            formData.append("N_CODIGAFOM",2);
            formData.append("V_TIPOARCH", "DECLARACIONMINERA");
            formData.append("V_TIPOIMAG", $("#cmbTipoImag").val()); 
            formData.append("V_TIPOIGAFOM", $("#cmbTipoIgaf").val());  
        }
        $.ajax(
            {
                url: "/Home/PostArchivos",
                data: formData,
                processData: false,
                contentType: false,
                type: "POST",
                success: function (data) {
                    cargardatosTablaCargoDecMinera($("#txtId_IdReinfo").val(),0);
                    $("#filesDocMin").val('');
                    cargardatosTabla();
                }
            }
        );
}

function nombreUsuario() {
    $(document).ready(function () {
        $("#UserName").text('');
        $.ajax({
            url: '/Home/CargarUser', 
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                //UsuarioNom = datos;
                $(datos).each(function (index, value) {
                    UsuarioNom = value.v_LOGIN;
                });
            },
        });
    });
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