var $_table = $('#table');
var $_data = [];
//variable para saber si existe o no representante legal de acuerdo a un proveedor.
var RepLegal = 0;
function cargardatosTabla() {
        $.ajax({
            url: '/Home/ListaAnexo',
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
                $("#liProveedor").addClass('active');
            },
            success: function (data) {
                var datos = data.data;
                $_data = datos;
                $_table.bootstrapTable('destroy').bootstrapTable({
                    data: $_data,
                    columns: [
                        {
                            field: 'v_TPDOC',
                            title: 'TIPO',
                            sortable: true
                        },
                        {
                            field: 'v_CODANE',
                            title: 'RUC',
                            sortable: true
                        },
                        {
                            field: 'v_DESCRI',
                            title: 'Descripción Proveedor',

                            sortable: true,
                        },
                        {
                            field: 'v_DIRE',
                            title: 'Dirección',
                            sortable: true,
                        },
                        {
                            field: 'v_CODANE',
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
                                  <title>PROVEEDORES</title>\
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
                                <a class="text-success mx-2px" href="#" onclick="getProveedor(\'' + value + '\') ">\
                                  <i class="fa fa-pencil-alt text-105"></i>\
                                </a>\
                              </div > ';
        }
    //CODIGO PARA ELIMINAR DE FORMATTABLECELLACTION 
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
        field: 'v_CODANE',
        values: ids
    });

    $removeBtn.prop('disabled', true)
});

}

jQuery(function ($) {
    //initiate the plugin
    cargardatosTabla();
    
    $("#IdCardPerNatural").hide();
    $("#ContentJuridico").hide();
    $("#ContentNatural").hide();
    $("#txtRucProveedor").prop('disabled', true);
   
});

$("#btnCancelar").click(function () {
    LimpiarLabels();
    LimpiarTextos();
});

$("#cmbTipoDoc").change(function () {
    $("#txtRucProveedor").val('');
    if ($("#cmbTipoDoc").val() == "DNI") {
        $("#txtRucProveedor").attr('maxlength', '8');
    } else if ($("#cmbTipoDoc").val() == "RUC")  {
        $("#txtRucProveedor").attr('maxlength', '11');
    }
});

$("#txtRucProveedor").focusout(function () {
    if ($("#cmbTipoDoc").val() == "DNI" && $("#txtRucProveedor").val().length!= 8) {
        toastr["error"]("El dni que ingresó no contienen los 8 dígitos.");
        $("#txtRucProveedor").val('');
    }
    if ($("#cmbTipoDoc").val() == "RUC" && $("#txtRucProveedor").val().length != 11) {
        toastr["error"]("El Ruc que ingresó no contienen los 11 dígitos.");
        $("#txtRucProveedor").val('');
    }
});

$("#cmbTipoPersona").change(function () {
    if ($("#cmbTipoPersona").val() == "0") {
        $("#txtRucProveedor").prop('disabled', true);
    }
    if ($("#cmbTipoPersona").val() != "0" && $("#cmbTipoDoc").val() != "0") {
        $("#txtRucProveedor").prop('disabled', false);
    }
});

$("#cmbTipoDoc").change(function () {
    if ($("#cmbTipoDoc").val() == "0") {
        $("#txtRucProveedor").prop('disabled', true);
    }
    if ($("#cmbTipoPersona").val() != "0" && $("#cmbTipoDoc").val() != "0") {
        $("#txtRucProveedor").prop('disabled', false);
    }
});

//Captura el ID del proveedor para mostrarlo en un modal
function getProveedor(id) {
    if (id == "0") {
        LimpiarLabels();
        LimpiarTextos();
        $("#IdCardPerNatural").hide();
        $("#cmbTipoPersona").attr('disabled', false);
        $("#txtCodRepLegal").prop("disabled", false);
        $("#cmbTipoDocRepLegal").prop("disabled", false);
        $('#TxtIndicador').val(0);
        $("#myModalProveedor").modal({ backdrop: 'static', keyboard: false })
        $("#myModalProveedor").modal('show'); 
    } else {
        LimpiarLabels();
        LimpiarTextos();
        $("#cmbTipoPersona").attr('disabled', true);
        $("#txtCodRepLegal").prop("disabled", false);
        $("#cmbTipoDocRepLegal").prop("disabled", false);
        $.ajax({
            url: '/Home/BuscarProveedor?V_CODANE=' + id,
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                $(datos).each(function (index, value) {
                    $("#txtRucProveedor").val(value.v_CODANE); 
                    $("#txtRazonSocial").val(value.v_DESCRI);
                    $("#cmbTipoDoc").val(value.v_TPDOC);
                    $("#cmbTipoPersona").val(value.v_TPPER);
                    $("#txtTelefono").val(value.v_CEL);
                    $("#txtDireccion").val(value.v_DIRE);
                    $("#txtCorreo").val(value.v_EMAIL);
                    $("#txtApeMatNatural").val(value.v_MAT);
                    $("#txtNombreNatural").val(value.v_NOM);
                    $("#txtApePatNatural").val(value.v_PAT);
                    //AGREGADO POR CAMBIOS PEDIDOS POR EL CLIENTE 15/08/2021
                    $("#txtUsuMem").val(value.v_USUMEM);
                    $("#txtPassMem").val(value.v_CLAVEMEM);
                    $("#txtUsuSunat").val(value.v_USUSUNAT);
                    $("#txtClaveSol").val(value.v_CLAVESUNAT);
                        if (value.v_TPPER == "J") {
                            $("#IdCardPerNatural").show();
                            $("#ContentNatural").hide();
                            $("#ContentJuridico").show();
                        } else if (value.v_TPPER == "N") {
                            $("#IdCardPerNatural").hide();
                            $("#ContentNatural").show();
                            $("#ContentJuridico").hide();
                        }
                          $('#TxtIndicador').val(1);
                         //BUSCAR REPRESENTANTE LEGAL
                            $.ajax({
                                url: '/Home/ListRepLegales?codAnexo=' + $("#txtRucProveedor").val() + '&tipo=P',
                                type: 'GET',
                                dataType: 'json',
                                data: 'data',
                                success: function (data) {
                                    var datos = data.data;
                                    if (datos.length == 0)
                                    {
                                        RepLegal = 0;
                                        if ($("#cmbTipoDoc").val() =="RUC") {
                                            toastr["info"]("El proveedor " + $("#txtRucProveedor").val() + " no cuenta con representante legal");
                                        }
                                    }else{
                                        var datos = data.data;
                                        $(datos).each(function (index, value) {
                                            $("#cmbTipoDocRepLegal").val(value.v_TPDOC);
                                            $("#txtCodRepLegal").val(value.v_CODREP);
                                            $("#txtId_RepLegal").val(value.v_CODREP);
                                            $("#txtNombreRepLegal").val(value.v_NOM);
                                            $("#txtApePatRepLegal").val(value.v_PAT);
                                            $("#txtApeMatRepLegal").val(value.v_MAT);
                                            $("#txtTelefonoRepLegal").val(value.v_TLF);
                                            $("#txtCorreoRepLegal").val(value.v_EMAIL);
                                            $("#txtDireccionRepLegal").val(value.v_DIRE);
                                            $("#txtPassCorreo").val(value.v_PASSEMAIL);
                                        });
                                        RepLegal = 1;
                                    }
                                },
                            });
                        $("#myModalProveedor").modal({ backdrop: 'static', keyboard: false });
                        $("#myModalProveedor").modal('show');
                });
            },
        });
    }
}

function AgregarOeditarProveedor() {
    if (fnValidarProveedor()) {
        if ($('#TxtIndicador').val() == 1) {
                         var EdiProv = {
                            objProv: {
                                 n_CODSEDE: 1,
                                 n_SALDOMN: 0,
                                 n_SALDOUS: 0,
                                 v_CEL: $("#txtTelefono").val(),
                                 v_CODANE: $("#txtRucProveedor").val(),
                                 v_CRETE: '',
                                 v_DESCRI: $("#txtRazonSocial").val(),
                                 v_DIRE: $("#txtDireccion").val(),
                                 v_EMAIL: $("#txtCorreo").val(),
                                 v_EST: 'A',
                                 v_GPO: 'N',
                                 v_MAT: $("#txtApeMatNatural").val(),
                                 v_NOM: $("#txtNombreNatural").val(),
                                 v_PAT: $("#txtApePatNatural").val(),
                                 v_TPANE: 'P',
                                 v_TPDOC: $("#cmbTipoDoc").val(),
                                 v_TPPER: $("#cmbTipoPersona").val(),
                                 v_TLF: $("#txtTelefono").val(),
                                 v_DEP: "",
                                 v_PRO: "",
                                 v_DIS: "",
                                 //agregado por cambiso del cliente
                                 V_USUMEM:$("#txtUsuMem").val(),
                                 v_CLAVEMEM:$("#txtPassMem").val(),
                                 v_USUSUNAT:$("#txtUsuSunat").val(),
                                 v_CLAVESUNAT:$("#txtClaveSol").val()
                            }
                        }
                        $.ajax({
                            url: '/Home/EditarProveedor',
                            type: 'POST',
                            dataType: 'json',
                            data: EdiProv,
                            success: function (data) {
                                if (data.data != null) {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Se Actualizó al proveedor',
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
                                    });
                                }
                                cargardatosTabla();
                                if ($("#cmbTipoDocRepLegal").val() != 0 && $("#txtCodRepLegal").val() != "") {
                                    //SI NO EXISTE EL REP LEGAL DEBERIA AGREGAR 
                                    if (RepLegal == 0) {
                                        AgregarRepLegal();
                                    } else {
                                        ActualizarRepLegal();
                                    }
                                } else {
                                    toastr["info"]("No se detectó acción para guardar a un representante legal");
                                }
                                $("#myModalProveedor").modal('hide');
                                                },
                                            });
                            } else {
                            var RegProv = {
                                objProv: {
                                    n_CODSEDE: 1,
                                    n_SALDOMN: 0,
                                    n_SALDOUS: 0,
                                    v_CEL: $("#txtTelefono").val(),
                                    v_CODANE: $("#txtRucProveedor").val(),
                                    v_CRETE: '',
                                    v_DESCRI: $("#txtRazonSocial").val(),
                                    v_DIRE: $("#txtDireccion").val(),
                                    v_EMAIL: $("#txtCorreo").val(),
                                    v_EST: 'A',
                                    v_GPO: 'N',
                                    v_MAT: $("#txtApeMatNatural").val(),
                                    v_NOM: $("#txtNombreNatural").val(),
                                    v_PAT: $("#txtApePatNatural").val(),
                                    v_TPANE: 'P',
                                    v_TPDOC: $("#cmbTipoDoc").val(),
                                    v_TPPER: $("#cmbTipoPersona").val(),
                                    v_TLF: $("#txtTelefono").val(),
                                    v_DEP: "",
                                    v_PRO: "",
                                    v_DIS: "",
                                    //agregado por cambiso del cliente
                                    V_USUMEM: $("#txtUsuMem").val(),
                                    v_CLAVEMEM: $("#txtPassMem").val(),
                                    v_USUSUNAT: $("#txtUsuSunat").val(),
                                    v_CLAVESUNAT: $("#txtClaveSol").val()
                                }
                            }
                            $.ajax({
                                url: '/Home/AgregarProveedor',
                                type: 'POST',
                                dataType: 'json',
                                data:  RegProv,
                                success: function (data) {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Se guardó el Proveedor',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    //agregar representante legal
                                    if ($("#cmbTipoDocRepLegal").val() != 0 && $("#txtCodRepLegal").val() != ""){
                                        var RegRep = {
                                            objRep: {
                                                V_TPDOC: $("#cmbTipoDocRepLegal").val(),
                                                V_CODREP: $("#txtCodRepLegal").val(),
                                                V_CODANE: $("#txtRucProveedor").val(),
                                                V_PAT: $("#txtApePatRepLegal").val(),
                                                V_MAT: $("#txtApeMatRepLegal").val(),
                                                V_NOM: $("#txtNombreRepLegal").val(),
                                                V_DESCRI: '',
                                                V_TLF: $("#txtTelefonoRepLegal").val(),
                                                V_EMAIL: $("#txtCorreoRepLegal").val(),
                                                V_DIRE: $("#txtDireccionRepLegal").val(),
                                                V_CARGO: '',
                                                V_PASSEMAIL: $("#txtPassCorreo").val()
                                            }
                                        }
                                        $.ajax({
                                            url: '/Home/InsertRepLegales',
                                            type: 'POST',
                                            dataType: 'json',
                                            data: RegRep,
                                            success: function (data) {
                                                var datos = data.data;
                                                toastr["success"]("Se Agregó un representante Legal");
                                            },
                                        });
                                    }
                                    LimpiarTextos();
                                    cargardatosTabla();
                                    $("#myModalProveedor").modal('hide');
                                },
                            });
                }
    }
}

function AgregarRepLegal() {
        var RegRep = {
            objRep: {
                V_TPDOC: $("#cmbTipoDocRepLegal").val(),
                V_CODREP: $("#txtCodRepLegal").val(),
                V_CODANE: $("#txtRucProveedor").val(),
                V_PAT: $("#txtApePatRepLegal").val(),
                V_MAT: $("#txtApeMatRepLegal").val(),
                V_NOM: $("#txtNombreRepLegal").val(),
                V_DESCRI: '',
                V_TLF: $("#txtTelefonoRepLegal").val(),
                V_EMAIL: $("#txtCorreoRepLegal").val(),
                V_DIRE: $("#txtDireccionRepLegal").val(),
                V_CARGO: '',
                V_PASSEMAIL: $("#txtPassCorreo").val()
            }
        }
        $.ajax({
            url: '/Home/InsertRepLegales',
            type: 'POST',
            dataType: 'json',
            data: RegRep,
            success: function (data) {
                var datos = data.data;
                toastr["success"]("Se Agregó el representante Legal");
            },
        });
}

function ActualizarRepLegal() {
        var EditRep = {
            objRep: {
                V_TPDOC: $("#cmbTipoDocRepLegal").val(),
                V_CODREP: $("#txtCodRepLegal").val(),
                V_CODANE: $("#txtRucProveedor").val(),
                V_PAT: $("#txtApePatRepLegal").val(),
                V_MAT: $("#txtApeMatRepLegal").val(),
                V_NOM: $("#txtNombreRepLegal").val(),
                V_DESCRI: '',
                V_TLF: $("#txtTelefonoRepLegal").val(),
                V_EMAIL: $("#txtCorreoRepLegal").val(),
                V_DIRE: $("#txtDireccionRepLegal").val(),
                V_CARGO: '',
                V_PASSEMAIL: $("#txtPassCorreo").val(),
                V_SETID: $("#txtId_RepLegal").val(),
            }
        }
        $.ajax({
            url: '/Home/UpdateRepLegales',
            type: 'POST',
            dataType: 'json',
            data: EditRep,
            success: function (data) {
                var datos = data.data;
                toastr["success"]("Se Actualizó el representante Legal");
            },
        });
}

function DeleteProveedor(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
        title: 'Esta seguro de eliminar al Proveedor?',
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
                url: '/Home/EliminarProveedor?V_CODANE=' + id,
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

function fnValidarProveedor() {
    var isSave = true;
    var txtRucProveedor = $("#txtRucProveedor").val().trim();
    var txtRazonSocial = $("#txtRazonSocial").val().trim();
    //var txtNombreRepre = $("#txtNombreRepre").val().trim();
    //var txtDNI = $("#txtDNI").val().trim();
    var txtDireccion = $("#txtDireccion").val().trim();
    //var txtTelefono = $("#txtTelefono").val().trim();
    //var txtCorreo = $("#txtCorreo").val().trim();
    var cmbTipoDoc = $("#cmbTipoDoc").val();
    var cmbTipoPersona = $("#cmbTipoPersona").val();
    
    
    if (txtRucProveedor == "") {
        isSave = false;
        $('#lblErrortxtRucProveedor').css("display", "block");
        $("#lblErrortxtRucProveedor").text("(*) Datos Obligatorios");
        $("#txtRucProveedor").addClass("brc-danger-m1 pr-45 pl-25");
    }
    else {
        $('#lblErrortxtRucProveedor').css("display", "none");
        $("#lblErrortxtRucProveedor").text("");
        $("#txtRucProveedor").removeClass("brc-danger-m1 pr-45 pl-25");
    }

    if (txtRazonSocial == "") {
        isSave = false;
        $('#lblErrortxtRazonSocial').css("display", "block");
        $("#lblErrortxtRazonSocial").text("(*) Datos Obligatorios");
        $("#txtRazonSocial").addClass("brc-danger-m1 pr-45 pl-25");
        toastr["error"]("Se debe agregar razón social o nombres del proveedor");
    }
    else {
        $('#lblErrortxtRazonSocial').css("display", "none");
        $("#lblErrortxtRazonSocial").text("");
        $("#txtRazonSocial").removeClass("brc-danger-m1 pr-45 pl-25");
    }

    if (txtDireccion == "") {
        isSave = false;
        $('#lblErrortxtDireccion').css("display", "block");
        $("#lblErrortxtDireccion").text("(*) Datos Obligatorios");
        $("#txtDireccion").addClass("brc-danger-m1 pr-45 pl-25");
    }
    else {
        $('#lblErrortxtDireccion').css("display", "none");
        $("#lblErrortxtDireccion").text("");
        $("#txtDireccion").removeClass("brc-danger-m1 pr-45 pl-25");
    }

    if (cmbTipoDoc == "0") {
        isSave = false;
        $('#lblErrorcmbTipoDoc').css("display", "block");
        $("#lblErrorcmbTipoDoc").text("(*) Datos Obligatorios");
        $("#cmbTipoDoc").addClass("brc-danger-m1 pr-45 pl-25");
    }
    else {
        $('#lblErrorcmbTipoDoc').css("display", "none");
        $("#lblErrorcmbTipoDoc").text("");
        $("#cmbTipoDoc").removeClass("brc-danger-m1 pr-45 pl-25");
    }

    if (cmbTipoPersona == "0") {
        isSave = false;
        $('#lblErrorcmbTipoPersona').css("display", "block");
        $("#lblErrorcmbTipoPersona").text("(*) Datos Obligatorios");
        $("#cmbTipoPersona").addClass("brc-danger-m1 pr-45 pl-25");
    }
    else {
        $('#lblErrorcmbTipoPersona').css("display", "none");
        $("#lblErrorcmbTipoPersona").text("");
        $("#cmbTipoPersona").removeClass("brc-danger-m1 pr-45 pl-25");
    }
    return isSave;
}

function validateEmail(emailaddress) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(emailaddress)) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Debe colocar un correo válido',
            showConfirmButton: false,
            timer: 1500
        });
        $("#txtCorreo").val('');
    }
}
// #region VALIDA QUE SOLO INGRESE NUMEROS
$('.input-number').on('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// #region VALIDA CORREO BIEN ESCRITO CUANDO SALE DE FOCO
$("#txtCorreo").blur(function () {
    var email = $("#txtCorreo").val();
    validateEmail(email);
});
//#endregion

// #region VALIDA SI EXISTE PROVEEDOR
$("#txtRucProveedor").blur(function () {
    if ($('#TxtIndicador').val() == 0) {
        $.ajax({
            url: '/Home/BuscarProveedor?V_CODANE=' + $("#txtRucProveedor").val().trim(),
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                if (datos.n_CODSEDE != null) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Ya existe ese número de documento',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $("#txtRucProveedor").val('');
                }
            },
        });
    }
});
//#endregion

//LIMPIA LABELS DE ERROR
function LimpiarLabels() {
    $('#lblErrortxtRucProveedor').css("display", "none");
    $("#lblErrortxtRucProveedor").text("");
    $("#txtRucProveedor").removeClass("brc-danger-m1 pr-45 pl-25");

    $('#lblErrortxtRazonSocial').css("display", "none");
    $("#lblErrortxtRazonSocial").text("");
    $("#txtRazonSocial").removeClass("brc-danger-m1 pr-45 pl-25");

    $('#lblErrortxtNombreRepre').css("display", "none");
    $("#lblErrortxtNombreRepre").text("");
    $("#txtNombreRepre").removeClass("brc-danger-m1 pr-45 pl-25");

    $('#lblErrortxtDNI').css("display", "none");
    $("#lblErrortxtDNI").text("");
    $("#txtDNI").removeClass("brc-danger-m1 pr-45 pl-25");

    $('#lblErrortxtDireccion').css("display", "none");
    $("#lblErrortxtDireccion").text("");
    $("#txtDireccion").removeClass("brc-danger-m1 pr-45 pl-25");

    $('#lblErrortxtTelefono').css("display", "none");
    $("#lblErrortxtTelefono").text("");
    $("#txtTelefono").removeClass("brc-danger-m1 pr-45 pl-25");

    $('#lblErrortxtCorreo').css("display", "none");
    $("#lblErrortxtCorreo").text("");
    $("#txtCorreo").removeClass("brc-danger-m1 pr-45 pl-25");
    
    $('#lblErrorcmbTipoDoc').css("display", "none");
    $("#lblErrorcmbTipoDoc").text("");
    $("#cmbTipoDoc").removeClass("brc-danger-m1 pr-45 pl-25");
 
    $('#lblErrorcmbTipoPersona').css("display", "none");
    $("#lblErrorcmbTipoPersona").text("");
    $("#cmbTipoPersona").removeClass("brc-danger-m1 pr-45 pl-25");
}

//LIMPIA TEXTO
function LimpiarTextos() {
    $("#txtRucProveedor").val('');
    $("#txtRazonSocial").val('');
    $("#txtNombreNatural").val('');
    $("#txtApePatNatural").val('');
    $("#txtApeMatNatural").val('');
    $("#cmbTipoPersona").val('0');
    $("#cmbTipoDoc").val('0');
    $("#txtDireccion").val('');
    $("#txtTelefono").val('');
    $("#txtCorreo").val('');

    $("#cmbTipoDocRepLegal").val('0');
    $("#txtCodRepLegal").val('');
    $("#txtNombreRepLegal").val('');
    $("#txtApePatRepLegal").val('');
    $("#txtApeMatRepLegal").val('');
    $("#txtTelefonoRepLegal").val('');
    $("#txtCorreoRepLegal").val('');
    $("#txtDireccionRepLegal").val('');
    $("#txtPassCorreo").val('');
    $("#txtId_RepLegal").val('');
    
    $("#txtUsuMem").val('');
    $("#txtPassMem").val('');
    $("#txtUsuSunat").val('');
    $("#txtClaveSol").val('');
}

//AL ELEGIR TIPO DE PERSONA
$("#cmbTipoPersona").change(function () {
    if ($("#cmbTipoPersona").val() == "J") {
        $("#IdCardPerNatural").show();
        $("#ContentJuridico").show();
        $("#ContentNatural").hide();
        $("#txtCodRepLegal").prop('disabled', true);
    } else if ($("#cmbTipoPersona").val() == "N") {
        $("#IdCardPerNatural").hide();
        $("#ContentJuridico").hide();
        $("#ContentNatural").show();
    } 
});

// #region CONCATENAR NOMBRES Y APELLIDOS EN RAZON SOCIAL
var nombre = "";
var apellidoPat = "";
var apellidoMat = "";
$('#txtNombreNatural').keyup(function () {
    nombre = $('#txtNombreNatural').val();
    $('#txtRazonSocial').val(apellidoPat + ' ' + apellidoMat + ', ' + nombre);
});
$('#txtApePatNatural').keyup(function () {
    apellidoPat = $('#txtApePatNatural').val();
    $('#txtRazonSocial').val(apellidoPat + ' ' + apellidoMat + ', ' + nombre);
});
$('#txtApeMatNatural').keyup(function () {
    apellidoMat = $('#txtApeMatNatural').val();
    $('#txtRazonSocial').val(apellidoPat + ' ' + apellidoMat + ', ' + nombre);
});
//#endregion

//AL REALIZAR CAMBIO DEL COMBO DEL REPRESENTANTE LEGAL
$("#cmbTipoDocRepLegal").change(function () {
    if ($("#cmbTipoDocRepLegal").val() == "DNI") {
        $("#txtCodRepLegal").attr('maxlength', 8);
        $("#txtCodRepLegal").prop('disabled', false);
        $("#txtCodRepLegal").val('');
    } else if ($("#cmbTipoDocRepLegal").val() == "RUC") {
        $("#txtCodRepLegal").attr('maxlength', 11);
        $("#txtCodRepLegal").prop('disabled', false);
        $("#txtCodRepLegal").val('')
    } else {
        $("#txtCodRepLegal").attr('maxlength', 0);
        $("#txtCodRepLegal").prop('disabled', true);
        $("#txtCodRepLegal").val('');
    }
});

$("#txtCodRepLegal").focusout(function () {
    if ($("#cmbTipoDocRepLegal").val() == "DNI" && $("#txtCodRepLegal").val().length != 8) {
        toastr["error"]("El DNI que ingresó no contiene los 8 dígitos.");
        $("#txtCodRepLegal").val('');
    }
    if ($("#cmbTipoDocRepLegal").val() == "RUC" && $("#txtCodRepLegal").val().length != 11) {
        toastr["error"]("El Ruc que ingresó no contiene los 11 dígitos.");
        $("#txtCodRepLegal").val('');
    }
});

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