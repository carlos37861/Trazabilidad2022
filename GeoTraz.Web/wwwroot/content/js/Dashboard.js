//variables globales

var UserSede = 0;
var UsuarioNom = "";

jQuery(function ($) {
    $('#lidashboard').addClass('active');
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
                filtraSedeReporte(UserSede);
                var nombresede = buscaNombreSede(UserSede);
                $("#lblSede").text(nombresede);
                $("#lblBotonesSede" + UserSede).addClass("active");
            });
        },
    });

});

// CREACIÓN DE GRAFICOS SEGUN LA SEDE QUE SELECCIONE
function filtraSedeReporte(id) {
    $.ajax({
        url: '/Home/FiltrarReinfo?V_RUC=%&V_PROVEEDOR=%&V_CODCONSECION=%&V_NOMCONSECION=%%&V_NOMDERECHMINE=%&V_FECREINFO=%&V_RESULTADOS=%&N_SEDES=' + id,
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
            $('#myModalLoading').removeAttr('hidden');
            $('#myModalLoading').modal("show");

        },
        complete: function () {
            $('#myModalLoading').attr('hidden', true);
            $('#myModalLoading').modal('hide');
            $("#myModalSedes").modal('hide');
        },
        data: 'data',
        success: function (data) {
            //VARIABLES GLOBALES DE LA FUNCION
            var datos = data.data;
            var trazable = 0;
            var pendiente = 0;
            var notrazable = 0;
            var formalizado = 0;
            var vigente = 0;
            var suspendido = 0;
            var contadorDecMinSi = 0;
            var contadorDecMinNo = 0;
            var contadorCargoCorrectSi = 0;
            var contadorCargoCorrectNo = 0;
            var contadorCargoPrevSi = 0;
            var contadorCargoPrevNo = 0;
            var contadorInformeCorrecNo = 0;
            var contadorInformeCorrecSi = 0;
            var contadorInformePrevSi = 0;
            var contadorInformePrevNo = 0;
            var contadorRegistros = 0;
            

            $(datos).each(function (index, value) {
                //CONTADOR DE REGISTROS
                contadorRegistros = contadorRegistros + 1;

                //CONTADOR RESULTADO REINFO
                if (value.v_RESULTADOS == "TRAZABLE") {
                    trazable = trazable + 1;
                } else if (value.v_RESULTADOS == "PENDIENTE") {
                    pendiente = pendiente + 1;
                } else if (value.v_RESULTADOS == "NO TRAZABLE") {
                    notrazable = notrazable + 1;
                }
                //CONTADOR ESTADO PROVEEDOR
                if (value.v_ESTADOIGAFOM == "FORMALIZADO") {
                    formalizado = formalizado + 1
                } else if (value.v_ESTADOIGAFOM == "VIGENTE") {
                    vigente = vigente + 1
                } else if (value.v_ESTADOIGAFOM == "SUSPENDIDO") {
                    suspendido = suspendido + 1
                }
                //CONTADOR DECLARACION DE PRODUCCION
                if (value.v_CARGODECMINERA == 1) {
                    contadorDecMinSi = contadorDecMinSi + 1;
                } else if (value.v_CARGODECMINERA == 0) {
                    contadorDecMinNo = contadorDecMinNo + 1;
                }
                //CONTADOR CARGO IGAFOM CORRECTIVO
                if (value.v_CARGOCORRECT == 1) {
                    contadorCargoCorrectSi = contadorCargoCorrectSi + 1;
                } else if (value.v_CARGOCORRECT == 0) {
                    contadorCargoCorrectNo = contadorCargoCorrectNo + 1;
                }
                //CONTADOR CARGO IGAFOM CORRECTIVO
                if (value.v_CARGOPREVENT == 1) {
                    contadorCargoPrevSi = contadorCargoPrevSi + 1;
                } else if (value.v_CARGOPREVENT == 0) {
                    contadorCargoPrevNo = contadorCargoPrevNo + 1;
                }
                //CONTADOR INFORME IGAFOM CORRECTIVO
                if (value.v_INFOMERCORRECT == 1) {
                    contadorInformeCorrecSi = contadorInformeCorrecSi + 1;
                } else if (value.v_INFOMERCORRECT == 0) {
                    contadorInformeCorrecNo = contadorInformeCorrecNo + 1;
                }
                //CONTADOR INFORME IGAFOM CORRECTIVO
                if (value.v_INFORMEPREVENT == 1) {
                    contadorInformePrevSi = contadorInformePrevSi + 1;
                } else if (value.v_INFORMEPREVENT == 0) {
                    contadorInformePrevNo = contadorInformePrevNo + 1;
                }
            });
            //SPAN RESLTADO REINFOR
            $("#spanTrazables").text(trazable);
            $("#spanPendientes").text(pendiente);
            $("#spanNotrazables").text(notrazable);
            //SPAN ESTADO PROVEEDOR
            $("#spanFormalizados").text(formalizado);
            $("#spanVigente").text(vigente);
            $("#spanSuspendidos").text(suspendido);
            //SPAN DECLARACION MINERA
            $("#spanSi").text(contadorDecMinSi);
            $("#spanNo").text(contadorDecMinNo);
            //SPAN CARGO IGAFOM CORRECTIVO
            $("#spanSiCorrec").text(contadorCargoCorrectSi);
            $("#spanNoCorrec").text(contadorCargoCorrectNo);
            //SPAN CARGO IGAFOM PREVENTIVO
            $("#spanSiPrev").text(contadorCargoPrevSi);
            $("#spanNoPrev").text(contadorCargoPrevNo);
            //SPAN INFORME IGAFOM CORRECTIVO
            $("#spanSiCorrecInforme").text(contadorInformeCorrecSi);
            $("#spanNoCorrecInforme").text(contadorInformeCorrecNo);
            //SPAN INFORME IGAFOM PREVENTIVO
            $("#spanSiPrevInforme").text(contadorInformePrevSi);
            $("#spanNoPrevInforme").text(contadorInformePrevNo);
            //SUMA DE TOTALES
            var total = trazable + pendiente + notrazable
            var totalEI = formalizado + vigente + suspendido;
            //PORCENTAJES A MOSTRAR EN LOS GRAFICOS
            var porcentajeTrazable = ((trazable / total) * 100);
            var porcentajePendiente = ((pendiente / total) * 100);
            var porcentajeNotrazable = ((notrazable / total) * 100);
            var porcentajeFormalizado = ((formalizado / totalEI) * 100);
            var porcentajeVigente = ((vigente / totalEI) * 100);
            var porcentajeSuspendido = ((suspendido / totalEI) * 100);

            //VALORES REDONDEADOS
            var roundTrazable = parseFloat(porcentajeTrazable.toFixed(2));
            var roundPendiente = parseFloat(porcentajePendiente.toFixed(2));
            var roundNoTrazable = parseFloat(porcentajeNotrazable.toFixed(2));

            var roundFormalizado = parseFloat(porcentajeFormalizado.toFixed(2));
            var roundVigente = parseFloat(porcentajeVigente.toFixed(2));
            var roundSuspendido = parseFloat(porcentajeSuspendido.toFixed(2));
            //SI NO EXISTE REGISTROS EN LA SEDE SELECCIONADA SE MOSTRARÁ UN MENSAJE 
            if (contadorRegistros == 0) {
                toastr["error"]("NO EXISTEN REGISTROS PARA LA SEDE SELECCIONADA.");
                $('#ResulReinfo').css("display", "none");
                $('#containerIgafPrevInforme').css("display", "none");
                $('#containerIgafCorrecInforme').css("display", "none");
                $('#containerIgafPrev').css("display", "none");
                $('#containerIgafCorrectivo').css("display", "none");
                $('#containerEstadoReinfo').css("display", "none");
                $('#containerEstadoIgafom').css("display", "none");
            } else {
                $('#ResulReinfo').css("display", "block");
                $('#containerIgafPrevInforme').css("display", "block");
                $('#containerIgafCorrecInforme').css("display", "block");
                $('#containerIgafPrev').css("display", "block");
                $('#containerIgafCorrectivo').css("display", "block");
                $('#containerEstadoReinfo').css("display", "block");
                $('#containerEstadoIgafom').css("display", "block");
            }
            //HIGHCHART ESTADO PROVEEDOR
            Highcharts.chart('containerEstadoIgafom', {
                chart: {
                    type: 'bar'
                },
                lang: {
                    downloadCSV: "Descarga CSV",
                    viewFullscreen: "Ver en pantalla completa",
                    printChart: 'Imprimir',
                    downloadPNG: 'Descargar imagen PNG',
                    downloadJPEG: 'Descargar imagen JPEG',
                    downloadPDF: 'Descargar imagen PDF',
                    downloadSVG: 'Descargar imagen SVG',
                    downloadXLS: 'Descargar imagen XLS',
                    viewData: 'Ver Tabla'
                },
                title: {
                    text: ''
                },
                exporting: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}: {point.y}</b>',
                            style: {
                                fontSize: '14px',
                            },
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
                },
                xAxis: {
                    categories: ['Formalizados', 'Vigentes', 'Suspendidos'],
                    title: {
                        text: null,
                    },
                    labels: {
                        style: {
                            fontSize: '15px',
                        },
                    }
   
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '',
                    },
                    labels: {
                        style: {
                            fontSize: '15px',
                        },
                    }
                },
                series: [
                    {
                        name: "CANTIDADES",
                        colorByPoint: false,                       
                        data: [
                            {
                                name: "Formalizados (" + roundFormalizado + "%)",
                                y: formalizado,
                                color: '#101A93'
                            },

                            {
                                name: "Vigentes (" + roundVigente + "%)",
                                y: vigente,
                                color: '#4381CD'
                            },
                            {
                                name: "Suspendidos  (" + roundSuspendido + " %)",
                                y: suspendido,
                                color: '#E62E1F'
                            }
                        ]
                    }
                ]
            });
            //HIGHCHART DECLARACION DE PRODUCCION
            Highcharts.chart('containerEstadoReinfo', {
                chart: {
                    type: 'pie'
                },
                lang: {
                    downloadCSV: "Descarga CSV",
                    viewFullscreen: "Ver en pantalla completa",
                    printChart: 'Imprimir',
                    downloadPNG: 'Descargar imagen PNG',
                    downloadJPEG: 'Descargar imagen JPEG',
                    downloadPDF: 'Descargar imagen PDF',
                    downloadSVG: 'Descargar imagen SVG',
                    downloadXLS: 'Descargar imagen XLS',
                    viewData: 'Ver Tabla'
                },
                title: {
                    text: ''
                },
                exporting: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y}',
                            style: {
                                fontSize: '14px',
                            },
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
                },
                series: [
                    {
                        name: "Declaración Minera",
                        colorByPoint: true,
                        data: [
                            {
                                name: "Si",
                                y: contadorDecMinSi,
                                color: '#28a745'

                            },
                            {
                                name: "No ",
                                y: contadorDecMinNo,
                                color: '#e15b5b'
                            },


                        ]
                    }
                ]
            });
            //HIGHCHART CARGO IGAFOM CORRECTIVO
            Highcharts.chart('containerIgafCorrectivo', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                exporting: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        style: {
                            fontSize: '20px',
                        },
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        style: {
                            fontSize: '15px',
                        },
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y}',
                            style: {
                                fontSize: '14px',
                            },
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> del Total<br/>'
                },

                series: [
                    {
                        name: "Cargo Igafom Correctivo",
                        colorByPoint: true,
                        data: [
                            {
                                name: "Si",
                                y: contadorCargoCorrectSi,
                                color: '#28a745'

                            },
                            {
                                name: "No",
                                y: contadorCargoCorrectNo,
                                color: '#e15b5b'
                            },
                        ]
                    }
                ]
               
            });
            //HIGHCHART CARGO IGAFOM PREVENTIVO
            Highcharts.chart('containerIgafPrev', {
                title: {
                    text: ''
                },
                chart: {
                    type: 'column'
                },
                 exporting: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        style: {
                            fontSize: '20px',
                        },
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        style: {
                            fontSize: '15px',
                        },
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y}'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> del Total<br/>'
                },

                series: [
                    {
                        name: "Cargo Igafom Preventivo",
                        colorByPoint: true,
                        data: [
                            {
                                name: "Si",
                                y: contadorCargoPrevSi,
                                color: '#28a745'

                            },
                            {
                                name: "No",
                                y: contadorCargoPrevNo,
                                color: '#e15b5b'
                            },
                        ]
                    }
                ]

            });
            //HIGHCHART INFORME IGAFOM CORRECTIVO
            Highcharts.chart('containerIgafCorrecInforme', {
                title: {
                    text: ''
                },
                chart: {
                    type: 'column'
                },
                exporting: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        style: {
                            fontSize: '20px',
                        },
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        style: {
                            fontSize: '15px',
                        },
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y}',
                            style: {
                                fontSize: '14px',
                            },
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> del Total<br/>'
                },

                series: [
                    {
                        name: "Informe Igafom Correctivo",
                        colorByPoint: true,
                        data: [
                            {
                                name: "Si",
                                y: contadorInformeCorrecSi,
                                color: '#28a745'

                            },
                            {
                                name: "No",
                                y: contadorInformeCorrecNo,
                                color: '#e15b5b'
                            },
                        ]
                    }
                ]

            });
            //HIGHCHART INFORME IGAFOM PREVENTIVO
            Highcharts.chart('containerIgafPrevInforme', {
                title: {
                    text: ''
                },
                chart: {
                    type: 'column'
                },
                exporting: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        style: {
                            fontSize: '20px',
                        },
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        style: {
                            fontSize: '15px',
                        },
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y}',
                            style: {
                                fontSize: '14px',
                            },
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> del Total<br/>'
                },

                series: [
                    {
                        name: "Informe Igafom Preventivo",
                        colorByPoint: true,
                        data: [
                            {
                                name: "Si",
                                y: contadorInformePrevSi,
                                color: '#28a745'

                            },
                            {
                                name: "No",
                                y: contadorInformePrevNo,
                                color: '#e15b5b'
                            },
                        ]
                    }
                ]

            });
            //HIGHCHART RESULTADO REINFO
            Highcharts.chart('ResulReinfo', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: ''
                },
                colors: ['#2ECC71', '#F1C40F','#E74C3C', ],
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                exporting: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            style: {
                                fontSize: '14px',
                            },
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Resultados',
                    data: [
                        ['TRAZABLE: ' + trazable, roundTrazable],
                        ['PENDIENTE: ' + pendiente, roundPendiente],
                        ['NO TRAZABLE: ' + notrazable, roundNoTrazable],
                    ]
                }]
            });
        },
    });
}  
//LISTA MODAL DE SEDES
$.ajax({
    async: false,
    url: '/Home/ListaSedes',
    type: 'GET',
    dataType: 'json',
    data: 'data',
    success: function (data) {
        var datos = data.data;
        $('#lstSedes').empty();
        var datos = data.data;
        $(datos).each(function (index, value) {
            //$('#lstSedes').append('<option value=' + value.n_CODSEDE + '>' + value.v_NOMSEDE + '</option > ');
            $('#lstSedes').append('<div class="col-12 col-sm-2 px-2">\
                <label id="lblBotonesSede'+ value.n_CODSEDE+'" class="d-style w-100 border-t-3 my-1 py-3 btn btn-lighter-secondary btn-h-outline-warning btn-a-outline-warning" onclick=clickSedes(' + value.n_CODSEDE +')>\
        <input type="radio" name="payments" id="payments1" autocomplete="off" class="invisible pos-abs" />\
        <span class="d-flex flex-column align-items-center">\
            <span class="position-tr m-1 mr-2">\
                <span class="d-active">\
                    <i class="fa fa-check text-success-m2 text-120"></i>\
                </span>\
            </span>\
            <div class="mb-2">\
                <i class="v-n-active fa fa-map-marker text-160 text-grey-m3 mr-n35"></i>\
                <i class="v-active fa fa-map-marker text-200 text-warning-d2  ml-n2"></i>\
            </div>\
            <div class="font-bolder text-secondary-m2 flex-grow-1">\
                        '+ value.v_NOMSEDE +'\
                     <div class="text-muted font-light">\
                <span class= "v-n-active">\
                Sede\
				</span>\
                <span class="v-active position-bl mb-3 w-100 text-center">\
                    Sede Seleccionada\
							</span>\
                       </div>\
                    </div>\
                </span>\
            </label >\
        </div >');
        });
    }
});

var currentTime = new Date();
var year = currentTime.getFullYear();
$("#cmbAnioFiltrar").val(year);
$("#cmbAnioDecFiltrar").val(year);
GraficoGeneral(year, '0');
GraficoDocGeneral(year, 'SEMESTRE1');


$("#btnBuscarSedes").click(function () {
//$("#myModalSedes").modal({ backdrop: 'static', keyboard: false })
    $("#myModalSedes").modal('show');
});
$("#btnExportarGrafico").click(function () {
    $("#divContenedorGraficos").printThis();
});

$("#cmbAnioFiltrar").change(function () {
    if ($("#cmbAnioFiltrar").val() == "0") {
        $("#cmbMesFiltrar").attr("disabled", true);
    } else {
        $("#cmbMesFiltrar").attr("disabled", false);
    }
    let anio = $("#cmbAnioFiltrar").val();
    let mes = $("#cmbMesFiltrar").val();
    GraficoGeneral(anio, mes);
});
$("#cmbMesFiltrar").change(function () {
    let anio = $("#cmbAnioFiltrar").val();
    let mes = $("#cmbMesFiltrar").val();
    GraficoGeneral(anio, mes);
});

//evento cambiar combo declaración minera
$("#cmbAnioDecFiltrar").change(function () {
    let anio = $("#cmbAnioDecFiltrar").val();
    let semestre = $("#cmbSemestreFiltrar").val();
    GraficoDocGeneral(anio, semestre);
});
$("#cmbSemestreFiltrar").change(function () {
    let anio = $("#cmbAnioDecFiltrar").val();
    let semestre = $("#cmbSemestreFiltrar").val();
    GraficoDocGeneral(anio, semestre);
});
 

//EVENTO QUE MUESTRA NOMBRE AL ELEGIR LA SEDE
function clickSedes(id) {
    $.ajax({
        async: false,
        url: '/Home/ListaSedes',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                if (value.n_CODSEDE == id) {
                    $("#lblSede").text(value.v_NOMSEDE);
                    filtraSedeReporte(value.n_CODSEDE);
                }
            });
        }
    });
}
//BUSCA NOMBRE SEDE
function buscaNombreSede(id) {
    var nombresede;
    $.ajax({
        async: false,
        url: '/Home/ListaSedes',
        type: 'GET',
        dataType: 'json',
        data: 'data',
        success: function (data) {
            var datos = data.data;
            $(datos).each(function (index, value) {
                if (value.n_CODSEDE == id) {
                    nombresede = value.v_NOMSEDE;
                }
            });
        }
    });
    return nombresede;
}

//FUNCION PARA MOSTRAR TODAS LAS SEDES EN GRAFICO Y CANTIDAD DE INFORMES
function GraficoGeneral(anio,mes) {
    $.ajax({
        url: '/Home/FiltrarReinfoGrafico?V_ANIO=' + anio + '&V_MES=' + mes,
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
            $('#myModalLoading').removeAttr('hidden');
            $('#myModalLoading').modal("show");
        },
        complete: function () {
            $('#myModalLoading').attr('hidden', true);
            $('#myModalLoading').modal('hide');
            $("#myModalSedes").modal('hide');
        },
        data: 'data',
        success: function (data) {
            var ArraySede = []
            var ArrayCantidad = []
            var Total = 0;
            var datos = data.data;
            $(datos).each(function (index, value) {
                $.ajax({
                    async: false,
                    url: '/Home/ListaSedes',
                    type: 'GET',
                    dataType: 'json',
                    data: 'data',
                    success: function (data) {
                        var datos = data.data;
                        $(datos).each(function (index, value1) {
                            if (value1.n_CODSEDE == value.n_SEDE) {
                                ArraySede.push(value1.v_NOMSEDE);
                            }
                        });
                    }
                });
                ArrayCantidad.push(value.v_CANTIDAD);
            });
            var result = ArrayCantidad.map(i => Number(i));

            for (let i = 0; i < result.length; i++) {
                Total += result[i];
            }
            var month = $("#cmbMesFiltrar option:selected").text();
            $('#spanTotalGeneral').text(Total);
            Highcharts.chart('containerGeneral', {
                title: {
                    text: 'Informes ' + anio + ' - Mes: ' + month
                },
                exporting: {
                    enabled: false
                },
                subtitle: {
                    text: ''
                },
                yAxis: {
                    title: {
                        text: 'Cantidad de Informes'
                    }
                },
                xAxis: {
                    categories: ArraySede
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: true
                    }
                },
                series: [{
                    name: 'Cantidad',
                    data: result
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            });
        },

    });
}

function GraficoDocGeneral(anio, semestre) {
    // CREACIÓN DE GRAFICOS SEGUN LA SEDE QUE SELECCIONE
    $.ajax({
        url: '/Home/FiltrarDeclaracionGrafico?V_ANIO=' + anio + '&V_SEMESTRE=' + semestre,
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
            $('#myModalLoading').removeAttr('hidden');
            $('#myModalLoading').modal("show");
        },
        complete: function () {
            $('#myModalLoading').attr('hidden', true);
            $('#myModalLoading').modal('hide');
            $("#myModalSedes").modal('hide');
        },
        data: 'data',
        success: function (data) {
            //VARIABLES GLOBALES DE LA FUNCION
            var datos = data.data;
            console.log(datos);
            var ArraySedes = [];
            var ArraySi = [];
            var ArrayNo = [];
            $(datos).each(function (index, value) {
                $.ajax({
                    async: false,
                    url: '/Home/ListaSedes',
                    type: 'GET',
                    dataType: 'json',
                    data: 'data',
                    success: function (data) {
                        var datos = data.data;
                        $(datos).each(function (index, value1) {
                            if (value1.n_CODSEDE == value.n_SEDE) {
                                ArraySedes.push(value1.v_NOMSEDE);
                            }
                        });
                    }
                });
                ArraySi.push(value.si);
                ArrayNo.push(value.no);
            });

            Highcharts.chart('containerGeneral2', {
                chart: {
                    type: 'column'
                },

                exporting: {
                    enabled: false
                },
                title: {
                    text: 'Declaración de Producción'
                },
                xAxis: {
                    categories: ArraySedes
                },
                yAxis: [{
                    min: 0,
                    title: {
                        text: 'Cantidad'
                    }
                }, {
                    title: {
                        text: ''
                    },
                    opposite: true
                }],

                legend: {
                    shadow: true
                },
                tooltip: {
                    shared: true
                },
                plotOptions: {
                    column: {
                        grouping: false,
                        shadow: false,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Si',
                    color: 'rgb(40, 167, 69)',
                    data: ArraySi,
                    pointPadding: 0.3,
                    pointPlacement: -0.2
                }, {
                    name: 'No',
                    color: 'rgb(225, 91, 91)',
                    data: ArrayNo,
                    pointPadding: 0.4,
                    pointPlacement: -0.2

                }]
            });

        },
    });
}
