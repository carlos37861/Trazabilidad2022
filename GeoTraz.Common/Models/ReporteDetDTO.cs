using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Common.Models
{
    public class ReporteDetDTO
    {
        public int N_CODDETREPORTE { get; set; }
        public int N_CODREPORTE { get; set; }
        public int N_CODREIN { get; set; }
        public string V_TIPOIMAG { get; set; }
        public string V_NOMBRE { get; set; }
        public string V_RUTA { get; set; }
        public int N_CODARCHIVO { get; set; }
    }
}
