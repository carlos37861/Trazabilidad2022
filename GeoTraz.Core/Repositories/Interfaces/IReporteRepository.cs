using GeoTraz.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Repositories.Interfaces
{
    public  interface IReporteRepository
    {
        Task<IEnumerable<Reporte>> ListarReporte();
        Task<int> AgregarReporte(Reporte objReporte);
        Task<int> EditarReporte(Reporte objReporte);
        Task<int> EliminarReporte(Reporte reporte);
        Task<int> EliminarReporteId(Reporte reporte);
        
        Task<IEnumerable<Reporte>> BuscarReporte(Reporte reporte);
        Task<IEnumerable<Reporte>> BuscarReporteId(Reporte reporte);
        Task<IEnumerable<Reporte>> BuscarVersionReporte(Reporte objReporte);
        Task<IEnumerable<Reporte>> FiltrarReporte(Reporte reporte);
        Task<IEnumerable<Reporte>> FiltrarReporteDistinct();

    }
}
