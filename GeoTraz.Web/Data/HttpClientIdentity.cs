using Common.Identity.Entities;
using General.Entities;
using GeoTraz.Common.Entities;
using GeoTraz.Web.Helpers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace GeoTraz.Web.Data
{
    public class HttpClientIdentity
    {
        public static string GetTokenClient(string uniqueID, string token)
        {
            var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
            var request = new RestRequest("/token/ClientAuth/", Method.POST);
            JObject jObjectbody = new JObject();
            jObjectbody.Add("UniqueID", uniqueID);
            jObjectbody.Add("Token", token);
            request.AddParameter("application/json", jObjectbody,
            ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            if ((int)response.StatusCode == 200)
            {
                var jObject = JObject.Parse(response.Content);
                string oToken = jObject.GetValue("token").ToString();
                return oToken.ToString();
            }
            else return null;
        }
        public static WStation GetWStation(string uniqueID)
        {
            var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
            var request = new RestRequest("/equipo/Authenticate/", Method.GET)
            .AddHeader("Authorization", "Bearer " + AuthToken.Token);
            request.AddParameter("id", uniqueID);
            IRestResponse response = client.Execute(request);
            var content = response.Content;
            ResponseModel o = JsonConvert.DeserializeObject<ResponseModel>
            (content);
            return JsonConvert.DeserializeObject<WStation>(o.result.ToString());
        }
        public static Usuario LoginUsuario(string login, string pass, string app)
        {
            try
            {
                var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
                var request = new RestRequest("/usuario/UserLogin/", Method.POST)
                .AddHeader("Authorization", "Bearer " + AuthToken.Token);
                JObject jObjectbody = new JObject();
                jObjectbody.Add("Username", login);
                jObjectbody.Add("Password", pass);
                jObjectbody.Add("App", app);
                request.AddParameter("application/json", jObjectbody,
                ParameterType.RequestBody);

                IRestResponse response = client.Execute(request);
                var content = response.Content;

                ResponseModel o = JsonConvert.DeserializeObject<ResponseModel>
                (content);
                if (o.success)
                {
                    if (o.result == null) return null;

                    return JsonConvert.DeserializeObject<Usuario>(o.result.ToString());
                }
                else return null;
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }
        public static string ValidateRolWStation(string uniqueID, string rol)
        {
            var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
            var request = new RestRequest("/equipo/VerificaRolWS/", Method.GET)
            .AddHeader("Authorization", "Bearer " + AuthToken.Token);
            request.AddParameter("idWStation", uniqueID);
            request.AddParameter("idrol", rol);
            IRestResponse response = client.Execute(request);
            var content = response.Content;
            ResponseModel o = JsonConvert.DeserializeObject<ResponseModel>
            (content);

            return o.result.ToString();
        }
        public static List<RutaPadre> GetUserMenuRol(string userId, string rol)
        {
            ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;
            var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
            // var request = new RestRequest("/usuario/GetUserMenuRol/", Method.GET)
            var request = new RestRequest("/Ruta/GetUserMenuRol/", Method.GET)
             .AddHeader("Authorization", "Bearer " + AuthToken.Token);
            request.AddParameter("login", userId);
            request.AddParameter("idrol", rol);
            IRestResponse response = client.Execute(request);
            var content = response.Content;

            ResponseModel o = JsonConvert.DeserializeObject<ResponseModel>
            (content);
            if (o.success)
            {
                if (o.result == null) return null;

                return JsonConvert.DeserializeObject<List<RutaPadre>>
                (o.result.ToString());
            }
            else return null;
        }

        public static List<Ruta> GetUserMenuGeneral(int app)
        {
            var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
            var request = new RestRequest("/usuario/GetUserMenuGeneral/",
            Method.GET)
            .AddHeader("Authorization", "Bearer " + AuthToken.Token);
            request.AddParameter("app", app);
            IRestResponse response = client.Execute(request);
            var content = response.Content;
            ResponseModel o = JsonConvert.DeserializeObject<ResponseModel>
            (content);
            if (o.success)
            {
                if (o.result == null) return null;
                return JsonConvert.DeserializeObject<List<Ruta>>
                (o.result.ToString());
            }
            else return null;
        }
    }
}
