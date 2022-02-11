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
    public class EquiposAmbientesService : IEquiposAmbientesService
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public EquiposAmbientesService(IUnitOfWork unitOfWork)
        {
            uow = unitOfWork;

            var config = new AutoMapperConfiguration().Configure();
            mapper = config.CreateMapper();
        }

        public async Task<int> AgregarEquiposAmbientesReinfo(EquiposAmbientesDTO equiposambientes)
        {

            var entidad = mapper.Map<EquiposAmbientes>(equiposambientes);

            var res = await uow.EquiposAmbientesRepository.AgregarEquiposAmbientesReinfo(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }

        public async Task<int> EliminarEquiposAmbientesReinfo(EquiposAmbientesDTO equiposambientes)
        {
            var entidad = mapper.Map<EquiposAmbientes>(equiposambientes);

            var res = await uow.EquiposAmbientesRepository.EliminarEquiposAmbientesReinfo(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }

        public async Task<IEnumerable<EquiposAmbientesDTO>> ListarEquiposAmbientes(EquiposAmbientesDTO equiposambientes)
        {
            var entidad = mapper.Map<EquiposAmbientes>(equiposambientes);
            var lista = await uow.EquiposAmbientesRepository.ListarEquiposAmbientes(entidad);
            return mapper.Map<IEnumerable<EquiposAmbientesDTO>>(lista);

        }

        public async Task<IEnumerable<EquiposAmbientesDTO>> ListarEquiposAmbientesFaltantes(EquiposAmbientesDTO equiposambientes)
        {
            var entidad = mapper.Map<EquiposAmbientes>(equiposambientes);
            var lista = await uow.EquiposAmbientesRepository.ListarEquiposAmbientesFaltantes(entidad);
            return mapper.Map<IEnumerable<EquiposAmbientesDTO>>(lista);
        }

        public async Task<IEnumerable<EquiposAmbientesDTO>> ListarEquiposAmbientesReinfo(EquiposAmbientesDTO equiposambientes)
        {
            var entidad = mapper.Map<EquiposAmbientes>(equiposambientes);
            var lista = await uow.EquiposAmbientesRepository.ListarEquiposAmbientesReinfo(entidad);
            return mapper.Map<IEnumerable<EquiposAmbientesDTO>>(lista);
        }
    }
}
