using Common.Identity.Entities;
using GeoTraz.Common.Models;
using GeoTraz.Web.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Web.Data
{
    public class HttpClientDeclaracionMinera
    {
        public static async Task<int> AgregarDeclaracionMinera(DeclaracionMineraDTO oDeclaracion)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "DeclaracionMinera/add-declaracionminera";
            List<DeclaracionMineraDTO> dataResult = new List<DeclaracionMineraDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(oDeclaracion);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                //dataResult = JsonConvert.DeserializeObject<List<ReinfoDTO>>(data);
                return Convert.ToInt32(data);
            }

            return 0;

        }

        public static async Task<List<DeclaracionMineraDTO>> ValidaDeclaracionMinera(DeclaracionMineraDTO declaracion)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "DeclaracionMinera/valida-declaracionminera";
            List<DeclaracionMineraDTO> dataResult = new List<DeclaracionMineraDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(declaracion);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<DeclaracionMineraDTO>>(data);
            }

            return dataResult;


        }

        public static async Task<int> EditarDeclaracionMinera(DeclaracionMineraDTO declaracion)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "DeclaracionMinera/update-declaracionminera";
            List<DeclaracionMineraDTO> dataResult = new List<DeclaracionMineraDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(declaracion);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                //dataResult = JsonConvert.DeserializeObject<List<ReinfoDTO>>(data);
                return Convert.ToInt32(data);
            }

            return 0;

        }
    }
}
