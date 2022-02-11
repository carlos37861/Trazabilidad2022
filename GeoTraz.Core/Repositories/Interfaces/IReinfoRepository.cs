using GeoTraz.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Repositories.Interfaces
{
    public interface IReinfoRepository
    {
        Task<IEnumerable<Reinfo>> ListarReinfo();
        Task<int> AgregarReinfo(Reinfo objReinfo);
        Task<int> EditarReinfo(Reinfo objReinfo);
        Task<int> EliminarReinfo(Reinfo reinfo);
        Task<IEnumerable<Reinfo>> BuscarIdReinfo(Reinfo objReinfo);
        Task<IEnumerable<Reinfo>> BuscarReinfo(Reinfo reinfo);
        Task<IEnumerable<Reinfo>> ValidaReinfo(Reinfo reinfo);
        Task<IEnumerable<Reinfo>> FiltrarReinfo(Reinfo reinfo);

    }
}
