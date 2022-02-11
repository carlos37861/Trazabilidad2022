using GeoTraz.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Services.Interfaces
{
    public interface IReporteDetEquiposAmbientesService
    {
        Task<int> AgregarReporteDetEquiposAmbientes(ReporteDetEquiposAmbientesDTO objReporteDetEquiAmb);

        Task<IEnumerable<ReporteDetEquiposAmbientesDTO>> ListarReporteDetEquiposAmbientes(ReporteDetEquiposAmbientesDTO objReporteDetEquiAmb);
    }
}
