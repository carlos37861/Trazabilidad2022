using GeoTraz.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Services.Interfaces
{
    public interface IReporteService
    {
        Task<IEnumerable<ReporteDTO>> ListarReporte();
        Task<int> AgregarReporte(ReporteDTO objReporte);
        Task<int> EditarReporte(ReporteDTO objReporte);
        Task<int> EliminarReporte(ReporteDTO reporte);

        Task<int> EliminarReporteId(ReporteDTO reporte);
        Task<IEnumerable<ReporteDTO>> BuscarReporte(ReporteDTO reporte);
        Task<IEnumerable<ReporteDTO>> BuscarReporteId(ReporteDTO reporte);
        Task<IEnumerable<ReporteDTO>> BuscarVersionReporte(ReporteDTO reporte);
        Task<IEnumerable<ReporteDTO>> FiltrarReporte(ReporteDTO reporte);
        Task<IEnumerable<ReporteDTO>> FiltrarReporteDistinct();
    }
}
