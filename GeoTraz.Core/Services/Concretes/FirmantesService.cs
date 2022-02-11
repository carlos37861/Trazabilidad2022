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
    public class FirmantesService : IFirmantesService
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public FirmantesService(IUnitOfWork unitOfWork)
        {
            uow = unitOfWork;

            var config = new AutoMapperConfiguration().Configure();
            mapper = config.CreateMapper();
        }

        //public async Task<IEnumerable<FirmantesDTO>> ListarFirmantes(FirmantesDTO firmantes)
        //{
        //    var entidad = mapper.Map<Firmantes>(firmantes);
        //    var lista = await uow.FirmantesRepository.ListarFirmantes(entidad);
        //    return mapper.Map<IEnumerable<FirmantesDTO>>(lista);
        //}

        public async Task<IEnumerable<FirmantesDTO>> ListarFirmantes(string V_DNI)
        {
            //var entidad = mapper.Map<Firmantes>(V_DNI);
            var lista = await uow.FirmantesRepository.ListarFirmantes(V_DNI);
            return mapper.Map<IEnumerable<FirmantesDTO>>(lista);
        }
    }
}
