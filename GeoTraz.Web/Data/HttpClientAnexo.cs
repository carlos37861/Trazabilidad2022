using Common.Identity.Entities;
using General.Entities;
using General.Entities.ViewModel;
using GeoTraz.Common.Entities;
using GeoTraz.Web.Helpers;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoTraz.Web.Data
{
    public class HttpClientAnexo
    {
        
        public static async Task<Anexo> GetAnexo(string codAnexo, string tipo)
        {
            try
            {
                var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
                var request = new RestRequest("/Anexo/GetAnexo/", Method.GET)
                .AddHeader("Authorization", "Bearer " + AuthToken.Token);
                request.AddParameter("codanexo", codAnexo);
                request.AddParameter("tipo", tipo);
                IRestResponse response = await client.ExecuteTaskAsync(request);
                var content = response.Content;

                ResponseModel o = JsonConvert.DeserializeObject<ResponseModel>
                (content);
                if (o.result != null)
                {
                    return JsonConvert.DeserializeObject<Anexo>(o.result.ToString());
                }
                Anexo anexo = new Anexo();
                return anexo;
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }

        }
        public static async Task<List<Anexo>> ListAnexosFilter(string empresa, string sede, string tipo, string criterio)
        {
            try
            {
                var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
                var request = new RestRequest("/Anexo/GetAnexosFilter/", Method.GET)
                .AddHeader("Authorization", "Bearer " + AuthToken.Token);
                request.AddParameter("empresa", empresa);
                request.AddParameter("sede", sede);
                request.AddParameter("tipo", tipo);
                request.AddParameter("criterio", criterio);
                IRestResponse response = await client.ExecuteTaskAsync(request);
                var content = response.Content;

                ResponseModel o = JsonConvert.DeserializeObject<ResponseModel>
                (content);
                return JsonConvert.DeserializeObject<List<Anexo>>(o.result.ToString
                ());
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }


        }
        public static async Task<ResponseModel> InsertAnexo(Anexo oAnexo)
        {
            try
            {
                var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
                var request = new RestRequest("/Anexo/InsertAnexo/", Method.POST)
                .AddHeader("Authorization", "Bearer " + AuthToken.Token);
                request.AddParameter("application/json", JsonConvert.SerializeObject
                (oAnexo), ParameterType.RequestBody);
                request.RequestFormat = DataFormat.Json;
                IRestResponse response = await client.ExecuteTaskAsync(request);
                var content = response.Content;
                return JsonConvert.DeserializeObject<ResponseModel>(content);
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }

        }
        public static async Task<ResponseModel> UpdateAnexo(Anexo oAnexo)
        {
            try
            {
                AuthToken.Token = HttpClientIdentity.GetTokenClient("xOpyt0J7HSAqs5X", "OLktEtciYxJxN2R");
                var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
                var request = new RestRequest("/Anexo/EditAnexo/", Method.POST)
                .AddHeader("Authorization", "Bearer " + AuthToken.Token);
                request.AddParameter("application/json", JsonConvert.SerializeObject
                (oAnexo), ParameterType.RequestBody);
                request.RequestFormat = DataFormat.Json;
                IRestResponse response = await client.ExecuteTaskAsync(request);
                var content = response.Content;
                return JsonConvert.DeserializeObject<ResponseModel>(content);
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }

        public static async Task<ResponseModel> DeleteAnexo(string codigo, string tipo)
        {
            try
            {
                var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
                var request = new RestRequest("/Anexo/DeleteAnexo/", Method.POST)
                .AddHeader("Authorization", "Bearer " + AuthToken.Token);
                request.AddParameter("tipo", codigo);
                request.AddParameter("criterio", tipo);
                IRestResponse response = await client.ExecuteTaskAsync(request);
                var content = response.Content;
                return JsonConvert.DeserializeObject<ResponseModel>(content);
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }

        public static async Task<ResponseModel> InsertRepLegal(RepresentanteLegalDTO oAnexo)
        {
            try
            {
                var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
                var request = new RestRequest("/Anexo/InsertRepLegal/", Method.POST)
                .AddHeader("Authorization", "Bearer " + AuthToken.Token);
                request.AddParameter("application/json", JsonConvert.SerializeObject
                (oAnexo), ParameterType.RequestBody);
                request.RequestFormat = DataFormat.Json;
                IRestResponse response = await client.ExecuteTaskAsync(request);
                var content = response.Content;
                return JsonConvert.DeserializeObject<ResponseModel>(content);
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }

        public static async Task<ResponseModel> UpdateRepLegal(RepresentanteLegalDTO oAnexo)
        {
            try
            {
                var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
                var request = new RestRequest("/Anexo/EditRepLegal/", Method.POST)
                .AddHeader("Authorization", "Bearer " + AuthToken.Token);
                request.AddParameter("application/json", JsonConvert.SerializeObject
                (oAnexo), ParameterType.RequestBody);
                request.RequestFormat = DataFormat.Json;
                IRestResponse response = await client.ExecuteTaskAsync(request);
                var content = response.Content;
                return JsonConvert.DeserializeObject<ResponseModel>(content);
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }

        }

        public static async Task<List<RepresentanteLegalDTO>> ListRepLegales(string codAnexo,string tipo)
        {
            try
            {
                var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
                var request = new RestRequest("/Anexo/ListRepLegales/", Method.GET)
                .AddHeader("Authorization", "Bearer " + AuthToken.Token);
                request.AddParameter("codAnexo", codAnexo);
                request.AddParameter("tipo", tipo);
                IRestResponse response = await client.ExecuteTaskAsync(request);
                var content = response.Content;
                ResponseModel o = JsonConvert.DeserializeObject<ResponseModel>
                (content);
                return JsonConvert.DeserializeObject<List<RepresentanteLegalDTO>>(o.result.ToString());
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }
    }
}
