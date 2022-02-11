using GeoTraz.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Repositories.Interfaces
{
    public interface IDeclaracionMineraRepository
    {
        Task<IEnumerable<DeclaracionMinera>> ListarDeclaracionMinera(DeclaracionMinera Declaracion);

        Task<IEnumerable<DeclaracionMinera>> BuscarDeclaracionMinera(DeclaracionMinera Declaracion);

        Task<int> AgregarDeclaracionMinera(DeclaracionMinera Declaracion);
        Task<int> EditarDeclaracionMinera(DeclaracionMinera Declaracion);
        Task<int> EliminarDeclaracionMinera(DeclaracionMinera Declaracion);

        Task<IEnumerable<DeclaracionMinera>> ValidaDeclaracionMinera(DeclaracionMinera Declaracion);
    }
}
