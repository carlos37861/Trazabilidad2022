using AutoMapper;
using GeoTraz.Common.Entities;
using GeoTraz.Common.Models;
using GeoTraz.Core.Helpers;
using GeoTraz.Core.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Services.Concretes
{
    public class ArchivosService : IArchivosService
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public ArchivosService(IUnitOfWork unitOfWork)
        {
            uow = unitOfWork;

            var config = new AutoMapperConfiguration().Configure();
            mapper = config.CreateMapper();
        }

   
        public async Task<int> AgregarArchivo(IEnumerable<ArchivosDTO> Archivos)
        {
            var entidad = mapper.Map<IEnumerable<Archivos>>(Archivos);
            var res = await uow.ArchivosRepository.AgregarArchivo(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }

        public async Task<int> EditarArchivo(ArchivosDTO objArchivo)
        {
            var entidad = mapper.Map<Archivos>(objArchivo);

            var res = await uow.ArchivosRepository.EditarArchivo(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }

        public async Task<int> EliminarArchivo(ArchivosDTO archivos)
        {
            var entidad = mapper.Map<Archivos>(archivos);
            var res = await uow.ArchivosRepository.EliminarArchivo(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }

        public async Task<int> EliminarArchivoId(ArchivosDTO archivos)
        {
            var entidad = mapper.Map<Archivos>(archivos);
            var res = await uow.ArchivosRepository.EliminarArchivoId(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }

        public async Task<IEnumerable<ArchivosDTO>> ListarArchivo(ArchivosDTO archivos)
        {
            var entidad = mapper.Map<Archivos>(archivos);
            var lista = await uow.ArchivosRepository.ListarArchivo(entidad);
            return mapper.Map<IEnumerable<ArchivosDTO>>(lista);
        }

        public async Task<IEnumerable<ArchivosDTO>> ListarFiltraArchivo(ArchivosDTO archivos)
        {
            var entidad = mapper.Map<Archivos>(archivos);
            var lista = await uow.ArchivosRepository.ListarFiltraArchivo(entidad);
            return mapper.Map<IEnumerable<ArchivosDTO>>(lista);
        }

        public async Task<IEnumerable<ArchivosDTO>> BuscarImagen(ArchivosDTO archivos)
        {
            var entidad = mapper.Map<Archivos>(archivos);
            var lista = await uow.ArchivosRepository.BuscarImagen(entidad);
            return mapper.Map<IEnumerable<ArchivosDTO>>(lista);
        }
        public async Task<IEnumerable<ArchivosDTO>> Listar4Archivo(ArchivosDTO archivos)
        {
            var entidad = mapper.Map<Archivos>(archivos);
            var lista = await uow.ArchivosRepository.Listar4Archivo(entidad);
            return mapper.Map<IEnumerable<ArchivosDTO>>(lista);
        }
        public async Task<IEnumerable<ArchivosDTO>> ValidaCargo(ArchivosDTO archivos)
        {
            var entidad = mapper.Map<Archivos>(archivos);
            var lista = await uow.ArchivosRepository.ValidaCargo(entidad);
            return mapper.Map<IEnumerable<ArchivosDTO>>(lista);
        }
    }
}
