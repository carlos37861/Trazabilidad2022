using GeoTraz.Common.Entities;
using GeoTraz.Core.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core.Repositories.Concretes
{
    class FirmantesRepository : Repository, IFirmantesRepository
    {
        public FirmantesRepository(SqlConnection context, SqlTransaction transaction)
        {
            _context = context;
            _transaction = transaction;
        }

        public async Task<IEnumerable<Firmantes>> ListarFirmantes(string V_DNI)
        {
            List<Firmantes> List = new List<Firmantes>();
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LST_FIRMANTES";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@V_DNI", V_DNI);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);
                    while (sqlDataReader.Read())
                    {
                        Firmantes Obj = new Firmantes()
                        {
                            N_CODFIRMANTES = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            V_DNI = sqlDataReader[1].ToString(),
                            V_NOMBRES = sqlDataReader[2].ToString(),
                            V_TIPOIMAG = sqlDataReader[3].ToString(),
                            V_FOTOFIRMA = sqlDataReader[4].ToString(),
                            V_RUTA = sqlDataReader[5].ToString(),
                            V_ESTADO = sqlDataReader[6].ToString(),
                        };
                        List.Add(Obj);
                    }
                    sqlDataReader.Close();
                    return List;
                }          
        }
    }
}
