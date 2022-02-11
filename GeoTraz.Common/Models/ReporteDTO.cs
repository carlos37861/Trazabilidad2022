using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Common.Models
{
    public class ReporteDTO
    {
		public int N_CODREPORTE { get; set; }
		public int N_CODREIN { get; set; }
		public string V_REALIZADOPOR { get; set; }
		public string V_REVISADOPOR { get; set; }
		public string V_FECHAREALIZADO { get; set; }
		public string V_FECHAREVISADO { get; set; }
		public string V_FECCREACION { get; set; }
		public string V_FECMODIF { get; set; }
		public string V_USUREGISTRO { get; set; }
		public string V_USUMODIF { get; set; }
		public string V_ESTADO { get; set; }
        //datos de reinfo
        public string V_RUC { get; set; }
        public string V_PROVEEDOR { get; set; }

        public string V_CODCONSECION { get; set; }
        public string V_NOMCONSECION { get; set; }
        public double N_TMPH { get; set; }
        public double N_TMPS { get; set; }
        public string V_UBIGEO { get; set; }
        public string V_NOMDERECHMINE { get; set; }
        public string V_CODZONAREI { get; set; }
        public double N_NORTE1 { get; set; }
        public double N_ESTE1 { get; set; }
        public double N_NORTE2 { get; set; }
        public double N_ESTE2 { get; set; }
        public string v_CODTIPOACT { get; set; }
        public string V_FECREINFO { get; set; }
        public string V_COMPONENT { get; set; }
        public string v_CODZONACAMP { get; set; }
        public double N_NORTEC { get; set; }
        public double N_ESTEC { get; set; }
        public double N_DIFCORDE { get; set; }
        public int N_SEDE { get; set; }

        public string V_DESCRILABOR { get; set; }
        public int N_CANTHOMBRE { get; set; }
        public int N_CANTMUJE { get; set; }
        public int N_TOTALTRAB { get; set; }

        public string V_IGAFOMCORREC { get; set; }
        public string V_IGAFOMPREV { get; set; }
        public string V_ESTADOIGAFOM { get; set; }
        public string V_RESULTADOS { get; set; }
        public string V_CONCLUSION { get; set; }
        public string V_PROTOCOLO { get; set; }
        public int N_VERSION { get; set; }

        public string V_VERSIONPROTOCOLO { get; set; }
        public string V_FECHAVERSION { get; set; }

        public string V_SITUACIONINGEMMET { get; set; }

        public string V_SITACIONDECMINERA { get; set; }
        public string V_ANIO { get; set; }
        public string V_MES { get; set; }

        public int V_CARGOCORRECT { get; set; }
        public int V_INFOMERCORRECT { get; set; }
        public int V_OTROSCORRECT { get; set; }
        public int V_CARGOPREVENT { get; set; }
        public int V_INFORMEPREVENT { get; set; }
        public int V_OTROSPREVENT { get; set; }
        public int V_CARGOLEVSUS { get; set; }
        public int V_CARGODECMINERA { get; set; }

        public int V_CONTRATO { get; set; }
        public int V_RESOLUCION { get; set; }
        public int V_OTROSDOCS { get; set; }

        public int V_RESOLUCIONIGAFOM { get; set; }
        public string NOMBRE_REALIZADOPOR { get; set; }

        public string NOMBRE_REVISADOPOR { get; set; }
    }
}
