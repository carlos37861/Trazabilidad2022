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
    public class ReporteService: IReporteService
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public ReporteService(IUnitOfWork unitOfWork)
        {
            uow = unitOfWork;

            var config = new AutoMapperConfiguration().Configure();
            mapper = config.CreateMapper();
        }

        public async Task<int> AgregarReporte(ReporteDTO objReporte)
        {
            var entidad = mapper.Map<Reporte>(objReporte);

            var res = await uow.ReporteRepository.AgregarReporte(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }

        public async Task<IEnumerable<ReporteDTO>> BuscarReporte(ReporteDTO reporte)
        {
            var entidad = mapper.Map<Reporte>(reporte);
            var lista = await uow.ReporteRepository.BuscarReporte(entidad);
            return mapper.Map<IEnumerable<ReporteDTO>>(lista);
        }

        public async Task<IEnumerable<ReporteDTO>> BuscarReporteId(ReporteDTO reporte)
        {
            var entidad = mapper.Map<Reporte>(reporte);
            var lista = await uow.ReporteRepository.BuscarReporteId(entidad);
            return mapper.Map<IEnumerable<ReporteDTO>>(lista);
        }

        public async Task<IEnumerable<ReporteDTO>> BuscarVersionReporte(ReporteDTO reporte)
        {
            var entidad = mapper.Map<Reporte>(reporte);
            var lista = await uow.ReporteRepository.BuscarVersionReporte(entidad);
            return mapper.Map<IEnumerable<ReporteDTO>>(lista);
        }

        public Task<int> EditarReporte(ReporteDTO objReporte)
        {
            throw new NotImplementedException();
        }

        public async Task<int> EliminarReporte(ReporteDTO reporte)
        {
            var entidad = mapper.Map<Reporte>(reporte);

            var res = await uow.ReporteRepository.EliminarReporte(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }

        public async Task<int> EliminarReporteId(ReporteDTO reporte)
        {
            var entidad = mapper.Map<Reporte>(reporte);

            var res = await uow.ReporteRepository.EliminarReporteId(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }

        public async Task<IEnumerable<ReporteDTO>> FiltrarReporte(ReporteDTO reporte)
        {
            var entidad = mapper.Map<Reporte>(reporte);
            var lista = await uow.ReporteRepository.FiltrarReporte(entidad);
            return mapper.Map<IEnumerable<ReporteDTO>>(lista);
        }

        public async Task<IEnumerable<ReporteDTO>> FiltrarReporteDistinct()
        {
            var lista = await uow.ReporteRepository.FiltrarReporteDistinct();
            return mapper.Map<IEnumerable<ReporteDTO>>(lista);
        }

        public async Task<IEnumerable<ReporteDTO>> ListarReporte()
        {
            var lista = await uow.ReporteRepository.ListarReporte();
            return mapper.Map<IEnumerable<ReporteDTO>>(lista);
        }
    }
}
