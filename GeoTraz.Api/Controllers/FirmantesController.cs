using General.Entities;
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
    public class FirmantesController : Controller
    {

        UnitOfWork uow = new UnitOfWork();

        [HttpGet]
        [Route("lista-firmantes")]
        public async Task<JsonResult> ListarFirmantes(string V_DNI)
        {
            try
            {
                return Json(new ResponseModel
                {
                    success = true,
                    result = await uow.FirmantesRepository.ListarFirmantes(V_DNI),
                    errorMessage = string.Empty
                });
            }
            catch (Exception ex)
            {
                return Json(
                new ResponseModel
                {
                    success = false,
                    result = new object(),
                    errorMessage = ex.Message
                });
            }
        }
    }
}
