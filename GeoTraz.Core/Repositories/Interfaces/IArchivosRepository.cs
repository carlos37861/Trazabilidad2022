using GeoTraz.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Repositories.Interfaces
{
    public interface IArchivosRepository
    {
       
        Task<IEnumerable<Archivos>> ListarArchivo(Archivos archivos);

        Task<IEnumerable<Archivos>> ListarFiltraArchivo(Archivos archivos);
        
        Task<IEnumerable<Archivos>> ValidaCargo(Archivos archivos);
        Task<IEnumerable<Archivos>> BuscarImagen(Archivos archivos);
        
        Task<int> AgregarArchivo(IEnumerable<Archivos> Archivos);
        Task<int> EditarArchivo(Archivos objArchivo);
        Task<int> EliminarArchivo(Archivos archivos);
        Task<int> EliminarArchivoId(Archivos archivos);
        Task<IEnumerable<Archivos>> Listar4Archivo(Archivos archivos);
    }
}
