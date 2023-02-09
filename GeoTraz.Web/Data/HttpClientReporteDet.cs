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
    public class HttpClientReporteDet
    {
        public static async Task<int> AgregarReporteDet(ReporteDetDTO reporte)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriGeneral") + "ReporteDet/add-reporteDet";
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(reporte);
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

        public static async Task<List<ReporteDetDTO>> ListarReporteDet(ReporteDetDTO reportedet)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriGeneral") + "ReporteDet/lista-reporteDet";
            List<ReporteDetDTO> dataResult = new List<ReporteDetDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(reportedet);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<ReporteDetDTO>>(data);
            }

            return dataResult;
        }
        public static async Task<List<ReporteDetDTO>> Listar4ReporteDet(ReporteDetDTO reportedet)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriGeneral") + "ReporteDet/lista-reporteDet4";
            List<ReporteDetDTO> dataResult = new List<ReporteDetDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(reportedet);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<ReporteDetDTO>>(data);
            }

            return dataResult;
        }
    }
}
