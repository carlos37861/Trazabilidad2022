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
    public class ReporteDetEquiposAmbientesRepository : Repository, IReporteDetEquiposAmbientesRepository
    {
        public ReporteDetEquiposAmbientesRepository(SqlConnection context, SqlTransaction transaction)
        {
            _context = context;
            _transaction = transaction;
        }
        public async Task<int> AgregarReporteDetEquiposAmbientes(ReporteDetEquiposAmbientes objreportdetequiamb)
        {
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_INS_DETREPORTEQUIPOSAMBIENTE";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREPORTE", objreportdetequiamb.N_CODREPORTE);
                    command.Parameters.AddWithValue("@N_CODREINFO", objreportdetequiamb.N_CODREINFO);
                    command.Parameters.AddWithValue("@N_CODEQUIPOS", objreportdetequiamb.N_CODEQUIPOS);
                    command.Parameters.AddWithValue("@V_DESCRIPCION", objreportdetequiamb.V_DESCRIPCION == null ? "" : objreportdetequiamb.V_DESCRIPCION);
                    command.Parameters.AddWithValue("@V_TIPO", objreportdetequiamb.V_TIPO == null ? "" : objreportdetequiamb.V_TIPO);
                    command.Parameters.AddWithValue("@V_ESTADO", objreportdetequiamb.V_ESTADO == null ? "" : objreportdetequiamb.V_ESTADO);
                    return Convert.ToInt32(await command.ExecuteNonQueryAsync());
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }

        public async Task<IEnumerable<ReporteDetEquiposAmbientes>> ListarReporteDetEquiposAmbientes(ReporteDetEquiposAmbientes objreportdetequiamb)
        {
            List<ReporteDetEquiposAmbientes> List = new List<ReporteDetEquiposAmbientes>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LST_DETREPORTEQUIPOSAMBIENTE";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREPORTE", objreportdetequiamb.N_CODREPORTE);
                    command.Parameters.AddWithValue("@N_CODREINFO", objreportdetequiamb.N_CODREINFO);
                    command.Parameters.AddWithValue("@V_TIPO", objreportdetequiamb.V_TIPO);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);
                    while (sqlDataReader.Read())
                    {
                        ReporteDetEquiposAmbientes Obj = new ReporteDetEquiposAmbientes()
                        {
                            N_CODREPORTEQUIPOSAMBIENTE = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_CODREPORTE = Convert.ToInt32(sqlDataReader[1]),
                            N_CODREINFO = Convert.ToInt32(sqlDataReader[2]),
                            N_CODEQUIPOS = Convert.ToInt32(sqlDataReader[3]),
                            V_DESCRIPCION = sqlDataReader[4].ToString(),
                            V_TIPO = sqlDataReader[5].ToString(),
                            V_ESTADO = sqlDataReader[6].ToString(),

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
