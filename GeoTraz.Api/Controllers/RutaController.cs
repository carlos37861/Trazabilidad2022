using Common.Identity.Entities;
using General.Entities;
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
    public class RutaController : Controller
    {
        [Route("GetUserMenuRol")] 
        public async Task<JsonResult> GetUserMenuRol(string login, string idrol)
        {
            try
            {
                List<Ruta> rutas = new List<Ruta>();
                rutas.Add(new Ruta { V_COD = "TZ0001", V_PARENT = "1", V_ASSEMBLY = "", V_NAME = "Mantenimientos", V_FUNC = "", V_VIEW = "P", N_APPID = 10, V_TIPO = "" });
                rutas.Add(new Ruta { V_COD = "TZ0002", V_PARENT = "1.1", V_ASSEMBLY = "", V_NAME = "Proveedores", V_FUNC = "Proveedor", V_VIEW = "", N_APPID = 10, V_TIPO = "" });
                rutas.Add(new Ruta { V_COD = "TZ0003", V_PARENT = "1.2", V_ASSEMBLY = "", V_NAME = "Concesiones", V_FUNC = "Concesion", V_VIEW = "", N_APPID = 10, V_TIPO = "" });
                rutas.Add(new Ruta { V_COD = "TZ0004", V_PARENT = "2", V_ASSEMBLY = "", V_NAME = "Reinfo Minero", V_FUNC = "Reinfo", V_VIEW = "P", N_APPID = 10, V_TIPO = "" });
                rutas.Add(new Ruta { V_COD = "TZ0005", V_PARENT = "3", V_ASSEMBLY = "", V_NAME = "Igafom", V_FUNC = "Igafom", V_VIEW = "P", N_APPID = 10, V_TIPO = "" });
                rutas.Add(new Ruta { V_COD = "TZ0006", V_PARENT = "4", V_ASSEMBLY = "", V_NAME = "Declaración de<br>Producción minera", V_FUNC = "DeclaracionMinera", V_VIEW = "P", N_APPID = 10, V_TIPO = "" });
                rutas.Add(new Ruta { V_COD = "TZ0007", V_PARENT = "5", V_ASSEMBLY = "", V_NAME = "Formalizados", V_FUNC = "Formalizados", V_VIEW = "P", N_APPID = 10, V_TIPO = "" });
                rutas.Add(new Ruta { V_COD = "TZ0008", V_PARENT = "6", V_ASSEMBLY = "", V_NAME = "Reportes", V_FUNC = "", V_VIEW = "P", N_APPID = 10, V_TIPO = "" });
                rutas.Add(new Ruta { V_COD = "TZ0009", V_PARENT = "6.1", V_ASSEMBLY = "", V_NAME = "Historico Reportes", V_FUNC = "Reporte", V_VIEW = "", N_APPID = 10, V_TIPO = "" });
                rutas.Add(new Ruta { V_COD = "TZ0010", V_PARENT = "6.2", V_ASSEMBLY = "", V_NAME = "Reporte Reinfo Minero", V_FUNC = "ReporteGeneral", V_VIEW = "", N_APPID = 10, V_TIPO = "" });
                rutas.Add(new Ruta { V_COD = "TZ0011", V_PARENT = "7", V_ASSEMBLY = "", V_NAME = "Material de <br>Formación", V_FUNC = "", V_VIEW = "P", N_APPID = 10, V_TIPO = "" });
                rutas.Add(new Ruta { V_COD = "TZ0012", V_PARENT = "7.1", V_ASSEMBLY = "", V_NAME = "Documentos Ayuda", V_FUNC = "Documentos", V_VIEW = "", N_APPID = 10, V_TIPO = "" });
                rutas.Add(new Ruta { V_COD = "TZ0013", V_PARENT = "7.2", V_ASSEMBLY = "", V_NAME = "Capacitaciones", V_FUNC = "DocuCapacitacion", V_VIEW = "", N_APPID = 10, V_TIPO = "" });
                rutas.Add(new Ruta { V_COD = "TZ0014", V_PARENT = "8", V_ASSEMBLY = "", V_NAME = "Documentos<br> complementarios del<br> Proveedor", V_FUNC = "", V_VIEW = "P", N_APPID = 10, V_TIPO = "" });
                rutas.Add(new Ruta { V_COD = "TZ0015", V_PARENT = "8.1", V_ASSEMBLY = "", V_NAME = "Documentos Proveedor", V_FUNC = "DocuProveedor", V_VIEW = "", N_APPID = 10, V_TIPO = "" });
                rutas.Add(new Ruta { V_COD = "TZ0016", V_PARENT = "8.2", V_ASSEMBLY = "", V_NAME = "Catálogo de documentos", V_FUNC = "Catalogo", V_VIEW = "", N_APPID = 10, V_TIPO = "" });
                return Json(new ResponseModel
                {
                    success = true,
                    result = rutas,
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

