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
    public class DeclaracionMineraService : IDeclaracionMineraService
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public DeclaracionMineraService(IUnitOfWork unitOfWork)
        {
            uow = unitOfWork;

            var config = new AutoMapperConfiguration().Configure();
            mapper = config.CreateMapper();
        }
        public async Task<int> AgregarDeclaracionMinera(DeclaracionMineraDTO Declaracion)
        {
            var entidad = mapper.Map<DeclaracionMinera>(Declaracion);

            var res = await uow.DeclaracionMineraRepository.AgregarDeclaracionMinera(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }

        public Task<IEnumerable<DeclaracionMineraDTO>> BuscarDeclaracionMinera(DeclaracionMineraDTO Declaracion)
        {
            throw new NotImplementedException();
        }

        public async Task<int> EditarDeclaracionMinera(DeclaracionMineraDTO Declaracion)
        {
            var entidad = mapper.Map<DeclaracionMinera>(Declaracion);

            var res = await uow.DeclaracionMineraRepository.EditarDeclaracionMinera(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }

        public Task<int> EliminarDeclaracionMinera(DeclaracionMineraDTO Declaracion)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<DeclaracionMineraDTO>> ListarDeclaracionMinera(DeclaracionMineraDTO Declaracion)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<DeclaracionMineraDTO>> ValidaDeclaracionMinera(DeclaracionMineraDTO Declaracion)
        {
            var entidad = mapper.Map<DeclaracionMinera>(Declaracion);
            var lista = await uow.DeclaracionMineraRepository.ValidaDeclaracionMinera(entidad);
            return mapper.Map<IEnumerable<DeclaracionMineraDTO>>(lista);
        }
    }
}
