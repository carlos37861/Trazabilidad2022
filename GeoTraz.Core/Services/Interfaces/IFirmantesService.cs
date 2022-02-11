using GeoTraz.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Services.Interfaces
{
    public interface IFirmantesService
    {
        //Task<IEnumerable<FirmantesDTO>> ListarFirmantes(FirmantesDTO firmantes);

        Task<IEnumerable<FirmantesDTO>> ListarFirmantes(string V_DNI);
    }
}
