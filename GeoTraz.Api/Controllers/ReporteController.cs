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
    public class ReporteController : ControllerBase
    {
        UnitOfWork uow = new UnitOfWork();
        [HttpPost]
        [Route("add-reporte")]
        public async Task<int> AgregarReporte(ReporteDTO reporte)
        {
            ReporteService objRep = new ReporteService(uow);
            var oRei = await objRep.AgregarReporte(reporte);
            return oRei;


        }
        [Route("lista-reporte")]
        public async Task<ActionResult> ListarReporte()
        {
            ReporteService objRep = new ReporteService(uow);
            IEnumerable<ReporteDTO> obj = await objRep.ListarReporte();
            return Ok(obj);
        }

        [Route("lista-reportedistinct")]
        public async Task<ActionResult> ListarReporteDistinct()
        {
            ReporteService objRep = new ReporteService(uow);
            IEnumerable<ReporteDTO> obj = await objRep.FiltrarReporteDistinct();
            return Ok(obj);
        }

        [Route("busca-reporte")]
        public async Task<ActionResult> BuscarReporte(ReporteDTO reporte)
        {
            ReporteService objRep = new ReporteService(uow);
            IEnumerable<ReporteDTO> obj = await objRep.BuscarReporte(reporte);
            return Ok(obj);
        }

        [Route("filtrar-reporte")]
        public async Task<ActionResult> FiltrarReporte(ReporteDTO reporte)
        {
            ReporteService objRep = new ReporteService(uow);
            IEnumerable<ReporteDTO> obj = await objRep.FiltrarReporte(reporte);
            return Ok(obj);
        }

        [HttpPost]
        [Route("delete-reporte")]
        public async Task<int> EliminarReporte(ReporteDTO reporte)
        {
            ReporteService objRep = new ReporteService(uow);
            var oRei = await objRep.EliminarReporte(reporte);
            return oRei;
        }


        [HttpPost]
        [Route("delete-reporteid")]
        public async Task<int> EliminarReporteId(ReporteDTO reporte)
        {
            ReporteService objRep = new ReporteService(uow);
            var oRei = await objRep.EliminarReporteId(reporte);
            return oRei;
        }


  
        [Route("busca-reporteId")]
        public async Task<ActionResult> BuscarReporteId(ReporteDTO reporte)
        {
            ReporteService objRep = new ReporteService(uow);
            IEnumerable<ReporteDTO> obj = await objRep.BuscarReporteId(reporte);
            return Ok(obj);
        }
      
        [Route("busca-versionreporte")]
        public async Task<ActionResult> BuscarVersionReporte(ReporteDTO reporte)
        {
            ReporteService objRep = new ReporteService(uow);
            IEnumerable<ReporteDTO> obj = await objRep.BuscarVersionReporte(reporte);
            return Ok(obj);
        }


    }
}
