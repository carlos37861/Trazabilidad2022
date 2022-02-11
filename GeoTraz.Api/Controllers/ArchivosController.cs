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
    public class ArchivosController : ControllerBase
    {
        UnitOfWork uow = new UnitOfWork();

      
        [Route("lista-archivo")]
        public async Task<ActionResult> ListarArchivo(ArchivosDTO archivos)
        {
            ArchivosService objArch = new ArchivosService(uow);
            IEnumerable<ArchivosDTO> obj = await objArch.ListarArchivo(archivos);
            return Ok(obj);
        }


        [Route("filtra-archivo")]
        public async Task<ActionResult> ListarFiltraArchivo(ArchivosDTO archivos)
        {
            ArchivosService objArch = new ArchivosService(uow);
            IEnumerable<ArchivosDTO> obj = await objArch.ListarFiltraArchivo(archivos);
            return Ok(obj);
        }

        [Route("lista4-archivo")]
        public async Task<ActionResult> Listar4Archivo(ArchivosDTO archivos)
        {
            ArchivosService objArch = new ArchivosService(uow);
            IEnumerable<ArchivosDTO> obj = await objArch.Listar4Archivo(archivos);
            return Ok(obj);
        }
        [Route("lista-validacargo")]
        public async Task<ActionResult> ValidaCargo(ArchivosDTO archivos)
        {
            ArchivosService objArch = new ArchivosService(uow);
            IEnumerable<ArchivosDTO> obj = await objArch.ValidaCargo(archivos);
            return Ok(obj);
        }

        [Route("busca-imagen")]
        public async Task<ActionResult> BuscarImagen(ArchivosDTO archivos)
        {
            ArchivosService objArch = new ArchivosService(uow);
            IEnumerable<ArchivosDTO> obj = await objArch.BuscarImagen(archivos);
            return Ok(obj);
        }


        [HttpPost]
        [Route("add-archivo")]
        public async Task<int> AgregarArchivo(IEnumerable<ArchivosDTO> files)
        {
            ArchivosService objArch = new ArchivosService(uow);
            var oarch = await objArch.AgregarArchivo(files);    

            return oarch;

        }
        [HttpPost]
        [Route("update-archivo")]
        public async Task<int> EditarReinfo(ArchivosDTO archivos)
        {
            ArchivosService objArch = new ArchivosService(uow);
            var oRei = await objArch.EditarArchivo(archivos);
            return oRei;
        }

        [HttpPost]
        [Route("delete-archivo")]
        public async Task<int> EliminarArchivo(ArchivosDTO archivos)
        {
            ArchivosService objArch = new ArchivosService(uow);
            var oRei = await objArch.EliminarArchivo(archivos);
            return oRei;
        }

        [HttpPost]
        [Route("delete-archivo-id")]
        public async Task<int> EliminarArchivoId(ArchivosDTO archivos)
        {
            ArchivosService objArch = new ArchivosService(uow);
            var oRei = await objArch.EliminarArchivoId(archivos);
            return oRei;
        }

    }
}
