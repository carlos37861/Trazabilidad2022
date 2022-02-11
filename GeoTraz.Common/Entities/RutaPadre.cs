using Common.Identity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Common.Entities
{
    public class RutaPadre:Ruta
    {
       public List<RutaPadre> Hijos_List { get; set; }
    }
}
