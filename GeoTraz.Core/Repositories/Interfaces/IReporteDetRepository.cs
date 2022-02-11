using GeoTraz.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Repositories.Interfaces
{
    public interface IReporteDetRepository
    {

        Task<int> AgregarReporteDet(ReporteDet objReportedet);
        Task<int> EditarReporteDet(ReporteDet objReportedet);
        Task<int> EliminarReporteDet(ReporteDet reportedet);
        Task<int> EliminarReporteIdDet(ReporteDet reportedet);
        Task<IEnumerable<ReporteDet>> BuscarReporteDet(ReporteDet reporteDet);
        Task<IEnumerable<ReporteDet>> FiltrarReporteDet(ReporteDet reporteDet);
        Task<IEnumerable<ReporteDet>> Listar4ReporteDet(ReporteDet reporteDet);
        Task<IEnumerable<ReporteDet>> ListarReporteDet(ReporteDet reporteDet);

   

    }
}
