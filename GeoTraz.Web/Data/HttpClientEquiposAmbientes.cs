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
    public class HttpClientEquiposAmbientes
    {
        public static async Task<List<EquiposAmbientesDTO>> ListaEquiposAmbientes(EquiposAmbientesDTO equiposambientes)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriGeneral") + "EquiposAmbientes/lista-equiposambientes";
            List<EquiposAmbientesDTO> dataResult = new List<EquiposAmbientesDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(equiposambientes);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<EquiposAmbientesDTO>>(data);
            }

            return dataResult;

        }

        public static async Task<List<EquiposAmbientesDTO>> ListaEquiposAmbientesReinfo(EquiposAmbientesDTO equiposambientes)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriGeneral") + "EquiposAmbientes/lista-equiposambientesreinfo";
            List<EquiposAmbientesDTO> dataResult = new List<EquiposAmbientesDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(equiposambientes);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<EquiposAmbientesDTO>>(data);
            }

            return dataResult;

        }

        public static async Task<int> AgregarEquiposAmbientesReinfo(EquiposAmbientesDTO equiposambientes)
        {
            try
            {
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
                HttpClient _httpClient = new HttpClient(clientHandler);
                String UriGeneral = JsonHelper.GetSection("UriGeneral") + "EquiposAmbientes/add-equiposambientesreinfo";
                List<EquiposAmbientesDTO> dataResult = new List<EquiposAmbientesDTO>();
                string _TOKEN = AuthToken.Token;
                if (_TOKEN == null)
                {
                    _TOKEN = "";
                }
                if (!_TOKEN.Equals(""))
                {
                    _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
                }
                string dataJson = JsonConvert.SerializeObject(equiposambientes);
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

        public static async Task<int> EliminarEquiposAmbientesReinfo(EquiposAmbientesDTO equiposambientes)
        {
            try
            {
                HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
                HttpClient _httpClient = new HttpClient(clientHandler);
                String UriGeneral = JsonHelper.GetSection("UriGeneral") + "EquiposAmbientes/del-equiposambientesreinfo";
                List<EquiposAmbientesDTO> dataResult = new List<EquiposAmbientesDTO>();
                string _TOKEN = AuthToken.Token;
                if (_TOKEN == null)
                {
                    _TOKEN = "";
                }
                if (!_TOKEN.Equals(""))
                {
                    _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
                }
                string dataJson = JsonConvert.SerializeObject(equiposambientes);
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

        public static async Task<List<EquiposAmbientesDTO>> ListaEquiposAmbientesFaltantes(EquiposAmbientesDTO equiposambientes)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriGeneral") + "EquiposAmbientes/lista-equiposambientesFaltantes";
            List<EquiposAmbientesDTO> dataResult = new List<EquiposAmbientesDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(equiposambientes);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<EquiposAmbientesDTO>>(data);
            }

            return dataResult;

        }
        
    }
}
