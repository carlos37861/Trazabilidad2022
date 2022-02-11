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
   public  class ReporteDetService: IReporteDetService
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public ReporteDetService(IUnitOfWork unitOfWork)
        {
            uow = unitOfWork;

            var config = new AutoMapperConfiguration().Configure();
            mapper = config.CreateMapper();
        }
        public async Task<int> AgregarReporteDet(ReporteDetDTO objReporteDet)
        {
            var entidad = mapper.Map<ReporteDet>(objReporteDet);

            var res = await uow.ReporteDetRepository.AgregarReporteDet(entidad);
            uow.Commit();
            return Convert.ToInt32(res);
        }
        public async Task<IEnumerable<ReporteDetDTO>> Listar4ReporteDet(ReporteDetDTO reporteDet)
        {
            var entidad = mapper.Map<ReporteDet>(reporteDet);
            var lista = await uow.ReporteDetRepository.Listar4ReporteDet(entidad);
            return mapper.Map<IEnumerable<ReporteDetDTO>>(lista);
        }

        public async Task<IEnumerable<ReporteDetDTO>> ListarReporteDet(ReporteDetDTO reporteDet)
        {
            var entidad = mapper.Map<ReporteDet>(reporteDet);
            var lista = await uow.ReporteDetRepository.ListarReporteDet(entidad);
            return mapper.Map<IEnumerable<ReporteDetDTO>>(lista);
        }
        public Task<IEnumerable<ReporteDetDTO>> BuscarReporteDet(ReporteDetDTO reportedet)
        {
            throw new NotImplementedException();
        }

        public Task<int> EditarReporteDet(ReporteDetDTO objReporteDet)
        {
            throw new NotImplementedException();
        }

        public Task<int> EliminarReporteDet(ReporteDetDTO reporteDet)
        {
            throw new NotImplementedException();
        }

        public Task<int> EliminarReporteIdDet(ReporteDetDTO reporteDet)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ReporteDetDTO>> FiltrarReporteDet(ReporteDetDTO reportedet)
        {
            throw new NotImplementedException();
        }

    
    }
}
