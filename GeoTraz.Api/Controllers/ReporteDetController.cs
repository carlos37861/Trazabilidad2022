using GeoTraz.Common.Models;
using GeoTraz.Core;
using GeoTraz.Core.Services.Concretes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoTraz.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReporteDetController : ControllerBase
    {
        UnitOfWork uow = new UnitOfWork();
        [HttpPost]
        [Route("add-reporteDet")]
        public async Task<int> AgregarReporteDet(ReporteDetDTO reporteDet)
        {
            ReporteDetService objRep = new ReporteDetService(uow);
            var oRei = await objRep.AgregarReporteDet(reporteDet);
            return oRei;
        }
        [Route("lista-reporteDet")]
        public async Task<ActionResult> ListarReporteDet(ReporteDetDTO reporteDet)
        {
            ReporteDetService objRep = new ReporteDetService(uow);
            IEnumerable<ReporteDetDTO> obj = await objRep.ListarReporteDet(reporteDet);
            return Ok(obj);
        }
        [Route("lista-reporteDet4")]
        public async Task<ActionResult> Listar4ReporteDet(ReporteDetDTO reporteDet)
        {
            ReporteDetService objRep = new ReporteDetService(uow);
            IEnumerable<ReporteDetDTO> obj = await objRep.Listar4ReporteDet(reporteDet);
            return Ok(obj);
        }


        [Route("busca-reporteDet")]
        public async Task<ActionResult> BuscarReporteDet(ReporteDetDTO reportedet)
        {
            ReporteDetService objRep = new ReporteDetService(uow);
            IEnumerable<ReporteDetDTO> obj = await objRep.BuscarReporteDet(reportedet);
            return Ok(obj);
        }

        [Route("filtrar-reporteDet")]
        public async Task<ActionResult> FiltrarReporteDet(ReporteDetDTO reportedet)
        {
            ReporteDetService objRep = new ReporteDetService(uow);
            IEnumerable<ReporteDetDTO> obj = await objRep.FiltrarReporteDet(reportedet);
            return Ok(obj);
        }

        [HttpPost]
        [Route("delete-reporteDet")]
        public async Task<int> EliminarReporteDet(ReporteDetDTO reportedet)
        {
            ReporteDetService objRep = new ReporteDetService(uow);
            var oRei = await objRep.EliminarReporteDet(reportedet);
            return oRei;
        }


        [HttpPost]
        [Route("delete-reporteidDet")]
        public async Task<int> EliminarReporteId(ReporteDetDTO reportedet)
        {
            ReporteDetService objRep = new ReporteDetService(uow);
            var oRei = await objRep.EliminarReporteIdDet(reportedet);
            return oRei;
        }
    }
}
