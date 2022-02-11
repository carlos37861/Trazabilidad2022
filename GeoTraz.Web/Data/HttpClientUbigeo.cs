using Common.Identity.Entities;
using General.Entities;
using GeoTraz.Web.Helpers;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoTraz.Web.Data
{
    public class HttpClientUbigeo
    {
        public static async Task<List<Ubigeo>> ListaUbigeo()
        {
            var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
            var request = new RestRequest("/Ubigeo/ListUbigeo/",Method.GET)
            .AddHeader("Authorization", "Bearer " + AuthToken.Token);
            IRestResponse response = await client.ExecuteTaskAsync(request);
            var content = response.Content;
            ResponseModel o = JsonConvert.DeserializeObject<ResponseModel>(content);
            return JsonConvert.DeserializeObject<List<Ubigeo>>
            (o.result.ToString());
        }
    } 
}
