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
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Web.Data
{
    public class HttpClientReinfo
    {
        public static async Task<List<ReinfoDTO>> ListaReinfo()
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
           clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            string UriGeneral = JsonHelper.GetSection("UriPrueba") + "Reinfo/lista-reinfo";
            List<ReinfoDTO> dataResult = new List<ReinfoDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }

            HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<ReinfoDTO>>(data);
            }
            return dataResult;


        }



        public static async Task<List<ReinfoDTO>> BuscarIdReinfo(ReinfoDTO reinfo)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Reinfo/busca-reinfo";
            List<ReinfoDTO> dataResult = new List<ReinfoDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(reinfo);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<ReinfoDTO>>(data);
            }

            return dataResult;



        }


        public static async Task<List<ReinfoDTO>> BuscarReinfo(ReinfoDTO reinfo)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Reinfo/busca-reinfo-edit";
            List<ReinfoDTO> dataResult = new List<ReinfoDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = ""; 
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(reinfo);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<ReinfoDTO>>(data);
            }

            return dataResult;


        }


        public static async Task<List<ReinfoDTO>> FiltrarReinfo(ReinfoDTO reinfo)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Reinfo/filtrar-reinfo";
            List<ReinfoDTO> dataResult = new List<ReinfoDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(reinfo);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<ReinfoDTO>>(data);
            }
            return dataResult;
        }


        public static async Task<List<ReinfoDTO>> FiltrarReinfoGrafico(ReinfoDTO reinfo)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Reinfo/filtrar-reinfografico";
            List<ReinfoDTO> dataResult = new List<ReinfoDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(reinfo);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<ReinfoDTO>>(data);
            }
            return dataResult;
        }

        public static async Task<List<ReinfoDTO>> FiltrarDeclaracionGrafico(ReinfoDTO reinfo)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Reinfo/filtrar-declaraciongrafico";
            List<ReinfoDTO> dataResult = new List<ReinfoDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(reinfo);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<ReinfoDTO>>(data);
            }
            return dataResult;
        }
        
        public static async Task<List<ReinfoDTO>> ValidaReinfo(ReinfoDTO reinfo)
        {
            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Reinfo/valida-reinfo";
            List<ReinfoDTO> dataResult = new List<ReinfoDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(reinfo);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<ReinfoDTO>>(data);
            }
            return dataResult;
        }
        public static async Task<int> AgregarReinfo(ReinfoDTO oReinfo)
        {
            try
            {
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
                HttpClient _httpClient = new HttpClient(clientHandler);
                String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Reinfo/add-reinfo";
                List<ReinfoDTO> dataResult = new List<ReinfoDTO>();
                string _TOKEN = AuthToken.Token;
                if (_TOKEN == null)
                {
                    _TOKEN = "";
                }
                if (!_TOKEN.Equals(""))
                {
                    _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
                }
                string dataJson = JsonConvert.SerializeObject(oReinfo);
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
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }

        }

        public static async Task<int> EditarReinfo(ReinfoDTO oReinfo)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Reinfo/update-reinfo";
            List<ReinfoDTO> dataResult = new List<ReinfoDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(oReinfo);
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
        public static async Task<int> EliminarReinfo(ReinfoDTO oReinfo)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Reinfo/delete-reinfo";
            List<ReinfoDTO> dataResult = new List<ReinfoDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(oReinfo);
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
