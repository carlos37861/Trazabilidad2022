using GeoTraz.Common.Entities;
using GeoTraz.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Services.Interfaces
{
    public interface IArchivosService
    {
        Task<IEnumerable<ArchivosDTO>> ListarArchivo(ArchivosDTO archivos);

        Task<IEnumerable<ArchivosDTO>> ListarFiltraArchivo(ArchivosDTO archivos);
        Task<IEnumerable<ArchivosDTO>> BuscarImagen(ArchivosDTO archivos);
        Task<int> AgregarArchivo(IEnumerable<ArchivosDTO> Archivos);

        Task<int> EditarArchivo(ArchivosDTO objArchivo);
        Task<int> EliminarArchivo(ArchivosDTO archivos);
        Task<int> EliminarArchivoId(ArchivosDTO archivos);
        Task<IEnumerable<ArchivosDTO>> Listar4Archivo(ArchivosDTO archivos);
        Task<IEnumerable<ArchivosDTO>> ValidaCargo(ArchivosDTO archivos);
    }
}
