using GeoTraz.Common.Entities;
using GeoTraz.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Services.Interfaces
{
    public interface IEquiposAmbientesService
    {
        Task<IEnumerable<EquiposAmbientesDTO>> ListarEquiposAmbientes(EquiposAmbientesDTO equiposambientes);

        Task<int> AgregarEquiposAmbientesReinfo(EquiposAmbientesDTO equiposambientes);
        Task<int> EliminarEquiposAmbientesReinfo(EquiposAmbientesDTO equiposambientes);
        Task<IEnumerable<EquiposAmbientesDTO>> ListarEquiposAmbientesReinfo(EquiposAmbientesDTO equiposambientes);
        Task<IEnumerable<EquiposAmbientesDTO>> ListarEquiposAmbientesFaltantes(EquiposAmbientesDTO equiposambientes);

        
    }
}
 