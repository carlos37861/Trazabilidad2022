using Common.Identity.Entities;
using General.Entities;
using GeoTraz.Common.Models;
using GeoTraz.Web.Helpers;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Web.Data
{
    public class HttpClientFirmantes
    {

        //public static async Task<List<FirmantesDTO>> ListaFirmantes(FirmantesDTO firmantes)
        //{
        //    try
        //    {
        //        HttpClientHandler clientHandler = new HttpClientHandler();
        //        clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
        //        HttpClient _httpClient = new HttpClient(clientHandler);
        //        String UriGeneral = JsonHelper.GetSection("UriGeneral") + "Firmantes/lista-firmantes";
        //        List<FirmantesDTO> dataResult = new List<FirmantesDTO>();
        //        string _TOKEN = AuthToken.Token;
        //        if (_TOKEN == null)
        //        {
        //            _TOKEN = "";
        //        }
        //        if (!_TOKEN.Equals(""))
        //        {
        //            _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
        //        }
        //        string dataJson = JsonConvert.SerializeObject(firmantes);
        //        StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
        //        HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
        //        if (response.IsSuccessStatusCode)
        //        {
        //            var data = await response.Content.ReadAsStringAsync();
        //            dataResult = JsonConvert.DeserializeObject<List<FirmantesDTO>>(data);
        //        }
        //        return dataResult;
        //    }
        //    catch (Exception ex)
        //    {

        //        throw new ArgumentOutOfRangeException("error", ex);
        //    }

        //}

        public static async Task<List<FirmantesDTO>> ListaFirmantes(string V_DNI)
        {
            try
            {
                ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;
                var client = new RestClient(JsonHelper.GetSection("UriGeneral"));
                var request = new RestRequest("/Firmantes/lista-firmantes/", Method.GET)
                .AddHeader("Authorization", "Bearer " + AuthToken.Token);
                request.AddParameter("V_DNI", V_DNI);

                IRestResponse response = await client.ExecuteTaskAsync(request);
                var content = response.Content;
                ResponseModel o = JsonConvert.DeserializeObject<ResponseModel>
                (content);
                return JsonConvert.DeserializeObject<List<FirmantesDTO>>(o.result.ToString
                ());
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }

        }
    }
}
