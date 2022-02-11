using GeoTraz.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Repositories.Interfaces
{
    public interface IReporteDetEquiposAmbientesRepository
    {
        //detalles de ambientes y equipos
        Task<int> AgregarReporteDetEquiposAmbientes(ReporteDetEquiposAmbientes objreportdetequiamb);

        Task<IEnumerable<ReporteDetEquiposAmbientes>> ListarReporteDetEquiposAmbientes(ReporteDetEquiposAmbientes objreportdetequiamb);
    }
}
