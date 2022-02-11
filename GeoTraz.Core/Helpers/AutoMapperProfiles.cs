using AutoMapper;
using GeoTraz.Common.Entities;
using GeoTraz.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Reinfo, ReinfoDTO>().ReverseMap();
            CreateMap<Archivos, ArchivosDTO>().ReverseMap();
            CreateMap<DeclaracionMinera, DeclaracionMineraDTO>().ReverseMap();
            CreateMap<Reporte, ReporteDTO>().ReverseMap();
            CreateMap<ReporteDet, ReporteDetDTO>().ReverseMap();
            CreateMap<EquiposAmbientes, EquiposAmbientesDTO>().ReverseMap();
            CreateMap<ReporteDetEquiposAmbientes, ReporteDetEquiposAmbientesDTO>().ReverseMap();
            CreateMap<Firmantes,FirmantesDTO>().ReverseMap();
        }
    }
}
