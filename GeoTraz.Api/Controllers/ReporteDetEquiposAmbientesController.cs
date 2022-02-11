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
    public class ReporteDetEquiposAmbientesController : ControllerBase
    {
        UnitOfWork uow = new UnitOfWork();
        [HttpPost]
        [Route("add-reporteDetEquiposAmbientes")]
        public async Task<int> AgregarReporteDetEquiposAmbientes(ReporteDetEquiposAmbientesDTO reporteDet)
        {
            ReporteDetEquiposAmbientesService objRep = new ReporteDetEquiposAmbientesService(uow);
            var oRei = await objRep.AgregarReporteDetEquiposAmbientes(reporteDet);
            return oRei;
        }
        [Route("lista-reporteDetEquiposAmbientes")]
        public async Task<ActionResult> ListarReporteDetEquiposAmbientes(ReporteDetEquiposAmbientesDTO reporteDet)
        {
            ReporteDetEquiposAmbientesService objRep = new ReporteDetEquiposAmbientesService(uow);
            IEnumerable<ReporteDetEquiposAmbientesDTO> obj = await objRep.ListarReporteDetEquiposAmbientes(reporteDet);
            return Ok(obj);
        }





    }
}
