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
    public class ReporteDetEquiposAmbientesService : IReporteDetEquiposAmbientesService
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public ReporteDetEquiposAmbientesService(IUnitOfWork unitOfWork)
        {
            uow = unitOfWork;
            var config = new AutoMapperConfiguration().Configure();
            mapper = config.CreateMapper();
            
        }
        public async Task<int> AgregarReporteDetEquiposAmbientes(ReporteDetEquiposAmbientesDTO objReporteDetEquiAmb)
        {
            var entidad = mapper.Map<ReporteDetEquiposAmbientes>(objReporteDetEquiAmb);
            var res = await uow.ReporteDetEquiposAmbientesRepository.AgregarReporteDetEquiposAmbientes(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }

        public async Task<IEnumerable<ReporteDetEquiposAmbientesDTO>> ListarReporteDetEquiposAmbientes(ReporteDetEquiposAmbientesDTO objReporteDetEquiAmb)
        {
            var entidad = mapper.Map<ReporteDetEquiposAmbientes>(objReporteDetEquiAmb);
            var lista = await uow.ReporteDetEquiposAmbientesRepository.ListarReporteDetEquiposAmbientes(entidad);
            return mapper.Map<IEnumerable<ReporteDetEquiposAmbientesDTO>>(lista);
        }
    }
}
