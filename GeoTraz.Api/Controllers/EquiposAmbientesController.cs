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
    public class EquiposAmbientesController : ControllerBase
    {

        UnitOfWork uow = new UnitOfWork();
        [Route("lista-equiposambientes")]
        public async Task<ActionResult> Listarequiposambientes(EquiposAmbientesDTO equiposambientes)
        {
            EquiposAmbientesService objEA = new EquiposAmbientesService(uow);
            IEnumerable<EquiposAmbientesDTO> obj = await objEA.ListarEquiposAmbientes(equiposambientes);
            return Ok(obj);
        }

        [HttpPost]
        [Route("add-equiposambientesreinfo")]
        public async Task<int> AgregarEquiposAmbientesReinfo(EquiposAmbientesDTO equiposambientes)
        {
            EquiposAmbientesService objEA = new EquiposAmbientesService(uow);
            var oRei = await objEA.AgregarEquiposAmbientesReinfo(equiposambientes);
            return oRei;


        }

        [HttpPost]
        [Route("del-equiposambientesreinfo")]
        public async Task<int> EliminarEquiposAmbientesReinfo(EquiposAmbientesDTO equiposambientes)
        {
            EquiposAmbientesService objEA = new EquiposAmbientesService(uow);
            var oRei = await objEA.EliminarEquiposAmbientesReinfo(equiposambientes);
            return oRei;


        }

        [Route("lista-equiposambientesreinfo")]
        public async Task<ActionResult> ListarEquiposAmbientesReinfo(EquiposAmbientesDTO equiposambientes)
        {
            EquiposAmbientesService objEA = new EquiposAmbientesService(uow);
            IEnumerable<EquiposAmbientesDTO> obj = await objEA.ListarEquiposAmbientesReinfo(equiposambientes);
            return Ok(obj);
        }

        [Route("lista-equiposambientesFaltantes")]
        public async Task<ActionResult> ListarEquiposAmbientesFaltantes(EquiposAmbientesDTO equiposambientes)
        {
            EquiposAmbientesService objEA = new EquiposAmbientesService(uow);
            IEnumerable<EquiposAmbientesDTO> obj = await objEA.ListarEquiposAmbientesFaltantes(equiposambientes);
            return Ok(obj);
        }
    }
}
