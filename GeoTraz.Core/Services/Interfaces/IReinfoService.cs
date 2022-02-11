using GeoTraz.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Services.Interfaces
{
    public interface IReinfoService
    {
        Task<IEnumerable<ReinfoDTO>> ListarReinfo();
        Task<int> AgregarReinfo(ReinfoDTO objReinfo);
        Task<int> EditarReinfo(ReinfoDTO objReinfo);
        Task<int> EliminarReinfo(ReinfoDTO reinfo);
        Task<IEnumerable<ReinfoDTO>> BuscarIdReinfo(ReinfoDTO reinfo);
        Task<IEnumerable<ReinfoDTO>> BuscarReinfo(ReinfoDTO reinfo);
        Task<IEnumerable<ReinfoDTO>> FiltrarReinfo(ReinfoDTO reinfo);
        Task<IEnumerable<ReinfoDTO>> ValidaReinfo(ReinfoDTO reinfo);
    }
}
