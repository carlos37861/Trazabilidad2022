using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Common.Models
{
    public class DeclaracionMineraDTO
    {
        public int N_CODDECLARA { get; set; }
        public int N_CODREIN { get; set; }

        public string V_OBSERVACION { get; set; }

        public string V_NOMCONTADOR { get; set; }

        public string V_CELCONTADOR { get; set; }
        public string V_CORREOCONTADOR { get; set; }
        public int N_SEDE { get; set; }

        public string V_FECCREACION { get; set; }
        public string V_FECMODIF { get; set; }

        public string V_USUREGISTRO { get; set; }
        public string V_USUMODIF { get; set; }
        public string V_ESTADO { get; set; }
    }
}
