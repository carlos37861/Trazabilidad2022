using GeoTraz.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Services.Interfaces
{
    public interface IReporteDetService
    {
        Task<int> AgregarReporteDet(ReporteDetDTO objReporteDet);
        Task<int> EditarReporteDet(ReporteDetDTO objReporteDet);
        Task<int> EliminarReporteDet(ReporteDetDTO reporteDet);

        Task<int> EliminarReporteIdDet(ReporteDetDTO reporteDet);
        Task<IEnumerable<ReporteDetDTO>> BuscarReporteDet(ReporteDetDTO reportedet);

        Task<IEnumerable<ReporteDetDTO>> FiltrarReporteDet(ReporteDetDTO reportedet);

        Task<IEnumerable<ReporteDetDTO>> Listar4ReporteDet(ReporteDetDTO reporteDet);
        Task<IEnumerable<ReporteDetDTO>> ListarReporteDet(ReporteDetDTO reporteDet);
    }
}
