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
    public class ReinfoService : IReinfoService
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public ReinfoService(IUnitOfWork unitOfWork)
        {
            uow = unitOfWork;

            var config = new AutoMapperConfiguration().Configure();
            mapper = config.CreateMapper();
        }
        public async Task<int> AgregarReinfo(ReinfoDTO objReinfo)
        {
            var entidad = mapper.Map<Reinfo>(objReinfo);

            var res = await uow.ReinfoRepository.AgregarReinfo(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }

        public async Task<int> EditarReinfo(ReinfoDTO objReinfo)
        {
            var entidad = mapper.Map<Reinfo>(objReinfo);

            var res = await uow.ReinfoRepository.EditarReinfo(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }

        public async Task<int> EliminarReinfo(ReinfoDTO reinfo)
        {
            var entidad = mapper.Map<Reinfo>(reinfo);

            var res = await uow.ReinfoRepository.EliminarReinfo(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }

        public async Task<IEnumerable<ReinfoDTO>> ListarReinfo()
        {
            var lista = await uow.ReinfoRepository.ListarReinfo();
            return mapper.Map<IEnumerable<ReinfoDTO>>(lista);
        }
        public async Task<IEnumerable<ReinfoDTO>> BuscarIdReinfo(ReinfoDTO reinfo)
        {
            var entidad = mapper.Map<Reinfo>(reinfo);
            var lista = await uow.ReinfoRepository.BuscarIdReinfo(entidad);
            return mapper.Map<IEnumerable<ReinfoDTO>>(lista);
        }

        public async Task<IEnumerable<ReinfoDTO>> BuscarReinfo(ReinfoDTO reinfo)
        {
            var entidad = mapper.Map<Reinfo>(reinfo);
            var lista = await uow.ReinfoRepository.BuscarReinfo(entidad);
            return mapper.Map<IEnumerable<ReinfoDTO>>(lista);
        }
        public async Task<IEnumerable<ReinfoDTO>> FiltrarReinfo(ReinfoDTO reinfo)
        {
            var entidad = mapper.Map<Reinfo>(reinfo);
            var lista = await uow.ReinfoRepository.FiltrarReinfo(entidad);
            return mapper.Map<IEnumerable<ReinfoDTO>>(lista);
        }
        public async Task<IEnumerable<ReinfoDTO>> ValidaReinfo(ReinfoDTO reinfo)
        {
            var entidad = mapper.Map<Reinfo>(reinfo);
            var lista = await uow.ReinfoRepository.ValidaReinfo(entidad);
            return mapper.Map<IEnumerable<ReinfoDTO>>(lista);
        }

        public async Task<IEnumerable<ReinfoDTO>> FiltrarReinfoGrafico(ReinfoDTO reinfo)
        {
            var entidad = mapper.Map<Reinfo>(reinfo);
            var lista = await uow.ReinfoRepository.FiltrarReinfoGrafico(entidad);
            return mapper.Map<IEnumerable<ReinfoDTO>>(lista);
        }



        public async Task<IEnumerable<ReinfoDTO>> FiltrarDeclaracionGrafico(ReinfoDTO reinfo)
        {
            var entidad = mapper.Map<Reinfo>(reinfo);
            var lista = await uow.ReinfoRepository.FiltrarDeclarionGrafico(entidad);
            return mapper.Map<IEnumerable<ReinfoDTO>>(lista);
        }
    }
}
