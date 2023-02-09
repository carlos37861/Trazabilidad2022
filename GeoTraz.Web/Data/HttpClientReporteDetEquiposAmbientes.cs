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
    public class HttpClientReporteDetEquiposAmbientes
    {
        public static async Task<int> AgregarReporteDetEquiposAmbientes(ReporteDetEquiposAmbientesDTO reportedetequiposambientes)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriGeneral") + "ReporteDetEquiposAmbientes/add-reporteDetEquiposAmbientes";
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(reportedetequiposambientes);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            //HttpResponseMessage response = await _httpClient.GetAsync(UriGeneral);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                return Convert.ToInt32(data);
            }

            return 0;
        }

        public static async Task<List<ReporteDetEquiposAmbientesDTO>> ListarReporteDetEquiposAmbientes(ReporteDetEquiposAmbientesDTO reportedetequiposambientes)
        {

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            HttpClient _httpClient = new HttpClient(clientHandler);
            String UriGeneral = JsonHelper.GetSection("UriGeneral") + "ReporteDetEquiposAmbientes/lista-reporteDetEquiposAmbientes";
            List<ReporteDetEquiposAmbientesDTO> dataResult = new List<ReporteDetEquiposAmbientesDTO>();
            string _TOKEN = AuthToken.Token;
            if (_TOKEN == null)
            {
                _TOKEN = "";
            }
            if (!_TOKEN.Equals(""))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _TOKEN);
            }
            string dataJson = JsonConvert.SerializeObject(reportedetequiposambientes);
            StringContent contenidoFromBody = new StringContent(dataJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _httpClient.PostAsync(UriGeneral, contenidoFromBody);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                dataResult = JsonConvert.DeserializeObject<List<ReporteDetEquiposAmbientesDTO>>(data);
            }
            return dataResult;
        }
    }
}
