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
    public class EquiposAmbientesRepository : Repository, IEquiposAmbientesRepository
    {
        public EquiposAmbientesRepository(SqlConnection context, SqlTransaction transaction)
        {
            _context = context;
            _transaction = transaction;
        }

        public async Task<int> AgregarEquiposAmbientesReinfo(EquiposAmbientes equiposambientes)
        {
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_INS_EQUIPOSAMBIENTESREINFO";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREINFO", equiposambientes.N_CODREINFO);
                    command.Parameters.AddWithValue("@N_CODEQUIPOS", equiposambientes.N_CODEQUIPOS);
                    command.Parameters.AddWithValue("@V_DESCRIPCION", equiposambientes.V_DESCRIPCION);
                    command.Parameters.AddWithValue("@V_TIPO", equiposambientes.V_TIPO);
                    command.Parameters.AddWithValue("@V_ESTADO", equiposambientes.V_ESTADO);



                    return Convert.ToInt32(await command.ExecuteNonQueryAsync());
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }

        public async Task<int> EliminarEquiposAmbientesReinfo(EquiposAmbientes equiposambientes)
        {
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_DEL_EQUIPOSAMBIENTESREINFO";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODEQUIPOS", equiposambientes.N_CODEQUIPOS);
                    command.Parameters.AddWithValue("@N_CODREINFO", equiposambientes.N_CODREINFO);
                    return Convert.ToInt32(await command.ExecuteNonQueryAsync());
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }

        public async Task<IEnumerable<EquiposAmbientes>> ListarEquiposAmbientes(EquiposAmbientes equiposambientes)
        {
            List<EquiposAmbientes> List = new List<EquiposAmbientes>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LST_EQUIPOSAMBIENTES";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@V_DESCRIPCION", equiposambientes.V_DESCRIPCION == null ? "" : equiposambientes.V_DESCRIPCION);
                    command.Parameters.AddWithValue("@V_TIPO", equiposambientes.V_TIPO == null ? "" : equiposambientes.V_TIPO);
                    command.Parameters.AddWithValue("@V_ESTADO", equiposambientes.V_ESTADO == null ? "" : equiposambientes.V_ESTADO);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);
                    while (sqlDataReader.Read())
                    {
                        EquiposAmbientes Obj = new EquiposAmbientes()
                        {
                            N_CODEQUIPOS = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            V_DESCRIPCION = sqlDataReader[1].ToString(),
                            V_TIPO = sqlDataReader[2].ToString(),
                            V_ESTADO = sqlDataReader[3].ToString(),
       
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

        public async Task<IEnumerable<EquiposAmbientes>> ListarEquiposAmbientesReinfo(EquiposAmbientes equiposambientes)
        {
            List<EquiposAmbientes> List = new List<EquiposAmbientes>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LST_EQUIPOSAMBIENTESREINFO";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREINFO", equiposambientes.N_CODREINFO);
                    command.Parameters.AddWithValue("@V_DESCRIPCION", equiposambientes.V_DESCRIPCION == null ? "" : equiposambientes.V_DESCRIPCION);
                    command.Parameters.AddWithValue("@V_TIPO", equiposambientes.V_TIPO == null ? "" : equiposambientes.V_TIPO);
                    command.Parameters.AddWithValue("@V_ESTADO", equiposambientes.V_ESTADO == null ? "" : equiposambientes.V_ESTADO);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);
                    while (sqlDataReader.Read())
                    {
                        EquiposAmbientes Obj = new EquiposAmbientes()
                        {
                            N_CODEQUIPOREINFO=sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_CODREINFO = sqlDataReader[1] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[1]),
                            N_CODEQUIPOS = sqlDataReader[2] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[2]),
                            V_DESCRIPCION = sqlDataReader[3].ToString(),
                            V_TIPO = sqlDataReader[4].ToString(),
                            V_ESTADO = sqlDataReader[5].ToString(),

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

        public async Task<IEnumerable<EquiposAmbientes>> ListarEquiposAmbientesFaltantes(EquiposAmbientes equiposambientes)
        {
            List<EquiposAmbientes> List = new List<EquiposAmbientes>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LST_NOTEXISTEQUIPOSAMBIENTES";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREINFO", equiposambientes.N_CODREINFO);
                    command.Parameters.AddWithValue("@V_TIPO", equiposambientes.V_TIPO == null ? "" : equiposambientes.V_TIPO);
                    command.Parameters.AddWithValue("@V_ESTADO", equiposambientes.V_ESTADO == null ? "" : equiposambientes.V_ESTADO);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);
                    while (sqlDataReader.Read())
                    {
                        EquiposAmbientes Obj = new EquiposAmbientes()
                        {
                            N_CODEQUIPOS = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            V_DESCRIPCION = sqlDataReader[1].ToString(),
                            V_TIPO = sqlDataReader[2].ToString(),
                            V_ESTADO = sqlDataReader[3].ToString(),
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
