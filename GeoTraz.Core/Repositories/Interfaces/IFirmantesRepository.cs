using GeoTraz.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Repositories.Interfaces
{
    public interface IFirmantesRepository
    {
        //Task<IEnumerable<Firmantes>> ListarFirmantes(Firmantes firmantes);
        Task<IEnumerable<Firmantes>> ListarFirmantes(string V_DNI);

    }
}
