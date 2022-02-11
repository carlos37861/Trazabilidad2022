using GeoTraz.Core.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core
{
    public interface IUnitOfWork : IDisposable
    {
          IReinfoRepository ReinfoRepository { get; }
        IArchivosRepository ArchivosRepository { get; }
        IDeclaracionMineraRepository DeclaracionMineraRepository { get; }
        IReporteRepository ReporteRepository { get; }
        IReporteDetRepository ReporteDetRepository { get; }
        IEquiposAmbientesRepository EquiposAmbientesRepository { get; }
        IReporteDetEquiposAmbientesRepository ReporteDetEquiposAmbientesRepository { get; }
        IFirmantesRepository FirmantesRepository { get; }
        void Commit();
        void Rollback();
    }
}
