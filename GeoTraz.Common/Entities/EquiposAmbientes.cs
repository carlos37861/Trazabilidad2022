using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Common.Entities
{
    public class EquiposAmbientes
    {
        public int N_CODEQUIPOS { get; set; }
        public string V_DESCRIPCION { get; set; }
        public string V_TIPO { get; set; }
        public string V_ESTADO { get; set; }

        //DE REINFO
        public int N_CODEQUIPOREINFO { get; set; }
        public int N_CODREINFO { get; set; }

    }
}
