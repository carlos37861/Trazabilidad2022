using GeoTraz.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Repositories.Interfaces
{
    public interface IEquiposAmbientesRepository
    {
        Task<IEnumerable<EquiposAmbientes>> ListarEquiposAmbientes(EquiposAmbientes equiposambientes);


        Task<int> AgregarEquiposAmbientesReinfo(EquiposAmbientes equiposambientes);
        Task<int> EliminarEquiposAmbientesReinfo(EquiposAmbientes equiposambientes);
        Task<IEnumerable<EquiposAmbientes>> ListarEquiposAmbientesReinfo(EquiposAmbientes equiposambientes);
        Task<IEnumerable<EquiposAmbientes>> ListarEquiposAmbientesFaltantes(EquiposAmbientes equiposambientes);
    }
}
