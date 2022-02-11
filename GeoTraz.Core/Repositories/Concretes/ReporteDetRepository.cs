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
    public class ReporteDetRepository : Repository, IReporteDetRepository
    {
        public ReporteDetRepository(SqlConnection context, SqlTransaction transaction)
        {
            _context = context;
            _transaction = transaction;
        }

        public async Task<int> AgregarReporteDet(ReporteDet objReportedet)
        {
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_INS_REPORTDET";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREPORTE", objReportedet.N_CODREPORTE);
                    command.Parameters.AddWithValue("@N_CODREIN", objReportedet.N_CODREIN);
                    command.Parameters.AddWithValue("@V_TIPOIMAG", objReportedet.V_TIPOIMAG == null ? "" : objReportedet.V_TIPOIMAG);
                    command.Parameters.AddWithValue("@V_NOMBRE", objReportedet.V_NOMBRE == null ? "" : objReportedet.V_NOMBRE);
                    command.Parameters.AddWithValue("@V_RUTA", objReportedet.V_RUTA == null ? "" : objReportedet.V_RUTA);
                    command.Parameters.AddWithValue("@N_CODARCHIVO", objReportedet.N_CODARCHIVO);
                    return Convert.ToInt32(await command.ExecuteNonQueryAsync());
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }

        public Task<IEnumerable<ReporteDet>> BuscarReporteDet(ReporteDet reporteDet)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<ReporteDet>> Listar4ReporteDet(ReporteDet reporteDet)
        {
            List<ReporteDet> List = new List<ReporteDet>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LST_4REPORTDET";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREPORTE", reporteDet.N_CODREPORTE);
                    command.Parameters.AddWithValue("@V_TIPOIMAG", reporteDet.V_TIPOIMAG);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);
                    while (sqlDataReader.Read())
                    {
                        ReporteDet Obj = new ReporteDet()
                        {
                            N_CODDETREPORTE = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_CODREPORTE = Convert.ToInt32(sqlDataReader[1]),
                            N_CODREIN = Convert.ToInt32(sqlDataReader[2]),
                            V_TIPOIMAG = sqlDataReader[3].ToString(),
                            V_NOMBRE = sqlDataReader[4].ToString(),
                            V_RUTA = sqlDataReader[5].ToString(),
                            N_CODARCHIVO = sqlDataReader[6] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[6])

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

        public async Task<IEnumerable<ReporteDet>> ListarReporteDet(ReporteDet reporteDet)
        {
            List<ReporteDet> List = new List<ReporteDet>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LST_REPORTDET";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREPORTE", reporteDet.N_CODREPORTE);
                    command.Parameters.AddWithValue("@V_TIPOIMAG", reporteDet.V_TIPOIMAG);
                    command.Parameters.AddWithValue("@N_CODREIN", reporteDet.N_CODREIN);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);
                    while (sqlDataReader.Read())
                    {
                        ReporteDet Obj = new ReporteDet()
                        {
                            N_CODDETREPORTE = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_CODREPORTE = Convert.ToInt32(sqlDataReader[1]),
                            N_CODREIN = Convert.ToInt32(sqlDataReader[2]),
                            V_TIPOIMAG = sqlDataReader[3].ToString(),
                            V_NOMBRE = sqlDataReader[4].ToString(),
                            V_RUTA = sqlDataReader[5].ToString(),
                            N_CODARCHIVO = sqlDataReader[6] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[6])

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
        public Task<int> EditarReporteDet(ReporteDet objReportedet)
        {
            throw new NotImplementedException();
        }

        public Task<int> EliminarReporteDet(ReporteDet reportedet)
        {
            throw new NotImplementedException();
        }

        public Task<int> EliminarReporteIdDet(ReporteDet reportedet)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ReporteDet>> FiltrarReporteDet(ReporteDet reporteDet)
        {
            throw new NotImplementedException();
        }


    }
}
