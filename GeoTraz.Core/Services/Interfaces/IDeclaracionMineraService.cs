using GeoTraz.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Services.Interfaces
{
    public interface IDeclaracionMineraService
    {
        Task<IEnumerable<DeclaracionMineraDTO>> ListarDeclaracionMinera(DeclaracionMineraDTO Declaracion);
        Task<IEnumerable<DeclaracionMineraDTO>> BuscarDeclaracionMinera(DeclaracionMineraDTO Declaracion);
        Task<int> AgregarDeclaracionMinera(DeclaracionMineraDTO Declaracion);

        Task<int> EditarDeclaracionMinera(DeclaracionMineraDTO Declaracion);
        Task<int> EliminarDeclaracionMinera(DeclaracionMineraDTO Declaracion);
        Task<IEnumerable<DeclaracionMineraDTO>> ValidaDeclaracionMinera(DeclaracionMineraDTO Declaracion);


    }
}
