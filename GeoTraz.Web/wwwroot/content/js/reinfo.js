
//VARIABLES GLOBALES
var UsuarioNom = '';
var $_table = $('#table');
var $_data = [];
//TABLA DE PROVEEDORES
var $_table2 = $('#table2');
var $_data2 = [];
//TABLA DE CONCESIONES
var $_table3 = $('#table3');
var $_data3 = [];
var $_table3 = $('#table3');
var $_data3 = [];

var $_tablefile1 = $('#tablefiles1');
var $_datafile1 = [];
var $_tablefile2 = $('#tablefiles2');
var $_datafile2 = [];
var $_tablefile3 = $('#tablefiles3');
var $_datafile3 = [];
var $_tablefileIngemmet= $('#tablefilesingemmet');
var $_datafileIngemmet = [];

var $_tablefileCampo = $('#tablefilesCampo');
var $_datafileCampo = [];
var sedeReinfo = 0;
var UserSede = 0;
//VERSION DE REINFO 
var VERSIONREINFO = "";

//VARIABLE DE DOCUMENTOS INGEMMET
var formDataIngemmet = new FormData();

$("#txtFechaReinfo").focusout(function () {
    var fecha = $("#txtFechaReinfo").val();
    var fechaFormato = fecha.split("-");
    var day = fechaFormato[2];
    var month = fechaFormato[1];
    var year = fechaFormato[0];
    var fechaCorrecta = day + '/' + month + '/' + year

    if (validarFormatoFecha(fechaCorrecta) && year > 1999) {
        if (existeFecha(fechaCorrecta)) {

        } else {

        }
    } else {

        toastr["error"]("El formato de la fecha es incorrecto.");
        $("#txtFechaReinfo").val('');
    }
});

//VERIFICA SI EXISTE LA FECHA
function existeFecha(fecha) {
    var fechaf = fecha.split("/");
    var day = fechaf[0];
    var month = fechaf[1];
    var year = fechaf[2];
    var date = new Date(year, month, '0');

    if ((day - 0) > (date.getDate() - 0)) {
        return false;
    }
    return true;
}
//VALIDA FORMATO FECHA
function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {
        return true;
    } else {
        return false;
    }
}

//TABLA DE REINFO
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
                $('#liReinfo').addClass('active');
                fnCargarNoticia();
               
            },
            success: function (data) {
                var datos = data.data;
                $_data = datos;
                $_table.bootstrapTable('destroy').bootstrapTable({
                    data: $_data,
                     
                    columns: [
                        {
                            field: 'n_SEDE',
                            title: 'SEDE',
                            formatter: Sede,
                            sortable: true
                        },
                        {
                            field: 'v_RESULTADOS',
                            title: '<label style="width:90px">RESULTADO</label>',
                            formatter: RESULTADO,
                            sortable: true
                        },
                        {
                            field: 'v_RUC',
                            title: 'Ruc',
                            sortable: true
                        },
                        {
                            field: 'v_ESTADOIGAFOM',
                            title: 'Estado Proveedor',
                            sortable: true
                        },
                        {
                            field: 'v_PROVEEDOR',
                            title: 'Razón Social',

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


    function formatTableCellActions(value, row, index, field) {

        if (sedeReinfo == UserSede || UserSede == 1) {
            if (UsuarioNom.substr(0, 2) == "TZ" || UsuarioNom.substr(0, 2) == "tz") {
               return '<div class="action-buttons">\
                               <a class="text-purple-m1 mx-2px" href="#" onclick=PrintReinfo('+ value + ',1)>\
                                 <i class="fa fa-print text-105"></i>\
                               </a>\
                             </div > ';
            }
            return '<div class="action-buttons">\
                                <a class="text-success mx-2px" href="#" onclick=getReinfo('+ value + ') >\
                                  <i class="fa fa-pencil-alt text-105"></i>\
                                </a>\
                                <a class="text-danger-m1 mx-2px"  href="#" onclick=DeleteReinfo('+ value + ')>\
                                  <i class="fa fa-trash-alt text-105"></i>\
                                </a>\
                                <a class="text-purple-m1 mx-2px" href="#" onclick=PrintReinfo('+ value + ',0)>\
                                  <i class="fa fa-print text-105"></i>\
                                </a>\
                              </div > ';
        } else {
            return '<div class="action-buttons">\
                                <a class="text-purple-m1 mx-2px" href="#" onclick=PrintReinfo('+ value + ',1)>\
                                  <i class="fa fa-print text-105"></i>\
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
    function RESULTADO(value, row, index, field) {

        if (value == "TRAZABLE") {
            return '<label  style="color:#2ECC71;">TRAZABLE</label>';
        } else if (value == "PENDIENTE") {
            return '<label  style="color:#F1C40F;">PENDIENTE</label>';
        }
        else if (value == "NO TRAZABLE") {
            return '<label  style="color:#E74C3C;">NO TRAZABLE</label>';
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
//TABLA DE PROVEEDORES
function cargardatosTabla2() {

    $.ajax({
        url: '/Home/ListaAnexo',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {

            var datos = data.data;


            $_data2 = datos;
            $_table2.bootstrapTable('destroy').bootstrapTable({
                data: $_data2,


                columns: [

                    {
                        field: 'v_CODANE',
                        title: 'RUC',

                        sortable: true
                    },
                    {
                        field: 'v_DESCRI',
                        title: 'RAZÓN SOCIAL',

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
                                <a class="text-blue mx-2px" href="#" onclick="getProveedor(\'' + value + '\')"  >\
                                  <i class="fa fa-check-circle"> Seleccionar</i>\
                                </a>\
                               </div > ';
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
            field: 'v_CODANE',
            values: ids
        });

        $removeBtn.prop('disabled', true)
    });


}
//TABLA DE CONCESIONES
function cargardatosTabla3() {

    $.ajax({
        url: '/Home/ListaConcesiones?estado=A&nombres=%&sede=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {

            var datos = data.data;
            $_data3 = datos;
            $_table3.bootstrapTable('destroy').bootstrapTable({
                data: $_data3,
                columns: [
                    {
                        field: 'v_CODCONCESION',
                        title: 'CÓDIGO DE CONCESIÓN:',

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
                                  <title>REPORTE</title>\
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
                                <a class="text-blue mx-2px" href="#" onclick="getConcesion(\'' + value + '\') ">\
                                  <i class="fa fa-check-circle"> Seleccionar</i>\
                                </a>\
                              </div > ';
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
//TABLA DE LABOR
function cargardatosTablafile1(id) {

    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=0&N_CODREIN=' + id +'&V_TIPOIMAG=LABOR&V_TIPOIGAFOM=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;

            
            $_datafile1 = datos;
            $_tablefile1.bootstrapTable('destroy').bootstrapTable({
                data: $_datafile1,

                columns: [

                    {
                        field: 'v_TIPOARCH',
                        title: 'Tipo de Archivo',

                        sortable: true
                    },
                    {
                        field: 'v_TIPOIMAG',
                        title: 'Tipo de imagen',

                        sortable: true,
                    },
                    {
                        field: 'v_NOMBRE',
                        title: 'Nombre de Imagen',
                        formatter: formatNombreImg,
                        sortable: true,
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
                searchAlign: "left",
                //showSearchButton: true,

                sortable: false,

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
        return '<div class="action-buttons">\
                                <a class="text-success mx-2px" href="#" onclick=getArchivo('+ value + ') >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                                <a class="text-danger-m1 mx-2px" href="#" onclick=DeleteArchivo('+ value + ')>\
                                  <i class="fa fa-trash-alt text-105"></i>\
                                </a>\
                              </div > ';
    }
    function formatNombreImg(value, row, index, field) {
        return '<label>' + value.substr(0, value.indexOf('_')) +'</label>';
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
//TABLA EQUIPOS
function cargardatosTablafile2(id) {

    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=0&N_CODREIN=' + id + '&V_TIPOIMAG=EQUIPOS&V_TIPOIGAFOM=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;

            $_datafile2 = datos;
            $_tablefile2.bootstrapTable('destroy').bootstrapTable({
                data: $_datafile2,

                columns: [

                    {
                        field: 'v_TIPOARCH',
                        title: 'Tipo de Archivo',

                        sortable: true
                    },
                    {
                        field: 'v_TIPOIMAG',
                        title: 'Tipo de imagen',

                        sortable: true,
                    },
                    {
                        field: 'v_NOMBRE',
                        title: 'Nombre de Imagen',
                        formatter: formatNombreImg,
                        sortable: true,
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
                searchAlign: "left",
                //showSearchButton: true,

                sortable: false,

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
        return '<div class="action-buttons">\
                                <a class="text-success mx-2px" href="#" onclick=getArchivo('+ value + ') >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                                <a class="text-danger-m1 mx-2px" href="#" onclick=DeleteArchivo('+ value + ')>\
                                  <i class="fa fa-trash-alt text-105"></i>\
                                </a>\
                              </div > ';
    }

    function formatNombreImg(value, row, index, field) {
        return '<label>' + value.substr(0, value.indexOf('_')) + '</label>';
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
//TABLA AMBIENTE
function cargardatosTablafile3(id) {

    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=0&N_CODREIN=' + id + '&V_TIPOIMAG=AMBIENTE&V_TIPOIGAFOM=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;

            $_datafile3 = datos;
            $_tablefile3.bootstrapTable('destroy').bootstrapTable({
                data: $_datafile3,

                columns: [

                    {
                        field: 'v_TIPOARCH',
                        title: 'Tipo de Archivo',

                        sortable: true
                    },
                    {
                        field: 'v_TIPOIMAG',
                        title: 'Tipo de imagen',

                        sortable: true,
                    },
                    {
                        field: 'v_NOMBRE',
                        title: 'Nombre de Imagen',
                        formatter: formatNombreImg,
                        sortable: true,
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
                searchAlign: "left",
                //showSearchButton: true,

                sortable: false,

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
        return '<div class="action-buttons">\
                                <a class="text-success mx-2px" href="#" onclick=getArchivo('+ value + ') >\
                                  <i class="fa fa-search text-105"></i>\
                                </a>\
                                <a class="text-danger-m1 mx-2px" href="#" onclick=DeleteArchivo('+ value + ')>\
                                  <i class="fa fa-trash-alt text-105"></i>\
                                </a>\
                              </div > ';
    }

    function formatNombreImg(value, row, index, field) {
        return '<label>' + value.substr(0, value.indexOf('_')) + '</label>';
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
//TABLA INGEMMET
function cargardatosTablafileIngemmet(id) {
    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=3&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=INGEMMET',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $_datafileIngemmet = datos;
            $_tablefileIngemmet.bootstrapTable('destroy').bootstrapTable({
                data: $_datafileIngemmet,
                columns: [
                    {
                        field: 'v_TIPOARCH',
                        title: 'Tipo de Archivo',
                        sortable: true
                    },
                    {
                        field: 'v_TIPOIMAG',
                        title: 'Tipo de imagen',

                        sortable: true,
                    },
                    {
                        field: 'v_NOMBRE',
                        title: 'Nombre de documento',
                        formatter: formatNombreImg,
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
                theadClasses: "bgc-info-tp2 text-white text-uppercase text-80",
                clickToSelect: true,

                checkboxHeader: true,
                search: false,
                searchAlign: "left",
                //showSearchButton: true,

                sortable: false,

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
        return '<div class="action-buttons">\
        <a class="text-danger-m1 mx-2px" href="#" onclick=DeleteArchivo('+ value + ') >\
        <i class="fa fa-trash-alt text-105"></i>\
                                </a >\
                              </div >';

        //<a class="text-success mx-2px" href="#" onclick=getArchivo('+ value + ') >\
        //<i class="fa fa-search text-105"></i>\
        //                        </a >\
        //                      </div >
    }
    function formatTableCellActions2(value, row, index, field) {


        return '<div class="action-buttons">\
                                <a class="text-success mx-2px" style="cursor:pointer;"  id="btnDescarga" onclick="descargar(\'' + value + '\')"   >\
                                  <i class="fa fa-download text-105"></i>\
                                </a></div>';
    }

    function formatNombreImg(value, row, index, field) {
        return '<label>' + value + '</label>';
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
//TABLA DE CAMPO
function cargardatosTablafileCampo(id) {
    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=4&N_CODREIN=' + id + '&V_TIPOIMAG=CAMPO&V_TIPOIGAFOM=CAMPO',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $_datafileCampo = datos;
            $_tablefileCampo.bootstrapTable('destroy').bootstrapTable({
                data: $_datafileCampo,
                columns: [
                    {
                        field: 'v_TIPOARCH',
                        title: 'Tipo de Archivo',
                        sortable: true
                    },
                    //{
                    //    field: 'v_TIPOIMAG',
                    //    title: 'Tipo de imagen',
                    //    sortable: true,
                    //},
                    {
                        field: 'v_NOMBRE',
                        title: 'Nombre de documento',
                        formatter: formatNombreImg,
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
                theadClasses: "bgc-success-tp2 text-white text-uppercase text-80",
                clickToSelect: true,

                checkboxHeader: true,
                search: false,
                searchAlign: "left",
                //showSearchButton: true,

                sortable: false,

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
        return '<div class="action-buttons">\
        <a class="text-danger-m1 mx-2px" href="#" onclick=DeleteArchivo('+ value + ') >\
        <i class="fa fa-trash-alt text-105"></i>\
                                </a >\
                              </div >';

        //<a class="text-success mx-2px" href="#" onclick=getArchivo('+ value + ') >\
        //<i class="fa fa-search text-105"></i>\
        //                        </a >\
        //                      </div >
    }
    function formatTableCellActions2(value, row, index, field) {


        return '<div class="action-buttons">\
                                <a class="text-success mx-2px" style="cursor:pointer;"  id="btnDescarga" onclick="descargar(\'' + value + '\')"   >\
                                  <i class="fa fa-download text-105"></i>\
                                </a></div>';

    }

    function formatNombreImg(value, row, index, field) {
        return '<label>' + value + '</label>';
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

//AL CARGAR LA OCUPACIÓN
jQuery(function ($) {
    nombreUsuario();
    //initiate the plugin
    cargardatosTabla();
    cargardatosTabla2();
    cargardatosTabla3();

    ListaDepartamentos();
    ListaDepartamentosPrint();
    $("#BtnAgregarReinfo").css("display", "none");
    $("#cmbProvincia").prop("disabled", true);
    $("#cmbCiudad").prop("disabled", true);
    ListaSedes();
    ListaSedesPrint();
    ListaSedesFiltrar();

    $("#btnDerechaHerr").prop("disabled", true);
    $("#btnIzquierdaHerr").prop("disabled", true);
    $("#btnDerechaAmb").prop("disabled", true);
    $("#btnIzquierdaAmb").prop("disabled", true);

    //linea de codigo prueba de version y cambio de versiones
    $.ajax({
        url: '/Home/DatosVersionTrazabilidad',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                if (value.v_TGCOD == "FEC") {
                   // $('#lblFechaPrint').text(value.v_TGNOM);
                } else if (value.v_TGCOD == "PTC") {
                    //$('#lblProtocolo').text(value.v_TGNOM);
                }
                else if (value.v_TGCOD == "VER") {
                   // $('#lblVersionPrint').text(value.v_TGNOM);
                    //alert(value.v_TGNOM);
                    VERSIONREINFO = value.v_TGNOM;
                    if (VERSIONREINFO == '002') {
                        crearModalV2();
                    }else if (VERSIONREINFO == '003') {
                        crearModalV3();
                    }
                }
            });
        }
    });
    //cargar sede de usuario;
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
                UsuarioNom = value.v_LOGIN;
                if (UsuarioNom.substr(0, 2) == "TZ" || UsuarioNom.substr(0, 2) == "tz") {
                    $("#BtnAgregarReinfo").css("display", "none");
                } else {
                    $("#BtnAgregarReinfo").css("display", "block");
                }
            });
        },
    });
});

//#region CARGAR COMBOS
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
function ListaSedes() {
    $.ajax({
        async:false,
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
function ListaDepartamentosPrint() {
    $.ajax({
        async: false,
        url: '/Home/ListaDepartamento',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            $('#cmbDepartamentoPrint').empty();
            $('#cmbDepartamentoPrint').append('<option selected value="0">ELEGIR...</option>');
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#cmbDepartamentoPrint').append('<option value=' + value.v_UBIGEO + '>' + value.v_DEP + '</option > ');
            });
            $.ajax({
                async: false,
                url: '/Home/ListaTodasProvincias',
                type: 'GET',
                dataType: 'json',
                data: 'data',
                success: function (data) {
                    $('#cmbProvinciaPrint').empty();
                    $('#cmbProvinciaPrint').append('<option selected value="0">ELEGIR...</option>');
                    var datos = data.data;
                    $(datos).each(function (index, value) {
                        $('#cmbProvinciaPrint').append('<option value=' + value.v_UBIGEO + '>' + value.v_PROV + '</option > ');
                    });
                    $.ajax({
                        async: false,
                        url: '/Home/ListaTodosDistritos',
                        type: 'GET',
                        dataType: 'json',
                        data: 'data',
                        success: function (data) {
                            $('#cmbCiudadPrint').empty();
                            $('#cmbCiudadPrint').append('<option selected value="0">ELEGIR...</option>');
                            var datos = data.data;
                            $(datos).each(function (index, value) {
                                $('#cmbCiudadPrint').append('<option value=' + value.v_UBIGEO + '>' + value.v_DIST + '</option > ');
                            });
                        },
                    });
                },
            });
        },
    });
}
function ListaSedesPrint() {
    $.ajax({
        url: '/Home/ListaSedes',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $('#cmbSedePrint').empty();
            $('#cmbSedePrint').append('<option selected value="0">ELEGIR...</option>');
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#cmbSedePrint').append('<option value=' + value.n_CODSEDE + '>' + value.v_NOMSEDE + '</option > ');
            });
        }
    });
}

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

    //PRUEBA DE FETCH Y JAVASCRITP PURO

    //let element = document.getElementById('cmbSedeFiltrar');
    //fetch('/Home/ListaSedes')
    //    .then(response => response.json())
    //    .then(data => {
    //        data.forEach(obj => {
    //            Object.entries(obj).forEach(([key, value]) => {
    //                console.log(`${key} ${value}`);
    //            });
    //            console.log('-------------------');
    //        });
    //    }).catch(err => console.log(err));
  
}
function ListaFirmantesRealizado() {
    $.ajax({
        async: false,
        url: '/Home/ListaFirmantes?V_DNI=%', 
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $('#cmbRealizadopor').empty();
            $('#cmbRealizadopor').append('<option selected value="0">ELEGIR...</option>');
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#cmbRealizadopor').append('<option value=' + value.v_DNI + '>' + value.v_NOMBRES + '</option > ');
            });
        }
    });
}
function ListaFirmantesRevisado() {
    $.ajax({
        async: false,
        url: '/Home/ListaFirmantes?V_DNI=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $('#cmbRevisadopor').empty();
            $('#cmbRevisadopor').append('<option selected value="0">ELEGIR...</option>');
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#cmbRevisadopor').append('<option value=' + value.v_DNI + '>' + value.v_NOMBRES + '</option > ');
            });
        }
    });
}
$("#cmbDepartamento").change(function () {
    var codDep = $("#cmbDepartamento").val();
    $.ajax({
        url: '/Home/ListaProvincias?v_DEP=' + codDep.substring(0, 2),
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
            $("#cmbProvincia").prop("disabled", false);
        },
    });
    ValidaSiExiste();
});
$("#cmbProvincia").change(function () {
    var codDep = $("#cmbProvincia").val();
    $.ajax({
        url: '/Home/ListaDistritos?v_PROV=' + codDep.substring(0, 4),
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            $('#cmbCiudad').empty();
            $('#cmbCiudad').append('<option selected value="0">ELEGIR...</option>');
            var datos = data.data;
            $(datos).each(function (index, value) {
                if (value.v_DIST != "") {
                    $('#cmbCiudad').append('<option value=' + value.v_UBIGEO + '>' + value.v_DIST + '</option > ');
                }
            });
            $("#cmbCiudad").prop("disabled", false);
        },
    });
});
//#endregion

//EXPORTAR EN EXCEL
$('#btnExportar').click(function () {
    //$("#myModalOpcionesExport").modal('show');

    var V_RUC = $('#txtRucFiltrar').val();
    var V_PROVEEDOR = encodeURIComponent($('#txtRazonSocialFiltrar').val()) ;
    var V_CODCONSECION = $('#txtCodConcesionFiltrar').val();
    var V_NOMCONSECION = $('#txNombreConceFiltrar').val();
    var V_NOMDERECHMINE = $('#txtNomDerechoMineroFiltrar').val();
    var V_FECREINFO = $('#txtFechaReinfoFiltrar').val();
    var V_RESULTADOS = $('#cmbResultadoFiltrar').val();
    var N_SEDES = $('#cmbSedeFiltrar').val();
    var parametros = "V_RUC=" + V_RUC + "%&V_PROVEEDOR=%" + V_PROVEEDOR + "%&V_CODCONSECION=%" + V_CODCONSECION + "%&V_NOMCONSECION=%" + V_NOMCONSECION + "%&V_NOMDERECHMINE=%" + V_NOMDERECHMINE + "%&V_FECREINFO=" + V_FECREINFO + "%&V_RESULTADOS=" + V_RESULTADOS + "&N_SEDES=" + N_SEDES;
    var w = window.open("/Home/ExportaExcelReinfo?" + parametros, "_blank");
    toastr["info"]("La descarga de archivo puede demorar unos minutos...");
    //$(w).ready(function () {
    //    toastr["success"]("Se descargó el archivo..  ");
    //});

});

//AGREGAR DOCUMENTO DE INGEMMET
$('#btnAgregarDocIngemmet').click(function () {
    var input = document.getElementById('filesIngemmet');
    var files = input.files;
    //var formData = new FormData();
    for (var i = 0; i != files.length; i++) {
        formDataIngemmet.append("files", files[i]);
        //formDataIngemmet.append("N_CODREIN", "prueba");
        formDataIngemmet.append("N_CODIGAFOM", 3);
        formDataIngemmet.append("V_TIPOARCH", "INGEMMET");
        formDataIngemmet.append("V_TIPOIMAG[]", $("#cmbTipoDocIngemmet").val());
        formDataIngemmet.append("V_TIPOIGAFOM", "INGEMMET");
    }
    //for (var pair of formDataIngemmet.entries()) {
    //    console.log(pair[0] + ', ' + pair[1]);
    //}
    $("#idListaDocIngemmet").append('<tr class="p-3"><td>' + $("#cmbTipoDocIngemmet").val() + '</td>\
            <td>'+ $("#filesIngemmet").val().replace(/.*(\/|\\)/, '')  + '</td></tr>');

    $("#filesIngemmet").val('');
    $("#cmbTipoDocIngemmet").val('0');
    $("#filesIngemmet").prop('disabled', true);
    $("#btnAgregarDocIngemmet").prop('disabled', true);
});

//LIMPIA DOCUMENTOS DE INGEMMET
$('#btnLimpiarDocIngemmet').click(function () {

    $("#idListaDocIngemmet").empty();
    $("#filesIngemmet").val('');
    $("#cmbTipoDocIngemmet").val('0');
    $("#filesIngemmet").prop('disabled', true);
    $("#btnAgregarDocIngemmet").prop('disabled', true);
    formDataIngemmet = new FormData();
   
});
//AL CAMBIAR TIPO DE DOCUMENTO INGEMMET
$('#cmbTipoDocIngemmet').change(function () {
    if ($('#cmbTipoDocIngemmet').val() == '0') {

        $("#filesIngemmet").prop('disabled', true);
    } else {
        $("#filesIngemmet").prop('disabled', false);
    }
});
//FILES DE INGEMMET
$('#filesIngemmet').change(function () {
    if ($('#filesIngemmet').val() != '') {
        $("#btnAgregarDocIngemmet").prop('disabled', false);
    } else {
        $("#btnAgregarDocIngemmet").prop('disabled', true);
    }
});
//COMBO TIPO DOCUMENTO INGEMMET 
$('#cmbTipoDocIngemmet1').change(function () {
    if ($('#cmbTipoDocIngemmet1').val()=='0') {
        $("#filesIngemmet1").prop('disabled', true);
    } else {
        $("#filesIngemmet1").prop('disabled', false);
    }
});

//CAPTURA EL ID REINFO Y MUESTRA DATOS
function getReinfo(id) {
    $("#cmbProvincia").prop("disabled", true);
    $("#cmbCiudad").prop("disabled", true);
    $("#idListaDocIngemmet").empty();
    $("#filesIngemmet").val('');
    $("#cmbTipoDocIngemmet").val('0');
    formDataIngemmet = new FormData();
    cargardatosTabla2();
    cargardatosTabla3();
    if (id > 0) {
        LimpiarLabels();
        $("#files1").hide();
        $("#files2").hide();
        $("#files3").hide();
        $("#filesIngemmet").hide();
        $("#cmbTipoDocIngemmet").hide();
        $("#btnAgregarDocIngemmet").hide();
        $("#btnLimpiarDocIngemmet").hide();

        $("#filesCampo").hide();

        $("#IdDivfile1").show();
        $("#IdDivfile2").show();
        $("#IdDivfile3").show();
        $("#IdDivfileIngemmet").show();
        $("#DivFileIngemmetPrincipal").hide();
        $("#IdDivfileCampo").show();
        $("#DivFileCampoPrincipal").hide();

        $("#txtCodigoDM").prop('disabled',true);
        $("#txtConcesion").prop('disabled', true);
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
                    $("#txtPersonNatJur").val(value.v_PROVEEDOR);
                    $("#txtRuc").val(value.v_RUC);
                    $("#txtCodigoDM").val(value.v_CODCONSECION);
                    $("#txtConcesion").val(value.v_NOMCONSECION);
                    $("#txtTmph").val(value.n_TMPH);
                    $("#txtTmps").val(value.n_TMPS);
                    //ZONA DE UBIGEO
                    $("#cmbDepartamento").val(dep+'0000');
                    $("#cmbProvincia").val(prov + '00');
                    $("#cmbCiudad").val(dist);
                    //FIN ZONA UBIGEO
                    $("#cmbSede").val(value.n_SEDE),
                    $("#txtNomDerMin").val(value.v_NOMDERECHMINE);
                    $("#cmbZonaRein").val(value.v_CODZONAREI);
                    $("#txtNorte1").val(value.n_NORTE1);
                    $("#txtEste1").val(value.n_ESTE1);
                    $("#cmbTipoActiv").val(value.v_CODTIPOACT);
                    $("#txtFechaReinfo").val(value.v_FECREINFO);
                    $("#txtNorte2").val(value.n_NORTE2);
                    $("#txtEste2").val(value.n_ESTE2);
                    $("#cmbComponente").val(value.v_COMPONENT);
                    $("#cmbZonaCampo").val(value.v_CODZONACAMP);
                    $("#txtNorteC").val(value.n_NORTEC);
                    $("#txtEsteC").val(value.n_ESTEC);
                    $("#txtDifCoordenadas").val(value.n_DIFCORDE);
                    $("#txtDescripLabor").val(value.v_DESCRILABOR);
                    $("#txtCantHomb").val(value.n_CANTHOMBRE);
                    $("#txtCantMuje").val(value.n_CANTMUJE);
                    $("#txtTotalPerso").val(value.n_TOTALTRAB);
                    $("#cmbIgafomCorrect").val(value.v_IGAFOMCORREC);
                    $("#cmbIgafomPreven").val(value.v_IGAFOMPREV);
                    $("#cmbEstadoIgafom").val(value.v_ESTADOIGAFOM);
                    $("#cmbResultado").val(value.v_RESULTADOS);
                    $("#txtConclusion").val(value.v_CONCLUSION);
                    if (value.v_SITUACIONINGEMMET == "") {
                        $("#cmbIngemmet").val('0');
                    } else {
                        $("#cmbIngemmet").val(value.v_SITUACIONINGEMMET);
                    }
                    if (value.v_SITUACIONINGEMMET == "") {
                        $("#cmbSituacionMine").val('0');
                    } else {
                        $("#cmbSituacionMine").val(value.v_SITACIONDECMINERA);
                    }
                    $('#txtId_reinfo').val(value.n_CODREINFO); 
                    $('#TxtIndicador').val(1);
                    cargardatosTablafile1(id);
                    cargardatosTablafile2(id);
                    cargardatosTablafile3(id);
                    //cargar lista de equiposambientes
                    buscarequiposreinfo(id);
                    buscarambientereinfo(id);
                    buscarequiposfaltantes(id);
                    buscarambientesfaltantes(id);
                    cargardatosTablafileIngemmet(id);
                    cargardatosTablafileCampo(id); 
                    $("#myModalReinfo").modal({ backdrop: 'static', keyboard: false })
                    $("#myModalReinfo").modal('show');
                });

            },


        });
        } else {

        $('#cmbSede').prop("disabled", false);
        LimpiarTextos();
        LimpiarLabels();

        $("#idListaDocIngemmet").empty();
        $("#filesIngemmet").val('');
        $("#cmbTipoDocIngemmet").val('0');
        formDataIngemmet = new FormData();

        $('#LstHerramientas').empty();
        $('#LstAmbientes').empty();
        $('#LstHerramientasEmpresa').empty();
        $('#LstAmbientesEmpresa').empty();
        cargarListaEquipos();
        cargarListaAmbientes();
        var fecha = new Date(); //Fecha actual
        var mes = fecha.getMonth() + 1; //obteniendo mes
        var dia = fecha.getDate(); //obteniendo dia
        var ano = fecha.getFullYear(); //obteniendo año
        if (dia < 10)
            dia = '0' + dia; //agrega cero si el menor de 10
        if (mes < 10)
            mes = '0' + mes //agrega cero si el menor de 10
        //$("#txtFechaReinfo").val(ano + "-" + mes + "-" + dia);
        $("#files1").show();
        $("#files2").show();
        $("#files3").show();
        $("#cmbTipoDocIngemmet").show();
        $("#btnAgregarDocIngemmet").show();
        $("#btnLimpiarDocIngemmet").show();
        $("#filesIngemmet").show();
        $("#filesCampo").show();

        $("#IdDivfile1").hide();
        $("#IdDivfile2").hide();
        $("#IdDivfile3").hide();
        $("#IdDivfileIngemmet").hide();
        $("#DivFileIngemmetPrincipal").show();
        $("#IdDivfileCampo").hide();
        $("#DivFileCampoPrincipal").show();

        $('#TxtIndicador').val(0);
        $("#myModalReinfo").modal({ backdrop: 'static', keyboard: false })
        $("#myModalReinfo").modal('show');
    }
}
//CAPTURA ID DE PROVEEDOR Y MUESTRA DATOS
function getProveedor(id) {

    $.ajax({
        url: '/Home/BuscarProveedor?V_CODANE=' + id,
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                $("#txtRuc").val(value.v_CODANE),
                $("#txtPersonNatJur").val(value.v_DESCRI)
                $("#myModalProveedores").modal('hide');
                
            });
            ValidaSiExiste();
        },
    });
    
}
//CAPTURA ID DE CONCESIÓN Y MUESTRA DATOS
function getConcesion(id) {

    $.ajax({
        url: '/Home/GetConcesion?codConcesion=' + id,
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                $("#txtCodigoDM").val(value.v_CODCONCESION);
                    $("#txtConcesion").val(value.v_NOMCONCESION);
                $("#myModalConcesiones").modal('hide');
            });
            ValidaSiExiste();
        },

        
    });
}
//AGREGA O EDITAR REINFO
function AgregarOeditarReinfo() {
    if (fnValidarReinfo()) {
        if ($('#TxtIndicador').val() == 1) {
            var EditRein = {
                objRein: {
                    N_CODREINFO: $("#txtId_reinfo").val(),
                    V_RUC: $("#txtRuc").val(),
                    V_PROVEEDOR: $("#txtPersonNatJur").val(),
                    V_CODCONSECION: $("#txtCodigoDM").val(),
                    V_NOMCONSECION: $("#txtConcesion").val(),
                    N_TMPH: $("#txtTmph").val(),
                    N_TMPS: $("#txtTmps").val(), 
                    V_UBIGEO: $("#cmbCiudad").val(),
                    V_NOMDERECHMINE: $("#txtNomDerMin").val(),
                    V_CODZONAREI: $("#cmbZonaRein").val(),
                    N_NORTE1: $("#txtNorte1").val(),
                    N_ESTE1: $("#txtEste1").val(),
                    N_NORTE2: $("#txtNorte2").val(),
                    N_ESTE2: $("#txtEste2").val(),
                    v_CODTIPOACT: $("#cmbTipoActiv").val(),
                    V_FECREINFO: $("#txtFechaReinfo").val(),
                    V_COMPONENT: $("#cmbComponente").val(),
                    v_CODZONACAMP: $("#cmbZonaCampo").val(),
                    N_NORTEC: $("#txtNorteC").val(),
                    N_ESTEC: $("#txtEsteC").val(),
                    N_DIFCORDE: $("#txtDifCoordenadas").val(),
                    N_SEDE: $("#cmbSede").val(),
                    V_DESCRILABOR: $("#txtDescripLabor").val(),
                    N_CANTHOMBRE: $("#txtCantHomb").val(),
                    N_CANTMUJE: $("#txtCantMuje").val(),
                    N_TOTALTRAB: $("#txtTotalPerso").val(),
                    V_IGAFOMCORREC: $("#cmbIgafomCorrect").val(),
                    V_IGAFOMPREV: $("#cmbIgafomPreven").val(),
                    V_ESTADOIGAFOM: $("#cmbEstadoIgafom").val(),
                    V_RESULTADOS: $("#cmbResultado").val(),
                    V_CONCLUSION: $("#txtConclusion").val(),
                    V_USUREGISTRO: UsuarioNom,
                    V_ESTADO: 'A',
                    V_SITUACIONINGEMMET: $("#cmbIngemmet").val(),
                    V_SITACIONDECMINERA: $("#cmbSituacionMine").val(),
                }
            };
            $.ajax({
                url: '/Home/EditarReinfo',
                type: 'POST',
                dataType: 'json',
                data: EditRein,
                success: function (data) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se Actualizó el Reinfo',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    ListaDepartamentos();
                    cargardatosTabla();
                    $("#myModalReinfo").modal('hide');
                },

            });
        } else {

            var RegRein = {
                objRein: {
                    V_RUC: $("#txtRuc").val(),
                    V_PROVEEDOR: $("#txtPersonNatJur").val(),
                    V_CODCONSECION: $("#txtCodigoDM").val(),
                    V_NOMCONSECION: $("#txtConcesion").val(),
                    N_TMPH: $("#txtTmph").val(),
                    N_TMPS: $("#txtTmps").val(),
                    V_UBIGEO: $("#cmbCiudad").val(),
                    V_NOMDERECHMINE: $("#txtNomDerMin").val(),
                    V_CODZONAREI: $("#cmbZonaRein").val(),
                    N_NORTE1: $("#txtNorte1").val(),
                    N_ESTE1: $("#txtEste1").val(),
                    N_NORTE2: $("#txtNorte2").val(),
                    N_ESTE2: $("#txtEste2").val(),
                    v_CODTIPOACT: $("#cmbTipoActiv").val(),
                    V_FECREINFO: $("#txtFechaReinfo").val(),
                    V_COMPONENT: $("#cmbComponente").val(),
                    v_CODZONACAMP: $("#cmbZonaCampo").val(),
                    N_NORTEC: $("#txtNorteC").val(),
                    N_ESTEC: $("#txtEsteC").val(),
                    N_DIFCORDE: $("#txtDifCoordenadas").val(),
                    N_SEDE: $("#cmbSede").val(),
                    V_DESCRILABOR: $("#txtDescripLabor").val(),
                    N_CANTHOMBRE: $("#txtCantHomb").val(),
                    N_CANTMUJE: $("#txtCantMuje").val(),
                    N_TOTALTRAB: $("#txtTotalPerso").val(),
                    V_IGAFOMCORREC: $("#cmbIgafomCorrect").val(),
                    V_IGAFOMPREV: $("#cmbIgafomPreven").val(),
                    V_ESTADOIGAFOM: $("#cmbEstadoIgafom").val(),
                    V_RESULTADOS: $("#cmbResultado").val(),
                    V_CONCLUSION: $("#txtConclusion").val(),
                    V_USUREGISTRO: UsuarioNom,
                    V_ESTADO: 'A',
                    V_SITUACIONINGEMMET: $("#cmbIngemmet").val(),
                    V_SITACIONDECMINERA: $("#cmbSituacionMine").val()
                }
            };
            $.ajax({
                url: '/Home/AgregarReinfo',
                type: 'POST',
                dataType: 'json',
                data: RegRein,
                success: function (data) {

                    if (data != null) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Se guardó el Reinfo',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        toastr["success"]("Reinfo Almacenado");
                        ListaDepartamentos();
                        cargardatosTabla();
                        $.ajax({
                            url: '/Home/BuscarIdReinfo?V_RUC=' + $("#txtRuc").val() + "&V_CODCONSECION=" + $("#txtCodigoDM").val(),
                            type: 'GET',
                            dataType: 'json',
                            data: 'data',
                            success: function (data) {
                                var datos = data.data;
                                $(datos).each(function (index, value) {
                                    var id = value.n_CODREINFO;
                                    agregarequiposreinfo(value.n_CODREINFO);
                                    agregarambientesreinfo(value.n_CODREINFO);
                                    //uploadFiles1('files1', id);
                                    var input = document.getElementById('files1');
                                    var files = input.files;
                                    var formData = new FormData();

                                    for (var i = 0; i != files.length; i++) {
                                        formData.append("files", files[i]);
                                        formData.append("N_CODREIN", id);
                                        formData.append("N_CODIGAFOM", 0);
                                        formData.append("V_TIPOARCH", "IMAGEN");
                                        formData.append("V_TIPOIMAG", "LABOR");
                                        formData.append("V_TIPOIGAFOM", "NA");
                                    }

                                    $.ajax(
                                        {
                                            url: "/Home/PostArchivos",
                                            data: formData,
                                            processData: false,
                                            contentType: false,
                                            type: "POST",
                                            success: function (data) {
                                                if ($('#TxtIndicador').val() == 1) {
                                                    cargardatosTablafile1($("#txtId_reinfo").val());
                                                    $("#files11").val('');

                                                }
                                                //uploadFiles2('files2', id);
                                                var input = document.getElementById('files2');
                                                var files = input.files;
                                                var formData = new FormData();
                                                for (var i = 0; i != files.length; i++) {
                                                    formData.append("files", files[i]);
                                                    formData.append("N_CODREIN", id);
                                                    formData.append("N_CODIGAFOM", 0);
                                                    formData.append("V_TIPOARCH", "IMAGEN");
                                                    formData.append("V_TIPOIMAG", "EQUIPOS");
                                                    formData.append("V_TIPOIGAFOM", "NA");
                                                }

                                                $.ajax(
                                                    {
                                                        url: "/Home/PostArchivos",
                                                        data: formData,
                                                        processData: false,
                                                        contentType: false,
                                                        type: "POST",
                                                        success: function (data) {
                                                            if ($('#TxtIndicador').val() == 1) {
                                                                cargardatosTablafile2($("#txtId_reinfo").val());
                                                                $("#files22").val('');
                                                            }
                                                            var input = document.getElementById('files3');
                                                            var files = input.files;
                                                            var formData = new FormData();
                                                            for (var i = 0; i != files.length; i++) {
                                                                formData.append("files", files[i]);
                                                                formData.append("N_CODREIN", id);
                                                                formData.append("N_CODIGAFOM", 0);
                                                                formData.append("V_TIPOARCH", "IMAGEN");
                                                                formData.append("V_TIPOIMAG", "AMBIENTE");
                                                                formData.append("V_TIPOIGAFOM", "NA");
                                                            }

                                                            $.ajax({
                                                                url: "/Home/PostArchivos",
                                                                data: formData,
                                                                processData: false,
                                                                contentType: false,
                                                                type: "POST",
                                                                success: function (data) {
                                                                    if ($('#TxtIndicador').val() == 1) {
                                                                        cargardatosTablafile3($("#txtId_reinfo").val());
                                                                        $("#files33").val('');
                                                                    }
                                                                    //DOCUMENTOS DE INGEMMET
                                                                    //var input = document.getElementById('filesIngemmet');
                                                                    //var files = input.files;
                                                                    //var formData = new FormData();
                                                                    //for (var i = 0; i != files.length; i++) {
                                                                    //    formData.append("files", files[i]);
                                                                    //    formData.append("N_CODREIN", id);
                                                                    //    formData.append("N_CODIGAFOM", 3);  
                                                                    //    formData.append("V_TIPOARCH", "INGEMMET");
                                                                    //    formData.append("V_TIPOIMAG", "INGEMMET");
                                                                    //    formData.append("V_TIPOIGAFOM", "INGEMMET");
                                                                    //}

                                                                    //for (var i = 0; i != formDataIngemmet.length; i++) {
                                                                        formDataIngemmet.append("N_CODREIN", id);
                                     
                                                                    //}

                                                                    $.ajax({
                                                                        url: "/Home/PostArchivosIngemmet",
                                                                        data: formDataIngemmet,
                                                                        processData: false,
                                                                        contentType: false,
                                                                        type: "POST",
                                                                        success: function (data) {
                                                                            if ($('#TxtIndicador').val() == 1) {
                                                                                cargardatosTablafileIngemmet($("#txtId_reinfo").val());
                                                                                $("#filesIngemmet").val('');
                                                                            }

                                                                            //DOCUMENTOS DE CAMPO
                                                                            var input = document.getElementById('filesCampo');
                                                                            var files = input.files;
                                                                            var formData = new FormData();
                                                                            for (var i = 0; i != files.length; i++) {
                                                                                formData.append("files", files[i]);
                                                                                formData.append("N_CODREIN", id);
                                                                                formData.append("N_CODIGAFOM", 4);
                                                                                formData.append("V_TIPOARCH", "CAMPO");
                                                                                formData.append("V_TIPOIMAG", "CAMPO");
                                                                                formData.append("V_TIPOIGAFOM", "CAMPO");
                                                                                formData.append("V_DESCRIPARCH", "");
                                                                            }
                                                                            $.ajax({
                                                                                url: "/Home/PostArchivos",
                                                                                data: formData,
                                                                                processData: false,
                                                                                contentType: false,
                                                                                type: "POST",
                                                                                success: function (data) {
                                                                                    if ($('#TxtIndicador').val() == 1) {
                                                                                        cargardatosTablafileCampo($("#txtId_reinfo").val());
                                                                                        $("#filesCampo1").val('');
                                                                                    }
                                                                                }
                                                                            }

                                                                            );

                                                                        }
                                                                    }
                                                                    );
                                                                }
                                                            }

                                                            );
     

                                                        }
                                                    }
                                                );

                                            }
                                        }
                                    );
                                    $("#myModalReinfo").modal('hide');
                                    
                                });
                            },
                            timeout: 3000
                        });
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'No se pudo guardar el Reinfo',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                },

            });
        }
    } else {
        toastr["error"]("Debe llenar los campos obligatorios");
    }
   
}
//ELIMINAR EL REINFO
function DeleteReinfo(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
        title: 'Esta seguro de eliminar los datos de Reinfo?',
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
                url: '/Home/EliminarReinfo?N_CODREINFO=' + id,
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
                    $.ajax({
                        url: '/Home/EliminarArchivo?N_CODREINFO=' + id,
                        type: 'POST',
                        dataType: 'json',
                        data: 'data',
                        success: function (data) {
                            toastr["success"], ("Se eliminaron las imagenes relacionadas al Reinfo");
                        },
                    });
                    $.ajax({
                        url: '/Home/EliminarReporteId?N_CODREIN=' + id,
                        type: 'POST',
                        dataType: 'json',
                        data: 'data',
                        success: function (data) {
                            toastr["success"], ("Se eliminaron los reportes relacionados al reinfo");


                        },

                    });
                },

            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {

        }
    })
}
//ELIMINAR ARCHIVO
function DeleteArchivo(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
        title: '¿Esta seguro de eliminar la imagen?',
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
                url: '/Home/EliminarArchivoId?N_CODARCHIVO=' + id,
                type: 'POST',
                dataType: 'json',
                data: 'data',
                success: function (data) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se eliminó la foto seleccionada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    if ($('#TxtIndicador').val() == 1) {
                        cargardatosTablafile1($("#txtId_reinfo").val());
                        cargardatosTablafile2($("#txtId_reinfo").val());
                        cargardatosTablafile3($("#txtId_reinfo").val());
                        cargardatosTablafileIngemmet($("#txtId_reinfo").val());
                        cargardatosTablafileCampo($("#txtId_reinfo").val());
                    }
                },

            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {

        }
    })
}
//DESCARGAR EL ARCHIVO SELECCIONADO
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

//#region SUBIR ARCHIVOS AL SELECCIONAR FOTOS
$("#files11").change(function () {
    var input = document.getElementById('files11');
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }

    $.ajax({
        url: "/Home/ValidarArchivos",
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
            var datos = data.data;
            if (datos != 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puede subir un archivo que no sea imagen',
                    showConfirmButton: false,
                    timer: 1500
                });
                toastr["error"]("No puede subir un archivo que no sea imagen");
                $("#files11").val('');
            } else {
                uploadFiles1('files11', $("#txtId_reinfo").val());
            }
        }
    });
    
   
 });
$("#files22").change(function () {
    var input = document.getElementById('files22');
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }

    $.ajax({
        url: "/Home/ValidarArchivos",
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
            var datos = data.data;
            if (datos != 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puede subir un archivo que no sea imagen',
                    showConfirmButton: false,
                    timer: 1500
                });
                toastr["error"]("No puede subir un archivo que no sea imagen");
                $("#files22").val('');
            } else {
                uploadFiles2('files22', $("#txtId_reinfo").val());
            }
        }
    });
    

});
$("#files33").change(function () {
    var input = document.getElementById('files33');
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }

    $.ajax({
        url: "/Home/ValidarArchivos",
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
            var datos = data.data;
            if (datos != 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puede subir un archivo que no sea imagen',
                    showConfirmButton: false,
                    timer: 1500
                });
                toastr["error"]("No puede subir un archivo que no sea imagen");
                $("#files33").val('');
            } else{
                uploadFiles3('files33', $("#txtId_reinfo").val());
            }
        }
    });


});
//SUBIR ARCHIVO AL EDITAR 
$("#filesIngemmet1").change(function () {

    uploadFilesIngemmet('filesIngemmet1', $("#txtId_reinfo").val());

});
$("#filesCampo1").change(function () {

    uploadFilesCampo('filesCampo1', $("#txtId_reinfo").val());

});

//validar si son imagenes
$("#files1").change(function () {
    var input = document.getElementById('files1');
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }

    $.ajax({
            url: "/Home/ValidarArchivos",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                var datos = data.data;
                if (datos != 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'No puede subir un archivo que no sea imagen',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    toastr["error"]("No puede subir un archivo que no sea imagen");
                    $("#files1").val('');
                }
            }
     });
});
$("#files2").change(function () {
    var input = document.getElementById('files2');
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }

    $.ajax({
        url: "/Home/ValidarArchivos",
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
            var datos = data.data;
            if (datos != 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puede subir un archivo que no sea imagen',
                    showConfirmButton: false,
                    timer: 1500
                });
                toastr["error"]("No puede subir un archivo que no sea imagen");
                $("#files2").val('');
            }
        }
    });

});
$("#files3").change(function () {
    var input = document.getElementById('files3');
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }

    $.ajax({
        url: "/Home/ValidarArchivos",
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
            var datos = data.data;
            if (datos != 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No puede subir un archivo que no sea imagen',
                    showConfirmButton: false,
                    timer: 1500
                });
                toastr["error"]("No puede subir un archivo que no sea imagen");
                $("#files3").val('');
            }
        }
    });

});
//#endregion

//BOTON QUE PERMITE BUSCAR PROVEEDORES 
$("#btnBuscarProve").click(function () {
    $("#myModalProveedores").modal({ backdrop: 'static', keyboard: false })
    $("#myModalProveedores").modal('show');
});
//BOTON QUE PERMITE BUSCAR CONCESIOES 
$("#btnBuscarConce").click(function () {
    $("#myModalConcesiones").modal({ backdrop: 'static', keyboard: false })
    $("#myModalConcesiones").modal('show');

});

//VALIDA SI EXISTE UN RUC Y CODIGO DE CONCESION
function ValidaSiExiste() {
    if ($('#TxtIndicador').val() == 0) {
        $.ajax({
            url: "/Home/ValidaReinfo?V_RUC=" + $('#txtRuc').val() + "&V_CODCONSECION=" + $('#txtCodigoDM').val().trim(),
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {

                if (data.data.length > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Ya existe la concesión para este proveedor',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    $('#txtCodigoDM').val('');
                    $('#txtConcesion').val('');
                } else {


                }
            }
        }
        );
    }
}
$("#txtTmph").blur(function () {
    ValidaSiExiste();
});

//SUBE FOTOS LABOR
function uploadFiles1(inputId, id) {
    var input = document.getElementById(inputId);
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i!= files.length; i++) {
        formData.append("files", files[i]);
        formData.append("N_CODREIN", id);
        formData.append("N_CODIGAFOM", 0);
        formData.append("V_TIPOARCH", "IMAGEN");
        formData.append("V_TIPOIMAG", "LABOR");
        formData.append("V_TIPOIGAFOM", "NA");
    }  

    $.ajax(
        {
            url: "/Home/PostArchivos",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                if ($('#TxtIndicador').val() == 1){
                    cargardatosTablafile1($("#txtId_reinfo").val());
                    $("#files11").val('');
                }
                
            }
        }
    );
}
//SUBE FOTOS EQUIPOS
function uploadFiles2(inputId, id) {
    var input = document.getElementById(inputId);
    var files = input.files;
    var formData = new FormData();
      for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
        formData.append("N_CODREIN", id);
        formData.append("N_CODIGAFOM", 0);
        formData.append("V_TIPOARCH", "IMAGEN");
          formData.append("V_TIPOIMAG", "EQUIPOS");
          formData.append("V_TIPOIGAFOM", "NA");
    }

    $.ajax(
        {
            url: "/Home/PostArchivos",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                //if (data != null) {
                //    toastr["success"]("Se guardó imagen de Equipos");
                //} else
                //    toastr["error"]("No se guardó imagen de Equipos");
                if ($('#TxtIndicador').val() == 1) {
                    cargardatosTablafile2($("#txtId_reinfo").val());
                    $("#files22").val('');
                }
            }
        }
    );
}
//SUBE FOTOS AMBIENTE
function uploadFiles3(inputId, id) {

    var input = document.getElementById(inputId);
    var files = input.files;
    var formData = new FormData();
    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
        formData.append("N_CODREIN", id);
        formData.append("N_CODIGAFOM", 0);
        formData.append("V_TIPOARCH", "IMAGEN");
        formData.append("V_TIPOIMAG", "AMBIENTE");
        formData.append("V_TIPOIGAFOM", "NA");
    }


    $.ajax({
            url: "/Home/PostArchivos",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                if ($('#TxtIndicador').val() == 1) {
                    cargardatosTablafile3($("#txtId_reinfo").val());
                    $("#files33").val('');
                }
            }
        }
    );
}
//SUBE DOCUMENTOS INGEMMET
function uploadFilesIngemmet(inputId, id) {

    var input = document.getElementById(inputId);
    var files = input.files;
    var formData = new FormData();
    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
        formData.append("N_CODREIN", id);
        formData.append("N_CODIGAFOM", 3);
        formData.append("V_TIPOARCH", "INGEMMET");
        formData.append("V_TIPOIMAG", $("#cmbTipoDocIngemmet1").val());
        formData.append("V_TIPOIGAFOM", "INGEMMET");
    }


    $.ajax({
        url: "/Home/PostArchivos",
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
            if ($('#TxtIndicador').val() == 1) {
                cargardatosTablafileIngemmet($("#txtId_reinfo").val());
                $("#filesIngemmet1").val('');
                $("#cmbTipoDocIngemmet1").val('0');
                $("#filesIngemmet1").prop('disabled', true);
            }
        }
    }
    );
}
//SUBE DOCUMENTOS DE CAMPO
function uploadFilesCampo(inputId, id) {
    var input = document.getElementById(inputId);
    var files = input.files;
    var formData = new FormData();
    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
        formData.append("N_CODREIN", id);
        formData.append("N_CODIGAFOM", 4);
        formData.append("V_TIPOARCH", "CAMPO");
        formData.append("V_TIPOIMAG", "CAMPO");
        formData.append("V_TIPOIGAFOM", "CAMPO");
    }
    $.ajax({
        url: "/Home/PostArchivos",
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
            if ($('#TxtIndicador').val() == 1) {
                cargardatosTablafileCampo($("#txtId_reinfo").val());
                $("#filesCampo1").val('');
            }
        }
    }
    );
}
//CAPTURA EL ID DE ARCHIVO Y MUESTRA SUS DATOS
function getArchivo(id) {
   
    $("#myModalImagen").modal('show');
    $("#ImagenContent").empty();
        $.ajax({
            url: '/Home/BuscarImagen?N_CODARCHIVO=' + id,
            type: 'GET',
            dataType: 'json',
            data: 'data',
            success: function (data) {
                var datos = data.data;
                $("#ImagenContent").empty();
                $(datos).each(function (index, value) {
                    $.ajax({
                        url: '/Home/previsualizar?fileName=' + value.v_NOMBRE,
                        type: 'GET',
                        dataType: 'json',
                        data: 'data',
                        success: function (data) {
                            var datos = data.data;
                            $("#ImagenContent").empty();
                            //$("#prueba").append('<a class="text-success mx-2px" href="' + datos + '" download>DESCARGAR</a >');
                            $("#ImagenContent").attr('src', datos);
                        },

                    });
                   // $('#ImagenContent').append('<img src="/images/' + value.v_NOMBRE + '.' + value.v_EXTENSION + '" class="img-rounded" height="100%" width="100%" alt="Imagen" />');
                    //$("#ImagenContent").attr('src', '/images/' + value.v_NOMBRE);
                    $("#myModalImagen").modal('show');
                });
                
            },


        });

 
};
//CALCULA LA DIFERENCIA DE LAS COORDENADAS
function CalcularDifCoordenadas() {
    var txtNorteC = parseFloat($("#txtNorteC").val());
    var txtEsteC = parseFloat($("#txtEsteC").val());
    var txtEste1 = parseFloat($("#txtEste1").val());
    var txtNorte1 = parseFloat($("#txtNorte1").val());

    var result = parseFloat(Math.sqrt(Math.pow((txtEste1 - txtEsteC), 2) + Math.pow((txtNorte1 - txtNorteC), 2)));


    if (isNaN(result) || isNaN(txtEsteC) || isNaN(txtEste1) || isNaN(txtNorte1) || isNaN(txtNorteC)) {
            $("#txtDifCoordenadas").val('');
        } else {
            $("#txtDifCoordenadas").val(result.toFixed(3));
        }
}
//CALCULA LA SUMA DE LOS TRABAJORES
function SumaTrabajadores() {
    var txtCantHomb = parseInt($("#txtCantHomb").val());
    var txtCantMuje = parseInt($("#txtCantMuje").val());
    var result = parseInt(txtCantHomb + txtCantMuje);
    if (isNaN(txtCantHomb)) {
        txtCantHomb = parseInt(0);
    }
    if (isNaN(txtCantMuje)) {
        txtCantMuje = parseInt(0);
    }
    if (isNaN(result)) {
        $("#txtTotalPerso").val(txtCantHomb + txtCantMuje);
    } else {
        $("#txtTotalPerso").val(result);
    }
}
//REGISTRA EL REINFO Y LO PLASMA EN LA TABLA REPORTE PARA DESPUES MOSTRAR
function Imprimir() {
                     var RegRepo = {
                        objRepo: {
                            N_CODREIN: $("#txtId_reinfoReporte").val(),
                            V_REALIZADOPOR: $("#cmbRealizadopor").val(),
                            V_REVISADOPOR: $("#cmbRevisadopor").val(),
                            V_FECHAREALIZADO: $("#txtFechaRealizado").val(),
                            V_FECHAREVISADO: $("#txtFechaRevisado").val(),
                            //CAMPO DE REINFO
                            V_RUC: $("#txtRucPrint").val(),
                            V_PROVEEDOR: $("#txtPersonaNaturalJurPrint").val(),
                            V_CODCONSECION: $("#txtCodigoDMPrint").val(),
                            V_NOMCONSECION: $("#txtConcesionPrint").val(),
                            N_TMPH: $("#txtTmphMesPrint").val(),
                            N_TMPS: $("#txtTmpsMesPrint").val(),
                            V_UBIGEO: $("#cmbCiudadPrint").val(),
                            V_NOMDERECHMINE: $("#txtNomDerMinPrint").val(),
                            V_CODZONAREI: $("#txtZonaReinPrint").val(),
                            N_NORTE1: $("#txtNorte1Print").val(),
                            N_ESTE1: $("#txtEste1Print").val(),
                            N_NORTE2: $("#txtNorte2Print").val(),
                            N_ESTE2: $("#txtEste2Print").val(),
                            v_CODTIPOACT: $("#txtTipoActivPrint").val(),
                            V_FECREINFO: $("#txtFechaReinfoPrint").val(),
                            V_COMPONENT: $("#cmbComponentePrint").val(),
                            v_CODZONACAMP: $("#cmbZonaCampoPrint").val(),
                            N_NORTEC: $("#txtNorteCPrint").val(),
                            N_ESTEC: $("#txtEsteCPrint").val(),
                            N_DIFCORDE: $("#txtDifCoordenadasPrint").val(),
                            N_SEDE: $("#cmbSedePrint").val(),
                            V_DESCRILABOR: $("#txtDescripLaborPrint").val(),
                            N_CANTHOMBRE: $("#txtCantHombPrint").val(),
                            N_CANTMUJE: $("#txtCantMujePrint").val(),
                            N_TOTALTRAB: $("#txtTotalPersoPrint").val(),
                            V_IGAFOMCORREC: $("#cmbIgafomCorrectPrint").val(),
                            V_IGAFOMPREV: $("#cmbIgafomPrevenPrint").val(),
                            V_ESTADOIGAFOM: $("#cmbEstadoIgafomPrint").val(),
                            V_RESULTADOS: $("#cmbResultadoPrint").val(),
                            V_CONCLUSION: $("#txtConclusionPrint").val(),
                            //FIN
                             V_USUREGISTRO: UsuarioNom,
                            V_PROTOCOLO: $("#lblProtocolo").text(),
                            N_VERSION: $("#lblVersionReport").text(),
                            V_VERSIONPROTOCOLO: $("#lblVersionPrint").text(),
                            V_FECHAVERSION: $("#lblFechaPrint").text(),
                            //agregado para version 3
                            V_SITUACIONINGEMMET: $("#cmbSituacionIngemmetPrint").val(),
                            V_SITACIONDECMINERA: $("#cmbSituacionProduccionPrint").val(),
                            V_ANIO: $("#txtAnioPrint").val(),
                            V_MES: $("#txtSemestrePrint").val(),
                        }
                    };
                    $.ajax({
                        url: '/Home/AgregarReporte',
                        type: 'POST',
                        dataType: 'json',
                        data: RegRepo,
                        success: function (data) {
                            if (data != null) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Se genero el reporte',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                toastr["success"]("Reporte Generado en modulo Reporte");

                                //ZONA DE BUSCAR ID DE REPORTE
                                $.ajax({
                                    url: '/Home/BuscarIdReport?N_CODREIN=' + $('#txtId_reinfoReporte').val(),
                                    type: 'GET',
                                    dataType: 'json',
                                    data: 'data',
                                    success: function (data) {
                                        var datos = data.data;
                                        $(datos).each(function (index, value) {
                                            GuardarDetalleReporteLabor(value.n_CODREPORTE);
                                            GuardarDetalleReporteEquipos(value.n_CODREPORTE);
                                            GuardarDetalleReporteAmbiente(value.n_CODREPORTE);
                                            GuardarDetalleReporteDetEquipos(value.n_CODREPORTE);
                                            GuardarDetalleReporteDetAmbiente(value.n_CODREPORTE);
                                        });
                                    },


                                });

                                //MUESTRA LA VISTA PREVIA PARA GENERAR PDF O IMPRIMIR 
                                //$("#IdImprimir").printThis();
                                $("#myModalPrint").modal('hide');
                                //$("#myModalPrintV3").modal('hide');
                                
                            } else {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: 'No se pudo guardar el Reporte',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        },
                    });
 }
//MUESTRA REINFO VISTA PREVIA
function PrintReinfo(id,condicion) {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
    $('#txtFechaRevisado').val('');
    $('#txtFechaRealizado').val('');
        $.ajax({
            url: '/Home/BuscarReinfo?N_CODREINFO=' + id,
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
                $('#myModalLoading2').removeAttr('hidden');
                $('#myModalLoading2').modal("show");
            },
            complete: function () {

                $('#myModalLoading2').attr('hidden', true);
                $('#myModalLoading2').modal('hide');

                $("#myModalPrint").modal({ backdrop: 'static', keyboard: false });
                $("#myModalPrint").modal('show');
            },
            data: 'data',
            success: function (data) {
                var datos = data.data;
                $(datos).each(function (index, value) {
                    var dep = (value.v_UBIGEO).substring(0, 2);
                    var prov = (value.v_UBIGEO).substring(0, 4);
                    var dist = (value.v_UBIGEO).substring(0, 6);
                    $("#txtPersonaNaturalJurPrint").val(value.v_PROVEEDOR);
                    $("#txtRucPrint").val(value.v_RUC);
                    $("#txtCodigoDMPrint").val(value.v_CODCONSECION);
                    $("#txtConcesionPrint").val(value.v_NOMCONSECION);
                    $("#txtTmphMesPrint").val(value.n_TMPH);
                    $("#txtTmpsMesPrint").val(value.n_TMPS);

                    $("#cmbSedePrint").val(value.n_SEDE);
                    $("#cmbDepartamentoPrint").val(dep + '0000');
                    $("#cmbProvinciaPrint").val(prov + '00');
                    $("#cmbCiudadPrint").val(dist);
                    
                    $("#txtNomDerMinPrint").val(value.v_NOMDERECHMINE);
                    $("#txtZonaReinPrint").val(value.v_CODZONAREI);
                    $("#txtNorte1Print").val(value.n_NORTE1);
                    $("#txtEste1Print").val(value.n_ESTE1);
                    $("#txtTipoActivPrint").val(value.v_CODTIPOACT);
                    $("#txtFechaReinfoPrint").val(value.v_FECREINFO);
                    $("#txtNorte2Print").val(value.n_NORTE2);
                    $("#txtEste2Print").val(value.n_ESTE2);
                    $("#cmbComponentePrint").val(value.v_COMPONENT);
                    $("#cmbZonaCampoPrint").val(value.v_CODZONACAMP);
                    $("#txtNorteCPrint").val(value.n_NORTEC);
                    $("#txtEsteCPrint").val(value.n_ESTEC);
                    $("#txtDifCoordenadasPrint").val(value.n_DIFCORDE);
                    $("#txtDescripLaborPrint").val(value.v_DESCRILABOR);
                    $("#txtCantHombPrint").val(value.n_CANTHOMBRE);
                    $("#txtCantMujePrint").val(value.n_CANTMUJE);
                    $("#txtTotalPersoPrint").val(value.n_TOTALTRAB);
                    $("#cmbIgafomCorrectPrint").val(value.v_IGAFOMCORREC);
                    $("#cmbIgafomPrevenPrint").val(value.v_IGAFOMPREV);
                    $("#cmbEstadoIgafomPrint").val(value.v_ESTADOIGAFOM);
                  
                    $("#cmbSituacionIngemmetPrint").val(value.v_SITUACIONINGEMMET);
                    $("#cmbSituacionProduccionPrint").val(value.v_SITACIONDECMINERA);
                    

                    if (value.v_RESULTADOS == "TRAZABLE") {
                        $("#cmbResultadoPrint").val('TZ');
                        $("#cmbResultadoPrint").css('background-color', '#2ECC71');
                    } else if (value.v_RESULTADOS == "NO TRAZABLE") {
                        $("#cmbResultadoPrint").val('NT');
                        $("#cmbResultadoPrint").css('background-color', '#E74C3C');
                    } else if (value.v_RESULTADOS == "PENDIENTE") {
                        $("#cmbResultadoPrint").val('P');
                        $("#cmbResultadoPrint").css('background-color', '#F1C40F');
                    }
                    //$("#txtFechaActual").text(output);
                    //CAMBIAR DE COLOR ESTADO PROVEEDOR
                    if (value.v_ESTADOIGAFOM == "FORMALIZADO") {
                        $("#cmbEstadoIgafomPrint").val('FORMALIZADO');
                        $("#cmbEstadoIgafomPrint").css('background-color', '#101A93');
                        $("#cmbEstadoIgafomPrint").css("color", "#F6F6F9");
                    } else if (value.v_ESTADOIGAFOM == "VIGENTE") {
                        $("#cmbEstadoIgafomPrint").val('VIGENTE');
                        $("#cmbEstadoIgafomPrint").css('background-color', '#4381CD');
                        $("#cmbEstadoIgafomPrint").css("color", "#F6F6F9");
                    } else if (value.v_ESTADOIGAFOM == "SUSPENDIDO") {
                        $("#cmbEstadoIgafomPrint").val('SUSPENDIDO');
                        $("#cmbEstadoIgafomPrint").css('background-color', '#E62E1F');
                        $("#cmbEstadoIgafomPrint").css("color", "#F6F6F9");
                    }
                    $.ajax({
                        url: '/Home/DatosVersionTrazabilidad',
                        type: 'GET',
                        dataType: 'json',
                        data: 'data',
                        success: function (data) {
                            var datos = data.data;
                            $(datos).each(function (index, value) {
                                if (value.v_TGCOD == "FEC") {
                                    $('#lblFechaPrint').text(value.v_TGNOM);
                                } else if (value.v_TGCOD == "PTC") {
                                    $('#lblProtocolo').text(value.v_TGNOM);
                                }
                                else if (value.v_TGCOD == "VER") {
                                    $('#lblVersionPrint').text(value.v_TGNOM);
                                }
                            });
                        }
                    });
                    //SE AGREGÓ 22/07/2021 VERSIÓN
                    $(document).ready(function () {
                        $.ajax({
                            url: '/Home/BuscarVersionReporte?N_CODREIN=' + id,
                            type: 'GET',
                            dataType: 'json',
                            data: 'data',
                            success: function (data) {
                                var datos = data.data;
                                var contador = parseInt(datos.length,10);
                                var version = parseInt(contador + 1,10);
                                $('#lblVersionReport').text(('000' + version).slice(-4));
                            },
                        });
                    });
                    cargardatosTablafile1Print(id);
                    cargardatosTablafile2Print(id);
                    cargardatosTablafile3Print(id);
                    cargardatosListaEquiposPrint(id);
                    cargardatosListaAmbientePrint(id);
                    $("#txtConclusionPrint").val(value.v_CONCLUSION);
                    $('#txtId_reinfoReporte').val(value.n_CODREINFO);
                    //LINEA DE CONDICION POR ROLES
                    if (condicion == 1) {
                        $('#divCondicionFooter').css("display", "none");
                        $('#divCondicion').css("display", "none");
                    } else {
                        $('#divCondicionFooter').css("display", "block");
                        $('#divCondicion').css("display", "block");
                    }
                    RevisaIgafomCorrectivo(id);
                    RevisaIgafomPreventivo(id);
                    RevisaDecMinera(id);

                    RevisaReporInge(id);
                    RevisaConsRein(id);
                    RevisaMapUbicacion(id);
                    
                    //if (VERSIONREINFO == '002') {
                    //    RevisaIgafomPreventivo
                    //    RevisaIgafomCorrectivo(id);
                    //    RevisaIgafomPreventivo(id);
                    //    RevisaDecMinera(id);
                    //    $("#myModalPrintV3").modal('hide');
                    //    $("#myModalPrint").modal({ backdrop: 'static', keyboard: false });
                    //    $("#myModalPrint").modal('show');
                    //} else if (VERSIONREINFO == '003') {
                    //    RevisaIgafomCorrectivo(id);
                    //    RevisaIgafomPreventivo(id);
                    //    RevisaDecMinera(id);
                    //    $("#myModalPrint").modal('hide');
                    //    $("#myModalPrintV3").modal({ backdrop: 'static', keyboard: false });
                    //    $("#myModalPrintV3").modal('show');
                    //}
                });

            },
        });
}

//CARGA TABLA DE LABOR
function cargardatosTablafile1Print(id) {
    
    $('#trLaborMinera td').remove();
    $.ajax({
        async:false,
        url: '/Home/Lista4Archivo?N_CODIGAFOM=0&N_CODREIN=' + id + '&V_TIPOIMAG=LABOR&V_TIPOIGAFOM=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
         
            var datos = data.data;
            var contador = 0;
            $(datos).each(function (index, value) {
                contador = contador + 1;
                $.ajax({
                    async: false,
                    url: '/Home/previsualizar?fileName=' + value.v_NOMBRE,
                    type: 'GET',
                    dataType: 'json',
                    data: 'data',
                    success: function (data) {
                        var datos = data.data;
                        //$("#prueba").append('<a class="text-success mx-2px" href="' + datos + '" download>DESCARGAR</a >');
                       // $("#ImagenContent").attr('src', datos);
                        $("#trLaborMinera").append('<td class="p-1" width="10%" align="center"><img src="' + datos + '" style="width: 70%;height:150px" /></td>');
                    },

                });
                
            });
            for (var i = 1; i <= 4 - contador; i++) {
                $("#trLaborMinera").append('<td class="p-1" width="10%" align="center"><img src="/images/imagenvacia.png" style="width: 70%;height:150px" /></td>');
            }
        },

    });
}
//CARGA TABLA DE EQUIPOS
function cargardatosTablafile2Print(id) {
    $('#trEquipos td').remove();
    $.ajax({
        async: false,
        url: '/Home/Lista4Archivo?N_CODIGAFOM=0&N_CODREIN=' + id + '&V_TIPOIMAG=EQUIPOS&V_TIPOIGAFOM=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            var contador = 0;
            $(datos).each(function (index, value) {
                contador = contador + 1;
                $.ajax({
                    async: false,
                    url: '/Home/previsualizar?fileName=' + value.v_NOMBRE,
                    type: 'GET',
                    dataType: 'json',
                    data: 'data',
                    success: function (data) {
                        var datos = data.data;
                        //$("#prueba").append('<a class="text-success mx-2px" href="' + datos + '" download>DESCARGAR</a >');
                        // $("#ImagenContent").attr('src', datos);
                        $("#trEquipos").append('<td class="p-1" width="10%" align="center"><img src="' + datos + '" style="width: 70%;height:150px" /></td>');
                    },

                });
               
            });
            for (var i = 1; i <= 4 - contador; i++) {
                $("#trEquipos").append('<td class="p-1" width="10%" align="center"><img src="/images/imagenvacia.png" style="width: 70%;height:150px" /></td>');
            }
        },

    });
}
//CARGA TABLA DE AMBIENTES
function cargardatosTablafile3Print(id) {
    $('#trAmbiente td').remove();
    $.ajax({
        async: false,
        url: '/Home/Lista4Archivo?N_CODIGAFOM=0&N_CODREIN=' + id + '&V_TIPOIMAG=AMBIENTE&V_TIPOIGAFOM=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            var contador = 0;
            
            $(datos).each(function (index, value) {
                contador = contador + 1;
                $.ajax({
                    async: false,
                    url: '/Home/previsualizar?fileName=' + value.v_NOMBRE,
                    type: 'GET',
                    dataType: 'json',
                    data: 'data',
                    success: function (data) {
                        var datos = data.data;
                        //$("#prueba").append('<a class="text-success mx-2px" href="' + datos + '" download>DESCARGAR</a >');
                        // $("#ImagenContent").attr('src', datos);
                        $("#trAmbiente").append('<td class="p-1" width="10%" align="center"><img src="' + datos + '" style="width: 70%;height:150px" /></td>');
                    },

                });
               
            });
            for (var i = 1; i <= 4 - contador; i++) {
                $("#trAmbiente").append('<td class="p-1" width="10%" align="center"><img src="/images/imagenvacia.png" style="width: 70%;height:150px" /></td>');
            }
        },
    });


}

//MUESTRA LISTA DE EQUIPOS Y AMBIENTES 
function cargardatosListaEquiposPrint(id) {
    $('#pEquiposLista').empty();
    $.ajax({
        async: false,
        url: '/Home/ListaEquiposAmbientesReinfo?N_CODREINFO=' + id + '&V_DESCRIPCION=%&V_TIPO=E_H&V_ESTADO=A',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var contador = 0;

            var datos = data.data;
            $(datos).each(function (index, value) {
                contador = contador + 1;
                if (contador <= 10) {
                    $('#pEquiposLista').append(contador + '. ' + value.v_DESCRIPCION + '<br />');
                }
            });

        },
    });

}
function cargardatosListaAmbientePrint(id) {
    $('#pAmbienteLista').empty();
    $.ajax({
        async: false,
        url: '/Home/ListaEquiposAmbientesReinfo?N_CODREINFO=' + id + '&V_DESCRIPCION=%&V_TIPO=AMB&V_ESTADO=A',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var contador = 0;
            var datos = data.data;
            $(datos).each(function (index, value) {
                contador = contador + 1;
                if (contador <= 10) {
                    $('#pAmbienteLista').append(contador + '. ' + value.v_DESCRIPCION + '<br />');
                }
            });

        },
    });

}

//LIMPIAR TEXTOS DE FILTROS DE BUSQUEDA
$('#btnReset').click(function () {
    cargardatosTabla();
    LimpiarFiltros();
});
//FILTRA DATOS DE ACUERDO A LO INGRESADO
$('#btnSearch').click(function () {
    Filtrar();
});

//CARGA TABLA CON FILTROS CARGADOS
function Filtrar() {
    $.ajax({
        url: '/Home/FiltrarReinfo?V_RUC=' + $('#txtRucFiltrar').val() + '%&V_PROVEEDOR=%' + encodeURIComponent($('#txtRazonSocialFiltrar').val()) + '%&V_CODCONSECION=' + $('#txtCodConcesionFiltrar').val() + '%&V_NOMCONSECION=%' + $('#txNombreConceFiltrar').val() + '%&V_NOMDERECHMINE=' + $('#txtNomDerechoMineroFiltrar').val() + '%&V_FECREINFO=' + $('#txtFechaReinfoFiltrar').val() + '%&V_RESULTADOS=' + $('#cmbResultadoFiltrar').val() + '&N_SEDES=' + $('#cmbSedeFiltrar').val(),
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
                    {
                        field: 'n_SEDE',
                        title: 'SEDE',
                        formatter: Sede,
                        sortable: true
                    },
                    {
                        field: 'v_RESULTADOS', 
                        title: '<label style="width:90px">RESULTADO</label>',
                        formatter: RESULTADO,
                        sortable: true
                    },
                    {
                        field: 'v_RUC',
                        title: 'Ruc',
                        sortable: true
                    },
                    {
                        field: 'v_ESTADOIGAFOM',
                        title: 'Estado Proveedor',
                        sortable: true
                    },
                    {
                        field: 'v_PROVEEDOR',
                        title: 'Razón Social',
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
                                  <title>REINFO</title>\
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
        if (sedeReinfo == UserSede || UserSede == 1) {
            if (UsuarioNom.substr(0, 2) == "TZ" || UsuarioNom.substr(0, 2) == "tz") {
                return '<div class="action-buttons">\
                               <a class="text-purple-m1 mx-2px" href="#" onclick=PrintReinfo('+ value + ',1)>\
                                 <i class="fa fa-print text-105"></i>\
                               </a>\
                             </div > ';
            }
            return '<div class="action-buttons">\
                                <a class="text-success mx-2px" href="#" onclick=getReinfo('+ value + ') >\
                                  <i class="fa fa-pencil-alt text-105"></i>\
                                </a>\
                                <a class="text-danger-m1 mx-2px" href="#" onclick=DeleteReinfo('+ value + ')>\
                                  <i class="fa fa-trash-alt text-105"></i>\
                                </a>\
                                <a class="text-purple-m1 mx-2px" href="#" onclick=PrintReinfo('+ value + ',0)>\
                                  <i class="fa fa-print text-105"></i>\
                                </a>\
                              </div > ';
        } else {
            return '<div class="action-buttons">\
                                <a class="text-purple-m1 mx-2px" href="#" onclick=PrintReinfo('+ value + ',1)>\
                                  <i class="fa fa-print text-105"></i>\
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
    function RESULTADO(value, row, index, field) {

        if (value == "TRAZABLE") {
            return '<label  style="color:#2ECC71;">TRAZABLE</label>';
        } else if (value == "PENDIENTE") {
            return '<label  style="color:#F1C40F;">PENDIENTE</label>';
        }
        else if (value == "NO TRAZABLE") {
            return '<label  style="color:#E74C3C;">NO TRAZABLE</label>';
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
//#endregion

//#region LIMPIAR CONTROLES
function LimpiarLabels() {

    $('#lblErrortxtPersonNatJur').css("display", "none");
    $("#lblErrortxtPersonNatJur").text("");

    $('#lblErrortxtRuc').css("display", "none");
    $("#lblErrortxtRuc").text("");

    $('#lblErrortxtConcesion').css("display", "none");
    $("#lblErrortxtConcesion").text("");

    $('#lblErrortxtCodigoDM').css("display", "none");
    $("#lblErrortxtCodigoDM").text("");

    $('#lblErrortxtTmph').css("display", "none");
    $("#lblErrortxtTmph").text("");

    $('#lblErrortxtTmps').css("display", "none");
    $("#lblErrortxtTmps").text("");

    $('#lblErrorcmbDepartamento').css("display", "none");
    $("#lblErrorcmbDepartamento").text("");

    $('#lblErrorcmbProvincia').css("display", "none");
    $("#lblErrorcmbProvincia").text("");

    $('#lblErrorcmbCiudad').css("display", "none");
    $("#lblErrorcmbCiudad").text("");

    $('#lblErrorcmbSede').css("display", "none");
    $("#lblErrorcmbSede").text("");

    $('#lblErrortxtNomDerMin').css("display", "none");
    $("#lblErrortxtNomDerMin").text("");

    $('#lblErrorcmbZonaRein').css("display", "none");
    $("#lblErrorcmbZonaRein").text("");

    $('#lblErrortxtNorte1').css("display", "none");
    $("#lblErrortxtNorte1").text("");

    $('#lblErrortxtEste1').css("display", "none");
    $("#lblErrortxtEste1").text("");

    $('#lblErrorcmbTipoActiv').css("display", "none");
    $("#lblErrorcmbTipoActiv").text("");

    $('#lblErrortxtFechaReinfo').css("display", "none");
    $("#lblErrortxtFechaReinfo").text("");

    $('#lblErrortxtNorte2').css("display", "none");
    $("#lblErrortxtNorte2").text("");

    $('#lblErrortxtEste2').css("display", "none");
    $("#lblErrortxtEste2").text("");

    $('#lblErrorcmbComponente').css("display", "none");
    $("#lblErrorcmbComponente").text("");

    $('#lblErrorcmbZonaCampo').css("display", "none");
    $("#lblErrorcmbZonaCampo").text("");

    $('#lblErrortxtNorteC').css("display", "none");
    $("#lblErrortxtNorteC").text("");

    $('#lblErrortxtEsteC').css("display", "none");
    $("#lblErrortxtEsteC").text("");

    $('#lblErrortxtDifCoordenadas').css("display", "none");
    $("#lblErrortxtDifCoordenadas").text("");

    $('#lblErrortxtDescripLabor').css("display", "none");
    $("#lblErrortxtDescripLabor").text("");

    $('#lblErrortxtCantHomb').css("display", "none");
    $("#lblErrortxtCantHomb").text("");

    $('#lblErrortxtCantMuje').css("display", "none");
    $("#lblErrortxtCantMuje").text("");

    $('#lblErrortxtTotalPerso').css("display", "none");
    $("#lblErrortxtTotalPerso").text("");

    $('#lblErrorcmbIgafomCorrect').css("display", "none");
    $("#lblErrorcmbIgafomCorrect").text("");

    $('#lblErrorcmbIgafomPreven').css("display", "none");
    $("#lblErrorcmbIgafomPreven").text("");

    $('#lblErrorcmbEstadoIgafom').css("display", "none");
    $("#lblErrorcmbEstadoIgafom").text("");

    $('#lblErrorcmbResultado').css("display", "none");
    $("#lblErrorcmbResultado").text("");

    $('#lblErrortxtConclusion').css("display", "none");
    $("#lblErrortxtConclusion").text("");

}
function LimpiarTextos() {
    $("#txtPersonNatJur").val('');
    $("#txtRuc").val('');
    $("#txtCodigoDM").val('');
    $("#txtConcesion").val('');
    $("#txtTmph").val('');
    $("#txtTmps").val('');
    $("#cmbDepartamento").val('0');
    $("#cmbProvincia").val('0');
    $("#cmbCiudad").val('0');
    //$("#cmbSede").val('0');
    $("#txtNomDerMin").val('');
    $("#cmbZonaRein").val('0');
    $("#txtNorte1").val('');
    $("#txtEste1").val('');
    $("#cmbTipoActiv").val('0');
    $("#txtFechaReinfo").val('');
    $("#txtNorte2").val('');
    $("#txtEste2").val('');
    $("#cmbComponente").val('0');
    $("#cmbZonaCampo").val('0');
    $("#txtNorteC").val('');
    $("#txtEsteC").val('');
    $("#txtDifCoordenadas").val('');
    $("#txtDescripLabor").val('');
    $("#files1").val('');
    $("#files2").val('');
    $("#files3").val('');
    $("#filesIngemmet").val('');
    $("#filesCampo").val('');
    $("#txtCantHomb").val('');
    $("#txtCantMuje").val('');
    $("#txtTotalPerso").val('');
    $("#cmbIgafomCorrect").val('0');
    $("#cmbIgafomPreven").val('0');
    $("#cmbEstadoIgafom").val('0');
    $("#cmbResultado").val('0');
    $("#txtConclusion").val('');
    $("#cmbIngemmet").val('0');
    $("#cmbSituacionMine").val('0');
    //$('#cmbSede').change(function () {
    var UserSedes = "";
    $.ajax({
        async: false,
        url: '/Home/CargarUser',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                UserSedes = value.n_CODSEDE;
            });
        },
    });
    if (UserSedes == 1) {
        $('#cmbSede').val(UserSedes);
        $('#cmbSede').prop("disabled", false);
    } else {
        $('#cmbSede').val(UserSedes);
        $('#cmbSede').prop("disabled", true);
    }
//});
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
//#endregion 

//GUARDAR EN REPORTE DETALLE
function GuardarDetalleReporteLabor(id){
    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=0&N_CODREIN=' + $('#txtId_reinfoReporte').val() + '&V_TIPOIMAG=LABOR&V_TIPOIGAFOM=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                //$("#trLaborMinera").append('<td class="p-1" width="10%" align="center"><img src="/images/' + value.v_NOMBRE + '" style="width: 70%;" /></td>');
                var RegRepoDet = {
                    objRepoDet: {
                        N_CODREPORTE:id,
                        N_CODREIN: value.n_CODREIN,
                        V_TIPOIMAG: value.v_TIPOIMAG,
                        V_NOMBRE: value.v_NOMBRE,
                        V_RUTA: value.v_RUTA,
                        N_CODARCHIVO: value.n_CODARCHIVO
                    }
                };
                $.ajax({
                    url: '/Home/AgregarReporteDet',
                    type: 'POST',
                    dataType: 'json',
                    data: RegRepoDet,
                    success: function (data) {
                        if (data != null) {
                           // toastr["success"]("Se almacenaron las fotos de Ambiente");
                        }
                    },

                });

            });
        },

    });
}
function GuardarDetalleReporteEquipos(id) {
    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=0&N_CODREIN=' + $('#txtId_reinfoReporte').val() + '&V_TIPOIMAG=EQUIPOS&V_TIPOIGAFOM=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                //$("#trLaborMinera").append('<td class="p-1" width="10%" align="center"><img src="/images/' + value.v_NOMBRE + '" style="width: 70%;" /></td>');
         
                var RegRepoDet = {
                    objRepoDet: {
                        N_CODREPORTE: id,
                        N_CODREIN: value.n_CODREIN,
                        V_TIPOIMAG: value.v_TIPOIMAG,
                        V_NOMBRE: value.v_NOMBRE,
                        V_RUTA: value.v_RUTA,
                        N_CODARCHIVO: value.n_CODARCHIVO
                    }
                }; 
                $.ajax({
                    url: '/Home/AgregarReporteDet',
                    type: 'POST',
                    dataType: 'json',
                    data: RegRepoDet,
                    success: function (data) {
                        if (data != null) {
                            //toastr["success"]("Se almacenaron las fotos de Equipos");
                        }
                    },

                });

            });
        },

    });
}
function GuardarDetalleReporteAmbiente(id) {
    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=0&N_CODREIN=' + $('#txtId_reinfoReporte').val() + '&V_TIPOIMAG=AMBIENTE&V_TIPOIGAFOM=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                //$("#trLaborMinera").append('<td class="p-1" width="10%" align="center"><img src="/images/' + value.v_NOMBRE + '" style="width: 70%;" /></td>');
     
                var RegRepoDet = {
                    objRepoDet: {
                        N_CODREPORTE: id,
                        N_CODREIN: value.n_CODREIN,
                        V_TIPOIMAG: value.v_TIPOIMAG,
                        V_NOMBRE: value.v_NOMBRE,
                        V_RUTA: value.v_RUTA,
                        N_CODARCHIVO: value.n_CODARCHIVO
                    }
                };
                $.ajax({
                    url: '/Home/AgregarReporteDet',
                    type: 'POST',
                    dataType: 'json',
                    data: RegRepoDet,
                    success: function (data) {
                        if (data != null) {
                            
                        }
                    },

                });

            });
        },

    });
}
//GUARDAR EN REPORTE DETALLE EQUIPOS Y AMBIENTES
function GuardarDetalleReporteDetEquipos(id) {
    $.ajax({
        url: '/Home/ListaEquiposAmbientesReinfo?N_CODREINFO=' + $('#txtId_reinfoReporte').val()  + '&V_DESCRIPCION=%&V_TIPO=E_H&V_ESTADO=A',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                //$("#trLaborMinera").append('<td class="p-1" width="10%" align="center"><img src="/images/' + value.v_NOMBRE + '" style="width: 70%;" /></td>');

                var RegRepoDetEqAmb = {
                    objRepoDetEqAmb: {
                        N_CODREPORTE: id,
                        N_CODREINFO: value.n_CODREINFO,
                        N_CODEQUIPOS: value.n_CODEQUIPOS,
                        V_DESCRIPCION: value.v_DESCRIPCION,
                        V_TIPO: value.v_TIPO,
                        V_ESTADO: value.v_ESTADO
                    }
                };
                $.ajax({
                    url: '/Home/AgregarReporteDetEquiposAmbientes',
                    type: 'POST',
                    dataType: 'json',
                    data: RegRepoDetEqAmb,
                    success: function (data) {
                        if (data != null) {
                            //toastr["success"]("Se almacenaron las fotos de Equipos");
                        }
                    },

                });

            });
        },

    });
}
function GuardarDetalleReporteDetAmbiente(id) {
    $.ajax({
        url: '/Home/ListaEquiposAmbientesReinfo?N_CODREINFO=' + $('#txtId_reinfoReporte').val() + '&V_DESCRIPCION=%&V_TIPO=AMB&V_ESTADO=A',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                //$("#trLaborMinera").append('<td class="p-1" width="10%" align="center"><img src="/images/' + value.v_NOMBRE + '" style="width: 70%;" /></td>');

                var RegRepoDetEqAmb = {
                    objRepoDetEqAmb: {
                        N_CODREPORTE: id,
                        N_CODREINFO: value.n_CODREINFO,
                        N_CODEQUIPOS: value.n_CODEQUIPOS,
                        V_DESCRIPCION: value.v_DESCRIPCION,
                        V_TIPO: value.v_TIPO,
                        V_ESTADO: value.v_ESTADO
                    }
                };
                $.ajax({
                    url: '/Home/AgregarReporteDetEquiposAmbientes',
                    type: 'POST',
                    dataType: 'json',
                    data: RegRepoDetEqAmb,
                    success: function (data) {
                        if (data != null) {
                            //toastr["success"]("Se almacenaron las fotos de Equipos");
                        }
                    },

                });

            });
        },

    });
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
function cargarListaEquipos() {
    $.ajax({
        url: '/Home/ListaEquiposAmbientes?V_DESCRIPCION=%&V_TIPO=E_H&V_ESTADO=A',
        type: 'GET',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $('#LstHerramientas').empty();
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#LstHerramientas').append('<option value=' + value.n_CODEQUIPOS + '>' + value.v_DESCRIPCION + '</option > ');
            });
        }
    });
}
function cargarListaAmbientes() {

    $.ajax({ 
        url: '/Home/ListaEquiposAmbientes?V_DESCRIPCION=%&V_TIPO=AMB&V_ESTADO=A',
        type: 'GET',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $('#LstAmbientes').empty();
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#LstAmbientes').append('<option value=' + value.n_CODEQUIPOS + '>' + value.v_DESCRIPCION + '</option > ');
            });

        }
    });
}
$(document).on('click', '#LstHerramientas', function () {
    if ($('#LstHerramientas option').length != 0 && $('#LstHerramientas option:selected').length > 0) {
        $("#btnDerechaHerr").prop("disabled", false);
    }

});
$(document).on('click', '#LstHerramientasEmpresa', function () {
    if ($('#LstHerramientasEmpresa option').length != 0 && $('#LstHerramientasEmpresa option:selected').length > 0) {
        $("#btnIzquierdaHerr").prop("disabled", false);
    }

});
$(document).on('click', '#LstAmbientes', function () {
    if ($('#LstAmbientes option').length != 0 && $('#LstAmbientes option:selected').length > 0) {
        $("#btnDerechaAmb").prop("disabled", false);
    }

});
$(document).on('click', '#LstAmbientesEmpresa', function () {
    if ($('#LstAmbientesEmpresa option').length != 0 && $('#LstAmbientesEmpresa option:selected').length > 0) {
        $("#btnIzquierdaAmb").prop("disabled", false);
    }
});
$('#btnDerechaHerr').click(function () {
    if ($('#TxtIndicador').val() == 1) {
        if ($('#LstHerramientas option').length >= 1) {
            var RegAmbEq = {
                objAmbEq: {
                    N_CODREINFO: $('#txtId_reinfo').val(),
                    N_CODEQUIPOS: $('#LstHerramientas option:selected').val(),
                    V_DESCRIPCION: $('#LstHerramientas option:selected').html(),
                    V_TIPO: 'E_H',
                    V_ESTADO: 'A',
                }
            }
            $.ajax({
                url: '/Home/AgregarEquiposAmbientesReinfo',
                type: 'POST',
                dataType: 'json',
                data: RegAmbEq,
                success: function (data) {
                    $("#btnDerechaHerr").prop("disabled", true);
                    $('#LstHerramientas option:selected').remove().appendTo('#LstHerramientasEmpresa');
                    $("#btnIzquierdaHerr").prop("disabled", false);
                },

            });
        }
    } else {
        if ($('#LstHerramientas option').length >= 1) {
            $("#btnDerechaHerr").prop("disabled", true);

            $('#LstHerramientas option:selected').remove().appendTo('#LstHerramientasEmpresa');
            // Al quitar opción, habilitar el botón "Pasar"
            $("#btnIzquierdaHerr").prop("disabled", false);


        }
    }
});
$('#btnIzquierdaHerr').click(function () {
    if ($('#TxtIndicador').val() == 1) {
        if ($('#LstHerramientasEmpresa option').length >= 1) {
            $.ajax({
                url: '/Home/EliminarEquiposAmbientesReinfo?N_CODEQUIPOS=' + $('#LstHerramientasEmpresa option:selected').val() + '&N_CODREINFO=' + $('#txtId_reinfo').val(),
                type: 'POST',
                dataType: 'json',
                data: 'data',
                success: function (data) {
                    $("#btnIzquierdaHerr").prop("disabled", true);
                    $('#LstHerramientasEmpresa option:selected').remove().appendTo('#LstHerramientas');
                    $("#btnDerechaHerr").prop("disabled", false);
                },

            });
        }
    } else {
    if ($('#LstHerramientasEmpresa option').length >= 1) {
        $("#btnIzquierdaHerr").prop("disabled", true);

        $('#LstHerramientasEmpresa option:selected').remove().appendTo('#LstHerramientas');
        // Al quitar opción, habilitar el botón "Pasar"
        $("#btnDerechaHerr").prop("disabled", false);

    }
    }
});
$('#btnDerechaAmb').click(function () {
    if ($('#TxtIndicador').val() == 1) {
        if ($('#LstAmbientes option').length >= 1) {
            var RegAmbEq = {
                objAmbEq: {
                    N_CODREINFO: $('#txtId_reinfo').val(),
                    N_CODEQUIPOS: $('#LstAmbientes option:selected').val(),
                    V_DESCRIPCION: $('#LstAmbientes option:selected').html(),
                    V_TIPO: 'AMB',
                    V_ESTADO: 'A',
                }
            }
            $.ajax({
                url: '/Home/AgregarEquiposAmbientesReinfo',
                type: 'POST',
                dataType: 'json',
                data: RegAmbEq,
                success: function (data) {
                    $('#LstAmbientes option:selected').remove().appendTo('#LstAmbientesEmpresa');
                },

            });
        }
    } else {
        if ($('#LstAmbientes option').length >= 1) {
            $("#btnDerechaAmb").prop("disabled", true);

            $('#LstAmbientes option:selected').remove().appendTo('#LstAmbientesEmpresa');
            // Al quitar opción, habilitar el botón "Pasar"
            $("#btnIzquierdaAmb").prop("disabled", false);


        }
    }
});
$('#btnIzquierdaAmb').click(function () {

    if ($('#TxtIndicador').val() == 1) {
        if ($('#LstAmbientesEmpresa option').length >= 1) {
            $.ajax({
                url: '/Home/EliminarEquiposAmbientesReinfo?N_CODEQUIPOS=' + $('#LstAmbientesEmpresa option:selected').val() + '&N_CODREINFO=' + $('#txtId_reinfo').val(),
                type: 'POST',
                dataType: 'json',
                data: 'data',
                success: function (data) {
                    $("#btnIzquierdaHerr").prop("disabled", true);

                    $('#LstAmbientesEmpresa option:selected').remove().appendTo('#LstAmbientes');
                    // Al quitar opción, habilitar el botón "Pasar"
                    $("#btnDerechaAmb").prop("disabled", false);
                },

            });
        }
    } else {
        if ($('#LstAmbientesEmpresa option').length >= 1) {
            $("#btnIzquierdaHerr").prop("disabled", true);

            $('#LstAmbientesEmpresa option:selected').remove().appendTo('#LstAmbientes');
            // Al quitar opción, habilitar el botón "Pasar"
            $("#btnDerechaAmb").prop("disabled", false);
        }

    }
});

//INSERTA EQUIPOS REINFO
function agregarequiposreinfo(id) {
    $('#LstHerramientasEmpresa').children("option").each(function () {
        var RegAmbEq = {
            objAmbEq: {
                N_CODREINFO: id,
                N_CODEQUIPOS: $(this).val(),
                V_DESCRIPCION: $(this).html(),
                V_TIPO: 'E_H',
                V_ESTADO: 'A',
            }
        }
        $.ajax({
            url: '/Home/AgregarEquiposAmbientesReinfo',
            type: 'POST',
            dataType: 'json',
            data: RegAmbEq,
            success: function (data) {
                //se agregó el ambiente reinfo
            },

        });
    });
  
}
//INSERTA AMBIENTES REINFO
function agregarambientesreinfo(id) {
    $('#LstAmbientesEmpresa').children("option").each(function () {
        var RegAmbEq = {
            objAmbEq: {
                N_CODREINFO: id,
                N_CODEQUIPOS: $(this).val(),
                V_DESCRIPCION: $(this).html(),
                V_TIPO: 'AMB',
                V_ESTADO: 'A',
            }
        }
        $.ajax({
            url: '/Home/AgregarEquiposAmbientesReinfo',
            type: 'POST',
            dataType: 'json',
            data: RegAmbEq,
            success: function (data) {

            },

        });
    });

}
//BUSCA EQUIPOS RELACIONADOS AL REINFO
function buscarequiposreinfo(id) {
    $.ajax({
        url: '/Home/ListaEquiposAmbientesReinfo?N_CODREINFO=' + id +'&V_DESCRIPCION=%&V_TIPO=E_H&V_ESTADO=A',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $('#LstHerramientasEmpresa').empty();
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#LstHerramientasEmpresa').append('<option value=' + value.n_CODEQUIPOS + '>' + value.v_DESCRIPCION + '</option > ');
            });
        },

    });
}
//BUSCA AMBIENTES RELACIONADOS AL REINFO
function buscarambientereinfo(id) {
    $.ajax({
        url: '/Home/ListaEquiposAmbientesReinfo?N_CODREINFO=' + id + '&V_DESCRIPCION=%&V_TIPO=AMB&V_ESTADO=A',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $('#LstAmbientesEmpresa').empty();
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#LstAmbientesEmpresa').append('<option value=' + value.n_CODEQUIPOS + '>' + value.v_DESCRIPCION + '</option > ');
            });

        },

    });
}
//BUSCA EQUIPOS FALTANTES
function buscarequiposfaltantes(id) {
    $.ajax({
        url: '/Home/ListaEquiposAmbientesFaltantes?N_CODREINFO=' + id + '&V_TIPO=E_H&V_ESTADO=A',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $('#LstHerramientas').empty();
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#LstHerramientas').append('<option value=' + value.n_CODEQUIPOS + '>' + value.v_DESCRIPCION + '</option > ');
            });
        },
    });
}
//BUSCA AMBIENTES FALTANTES
function buscarambientesfaltantes(id) {
    $.ajax({
        url: '/Home/ListaEquiposAmbientesFaltantes?N_CODREINFO=' + id + '&V_TIPO=AMB&V_ESTADO=A',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $('#LstAmbientes').empty();
            var datos = data.data;
            $(datos).each(function (index, value) {
                $('#LstAmbientes').append('<option value=' + value.n_CODEQUIPOS + '>' + value.v_DESCRIPCION + '</option > ');
            });
        },
    });
}
//CHECK SI EXISTEN ARCHIVOS SUBIDOS
function RevisaIgafomCorrectivo(id) {
    $.ajax({
        async:false,
        url: '/Home/ListaArchivo?N_CODIGAFOM=1&N_CODREIN=' + id + '&V_TIPOIMAG=CARGOCORRECTIVO&V_TIPOIGAFOM=CORRECTIVO',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            if (datos.length == 1) {
                $('#cboxIgafCorrect').prop('checked', true);
            } else {
                $('#cboxIgafCorrect').prop('checked', false);
            }
        },
    });
}
function RevisaIgafomPreventivo(id) {
    $.ajax({
        async: false,
        url: '/Home/ListaArchivo?N_CODIGAFOM=1&N_CODREIN=' + id + '&V_TIPOIMAG=CARGOPREVENTIVO&V_TIPOIGAFOM=PREVENTIVO',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            if (datos.length == 1) {
                $('#cboxIgafPrev').prop('checked', true);
            } else {
                $('#cboxIgafPrev').prop('checked', false);
            }
        },
    });
}
function RevisaDecMinera(id) {
    $.ajax({
        async: false,
        url: '/Home/ListaArchivo?N_CODIGAFOM=2&N_CODREIN=' + id + '&V_TIPOIMAG=%&V_TIPOIGAFOM=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            if (datos.length >=1) {
                $('#cboxDecMinera').prop('checked', true);
            } else {
                $('#cboxDecMinera').prop('checked', false);
            }
            $(datos).each(function (index, value) {
                $('#txtAnioPrint').val(value.v_TIPOIMAG);
                $('#txtSemestrePrint').val(value.v_TIPOIGAFOM.substr(8, 2));
            });
        },
    });
}
function RevisaReporInge(id) {
    $.ajax({
        async: false,
        url: '/Home/ListaArchivo?N_CODIGAFOM=3&N_CODREIN=' + id + '&V_TIPOIMAG=REPORTE CONCESION&V_TIPOIGAFOM=INGEMMET',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            if (datos.length >= 1) {
                $('#cboxReporInge').prop('checked', true);
            } else {
                $('#cboxReporInge').prop('checked', false);
            }
        },
    });
}
function RevisaConsRein(id) {
    $.ajax({
        async: false,
        url: '/Home/ListaArchivo?N_CODIGAFOM=3&N_CODREIN=' + id + '&V_TIPOIMAG=CONSTANCIA REINFO&V_TIPOIGAFOM=INGEMMET',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            if (datos.length >= 1) {
                $('#cboxConsRein').prop('checked', true);
            } else {
                $('#cboxConsRein').prop('checked', false);
            }
        },
    });
}
function RevisaMapUbicacion(id) {
    $.ajax({
        async: false,
        url: '/Home/ListaArchivo?N_CODIGAFOM=3&N_CODREIN=' + id + '&V_TIPOIMAG=MAPA UBICACION&V_TIPOIGAFOM=INGEMMET',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            if (datos.length >= 1) {
                $('#cboxMapUbicacion').prop('checked', true);
            } else {
                $('#cboxMapUbicacion').prop('checked', false);
            }

        },
    });
}
//MODAL DE VERSION 2
function crearModalV2() {
    $("#myModalPrint").empty();
    $("#myModalPrint").append('<div class= "modal-dialog modal-xl" role = "document">\
        <div class="modal-content">\
            <div class="modal-header">\
                <h6 class="modal-title">REPORTE REINFO</h6>\
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                    <span aria-hidden="true">&times;</span>\
                </button>\
            </div>\
            <div id="IdImprimir">\
                <div class="modal-body ace-scrollbar p-0">\
                    <input type="text" id="txtId_reinfoReporte" style="display:none" />\
                    <table class="table table-responsive" style="width:100%" border="1">\
                        <tr>\
                            <th rowspan="4"><img src="/images/laytaruma.png" class="pt-4" /></th>\
                            <th width="61%"> <center><h5><strong>MINERA LAYTARUMA S.A.</strong></h5></center></th>\
                            <th width="25%" class="p-0 pl-1 pt-1" style="font-size:13px">\
                                Protocolo: <label id="lblProtocolo"></label>\
                                <hr class="m-0" />\
                                Versión: <label id="lblVersionPrint"></label>\
                            </th>\
                        </tr>\
                        <tr>\
                            <td rowspan="2"><center><h5>REGISTRO INSPECCIÓN DE LABORES MINERAS TRAZABILIDAD</h5></center></td>\
                            <td style="font-size:14px" class="p-0 pl-1">\
                                Fecha : <label id="lblFechaPrint"></label>\
                                <hr class="m-0" />\
                                <label>Página 1 de 1</label>\
                            </td>\
                        </tr>\
                    </table>\
                    <table class="" border="1" style="width:100%">\
                        <tr>\
                            <th class="p-1" colspan="4" width="48%" style="font-size: 12px; background-color: lightgray ">01. DATOS GENERALES</th>\
                        </tr>\
                        <tr>\
                            <td class="p-1" style="font-size:12px" width="18%">PERSONA NATURAL/JURÍDICA</td>\
                            <td class="p-1" style="font-size:12px" width="55%"><input style="width: 100%; font-size: 12px" type="text" border="1" readonly id="txtPersonaNaturalJurPrint" /></td>\
                            <td class="p-1" style="font-size:12px" width="14%">CÓDIGO DM CAMPO</td>\
                            <td class="p-1" style="font-size:12px" width="30%"><input style="width: 100%; font-size: 12px" type="text" border="1" readonly id="txtCodigoDMPrint" /></td>\
                        </tr>\
                        <tr>\
                            <td class="p-1" style="font-size:12px">RUC</td>\
                            <td class="p-1" style="font-size:12px"><input type="text" style="width:100%;font-size:12px" border="1" readonly id="txtRucPrint"></td>\
                                <td class="p-1" style="font-size:12px">TM-PH/MES</td>\
                                <td class="p-1" style="font-size:12px"><input type="text" style="font-size: 12px; width: 100%;" border="1" readonly id="txtTmphMesPrint" /></td>\
                        </tr>\
                            <tr>\
                                <td class="p-1" style="font-size:12px">CONCESIÓN</td>\
                                <td class="p-1" style="font-size:12px"><input type="text" style="width: 100%;font-size:12px" border="1" readonly id="txtConcesionPrint" /></td>\
                                <td class="p-1" style="font-size:12px">TM-PS/MES</td>\
                                <td class="p-1" style="font-size:12px"><input type="text" style="width: 100%;font-size:12px" border="1" readonly id="txtTmpsMesPrint" /></td>\
                            </tr>\
                    </table>\
                        <table class="" border="1">\
                            <tr>\
                                <th class="p-1" colspan="4" style="font-size: 12px; background-color: lightgray ">02. COORDENADAS</th>\
                            </tr>\
                            <tr>\
                                <td class="p-1" style="font-size: 12px">2.1 EN REINFO/DECLARACIÓN DE COMPROMISO</td>\
                                <td class="p-1" style="font-size: 12px">2.2 EN CAMPO</td>\
                            </tr>\
                            <tr>\
                                <td class="p-1">\
                                    <table>\
                                        <tr>\
                                            <th class="p-1" style="font-size:11px" width="23%">DERECHO MINERO</th>\
                                            <th class="p-1" style="font-size:11px">ZONA</th>\
                                            <th class="p-1" style="font-size:11px">1.NORTE</th>\
                                            <th class="p-1" style="font-size:11px">1.ESTE</th>\
                                            <th class="p-1" style="font-size:11px">2.NORTE</th>\
                                            <th class="p-1" style="font-size:11px">2.ESTE</th>\
                                            <th class="p-1" style="font-size:11px">ACTIVIDAD</th>\
                                            <th class="p-1" style="font-size:11px">FECHA</th>\
                                        </tr>\
                                        <tr>\
                                            <td class="p-1" style="font-size: 11px" width="26%"><input type="text" style="width:100%" border="1" readonly id="txtNomDerMinPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="txtZonaReinPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="txtNorte1Print" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="txtEste1Print" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="txtNorte2Print" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="txtEste2Print" /></td>\
                                            <td class="p-1" width="16%" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="txtTipoActivPrint" /></td>\
                                            <td class="p-1" width="11%" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="txtFechaReinfoPrint" /></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                                <td class="p-1">\
                                    <table>\
                                        <tr>\
                                            <th class="p-1" style="font-size: 11px" width="42%">COMPONENTE</th>\
                                            <th class="p-1" style="font-size: 11px">ZONA</th>\
                                            <th class="p-1" style="font-size: 11px">NORTE C</th>\
                                            <th class="p-1" style="font-size: 11px">ESTE C</th>\
                                        </tr>\
                                        <tr>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="cmbComponentePrint" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="cmbZonaCampoPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="txtNorteCPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px"><input type="text" style="width:100%" border="1" readonly id="txtEsteCPrint" /></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" style="font-size: 12px">2.3 DIFERENCIA DE COORDENADAS: <input type="text" border="1" readonly style="width:17%" class="pl-2" id="txtDifCoordenadasPrint" /> METROS</td>\
                                <td class="p-1" style="font-size: 12px">2.4 SEDE: <select type="text" id="cmbSedePrint" border="1" disabled="disabled" style="width:100%" class="pl-2" /></td>\
                            </tr>\
                            <tr>\
                                <td colspan="3" class="p-0">\
                                    <table class="p-0" border="1" width="100%">\
                                        <tr>\
                                            <td class="p-1" width="10%" style="font-size: 11px">UBICACIÓN POLITICA</td>\
                                            <td class="p-1" style="font-size: 11px">DEPARTAMENTO</td>\
                                            <td class="p-1" width="30%" style="font-size: 11px"><select type="text" id="cmbDepartamentoPrint" disabled="disabled" style="width:100%" /></td>\
                                            <td class="p-1" style="font-size: 11px">PROVINCIA</td>\
                                            <td class="p-1" width="30%" style="font-size: 11px"><select type="text" id="cmbProvinciaPrint" disabled="disabled" style="width:100%" /></td>\
                                            <td class="p-1" style="font-size: 11px">DISTRITO</td>\
                                            <td class="p-1" width="30%" style="font-size: 11px"><select type="text" id="cmbCiudadPrint" disabled="disabled" style="width:100%" /></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" colspan="2" style="font-size: 12px; background-color:lightgray">03. DESCRIPCIÓN DE LABORES:</td>\
                            </tr>\
                            <tr>\
                                <td colspan="2" class="p-2" style="font-size: 12px">\
                                    <textarea type="text" style="width:100%;resize:none" readonly id="txtDescripLaborPrint" ></textarea>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" colspan=2 style="font-size: 11px">PANEL FOTOGRÁFICO (FOTOS DE LA LABOR MINERA)</td>\
                            </tr>\
                        </table>\
                        <table style="height:50%" border="1">\
                            <tr id="trLaborMinera">\
                        </tr>\
                        </table>\
                        <table style="height:50%" border="1" width="100%">\
                            <tr>\
                                <td class="p-1" colspan="5" style="font-size: 12px; background-color:lightgray">04. EQUIPOS Y HERRAMIENTAS (Detallar los equipos mineros):</td>\
                            </tr>\
                            <tr>\
                                <td width="15%">\
                                    <table>\
                                        <tr id="trListaEquipos">\
                                            <td class="p-1" width="10%" align="center"><p style="font-size:11px;text-align:left;font-weight:bold;color:darkblue" id="pEquiposLista"><div id="contenedorEquipos" style="font-size:11px;text-align:left;font-weight:bold;color:darkblue"></div></p></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                                <td>\
                                    <table border="1">\
                                        <tr id="trEquipos">\
                                    </tr>\
                                    </table>\
                                </td>\
                            </tr>\
                        </table>\
                        <table style="height:50%" border="1" width="100%">\
                            <tr>\
                                <td class="p-1" colspan="5" style="font-size: 12px; background-color:lightgray">05. INSTALACIONES Y AMBIENTES (Detallar las instalaciones y/o ambientes):</td>\
                            </tr>\
                            <tr>\
                                <td width="15%">\
                                    <table>\
                                        <tr>\
                                            <td class="p-1" width="10%" align="center"><p style="font-size:11px;text-align:left;font-weight:bold;color:darkblue" id="pAmbienteLista"><div id="contenedorAmbiente" style="font-size:11px;text-align:left;font-weight:bold;color:darkblue"></div></p></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                                <td>\
                                    <table border="1">\
                                        <tr id="trAmbiente">\
                                    </tr>\
                                    </table>\
                                </td>\
                            </tr>\
                        </table>\
                        <table class="table table-responsive" border="1">\
                            <tr>\
                                <td class="p-1" colspan="6" style="font-size: 12px; background-color:lightgray">06. FUERZA LABORAL</td>\
                                <td class="p-1" colspan="4" style="font-size: 12px; background-color:lightgray">07. IGAFOM</td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" width="3%" style="font-size: 11px">HOMBRES</td>\
                                <td class="p-1" width="10%" style="font-size: 11px"><input type="text" id="txtCantHombPrint" readonly style="width:100%" /></td>\
                                <td class="p-1" style="font-size: 11px">MUJERES</td>\
                                <td class="p-1" width="10%" style="font-size: 11px"><input type="text" id="txtCantMujePrint" readonly style="width:100%" /></td>\
                                <td class="p-1" style="font-size: 11px">TOTAL PERSONAL</td>\
                                <td class="p-1" style="font-size: 11px"><input type="text" id="txtTotalPersoPrint" readonly style="width:100%" /></td>\
                                <td class="p-1" style="font-size: 11px">IGAFOM CORRECTIVO</td>\
                                <td class="p-1" style="font-size: 11px"><input type="text" id="cmbIgafomCorrectPrint" readonly style="width:100%" /></td>\
                                <td class="p-1" style="font-size: 11px">IGAFOM PREVENTIVO</td>\
                                <td class="p-1" style="font-size: 11px"><input type="text" id="cmbIgafomPrevenPrint" readonly style="width:100%" /></td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" colspan="10" style="font-size: 12px; background-color:lightgray">08. CONCLUSIONES:</td>\
                            </tr>\
                            <tr>\
                                <td rowspan="1" class="p-2" style="font-size: 10px;">\
                                    TRAZABILIDAD <input type="text" style="width:100%;font-size:12px;text-align:center" readonly id="cmbResultadoPrint" />\
                                </td>\
                                <td rowspan="1" class="p-2" style="font-size: 10px;">\
                                    ESTADO PROVEEDOR <input type="text" style="width:100%;font-size:12px;text-align:center" readonly id="cmbEstadoIgafomPrint" />\
                                </td>\
                                <td colspan="9" class="p-2" style="font-size: 12px">\
                                    <textarea id="txtConclusionPrint" class="pt-2" readonly type="text" rows="3" style="width:100%;resize:none"></textarea>\
                                </td>\
                            </tr>\
                        </table>\
                        <div id="divCondicion">\
                            <table class="p-5" border="1">\
                                <tr>\
                                    <td class="p-1" colspan="2" width="20%" style="font-size: 11px">REALIZADO POR: </td>\
                                    <td class="p-1" colspan="2" width="20%" style="font-size: 11px">REVISADO POR:</td>\
                                </tr>\
                                <tr>\
                                    <td class="p-1" style="font-size: 11px">NOMBRE Y APELLIDO </td>\
                                    <td class="p-1" style="font-size: 11px">\
                                         <select type="text" id="cmbRealizadopor" style="width:100%" />\
                                        <label id="lblErrortxtRealizadoPor" style="color: red; font-size: 12px !important; display: none"></label>\
                                    </td>\
                                    <td class="p-1" style="font-size: 11px">NOMBRE Y APELLIDO:</td>\
                                    <td class="p-1" style="font-size: 11px">\
                                        <select type="text" id="cmbRevisadopor" style="width:100%" />\
                                        <label id="lblErrortxtRevisadoPor" style="color: red; font-size: 12px !important; display: none"></label>\
                                    </td>\
                                </tr>\
                                <tr>\
                                    <td class="p-1" style="font-size: 11px">FIRMA: </td>\
                                    <td class="p-1" style="font-size: 11px"><center><img id="imgRealizadoPor" style="width:150px;height:80px" /></center></td>\
                                    <td class="p-1" style="font-size: 11px">FIRMA:</td>\
                                    <td class="p-1" style="font-size: 11px"><center><img id="imgRevisadoPor" style="width:150px;height:80px" /></center></td>\
                                </tr>\
                                <tr>\
                                    <td class="p-1" style="font-size: 11px">FECHA DE INFORME: </td>\
                                    <td class="p-1" style="font-size: 11px"><input type="date" id="txtFechaRealizado" onkeydown="return false" autocomplete="off" style="width:50%" /></td>\
                                    <td class="p-1" style="font-size: 11px">FECHA DE INFORME:</td>\
                                    <td class="p-1" style="font-size: 11px"><input type="date" id="txtFechaRevisado" onkeydown="return false" autocomplete="off" style="width:50%" /></td>\
                                </tr>\
                            </table>\
                        </div>\
                    </div>\
                </div>\
                <div class="modal-footer" id="divCondicionFooter">\
                    <div>\
                        N° de Reporte: <label id="lblVersionReport"  style="padding-right:60%;"></label>\
                    <button type="button" class="btn btn-success" onclick="Imprimir()"><i class="fa fa-file text-110 align-text-bottom mr-1"></i>Generar Reporte</button>\
                    <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times-circle text-110 align-text-bottom mr-1"></i>Cancelar</button><br /><br />\
                    </div>\
                </div>\
            </div>\
        </div>\
        ');
    ListaDepartamentosPrint();
    ListaSedesPrint();
    ListaFirmantesRevisado();
    ListaFirmantesRealizado();
    //EVENTO PARA MOSTRAR IMAGENES DE FIRMA EN REALIZADO POR
    $("#cmbRealizadopor").change(function () {
        if ($("#cmbRealizadopor").val() == '0') {
            $("#imgRealizadoPor").attr('src', '/firmas/vacio.png');
          
        } else {
            $.ajax({
                url: '/Home/ListaFirmantes?V_DNI=' + $("#cmbRealizadopor").val(),
                type: 'GET',
                dataType: 'json',
                data: 'data',
                success: function (data) {
                    $('#imgRealizadoPor').empty();
                    var datos = data.data;
                    $(datos).each(function (index, value) {
                        $("#imgRealizadoPor").attr('src', '/firmas/' + value.v_FOTOFIRMA);

                    });

                },
            });
        }

    });

    //EVENTO PARA MOSTRAR IMAGENES DE FIRMA EN REVISADO POR
    $("#cmbRevisadopor").change(function () {
        if ($("#cmbRevisadopor").val() == '0') {
            $('#imgRevisadoPor').attr('src', '/firmas/vacio.png');
        } else {
            $.ajax({
                url: '/Home/ListaFirmantes?V_DNI=' + $("#cmbRevisadopor").val(),
                type: 'GET',
                dataType: 'json',
                data: 'data',
                success: function (data) {
                    $('#imgRevisadoPor').empty();
                    var datos = data.data;
                    $(datos).each(function (index, value) {
                        $("#imgRevisadoPor").attr('src', '/firmas/' + value.v_FOTOFIRMA);
                    });

                },
            });
        }
    });

}
//MODAL DE VERSION 3
function crearModalV3() {
    $("#myModalPrint").empty();
    $("#myModalPrint").append('<div class= "modal-dialog modal-xl table-responsive" role = "document">\
        <div class="modal-content">\
            <div class="modal-header">\
                <h6 class="modal-title">REPORTE REINFO VERSION 3</h6>\
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                    <span aria-hidden="true">&times;</span>\
                </button>\
            </div>\
            <div id="IdImprimir">\
                <div class="modal-body ace-scrollbar p-0">\
                    <input type="text" id="txtId_reinfoReporte" style="display:none" />\
                    <table class="table table-responsive" style="width:100%" border="1">\
                        <tr>\
                            <th rowspan="4"><img src="/images/laytaruma.png" class="pt-4" /></th>\
                            <th width="61%"> <center><h5><strong>MINERA LAYTARUMA S.A.</strong></h5></center></th>\
                            <th width="25%" class="p-0 pl-1 pt-1" style="font-size:13px">\
                                Protocolo: <label id="lblProtocolo"></label>\
                                <hr class="m-0" />\
                                Versión: <label id="lblVersionPrint"></label>\
                            </th>\
                        </tr>\
                        <tr>\
                            <td rowspan="2"><center><h5>REGISTRO INSPECCIÓN DE LABORES MINERAS TRAZABILIDAD</h5></center></td>\
                            <td style="font-size:14px" class="p-0 pl-1">\
                                Fecha : <label id="lblFechaPrint"></label>\
                                <hr class="m-0" />\
                                <label>Página 1 de 1</label>\
                            </td>\
                        </tr>\
                    </table>\
                    <table class="" border="1" style="width:100%">\
                        <tr>\
                            <th class="p-1" colspan="4" width="48%" style="font-size: 12px; background-color: lightgray ">01. DATOS GENERALES</th>\
                        </tr>\
                        <tr>\
                            <td class="p-1" style="font-size:12px" width="18%">PERSONA NATURAL/JURÍDICA</td>\
                            <td class="p-1" style="font-size:12px" width="40%"><input style="width: 100%; font-size: 12px" type="text" border="1" readonly id="txtPersonaNaturalJurPrint" /></td>\
                            <td class="p-1" style="font-size:12px">CONCESIÓN</td>\
                            <td class="p-1" style="font-size:12px"><input type="text" style="width: 100%;font-size:12px" border="1" readonly id="txtConcesionPrint" /></td>\
                        </tr>\
                        <tr>\
                            <td class="p-1" style="font-size:12px">RUC</td>\
                            <td class="p-1" style="font-size:12px"><input type="text" style="width:100%;font-size:12px" border="1" readonly id="txtRucPrint"></td>\
                                <td class="p-1" style="font-size:12px" width="14%">CÓDIGO</td>\
                                <td class="p-1" style="font-size:12px" width="30%"><input style="width: 100%; font-size: 12px" type="text" border="1" readonly id="txtCodigoDMPrint" /></td>\
                        </tr>\
                        <tr>\
                                <td class="p-1" style="font-size:12px">TM-PH/(Referencial)</td>\
                                <td class="p-1" style="font-size:12px"><input type="text" style="font-size: 12px; width: 100%;" border="1" readonly id="txtTmphMesPrint" /></td>\
                                <td class="p-1" style="font-size:12px">SITUACIÓN</td>\
                                <td class="p-1" style="font-size:12px"><select type="text" id="cmbSituacionIngemmetPrint" disabled="disabled" style="width:100%" >\
                             <option value="0"></option>\
                                <option value="VIGENTE">VIGENTE</option>\
                                  <option value="EXTINGUIDO">EXTINGUIDO</option></select></td>\
                        </tr>\
                         <tr>\
                                <td class="p-1" colspan=2 style="font-size:12px"></td>\
                                <td class="p-1" colspan=2 style="font-size:11px;vertical-align:middle">  * Si el derecho minero se encuentra Extinguido adjuntar el reporte del Ingemmet &nbsp; <input type="checkbox" id="cboxReporInge" style="vertical-align:middle;" disabled></td>\
                        </tr>\
                    </table>\
                        <table class="" border="1">\
                            <tr>\
                                <th class="p-1" colspan="4" style="font-size: 12px; background-color: lightgray ">02. COORDENADAS</th>\
                            </tr>\
                            <tr>\
                                <td class="p-1" style="font-size: 12px">2.1 EN REINFO/ IGAFOM</td>\
                                <td class="p-1" style="font-size: 12px">2.2 EN CAMPO</td>\
                            </tr>\
                            <tr>\
                                <td class="p-1">\
                                    <table>\
                                        <tr>\
                                            <th class="p-1" style="font-size:11px" width="23%"></th>\
                                            <th class="p-1" style="font-size:11px"></th>\
                                            <th class="p-1" colspan="4" style="font-size:11px;border:groove" ><center>WGS-84</center></th>\
                                            <th class="p-1" style="font-size:11px"></th>\
                                            <th class="p-1" style="font-size:11px"></th>\
                                        </tr>\
                                        <tr>\
                                            <th class="p-1" style="font-size: 11px; border: groove" width="26%">DERECHO MINERO</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">ZONA</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">1.NORTE</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">1.ESTE</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">2.NORTE</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">2.ESTE</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">ACTIVIDAD</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">FECHA</th>\
                                        </tr>\
                                        <tr>\
                                            <td class="p-1" style="font-size: 11px; border: groove" width="26%"><input type="text" style="width:100%" border="1" readonly id="txtNomDerMinPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtZonaReinPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtNorte1Print" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtEste1Print" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtNorte2Print" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtEste2Print" /></td>\
                                            <td class="p-1" width="16%" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtTipoActivPrint" /></td>\
                                            <td class="p-1" width="11%" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtFechaReinfoPrint" /></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                                <td class="p-1">\
                                    <table>\
                                        <tr>\
                                            <th class="p-1" style="font-size: 11px;"></th>\
                                            <th class="p-1" style="font-size: 11px;"></th>\
                                            <th class="p-1" colspan="2" style="font-size: 11px; border: groove"><center>WSG-84</center></th>\
                                        </tr>\
                                        <tr>\
                                            <th class="p-1" width="46%" style="font-size: 11px; border: groove ">COMPONENTE</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">ZONA</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">NORTE</th>\
                                            <th class="p-1" style="font-size: 11px; border: groove">ESTE</th>\
                                        </tr>\
                                        <tr>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="cmbComponentePrint" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="cmbZonaCampoPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtNorteCPrint" /></td>\
                                            <td class="p-1" style="font-size: 11px; border: groove"><input type="text" style="width:100%" border="1" readonly id="txtEsteCPrint" /></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" style="font-size: 12px">2.3 DIFERENCIA ENTRE COORDENADAS: <input type="text" border="1" readonly style="width:17%" class="pl-2" id="txtDifCoordenadasPrint" />METROS &nbsp; &nbsp; &nbsp; <input type="checkbox" id="cboxConsRein" style="vertical-align:middle;" disabled>CONSTANCIA DE REINFO </td>\
                                <td class="p-1" style="font-size: 12px;"><select type="text" id="cmbSedePrint" border="1" style="display: none;"  class="pl-2" /><input type="checkbox" id="cboxMapUbicacion" disabled style="vertical-align:middle;">MAPA DE UBICACIÓN</td>\
                            </tr>\
                            <tr>\
                                <td colspan="3" class="p-0">\
                                    <table class="p-0" border="1" width="100%">\
                                        <tr>\
                                            <td class="p-1" width="10%" style="font-size: 11px">UBICACIÓN POLITICA</td>\
                                            <td class="p-1" style="font-size: 11px">DEPARTAMENTO</td>\
                                            <td class="p-1" width="30%" style="font-size: 11px"><select type="text" id="cmbDepartamentoPrint" disabled="disabled" style="width:100%" /></td>\
                                            <td class="p-1" style="font-size: 11px">PROVINCIA</td>\
                                            <td class="p-1" width="30%" style="font-size: 11px"><select type="text" id="cmbProvinciaPrint" disabled="disabled" style="width:100%" /></td>\
                                            <td class="p-1" style="font-size: 11px">DISTRITO</td>\
                                            <td class="p-1" width="30%" style="font-size: 11px"><select type="text" id="cmbCiudadPrint" disabled="disabled" style="width:100%" /></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" colspan="2" style="font-size: 12px; background-color:lightgray">03. DESCRIPCIÓN DE LA LABOR Y MINERALES:</td>\
                            </tr>\
                             <tr>\
                                <td class="p-1" colspan="2" style="font-size: 8px;">CARACTERISTICAS DE LA LABOR (Capacidad de producción - Clasificación de Mineral que extrae; óxidos y/o súlfuros - Tipos de Minerales )</td>\
                            </tr>\
                            <tr>\
                                <td colspan="2" class="p-2" style="font-size: 12px">\
                                    <textarea type="text" style="width:100%;resize:none" readonly placeholder="(Capacidad de producción - Clasificación de Mineral que extrae; óxidos y/o súlfuros - Tipos de Minerales )" id="txtDescripLaborPrint"></textarea>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" style="font-size: 11px">PANEL FOTOGRÁFICO (FOTOS DE LA LABOR)</td>\
                            </tr>\
                        </table >\
                        <table style="height:50%" border="1">\
                            <tr id="trLaborMinera">\
                            </tr>\
                        </table>\
                        <table style="height:50%" border="1" width="100%">\
                            <tr>\
                                <td class="p-1" colspan="5" style="font-size: 12px; background-color:lightgray">04. EQUIPOS Y HERRAMIENTAS (Detallar los equipos mineros):</td>\
                            </tr>\
                            <tr>\
                                <td width="15%">\
                                    <table>\
                                        <tr id="trListaEquipos">\
                                            <td class="p-1" width="10%" align="center"><p style="font-size:11px;text-align:left;font-weight:bold;color:darkblue" id="pEquiposLista"><div id="contenedorEquipos" style="font-size:11px;text-align:left;font-weight:bold;color:darkblue"></div></p></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                                <td>\
                                    <table border="1">\
                                        <tr id="trEquipos">\
                                    </tr>\
                                    </table>\
                                </td>\
                            </tr>\
                        </table>\
                        <table style="height:50%" border="1" width="100%">\
                            <tr>\
                                <td class="p-1" colspan="5" style="font-size: 12px; background-color:lightgray">05. INSTALACIONES Y AMBIENTES (Detallar las instalaciones y/o ambientes):</td>\
                            </tr>\
                            <tr>\
                                <td width="15%">\
                                    <table>\
                                        <tr>\
                                            <td class="p-1" width="10%" align="center"><p style="font-size:11px;text-align:left;font-weight:bold;color:darkblue" id="pAmbienteLista"><div id="contenedorAmbiente" style="font-size:11px;text-align:left;font-weight:bold;color:darkblue"></div></p></td>\
                                        </tr>\
                                    </table>\
                                </td>\
                                <td>\
                                    <table border="1">\
                                        <tr id="trAmbiente">\
                                    </tr>\
                                    </table>\
                                </td>\
                            </tr>\
                        </table>\
                        <table class="table table-responsive" border="1">\
                            <tr>\
                                <td class="p-1" colspan="6" width="70%" style="font-size: 12px; background-color:lightgray">06. FUERZA LABORAL</td>\
                                <td class="p-1" colspan="4" width="30%" style="font-size: 12px; background-color:lightgray">07. ESTADO REINFO</td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" width="2%" style="font-size: 11px">HOMBRES</td>\
                                <td class="p-1" width="14%" style="font-size: 11px"><input type="text" id="txtCantHombPrint" readonly style="width:50%" /></td>\
                                <td class="p-1" width="2%" style="font-size: 11px">MUJERES</td>\
                                <td class="p-1" width="14%" style="font-size: 11px"><input type="text" id="txtCantMujePrint" readonly style="width:50%" /></td>\
                                <td class="p-1" width="2%" style="font-size: 11px">TOTAL PERSONAL</td>\
                                <td class="p-1" width="14%" style="font-size: 11px"><input type="text" id="txtTotalPersoPrint" readonly style="width:50%" /></td>\
                                <td class="p-1" colspan="2" width="10%" style="font-size: 11px">ESTADO REINFO</td>\
                                <td class="p-1" colspan="2" width="10%" style="font-size: 11px"><input type="text" style="width:100%;font-size:12px;text-align:center" readonly id="cmbEstadoIgafomPrint" />\
                                </select>\
                                </td >\
                        </tr>\
                            <tr>\
                                <td class="p-1" colspan="6" width="70%" style="font-size: 12px; background-color:lightgray">08. IGAFOM</td>\
                                <td class="p-1" colspan="4" width="30%" style="font-size: 12px; background-color:lightgray">09. DECLARACIÓN DE PRODUCCIÓN</td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" width="10%" style="font-size: 11px">IGAFOM CORRECTIVO</td>\
                                <td class="p-1" style="font-size: 11px"><input type="text" id="cmbIgafomCorrectPrint" readonly style="width:75%" /><input type="checkbox" id="cboxIgafCorrect" disabled style="width:20%;vertical-align:middle"></td>\
                                <td class="p-1" width="10%" style="font-size: 11px">IGAFOM PREVENTIVO</td>\
                                <td class="p-1" style="font-size: 11px"><input type="text" id="cmbIgafomPrevenPrint" readonly style="width:75%" /><input type="checkbox" id="cboxIgafPrev" disabled style="width:20%;vertical-align:middle"></td>\
                                <td class="p-1" width="10%" style="font-size: 11px">SITUACIÓN</td>\
                                <td class="p-1" style="font-size: 11px"><select type="text" id="cmbSituacionProduccionPrint" disabled="disabled" style="width:100%">\
                                     <option value="0"></option>\
                                <option value="DECLARADO">DECLARADO</option>\
                                  <option value="PENDIENTE">PENDIENTE</option>\
                                <option value="NO DECLARA">NO DECLARA</option>\
                                </select>\
                                </td >\
                                <td class="p-1" style="font-size: 11px">AÑO</td>\
                                <td class="p-1" style="font-size: 11px"><input type="text" id="txtAnioPrint" readonly style="width:70%" /></td>\
                                <td class="p-1" style="font-size: 11px">SEMESTRE</td>\
                                <td class="p-1" style="font-size: 11px"><input type="text" id="txtSemestrePrint" readonly style="width:50%" /><input type="checkbox" id="cboxDecMinera" disabled style="width:40%;vertical-align:middle"></td>\
                            </tr>\
                            <tr>\
                                <td class="p-1" colspan="10" style="font-size: 12px; background-color:lightgray">10. CONCLUSIONES:</td>\
                            </tr>\
                            <tr>\
                                <td rowspan="1" class="p-2" style="font-size: 10px;">\
                                    TRAZABILIDAD <input type="text" style="width:100%;font-size:12px;text-align:center" readonly id="cmbResultadoPrint" />\
                                </td>\
                                <td rowspan="1" class="p-2" style="font-size: 10px;display:none">\
                                    ESTADO PROVEEDOR <input type="text" style="width:100%;font-size:12px;text-align:center" readonly id="cmbEstadoIgafomPrint" />\
                                </td>\
                                <td colspan="9" class="p-2" style="font-size: 12px">\
                                    <textarea id="txtConclusionPrint" class="pt-2" readonly type="text" rows="3" style="width:100%;resize:none"></textarea>\
                                </td>\
                            </tr>\
                        </table>\
                        <div id="divCondicion">\
                            <table class="p-5" border="1">\
                                <tr>\
                                    <td class="p-1" colspan="2" width="20%" style="font-size: 11px">REALIZADO POR: </td>\
                                    <td class="p-1" colspan="2" width="20%" style="font-size: 11px">REVISADO POR:</td>\
                                </tr>\
                                <tr>\
                                    <td class="p-1" style="font-size: 11px" width="20px" align="right">NOMBRE Y APELLIDO </td>\
                                    <td class="p-1" style="font-size: 11px">\
                                         <select type="text" id="cmbRealizadopor" style="width:100%" />\
                                        <label id="lblErrortxtRealizadoPor" style="color: red; font-size: 12px !important; display: none"></label>\
                                    </td>\
                                    <td class="p-1" style="font-size: 11px" width="20px" align="right">NOMBRE Y APELLIDO:</td>\
                                    <td class="p-1" style="font-size: 11px">\
                                        <select type="text" id="cmbRevisadopor" style="width:100%" />\
                                        <label id="lblErrortxtRevisadoPor" style="color: red; font-size: 12px !important; display: none"></label>\
                                    </td>\
                                </tr>\
                                <tr>\
                                    <td class="p-1" style="font-size: 11px" align="right">FIRMA: </td>\
                                    <td class="p-1" style="font-size: 11px"><center><img id="imgRealizadoPor" style="width:150px;height:80px" /></center></td>\
                                    <td class="p-1" style="font-size: 11px" align="right">FIRMA:</td>\
                                    <td class="p-1" style="font-size: 11px"><center><img id="imgRevisadoPor" style="width:150px;height:80px" /></center></td>\
                                </tr>\
                                <tr>\
                                    <td class="p-1" style="font-size: 11px" align="right">FECHA DE INFORME: </td>\
                                    <td class="p-1" style="font-size: 11px"><input type="date" id="txtFechaRealizado" onkeydown="return false" autocomplete="off" style="width:50%" /></td>\
                                    <td class="p-1" style="font-size: 11px" align="right">FECHA DE INFORME:</td>\
                                    <td class="p-1" style="font-size: 11px"><input type="date" id="txtFechaRevisado" onkeydown="return false" autocomplete="off" style="width:50%" /></td>\
                                </tr>\
                            </table>\
                        </div>\
                </div>\
                </div>\
                <div class="modal-footer" id="divCondicionFooter">\
                    <div>\
                        N° de Reporte: <label id="lblVersionReport"  style="padding-right:60%;"></label>\
                    <button type="button" class="btn btn-success" onclick="Imprimir()"><i class="fa fa-file text-110 align-text-bottom mr-1"></i>Generar Reporte</button>\
                    <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times-circle text-110 align-text-bottom mr-1"></i>Cancelar</button><br /><br />\
                    </div>\
                </div>\
            </div>\
        </div>\
        ');

    //lista departamentos para el area de vista previa
    ListaDepartamentosPrint();
    //lista departamentos para las sedes en el area de vista previa
    ListaSedesPrint();
    //lista firmantes para la vista previa
    ListaFirmantesRevisado();
    //lista firmantes para la vista previa
    ListaFirmantesRealizado();
    //EVENTO PARA MOSTRAR IMAGENES DE FIRMA EN REALIZADO POR
    $("#cmbRealizadopor").change(function () {
        if ($("#cmbRealizadopor").val() == '0') {
            $("#imgRealizadoPor").attr('src', '/firmas/vacio.png');
        } else {
            $.ajax({
                url: '/Home/ListaFirmantes?V_DNI=' + $("#cmbRealizadopor").val(),
                type: 'GET',
                dataType: 'json',
                data: 'data',
                success: function (data) {
                    $('#imgRealizadoPor').empty();
                    var datos = data.data;
                    $(datos).each(function (index, value) {
                        $("#imgRealizadoPor").attr('src', '/firmas/' + value.v_FOTOFIRMA);

                    });

                },
            });
        }

    });
    //EVENTO PARA MOSTRAR IMAGENES DE FIRMA EN REVISADO POR
    $("#cmbRevisadopor").change(function () {
        if ($("#cmbRevisadopor").val() == '0') {
            $('#imgRevisadoPor').attr('src', '/firmas/vacio.png');
        } else {
            $.ajax({
                url: '/Home/ListaFirmantes?V_DNI=' + $("#cmbRevisadopor").val(),
                type: 'GET',
                dataType: 'json',
                data: 'data',
                success: function (data) {
                    $('#imgRevisadoPor').empty();
                    var datos = data.data;
                    $(datos).each(function (index, value) {
                        $("#imgRevisadoPor").attr('src', '/firmas/' + value.v_FOTOFIRMA);
                    });
                    
                },
            });
        }
    });
    //check box para identificar si existe igafom correctivo y preventivo
}
//VALIDA EL REINFO 
function fnValidarReinfo() {
    var isSave = true;
    var txtPersonNatJur = $("#txtPersonNatJur").val().trim();
    var txtRuc = $("#txtRuc").val().trim();
    var txtCodigoDM = $("#txtCodigoDM").val().trim();
    var txtConcesion = $("#txtConcesion").val().trim();
    var cmbTipoActiv = $("#cmbTipoActiv").val();
    var cmbComponente = $("#cmbComponente").val();
    var cmbIgafomCorrect = $("#cmbIgafomCorrect").val();
    var cmbIgafomPreven = $("#cmbIgafomPreven").val();
    var cmbEstadoIgafom = $("#cmbEstadoIgafom").val();
    var cmbResultado = $("#cmbResultado").val();
    var cmbDepartamento = $("#cmbDepartamento").val();
    var cmbProvincia = $("#cmbProvincia").val();
    var cmbCiudad = $("#cmbCiudad").val();
    var cmbCondicionMinero = $('#cmbIngemmet').val();
    var filesIngemmet = $('#filesIngemmet').val();
    var filesIngemmet1 = $('#filesIngemmet1').val();

    if (txtPersonNatJur == "") {
        isSave = false;
        $('#lblErrortxtPersonNatJur').css("display", "block");
        $("#lblErrortxtPersonNatJur").text("(*) Datos Obligatorios");
    }
    else {
        $('#lblErrortxtPersonNatJur').css("display", "none");
        $("#lblErrortxtPersonNatJur").text("");
    }
    if (txtRuc == "") {
        isSave = false;
        $('#lblErrortxtRuc').css("display", "block");
        $("#lblErrortxtRuc").text("(*) Datos Obligatorios");
    }
    else {
        $('#lblErrortxtRuc').css("display", "none");
        $("#lblErrortxtRuc").text("");
    }

    if (txtConcesion == "") {
        isSave = false;
        $('#lblErrortxtConcesion').css("display", "block");
        $("#lblErrortxtConcesion").text("(*) Datos Obligatorios");
    }
    else {
        $('#lblErrortxtConcesion').css("display", "none");
        $("#lblErrortxtConcesion").text("");
    }
    if (txtCodigoDM == "") {
        isSave = false;
        $('#lblErrortxtCodigoDM').css("display", "block");
        $("#lblErrortxtCodigoDM").text("(*) Datos Obligatorios");
    }
    else {
        $('#lblErrortxtCodigoDM').css("display", "none");
        $("#lblErrortxtCodigoDM").text("");
    }

    if (cmbTipoActiv == "0") {
        isSave = false;
        $('#lblErrorcmbTipoActiv').css("display", "block");
        $("#lblErrorcmbTipoActiv").text("(*) Datos Obligatorios");
    }
    else {
        $('#lblErrorcmbTipoActiv').css("display", "none");
        $("#lblErrorcmbTipoActiv").text("");
    }

    if (cmbComponente == "0") {
        isSave = false;
        $('#lblErrorcmbComponente').css("display", "block");
        $("#lblErrorcmbComponente").text("(*) Datos Obligatorios");
    }
    else {
        $('#lblErrorcmbComponente').css("display", "none");
        $("#lblErrorcmbComponente").text("");
    }

    if (cmbIgafomCorrect == "0") {
        isSave = false;
        $('#lblErrorcmbIgafomCorrect').css("display", "block");
        $("#lblErrorcmbIgafomCorrect").text("(*) Datos Obligatorios");
    }
    else {
        $('#lblErrorcmbIgafomCorrect').css("display", "none");
        $("#lblErrorcmbIgafomCorrect").text("");
    }
    if (cmbIgafomPreven == "0") {
        isSave = false;
        $('#lblErrorcmbIgafomPreven').css("display", "block");
        $("#lblErrorcmbIgafomPreven").text("(*) Datos Obligatorios");
    }
    else {
        $('#lblErrorcmbIgafomPreven').css("display", "none");
        $("#lblErrorcmbIgafomPreven").text("");
    }
    if (cmbEstadoIgafom == "0") {
        isSave = false;
        $('#lblErrorcmbEstadoIgafom').css("display", "block");
        $("#lblErrorcmbEstadoIgafom").text("(*) Datos Obligatorios");
    }
    else {
        $('#lblErrorcmbEstadoIgafom').css("display", "none");
        $("#lblErrorcmbEstadoIgafom").text("");
    }
    if (cmbResultado == "0") {
        isSave = false;
        $('#lblErrorcmbResultado').css("display", "block");
        $("#lblErrorcmbResultado").text("(*) Datos Obligatorios");
    }
    else {
        $('#lblErrorcmbResultado').css("display", "none");
        $("#lblErrorcmbResultado").text("");
    }

    if (cmbDepartamento == "0") {
        isSave = false;
        $('#lblErrorcmbDepartamento').css("display", "block");
        $("#lblErrorcmbDepartamento").text("(*) Datos Obligatorios");
    }
    else {
        $('#lblErrorcmbDepartamento').css("display", "none");
        $("#lblErrorcmbDepartamento").text("");
    }
    if (cmbProvincia == "0") {
        isSave = false;
        $('#lblErrorcmbProvincia').css("display", "block");
        $("#lblErrorcmbProvincia").text("(*) Datos Obligatorios");
    }
    else {
        $('#lblErrorcmbProvincia').css("display", "none");
        $("#lblErrorcmbProvincia").text("");
    }
    if (cmbCiudad == "0") {
        isSave = false;
        $('#lblErrorcmbCiudad').css("display", "block");
        $("#lblErrorcmbCiudad").text("(*) Datos Obligatorios");
    }
    else {
        $('#lblErrorcmbCiudad').css("display", "none");
        $("#lblErrorcmbCiudad").text("");
    }

    if ($('#TxtIndicador').val() == 0) {
        var nFilas = $("#idListaDocIngemmet tr").length;
        
        if (cmbCondicionMinero == "EXTINGUIDO" && nFilas == 0) {
            isSave = false;
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Debe ingresar documento Ingemmet si la condición es Extinguido',
                showConfirmButton: false,
                timer: 2500
            });
        }
    } else {
        //if (cmbCondicionMinero == "EXTINGUIDO"  && filesIngemmet == "") {
        //    isSave = false;
        //    Swal.fire({
        //        position: 'center',
        //        icon: 'error',
        //        title: 'Debe ingresar documento Ingemmet si la condición es Extinguido',
        //        showConfirmButton: false,
        //        timer: 2500
        //    });
        //}
    }
    return isSave;
}

function fnCargarNoticia() {
    $.ajax({
        url: '/Home/ListaArchivo?N_CODIGAFOM=0&N_CODREIN=%&V_TIPOIMAG=NOTICIAS&V_TIPOIGAFOM=%',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        complete: function () {
            $('#myModalNotice').removeAttr('hidden');
            $('#myModalNotice').modal("show");

        },
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                $.ajax({
                    async: false,
                    url: '/Home/previsualizar?fileName=' + value.v_NOMBRE,
                    type: 'GET',
                    dataType: 'json',
                    data: 'data',
                    success: function (data) {
                        var datos = data.data;
                        $("#ImagenContentNoticias").attr('src', datos);
                    },

                });

            });

        },

    });

}
