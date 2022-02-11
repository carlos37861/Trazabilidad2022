using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Common.Entities
{
    public class Archivos
    {
		public int N_CODARCHIVO { get; set; }
		public int N_CODREIN { get; set; }
		public int N_CODIGAFOM { get; set; }
		public string V_TIPOIGAFOM { get; set; }
		public string V_TIPOARCH { get; set; }
		public string V_TIPOIMAG { get; set; }
		public string V_EXTENSION { get; set; }
		public string V_NOMBRE { get; set; }
		public double N_TAMANIO { get; set; }
		public string V_RUTA { get; set; }
		public string V_FECCREACION { get; set; }
		public string V_FECMODIF { get; set; }
		public string V_USUREGISTRO { get; set; }
		public string V_USUMODIF { get; set; }

		public string V_ESTADO { get; set; }
        public string V_DESCRIPARCH { get; set; }

        public string V_FECMODIFINICIO { get; set; }
		public string V_FECMODIFFIN { get; set; }
	}
}
