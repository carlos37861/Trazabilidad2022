using Common.Identity.Entities;
using General.Entities;
using General.Entities.ViewModel;
using GeoTraz.Common.Entities;
using GeoTraz.Common.Models;
using GeoTraz.Web.Data;
using GeoTraz.Web.Models;
using GeoTraz.Web.Session;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace GeoTraz.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
         
        #region VISTAS
        public IActionResult Login()
        {
            return View();
        }
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Logout()
        {
            HttpContext.Session.SetComplexData("usuariologin", new Usuario());
            HttpContext.Session.Remove("usuariologin");
            return RedirectToAction("Login", "Home");
            //PRUEBA DE QUITAR FUNCIONALIDAD AL BUTTON BACK 
        }
        public IActionResult Index()
        {
            return View();
        }
        //[ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Proveedor()
        {
            Usuario usuarioLogin = HttpContext.Session.GetComplexData<Usuario>("usuariologin");
            if (usuarioLogin != null)
            {
                ViewBag.message = usuarioLogin.V_LOGIN;
                ViewBag.sede = usuarioLogin.N_CODSEDE;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public IActionResult Reinfo()
        {
            Usuario usuarioLogin = HttpContext.Session.GetComplexData<Usuario>("usuariologin");
            if (usuarioLogin != null)
            {
                ViewBag.message = usuarioLogin.V_LOGIN;
                ViewBag.sede = usuarioLogin.N_CODSEDE;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }

        }


        public IActionResult Igafom()
        {
            Usuario usuarioLogin = HttpContext.Session.GetComplexData<Usuario>("usuariologin");
            if (usuarioLogin != null)
            {
                ViewBag.message = usuarioLogin.V_LOGIN;
                ViewBag.sede = usuarioLogin.N_CODSEDE;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public IActionResult DeclaracionMinera()
        {
            Usuario usuarioLogin = HttpContext.Session.GetComplexData<Usuario>("usuariologin");
            if (usuarioLogin != null)
            {
                ViewBag.message = usuarioLogin.V_LOGIN;
                ViewBag.sede = usuarioLogin.N_CODSEDE;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public IActionResult Reporte()
        {
            Usuario usuarioLogin = HttpContext.Session.GetComplexData<Usuario>("usuariologin");
            if (usuarioLogin != null)
            {
                ViewBag.message = usuarioLogin.V_LOGIN;
                ViewBag.sede = usuarioLogin.N_CODSEDE;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public IActionResult Concesion()
        {
            Usuario usuarioLogin = HttpContext.Session.GetComplexData<Usuario>("usuariologin");
            if (usuarioLogin != null)
            {
                ViewBag.message = usuarioLogin.V_LOGIN;
                ViewBag.sede = usuarioLogin.N_CODSEDE;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public IActionResult Dashboard()
        {
            Usuario usuarioLogin = HttpContext.Session.GetComplexData<Usuario>("usuariologin");
            if (usuarioLogin != null)
            {
                ViewBag.message = usuarioLogin.V_LOGIN;
                ViewBag.sede = usuarioLogin.N_CODSEDE;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public IActionResult Catalogo()
        {
            Usuario usuarioLogin = HttpContext.Session.GetComplexData<Usuario>("usuariologin");
            if (usuarioLogin != null)
            {
                ViewBag.message = usuarioLogin.V_LOGIN;
                ViewBag.sede = usuarioLogin.N_CODSEDE;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public IActionResult DocuProveedor()
        {
            Usuario usuarioLogin = HttpContext.Session.GetComplexData<Usuario>("usuariologin");
            if (usuarioLogin != null)
            {
                ViewBag.message = usuarioLogin.V_LOGIN;
                ViewBag.sede = usuarioLogin.N_CODSEDE;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public IActionResult DocuCapacitacion()
        {
            Usuario usuarioLogin = HttpContext.Session.GetComplexData<Usuario>("usuariologin");
            if (usuarioLogin != null)
            {
                ViewBag.message = usuarioLogin.V_LOGIN;
                ViewBag.sede = usuarioLogin.N_CODSEDE;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public IActionResult ReporteGeneral()
        {
            Usuario usuarioLogin = HttpContext.Session.GetComplexData<Usuario>("usuariologin");
            if (usuarioLogin != null)
            {
                ViewBag.message = usuarioLogin.V_LOGIN;
                ViewBag.sede = usuarioLogin.N_CODSEDE;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        #endregion

        #region USUARIOS
        [HttpPost]
        public async Task<JsonResult> LoginUsuario(Usuario usuario)
        {
            AuthToken.Token = HttpClientIdentity.GetTokenClient("xOpyt0J7HSAqs5X", "OLktEtciYxJxN2R");
            AuthToken.AppID = 10;
            Usuario oUser = HttpClientIdentity.LoginUsuario(usuario.V_LOGIN, usuario.V_PASS, AuthToken.AppID.ToString());
            if (oUser != null)
            {
                if (oUser.UserRolesApp.Count() > 0)
                {
                    foreach (var roles in oUser.UserRolesApp)
                    {
                        if (roles.V_IDROLE == "R1001")
                        {
                            AuthToken.LoginName = oUser.V_LOGIN;
                            AuthToken.CodSede = oUser.N_CODSEDE;
                            //AuthToken.RolUser = oUser.UserRolesApp.ToList()[0].V_IDROLE;
                            HttpContext.Session.SetComplexData("usuariologin", oUser);
                        }
                    }
                }
                else
                {
                    oUser = null;
                }
            }
            else
            {
                oUser = null;
            }
            return Json(new { data = oUser });
        }

        public async Task<JsonResult> CargarUser()
        {
            Usuario oUser = new Usuario();
            Usuario usuarioLogin = HttpContext.Session.GetComplexData<Usuario>("usuariologin");
            oUser.V_LOGIN = usuarioLogin.V_LOGIN; //HttpContext.Session.GetComplexData<Usuario>("usuariologin"); // AuthToken.LoginName; //HttpContext.Session.GetString("session");
            oUser.N_CODSEDE = usuarioLogin.N_CODSEDE;
            //oUser.UserRolesApp = usuarioLogin.UserRolesApp.ToList();
            return Json(new { data = oUser });
        }
        #endregion

        #region MENU

        [HttpGet]
        public async Task<JsonResult> ListaMenu(string userId, string rol)
        {
            List<RutaPadre> ListaRutas =  HttpClientIdentity.GetUserMenuRol(userId, rol);
            List<RutaPadre> padreList = new List<RutaPadre>();
            List<RutaPadre> padreListSend = new List<RutaPadre>();
            foreach(RutaPadre obj in ListaRutas)
            {
               String[] lista = obj.V_PARENT.Split(".");
                if (lista.Length == 1)
                {
                    //obj.Hijos_List = ListaRutas.Where(x => x.V_PARENT.Substring(0, 1) == obj.V_PARENT && !String.IsNullOrEmpty(x.V_FUNC)).ToList();
                    padreList.Add(obj);
                }
            }
            foreach (RutaPadre obj in padreList)
            {
                if (String.IsNullOrEmpty(obj.V_FUNC))
                {
                    obj.Hijos_List = ListaRutas.Where(x => x.V_PARENT.Substring(0, 1) == obj.V_PARENT && !String.IsNullOrEmpty(x.V_FUNC)).ToList();
                }
                padreListSend.Add(obj);
            }
            return Json(new { data = padreListSend });
        }

        #endregion

        #region FORMALIZADOS
        public IActionResult Formalizados()
        {
            Usuario usuarioLogin = HttpContext.Session.GetComplexData<Usuario>("usuariologin");
            if (usuarioLogin != null)
            {
                ViewBag.message = usuarioLogin.V_LOGIN;
                ViewBag.sede = usuarioLogin.N_CODSEDE;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        #endregion

        #region UBIGEO
        public async Task<JsonResult> ListaProvincias(string v_DEP)
        {
            var httpClient = await HttpClientUbigeo.ListaUbigeo();
            var result = httpClient.GroupBy(test => test.V_PROV)
                   .Select(grp => grp.First())
                   .ToList();
            var ListaProvincia =
                from Ubigeo in result
                where Ubigeo.V_UBIGEO.Substring(0, 2) == v_DEP
                select Ubigeo;
            return Json(new { data = ListaProvincia });
        }
        public async Task<JsonResult> ListaTodasProvincias()
        {
            var httpClient = await HttpClientUbigeo.ListaUbigeo();
            var result = httpClient.GroupBy(test => test.V_PROV)
                   .Select(grp => grp.First())
                   .ToList();
            return Json(new { data = result });
        }
        public async Task<JsonResult> ListaTodosDistritos()
        {
            var httpClient = await HttpClientUbigeo.ListaUbigeo();
            //var result = httpClient.GroupBy(test => test.V_DIST)
            //       .Select(grp => grp.First())
            //       .ToList();
            return Json(new { data = httpClient });
        }

        public async Task<JsonResult> ListaDepartamento()
        {
            var httpClient = await HttpClientUbigeo.ListaUbigeo();
            var result = httpClient.GroupBy(test => test.V_DEP)
                               .Select(grp => grp.First())
                               .ToList();
            return Json(new { data = result });
        }
        public async Task<JsonResult> ListaDistritos(string v_PROV)
        {
            var httpClient = await HttpClientUbigeo.ListaUbigeo();
            //var result = httpClient.GroupBy(test => test.V_UBIGEO.Substring(0, 4))
            //       .Select(grp => grp.First())
            //       .ToList();
            var ListaProvincia =
                from Ubigeo in httpClient
                where Ubigeo.V_UBIGEO.Substring(0, 4) == v_PROV
                select Ubigeo;
            return Json(new { data = ListaProvincia });
        }

        public async Task<JsonResult> ListaSedes()
        {
            var httpClient = await HttpClientSedes.ListaSedes();
            return Json(new { data = httpClient });
        }
        #endregion

        #region Proveedor

        public async Task<JsonResult> ListaAnexo()
        {
            var httpClient = await HttpClientAnexo.ListAnexosFilter("%", "%", "P", "%");
            return Json(new { data = httpClient });
        }

        [HttpGet]
        public async Task<JsonResult> BuscarProveedor(string V_CODANE)
        {
            var httpClient = await HttpClientAnexo.GetAnexo(V_CODANE, "P");
            return Json(new { data = httpClient });
        }
        [HttpPost]
        public async Task<JsonResult> EditarProveedor(Anexo objProv)
        {
            if (objProv.V_PAT == null)
                objProv.V_PAT = "";
            if (objProv.V_MAT == null)
                objProv.V_MAT = "";
            if (objProv.V_NOM == null)
                objProv.V_NOM = "";
            if (objProv.V_DEP == null)
                objProv.V_DEP = "";
            if (objProv.V_PRO == null)
                objProv.V_PRO = "";
            if (objProv.V_DIS == null)
                objProv.V_DIS = "";
            if (objProv.V_CRETE == null)
                objProv.V_CRETE = "";
            if (objProv.V_EMAIL == null)
                objProv.V_EMAIL = "";
            if (objProv.V_TLF == null)
                objProv.V_TLF = "";
            if (objProv.V_CEL == null)
                objProv.V_CEL = "";
            if (objProv.V_USUMEM == null)
                objProv.V_USUMEM = "";
            if (objProv.V_USUSUNAT == null)
                objProv.V_USUSUNAT = "";
            if (objProv.V_CLAVEMEM == null)
                objProv.V_CLAVEMEM = "";
            if (objProv.V_CLAVESUNAT == null)
                objProv.V_CLAVESUNAT = "";
            var EdiProv = await HttpClientAnexo.UpdateAnexo(objProv);
            return Json(new { data = EdiProv });
        }

        [HttpPost]
        public async Task<JsonResult> AgregarProveedor(Anexo objProv)
        {
            if (objProv.V_PAT == null)
                objProv.V_PAT = "";
            if (objProv.V_MAT == null)
                objProv.V_MAT = "";
            if (objProv.V_NOM == null)
                objProv.V_NOM = "";
            if (objProv.V_DEP == null)
                objProv.V_DEP = "";
            if (objProv.V_PRO == null)
                objProv.V_PRO = "";
            if (objProv.V_DIS == null)
                objProv.V_DIS = "";
            if (objProv.V_CRETE == null)
                objProv.V_CRETE = "";
            if (objProv.V_EMAIL == null)
                objProv.V_EMAIL = "";
            if (objProv.V_TLF == null)
                objProv.V_TLF = "";
            if (objProv.V_CEL == null)
                objProv.V_CEL = "";
            if (objProv.V_USUMEM == null)
                objProv.V_USUMEM = "";
            if (objProv.V_USUSUNAT == null)
                objProv.V_USUSUNAT = "";
            if (objProv.V_CLAVEMEM == null)
                objProv.V_CLAVEMEM = "";
            if (objProv.V_CLAVESUNAT == null)
                objProv.V_CLAVESUNAT = "";
            var RegProv = await HttpClientAnexo.InsertAnexo(objProv);
            return Json(new { data = RegProv });
        }

        [HttpPost]
        public async Task<JsonResult> EliminarProveedor(string V_CODANE)
        {
            var httpClient = await HttpClientAnexo.DeleteAnexo(V_CODANE, "P");
            return Json(new { data = httpClient });
        }
        #endregion

        #region Reinfo

        [HttpGet]
        public async Task<JsonResult> ListaReinfo()
        {

            var List = await HttpClientReinfo.ListaReinfo();

            return Json(new { data = List });
        }
        [HttpPost]
        public async Task<JsonResult> AgregarReinfo(ReinfoDTO objRein)
        {

            var RegRein = await HttpClientReinfo.AgregarReinfo(objRein);

            return Json(new { data = RegRein });
        }

        [HttpPost]
        public async Task<JsonResult> EditarReinfo(ReinfoDTO objRein)
        {

            var EditRein = await HttpClientReinfo.EditarReinfo(objRein);

            return Json(new { data = EditRein });
        }


        [HttpGet]
        public async Task<JsonResult> BuscarIdReinfo(string V_RUC, string V_CODCONSECION)
        {
            ReinfoDTO rei = new ReinfoDTO();
            rei.V_RUC = V_RUC;
            rei.V_CODCONSECION = V_CODCONSECION;
            var httpClient = await HttpClientReinfo.BuscarIdReinfo(rei);

            return Json(new { data = httpClient });
        }

        [HttpGet]
        public async Task<JsonResult> BuscarReinfo(int N_CODREINFO)
        {
            ReinfoDTO rei = new ReinfoDTO();
            rei.N_CODREINFO = N_CODREINFO;
            var httpClient = await HttpClientReinfo.BuscarReinfo(rei);

            return Json(new { data = httpClient });
        }

        [HttpGet]
        public async Task<JsonResult> FiltrarReinfo(string V_RUC, string V_PROVEEDOR, string V_CODCONSECION, string V_NOMCONSECION, string V_NOMDERECHMINE, string V_FECREINFO, string V_RESULTADOS, int N_SEDES)
        {
            //reemplaza espacios en blanco por %
            V_PROVEEDOR = "%" + Regex.Replace(V_PROVEEDOR, @"\s+", "%");
            V_CODCONSECION = "%" + Regex.Replace(V_CODCONSECION, @"\s+", "%");
            V_NOMCONSECION = "%" + Regex.Replace(V_NOMCONSECION, @"\s+", "%");
            V_NOMDERECHMINE = "%" + Regex.Replace(V_NOMDERECHMINE, @"\s+", "%");

            ReinfoDTO rei = new ReinfoDTO();
            if (V_RUC == null)
                V_RUC = "%";
            if (V_PROVEEDOR == null)
                V_PROVEEDOR = "%";
            if (V_CODCONSECION == null)
                V_CODCONSECION = "%";
            if (V_NOMCONSECION == null)
                V_NOMCONSECION = "%";
            if (V_NOMDERECHMINE == null)
                V_NOMDERECHMINE = "%";
            if (V_FECREINFO == null)
                V_FECREINFO = "%";
            if (V_RESULTADOS == "0")
                V_RESULTADOS = "%";
            rei.V_RUC = V_RUC;
            rei.V_PROVEEDOR = V_PROVEEDOR;
            rei.V_CODCONSECION = V_CODCONSECION;
            rei.V_NOMCONSECION = V_NOMCONSECION;
            rei.V_NOMDERECHMINE = V_NOMDERECHMINE;
            rei.V_FECREINFO = V_FECREINFO;
            rei.V_RESULTADOS = V_RESULTADOS;
            rei.N_SEDE = N_SEDES;
            var httpClient = await HttpClientReinfo.FiltrarReinfo(rei);

            return Json(new { data = httpClient });
        }
        [HttpGet]
        public async Task<JsonResult> ValidaReinfo(string V_RUC, string V_CODCONSECION)
        {
            ReinfoDTO rei = new ReinfoDTO();
            rei.V_RUC = V_RUC;
            rei.V_CODCONSECION = V_CODCONSECION;
            var httpClient = await HttpClientReinfo.ValidaReinfo(rei);

            return Json(new { data = httpClient });
        }

        [HttpPost]
        public async Task<JsonResult> EliminarReinfo(int N_CODREINFO)
        {
            ReinfoDTO rei = new ReinfoDTO();
            rei.N_CODREINFO = N_CODREINFO;
            var httpClient = await HttpClientReinfo.EliminarReinfo(rei);

            return Json(new { data = httpClient });
        }
        #endregion

        #region Archivo

        [HttpPost]
        public async Task<JsonResult> EliminarArchivo(int N_CODREINFO)
        {
            ArchivosDTO arc = new ArchivosDTO();
            arc.N_CODREIN = N_CODREINFO;
            var httpClient = await HttpClientArchivos.EliminarArchivo(arc);

            return Json(new { data = httpClient });
        }

        [HttpPost]
        public async Task<JsonResult> EliminarArchivoId(int N_CODARCHIVO)
        {
            ArchivosDTO arc = new ArchivosDTO();
            arc.N_CODARCHIVO = N_CODARCHIVO;
            var httpClient = await HttpClientArchivos.EliminarArchivoId(arc);
            return Json(new { data = httpClient });
        }

        [HttpPost]
        public async Task<JsonResult> PostArchivos(List<IFormFile> files, int N_CODREIN, int N_CODIGAFOM, string V_TIPOARCH, string V_TIPOIMAG, string V_TIPOIGAFOM, string V_DESCRIPARCH, string V_FECMODIF)
        {
            if (V_DESCRIPARCH == null)
            {
                V_DESCRIPARCH = "";
            }
            if (V_FECMODIF == null)
            {
                V_FECMODIF = "";
            }
            try
            {
                List<ArchivosDTO> archivos = new List<ArchivosDTO>();

                if (files.Count > 0)
                {
                    foreach (var file in files)
                    {

                        //prueba con ftp
                        if (N_CODREIN == 0)
                        {
                            var sintildes = Path.GetFileNameWithoutExtension(file.FileName);
                            FtpWebRequest request = (FtpWebRequest)WebRequest.Create(Helpers.JsonHelper.GetFTP("UriFtp") + Regex.Replace(sintildes.Normalize(NormalizationForm.FormD), @"[^a-zA-z0-9 ]+", "") + "." + Path.GetExtension(file.FileName).Substring(1));
                            string filePath = Helpers.JsonHelper.GetFTP("UriFtp") + Regex.Replace(sintildes.Normalize(NormalizationForm.FormD), @"[^a-zA-z0-9 ]+", "") + "." + Path.GetExtension(file.FileName).Substring(1);
                            request.Credentials = new NetworkCredential("usrTrz", "9JbPsj7QPgbFKLGMqyBWSCTx");
                            request.Method = WebRequestMethods.Ftp.UploadFile;
                            using (Stream ftpStream = request.GetRequestStream())
                            {
                                await file.CopyToAsync(ftpStream);
                            }
                            double tamanio = file.Length;
                            tamanio = tamanio / 1000000;
                            tamanio = Math.Round(tamanio, 2);

                            ArchivosDTO archivo = new ArchivosDTO();
                            archivo.V_EXTENSION = Path.GetExtension(file.FileName).Substring(1);
                            var nombre = Regex.Replace(sintildes.Normalize(NormalizationForm.FormD), @"[^a-zA-z0-9 ]+", "");
                            archivo.V_NOMBRE = nombre + '.' + archivo.V_EXTENSION;
                            archivo.N_TAMANIO = tamanio;
                            archivo.V_RUTA = filePath;
                            archivo.N_CODREIN = N_CODREIN;
                            archivo.N_CODIGAFOM = N_CODIGAFOM;
                            archivo.V_TIPOARCH = V_TIPOARCH;
                            archivo.V_TIPOIMAG = V_TIPOIMAG;
                            archivo.V_TIPOIGAFOM = V_TIPOIGAFOM;
                            archivo.V_USUREGISTRO = AuthToken.LoginName; //HttpContext.Session.GetString("session");
                            archivo.V_DESCRIPARCH = V_DESCRIPARCH;
                            archivo.V_FECMODIF = V_FECMODIF;
                            archivos.Add(archivo);
                        }
                        else
                        {
                            var sintildes = Path.GetFileNameWithoutExtension(file.FileName);
                            FtpWebRequest request = (FtpWebRequest)WebRequest.Create(Helpers.JsonHelper.GetFTP("UriFtp") + Regex.Replace(sintildes.Normalize(NormalizationForm.FormD), @"[^a-zA-z0-9 ]+", "") + "_" + N_CODREIN + "." + Path.GetExtension(file.FileName).Substring(1));
                            string filePath = Helpers.JsonHelper.GetFTP("UriFtp") + Regex.Replace(sintildes.Normalize(NormalizationForm.FormD), @"[^a-zA-z0-9 ]+", "") + "_" + N_CODREIN + "." + Path.GetExtension(file.FileName).Substring(1);
                            request.Credentials = new NetworkCredential("usrTrz", "9JbPsj7QPgbFKLGMqyBWSCTx");
                            request.Method = WebRequestMethods.Ftp.UploadFile;
                            using (Stream ftpStream = request.GetRequestStream())
                            {
                                await file.CopyToAsync(ftpStream);
                            }
                            double tamanio = file.Length;
                            tamanio = tamanio / 1000000;
                            tamanio = Math.Round(tamanio, 2);

                            ArchivosDTO archivo = new ArchivosDTO();
                            archivo.V_EXTENSION = Path.GetExtension(file.FileName).Substring(1);
                            var nombre = Regex.Replace(sintildes.Normalize(NormalizationForm.FormD), @"[^a-zA-z0-9 ]+", "");
                            archivo.V_NOMBRE = nombre + "_" + N_CODREIN + '.' + archivo.V_EXTENSION;
                            archivo.N_TAMANIO = tamanio;
                            archivo.V_RUTA = filePath;
                            archivo.N_CODREIN = N_CODREIN;
                            archivo.N_CODIGAFOM = N_CODIGAFOM;
                            archivo.V_TIPOARCH = V_TIPOARCH;
                            archivo.V_TIPOIMAG = V_TIPOIMAG;
                            archivo.V_TIPOIGAFOM = V_TIPOIGAFOM;
                            archivo.V_USUREGISTRO = AuthToken.LoginName; //HttpContext.Session.GetString("session");
                            archivo.V_DESCRIPARCH = V_DESCRIPARCH;
                            archivo.V_FECMODIF = V_FECMODIF;
                            archivos.Add(archivo);
                        }

                    }
                }

                var httpClient = await HttpClientArchivos.AgregarArchivo(archivos);
                return Json(new { data = httpClient });
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);

            }

        }

        [HttpPost]
        public async Task<JsonResult> PostArchivosIngemmet(List<IFormFile> files, int N_CODREIN, int N_CODIGAFOM, string V_TIPOARCH, string[] V_TIPOIMAG, string V_TIPOIGAFOM, string V_DESCRIPARCH)
        {

            if (V_DESCRIPARCH == null)
            {
                V_DESCRIPARCH = "";
            }

            var indiceTipoImag = -1;

            try
            {
                List<ArchivosDTO> archivos = new List<ArchivosDTO>();

                if (files.Count > 0)
                {
                    foreach (var file in files)
                    {
                        indiceTipoImag = indiceTipoImag + 1;
                        //prueba con ftp
                        if (N_CODREIN == 0)
                        {
                            var sintildes = Path.GetFileNameWithoutExtension(file.FileName);
                            FtpWebRequest request = (FtpWebRequest)WebRequest.Create(Helpers.JsonHelper.GetFTP("UriFtp") + Regex.Replace(sintildes.Normalize(NormalizationForm.FormD), @"[^a-zA-z0-9 ]+", "") + "." + Path.GetExtension(file.FileName).Substring(1));
                            string filePath = Helpers.JsonHelper.GetFTP("UriFtp") + Regex.Replace(sintildes.Normalize(NormalizationForm.FormD), @"[^a-zA-z0-9 ]+", "") + "." + Path.GetExtension(file.FileName).Substring(1);
                            request.Credentials = new NetworkCredential("usrTrz", "9JbPsj7QPgbFKLGMqyBWSCTx");
                            request.Method = WebRequestMethods.Ftp.UploadFile;
                            using (Stream ftpStream = request.GetRequestStream())
                            {
                                await file.CopyToAsync(ftpStream);
                            }
                            double tamanio = file.Length;
                            tamanio = tamanio / 1000000;
                            tamanio = Math.Round(tamanio, 2);

                            ArchivosDTO archivo = new ArchivosDTO();
                            archivo.V_EXTENSION = Path.GetExtension(file.FileName).Substring(1);
                            var nombre = Regex.Replace(sintildes.Normalize(NormalizationForm.FormD), @"[^a-zA-z0-9 ]+", "");
                            archivo.V_NOMBRE = nombre + '.' + archivo.V_EXTENSION;
                            archivo.N_TAMANIO = tamanio;
                            archivo.V_RUTA = filePath;
                            archivo.N_CODREIN = N_CODREIN;
                            archivo.N_CODIGAFOM = N_CODIGAFOM;
                            archivo.V_TIPOARCH = V_TIPOARCH;
                            archivo.V_TIPOIMAG = V_TIPOIMAG[indiceTipoImag];
                            archivo.V_TIPOIGAFOM = V_TIPOIGAFOM;
                            archivo.V_USUREGISTRO = AuthToken.LoginName; //HttpContext.Session.GetString("session");
                            archivo.V_DESCRIPARCH = V_DESCRIPARCH;
                            archivos.Add(archivo);
                        }
                        else
                        {
                            var sintildes = Path.GetFileNameWithoutExtension(file.FileName);
                            FtpWebRequest request = (FtpWebRequest)WebRequest.Create(Helpers.JsonHelper.GetFTP("UriFtp") + Regex.Replace(sintildes.Normalize(NormalizationForm.FormD), @"[^a-zA-z0-9 ]+", "") + "_" + N_CODREIN + "." + Path.GetExtension(file.FileName).Substring(1));
                            string filePath = Helpers.JsonHelper.GetFTP("UriFtp") + Regex.Replace(sintildes.Normalize(NormalizationForm.FormD), @"[^a-zA-z0-9 ]+", "") + "_" + N_CODREIN + "." + Path.GetExtension(file.FileName).Substring(1);
                            request.Credentials = new NetworkCredential("usrTrz", "9JbPsj7QPgbFKLGMqyBWSCTx");
                            request.Method = WebRequestMethods.Ftp.UploadFile;
                            using (Stream ftpStream = request.GetRequestStream())
                            {
                                await file.CopyToAsync(ftpStream);
                            }
                            double tamanio = file.Length;
                            tamanio = tamanio / 1000000;
                            tamanio = Math.Round(tamanio, 2);

                            ArchivosDTO archivo = new ArchivosDTO();
                            archivo.V_EXTENSION = Path.GetExtension(file.FileName).Substring(1);
                            var nombre = Regex.Replace(sintildes.Normalize(NormalizationForm.FormD), @"[^a-zA-z0-9 ]+", "");
                            archivo.V_NOMBRE = nombre + "_" + N_CODREIN + '.' + archivo.V_EXTENSION;
                            archivo.N_TAMANIO = tamanio;
                            archivo.V_RUTA = filePath;
                            archivo.N_CODREIN = N_CODREIN;
                            archivo.N_CODIGAFOM = N_CODIGAFOM;
                            archivo.V_TIPOARCH = V_TIPOARCH;
                            archivo.V_TIPOIMAG = V_TIPOIMAG[indiceTipoImag];
                            archivo.V_TIPOIGAFOM = V_TIPOIGAFOM;
                            archivo.V_USUREGISTRO = AuthToken.LoginName; //HttpContext.Session.GetString("session");
                            archivo.V_DESCRIPARCH = V_DESCRIPARCH;
                            archivos.Add(archivo);
                        }
                    }
                }

                var httpClient = await HttpClientArchivos.AgregarArchivo(archivos);
                return Json(new { data = httpClient });
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);

            }
        }

        //AGREGADO PARA PREVISUALIZAR IMAGEN
        [HttpGet]
        public async Task<JsonResult> previsualizar(string fileName)
        {
            try
            {
                string data = "";
                //Create FTP Request.
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(Helpers.JsonHelper.GetFTP("UriFtp") + fileName);
                request.Method = WebRequestMethods.Ftp.DownloadFile;
                //Enter FTP Server credentials.
                request.Credentials = new NetworkCredential("usrTrz", "9JbPsj7QPgbFKLGMqyBWSCTx");
                request.UsePassive = true;
                request.UseBinary = true;
                request.EnableSsl = false;
                string[] Arrayextension = fileName.Split('.');
                string extension = Arrayextension[Arrayextension.Length - 1];
                //Fetch the Response and read it into a MemoryStream object.
                FtpWebResponse response = (FtpWebResponse)request.GetResponse();
                using (MemoryStream stream = new MemoryStream())
                {
                    response.GetResponseStream().CopyTo(stream);
                    string base64String = Convert.ToBase64String(stream.ToArray(), 0, stream.ToArray().Length);
                    data = "data:text/plain;base64," + base64String;
                    return Json(new { data = data });
                }
            }
            catch (WebException ex)
            {
                throw new Exception((ex.Response as FtpWebResponse).StatusDescription);
            }
        }

        [HttpGet]
        public ActionResult Descargar(string fileName)
        {
            try
            {
              int bufferdes = 1;
              FtpWebRequest reqFTP;
              reqFTP = (FtpWebRequest)WebRequest.Create(Helpers.JsonHelper.GetFTP("UriFtp") + fileName);
              reqFTP.Credentials = new NetworkCredential("usrTrz", "9JbPsj7QPgbFKLGMqyBWSCTx");
              reqFTP.KeepAlive = false;
              reqFTP.Method = WebRequestMethods.Ftp.DownloadFile;
              reqFTP.UseBinary = true;
              reqFTP.Proxy = null;
              reqFTP.UsePassive = true;
              FtpWebResponse response = (FtpWebResponse)reqFTP.GetResponse();
              Stream responseStream = response.GetResponseStream();
              var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\descargas", fileName);
              FileStream writeStream = new FileStream(filePath, FileMode.Create);
              int Length = bufferdes;
              Byte[] buffer = new Byte[Length];
              int bytesRead = responseStream.Read(buffer, 0, Length);
              while (bytesRead > 0)
              {
                  writeStream.Write(buffer, 0, bytesRead);
                  bytesRead = responseStream.Read(buffer, 0, Length);
              }
              writeStream.Close();
              response.Close();
              var ruta = filePath;
              byte[] FileBytes = System.IO.File.ReadAllBytes(ruta);
              //return File(FileBytes, "application/pdf");
              return File(FileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
            }
            catch (WebException ex)
            {
                throw new Exception((ex.Response as FtpWebResponse).StatusDescription);
                
            }
        }

        [HttpGet]
        public int ConsultaArchivo(string fileName)
        {
            try
            {
                int bufferdes = 1;
                FtpWebRequest reqFTP;
                reqFTP = (FtpWebRequest)WebRequest.Create(Helpers.JsonHelper.GetFTP("UriFtp") + fileName);
                reqFTP.Credentials = new NetworkCredential("usrTrz", "9JbPsj7QPgbFKLGMqyBWSCTx");
                reqFTP.KeepAlive = false;
                reqFTP.Method = WebRequestMethods.Ftp.DownloadFile;
                reqFTP.UseBinary = true;
                reqFTP.Proxy = null;
                reqFTP.UsePassive = true;
                FtpWebResponse response = (FtpWebResponse)reqFTP.GetResponse();
                Stream responseStream = response.GetResponseStream();

                return 1;
            }
            catch (WebException ex)
            {
                return 0;

            }
        }

        [HttpGet]
        public async Task<JsonResult> ListaArchivo(int N_CODIGAFOM, int N_CODREIN, string V_TIPOIMAG, string V_TIPOIGAFOM)
        { 
            ArchivosDTO arc = new ArchivosDTO();
            arc.N_CODIGAFOM = N_CODIGAFOM;
            arc.N_CODREIN = N_CODREIN;
            arc.V_TIPOIMAG = V_TIPOIMAG;
            arc.V_TIPOIGAFOM = V_TIPOIGAFOM;
            var httpClient = await HttpClientArchivos.ListaArchivo(arc);
            return Json(new { data = httpClient });
        }

        [HttpGet]               
        public async Task<JsonResult> ListaFiltraArchivo(int N_CODIGAFOM,  string V_TIPOIGAFOM, string V_TIPOARCH, string V_TIPOIMAG, string V_NOMBRE, string V_DESCRIPARCH, string V_FECMODIFINICIO, string V_FECMODIFFIN)
        {
            ArchivosDTO arc = new ArchivosDTO();
            arc.N_CODIGAFOM = N_CODIGAFOM;
            arc.V_TIPOIGAFOM = V_TIPOIGAFOM;
            arc.V_TIPOARCH = V_TIPOARCH;
            arc.V_TIPOIMAG = V_TIPOIMAG;
            arc.V_NOMBRE = V_NOMBRE;
            arc.V_DESCRIPARCH = V_DESCRIPARCH;
            arc.V_FECMODIFINICIO = V_FECMODIFINICIO == null ? "1900-01-01" : V_FECMODIFINICIO;
            arc.V_FECMODIFFIN = V_FECMODIFFIN==null? "2030-12-31" : V_FECMODIFFIN;
            var httpClient = await HttpClientArchivos.ListaFiltraArchivo(arc);
            return Json(new { data = httpClient });
        }

        [HttpGet]
        public async Task<JsonResult> Lista4Archivo(int N_CODIGAFOM, int N_CODREIN, string V_TIPOIMAG, string V_TIPOIGAFOM)
        {
            ArchivosDTO arc = new ArchivosDTO();
            arc.N_CODIGAFOM = N_CODIGAFOM;
            arc.N_CODREIN = N_CODREIN;
            arc.V_TIPOIMAG = V_TIPOIMAG;
            arc.V_TIPOIGAFOM = V_TIPOIGAFOM;
            var httpClient = await HttpClientArchivos.Lista4Archivo(arc);
            return Json(new { data = httpClient });
        }
        [HttpGet]

        public async Task<JsonResult> ValidaCargo(int N_CODREIN, string V_TIPOIMAG)
        {
            ArchivosDTO arc = new ArchivosDTO();
            arc.N_CODREIN = N_CODREIN;
            arc.V_TIPOIMAG = V_TIPOIMAG;
            var httpClient = await HttpClientArchivos.ValidaCargo(arc);
            return Json(new { data = httpClient });
        }

        [HttpPost]
        public async Task<JsonResult> ValidarArchivos(List<IFormFile> files)
        {
            var contadorNofotos = 0;
            var extension = "";
            if (files.Count > 0)
            {
                foreach (var file in files)
                {
                    extension = Path.GetExtension(file.FileName).Substring(1);
                    if (extension != "jpg" && extension != "png" && extension != "jpeg" && extension != "PNG" && extension != "JPG" && extension != "JPEG")
                    {
                        contadorNofotos = contadorNofotos + 1;
                    }
                }
            }
            return Json(new { data = contadorNofotos });
        }

        [HttpGet]
        public async Task<JsonResult> BuscarImagen(int N_CODARCHIVO)
        {
            ArchivosDTO arc = new ArchivosDTO();
            arc.N_CODARCHIVO = N_CODARCHIVO;
            var httpClient = await HttpClientArchivos.BuscarImagen(arc);
            return Json(new { data = httpClient });
        }

        #endregion

        #region Declaracion Minera
        [HttpPost]
        public async Task<JsonResult> AgregarDeclaracionMinera(DeclaracionMineraDTO objDec)
        {
            var RegDec = await HttpClientDeclaracionMinera.AgregarDeclaracionMinera(objDec);
            return Json(new { data = RegDec });
        }

        [HttpGet]
        public async Task<JsonResult> ValidaDeclaracionMinera(int N_CODREIN)
        {
            DeclaracionMineraDTO dec = new DeclaracionMineraDTO();
            dec.N_CODREIN = N_CODREIN;
            var httpClient = await HttpClientDeclaracionMinera.ValidaDeclaracionMinera(dec);

            return Json(new { data = httpClient });
        }

        [HttpPost]
        public async Task<JsonResult> EditarDeclaracionMinera(DeclaracionMineraDTO objDec)
        {

            var EditDec = await HttpClientDeclaracionMinera.EditarDeclaracionMinera(objDec);

            return Json(new { data = EditDec });
        }

        #endregion

        #region Reporte

        [HttpGet]
        public async Task<JsonResult> ListaReporte()
        {

            var List = await HttpClientReporte.ListaReporte();

            return Json(new { data = List });
        }

        [HttpGet]
        public async Task<JsonResult> DatosVersionTrazabilidad()
        {

            var List = await HttpClientReporte.DatosVersionTrazabilidad();

            return Json(new { data = List });
        }
        [HttpPost]
        public async Task<JsonResult> AgregarReporte(ReporteDTO objRepo)
        {

            var RegRepo = await HttpClientReporte.AgregarReporte(objRepo);

            return Json(new { data = RegRepo });
        }

        [HttpGet]
        public async Task<JsonResult> BuscarReporte(int N_CODREPORTE)
        {
            ReporteDTO rep = new ReporteDTO();
            rep.N_CODREPORTE = N_CODREPORTE;
            var httpClient = await HttpClientReporte.BuscarReporte(rep);

            return Json(new { data = httpClient });
        }

        [HttpGet]
        public async Task<JsonResult> BuscarVersionReporte(int N_CODREIN)
        {
            ReporteDTO rep = new ReporteDTO();
            rep.N_CODREIN = N_CODREIN;
            var httpClient = await HttpClientReporte.BuscarVersionReporte(rep);

            return Json(new { data = httpClient });
        }

        [HttpPost]
        public async Task<JsonResult> EliminarReporte(int N_CODREPORTE)
        {
            ReporteDTO rep = new ReporteDTO();
            rep.N_CODREPORTE = N_CODREPORTE;
            var httpClient = await HttpClientReporte.EliminarReporte(rep);

            return Json(new { data = httpClient });
        }

        [HttpPost]
        public async Task<JsonResult> EliminarReporteId(int N_CODREIN)
        {
            ReporteDTO rep = new ReporteDTO();
            rep.N_CODREIN = N_CODREIN;
            var httpClient = await HttpClientReporte.EliminarReporteId(rep);

            return Json(new { data = httpClient });
        }

        [HttpGet]
        public async Task<JsonResult> FiltrarReporte(string V_RUC, string V_PROVEEDOR, string V_CODCONSECION, string V_NOMCONSECION, string V_REALIZADOPOR, string V_REVISADOPOR, string V_FECHAREALIZADO, string V_FECHAREVISADO, string V_FECCREACION, int N_SEDES)
        {
            //reemplaza espacios en blanco por %
            V_PROVEEDOR = "%" + Regex.Replace(V_PROVEEDOR, @"\s+", "%");
            V_CODCONSECION = "%" + Regex.Replace(V_CODCONSECION, @"\s+", "%");
            V_NOMCONSECION = "%" + Regex.Replace(V_NOMCONSECION, @"\s+", "%");

            ReporteDTO rep = new ReporteDTO();
            rep.V_RUC = V_RUC;
            rep.V_PROVEEDOR = V_PROVEEDOR;
            rep.V_CODCONSECION = V_CODCONSECION;
            rep.V_NOMCONSECION = V_NOMCONSECION;
            rep.V_REALIZADOPOR = V_REALIZADOPOR;
            rep.V_REVISADOPOR = V_REVISADOPOR;
            rep.V_FECHAREALIZADO = V_FECHAREALIZADO;
            rep.V_FECHAREVISADO = V_FECHAREVISADO;
            rep.V_FECCREACION = V_FECCREACION;
            rep.N_SEDE = N_SEDES;
            var httpClient = await HttpClientReporte.FiltrarReporte(rep);

            return Json(new { data = httpClient });
        }


        [HttpPost]
        public async Task<JsonResult> AgregarReporteDet(ReporteDetDTO objRepoDet)
        {

            var RegRepoDet = await HttpClientReporteDet.AgregarReporteDet(objRepoDet);
            return Json(new { data = RegRepoDet });
        }

        [HttpGet]
        public async Task<JsonResult> BuscarIdReport(int N_CODREIN)
        {
            ReporteDTO rep = new ReporteDTO();
            rep.N_CODREIN = N_CODREIN;
            var httpClient = await HttpClientReporte.BuscarIdReport(rep);

            return Json(new { data = httpClient });
        }


        [HttpGet]
        public async Task<JsonResult> ListarReporteDet(int N_CODREPORTE, string V_TIPOIMAG, int N_CODREIN)
        {
            ReporteDetDTO rep = new ReporteDetDTO();
            rep.N_CODREPORTE = N_CODREPORTE;
            rep.V_TIPOIMAG = V_TIPOIMAG;
            rep.N_CODREIN = N_CODREIN;
            var httpClient = await HttpClientReporteDet.ListarReporteDet(rep);

            return Json(new { data = httpClient });
        }

        [HttpGet]
        public async Task<JsonResult> Listar4ReporteDet(int N_CODREPORTE, string V_TIPOIMAG)
        {
            ReporteDetDTO rep = new ReporteDetDTO();
            rep.N_CODREPORTE = N_CODREPORTE;
            rep.V_TIPOIMAG = V_TIPOIMAG;
            var httpClient = await HttpClientReporteDet.Listar4ReporteDet(rep);

            return Json(new { data = httpClient });
        }

        //LISTA DETALLES REPORTE AMBIENTES EQUIPOS
        [HttpPost]
        public async Task<JsonResult> AgregarReporteDetEquiposAmbientes(ReporteDetEquiposAmbientesDTO objRepoDetEqAmb)
        {
            var RegRepoDetEqAmb = await HttpClientReporteDetEquiposAmbientes.AgregarReporteDetEquiposAmbientes(objRepoDetEqAmb);
            return Json(new { data = RegRepoDetEqAmb });
        }

        [HttpGet]
        public async Task<JsonResult> ListarReporteDetEquiposAmbientes(int N_CODREPORTE, int N_CODREINFO, string V_TIPO)
        {
            ReporteDetEquiposAmbientesDTO rep = new ReporteDetEquiposAmbientesDTO();
            rep.N_CODREPORTE = N_CODREPORTE;
            rep.N_CODREINFO = N_CODREINFO;
            rep.V_TIPO = V_TIPO;
            var httpClient = await HttpClientReporteDetEquiposAmbientes.ListarReporteDetEquiposAmbientes(rep);

            return Json(new { data = httpClient });
        }





        #endregion

        #region Concesiones
        [HttpGet]
        public async Task<JsonResult> ListaConcesiones(string estado, string nombres, string sede)
        {
            var List = await HttpClientConcesion.ListConcesiones(estado, nombres, sede);
            return Json(new { data = List });
        }

        public async Task<JsonResult> GetConcesion(string codConcesion)
        {
            var httpClient = await HttpClientConcesion.GetConcesion(codConcesion);
            return Json(new { data = httpClient });
        }

        [HttpPost]
        public async Task<JsonResult> InsertConcesion(Concesion objConce)
        {
            if (objConce.V_CODCONCESION == null)
                objConce.V_CODCONCESION = "";
            if (objConce.V_NOMCONCESION == null)
                objConce.V_NOMCONCESION = "";
            if (objConce.V_DEPCON == null)
                objConce.V_DEPCON = "";
            if (objConce.V_PROCON == null)
                objConce.V_PROCON = "";
            if (objConce.V_TPPROP == null)
                objConce.V_TPPROP = "";
            if (objConce.V_EST == null)
                objConce.V_EST = "";
            if (objConce.V_DISCON == null)
                objConce.V_DISCON = "";
            if (objConce.V_TRAZABLE == null)
                objConce.V_TRAZABLE = "";
            if (objConce.V_DESCUENTOS == null)
                objConce.V_DESCUENTOS = "";
            if (objConce.V_ZONAGEO == null)
                objConce.V_ZONAGEO = "";
            if (objConce.V_CONDICIONES == null)
                objConce.V_CONDICIONES = "";
            if (objConce.V_NOMSEDE == null)
                objConce.V_NOMSEDE = "";

            var RegConce = await HttpClientConcesion.InsertConcesion(objConce);

            return Json(new { data = RegConce });
        }


        [HttpPost]
        public async Task<JsonResult> UpdateConcesion(Concesion objConce)
        {
            if (objConce.V_CODCONCESION == null)
                objConce.V_CODCONCESION = "";
            if (objConce.V_NOMCONCESION == null)
                objConce.V_NOMCONCESION = "";
            if (objConce.V_DEPCON == null)
                objConce.V_DEPCON = "";
            if (objConce.V_PROCON == null)
                objConce.V_PROCON = "";
            if (objConce.V_TPPROP == null)
                objConce.V_TPPROP = "";
            if (objConce.V_EST == null)
                objConce.V_EST = "";
            if (objConce.V_DISCON == null)
                objConce.V_DISCON = "";
            if (objConce.V_TRAZABLE == null)
                objConce.V_TRAZABLE = "";
            if (objConce.V_DESCUENTOS == null)
                objConce.V_DESCUENTOS = "";
            if (objConce.V_ZONAGEO == null)
                objConce.V_ZONAGEO = "";
            if (objConce.V_CONDICIONES == null)
                objConce.V_CONDICIONES = "";
            if (objConce.V_NOMSEDE == null)
                objConce.V_NOMSEDE = "";

            var EdiConce = await HttpClientConcesion.UpdateConcesion(objConce);

            return Json(new { data = EdiConce });
        }
        #endregion

        #region Representante Legal

        [HttpPost]
        public async Task<JsonResult> InsertRepLegales(RepresentanteLegalDTO objRep)
        {
            if (objRep.V_TPDOC == null)
                objRep.V_TPDOC = "";
            if (objRep.V_CODREP == null)
                objRep.V_CODREP = "";
            if (objRep.V_CODANE == null)
                objRep.V_CODANE = "";
            if (objRep.V_PAT == null)
                objRep.V_PAT = "";
            if (objRep.V_MAT == null)
                objRep.V_MAT = "";
            if (objRep.V_NOM == null)
                objRep.V_NOM = "";
            if (objRep.V_DESCRI == null)
                objRep.V_DESCRI = "";
            if (objRep.V_TLF == null)
                objRep.V_TLF = "";
            if (objRep.V_EMAIL == null)
                objRep.V_EMAIL = "";
            if (objRep.V_DIRE == null)
                objRep.V_DIRE = "";
            if (objRep.V_CARGO == null)
                objRep.V_CARGO = "";

            var RegRep = await HttpClientAnexo.InsertRepLegal(objRep);

            return Json(new { data = RegRep });
        }


        [HttpPost]
        public async Task<JsonResult> UpdateRepLegales(RepresentanteLegalDTO objRep)
        {
            if (objRep.V_TPDOC == null)
                objRep.V_TPDOC = "";
            if (objRep.V_CODREP == null)
                objRep.V_CODREP = "";
            if (objRep.V_CODANE == null)
                objRep.V_CODANE = "";
            if (objRep.V_PAT == null)
                objRep.V_PAT = "";
            if (objRep.V_MAT == null)
                objRep.V_MAT = "";
            if (objRep.V_NOM == null)
                objRep.V_NOM = "";
            if (objRep.V_DESCRI == null)
                objRep.V_DESCRI = "";
            if (objRep.V_TLF == null)
                objRep.V_TLF = "";
            if (objRep.V_EMAIL == null)
                objRep.V_EMAIL = "";
            if (objRep.V_DIRE == null)
                objRep.V_DIRE = "";
            if (objRep.V_CARGO == null)
                objRep.V_CARGO = "";
            if (objRep.V_SETID == null)
                objRep.V_SETID = "";
            var EdiRep = await HttpClientAnexo.UpdateRepLegal(objRep);

            return Json(new { data = EdiRep });
        }

        [HttpGet]
        public async Task<JsonResult> ListRepLegales(string codAnexo, string tipo)
        {
            var List = await HttpClientAnexo.ListRepLegales(codAnexo, tipo);
            return Json(new { data = List });
        }
        #endregion

        #region EquiposAmbientes

        [HttpGet]
        public async Task<JsonResult> ListaEquiposAmbientes(string V_DESCRIPCION, string V_TIPO, string V_ESTADO)
        {
            EquiposAmbientesDTO eq = new EquiposAmbientesDTO();
            eq.V_DESCRIPCION = V_DESCRIPCION;
            eq.V_TIPO = V_TIPO;
            eq.V_ESTADO = V_ESTADO;
            var httpClient = await HttpClientEquiposAmbientes.ListaEquiposAmbientes(eq);

            return Json(new { data = httpClient });
        }


        [HttpPost]
        public async Task<JsonResult> AgregarEquiposAmbientesReinfo(EquiposAmbientesDTO objAmbEq)
        {

            var RegAmbEq = await HttpClientEquiposAmbientes.AgregarEquiposAmbientesReinfo(objAmbEq);
            return Json(new { data = RegAmbEq });
        }

        [HttpPost]
        public async Task<JsonResult> EliminarEquiposAmbientesReinfo(int N_CODEQUIPOS, int N_CODREINFO)
        {

            EquiposAmbientesDTO eq = new EquiposAmbientesDTO();
            eq.N_CODEQUIPOS = N_CODEQUIPOS;
            eq.N_CODREINFO = N_CODREINFO;
            var httpClient = await HttpClientEquiposAmbientes.EliminarEquiposAmbientesReinfo(eq);

            return Json(new { data = httpClient });
        }

        [HttpGet]
        public async Task<JsonResult> ListaEquiposAmbientesReinfo(int N_CODREINFO, string V_DESCRIPCION, string V_TIPO, string V_ESTADO)
        {
            EquiposAmbientesDTO eq = new EquiposAmbientesDTO();
            eq.N_CODREINFO = N_CODREINFO;
            eq.V_DESCRIPCION = V_DESCRIPCION;
            eq.V_TIPO = V_TIPO;
            eq.V_ESTADO = V_ESTADO;
            var httpClient = await HttpClientEquiposAmbientes.ListaEquiposAmbientesReinfo(eq);

            return Json(new { data = httpClient });
        }

        [HttpGet]
        public async Task<JsonResult> ListaEquiposAmbientesFaltantes(int N_CODREINFO, string V_TIPO, string V_ESTADO)
        {
            EquiposAmbientesDTO eq = new EquiposAmbientesDTO();
            eq.N_CODREINFO = N_CODREINFO;
            eq.V_TIPO = V_TIPO;
            eq.V_ESTADO = V_ESTADO;
            var httpClient = await HttpClientEquiposAmbientes.ListaEquiposAmbientesFaltantes(eq);

            return Json(new { data = httpClient });

        }

        #endregion

        #region Firmantes
        //[HttpGet]
        //public async Task<JsonResult> ListaFirmantes(string V_DNI)
        //{
        //    FirmantesDTO rep = new FirmantesDTO();
        //    rep.V_DNI = V_DNI;
        //    var httpClient = await HttpClientFirmantes.ListaFirmantes(rep);

        //    return Json(new { data = httpClient });
        //}
        [HttpGet]
        public async Task<JsonResult> ListaFirmantes(string V_DNI)
        {
            var httpClient = await HttpClientFirmantes.ListaFirmantes(V_DNI);

            return Json(new { data = httpClient });
        }
        #endregion

        #region Documentos
        public IActionResult Documentos()
        {
            // ViewBag.Message = HttpContext.Session.GetString("session");
            Usuario usuarioLogin = HttpContext.Session.GetComplexData<Usuario>("usuariologin");
            if (usuarioLogin != null)
            {
                ViewBag.message = usuarioLogin.V_LOGIN;
                ViewBag.sede = usuarioLogin.N_CODSEDE;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        #endregion

        #region EXPORTAREXCEL
        public async Task<IActionResult> ExportaExcelReinfo(string V_RUC, string V_PROVEEDOR, string V_CODCONSECION, string V_NOMCONSECION, string V_NOMDERECHMINE, string V_FECREINFO, string V_RESULTADOS, int N_SEDES)
        {
            ReinfoDTO rei = new ReinfoDTO();
            if (V_RUC == null)
                V_RUC = "%";
            if (V_PROVEEDOR == null)
                V_PROVEEDOR = "%";
            if (V_CODCONSECION == null)
                V_CODCONSECION = "%";
            if (V_NOMCONSECION == null)
                V_NOMCONSECION = "%";
            if (V_NOMDERECHMINE == null)
                V_NOMDERECHMINE = "%";
            if (V_FECREINFO == null)
                V_FECREINFO = "%";
            if (V_RESULTADOS == "0")
                V_RESULTADOS = "%";
            rei.V_RUC = V_RUC;
            rei.V_PROVEEDOR = V_PROVEEDOR;
            rei.V_CODCONSECION = V_CODCONSECION;
            rei.V_NOMCONSECION = V_NOMCONSECION;
            rei.V_NOMDERECHMINE = V_NOMDERECHMINE;
            rei.V_FECREINFO = V_FECREINFO;
            rei.V_RESULTADOS = V_RESULTADOS;
            rei.N_SEDE = N_SEDES;

            var httpClient = await HttpClientReinfo.FiltrarReinfo(rei);
            var httpClientSedes = await HttpClientSedes.ListaSedes();
            var httpUbigeo = await HttpClientUbigeo.ListaUbigeo();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            string excelContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            //var stream = new MemoryStream();
            using (ExcelPackage excel = new ExcelPackage())
            {
                excel.Workbook.Worksheets.Add("ReporteReinfo");
                // Target a worksheet
                var worksheet = excel.Workbook.Worksheets["ReporteReinfo"];
                // ANCHO DE LAS COLUMNAS
                worksheet.Column(1).Width = 20;
                worksheet.Column(2).Width = 15;
                worksheet.Column(3).Width = 70;
                worksheet.Column(4).Width = 40;
                worksheet.Column(5).Width = 40;
                worksheet.Column(6).Width = 40;
                worksheet.Column(7).Width = 20;
                worksheet.Column(8).Width = 15;
                worksheet.Column(9).Width = 15;
                worksheet.Column(10).Width = 15;
                worksheet.Column(11).Width = 30;
                worksheet.Column(12).Width = 20;
                worksheet.Column(13).Width = 20;
                worksheet.Column(14).Width = 20;
                worksheet.Column(15).Width = 20;
                worksheet.Column(16).Width = 20;
                worksheet.Column(17).Width = 30;
                worksheet.Column(18).Width = 20;
                worksheet.Column(19).Width = 25;
                worksheet.Column(20).Width = 20;
                worksheet.Column(21).Width = 25;
                worksheet.Column(22).Width = 30;
                worksheet.Column(23).Width = 25;
                worksheet.Column(24).Width = 250;
                worksheet.Column(25).Width = 20;
                worksheet.Column(26).Width = 20;
                worksheet.Column(27).Width = 20;
                worksheet.Column(28).Width = 30;
                worksheet.Column(29).Width = 30;
                worksheet.Column(30).Width = 30;
                worksheet.Column(31).Width = 30;
                worksheet.Column(32).Width = 250;
                worksheet.Column(33).Width = 23;
                worksheet.Column(34).Width = 27;
                worksheet.Column(35).Width = 23;
                worksheet.Column(36).Width = 23;
                worksheet.Column(37).Width = 23;
                worksheet.Column(38).Width = 23;
                worksheet.Column(39).Width = 23;
                worksheet.Column(40).Width = 27;
                worksheet.Column(41).Width = 23;
                worksheet.Column(42).Width = 23;
                worksheet.Column(43).Width = 23;
                worksheet.Column(44).Width = 23;

                ////TITULO
                string TitleRange = "A2:G2"; //AT
                var celltitle = worksheet.Cells[TitleRange];
                celltitle.Merge = true;
                celltitle.Style.Font.Bold = true;
                celltitle.Style.Font.Size = 18;
                celltitle.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitle.Value = "Reporte Reinfo";

                ////TITULO IGAFOM CORRECTIVO
                string TitleRangeIgaf = "AI3:AK3";
                var celltitleIgaf = worksheet.Cells[TitleRangeIgaf];
                celltitleIgaf.Merge = true;
                celltitleIgaf.Style.Font.Bold = true;
                celltitleIgaf.Style.Font.Size = 11;
                celltitleIgaf.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitleIgaf.Value = "IGAFOM CORRECTIVO";

                ////TITULO IGAFOM PREVENTIVO
                string TitleRangePrev = "AL3:AM3";
                var celltitlePrev = worksheet.Cells[TitleRangePrev];
                celltitlePrev.Merge = true;
                celltitlePrev.Style.Font.Bold = true;
                celltitlePrev.Style.Font.Size = 11;
                celltitlePrev.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitlePrev.Value = "IGAFOM PREVENTIVO"; 

                ////TITULO FORMALIZADOS
                string TitleRangeFormalizado = "AP3:AR3";
                var celltitleForm = worksheet.Cells[TitleRangeFormalizado];
                celltitleForm.Merge = true;
                celltitleForm.Style.Font.Bold = true;
                celltitleForm.Style.Font.Size = 11;
                celltitleForm.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitleForm.Value = "FORMALIZADOS";

                // CABECERA MANUALl
                var cellFamilia = worksheet.Cells["A4"];
                cellFamilia.Value = "Sede";
                cellFamilia.Merge = true;

                var cellCodigo = worksheet.Cells["B4"];
                cellCodigo.Value = "Ruc";
                cellCodigo.Merge = true;

                var cellCaracteristicasTitle = worksheet.Cells["C4"];
                cellCaracteristicasTitle.Value = "Razón Social";
                cellCaracteristicasTitle.Merge = true;

                var cellDescripcion = worksheet.Cells["D4"];
                cellDescripcion.Value = "Código Concesión";
                cellDescripcion.Merge = true;

                var cellUbicacion = worksheet.Cells["E4"];
                cellUbicacion.Value = "Nombre Concesión";
                cellUbicacion.Merge = true;

                var cellCantPisos = worksheet.Cells["F4"];
                cellCantPisos.Value = "Derecho Minero";
                cellCantPisos.Merge = true;

                var cellMarca = worksheet.Cells["G4"];
                cellMarca.Value = "Fecha de Reinfo";
                cellMarca.Merge = true;

                var cellTMPH = worksheet.Cells["H4"];
                cellTMPH.Value = "TMPH";
                cellTMPH.Merge = true;

                var cellTMPS = worksheet.Cells["I4"];
                cellTMPS.Value = "TMPS";
                cellTMPS.Merge = true;

                var cellDep = worksheet.Cells["J4"];
                cellDep.Value = "Departamento";
                cellDep.Merge = true;

                var cellProvincia = worksheet.Cells["K4"];
                cellProvincia.Value = "Provincia";
                cellProvincia.Merge = true;

                var cellCiudad = worksheet.Cells["L4"];
                cellCiudad.Value = "Ciudad";
                cellCiudad.Merge = true;

                var cellZonaRei = worksheet.Cells["M4"];
                cellZonaRei.Value = "Zona Reinfo";
                cellZonaRei.Merge = true;

                var cellnorte1 = worksheet.Cells["N4"];
                cellnorte1.Value = "Norte 1";
                cellnorte1.Merge = true;

                var celleste1 = worksheet.Cells["O4"];
                celleste1.Value = "Este 1";
                celleste1.Merge = true;

                var cellnorte2 = worksheet.Cells["P4"];
                cellnorte2.Value = "Norte 2";
                cellnorte2.Merge = true;

                var celleste2 = worksheet.Cells["Q4"];
                celleste2.Value = "Este 2";
                celleste2.Merge = true;

                var cellTipoAct = worksheet.Cells["R4"];
                cellTipoAct.Value = "Tipo Actividad";
                cellTipoAct.Merge = true;

                var cellComponente = worksheet.Cells["S4"];
                cellComponente.Value = "Componente";
                cellComponente.Merge = true;

                var cellCodZonCamp = worksheet.Cells["T4"];
                cellCodZonCamp.Value = "Codigo Zona Campo";
                cellCodZonCamp.Merge = true;

                var cellNorteC = worksheet.Cells["U4"];
                cellNorteC.Value = "Norte C";
                cellNorteC.Merge = true;

                var cellEsteC = worksheet.Cells["V4"];
                cellEsteC.Value = "Este C";
                cellEsteC.Merge = true;

                var cellDifCoorde = worksheet.Cells["W4"];
                cellDifCoorde.Value = "Diferencia de Coordenadas";
                cellDifCoorde.Merge = true;

                var cellDescripLabor = worksheet.Cells["X4"];
                cellDescripLabor.Value = "Descripcion Labor";
                cellDescripLabor.Merge = true;

                var cellCantHombres = worksheet.Cells["Y4"];
                cellCantHombres.Value = "Cantidad Hombres";
                cellCantHombres.Merge = true;

                var cellCantMujeres = worksheet.Cells["Z4"];
                cellCantMujeres.Value = "Cantidad Mujeres";
                cellCantMujeres.Merge = true;

                var cellTotalTrab = worksheet.Cells["AA4"];
                cellTotalTrab.Value = "Total Trabajadores";
                cellTotalTrab.Merge = true;

                var cellIgaCorr = worksheet.Cells["AB4"];
                cellIgaCorr.Value = "Igafom Correctivo";
                cellIgaCorr.Merge = true;

                var cellIgaPrev = worksheet.Cells["AC4"];
                cellIgaPrev.Value = "Igafom Preventivo";
                cellIgaPrev.Merge = true;

                var cellEstadIga = worksheet.Cells["AD4"];
                cellEstadIga.Value = "Estado Igafom";
                cellEstadIga.Merge = true;

                var cellResul = worksheet.Cells["AE4"];
                cellResul.Value = "Resultado";
                cellResul.Merge = true;

                var cellConclu = worksheet.Cells["AF4"];
                cellConclu.Value = "Conclusión";
                cellConclu.Merge = true;

                var cellSituInge = worksheet.Cells["AG4"];
                cellSituInge.Value = "Situación Ingemmet";
                cellSituInge.Merge = true;

                var cellDecMin = worksheet.Cells["AH4"];
                cellDecMin.Value = "Situación Declaración Minera";
                cellDecMin.Merge = true;

                var cellCarCorrect = worksheet.Cells["AI4"];
                cellCarCorrect.Value = "Cargo Correctivo";
                cellCarCorrect.Merge = true;

                var cellInfCorrec = worksheet.Cells["AJ4"];
                cellInfCorrec.Value = "Informe Correctivo";
                cellInfCorrec.Merge = true;

                var cellResolIgafom = worksheet.Cells["AK4"];
                cellResolIgafom.Value = "Resolución Igafom";
                cellResolIgafom.Merge = true;

                var cellCarPrev = worksheet.Cells["AL4"];
                cellCarPrev.Value = "Cargo Preventivo";
                cellCarPrev.Merge = true;


                var cellInfPrev = worksheet.Cells["AM4"];
                cellInfPrev.Value = "Informe Preventivo";
                cellInfPrev.Merge = true;

                var cellLevSus = worksheet.Cells["AN4"];
                cellLevSus.Value = "Levantamiento de Suspensión";
                cellLevSus.Merge = true;

                var cellCargDecMin = worksheet.Cells["AO4"];
                cellCargDecMin.Value = "Cargo Declaración Minera";
                cellCargDecMin.Merge = true;

                var cellContrato = worksheet.Cells["AP4"];
                cellContrato.Value = "Contrato";

                var cellResolu = worksheet.Cells["AQ4"];
                cellResolu.Value = "Resolución";

                var cellOtrosDocs = worksheet.Cells["AR4"];
                cellOtrosDocs.Value = "Otros Documentos";

                // STILOS A LA CABECERA
                string HeaderRange = "A4:AR4";
                worksheet.Cells[HeaderRange].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[HeaderRange].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#cfecfe"));
                worksheet.Cells[HeaderRange].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Top.Color.SetColor(Color.Black);
                worksheet.Cells[HeaderRange].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[HeaderRange].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                // STILOS A LA CABECERA
                string HeaderRange2 = "AI3:AM3";
                worksheet.Cells[HeaderRange2].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[HeaderRange2].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#cfecfe"));
                worksheet.Cells[HeaderRange2].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Top.Color.SetColor(Color.Black);
                worksheet.Cells[HeaderRange2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[HeaderRange2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                // STILOS A LA CABECERA
                string HeaderRange3 = "AP3:AR3";
                worksheet.Cells[HeaderRange3].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[HeaderRange3].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#cfecfe"));
                worksheet.Cells[HeaderRange3].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange3].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange3].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange3].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange3].Style.Border.Top.Color.SetColor(Color.Black);
                worksheet.Cells[HeaderRange3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[HeaderRange3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                int i = 5;
                foreach (ReinfoDTO dat in httpClient)
                {
                    var cell = worksheet.Cells[i, 1];
                    var sede = dat.N_SEDE;
                    cell.Value = httpClientSedes.Find(x => x.N_CODSEDE == sede).V_NOMSEDE;
                    cell.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell.Style.WrapText = true;

                    var cell2 = worksheet.Cells[i, 2];
                    cell2.Value = dat.V_RUC;
                    cell2.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell2.Style.WrapText = true;

                    var cell3 = worksheet.Cells[i, 3];
                    cell3.Value = dat.V_PROVEEDOR;
                    cell3.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell3.Style.WrapText = true;

                    var cell4 = worksheet.Cells[i, 4];
                    cell4.Value = dat.V_CODCONSECION;
                    cell4.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell4.Style.WrapText = true;

                    var cell5 = worksheet.Cells[i, 5];
                    cell5.Value = dat.V_NOMCONSECION;
                    cell5.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell5.Style.WrapText = true;

                    var cell6 = worksheet.Cells[i, 6];
                    cell6.Value = dat.V_NOMDERECHMINE;
                    cell6.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell6.Style.WrapText = true;

                    var cell7 = worksheet.Cells[i, 7];
                    cell7.Value = dat.V_FECREINFO;
                    cell7.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell7.Style.WrapText = true;

                    var cell8 = worksheet.Cells[i, 8];
                    cell8.Value = dat.N_TMPH;
                    cell8.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell8.Style.WrapText = true;

                    var cell9 = worksheet.Cells[i, 9];
                    cell9.Value = dat.N_TMPS;
                    cell9.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell9.Style.WrapText = true;

                    var cell10 = worksheet.Cells[i, 10];
                    if (dat.V_UBIGEO.Length == 6)
                    {
                        var Departamento = dat.V_UBIGEO.Substring(0, 2) + "0000";
                        cell10.Value = httpUbigeo.Find(x => x.V_UBIGEO == Departamento).V_DEP;
                        cell10.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                        cell10.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        cell10.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                        cell10.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        cell10.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                        cell10.Style.WrapText = true;
                    }

                    var cell11 = worksheet.Cells[i, 11];
                    if (dat.V_UBIGEO.Length == 6)
                    {
                        var Ciudad = dat.V_UBIGEO.Substring(0, 4) + "00";
                        cell11.Value = httpUbigeo.Find(x => x.V_UBIGEO == Ciudad).V_PROV;
                        cell11.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                        cell11.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        cell11.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                        cell11.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        cell11.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                        cell11.Style.WrapText = true;
                    }

                    var cell12 = worksheet.Cells[i, 12];
                    if (dat.V_UBIGEO.Length == 6)
                    {
                        var Distrito = dat.V_UBIGEO;
                        cell12.Value = httpUbigeo.Find(x => x.V_UBIGEO == Distrito).V_DIST;
                        cell12.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                        cell12.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        cell12.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                        cell12.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        cell12.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                        cell12.Style.WrapText = true;
                    }

                    var cell13 = worksheet.Cells[i, 13];
                    cell13.Value = dat.V_CODZONAREI;
                    cell13.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell13.Style.WrapText = true;


                    var cell14 = worksheet.Cells[i, 14];
                    cell14.Value = dat.N_NORTE1 == 0 ? "" : dat.N_NORTE1;
                    cell14.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell14.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell14.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell14.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell14.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell14.Style.WrapText = true;

                    var cell15 = worksheet.Cells[i, 15];
                    cell15.Value = dat.N_ESTE1 == 0 ? "" : dat.N_ESTE1;
                    cell15.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell15.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell15.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell15.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell15.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell15.Style.WrapText = true;

                    var cell16 = worksheet.Cells[i, 16];
                    cell16.Value = dat.N_NORTE2 == 0 ? "" : dat.N_NORTE2;
                    cell16.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell16.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell16.Style.Border.Bottom.Style = ExcelBorderStyle.Thin; 
                    cell16.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell16.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell16.Style.WrapText = true;

                    var cell17 = worksheet.Cells[i, 17];
                    cell17.Value = dat.N_ESTE2 == 0 ? "" : dat.N_ESTE2;
                    cell17.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell17.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell17.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell17.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell17.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell17.Style.WrapText = true;

                    var cell18 = worksheet.Cells[i, 18];
                    cell18.Value = dat.v_CODTIPOACT;
                    cell18.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell18.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell18.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell18.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell18.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell18.Style.WrapText = true;

                    var cell19 = worksheet.Cells[i, 19];
                    cell19.Value = dat.V_COMPONENT;
                    cell19.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell19.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell19.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell19.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell19.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell19.Style.WrapText = true;

                    var cell20 = worksheet.Cells[i, 20];
                    cell20.Value = dat.v_CODZONACAMP;
                    cell20.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell20.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell20.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell20.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell20.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell20.Style.WrapText = true;

                    var cell21 = worksheet.Cells[i, 21];
                    cell21.Value = dat.N_NORTEC == 0 ? "" : dat.N_NORTEC;
                    cell21.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell21.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell21.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell21.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell21.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell21.Style.WrapText = true;

                    var cell22 = worksheet.Cells[i, 22];
                    cell22.Value = dat.N_ESTEC == 0 ? "" : dat.N_ESTEC;
                    cell22.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell22.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell22.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell22.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell22.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell22.Style.WrapText = true;

                    var cell23 = worksheet.Cells[i, 23];
                    cell23.Value = dat.N_DIFCORDE;
                    cell23.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell23.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell23.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell23.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell23.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell23.Style.WrapText = true;


                    var cell24 = worksheet.Cells[i, 24];
                    cell24.Value = dat.V_DESCRILABOR;
                    cell24.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell24.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell24.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell24.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell24.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell24.Style.WrapText = true;

                    var cell25 = worksheet.Cells[i, 25];
                    cell25.Value = dat.N_CANTHOMBRE;
                    cell25.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell25.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell25.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell25.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell25.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell25.Style.WrapText = true;

                    var cell26 = worksheet.Cells[i, 26];
                    cell26.Value = dat.N_CANTMUJE;
                    cell26.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell26.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell26.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell26.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell26.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell26.Style.WrapText = true;

                    var cell27 = worksheet.Cells[i, 27];
                    cell27.Value = dat.N_TOTALTRAB;
                    cell27.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell27.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell27.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell27.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell27.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell27.Style.WrapText = true;

                    var cell28 = worksheet.Cells[i, 28];
                    cell28.Value = dat.V_IGAFOMCORREC;
                    cell28.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell28.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell28.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell28.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell28.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell28.Style.WrapText = true;

                    var cell29 = worksheet.Cells[i, 29];
                    cell29.Value = dat.V_IGAFOMPREV;
                    cell29.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell29.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell29.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell29.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell29.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell29.Style.WrapText = true;

                    var cell30 = worksheet.Cells[i, 30];
                    cell30.Value = dat.V_ESTADOIGAFOM;
                    cell30.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell30.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell30.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell30.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell30.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell30.Style.WrapText = true;

                    var cell31 = worksheet.Cells[i, 31];
                    cell31.Value = dat.V_RESULTADOS;
                    cell31.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell31.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell31.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell31.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell31.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell31.Style.WrapText = true;

                    var cell32 = worksheet.Cells[i, 32];
                    cell32.Value = dat.V_CONCLUSION;
                    cell32.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell32.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell32.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell32.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell32.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell32.Style.WrapText = true;

                    var cell33 = worksheet.Cells[i, 33];
                    cell33.Value = dat.V_SITUACIONINGEMMET;
                    cell33.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell33.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell33.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell33.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell33.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell33.Style.WrapText = true;

                    var cell34 = worksheet.Cells[i, 34];
                    cell34.Value = dat.V_SITACIONDECMINERA;
                    cell34.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell34.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell34.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell34.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell34.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell34.Style.WrapText = true;

                    var cell35 = worksheet.Cells[i, 35];
                    cell35.Value = dat.V_CARGOCORRECT == 1 ? "Si" : "No";
                    cell35.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell35.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell35.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell35.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell35.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell35.Style.WrapText = true;

                    var cell36 = worksheet.Cells[i, 36];
                    cell36.Value = dat.V_INFOMERCORRECT == 1 ? "Si" : "No";
                    cell36.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell36.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell36.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell36.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell36.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell36.Style.WrapText = true;

                    var cell37 = worksheet.Cells[i, 37];
                    cell37.Value = dat.V_RESOLUCIONIGAFOM == 1 ? "Si" : "No";
                    cell37.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell37.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell37.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell37.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell37.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell37.Style.WrapText = true;

                    var cell38 = worksheet.Cells[i, 38];
                    cell38.Value = dat.V_CARGOPREVENT == 1 ? "Si" : "No";
                    cell38.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell38.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell38.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell38.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell38.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell38.Style.WrapText = true;

                    var cell39 = worksheet.Cells[i, 39];
                    cell39.Value = dat.V_INFORMEPREVENT == 1 ? "Si" : "No";
                    cell39.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell39.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell39.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell39.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell39.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell39.Style.WrapText = true;

                    var cell40 = worksheet.Cells[i, 40];
                    cell40.Value = dat.V_CARGOLEVSUS == 1 ? "Si" : "No";
                    cell40.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell40.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell40.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell40.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell40.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell40.Style.WrapText = true;

                    var cell41 = worksheet.Cells[i, 41];
                    cell41.Value = dat.V_CARGODECMINERA == 1 ? "Si" : "No";
                    cell41.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell41.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell41.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell41.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell41.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell41.Style.WrapText = true;

                    var cell42 = worksheet.Cells[i, 42];
                    cell42.Value = dat.V_CONTRATO == 1 ? "Si" : "No";
                    cell42.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell42.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell42.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell42.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell42.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell42.Style.WrapText = true;

                    var cell43 = worksheet.Cells[i, 43];
                    cell43.Value = dat.V_RESOLUCION == 1 ? "Si" : "No";
                    cell43.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell43.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell43.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell43.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell43.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell43.Style.WrapText = true;

                    var cell44 = worksheet.Cells[i, 44];

                    cell44.Value = dat.V_OTROSDOCS == 1 ? "Si" : "No";
                    cell44.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell44.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell44.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell44.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell44.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell44.Style.WrapText = true;
                    excel.Save();
                    i++;
                }
                using (var stream = new MemoryStream())
                {
                    excel.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content, excelContentType, "Reporte Reinfo.xlsx");
                }
            }
        }

        public async Task<IActionResult> ExportaExcelIgafom(string V_RUC, string V_PROVEEDOR, string V_CODCONSECION, string V_NOMCONSECION, string V_NOMDERECHMINE, string V_FECREINFO, string V_RESULTADOS, int N_SEDES)
        {
            ReinfoDTO rei = new ReinfoDTO();
            if (V_RUC == null)
                V_RUC = "%";
            if (V_PROVEEDOR == null)
                V_PROVEEDOR = "%";
            if (V_CODCONSECION == null)
                V_CODCONSECION = "%";
            if (V_NOMCONSECION == null)
                V_NOMCONSECION = "%";
            if (V_NOMDERECHMINE == null)
                V_NOMDERECHMINE = "%";
            if (V_FECREINFO == null)
                V_FECREINFO = "%";
            if (V_RESULTADOS == "0")
                V_RESULTADOS = "%";
            rei.V_RUC = V_RUC;
            rei.V_PROVEEDOR = V_PROVEEDOR;
            rei.V_CODCONSECION = V_CODCONSECION;
            rei.V_NOMCONSECION = V_NOMCONSECION;
            rei.V_NOMDERECHMINE = V_NOMDERECHMINE;
            rei.V_FECREINFO = V_FECREINFO;
            rei.V_RESULTADOS = V_RESULTADOS;
            rei.N_SEDE = N_SEDES;

            var httpClient = await HttpClientReinfo.FiltrarReinfo(rei);
            var httpClientSedes = await HttpClientSedes.ListaSedes();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            string excelContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            //var stream = new MemoryStream();
            using (ExcelPackage excel = new ExcelPackage())
            {
                excel.Workbook.Worksheets.Add("ReporteIgafom");
                // Target a worksheet
                var worksheet = excel.Workbook.Worksheets["ReporteIgafom"];
                // ANCHO DE LAS COLUMNAS
                worksheet.Column(1).Width = 20;
                worksheet.Column(2).Width = 15;
                worksheet.Column(3).Width = 100;
                worksheet.Column(4).Width = 40;
                worksheet.Column(5).Width = 40;
                worksheet.Column(6).Width = 20;
                worksheet.Column(7).Width = 20;
                worksheet.Column(8).Width = 28;
                worksheet.Column(9).Width = 20;
                worksheet.Column(10).Width = 20;
                worksheet.Column(11).Width = 20;
                worksheet.Column(12).Width = 28;
                worksheet.Column(13).Width = 20;

                ////TITULO
                string TitleRange = "A2:M2";
                var celltitle = worksheet.Cells[TitleRange];
                celltitle.Merge = true;
                celltitle.Style.Font.Bold = true;
                celltitle.Style.Font.Size = 18;
                celltitle.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitle.Value = "Reporte Igafom";

                ////TITULO IGAFOM CORRECTIVO
                string TitleRangeIgaf = "F4:H4";
                var celltitleIgaf = worksheet.Cells[TitleRangeIgaf];
                celltitleIgaf.Merge = true;
                celltitleIgaf.Style.Font.Bold = true;
                celltitleIgaf.Style.Font.Size = 11;
                celltitleIgaf.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitleIgaf.Value = "IGAFOM CORRECTIVO";

                ////TITULO IGAFOM PREVENTIVO
                string TitleRangePrev = "I4:K4";
                var celltitlePrev = worksheet.Cells[TitleRangePrev];
                celltitlePrev.Merge = true;
                celltitlePrev.Style.Font.Bold = true;
                celltitlePrev.Style.Font.Size = 11;
                celltitlePrev.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitlePrev.Value = "IGAFOM PREVENTIVO";

                // CABECERA MANUAL
                var cellFamilia = worksheet.Cells["A5"];
                cellFamilia.Value = "Sede";
                cellFamilia.Merge = true;

                var cellCodigo = worksheet.Cells["B5"];
                cellCodigo.Value = "Ruc";
                cellCodigo.Merge = true;

                var cellCaracteristicasTitle = worksheet.Cells["C5"];
                cellCaracteristicasTitle.Value = "Proveedor";
                cellCaracteristicasTitle.Merge = true;

                var cellDescripcion = worksheet.Cells["D5"];
                cellDescripcion.Value = "Código Concesión";

                var cellNomCon = worksheet.Cells["E5"];
                cellNomCon.Value = "Nombre Concesión";

                var cellCantIgafCorrec = worksheet.Cells["F5"];
                cellCantIgafCorrec.Value = "CARGO";

                var cellCantIgafCorrecInforme = worksheet.Cells["G5"];
                cellCantIgafCorrecInforme.Value = "INFORME";

                var cellCantIgafCorrecOtros = worksheet.Cells["H5"];
                cellCantIgafCorrecOtros.Value = "OTROS";

                var cellIgafPrev = worksheet.Cells["I5"];
                cellIgafPrev.Value = "CARGO";

                var cellIgafPrevInforme = worksheet.Cells["J5"];
                cellIgafPrevInforme.Value = "INFORME";

                var cellIgafPrevOtros = worksheet.Cells["K5"];
                cellIgafPrevOtros.Value = "OTROS";

                var cellLevSus = worksheet.Cells["L5"];
                cellLevSus.Value = "Levantamiento de Suspensión";

                var cellResolucion = worksheet.Cells["M5"];
                cellResolucion.Value = "Resolución";

                // STILOS A LA CABECERA
                string HeaderRange = "A5:M5";
                worksheet.Cells[HeaderRange].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[HeaderRange].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#cfecfe"));
                worksheet.Cells[HeaderRange].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Top.Color.SetColor(Color.Black);
                worksheet.Cells[HeaderRange].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[HeaderRange].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                // STILOS A LA CABECERA
                string HeaderRange2 = "F4:K4";
                worksheet.Cells[HeaderRange2].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[HeaderRange2].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#cfecfe"));
                worksheet.Cells[HeaderRange2].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Top.Color.SetColor(Color.Black);
                worksheet.Cells[HeaderRange2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[HeaderRange2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                int i = 6;
                foreach (ReinfoDTO dat in httpClient)
                {
                    var cell = worksheet.Cells[i, 1];
                    var sede = dat.N_SEDE;
                    cell.Value = httpClientSedes.Find(x => x.N_CODSEDE == sede).V_NOMSEDE;
                    cell.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell.Style.WrapText = true;

                    var cell2 = worksheet.Cells[i, 2];
                    cell2.Value = dat.V_RUC;
                    cell2.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell2.Style.WrapText = true;

                    var cell3 = worksheet.Cells[i, 3];
                    cell3.Value = dat.V_PROVEEDOR;
                    cell3.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell3.Style.WrapText = true;

                    var cell4 = worksheet.Cells[i, 4];
                    cell4.Value = dat.V_CODCONSECION;
                    cell4.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell4.Style.WrapText = true;

                    var cell5 = worksheet.Cells[i, 5];
                    cell5.Value = dat.V_NOMCONSECION;
                    cell5.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell5.Style.WrapText = true;

                    var cell6 = worksheet.Cells[i, 6];
                    cell6.Value = dat.V_CARGOCORRECT == 1 ? "Si" : "No";
                    cell6.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell6.Style.WrapText = true;

                    var cell7 = worksheet.Cells[i, 7];
                    cell7.Value = dat.V_INFOMERCORRECT == 1 ? "Si" : "No";
                    cell7.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell7.Style.WrapText = true;

                    var cell8 = worksheet.Cells[i, 8];
                    cell8.Value = dat.V_OTROSCORRECT == 1 ? "Si" : "No";
                    cell8.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell8.Style.WrapText = true;

                    var cell9 = worksheet.Cells[i, 9];
                    cell9.Value = dat.V_CARGOPREVENT == 1 ? "Si" : "No";
                    cell9.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell9.Style.WrapText = true;

                    var cell10 = worksheet.Cells[i, 10];
                    cell10.Value = dat.V_INFORMEPREVENT == 1 ? "Si" : "No";
                    cell10.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell10.Style.WrapText = true;

                    var cell11 = worksheet.Cells[i, 11];
                    cell11.Value = dat.V_OTROSPREVENT == 1 ? "Si" : "No";
                    cell11.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell11.Style.WrapText = true;

                    var cell12 = worksheet.Cells[i, 12];
                    cell12.Value = dat.V_CARGOLEVSUS == 1 ? "Si" : "No";
                    cell12.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell12.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell12.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell12.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell12.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell12.Style.WrapText = true;


                    var cell13 = worksheet.Cells[i, 13];
                    cell13.Value = dat.V_RESOLUCION == 1 ? "Si" : "No";
                    cell13.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell13.Style.WrapText = true;

                    excel.Save();
                    i++;
                }
                using (var stream = new MemoryStream())
                {
                    excel.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content, excelContentType, "Reporte Igafom.xlsx");
                }
            }
        }

        public async Task<IActionResult> ExportaExcelDecMinera(string V_RUC, string V_PROVEEDOR, string V_CODCONSECION, string V_NOMCONSECION, string V_NOMDERECHMINE, string V_FECREINFO, string V_RESULTADOS, int N_SEDES)
        {
            ReinfoDTO rei = new ReinfoDTO();
            if (V_RUC == null)
                V_RUC = "%";
            if (V_PROVEEDOR == null)
                V_PROVEEDOR = "%";
            if (V_CODCONSECION == null)
                V_CODCONSECION = "%";
            if (V_NOMCONSECION == null)
                V_NOMCONSECION = "%";
            if (V_NOMDERECHMINE == null)
                V_NOMDERECHMINE = "%";
            if (V_FECREINFO == null)
                V_FECREINFO = "%";
            if (V_RESULTADOS == "0")
                V_RESULTADOS = "%";
            rei.V_RUC = V_RUC;
            rei.V_PROVEEDOR = V_PROVEEDOR;
            rei.V_CODCONSECION = V_CODCONSECION;
            rei.V_NOMCONSECION = V_NOMCONSECION;
            rei.V_NOMDERECHMINE = V_NOMDERECHMINE;
            rei.V_FECREINFO = V_FECREINFO;
            rei.V_RESULTADOS = V_RESULTADOS;
            rei.N_SEDE = N_SEDES;

            var httpClient = await HttpClientReinfo.FiltrarReinfo(rei);
            var httpClientSedes = await HttpClientSedes.ListaSedes();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            string excelContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            //var stream = new MemoryStream();
            using (ExcelPackage excel = new ExcelPackage())
            {
                excel.Workbook.Worksheets.Add("ReporteDeclaracionMinera");

                // Target a worksheet
                var worksheet = excel.Workbook.Worksheets["ReporteDeclaracionMinera"];
                // ANCHO DE LAS COLUMNAS
                worksheet.Column(1).Width = 20;
                worksheet.Column(2).Width = 15;
                worksheet.Column(3).Width = 50;
                worksheet.Column(4).Width = 40;
                worksheet.Column(5).Width = 40;
                worksheet.Column(6).Width = 40;
                worksheet.Column(7).Width = 20;
                worksheet.Column(8).Width = 28;
                worksheet.Column(9).Width = 25;
                worksheet.Column(10).Width = 25;
                worksheet.Column(11).Width = 25;

                ////TITULO
                string TitleRange = "A2:K2";
                var celltitle = worksheet.Cells[TitleRange];
                celltitle.Merge = true;
                celltitle.Style.Font.Bold = true;
                celltitle.Style.Font.Size = 18;
                celltitle.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitle.Value = "Reporte Declaración Minera";

                // CABECERA MANUAL
                var cellFamilia = worksheet.Cells["A5"];
                cellFamilia.Value = "Sede";
                cellFamilia.Merge = true;

                var cellCodigo = worksheet.Cells["B5"];
                cellCodigo.Value = "Ruc";
                cellCodigo.Merge = true;

                var cellCaracteristicasTitle = worksheet.Cells["C5"];
                cellCaracteristicasTitle.Value = "Proveedor";
                cellCaracteristicasTitle.Merge = true;

                var cellDescripcion = worksheet.Cells["D5"];
                cellDescripcion.Value = "Código Concesión";

                var cellNomCon = worksheet.Cells["E5"];
                cellNomCon.Value = "Nombre Concesión";

                var cellCantIgafCorrec = worksheet.Cells["F5"];
                cellCantIgafCorrec.Value = "Nombre Derecho Minero";

                var cellIgafPrev = worksheet.Cells["G5"];
                cellIgafPrev.Value = "Fecha Reinfo";

                var cells2021S1 = worksheet.Cells["H5"];
                cells2021S1.Value = "Semestre 1";

                var cells2021S2 = worksheet.Cells["I5"];
                cells2021S2.Value = "Semestre 2";

                var cells2022S1 = worksheet.Cells["J5"];
                cells2022S1.Value = "Semestre 1";

                var cells2022S2 = worksheet.Cells["K5"];
                cells2022S2.Value = "Semestre 2";



                ////TITULO 2021
                string TitleRangeIgaf = "H4:I4";
                var celltitleIgaf = worksheet.Cells[TitleRangeIgaf];
                celltitleIgaf.Merge = true;
                celltitleIgaf.Style.Font.Bold = true;
                celltitleIgaf.Style.Font.Size = 11;
                celltitleIgaf.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitleIgaf.Value = "2021";

                ////TITULO 2022
                string TitleRangePrev = "J4:K4";
                var celltitlePrev = worksheet.Cells[TitleRangePrev];
                celltitlePrev.Merge = true;
                celltitlePrev.Style.Font.Bold = true;
                celltitlePrev.Style.Font.Size = 11;
                celltitlePrev.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitlePrev.Value = "2022";


                // ESTILOS DE LA CABECERA
                string HeaderRange = "A5:K5";
                worksheet.Cells[HeaderRange].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[HeaderRange].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#cfecfe"));
                worksheet.Cells[HeaderRange].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Top.Color.SetColor(Color.Black);
                worksheet.Cells[HeaderRange].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[HeaderRange].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                // ESTILOS DE LA CABECERA AÑO
                string HeaderRangeyear = "H4:K4";
                worksheet.Cells[HeaderRangeyear].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[HeaderRangeyear].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#cfecfe"));
                worksheet.Cells[HeaderRangeyear].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRangeyear].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRangeyear].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRangeyear].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRangeyear].Style.Border.Top.Color.SetColor(Color.Black);
                worksheet.Cells[HeaderRangeyear].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[HeaderRangeyear].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                int i = 6;
                foreach (ReinfoDTO dat in httpClient)
                {
                    var cell = worksheet.Cells[i, 1];
                    var sede = dat.N_SEDE;
                    cell.Value = httpClientSedes.Find(x => x.N_CODSEDE == sede).V_NOMSEDE;
                    cell.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell.Style.WrapText = true;

                    var cell2 = worksheet.Cells[i, 2];
                    cell2.Value = dat.V_RUC;
                    cell2.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell2.Style.WrapText = true;

                    var cell3 = worksheet.Cells[i, 3];
                    cell3.Value = dat.V_PROVEEDOR;
                    cell3.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell3.Style.WrapText = true;

                    var cell4 = worksheet.Cells[i, 4];
                    cell4.Value = dat.V_CODCONSECION;
                    cell4.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell4.Style.WrapText = true;

                    var cell5 = worksheet.Cells[i, 5];
                    cell5.Value = dat.V_NOMCONSECION;
                    cell5.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell5.Style.WrapText = true;

                    var cell6 = worksheet.Cells[i, 6];
                    cell6.Value = dat.V_NOMDERECHMINE;
                    cell6.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell6.Style.WrapText = true;

                    var cell7 = worksheet.Cells[i, 7];
                    cell7.Value = dat.V_FECREINFO;
                    cell7.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell7.Style.WrapText = true;

                    var cell8 = worksheet.Cells[i, 8];
                    cell8.Value = dat.V_2021SEM1 == 1 ? "Si" : "No";
                    cell8.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell8.Style.WrapText = true;

                    var cell9 = worksheet.Cells[i, 9];
                    cell9.Value = dat.V_2021SEM2 == 1 ? "Si" : "No";
                    cell9.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell9.Style.WrapText = true;

                    var cell10 = worksheet.Cells[i, 10];
                    cell10.Value = dat.V_2022SEM1 == 1 ? "Si" : "No";
                    cell10.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell10.Style.WrapText = true;

                    var cell11 = worksheet.Cells[i, 11];
                    cell11.Value = dat.V_2022SEM2 == 1 ? "Si" : "No";
                    cell11.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell11.Style.WrapText = true;
                    excel.Save();
                    i++;
                }
                using (var stream = new MemoryStream())
                {
                    excel.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content, excelContentType, "Reporte Declaración Minera.xlsx");
                }
            }
        }
        public async Task<IActionResult> ExportaExcelFormalizados(string V_RUC, string V_PROVEEDOR, string V_CODCONSECION, string V_NOMCONSECION, string V_NOMDERECHMINE, string V_FECREINFO, string V_RESULTADOS, int N_SEDES)
        {
            ReinfoDTO rei = new ReinfoDTO();
            if (V_RUC == null)
                V_RUC = "%";
            if (V_PROVEEDOR == null)
                V_PROVEEDOR = "%";
            if (V_CODCONSECION == null)
                V_CODCONSECION = "%";
            if (V_NOMCONSECION == null)
                V_NOMCONSECION = "%";
            if (V_NOMDERECHMINE == null)
                V_NOMDERECHMINE = "%";
            if (V_FECREINFO == null)
                V_FECREINFO = "%";
            if (V_RESULTADOS == "0")
                V_RESULTADOS = "%";
            rei.V_RUC = V_RUC;
            rei.V_PROVEEDOR = V_PROVEEDOR;
            rei.V_CODCONSECION = V_CODCONSECION;
            rei.V_NOMCONSECION = V_NOMCONSECION;
            rei.V_NOMDERECHMINE = V_NOMDERECHMINE;
            rei.V_FECREINFO = V_FECREINFO;
            rei.V_RESULTADOS = V_RESULTADOS;
            rei.N_SEDE = N_SEDES;
            var httpClient = await HttpClientReinfo.FiltrarReinfo(rei);
            var httpClientSedes = await HttpClientSedes.ListaSedes();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            string excelContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            //var stream = new MemoryStream();
            using (ExcelPackage excel = new ExcelPackage())
            {
                excel.Workbook.Worksheets.Add("ReporteFormalizados");

                // Target a worksheet
                var worksheet = excel.Workbook.Worksheets["ReporteFormalizados"];
                // ANCHO DE LAS COLUMNAS
                worksheet.Column(1).Width = 20;
                worksheet.Column(2).Width = 15;
                worksheet.Column(3).Width = 50;
                worksheet.Column(4).Width = 40;
                worksheet.Column(5).Width = 40;
                worksheet.Column(6).Width = 40;
                worksheet.Column(7).Width = 20;
                worksheet.Column(8).Width = 28;

                ////TITULO
                string TitleRange = "A2:H2";
                var celltitle = worksheet.Cells[TitleRange];
                celltitle.Merge = true;
                celltitle.Style.Font.Bold = true;
                celltitle.Style.Font.Size = 18;
                celltitle.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitle.Value = "Reporte Formalizados";

                // CABECERA MANUAL
                var cellFamilia = worksheet.Cells["A4"];
                cellFamilia.Value = "Sede";
                cellFamilia.Merge = true;

                var cellCodigo = worksheet.Cells["B4"];
                cellCodigo.Value = "Ruc";
                cellCodigo.Merge = true;

                var cellCaracteristicasTitle = worksheet.Cells["C4"];
                cellCaracteristicasTitle.Value = "Proveedor";
                cellCaracteristicasTitle.Merge = true;

                var cellDescripcion = worksheet.Cells["D4"];
                cellDescripcion.Value = "Código Concesión";

                var cellNomCon = worksheet.Cells["E4"];
                cellNomCon.Value = "Nombre Concesión";

                var cellCantIgafCorrec = worksheet.Cells["F4"];
                cellCantIgafCorrec.Value = "Contrato";

                var cellIgafPrev = worksheet.Cells["G4"];
                cellIgafPrev.Value = "Resolución";

                var cellLevSus = worksheet.Cells["H4"];
                cellLevSus.Value = "Otros Documentos";

                // STILOS A LA CABECERA
                string HeaderRange = "A4:H4";
                worksheet.Cells[HeaderRange].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[HeaderRange].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#cfecfe"));
                worksheet.Cells[HeaderRange].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Top.Color.SetColor(Color.Black);
                worksheet.Cells[HeaderRange].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[HeaderRange].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                //variab
                int i = 5;
                foreach (ReinfoDTO dat in httpClient)
                {
                    var cell = worksheet.Cells[i, 1];
                    var sede = dat.N_SEDE;
                    cell.Value = httpClientSedes.Find(x => x.N_CODSEDE == sede).V_NOMSEDE;
                    cell.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell.Style.WrapText = true;

                    var cell2 = worksheet.Cells[i, 2];
                    cell2.Value = dat.V_RUC;
                    cell2.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell2.Style.WrapText = true;

                    var cell3 = worksheet.Cells[i, 3];
                    cell3.Value = dat.V_PROVEEDOR;
                    cell3.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell3.Style.WrapText = true;

                    var cell4 = worksheet.Cells[i, 4];
                    cell4.Value = dat.V_CODCONSECION;
                    cell4.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell4.Style.WrapText = true;

                    var cell5 = worksheet.Cells[i, 5];
                    cell5.Value = dat.V_NOMCONSECION;
                    cell5.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell5.Style.WrapText = true;

                    var cell6 = worksheet.Cells[i, 6];
                    cell6.Value = dat.V_CONTRATO == 1 ? "Si" : "No";
                    cell6.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell6.Style.WrapText = true;

                    var cell7 = worksheet.Cells[i, 7];
                    cell7.Value = dat.V_RESOLUCION == 1 ? "Si" : "No";
                    cell7.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell7.Style.WrapText = true;

                    var cell8 = worksheet.Cells[i, 8];
                    cell8.Value = dat.V_OTROSDOCS == 1 ? "Si" : "No";
                    cell8.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell8.Style.WrapText = true;


                    excel.Save();
                    i++;
                }
                using (var stream = new MemoryStream())
                {
                    excel.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content, excelContentType, "Reporte Formalizados.xlsx");
                }
            }
        }

        public async Task<IActionResult> ExportaExcelReportesGeneral(string V_RUC, string V_PROVEEDOR, string V_CODCONSECION, string V_NOMCONSECION, string V_REALIZADOPOR, string V_REVISADOPOR, string V_FECHAREALIZADO, string V_FECHAREVISADO, string V_FECCREACION, int N_SEDES)
        {
            var iniciocorrectivo = 0;
            var fincorrectivo = 0;
            var iniciopreventivo = 0;
            var finpreventivo = 0;
            var inicioformalizados = 0;
            var finformalizados = 0;
            int contador2020 = 0;
            int contador2021 = 0;
            int contador2022 = 0;
            
            ReporteDTO rep = new ReporteDTO();
            rep.V_RUC = V_RUC;
            rep.V_PROVEEDOR = V_PROVEEDOR;
            rep.V_CODCONSECION = V_CODCONSECION;
            rep.V_NOMCONSECION = V_NOMCONSECION;
            rep.V_REALIZADOPOR = V_REALIZADOPOR;
            rep.V_REVISADOPOR = V_REVISADOPOR;
            rep.V_FECHAREALIZADO = V_FECHAREALIZADO;
            rep.V_FECHAREVISADO = V_FECHAREVISADO;
            rep.V_FECCREACION = V_FECCREACION;
            rep.N_SEDE = N_SEDES;
            var httpClient = await HttpClientReporte.FiltrarReporte(rep);
            //CONSEGUIR EL MAX DE VERSION
            int maxversion = httpClient.Max(x => x.N_VERSION); 
            var httpUbigeo = await HttpClientUbigeo.ListaUbigeo();
            var httpClientSedes = await HttpClientSedes.ListaSedes();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            string excelContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            //var stream = new MemoryStream();
            using (ExcelPackage excel = new ExcelPackage())
            {
                excel.Workbook.Worksheets.Add("ReportesGeneradosGeneral");
                // Target a worksheet
                var worksheet = excel.Workbook.Worksheets["ReportesGeneradosGeneral"];

                ////TITULO GENERAL
                string TitleRange = "A2:G2";
                var celltitle = worksheet.Cells[TitleRange];
                celltitle.Merge = true;
                celltitle.Style.Font.Bold = true;
                celltitle.Style.Font.Size = 18;
                celltitle.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitle.Value = "Reporte" +
                    " General";

                string cabecera = "";
                
                // CABECERA MANUAL
                cabecera = "COD REINFO";
                for (int a = 1; a <= maxversion; a++)
                {
                    cabecera = cabecera + ",FECHA CREACION V" + a;
                }
                for (int a = 1; a <= maxversion; a++)
                {
                    cabecera = cabecera + ",FECHA REALIZADO V" + a;
                }
                cabecera = cabecera + ",INFORMES 2020";
                cabecera = cabecera + ",INFORMES 2021";
                cabecera = cabecera + ",INFORMES 2022";
                cabecera = cabecera + ",RUC";
                cabecera = cabecera + ",PROVEEDOR";
                cabecera = cabecera + ",CODIGO DE CONCESION";
                cabecera = cabecera + ",NOMBRE DE CONCESIÓN";
                cabecera = cabecera + ",TMPH";
                cabecera = cabecera + ",TMPS";
                cabecera = cabecera + ",UBIGEO";
                cabecera = cabecera + ",DEPARTAMENTO";
                cabecera = cabecera + ",PROVINCIA";
                cabecera = cabecera + ",DISTRITO";
                cabecera = cabecera + ",NOMBRE DERECHO MINERO";
                cabecera = cabecera + ",ZONA REINFO";
                cabecera = cabecera + ",NORTE 1";
                cabecera = cabecera + ",ESTE 1";
                cabecera = cabecera + ",NORTE 2";
                cabecera = cabecera + ",ESTE 2";
                cabecera = cabecera + ",TIPO DE ACTIVIDAD";
                cabecera = cabecera + ",FECHA REINFO";
                cabecera = cabecera + ",COMPONENTE";
                cabecera = cabecera + ",CODIGO ZONA CAMPO";
                cabecera = cabecera + ",NORTE C";
                cabecera = cabecera + ",ESTE C";
                cabecera = cabecera + ",DIFERENCIA COORDENADAS";
                cabecera = cabecera + ",SEDE";
                cabecera = cabecera + ",DESCRIPCION LABOR";
                cabecera = cabecera + ",CANTIDAD HOMBRES";
                cabecera = cabecera + ",CANTIDAD MUJERES";
                cabecera = cabecera + ",TOTAL TRABAJADORES";
                cabecera = cabecera + ",IGAFOM CORRECTIVO";
                cabecera = cabecera + ",IGAFOM PREVENTIVO";
                cabecera = cabecera + ",ESTADO IGAFOM";
                cabecera = cabecera + ",RESULTADO REINFO";
                cabecera = cabecera + ",CONCLUSIÓN";
                cabecera = cabecera + ",FECHA CREACIÓN";
                cabecera = cabecera + ",USUARIO";
                cabecera = cabecera + ",ESTADO";
                cabecera = cabecera + ",SITUACION INGEMMET";
                cabecera = cabecera + ",SITUACION DECLARACION MINERA";
                cabecera = cabecera + ",CARGO CORRECTIVO";
                cabecera = cabecera + ",INFORME CORRECTIVO";
                cabecera = cabecera + ",OTROS CORRECTIVO";
                cabecera = cabecera + ",RESOLUCION IGAFOM";
                cabecera = cabecera + ",CARGO PREVENTIVO";
                cabecera = cabecera + ",INFORME PREVENTIVO";
                cabecera = cabecera + ",OTROS PREVENTIVO";
                cabecera = cabecera + ",CARGO LEVANTAMIENTO DE SUSPENSION";
                cabecera = cabecera + ",CARGO DECLARACION MINERA";
                cabecera = cabecera + ",CONTRATO FORMALIZADOS";
                cabecera = cabecera + ",RESOLUCION FORMALIZADOS";
                cabecera = cabecera + ",OTROS FORMALIZADOS";

                string[] fooArray = cabecera.Split(',');  // now you have an array of 3 strings
                // Data para el HEADER
                var headerRow = new List<string[]>()
                   {
                     fooArray
                   };
                var cod = Letter(headerRow[0].Length - 1); //Char.ConvertFromUtf32(headerRow[0].Length + 1);
                // Determine el rango del header (e.g. A1:D1)
                string headerRange = "A4:" + cod + "4";
                // Creando el Header con la data que se carga anteriormente.
                worksheet.Cells[headerRange].LoadFromArrays(headerRow);
                worksheet.Cells[headerRange].Style.Font.Bold = true;
                worksheet.Cells[headerRange].Style.Font.Size = 10;
                worksheet.Cells[headerRange].Style.Font.Color.SetColor(Color.Black);

                // STILOS A LA CABECERA
                string HeaderRange = "A4:" + cod + "4";
                worksheet.Cells[HeaderRange].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[HeaderRange].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#cfecfe"));
                worksheet.Cells[HeaderRange].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Top.Color.SetColor(Color.Black);
                worksheet.Cells[HeaderRange].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[HeaderRange].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                var lis_distinc = await HttpClientReporte.ListaReporteDistinct();
                int e = 0;
                int i = 5;
                //foreach (ReporteDTO dat in httpClient)
                //{
                foreach (ReporteDTO c in lis_distinc)
                {
                    ReporteDTO dat = httpClient.FirstOrDefault(x => x.N_CODREIN == c.N_CODREIN);
                    contador2020 = 0;
                    contador2021 = 0;
                    contador2022 = 0;
                    e = 1;
                    List<ReporteDTO> list_nc = new List<ReporteDTO>();
                    list_nc = httpClient.Where(x => x.N_CODREIN == c.N_CODREIN).ToList();
                    ReporteDTO nc = list_nc.Last();

                    var cell1 = worksheet.Cells[i, e];
                    cell1.Value = nc.N_CODREIN;
                    cell1.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell1.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell1.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell1.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell1.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell1.Style.WrapText = true;
                    worksheet.Column(e).Width = 18;
                    //foreach (ReporteDTO c in lis_distinc)
                    //{
                    
                    e++;
                    for (int a = 0; a < maxversion; a++)
                    {
                        if (a < list_nc.Count())
                        {
                            var cell2 = worksheet.Cells[i, e];
                            cell2.Value = list_nc[a].V_FECCREACION;
                            cell2.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                            cell2.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                            cell2.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                            cell2.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            cell2.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                            cell2.Style.WrapText = true;
                            worksheet.Column(e).Width = 20;
                            e++;
                        }
                        else
                        {
                            var cell2 = worksheet.Cells[i, e];
                            cell2.Value = "";
                            cell2.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                            cell2.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                            cell2.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                            cell2.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            cell2.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                            cell2.Style.WrapText = true;
                            worksheet.Column(e).Width = 20;
                            e++;
                        }

                    }
                    //e++;
                    for (int a = 0; a < maxversion; a++)
                    {
                        if (a < list_nc.Count())
                        {
                            var cell3 = worksheet.Cells[i, e];
                            DateTime DateObject = DateTime.ParseExact(list_nc[a].V_FECHAREALIZADO, "dd/MM/yyyy", null);
                            int year = DateObject.Year;
                            cell3.Value = year < 2010? "" : list_nc[a].V_FECHAREALIZADO;
                                             
                            if (year ==2020)
                            {
                                contador2020 = contador2020 + 1;
                            }else if (year == 2021)
                            {
                                contador2021 = contador2021 + 1;
                            }
                            else if (year == 2022)
                            {
                                contador2022 = contador2022 + 1;
                            }
                            cell3.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                            cell3.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                            cell3.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                            cell3.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            cell3.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                            cell3.Style.WrapText = true;
                            worksheet.Column(e).Width = 20;
                            e++;
                        }
                        else
                        {
                            var cell3 = worksheet.Cells[i, e];
                            cell3.Value = "";
                            cell3.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                            cell3.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                            cell3.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                            cell3.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            cell3.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                            cell3.Style.WrapText = true;
                            worksheet.Column(e).Width = 20;
                            e++;
                        }
                    }
                    // e++;
                    var cell6 = worksheet.Cells[i, e];
                    cell6.Value = contador2020;
                    cell6.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 20;
                    cell6.Style.WrapText = true;

                    e = e + 1;
                    var cell7 = worksheet.Cells[i, e];
                    cell7.Value = contador2021;
                    cell7.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 20;
                    cell7.Style.WrapText = true;

                    e = e + 1;
                    var cell8 = worksheet.Cells[i, e];
                    cell8.Value = contador2022;
                    cell8.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 20;
                    cell8.Style.WrapText = true;

                    e = e + 1;
                    var cell9 = worksheet.Cells[i, e];
                    cell9.Value = nc.V_RUC;
                    cell9.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 20;
                    cell9.Style.WrapText = true;

                    e = e + 1;
                    var cell10 = worksheet.Cells[i, e];
                    cell10.Value = nc.V_PROVEEDOR;
                    cell10.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 150;
                    cell10.Style.WrapText = true;

                    e = e + 1;
                    var cell11 = worksheet.Cells[i, e];
                    cell11.Value = nc.V_CODCONSECION;
                    cell11.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell11.Style.WrapText = true;

                    e = e + 1;
                    var cell12 = worksheet.Cells[i, e];
                    cell12.Value = nc.V_NOMCONSECION;
                    cell12.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell12.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell12.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell12.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell12.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 45;
                    cell12.Style.WrapText = true;

                    e = e + 1;
                    var cell13 = worksheet.Cells[i, e];
                    cell13.Value = nc.N_TMPH == 0 ? "" : nc.N_TMPH;
                    cell13.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 20;
                    cell13.Style.WrapText = true;

                    e = e + 1;
                    var cell14 = worksheet.Cells[i, e];
                    cell14.Value = nc.N_TMPS == 0 ? "" : nc.N_TMPS;
                    cell14.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell14.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell14.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell14.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell14.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 20;
                    cell14.Style.WrapText = true;

                    e = e + 1;
                    var cell15 = worksheet.Cells[i, e];
                    cell15.Value = nc.V_UBIGEO;
                    cell15.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell15.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell15.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell15.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell15.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 25;
                    cell15.Style.WrapText = true;

                    e = e + 1;
                    var cell16 = worksheet.Cells[i, e];
                    if (nc.V_UBIGEO.Length == 6)
                    {
                        var Departamento = nc.V_UBIGEO.Substring(0, 2) + "0000";
                        cell16.Value = httpUbigeo.FirstOrDefault(x => x.V_UBIGEO == Departamento).V_DEP;

                        cell16.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                        cell16.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        cell16.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                        cell16.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        cell16.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                        worksheet.Column(e).Width = 25;
                        cell16.Style.WrapText = true;
                    }

                    e = e + 1;
                    var cell17 = worksheet.Cells[i, e];
                    if (nc.V_UBIGEO.Length == 6)
                    {
                        var Ciudad = nc.V_UBIGEO.Substring(0, 4) + "00";
                        cell17.Value = httpUbigeo.FirstOrDefault(x => x.V_UBIGEO == Ciudad).V_PROV;
                        cell17.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                        cell17.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        cell17.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                        cell17.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        cell17.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                        worksheet.Column(e).Width = 25;
                        cell17.Style.WrapText = true;
                    }
                    e = e + 1;
                    var cell18 = worksheet.Cells[i, e];
                    if (nc.V_UBIGEO.Length == 6)
                    {
                        var Distrito = nc.V_UBIGEO;
                        cell18.Value = httpUbigeo.FirstOrDefault(x => x.V_UBIGEO == Distrito).V_DIST;
                        cell18.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                        cell18.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        cell18.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                        cell18.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        cell18.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                        worksheet.Column(e).Width = 30;
                        cell18.Style.WrapText = true;
                    }
                    e = e + 1;
                    var cell19 = worksheet.Cells[i, e];
                    cell19.Value = nc.V_NOMDERECHMINE;
                    cell19.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell19.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell19.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell19.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell19.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell19.Style.WrapText = true;

                    e = e + 1;
                    var cell20 = worksheet.Cells[i, e];
                    cell20.Value = nc.V_CODZONAREI;
                    cell20.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell20.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell20.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell20.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell20.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 20;
                    cell20.Style.WrapText = true;

                    e = e + 1;
                    var cell21 = worksheet.Cells[i, e];
                    cell21.Value= nc.N_NORTE1 == 0? "": nc.N_NORTE1;
                    cell21.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell21.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell21.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell21.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell21.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 20;
                    cell21.Style.WrapText = true;

                    e = e + 1;
                    var cell22 = worksheet.Cells[i, e];
                    cell22.Value = nc.N_ESTE1 == 0 ? "" : nc.N_ESTE1;
                    cell22.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell22.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell22.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell22.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell22.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 15;
                    cell22.Style.WrapText = true;

                    e = e + 1;
                    var cell23 = worksheet.Cells[i, e];
                    cell23.Value = nc.N_NORTE2 == 0 ? "" : nc.N_NORTE2;
                    cell23.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell23.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell23.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell23.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell23.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 25;
                    cell23.Style.WrapText = true;

                    e = e + 1;
                    var cell24 = worksheet.Cells[i, e];
                    cell24.Value = nc.N_ESTE2 == 0 ? "" : nc.N_ESTE2;
                    cell24.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell24.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell24.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell24.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell24.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 20;
                    cell24.Style.WrapText = true;

                    e = e + 1;
                    var cell25 = worksheet.Cells[i, e];
                    cell25.Value = nc.v_CODTIPOACT;
                    cell25.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell25.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell25.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell25.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell25.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell25.Style.WrapText = true;

                    e = e + 1;
                    var cell26 = worksheet.Cells[i, e];
                    cell26.Value = nc.V_FECREINFO;
                    cell26.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell26.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell26.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell26.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell26.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell26.Style.WrapText = true;

                    e = e + 1;
                    var cell27 = worksheet.Cells[i, e];
                    cell27.Value = nc.V_COMPONENT;
                    cell27.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell27.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell27.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell27.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell27.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 20;
                    cell27.Style.WrapText = true;

                    e = e + 1;
                    var cell28 = worksheet.Cells[i, e];
                    cell28.Value = nc.v_CODZONACAMP;
                    cell28.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell28.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell28.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell28.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell28.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 25;
                    cell28.Style.WrapText = true;

                    e = e + 1;
                    var cell29 = worksheet.Cells[i, e];
                    cell29.Value = nc.N_NORTEC == 0 ? "" : nc.N_NORTEC;
                    cell29.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell29.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell29.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell29.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell29.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 20;
                    cell29.Style.WrapText = true;

                    e = e + 1;
                    var cell30 = worksheet.Cells[i, e];
                    cell30.Value = nc.N_ESTEC == 0 ? "" : nc.N_ESTEC;
                    cell30.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell30.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell30.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell30.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell30.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 28;
                    cell30.Style.WrapText = true;

                    e = e + 1;
                    var cell31 = worksheet.Cells[i, e];
                    cell31.Value = nc.N_DIFCORDE;
                    cell31.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell31.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell31.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell31.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell31.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 31;
                    cell31.Style.WrapText = true;

                    e = e + 1;
                    var cell32 = worksheet.Cells[i, e];
                    var sede = nc.N_SEDE;
                    cell32.Value = httpClientSedes.FirstOrDefault(x => x.N_CODSEDE == sede).V_NOMSEDE;
                    cell32.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell32.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell32.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell32.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell32.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 28;
                    cell32.Style.WrapText = true;

                    e = e + 1;
                    var cell33 = worksheet.Cells[i, e];
                    cell33.Value = nc.V_DESCRILABOR;
                    cell33.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell33.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell33.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell33.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell33.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 200;
                    cell33.Style.WrapText = true;

                    e = e + 1;
                    var cell34 = worksheet.Cells[i, e];
                    cell34.Value = nc.N_CANTHOMBRE;
                    cell34.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell34.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell34.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell34.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell34.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 50;
                    cell34.Style.WrapText = true;

                    e = e + 1;
                    var cell35 = worksheet.Cells[i, e];
                    cell35.Value = nc.N_CANTMUJE;
                    cell35.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell35.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell35.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell35.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell35.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 25;
                    cell35.Style.WrapText = true;

                    e = e + 1;
                    var cell36 = worksheet.Cells[i, e];
                    cell36.Value = nc.N_TOTALTRAB;
                    cell36.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell36.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell36.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell36.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell36.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell36.Style.WrapText = true;


                    e = e + 1;
                    var cell37 = worksheet.Cells[i, e];
                    cell37.Value = nc.V_IGAFOMCORREC;
                    cell37.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell37.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell37.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell37.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell37.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 25;
                    cell37.Style.WrapText = true;

                    e = e + 1;
                    var cell38 = worksheet.Cells[i, e];
                    cell38.Value = nc.V_IGAFOMPREV;
                    cell38.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell38.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell38.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell38.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell38.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell38.Style.WrapText = true;

                    e = e + 1;
                    var cell39 = worksheet.Cells[i, e];
                    cell39.Value = nc.V_ESTADOIGAFOM;
                    cell39.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell39.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell39.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell39.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell39.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell39.Style.WrapText = true;

                    e = e + 1;
                    var cell40 = worksheet.Cells[i, e];
                    cell40.Value = nc.V_RESULTADOS;
                    cell40.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell40.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell40.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell40.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell40.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell40.Style.WrapText = true;

                    e = e + 1;
                    var cell41 = worksheet.Cells[i, e];
                    cell41.Value = nc.V_CONCLUSION;
                    cell41.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell41.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell41.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell41.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell41.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 400;
                    cell41.Style.WrapText = true;

                    e = e + 1;
                    var cell42 = worksheet.Cells[i, e];
                    cell42.Value = nc.V_FECCREACION;
                    cell42.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell42.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell42.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell42.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell42.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 20;
                    cell42.Style.WrapText = true;

                    e = e + 1;
                    var cell43 = worksheet.Cells[i, e];
                    cell43.Value = nc.V_USUREGISTRO;
                    cell43.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell43.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell43.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell43.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell43.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell43.Style.WrapText = true;

                    e = e + 1;
                    var cell44 = worksheet.Cells[i, e];
                    if (nc.V_ESTADO == "A"){
                        cell44.Value = "Activo";
                    }
                    cell44.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell44.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell44.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell44.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell44.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 20;
                    cell44.Style.WrapText = true;

                    e = e + 1;
                    var cell45 = worksheet.Cells[i, e];
                    cell45.Value = nc.V_SITUACIONINGEMMET;
                    cell45.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell45.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell45.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell45.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell45.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell45.Style.WrapText = true;

                    e = e + 1;
                    var cell46 = worksheet.Cells[i, e];
                    cell46.Value = nc.V_SITACIONDECMINERA;
                    cell46.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell46.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell46.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell46.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell46.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell46.Style.WrapText = true;


                    e = e + 1;
                    iniciocorrectivo = e;
                    var cell47 = worksheet.Cells[i, e];
                    cell47.Value = nc.V_CARGOCORRECT == 1 ? "Si" : "No";
                    cell47.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell47.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell47.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell47.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell47.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell47.Style.WrapText = true;

                    e = e + 1;
                    var cell48 = worksheet.Cells[i, e];
                    cell48.Value = nc.V_INFOMERCORRECT == 1 ? "Si" : "No";
                    cell48.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell48.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell48.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell48.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell48.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell48.Style.WrapText = true;

                    e = e + 1;

                    var cell49 = worksheet.Cells[i, e];
                    cell49.Value = nc.V_OTROSCORRECT == 1 ? "Si" : "No";
                    cell49.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell49.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell49.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell49.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell49.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell49.Style.WrapText = true;

                    e = e + 1;
                    var cell50 = worksheet.Cells[i, e];
                    fincorrectivo = e;
                    cell50.Value = nc.V_RESOLUCIONIGAFOM == 1 ? "Si" : "No";
                    cell50.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell50.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell50.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell50.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell50.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell50.Style.WrapText = true;

                    e = e + 1;
                    iniciopreventivo = e;
                    var cell51 = worksheet.Cells[i, e];
                    cell51.Value = nc.V_CARGOPREVENT == 1 ? "Si" : "No";
                    cell51.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell51.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell51.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell51.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell51.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell51.Style.WrapText = true;

                    e = e + 1;
                    var cell52 = worksheet.Cells[i, e];
                    cell52.Value = nc.V_INFORMEPREVENT == 1 ? "Si" : "No";
                    cell52.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell52.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell52.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell52.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell52.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell52.Style.WrapText = true;

                    e = e + 1;
                    var cell53 = worksheet.Cells[i, e];
                    finpreventivo = e;
                    cell53.Value = nc.V_OTROSPREVENT == 1 ? "Si" : "No";
                    cell53.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell53.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell53.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell53.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell53.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell53.Style.WrapText = true;

                    e = e + 1;
                    var cell54 = worksheet.Cells[i, e];
                    cell54.Value = nc.V_CARGOLEVSUS == 1 ? "Si" : "No";
                    cell54.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell54.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell54.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell54.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell54.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 40;
                    cell54.Style.WrapText = true;

                    e = e + 1;
                    var cell55 = worksheet.Cells[i, e];
                    cell55.Value = nc.V_CARGODECMINERA == 1 ? "Si" : "No";
                    cell55.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell55.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell55.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell55.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell55.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell55.Style.WrapText = true;

                    e = e + 1;
                    inicioformalizados = e;
                    var cell56 = worksheet.Cells[i, e];
                    cell56.Value = nc.V_CONTRATO == 1 ? "Si" : "No";
                    cell56.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell56.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell56.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell56.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell56.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell56.Style.WrapText = true;

                    e = e + 1;
                    var cell57 = worksheet.Cells[i, e];
                    cell57.Value = nc.V_RESOLUCION == 1 ? "Si" : "No";
                    cell57.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell57.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell57.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell57.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell57.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell57.Style.WrapText = true;

                    e = e + 1;
                    finformalizados = e;
                    var cell58 = worksheet.Cells[i, e];
                    cell58.Value = nc.V_OTROSDOCS == 1 ? "Si" : "No";
                    cell58.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell58.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell58.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell58.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell58.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    worksheet.Column(e).Width = 30;
                    cell58.Style.WrapText = true;

                    excel.Save();
                    i++;
                }

                ////TITULO IGAFOM CORRECTIVO
                var codiniC = Letter(iniciocorrectivo - 1);
                var codfinC = Letter(fincorrectivo - 1);
                string TitleRangeIgaf = codiniC + "3:" + codfinC + "3";
                var celltitleIgaf = worksheet.Cells[TitleRangeIgaf];
                celltitleIgaf.Merge = true;
                celltitleIgaf.Style.Font.Bold = true;
                celltitleIgaf.Style.Font.Size = 11;
                celltitleIgaf.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitleIgaf.Value = "IGAFOM CORRECTIVO";


                ////TITULO IGAFOM PREVENTIVO
                var codiniP = Letter(iniciopreventivo - 1);
                var codfinP = Letter(finpreventivo - 1);
                string TitleRangeIgafP = codiniP + "3:" + codfinP + "3";
                var celltitleIgafP = worksheet.Cells[TitleRangeIgafP];
                celltitleIgafP.Merge = true;
                celltitleIgafP.Style.Font.Bold = true;
                celltitleIgafP.Style.Font.Size = 11;
                celltitleIgafP.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitleIgafP.Value = "IGAFOM PREVENTIVO";

                // STILOS A LA CABECERA
                string HeaderRange2 = codiniC + "3:" + codfinP + "3";
                worksheet.Cells[HeaderRange2].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[HeaderRange2].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#cfecfe"));
                worksheet.Cells[HeaderRange2].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Top.Color.SetColor(Color.Black);
                worksheet.Cells[HeaderRange2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[HeaderRange2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                ////TITULO FORMALIZADO
                var codiniF = Letter(inicioformalizados - 1);
                var codfinF = Letter(finformalizados - 1);
                string TitleRangeIgafF = codiniF + "3:" + codfinF + "3";
                var celltitleIgafF = worksheet.Cells[TitleRangeIgafF];
                celltitleIgafF.Merge = true;
                celltitleIgafF.Style.Font.Bold = true;
                celltitleIgafF.Style.Font.Size = 11;
                celltitleIgafF.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitleIgafF.Value = "FORMALIZADOS";

                // STILOS A LA CABECERA
                string HeaderRange3 = codiniF + "3:" + codfinF + "3";
                worksheet.Cells[HeaderRange3].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[HeaderRange3].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#cfecaa"));
                worksheet.Cells[HeaderRange3].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange3].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange3].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange3].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange3].Style.Border.Top.Color.SetColor(Color.Black);
                worksheet.Cells[HeaderRange3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[HeaderRange3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                using (var stream = new MemoryStream())
                {
                    excel.SaveAs(stream);
                    var content = stream.ToArray();
                    //stream.Position = 0;
                    return File(content, excelContentType, "Reporte General Reinfo.xlsx");
                }
            }
        }

        public async Task<IActionResult> ExportaExcelReportes(string V_RUC, string V_PROVEEDOR, string V_CODCONSECION, string V_NOMCONSECION, string V_REALIZADOPOR, string V_REVISADOPOR, string V_FECHAREALIZADO, string V_FECHAREVISADO, string V_FECCREACION, int N_SEDES)
        {

            ReporteDTO rep = new ReporteDTO();
            rep.V_RUC = V_RUC;
            rep.V_PROVEEDOR = V_PROVEEDOR;
            rep.V_CODCONSECION = V_CODCONSECION;
            rep.V_NOMCONSECION = V_NOMCONSECION;
            rep.V_REALIZADOPOR = V_REALIZADOPOR;
            rep.V_REVISADOPOR = V_REVISADOPOR;
            rep.V_FECHAREALIZADO = V_FECHAREALIZADO;
            rep.V_FECHAREVISADO = V_FECHAREVISADO;
            rep.V_FECCREACION = V_FECCREACION;
            rep.N_SEDE = N_SEDES;
            var httpClient = await HttpClientReporte.FiltrarReporte(rep);
            //CONSEGUIR EL MAX DE VERSION
            int maxversion = httpClient.Max(x => x.N_VERSION);

            var httpUbigeo = await HttpClientUbigeo.ListaUbigeo();

            var httpClientSedes = await HttpClientSedes.ListaSedes();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            string excelContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            //var stream = new MemoryStream();
            using (ExcelPackage excel = new ExcelPackage())
            {
                excel.Workbook.Worksheets.Add("ReportesGenerados");

                // Target a worksheet
                var worksheet = excel.Workbook.Worksheets["ReportesGenerados"];
                // ANCHO DE LAS COLUMNAS
                worksheet.Column(1).Width = 18;
                worksheet.Column(2).Width = 15;
                worksheet.Column(3).Width = 20;
                worksheet.Column(4).Width = 50;
                worksheet.Column(5).Width = 20;
                worksheet.Column(6).Width = 50;
                worksheet.Column(7).Width = 30;
                worksheet.Column(8).Width = 25;
                worksheet.Column(9).Width = 25;
                worksheet.Column(10).Width = 75;
                worksheet.Column(11).Width = 30;
                worksheet.Column(12).Width = 30;
                worksheet.Column(13).Width = 20;
                worksheet.Column(14).Width = 20;
                worksheet.Column(15).Width = 20;
                worksheet.Column(16).Width = 25;
                worksheet.Column(17).Width = 25;
                worksheet.Column(18).Width = 25;
                worksheet.Column(19).Width = 40;
                worksheet.Column(20).Width = 20;
                worksheet.Column(21).Width = 20;
                worksheet.Column(22).Width = 20;
                worksheet.Column(23).Width = 15;
                worksheet.Column(24).Width = 25;
                worksheet.Column(25).Width = 20;
                worksheet.Column(26).Width = 30;
                worksheet.Column(27).Width = 20;
                worksheet.Column(28).Width = 25;
                worksheet.Column(29).Width = 20;
                worksheet.Column(30).Width = 28;
                worksheet.Column(31).Width = 29;
                worksheet.Column(32).Width = 20;
                worksheet.Column(33).Width = 45;
                worksheet.Column(34).Width = 25;
                worksheet.Column(35).Width = 25;
                worksheet.Column(36).Width = 25;
                worksheet.Column(37).Width = 30;
                worksheet.Column(38).Width = 30;
                worksheet.Column(39).Width = 30;
                worksheet.Column(40).Width = 30;
                worksheet.Column(41).Width = 400;
                worksheet.Column(42).Width = 20;
                worksheet.Column(43).Width = 30;
                worksheet.Column(44).Width = 23;
                worksheet.Column(45).Width = 23;
                worksheet.Column(46).Width = 30;
                worksheet.Column(47).Width = 23;
                worksheet.Column(48).Width = 23;
                worksheet.Column(49).Width = 30;
                worksheet.Column(50).Width = 30;
                worksheet.Column(51).Width = 23;
                worksheet.Column(52).Width = 23;
                worksheet.Column(53).Width = 23;
                worksheet.Column(54).Width = 40;
                worksheet.Column(55).Width = 30;
                worksheet.Column(56).Width = 23;
                worksheet.Column(57).Width = 23;
                worksheet.Column(58).Width = 23;


                ////TITULO GENERAL
                string TitleRange = "A2:G2";
                var celltitle = worksheet.Cells[TitleRange];
                celltitle.Merge = true;
                celltitle.Style.Font.Bold = true;
                celltitle.Style.Font.Size = 18;
                celltitle.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitle.Value = "Reportes Generados";
                ////TITULO IGAFOM CORRECTIVO
                string TitleRangeIgaf = "AU3:AX3";
                var celltitleIgaf = worksheet.Cells[TitleRangeIgaf];
                celltitleIgaf.Merge = true;
                celltitleIgaf.Style.Font.Bold = true;
                celltitleIgaf.Style.Font.Size = 11;
                celltitleIgaf.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitleIgaf.Value = "IGAFOM CORRECTIVO";
                ////TITULO IGAFOM PREVENTIVO
                string TitleRangePrev = "AY3:BA3";
                var celltitlePrev = worksheet.Cells[TitleRangePrev];
                celltitlePrev.Merge = true;
                celltitlePrev.Style.Font.Bold = true;
                celltitlePrev.Style.Font.Size = 11;
                celltitlePrev.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitlePrev.Value = "IGAFOM PREVENTIVO";
                ////TITULO FORMALIZADOS
                string TitleRangeFormalizado = "BD3:BF3";
                var celltitleForm = worksheet.Cells[TitleRangeFormalizado];
                celltitleForm.Merge = true;
                celltitleForm.Style.Font.Bold = true;
                celltitleForm.Style.Font.Size = 11;
                celltitleForm.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                celltitleForm.Value = "FORMALIZADOS";


                // CABECERA MANUAL
                var cellFamilia = worksheet.Cells["A4"];
                cellFamilia.Value = "COD REINFO";
                cellFamilia.Merge = true;

                var cellCodigo = worksheet.Cells["B4"];
                cellCodigo.Value = "VERSION";
                cellCodigo.Merge = true;

                var cellCaracteristicasTitle = worksheet.Cells["C4"];
                cellCaracteristicasTitle.Value = "DNI REALIZADO POR";
                cellCaracteristicasTitle.Merge = true;

                var cellDescripcion = worksheet.Cells["D4"];
                cellDescripcion.Value = "NOMBRE REALIZADO POR";

                var cellNomCon = worksheet.Cells["E4"];
                cellNomCon.Value = "DNI REVISADO POR";

                var cellCantIgafCorrec = worksheet.Cells["F4"];
                cellCantIgafCorrec.Value = "NOMBRE REVISADO POR";

                var cellIgafPrev = worksheet.Cells["G4"];
                cellIgafPrev.Value = "FECHA REALIZADO";

                var cellCodConce = worksheet.Cells["H4"];
                cellCodConce.Value = "FECHA REVISADO";

                var cellNomConce = worksheet.Cells["I4"];
                cellNomConce.Value = "RUC";

                var cellVersion = worksheet.Cells["J4"];
                cellVersion.Value = "PROVEEDOR";

                var cellISede = worksheet.Cells["K4"];
                cellISede.Value = "CODIGO DE CONCESION";

                var cellResulRein = worksheet.Cells["L4"];
                cellResulRein.Value = "NOMBRE DE CONCESIÓN";

                var cellTMPH = worksheet.Cells["M4"];
                cellTMPH.Value = "TMPH";

                var cellTMPS = worksheet.Cells["N4"];
                cellTMPS.Value = "TMPS";

                var cellDep = worksheet.Cells["O4"];
                cellDep.Value = "UBIGEO";
                cellDep.Merge = true;

                var cellProvincia = worksheet.Cells["P4"];
                cellProvincia.Value = "DEPARTAMENTO";
                cellProvincia.Merge = true;

                var cellCiudad = worksheet.Cells["Q4"];
                cellCiudad.Value = "PROVINCIA";
                cellCiudad.Merge = true;

                var cellNomDereMin = worksheet.Cells["R4"];
                cellNomDereMin.Value = "CIUDAD";

                var cellCodZonRei = worksheet.Cells["S4"];
                cellCodZonRei.Value = "NOMBRE DERECHO MINERO";

                var cellNorte1 = worksheet.Cells["T4"];
                cellNorte1.Value = "ZONA REINFO";

                var cellEste1 = worksheet.Cells["U4"];
                cellEste1.Value = "NORTE 1";

                var cellNorte2 = worksheet.Cells["V4"];
                cellNorte2.Value = "ESTE 1";

                var cellEste2 = worksheet.Cells["W4"];
                cellEste2.Value = "NORTE 2";

                var cellTipoAct = worksheet.Cells["X4"];
                cellTipoAct.Value = "ESTE 2";

                var cellFecRein = worksheet.Cells["Y4"];
                cellFecRein.Value = "TIPO DE ACTIVIDAD";

                var cellCompo = worksheet.Cells["Z4"];
                cellCompo.Value = "FECHA REINFO";

                var cellZonaCamp = worksheet.Cells["AA4"];
                cellZonaCamp.Value = "COMPONENTE";

                var cellNorteC = worksheet.Cells["AB4"];
                cellNorteC.Value = "CODIGO ZONA CAMPO";

                var cellEsteC = worksheet.Cells["AC4"];
                cellEsteC.Value = "NORTE C";

                var cellDifCoor = worksheet.Cells["AD4"];
                cellDifCoor.Value = "ESTE C";

                var cellDesLabor = worksheet.Cells["AE4"];
                cellDesLabor.Value = "DIFERENCIA COORDENADAS";

                var cellCantHombres = worksheet.Cells["AF4"];
                cellCantHombres.Value = "SEDE";

                var cellCantidadMujeres = worksheet.Cells["AG4"];
                cellCantidadMujeres.Value = "DESCRIPCION LABOR";

                var cellTotalTrab = worksheet.Cells["AH4"];
                cellTotalTrab.Value = "CANTIDAD HOMBRES";

                var cellIgafomCorrectivo = worksheet.Cells["AI4"];
                cellIgafomCorrectivo.Value = "CANTIDAD MUJERES";

                var cellIgaPrev = worksheet.Cells["AJ4"];
                cellIgaPrev.Value = "TOTAL TRABAJADORES";

                var cellEstadoIgaf = worksheet.Cells["AK4"];
                cellEstadoIgaf.Value = "IGAFOM CORRECTIVO";

                var cellConclu = worksheet.Cells["AL4"];
                cellConclu.Value = "IGAFOM PREVENTIVO";

                var cellProtocolo = worksheet.Cells["AM4"];
                cellProtocolo.Value = "ESTADO IGAFOM";

                var cellVersionProt = worksheet.Cells["AN4"];
                cellVersionProt.Value = "RESULTADO REINFO";

                var cellFechaReinf = worksheet.Cells["AO4"];
                cellFechaReinf.Value = "CONCLUSIÓN";

                var cellSitIngemmet = worksheet.Cells["AP4"];
                cellSitIngemmet.Value = "FECHA CREACIÓN";

                var cellSitDecMin = worksheet.Cells["AQ4"];
                cellSitDecMin.Value = "USUARIO";

                var cellCarCorrect = worksheet.Cells["AR4"];
                cellCarCorrect.Value = "ESTADO";
                cellCarCorrect.Merge = true;

                var cellInfCorrec = worksheet.Cells["AS4"];
                cellInfCorrec.Value = "SITUACION INGEMMET";
                cellInfCorrec.Merge = true;

                var cellResolIgafom = worksheet.Cells["AT4"];
                cellResolIgafom.Value = "SITUACION DECLARACIÓN MINERA";
                cellResolIgafom.Merge = true;

                var cellCarPrev = worksheet.Cells["AU4"];
                cellCarPrev.Value = "CARGO";
                cellCarPrev.Merge = true;

                var cellInfPrev = worksheet.Cells["AV4"];
                cellInfPrev.Value = "INFORME";
                cellInfPrev.Merge = true;

                var cellLevSus = worksheet.Cells["AW4"];
                cellLevSus.Value = "OTROS";
                cellLevSus.Merge = true;

                var cellCargDecMin = worksheet.Cells["AX4"];
                cellCargDecMin.Value = "RESOLUCION IGAFOM";
                cellCargDecMin.Merge = true;

                var cellCargoPrev = worksheet.Cells["AY4"];
                cellCargoPrev.Value = "CARGO";
                cellCargoPrev.Merge = true;

                var cellContrato = worksheet.Cells["AZ4"];
                cellContrato.Value = "INFORME";

                var cellResolu = worksheet.Cells["BA4"];
                cellResolu.Value = "OTROS";

                var cellOtrosDocs = worksheet.Cells["BB4"];
                cellOtrosDocs.Value = "CARGO LEVANTAMIENTO DE SUSPENSIÓN";

                var cellCargDec = worksheet.Cells["BC4"];
                cellCargDec.Value = "CARGO DECLARACIÓN MINERA";

                var cellContra = worksheet.Cells["BD4"];
                cellContra.Value = "CONTRATO";

                var cellRes = worksheet.Cells["BE4"];
                cellRes.Value = "RESOLUCIÓN";

                var cellOtros = worksheet.Cells["BF4"];
                cellOtros.Value = "OTROS";


                // STILOS A LA CABECERA
                string HeaderRange = "A4:BF4";
                worksheet.Cells[HeaderRange].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[HeaderRange].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#cfecfe"));
                worksheet.Cells[HeaderRange].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange].Style.Border.Top.Color.SetColor(Color.Black);
                worksheet.Cells[HeaderRange].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[HeaderRange].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                // STILOS A LA CABECERA
                string HeaderRange2 = "AU3:BA3";
                worksheet.Cells[HeaderRange2].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[HeaderRange2].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#cfecfe"));
                worksheet.Cells[HeaderRange2].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange2].Style.Border.Top.Color.SetColor(Color.Black);
                worksheet.Cells[HeaderRange2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[HeaderRange2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                // STILOS A LA CABECERA
                string HeaderRange3 = "BD3:BF3";
                worksheet.Cells[HeaderRange3].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[HeaderRange3].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#cfecfe"));
                worksheet.Cells[HeaderRange3].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange3].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange3].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange3].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[HeaderRange3].Style.Border.Top.Color.SetColor(Color.Black);
                worksheet.Cells[HeaderRange3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[HeaderRange3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                int i = 5;
                foreach (ReporteDTO dat in httpClient)
                {
                    var cell1 = worksheet.Cells[i, 1];
                    cell1.Value = dat.N_CODREIN;
                    cell1.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell1.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell1.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell1.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell1.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell1.Style.WrapText = true;

                    var cell2 = worksheet.Cells[i, 2];
                    cell2.Value = dat.N_VERSION;
                    cell2.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell2.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell2.Style.WrapText = true;

                    var cell3 = worksheet.Cells[i, 3];
                    cell3.Value = dat.V_REALIZADOPOR;
                    cell3.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell3.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell3.Style.WrapText = true;

                    var cell4 = worksheet.Cells[i, 4];
                    cell4.Value = dat.NOMBRE_REALIZADOPOR;
                    cell4.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell4.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell4.Style.WrapText = true;


                    var cell5 = worksheet.Cells[i, 5];
                    cell5.Value = dat.V_REVISADOPOR;
                    cell5.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell5.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell5.Style.WrapText = true;

                    var cell6 = worksheet.Cells[i, 6];
                    cell6.Value = dat.NOMBRE_REVISADOPOR;
                    cell6.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell6.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell6.Style.WrapText = true;

                    var cell7 = worksheet.Cells[i, 7];
                    cell7.Value = dat.V_FECHAREALIZADO;
                    cell7.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell7.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell7.Style.WrapText = true;


                    var cell8 = worksheet.Cells[i, 8];
                    cell8.Value = dat.V_FECHAREVISADO;
                    cell8.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell8.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell8.Style.WrapText = true;


                    var cell9 = worksheet.Cells[i, 9];
                    cell9.Value = dat.V_RUC;
                    cell9.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell9.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell9.Style.WrapText = true;

                    var cell10 = worksheet.Cells[i, 10];
                    cell10.Value = dat.V_PROVEEDOR;
                    cell10.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell10.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell10.Style.WrapText = true;


                    var cell11 = worksheet.Cells[i, 11];
                    cell11.Value = dat.V_CODCONSECION;
                    cell11.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell11.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell11.Style.WrapText = true;

                    var cell12 = worksheet.Cells[i, 12];
                    cell12.Value = dat.V_NOMCONSECION;
                    cell12.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell12.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell12.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell12.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell12.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell12.Style.WrapText = true;


                    var cell13 = worksheet.Cells[i, 13];
                    cell13.Value = dat.N_TMPH == 0 ? "" : dat.N_TMPH;
                    cell13.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell13.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell13.Style.WrapText = true;

                    var cell14 = worksheet.Cells[i, 14];
                    cell14.Value = dat.N_TMPS == 0 ? "" : dat.N_TMPS;
                    cell14.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell14.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell14.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell14.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell14.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell14.Style.WrapText = true;


                    var cell15 = worksheet.Cells[i, 15];
                    cell15.Value = dat.V_UBIGEO;
                    cell15.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell15.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell15.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell15.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell15.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell15.Style.WrapText = true;

                    var cell16 = worksheet.Cells[i, 16];
                    if (dat.V_UBIGEO.Length == 6)
                    {
                        var Departamento = dat.V_UBIGEO.Substring(0, 2) + "0000";
                        cell16.Value = httpUbigeo.Find(x => x.V_UBIGEO == Departamento).V_DEP;
                        cell16.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                        cell16.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        cell16.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                        cell16.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        cell16.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                        cell16.Style.WrapText = true;
                    }

                    var cell17 = worksheet.Cells[i, 17];
                    if (dat.V_UBIGEO.Length == 6)
                    {
                        var Ciudad = dat.V_UBIGEO.Substring(0, 4) + "00";
                        cell17.Value = httpUbigeo.Find(x => x.V_UBIGEO == Ciudad).V_PROV;
                        cell17.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                        cell17.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        cell17.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                        cell17.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        cell17.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                        cell17.Style.WrapText = true;
                    }

                    var cell18 = worksheet.Cells[i, 18];
                    if (dat.V_UBIGEO.Length == 6)
                    {
                        var Distrito = dat.V_UBIGEO;
                        cell18.Value = httpUbigeo.Find(x => x.V_UBIGEO == Distrito).V_DIST;
                        cell18.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                        cell18.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        cell18.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                        cell18.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        cell18.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                        cell18.Style.WrapText = true;
                    }

                    var cell19 = worksheet.Cells[i, 19];
                    cell19.Value = dat.V_NOMDERECHMINE;
                    cell19.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell19.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell19.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell19.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell19.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell19.Style.WrapText = true;

                    var cell20 = worksheet.Cells[i, 20];
                    cell20.Value = dat.V_CODZONAREI;
                    cell20.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell20.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell20.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell20.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell20.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell20.Style.WrapText = true;

                    var cell21 = worksheet.Cells[i, 21];

                    cell21.Value = dat.N_NORTE1 == 0 ? "" : dat.N_NORTE1;
                    cell21.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell21.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell21.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell21.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell21.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell21.Style.WrapText = true;

                    var cell22 = worksheet.Cells[i, 22];
                    cell22.Value = dat.N_ESTE1 == 0 ? "" : dat.N_ESTE1;
                    cell22.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell22.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell22.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell22.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell22.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell22.Style.WrapText = true;

                    var cell23 = worksheet.Cells[i, 23];
                    cell23.Value = dat.N_NORTE2 == 0 ? "" : dat.N_NORTE2;
                    cell23.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell23.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell23.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell23.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell23.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell23.Style.WrapText = true;

                    var cell24 = worksheet.Cells[i, 24];
                    cell24.Value = dat.N_ESTE2 == 0 ? "" : dat.N_ESTE2;
                    cell24.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell24.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell24.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell24.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell24.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell24.Style.WrapText = true;

                    var cell25 = worksheet.Cells[i, 25];
                    cell25.Value = dat.v_CODTIPOACT;
                    cell25.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell25.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell25.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell25.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell25.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell25.Style.WrapText = true;

                    var cell26 = worksheet.Cells[i, 26];
                    cell26.Value = dat.V_FECREINFO;
                    cell26.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell26.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell26.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell26.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell26.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell26.Style.WrapText = true;

                    var cell27 = worksheet.Cells[i, 27];
                    cell27.Value = dat.V_COMPONENT;
                    cell27.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell27.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell27.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell27.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell27.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell27.Style.WrapText = true;

                    var cell28 = worksheet.Cells[i, 28];
                    cell28.Value = dat.v_CODZONACAMP;
                    cell28.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell28.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell28.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell28.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell28.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell28.Style.WrapText = true;

                    var cell29 = worksheet.Cells[i, 29];
                    cell29.Value = dat.N_NORTEC == 0 ? "" : dat.N_NORTEC;
                    cell29.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell29.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell29.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell29.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell29.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell29.Style.WrapText = true;

                    var cell30 = worksheet.Cells[i, 30];

                    cell30.Value = dat.N_ESTEC == 0 ? "" : dat.N_ESTEC;
                    cell30.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell30.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell30.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell30.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell30.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell30.Style.WrapText = true;

                    var cell31 = worksheet.Cells[i, 31];
                    cell31.Value = dat.N_DIFCORDE;
                    cell31.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell31.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell31.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell31.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell31.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell31.Style.WrapText = true;

                    var cell32 = worksheet.Cells[i, 32];
                    var sede = dat.N_SEDE;
                    cell32.Value = httpClientSedes.Find(x => x.N_CODSEDE == sede).V_NOMSEDE;
                    cell32.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell32.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell32.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell32.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell32.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell32.Style.WrapText = true;


                    var cell33 = worksheet.Cells[i, 33];
                    cell33.Value = dat.V_DESCRILABOR;
                    cell33.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell33.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell33.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell33.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell33.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell33.Style.WrapText = true;

                    var cell34 = worksheet.Cells[i, 34];
                    cell34.Value = dat.N_CANTHOMBRE;
                    cell34.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell34.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell34.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell34.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell34.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell34.Style.WrapText = true;

                    var cell35 = worksheet.Cells[i, 35];
                    cell35.Value = dat.N_CANTMUJE;
                    cell35.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell35.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell35.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell35.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell35.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell35.Style.WrapText = true;


                    var cell36 = worksheet.Cells[i, 36];
                    cell36.Value = dat.N_TOTALTRAB;
                    cell36.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell36.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell36.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell36.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell36.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell36.Style.WrapText = true;



                    var cell37 = worksheet.Cells[i, 37];
                    cell37.Value = dat.V_IGAFOMCORREC;
                    cell37.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell37.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell37.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell37.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell37.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell37.Style.WrapText = true;

                    var cell38 = worksheet.Cells[i, 38];
                    cell38.Value = dat.V_IGAFOMPREV;
                    cell38.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell38.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell38.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell38.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell38.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell38.Style.WrapText = true;

                    var cell39 = worksheet.Cells[i, 39];
                    cell39.Value = dat.V_ESTADOIGAFOM;
                    cell39.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell39.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell39.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell39.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell39.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell39.Style.WrapText = true;


                    var cell40 = worksheet.Cells[i, 40];
                    cell40.Value = dat.V_RESULTADOS;
                    cell40.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell40.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell40.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell40.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell40.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell40.Style.WrapText = true;


                    var cell41 = worksheet.Cells[i, 41];
                    cell41.Value = dat.V_CONCLUSION;
                    cell41.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell41.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell41.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell41.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell41.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell41.Style.WrapText = true;


                    var cell42 = worksheet.Cells[i, 42];
                    cell42.Value = dat.V_FECCREACION;
                    cell42.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell42.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell42.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell42.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell42.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell42.Style.WrapText = true;

                    var cell43 = worksheet.Cells[i, 43];
                    cell43.Value = dat.V_USUREGISTRO;
                    cell43.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell43.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell43.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell43.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell43.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell43.Style.WrapText = true;


                    var cell44 = worksheet.Cells[i, 44];
                    if (dat.V_ESTADO == "A")
                    {
                        cell44.Value = "Activo";
                    }
                    cell44.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell44.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell44.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell44.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell44.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell44.Style.WrapText = true;


                    var cell45 = worksheet.Cells[i, 45];
                    cell45.Value = dat.V_SITUACIONINGEMMET;
                    cell45.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell45.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell45.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell45.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell45.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell45.Style.WrapText = true;


                    var cell46 = worksheet.Cells[i, 46];
                    cell46.Value = dat.V_SITACIONDECMINERA;
                    cell46.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell46.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell46.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell46.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell46.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell46.Style.WrapText = true;


                    var cell47 = worksheet.Cells[i, 47];
                    cell47.Value = dat.V_CARGOCORRECT == 1 ? "Si" : "No";
                    cell47.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell47.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell47.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell47.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell47.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell47.Style.WrapText = true;

                    var cell48 = worksheet.Cells[i, 48];
                    cell48.Value = dat.V_INFOMERCORRECT == 1 ? "Si" : "No";
                    cell48.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell48.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell48.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell48.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell48.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell48.Style.WrapText = true;

                    var cell49 = worksheet.Cells[i, 49];
                    cell49.Value = dat.V_OTROSCORRECT == 1 ? "Si" : "No";
                    cell49.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell49.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell49.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell49.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell49.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell49.Style.WrapText = true;

                    var cell50 = worksheet.Cells[i, 50];
                    cell50.Value = dat.V_RESOLUCIONIGAFOM == 1 ? "Si" : "No";
                    cell50.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell50.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell50.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell50.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell50.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell50.Style.WrapText = true;

                    var cell51 = worksheet.Cells[i, 51];
                    cell51.Value = dat.V_CARGOPREVENT == 1 ? "Si" : "No";
                    cell51.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell51.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell51.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell51.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell51.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell51.Style.WrapText = true;

                    var cell52 = worksheet.Cells[i, 52];
                    cell52.Value = dat.V_INFORMEPREVENT == 1 ? "Si" : "No";
                    cell52.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell52.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell52.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell52.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell52.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell52.Style.WrapText = true;

                    var cell53 = worksheet.Cells[i, 53];
                    cell53.Value = dat.V_OTROSPREVENT == 1 ? "Si" : "No";
                    cell53.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell53.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell53.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell53.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell53.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell53.Style.WrapText = true;


                    var cell54 = worksheet.Cells[i, 54];
                    cell54.Value = dat.V_CARGOLEVSUS == 1 ? "Si" : "No";
                    cell54.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell54.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell54.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell54.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell54.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell54.Style.WrapText = true;

                    var cell55 = worksheet.Cells[i, 55];
                    cell55.Value = dat.V_CARGODECMINERA == 1 ? "Si" : "No";
                    cell55.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell55.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell55.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell55.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell55.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell55.Style.WrapText = true;

                    var cell56 = worksheet.Cells[i, 56];
                    cell56.Value = dat.V_CONTRATO == 1 ? "Si" : "No";
                    cell56.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell56.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell56.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell56.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell56.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell56.Style.WrapText = true;

                    var cell57 = worksheet.Cells[i, 57];
                    cell57.Value = dat.V_RESOLUCION == 1 ? "Si" : "No";
                    cell57.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell57.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell57.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell57.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell57.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell57.Style.WrapText = true;

                    var cell58 = worksheet.Cells[i, 58];
                    cell58.Value = dat.V_OTROSDOCS == 1 ? "Si" : "No";
                    cell58.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    cell58.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    cell58.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    cell58.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    cell58.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    cell58.Style.WrapText = true;

                    excel.Save();
                    i++;
                }
                using (var stream = new MemoryStream())
                {
                    excel.SaveAs(stream);
                    var content = stream.ToArray();
                    return File(content, excelContentType, "Reporte Historico.xlsx");
                }
            }
        }

        #endregion
        public IActionResult Privacy()
        {
            return View();
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        //CONVIERTE DE LETRAS A NUMEROS EJEM:  A=1 B=2 C=3.... 
        public string Letter(int intCol)
        {
            int intFirstLetter = ((intCol) / 676) + 64;
            int intSecondLetter = ((intCol % 676) / 26) + 64;
            int intThirdLetter = (intCol % 26) + 65;
            char FirstLetter = (intFirstLetter > 64) ? (char)intFirstLetter : ' ';
            char SecondLetter = (intSecondLetter > 64) ? (char)intSecondLetter : ' ';
            char ThirdLetter = (char)intThirdLetter;

            return string.Concat(FirstLetter, SecondLetter, ThirdLetter).Trim();
        }
        //public JsonResult ValidaSesion()
        //{
        //    UsuarioLogin userlogin = HttpContext.Session.GetComplexData<UsuarioLogin>("usuario_login");
        //    Respuesta res = new Respuesta();
        //    if (userlogin == null)
        //    {
        //        res.cod_ret_out = -1;
        //        res.VMensaje = "Se ha perdido la Sesion, inicie nuevamente.";
        //        res.msg_ope_out = JsonHelper.GetSection("UriGeneral");
        //    }
        //    else
        //    {
        //        res.cod_ret_out = 1;
        //        res.VMensaje = "OK";
        //    }
        //    return Json(res);
        //}
    }
}
