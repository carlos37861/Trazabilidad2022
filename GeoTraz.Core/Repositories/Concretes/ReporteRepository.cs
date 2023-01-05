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
    public class ReporteRepository : Repository, IReporteRepository
    {
        public ReporteRepository(SqlConnection context, SqlTransaction transaction)
        {
            _context = context;
            _transaction = transaction;
        }
        public async Task<int> AgregarReporte(Reporte objReporte)
        {
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_INS_REPORTE";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREIN", objReporte.N_CODREIN);
                    command.Parameters.AddWithValue("@V_REALIZADOPOR", objReporte.V_REALIZADOPOR == null ? "" : objReporte.V_REALIZADOPOR);
                    command.Parameters.AddWithValue("@V_REVISADOPOR", objReporte.V_REVISADOPOR == null ? "" : objReporte.V_REVISADOPOR);
                    command.Parameters.AddWithValue("@V_FECHAREALIZADO", objReporte.V_FECHAREALIZADO == null ? "" : objReporte.V_FECHAREALIZADO);
                    command.Parameters.AddWithValue("@V_FECHAREVISADO", objReporte.V_FECHAREVISADO == null ? "" : objReporte.V_FECHAREVISADO);
                    command.Parameters.AddWithValue("@V_USUREGISTRO", objReporte.V_USUREGISTRO == null ? "" : objReporte.V_USUREGISTRO);
                    command.Parameters.AddWithValue("@V_RUC", objReporte.V_RUC == null ? "" : objReporte.V_RUC);
                    command.Parameters.AddWithValue("@V_PROVEEDOR", objReporte.V_PROVEEDOR == null ? "" : objReporte.V_PROVEEDOR);
                    command.Parameters.AddWithValue("@V_CODCONSECION", objReporte.V_CODCONSECION);
                    command.Parameters.AddWithValue("@V_NOMCONSECION", objReporte.V_NOMCONSECION);
                    command.Parameters.AddWithValue("@N_TMPH", objReporte.N_TMPH);
                    command.Parameters.AddWithValue("@N_TMPS", objReporte.N_TMPS);
                    command.Parameters.AddWithValue("@V_UBIGEO", objReporte.V_UBIGEO == null ? "" : objReporte.V_UBIGEO);
                    command.Parameters.AddWithValue("@V_NOMDERECHMINE", objReporte.V_NOMDERECHMINE == null ? "" : objReporte.V_NOMDERECHMINE);
                    command.Parameters.AddWithValue("@V_CODZONAREI", objReporte.V_CODZONAREI == null ? "" : objReporte.V_CODZONAREI);
                    command.Parameters.AddWithValue("@N_NORTE1", objReporte.N_NORTE1);
                    command.Parameters.AddWithValue("@N_ESTE1", objReporte.N_ESTE1);
                    command.Parameters.AddWithValue("@N_NORTE2", objReporte.N_NORTE2);
                    command.Parameters.AddWithValue("@N_ESTE2", objReporte.N_ESTE2);
                    command.Parameters.AddWithValue("@v_CODTIPOACT", objReporte.v_CODTIPOACT == null ? "" : objReporte.v_CODTIPOACT);
                    command.Parameters.AddWithValue("@V_FECREINFO", objReporte.V_FECREINFO == null ? "" : objReporte.V_FECREINFO);
                    command.Parameters.AddWithValue("@V_COMPONENT", objReporte.V_COMPONENT == null ? "" : objReporte.V_COMPONENT);
                    command.Parameters.AddWithValue("@v_CODZONACAMP", objReporte.v_CODZONACAMP == null ? "" : objReporte.v_CODZONACAMP);
                    command.Parameters.AddWithValue("@N_NORTEC", objReporte.N_NORTEC);
                    command.Parameters.AddWithValue("@N_ESTEC", objReporte.N_ESTEC);
                    command.Parameters.AddWithValue("@N_DIFCORDE", objReporte.N_DIFCORDE);
                    command.Parameters.AddWithValue("@N_SEDE", objReporte.N_SEDE);
                    command.Parameters.AddWithValue("@V_DESCRILABOR", objReporte.V_DESCRILABOR == null ? "" : objReporte.V_DESCRILABOR);
                    command.Parameters.AddWithValue("@N_CANTHOMBRE", objReporte.N_CANTHOMBRE);
                    command.Parameters.AddWithValue("@N_CANTMUJE", objReporte.N_CANTMUJE);
                    command.Parameters.AddWithValue("@N_TOTALTRAB", objReporte.N_TOTALTRAB);
                    command.Parameters.AddWithValue("@V_IGAFOMCORREC", objReporte.V_IGAFOMCORREC);
                    command.Parameters.AddWithValue("@V_IGAFOMPREV", objReporte.V_IGAFOMPREV);
                    command.Parameters.AddWithValue("@V_ESTADOIGAFOM", objReporte.V_ESTADOIGAFOM);
                    command.Parameters.AddWithValue("@V_RESULTADOS", objReporte.V_RESULTADOS);
                    command.Parameters.AddWithValue("@V_CONCLUSION", objReporte.V_CONCLUSION == null ? "" : objReporte.V_CONCLUSION);
                    command.Parameters.AddWithValue("@V_PROTOCOLO", objReporte.V_PROTOCOLO == null ? "" : objReporte.V_PROTOCOLO);
                    command.Parameters.AddWithValue("@N_VERSION", objReporte.N_VERSION);
                    command.Parameters.AddWithValue("@V_VERSIONPROTOCOLO", objReporte.V_VERSIONPROTOCOLO == null ? "" : objReporte.V_VERSIONPROTOCOLO);
                    command.Parameters.AddWithValue("@V_FECHAVERSION", objReporte.V_FECHAVERSION == null ? "" : objReporte.V_FECHAVERSION);
                    command.Parameters.AddWithValue("@V_SITUACIONINGEMMET", objReporte.V_SITUACIONINGEMMET == null ? "" : objReporte.V_SITUACIONINGEMMET);
                    command.Parameters.AddWithValue("@V_SITACIONDECMINERA", objReporte.V_SITACIONDECMINERA == null ? "" : objReporte.V_SITACIONDECMINERA);
                    command.Parameters.AddWithValue("@V_ANIO", objReporte.V_ANIO == null ? "" : objReporte.V_ANIO);
                    command.Parameters.AddWithValue("@V_MES", objReporte.V_MES == null ? "" : objReporte.V_MES);
                    command.Parameters.AddWithValue("@V_DESCUBICACION_PB", objReporte.V_DESCUBICACION_PB == null ? "" : objReporte.V_DESCUBICACION_PB);
                    return Convert.ToInt32(await command.ExecuteNonQueryAsync());
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }

        public async Task<IEnumerable<Reporte>> BuscarReporte(Reporte objReporte)
        {
            List<Reporte> List = new List<Reporte>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_GET_REPORTE";
                    command.Parameters.AddWithValue("@N_CODREPORTE", objReporte.N_CODREPORTE);
                    command.CommandType = CommandType.StoredProcedure;
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);

                    while (sqlDataReader.Read())
                    {
                        Reporte Obj = new Reporte()
                        {
                            N_CODREPORTE = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_CODREIN = sqlDataReader[1] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[1]),
                            V_REALIZADOPOR = sqlDataReader[2].ToString(),
                            V_REVISADOPOR = sqlDataReader[3].ToString(),
                            V_FECHAREALIZADO = sqlDataReader[4].ToString(),
                            V_FECHAREVISADO = sqlDataReader[5].ToString(),
                            V_FECCREACION = sqlDataReader[6].ToString(),
                            V_FECMODIF = sqlDataReader[7].ToString(),
                            V_USUREGISTRO = sqlDataReader[8].ToString(),
                            V_USUMODIF = sqlDataReader[9].ToString(),
                            V_ESTADO = sqlDataReader[10].ToString(),
                             V_RUC = sqlDataReader[11].ToString(),
                            V_PROVEEDOR = sqlDataReader[12].ToString(),
                            V_CODCONSECION = sqlDataReader[13].ToString(),
                            V_NOMCONSECION = sqlDataReader[14].ToString(),
                            N_TMPH = sqlDataReader[15] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[15]),
                            N_TMPS = sqlDataReader[16] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[16]),
                            V_UBIGEO = sqlDataReader[17].ToString(),
                            V_NOMDERECHMINE = sqlDataReader[18].ToString(),
                            V_CODZONAREI = sqlDataReader[19].ToString(),
                            N_NORTE1 = sqlDataReader[20] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[20]),
                            N_ESTE1 = sqlDataReader[21] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[21]),
                            N_NORTE2 = sqlDataReader[22] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[22]),
                            N_ESTE2 = sqlDataReader[23] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[23]),
                            v_CODTIPOACT = sqlDataReader[24].ToString(),
                            V_FECREINFO = sqlDataReader[25].ToString(),
                            V_COMPONENT = sqlDataReader[26].ToString(),
                            v_CODZONACAMP = sqlDataReader[27].ToString(),
                            N_NORTEC = sqlDataReader[28] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[28]),
                            N_ESTEC = sqlDataReader[29] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[29]),
                            N_DIFCORDE = sqlDataReader[30] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[30]),
                            N_SEDE = sqlDataReader[31] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[31]),
                            V_DESCRILABOR = sqlDataReader[32].ToString(),
                            N_CANTHOMBRE = sqlDataReader[33] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[33]),
                            N_CANTMUJE = sqlDataReader[34] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[34]),
                            N_TOTALTRAB = sqlDataReader[35] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[35]),
                            V_IGAFOMCORREC = sqlDataReader[36].ToString(),
                            V_IGAFOMPREV = sqlDataReader[37].ToString(),
                            V_ESTADOIGAFOM = sqlDataReader[38].ToString(),
                            V_RESULTADOS = sqlDataReader[39].ToString(),
                            V_CONCLUSION = sqlDataReader[40].ToString(),
                            V_PROTOCOLO = sqlDataReader[41].ToString(),
                            N_VERSION = sqlDataReader[42] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[42]),
                            //AGREGADO PARA CONTROL DE VERSION DE REPORTES
                            V_VERSIONPROTOCOLO = sqlDataReader[43].ToString(),
                            V_FECHAVERSION = sqlDataReader[44].ToString(),
                            V_SITUACIONINGEMMET = sqlDataReader[45].ToString(),
                            V_SITACIONDECMINERA = sqlDataReader[46].ToString(),
                            V_ANIO = sqlDataReader[47].ToString(),
                            V_MES = sqlDataReader[48].ToString(),
                            V_DESCUBICACION_PB = sqlDataReader[49].ToString()

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


        public async Task<IEnumerable<Reporte>> BuscarReporteId(Reporte objReporte)
        {
            List<Reporte> List = new List<Reporte>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LST_IDREPORT";
                    command.Parameters.AddWithValue("@N_CODREIN", objReporte.@N_CODREIN);
                    command.CommandType = CommandType.StoredProcedure;
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);

                    while (sqlDataReader.Read())
                    {
                        Reporte Obj = new Reporte()
                        {
                            N_CODREPORTE = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_CODREIN = sqlDataReader[1] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[1]),
                            V_REALIZADOPOR = sqlDataReader[2].ToString(),
                            V_REVISADOPOR = sqlDataReader[3].ToString(),
                            V_FECHAREALIZADO = sqlDataReader[4].ToString(),
                            V_FECHAREVISADO = sqlDataReader[5].ToString(),
                            V_FECCREACION = sqlDataReader[6].ToString(),
                            V_FECMODIF = sqlDataReader[7].ToString(),
                            V_USUREGISTRO = sqlDataReader[8].ToString(),
                            V_USUMODIF = sqlDataReader[9].ToString(),
                            V_ESTADO = sqlDataReader[10].ToString(),
                             V_RUC = sqlDataReader[11].ToString(),
                            V_PROVEEDOR = sqlDataReader[12].ToString(),
                            V_CODCONSECION = sqlDataReader[13].ToString(),
                            V_NOMCONSECION = sqlDataReader[14].ToString(),
                            N_TMPH = sqlDataReader[15] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[15]),
                            N_TMPS = sqlDataReader[16] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[16]),
                            V_UBIGEO = sqlDataReader[17].ToString(),
                            V_NOMDERECHMINE = sqlDataReader[18].ToString(),
                            V_CODZONAREI = sqlDataReader[19].ToString(),
                            N_NORTE1 = sqlDataReader[20] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[20]),
                            N_ESTE1 = sqlDataReader[21] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[21]),
                            N_NORTE2 = sqlDataReader[22] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[22]),
                            N_ESTE2 = sqlDataReader[23] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[23]),
                            v_CODTIPOACT = sqlDataReader[24].ToString(),
                            V_FECREINFO = sqlDataReader[25].ToString(),
                            V_COMPONENT = sqlDataReader[26].ToString(),
                            v_CODZONACAMP = sqlDataReader[27].ToString(),
                            N_NORTEC = sqlDataReader[28] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[28]),
                            N_ESTEC = sqlDataReader[29] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[29]),
                            N_DIFCORDE = sqlDataReader[30] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[30]),
                            N_SEDE = sqlDataReader[31] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[31]),
                            V_DESCRILABOR = sqlDataReader[32].ToString(),
                            N_CANTHOMBRE = sqlDataReader[33] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[33]),
                            N_CANTMUJE = sqlDataReader[34] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[34]),
                            N_TOTALTRAB = sqlDataReader[35] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[35]),
                            V_IGAFOMCORREC = sqlDataReader[36].ToString(),
                            V_IGAFOMPREV = sqlDataReader[37].ToString(),
                            V_ESTADOIGAFOM = sqlDataReader[38].ToString(),
                            V_RESULTADOS = sqlDataReader[39].ToString(),
                            V_CONCLUSION = sqlDataReader[40].ToString(),
                            V_PROTOCOLO= sqlDataReader[41].ToString(),
                            N_VERSION = sqlDataReader[42] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[42]),
                            //AGREGADO PARA CONTROL DE VERSION DE REPORTES
                            V_VERSIONPROTOCOLO = sqlDataReader[43].ToString(),
                            V_FECHAVERSION = sqlDataReader[44].ToString(),
                            V_SITUACIONINGEMMET = sqlDataReader[45].ToString(),
                            V_SITACIONDECMINERA = sqlDataReader[46].ToString(),
                            V_ANIO = sqlDataReader[47].ToString(),
                            V_MES = sqlDataReader[48].ToString(),
                            V_DESCUBICACION_PB = sqlDataReader[49].ToString()
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

        public async Task<IEnumerable<Reporte>> BuscarVersionReporte(Reporte objReporte)
        {
            List<Reporte> List = new List<Reporte>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LST_REPORTEVERSION";
                    command.Parameters.AddWithValue("@N_CODREIN", objReporte.@N_CODREIN);
                    command.CommandType = CommandType.StoredProcedure;
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);

                    while (sqlDataReader.Read())
                    {
                        Reporte Obj = new Reporte()
                        {
                            N_CODREPORTE = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_CODREIN = sqlDataReader[1] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[1]),
                            V_REALIZADOPOR = sqlDataReader[2].ToString(),
                            V_REVISADOPOR = sqlDataReader[3].ToString(),
                            V_FECHAREALIZADO = sqlDataReader[4].ToString(),
                            V_FECHAREVISADO = sqlDataReader[5].ToString(),
                            V_FECCREACION = sqlDataReader[6].ToString(),
                            V_FECMODIF = sqlDataReader[7].ToString(),
                            V_USUREGISTRO = sqlDataReader[8].ToString(),
                            V_USUMODIF = sqlDataReader[9].ToString(),
                            V_ESTADO = sqlDataReader[10].ToString(),
                            V_RUC = sqlDataReader[11].ToString(),
                            V_PROVEEDOR = sqlDataReader[12].ToString(),
                            V_CODCONSECION = sqlDataReader[13].ToString(),
                            V_NOMCONSECION = sqlDataReader[14].ToString(),
                            N_TMPH = sqlDataReader[15] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[15]),
                            N_TMPS = sqlDataReader[16] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[16]),
                            V_UBIGEO = sqlDataReader[17].ToString(),
                            V_NOMDERECHMINE = sqlDataReader[18].ToString(),
                            V_CODZONAREI = sqlDataReader[19].ToString(),
                            N_NORTE1 = sqlDataReader[20] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[20]),
                            N_ESTE1 = sqlDataReader[21] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[21]),
                            N_NORTE2 = sqlDataReader[22] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[22]),
                            N_ESTE2 = sqlDataReader[23] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[23]),
                            v_CODTIPOACT = sqlDataReader[24].ToString(),
                            V_FECREINFO = sqlDataReader[25].ToString(),
                            V_COMPONENT = sqlDataReader[26].ToString(),
                            v_CODZONACAMP = sqlDataReader[27].ToString(),
                            N_NORTEC = sqlDataReader[28] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[28]),
                            N_ESTEC = sqlDataReader[29] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[29]),
                            N_DIFCORDE = sqlDataReader[30] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[30]),
                            N_SEDE = sqlDataReader[31] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[31]),
                            V_DESCRILABOR = sqlDataReader[32].ToString(),
                            N_CANTHOMBRE = sqlDataReader[33] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[33]),
                            N_CANTMUJE = sqlDataReader[34] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[34]),
                            N_TOTALTRAB = sqlDataReader[35] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[35]),
                            V_IGAFOMCORREC = sqlDataReader[36].ToString(),
                            V_IGAFOMPREV = sqlDataReader[37].ToString(),
                            V_ESTADOIGAFOM = sqlDataReader[38].ToString(),
                            V_RESULTADOS = sqlDataReader[39].ToString(),
                            V_CONCLUSION = sqlDataReader[40].ToString(),
                            V_PROTOCOLO= sqlDataReader[41].ToString(),
                            N_VERSION = sqlDataReader[42] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[42]),
                            //AGREGADO PARA CONTROL DE VERSION DE REPORTES
                            V_VERSIONPROTOCOLO = sqlDataReader[43].ToString(),
                            V_FECHAVERSION = sqlDataReader[44].ToString(),
                            V_SITUACIONINGEMMET = sqlDataReader[45].ToString(),
                            V_SITACIONDECMINERA = sqlDataReader[46].ToString(),
                            V_ANIO = sqlDataReader[47].ToString(),
                            V_MES = sqlDataReader[48].ToString(),
                            V_DESCUBICACION_PB = sqlDataReader[49].ToString()
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
        public Task<int> EditarReporte(Reporte objReporte)
        {
            throw new NotImplementedException();
        }

        public async Task<int> EliminarReporte(Reporte reporte)
        {
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_DEL_REPORTE";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREPORTE", reporte.N_CODREPORTE);

                    return Convert.ToInt32(await command.ExecuteNonQueryAsync());

                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }

        }
        

        public async Task<int> EliminarReporteId(Reporte reporte)
        {
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_DEL_REPORTEID";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREIN", reporte.N_CODREIN);

                    return Convert.ToInt32(await command.ExecuteNonQueryAsync());

                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }

        public async Task<IEnumerable<Reporte>> ListarReporte()
        {
            List<Reporte> List = new List<Reporte>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LST_REPORT";
                    command.CommandType = CommandType.StoredProcedure;
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);

                    while (sqlDataReader.Read())
                    {
                        Reporte Obj = new Reporte()
                        {
                            N_CODREPORTE = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_CODREIN = sqlDataReader[1] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[1]),
                            V_REALIZADOPOR = sqlDataReader[2].ToString(),
                            V_REVISADOPOR = sqlDataReader[3].ToString(),
                            V_FECHAREALIZADO = sqlDataReader[4].ToString(),
                            V_FECHAREVISADO = sqlDataReader[5].ToString(),
                            V_FECCREACION = sqlDataReader[6].ToString(),
                            V_FECMODIF = sqlDataReader[7].ToString(),
                            V_USUREGISTRO = sqlDataReader[8].ToString(),
                            V_USUMODIF = sqlDataReader[9].ToString(),
                            V_ESTADO = sqlDataReader[10].ToString(),
                            V_RUC = sqlDataReader[11].ToString(),
                            V_PROVEEDOR= sqlDataReader[12].ToString(),
                            V_CODCONSECION = sqlDataReader[13].ToString(),
                            V_NOMCONSECION = sqlDataReader[14].ToString(),
                            N_VERSION = sqlDataReader[15] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[15]),
                            N_SEDE = sqlDataReader[16] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[16]),
                            V_RESULTADOS= sqlDataReader[17].ToString(),
                            V_DESCUBICACION_PB=sqlDataReader[18].ToString()

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

        public async Task<IEnumerable<Reporte>> FiltrarReporte(Reporte reporte)
        {
            List<Reporte> List = new List<Reporte>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LST_FILTRARREPORTE";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@V_RUC", reporte.V_RUC);
                    command.Parameters.AddWithValue("@V_PROVEEDOR", reporte.V_PROVEEDOR);
                    command.Parameters.AddWithValue("@V_CODCONSECION", reporte.V_CODCONSECION);
                    command.Parameters.AddWithValue("@V_NOMCONSECION", reporte.V_NOMCONSECION);
                    command.Parameters.AddWithValue("@V_REALIZADOPOR", reporte.V_REALIZADOPOR);
                    command.Parameters.AddWithValue("@V_REVISADOPOR", reporte.V_REVISADOPOR);
                    command.Parameters.AddWithValue("@V_FECHAREALIZADO", reporte.V_FECHAREALIZADO);
                    command.Parameters.AddWithValue("@V_FECHAREVISADO", reporte.V_FECHAREVISADO);
                    command.Parameters.AddWithValue("@V_FECCREACION", reporte.V_FECCREACION);
                    command.Parameters.AddWithValue("@N_SEDE", reporte.N_SEDE);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);

                    while (sqlDataReader.Read())
                    {
                        Reporte Obj = new Reporte()
                        {
                            N_CODREPORTE = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_CODREIN = sqlDataReader[1] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[1]),
                            V_REALIZADOPOR = sqlDataReader[2].ToString(),
                            NOMBRE_REALIZADOPOR = sqlDataReader[3].ToString(),
                            V_REVISADOPOR = sqlDataReader[4].ToString(),
                            NOMBRE_REVISADOPOR = sqlDataReader[5].ToString(),
                            V_FECHAREALIZADO = sqlDataReader[6].ToString(),
                            V_FECHAREVISADO = sqlDataReader[7].ToString(),    
                            V_FECCREACION = sqlDataReader[8].ToString(),
                            V_FECMODIF = sqlDataReader[9].ToString(),
                            V_USUREGISTRO = sqlDataReader[10].ToString(),
                            V_USUMODIF = sqlDataReader[11].ToString(),
                            V_ESTADO = sqlDataReader[12].ToString(),
                            V_RUC = sqlDataReader[13].ToString(),
                            V_PROVEEDOR = sqlDataReader[14].ToString(),
                            V_CODCONSECION = sqlDataReader[15].ToString(),
                            V_NOMCONSECION = sqlDataReader[16].ToString(),
                            N_VERSION = sqlDataReader[17] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[17]),
                            N_SEDE = sqlDataReader[18] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[18]),
                            V_RESULTADOS = sqlDataReader[19].ToString(),
                            N_TMPH= sqlDataReader[20] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[20]),
                            N_TMPS = sqlDataReader[21] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[21]),
                            V_UBIGEO= sqlDataReader[22].ToString(),
                            V_NOMDERECHMINE = sqlDataReader[23].ToString(),
                            V_CODZONAREI = sqlDataReader[24].ToString(),
                            N_NORTE1= sqlDataReader[25] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[25]),
                            N_ESTE1= sqlDataReader[26] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[26]),
                            N_NORTE2= sqlDataReader[27] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[27]),
                            N_ESTE2= sqlDataReader[28] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[28]),
                            v_CODTIPOACT = sqlDataReader[29].ToString(),
                            V_FECREINFO = sqlDataReader[30].ToString(),
                            V_COMPONENT = sqlDataReader[31].ToString(),
                            v_CODZONACAMP = sqlDataReader[32].ToString(),
                            N_NORTEC = sqlDataReader[33] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[33]),
                            N_ESTEC = sqlDataReader[34] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[34]),
                            N_DIFCORDE = sqlDataReader[35] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[35]),
                            V_DESCRILABOR= sqlDataReader[36].ToString(),
                            N_CANTHOMBRE = sqlDataReader[37] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[37]),
                            N_CANTMUJE = sqlDataReader[38] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[38]),
                            N_TOTALTRAB = sqlDataReader[39] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[39]),
                            V_IGAFOMCORREC = sqlDataReader[40].ToString(),
                            V_IGAFOMPREV = sqlDataReader[41].ToString(),
                            V_ESTADOIGAFOM = sqlDataReader[42].ToString(),
                            V_CONCLUSION = sqlDataReader[43].ToString(),
                            V_PROTOCOLO = sqlDataReader[44].ToString(),
                            V_VERSIONPROTOCOLO = sqlDataReader[45].ToString(),
                            V_FECHAVERSION = sqlDataReader[46].ToString(),
                            V_SITUACIONINGEMMET = sqlDataReader[47].ToString(),
                            V_SITACIONDECMINERA = sqlDataReader[48].ToString(),
                            V_ANIO = sqlDataReader[49].ToString(),
                            V_MES = sqlDataReader[50].ToString(),
                            V_CARGOCORRECT= sqlDataReader[51] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[51]),
                            V_INFOMERCORRECT= sqlDataReader[52] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[52]),
                            V_OTROSCORRECT= sqlDataReader[53] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[53]),
                            V_CARGOPREVENT= sqlDataReader[54] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[54]),
                            V_INFORMEPREVENT= sqlDataReader[55] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[55]),
                            V_OTROSPREVENT= sqlDataReader[56] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[56]),
                            V_CARGOLEVSUS= sqlDataReader[57] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[57]),
                            V_CARGODECMINERA= sqlDataReader[58] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[58]),
                            
                            V_2021SEM1 = sqlDataReader[59] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[59]),
                            V_2021SEM2 = sqlDataReader[60] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[60]),
                            V_2022SEM1 = sqlDataReader[61] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[61]),
                            V_2022SEM2 = sqlDataReader[62] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[62]),

                            V_CONTRATO = sqlDataReader[63] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[63]),

                            V_CONTRATOEXPLOTACION = sqlDataReader[64] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[64]),
                            V_CONTRATOCESION = sqlDataReader[65] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[65]),
                            V_CONTRATOTERRESUPERFICIAL = sqlDataReader[66] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[66]),

                            V_RESOLUCION = sqlDataReader[67] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[67]),
                            V_OTROSDOCS= sqlDataReader[68] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[68]),
                            V_RESOLUCIONIGAFOM= sqlDataReader[69] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[69]),
                            V_DESCUBICACION_PB = sqlDataReader[70].ToString(),
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

        public async Task<IEnumerable<Reporte>> FiltrarReporteDistinct()
        {
            List<Reporte> List = new List<Reporte>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LST_REPORTEDISTINCT";
                    command.CommandType = CommandType.StoredProcedure;
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);

                    while (sqlDataReader.Read())
                    {
                        Reporte Obj = new Reporte()
                        {
                            N_CODREIN = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
  
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
