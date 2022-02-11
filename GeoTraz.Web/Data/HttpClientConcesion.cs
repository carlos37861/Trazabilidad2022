using Common.Identity.Entities;
using General.Entities;
using GeoTraz.Common.Entities;
using GeoTraz.Common.Models;
using GeoTraz.Web.Helpers;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoTraz.Web.Data
{
    public class HttpClientConcesion
    {
        public static async Task<List<Concesion>> ListConcesiones(string estado, string nombres, string sede)
        {
            try
            {
                var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
                var request = new RestRequest("/Concesion/ListConcesiones/", Method.GET)
                .AddHeader("Authorization", "Bearer " + AuthToken.Token);
                request.AddParameter("estado", estado);
                request.AddParameter("nombres", nombres);
                request.AddParameter("sede", sede);
                IRestResponse response = await client.ExecuteTaskAsync(request);
                var content = response.Content;

                ResponseModel o = JsonConvert.DeserializeObject<ResponseModel>
                (content);
                return JsonConvert.DeserializeObject<List<Concesion>>(o.result.ToString
                ());
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }
        public static async Task<Concesion> GetConcesion(string codConcesion)
        {
            try
            {
                var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
                var request = new RestRequest("/Concesion/GetConcesion/", Method.GET)
                .AddHeader("Authorization", "Bearer " + AuthToken.Token);
                request.AddParameter("codConcesion", codConcesion);
                IRestResponse response = await client.ExecuteTaskAsync(request);
                var content = response.Content;

                ResponseModel o = JsonConvert.DeserializeObject<ResponseModel>
                (content);
                if (o.result != null)
                {
                    return JsonConvert.DeserializeObject<Concesion>(o.result.ToString());
                }
                Concesion concesion = new Concesion();
                return concesion;
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }


        public static async Task<ResponseModel> InsertConcesion(Concesion oConcesion)
        {
            try
            {
                var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
                var request = new RestRequest("/Concesion/InsertConcesion/", Method.POST)
                .AddHeader("Authorization", "Bearer " + AuthToken.Token);
                request.AddParameter("application/json", JsonConvert.SerializeObject
                (oConcesion), ParameterType.RequestBody);
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

        public static async Task<ResponseModel> UpdateConcesion(Concesion oConcesion)
        {
            try
            {
                var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
                var request = new RestRequest("/Concesion/UpdateConcesion/", Method.POST)
                .AddHeader("Authorization", "Bearer " + AuthToken.Token);
                request.AddParameter("application/json", JsonConvert.SerializeObject
                (oConcesion), ParameterType.RequestBody);
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
    }
}
