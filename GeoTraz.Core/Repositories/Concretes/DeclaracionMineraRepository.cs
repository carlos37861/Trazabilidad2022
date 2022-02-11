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
    class DeclaracionMineraRepository : Repository, IDeclaracionMineraRepository
    {
        public DeclaracionMineraRepository(SqlConnection context, SqlTransaction transaction)
        {
            _context = context;
            _transaction = transaction;
        }

        public async Task<int> AgregarDeclaracionMinera(DeclaracionMinera Declaracion)
        {
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_INS_DECLARACIONMINERA";
                    command.CommandType = CommandType.StoredProcedure;
                    //command.Parameters.AddWithValue("@N_CODREINFO", objReinfo.N_CODREINFO);
                    command.Parameters.AddWithValue("@N_CODREIN", Declaracion.N_CODREIN);
                    command.Parameters.AddWithValue("@V_OBSERVACION", Declaracion.V_OBSERVACION == null ? "" : Declaracion.V_OBSERVACION);
                    command.Parameters.AddWithValue("@V_NOMCONTADOR", Declaracion.V_NOMCONTADOR == null ? "" : Declaracion.V_NOMCONTADOR);
                    command.Parameters.AddWithValue("@V_CELCONTADOR", Declaracion.V_CELCONTADOR == null ? "" : Declaracion.V_CELCONTADOR);
                    command.Parameters.AddWithValue("@V_CORREOCONTADOR", Declaracion.V_CORREOCONTADOR == null ? "" : Declaracion.V_CORREOCONTADOR);
                    command.Parameters.AddWithValue("@V_USUREGISTRO", Declaracion.V_USUREGISTRO == null ? "" : Declaracion.V_USUREGISTRO);

                    return Convert.ToInt32(await command.ExecuteNonQueryAsync());
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }

        }

        public Task<IEnumerable<DeclaracionMinera>> BuscarDeclaracionMinera(DeclaracionMinera Declaracion)
        {
            throw new NotImplementedException();
        }

        public async Task<int> EditarDeclaracionMinera(DeclaracionMinera Declaracion)
        {
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_UPD_DECLARACIONMINEREA";
                    command.CommandType = CommandType.StoredProcedure;
                    //command.Parameters.AddWithValue("@N_CODREINFO", objReinfo.N_CODREINFO);
                    command.Parameters.AddWithValue("@N_CODREIN", Declaracion.N_CODREIN);
                    command.Parameters.AddWithValue("@V_OBSERVACION", Declaracion.V_OBSERVACION == null ? "" : Declaracion.V_OBSERVACION);
                    command.Parameters.AddWithValue("@V_NOMCONTADOR", Declaracion.V_NOMCONTADOR == null ? "" : Declaracion.V_NOMCONTADOR);
                    command.Parameters.AddWithValue("@V_CELCONTADOR", Declaracion.V_CELCONTADOR == null ? "" : Declaracion.V_CELCONTADOR);
                    command.Parameters.AddWithValue("@V_CORREOCONTADOR", Declaracion.V_CORREOCONTADOR == null ? "" : Declaracion.V_CORREOCONTADOR);
                    command.Parameters.AddWithValue("@V_USUMODIF", Declaracion.V_USUMODIF == null ? "" : Declaracion.V_USUMODIF);

                    return Convert.ToInt32(await command.ExecuteNonQueryAsync());
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }

        public Task<int> EliminarDeclaracionMinera(DeclaracionMinera Declaracion)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<DeclaracionMinera>> ListarDeclaracionMinera(DeclaracionMinera Declaracion)
        {
            throw new NotImplementedException();
        }

  

        public async Task<IEnumerable<DeclaracionMinera>> ValidaDeclaracionMinera(DeclaracionMinera Declaracion)
        {
            List<DeclaracionMinera> List = new List<DeclaracionMinera>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_GET_VALIDADECLARACIONEXISTENTE";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREIN", Declaracion.N_CODREIN);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);

                    while (sqlDataReader.Read())
                    {
                        DeclaracionMinera Obj = new DeclaracionMinera()
                        {
                            N_CODDECLARA = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_CODREIN = sqlDataReader[1] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[1]),
                            V_OBSERVACION = sqlDataReader[2].ToString(),
                            V_NOMCONTADOR = sqlDataReader[3].ToString(),
                            V_CELCONTADOR = sqlDataReader[4].ToString(),
                            V_CORREOCONTADOR = sqlDataReader[5].ToString(),

                            V_FECCREACION = sqlDataReader[6].ToString(),
                            V_FECMODIF = sqlDataReader[7].ToString(),
                            V_USUREGISTRO = sqlDataReader[8].ToString(),
                            V_USUMODIF = sqlDataReader[9].ToString(),
                            V_ESTADO = sqlDataReader[10].ToString()

                        };
                        List.Add(Obj);
                    }
                    sqlDataReader.Close();
                    return List;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }
    }
}
