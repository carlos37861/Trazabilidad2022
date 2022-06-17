using GeoTraz.Common.Models;
using GeoTraz.Core;
using GeoTraz.Core.Services.Concretes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace GeoTraz.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReinfoController : ControllerBase
    {
       
        UnitOfWork uow = new UnitOfWork();
        [HttpGet]
        [Route("lista-reinfo")]
        public async Task<ActionResult> ListarReinfo()
        {
            ReinfoService objAmb = new ReinfoService(uow);
            IEnumerable<ReinfoDTO> obj = await objAmb.ListarReinfo();
            return Ok(obj);
        }
        
        [Route("busca-reinfo")]
        public async Task<ActionResult> BuscarIdReinfo(ReinfoDTO reinfo)
        {
            ReinfoService objAmb = new ReinfoService(uow);
            IEnumerable<ReinfoDTO> obj = await objAmb.BuscarIdReinfo(reinfo);
            return Ok(obj);
        }

        [Route("filtrar-reinfo")]
        public async Task<ActionResult> FiltrarReinfo(ReinfoDTO reinfo)
        {
            ReinfoService objAmb = new ReinfoService(uow);
            IEnumerable<ReinfoDTO> obj = await objAmb.FiltrarReinfo(reinfo);
            return Ok(obj);
        }

        [Route("busca-reinfo-edit")]
        public async Task<ActionResult> BuscarReinfo(ReinfoDTO reinfo)
        {
            ReinfoService objAmb = new ReinfoService(uow);
            IEnumerable<ReinfoDTO> obj = await objAmb.BuscarReinfo(reinfo);
            return Ok(obj);
        }

        [HttpPost]
        [Route("add-reinfo")]
        public async Task<int> AgregarReinfo(ReinfoDTO reinfo)
        {
            ReinfoService objReg = new ReinfoService(uow);
            var oRei = await objReg.AgregarReinfo(reinfo);
            return oRei;


        }
        [HttpPost]
        [Route("update-reinfo")]
        public async Task<int> EditarReinfo(ReinfoDTO reinfo)
        {
            ReinfoService objReg = new ReinfoService(uow);
            var oRei = await objReg.EditarReinfo(reinfo);
            return oRei;
        }

        [HttpPost]
        [Route("delete-reinfo")]
        public async Task<int> EliminarReinfo(ReinfoDTO reinfo)
        {
            ReinfoService objReg = new ReinfoService(uow);
            var oRei = await objReg.EliminarReinfo(reinfo);
            return oRei;
        }

        [Route("valida-reinfo")]
        public async Task<ActionResult> ValidaReinfo(ReinfoDTO reinfo)
        {
            ReinfoService objAmb = new ReinfoService(uow);
            IEnumerable<ReinfoDTO> obj = await objAmb.ValidaReinfo(reinfo);
            return Ok(obj);
        }

        [Route("filtrar-reinfografico")]
        public async Task<ActionResult> FiltrarReinfoGrafico(ReinfoDTO reinfo)
        {
            ReinfoService objAmb = new ReinfoService(uow);
            IEnumerable<ReinfoDTO> obj = await objAmb.FiltrarReinfoGrafico(reinfo);
            return Ok(obj);
        }

        [Route("filtrar-declaraciongrafico")]
        public async Task<ActionResult> FiltrarDeclaracionGrafico(ReinfoDTO reinfo)
        {
            ReinfoService objAmb = new ReinfoService(uow);
            IEnumerable<ReinfoDTO> obj = await objAmb.FiltrarDeclaracionGrafico(reinfo);
            return Ok(obj);
        }



    }
}
