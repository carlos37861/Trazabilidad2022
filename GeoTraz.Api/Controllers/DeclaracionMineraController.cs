using GeoTraz.Common.Entities;
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
    public class DeclaracionMineraController : ControllerBase
    {
        UnitOfWork uow = new UnitOfWork();
        [HttpPost]
        [Route("add-declaracionminera")]
        public async Task<int> AgregarDeclaracionMinera(DeclaracionMineraDTO declaracionminera)
        {
            DeclaracionMineraService objDec = new DeclaracionMineraService(uow);
            var oRei = await objDec.AgregarDeclaracionMinera(declaracionminera);
            return oRei;


        }
        [Route("valida-declaracionminera")]
        public async Task<ActionResult> ValidaDeclaracionMinera(DeclaracionMineraDTO declaracionminera)
        {
            DeclaracionMineraService objDec = new DeclaracionMineraService(uow);
            IEnumerable<DeclaracionMineraDTO> obj = await objDec.ValidaDeclaracionMinera(declaracionminera);
            return Ok(obj);
        }

        [HttpPost]
        [Route("update-declaracionminera")]
        public async Task<int> EditarDeclaracionMinera(DeclaracionMineraDTO declaracionminera)
        {
            DeclaracionMineraService objEdit = new DeclaracionMineraService(uow);
            var oRei = await objEdit.EditarDeclaracionMinera(declaracionminera);
            return oRei;
        }
    }

    

}
