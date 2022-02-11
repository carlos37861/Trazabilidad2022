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
    public class HttpClientSedes
    {
        public static async Task<List<Sucursal>> ListaSedes()
        {
            var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
            var request = new RestRequest("/Sucursal/Sucursales/", Method.GET)

            .AddHeader("Authorization", "Bearer " + AuthToken.Token);
            IRestResponse response = await client.ExecuteTaskAsync(request);
            var content = response.Content;

            ResponseModel o = JsonConvert.DeserializeObject<ResponseModel>
            (content);
            return JsonConvert.DeserializeObject<List<Sucursal>>
            (o.result.ToString());

        }
    }
}
