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
    public class HttpClientArchivos
    {
        public static async Task<int> AgregarArchivo(List<ArchivosDTO> filtro)
        {
            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Archivos/add-archivo";
            //List<ArchivoDTO> dataResult = new List<ArchivoDTO>();
            var dataResult = 0;
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(filtro);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            //HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<int>(data);
            }

            return dataResult;
        }

        public static async Task<int> EliminarArchivo(ArchivosDTO oArchivo)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Archivos/delete-archivo";
            //List<ArchivosDTO> dataResult = new List<ArchivosDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(oArchivo);
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

        public static async Task<int> EliminarArchivoId(ArchivosDTO oArchivo)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Archivos/delete-archivo-id";
            //List<ArchivosDTO> dataResult = new List<ArchivosDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(oArchivo);
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
        public static async Task<List<ArchivosDTO>> ListaArchivo(ArchivosDTO archivos)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Archivos/lista-archivo";
            List<ArchivosDTO> dataResult = new List<ArchivosDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(archivos);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<ArchivosDTO>>(data);
            }
            return dataResult;
        }

        public static async Task<List<ArchivosDTO>> ListaFiltraArchivo(ArchivosDTO archivos)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Archivos/filtra-archivo";
            List<ArchivosDTO> dataResult = new List<ArchivosDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(archivos);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<ArchivosDTO>>(data);
            }
            return dataResult;
        }
        
        public static async Task<List<ArchivosDTO>> Lista4Archivo(ArchivosDTO archivos)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Archivos/lista4-archivo";
            List<ArchivosDTO> dataResult = new List<ArchivosDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(archivos);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<ArchivosDTO>>(data);
            }

            return dataResult;

        }

        public static async Task<List<ArchivosDTO>> BuscarImagen(ArchivosDTO archivos)
        {
            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Archivos/busca-imagen";
            List<ArchivosDTO> dataResult = new List<ArchivosDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(archivos);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<ArchivosDTO>>(data);
            }

            return dataResult;


        }
        public static async Task<List<ArchivosDTO>> ValidaCargo(ArchivosDTO archivos)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriPrueba") + "Archivos/lista-validacargo";
            List<ArchivosDTO> dataResult = new List<ArchivosDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(archivos);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<ArchivosDTO>>(data);
            }

            return dataResult;

        }

       
    }
}
