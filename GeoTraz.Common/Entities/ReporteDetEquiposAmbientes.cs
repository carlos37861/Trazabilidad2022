using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Common.Entities
{
    public class ReporteDetEquiposAmbientes
    {
        public int N_CODREPORTEQUIPOSAMBIENTE { get; set; }

		public int N_CODREPORTE { get; set; }
		public int N_CODREINFO { get; set; }
		public int N_CODEQUIPOS { get; set; }
		public string V_DESCRIPCION { get; set; }
		public string V_TIPO { get; set; }
		public string V_ESTADO { get; set; }

    }
}
