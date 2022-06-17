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
    public class ReinfoRepository : Repository, IReinfoRepository
    {
        public ReinfoRepository(SqlConnection context, SqlTransaction transaction)
        {
            _context = context;
            _transaction = transaction;
        }
        public async Task<int> AgregarReinfo(Reinfo objReinfo)
        {
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_INS_REINFO";
                    command.CommandType = CommandType.StoredProcedure;
                    //command.Parameters.AddWithValue("@N_CODREINFO", objReinfo.N_CODREINFO);
                    command.Parameters.AddWithValue("@V_RUC", objReinfo.V_RUC == null ? "" : objReinfo.V_RUC);
                    command.Parameters.AddWithValue("@V_PROVEEDOR", objReinfo.V_PROVEEDOR == null ? "" : objReinfo.V_PROVEEDOR);
                    command.Parameters.AddWithValue("@V_CODCONSECION", objReinfo.V_CODCONSECION);
                    command.Parameters.AddWithValue("@V_NOMCONSECION", objReinfo.V_NOMCONSECION);
                    command.Parameters.AddWithValue("@N_TMPH", objReinfo.N_TMPH);
                    command.Parameters.AddWithValue("@N_TMPS", objReinfo.N_TMPS);
                    command.Parameters.AddWithValue("@V_UBIGEO", objReinfo.V_UBIGEO == null ? "" : objReinfo.V_UBIGEO);
                    command.Parameters.AddWithValue("@V_NOMDERECHMINE", objReinfo.V_NOMDERECHMINE == null ? "" : objReinfo.V_NOMDERECHMINE);
                    command.Parameters.AddWithValue("@V_CODZONAREI", objReinfo.V_CODZONAREI == null ? "" : objReinfo.V_CODZONAREI);
                    command.Parameters.AddWithValue("@N_NORTE1", objReinfo.N_NORTE1);
                    command.Parameters.AddWithValue("@N_ESTE1", objReinfo.N_ESTE1);
                    command.Parameters.AddWithValue("@N_NORTE2", objReinfo.N_NORTE2);
                    command.Parameters.AddWithValue("@N_ESTE2", objReinfo.N_ESTE2);
                    command.Parameters.AddWithValue("@v_CODTIPOACT", objReinfo.v_CODTIPOACT == null ? "" : objReinfo.v_CODTIPOACT);
                    command.Parameters.AddWithValue("@V_FECREINFO", objReinfo.V_FECREINFO == null ? "" : objReinfo.V_FECREINFO);
                    command.Parameters.AddWithValue("@V_COMPONENT", objReinfo.V_COMPONENT == null ? "" : objReinfo.V_COMPONENT);
                    command.Parameters.AddWithValue("@v_CODZONACAMP", objReinfo.v_CODZONACAMP == null ? "" : objReinfo.v_CODZONACAMP);
                    command.Parameters.AddWithValue("@N_NORTEC", objReinfo.N_NORTEC);
                    command.Parameters.AddWithValue("@N_ESTEC", objReinfo.N_ESTEC);
                    command.Parameters.AddWithValue("@N_DIFCORDE", objReinfo.N_DIFCORDE);
                    command.Parameters.AddWithValue("@N_SEDE", objReinfo.N_SEDE);
                    command.Parameters.AddWithValue("@V_DESCRILABOR", objReinfo.V_DESCRILABOR == null ? "" : objReinfo.V_DESCRILABOR);
                    command.Parameters.AddWithValue("@N_CANTHOMBRE", objReinfo.N_CANTHOMBRE);
                    command.Parameters.AddWithValue("@N_CANTMUJE", objReinfo.N_CANTMUJE);
                    command.Parameters.AddWithValue("@N_TOTALTRAB", objReinfo.N_TOTALTRAB);
                    command.Parameters.AddWithValue("@V_IGAFOMCORREC", objReinfo.V_IGAFOMCORREC);
                    command.Parameters.AddWithValue("@V_IGAFOMPREV", objReinfo.V_IGAFOMPREV);
                    command.Parameters.AddWithValue("@V_ESTADOIGAFOM", objReinfo.V_ESTADOIGAFOM);
                    command.Parameters.AddWithValue("@V_RESULTADOS", objReinfo.V_RESULTADOS);
                    command.Parameters.AddWithValue("@V_CONCLUSION", objReinfo.V_CONCLUSION == null ? "" : objReinfo.V_CONCLUSION);
                    command.Parameters.AddWithValue("@V_USUREGISTRO", objReinfo.V_USUREGISTRO == null ? "" : objReinfo.V_USUREGISTRO);
                    command.Parameters.AddWithValue("@V_ESTADO", objReinfo.V_ESTADO);
                    command.Parameters.AddWithValue("@V_SITUACIONINGEMMET", objReinfo.V_SITUACIONINGEMMET == null ? "" : objReinfo.V_SITUACIONINGEMMET);
                    command.Parameters.AddWithValue("@V_SITACIONDECMINERA", objReinfo.V_SITACIONDECMINERA == null ? "" : objReinfo.V_SITACIONDECMINERA);


                    return Convert.ToInt32(await command.ExecuteNonQueryAsync());
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }

        }

        public async Task<int> EditarReinfo(Reinfo objReinfo)
        {
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_UPD_REINFO";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREINFO", objReinfo.N_CODREINFO);
                    command.Parameters.AddWithValue("@V_RUC", objReinfo.V_RUC);
                    command.Parameters.AddWithValue("@V_CODCONSECION", objReinfo.V_CODCONSECION);
                    command.Parameters.AddWithValue("@V_NOMCONSECION", objReinfo.V_NOMCONSECION);
                    command.Parameters.AddWithValue("@N_TMPH", objReinfo.N_TMPH);
                    command.Parameters.AddWithValue("@N_TMPS", objReinfo.N_TMPS);
                    command.Parameters.AddWithValue("@V_UBIGEO", objReinfo.V_UBIGEO);
                    command.Parameters.AddWithValue("@V_NOMDERECHMINE", objReinfo.V_NOMDERECHMINE == null ? "" : objReinfo.V_NOMDERECHMINE);
                    command.Parameters.AddWithValue("@V_CODZONAREI", objReinfo.V_CODZONAREI == null ? "" : objReinfo.V_CODZONAREI);
                    command.Parameters.AddWithValue("@N_NORTE1", objReinfo.N_NORTE1);
                    command.Parameters.AddWithValue("@N_ESTE1", objReinfo.N_ESTE1);
                    command.Parameters.AddWithValue("@N_NORTE2", objReinfo.N_NORTE2);
                    command.Parameters.AddWithValue("@N_ESTE2", objReinfo.N_ESTE2);
                    command.Parameters.AddWithValue("@v_CODTIPOACT", objReinfo.v_CODTIPOACT == null ? "" : objReinfo.v_CODTIPOACT);
                    command.Parameters.AddWithValue("@V_FECREINFO", objReinfo.V_FECREINFO == null ? "" : objReinfo.V_FECREINFO);
                    command.Parameters.AddWithValue("@V_COMPONENT", objReinfo.V_COMPONENT == null ? "" : objReinfo.V_COMPONENT);
                    command.Parameters.AddWithValue("@v_CODZONACAMP", objReinfo.v_CODZONACAMP == null ? "" : objReinfo.v_CODZONACAMP);
                    command.Parameters.AddWithValue("@N_NORTEC", objReinfo.N_NORTEC);
                    command.Parameters.AddWithValue("@N_ESTEC", objReinfo.N_ESTEC);
                    command.Parameters.AddWithValue("@N_DIFCORDE", objReinfo.N_DIFCORDE);
                    command.Parameters.AddWithValue("@N_SEDE", objReinfo.N_SEDE);
                    command.Parameters.AddWithValue("@V_DESCRILABOR", objReinfo.V_DESCRILABOR == null ? "" : objReinfo.V_DESCRILABOR);
                    command.Parameters.AddWithValue("@N_CANTHOMBRE", objReinfo.N_CANTHOMBRE);
                    command.Parameters.AddWithValue("@N_CANTMUJE", objReinfo.N_CANTMUJE);
                    command.Parameters.AddWithValue("@N_TOTALTRAB", objReinfo.N_TOTALTRAB);
                    command.Parameters.AddWithValue("@V_IGAFOMCORREC", objReinfo.V_IGAFOMCORREC);
                    command.Parameters.AddWithValue("@V_IGAFOMPREV", objReinfo.V_IGAFOMPREV);
                    command.Parameters.AddWithValue("@V_ESTADOIGAFOM", objReinfo.V_ESTADOIGAFOM);
                    command.Parameters.AddWithValue("@V_RESULTADOS", objReinfo.V_RESULTADOS);
                    command.Parameters.AddWithValue("@V_CONCLUSION", objReinfo.V_CONCLUSION == null ? "" : objReinfo.V_CONCLUSION);
                    command.Parameters.AddWithValue("@V_USUMODIF","PRUEBA" /*objReinfo.V_USUMODIF*/);
                    command.Parameters.AddWithValue("@V_ESTADO", objReinfo.V_ESTADO);
                    command.Parameters.AddWithValue("@V_SITUACIONINGEMMET", objReinfo.V_SITUACIONINGEMMET == null ? "" : objReinfo.V_SITUACIONINGEMMET);
                    command.Parameters.AddWithValue("@V_SITACIONDECMINERA", objReinfo.V_SITACIONDECMINERA == null ? "" : objReinfo.V_SITACIONDECMINERA);
                    return Convert.ToInt32(await command.ExecuteNonQueryAsync());

                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }

        }

        public async Task<int> EliminarReinfo(Reinfo reinfo)
        {
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_DEL_REINFO";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREINFO", reinfo.N_CODREINFO);

                    return Convert.ToInt32(await command.ExecuteNonQueryAsync());

                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }

        }

        public async Task<IEnumerable<Reinfo>> ListarReinfo()
        {
            List<Reinfo> List = new List<Reinfo>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LST_REINFO";
                    command.CommandType = CommandType.StoredProcedure;
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);

                    while (sqlDataReader.Read())
                    {
                        Reinfo Obj = new Reinfo()
                        {
                            N_CODREINFO = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            V_RUC = sqlDataReader[1].ToString(),
                            V_PROVEEDOR = sqlDataReader[2].ToString(),
                            V_CODCONSECION = sqlDataReader[3].ToString(),
                            V_NOMCONSECION = sqlDataReader[4].ToString(),
                            N_TMPH = sqlDataReader[5] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[5]),
                            N_TMPS = sqlDataReader[6] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[6]),
                            V_UBIGEO = sqlDataReader[7].ToString(),
                            V_NOMDERECHMINE = sqlDataReader[8].ToString(),
                            V_CODZONAREI = sqlDataReader[9].ToString(),
                            N_NORTE1 = sqlDataReader[10] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[10]),
                            N_ESTE1 = sqlDataReader[11] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[11]),
                            N_NORTE2 = sqlDataReader[12] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[12]),
                            N_ESTE2 = sqlDataReader[13] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[13]),
                            v_CODTIPOACT = sqlDataReader[14].ToString(),
                            V_FECREINFO = sqlDataReader[15].ToString(),
                            V_COMPONENT = sqlDataReader[16].ToString(),
                            v_CODZONACAMP = sqlDataReader[17].ToString(),
                            N_NORTEC = sqlDataReader[18] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[18]),
                            N_ESTEC = sqlDataReader[19] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[19]),
                            N_DIFCORDE = sqlDataReader[20] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[20]),
                            N_SEDE = sqlDataReader[21] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[21]),
                            V_DESCRILABOR = sqlDataReader[22].ToString(),
                            N_CANTHOMBRE = sqlDataReader[23] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[23]),
                            N_CANTMUJE = sqlDataReader[24] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[24]),
                            N_TOTALTRAB = sqlDataReader[25] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[25]),
                            V_IGAFOMCORREC = sqlDataReader[26].ToString(),
                            V_IGAFOMPREV = sqlDataReader[27].ToString(),
                            V_ESTADOIGAFOM = sqlDataReader[28].ToString(),
                            V_RESULTADOS = sqlDataReader[29].ToString(),
                            V_CONCLUSION = sqlDataReader[30].ToString(),
                            V_FECCREACION = sqlDataReader[31].ToString(),
                            V_FECMODIF = sqlDataReader[32].ToString(),
                            V_USUREGISTRO = sqlDataReader[33].ToString(),
                            V_USUMODIF = sqlDataReader[34].ToString(),
                            V_ESTADO = sqlDataReader[35].ToString(),
                            V_SITUACIONINGEMMET = sqlDataReader[36].ToString(),
                            V_SITACIONDECMINERA = sqlDataReader[37].ToString(),
                            V_CARGOCORRECT = sqlDataReader[38] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[38]),
                            V_INFOMERCORRECT = sqlDataReader[39] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[39]),
                            V_OTROSCORRECT = sqlDataReader[40] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[40]),
                            V_CARGOPREVENT = sqlDataReader[41] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[41]),
                            V_INFORMEPREVENT = sqlDataReader[42] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[42]),
                            V_OTROSPREVENT = sqlDataReader[43] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[43]),
                            V_CARGOLEVSUS = sqlDataReader[44] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[44]),
                            V_CARGODECMINERA = sqlDataReader[45] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[45]),
                            V_CONTRATO = sqlDataReader[46] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[46]),
                            V_RESOLUCION = sqlDataReader[47] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[47]),
                            V_OTROSDOCS = sqlDataReader[48] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[48]),
                            V_RESOLUCIONIGAFOM = sqlDataReader[49] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[49]),
                            V_2021SEM1= sqlDataReader[50] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[50]),
                            V_2021SEM2 = sqlDataReader[51] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[51]),
                            V_2022SEM1 = sqlDataReader[52] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[52]),
                            V_2022SEM2 = sqlDataReader[53] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[53]),
                            V_CONTRATOEXPLOTACION = sqlDataReader[54] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[54]),
                            V_CONTRATOCESION = sqlDataReader[55] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[55]),
                            V_CONTRATOTERRESUPERFICIAL = sqlDataReader[56] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[56]),
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

        public async Task<IEnumerable<Reinfo>> BuscarIdReinfo(Reinfo reinfo)
        {
            List<Reinfo> List = new List<Reinfo>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_GET_REINFOID";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@V_RUC", reinfo.V_RUC);
                    command.Parameters.AddWithValue("@V_CODCONSECION", reinfo.V_CODCONSECION);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);

                    while (sqlDataReader.Read())
                    {
                        Reinfo Obj = new Reinfo()
                        {
                            N_CODREINFO = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            V_RUC = sqlDataReader[1].ToString(),
                            V_PROVEEDOR = sqlDataReader[2].ToString(),
                            V_CODCONSECION = sqlDataReader[3].ToString(),
                            V_NOMCONSECION = sqlDataReader[4].ToString(),
                            N_TMPH = sqlDataReader[5] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[5]),
                            N_TMPS = sqlDataReader[6] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[6]),
                            V_UBIGEO = sqlDataReader[7].ToString(),
                            V_NOMDERECHMINE = sqlDataReader[8].ToString(),
                            V_CODZONAREI = sqlDataReader[9].ToString(),
                            N_NORTE1 = sqlDataReader[10] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[10]),
                            N_ESTE1 = sqlDataReader[11] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[11]),
                            N_NORTE2 = sqlDataReader[12] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[12]),
                            N_ESTE2 = sqlDataReader[13] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[13]),
                            v_CODTIPOACT = sqlDataReader[14].ToString(),
                            V_FECREINFO = sqlDataReader[15].ToString(),
                            V_COMPONENT = sqlDataReader[16].ToString(),
                            v_CODZONACAMP = sqlDataReader[17].ToString(),
                            N_NORTEC = sqlDataReader[18] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[18]),
                            N_ESTEC = sqlDataReader[19] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[19]),
                            N_DIFCORDE = sqlDataReader[20] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[20]),
                            N_SEDE = sqlDataReader[21] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[21]),
                            V_DESCRILABOR = sqlDataReader[22].ToString(),
                            N_CANTHOMBRE = sqlDataReader[23] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[23]),
                            N_CANTMUJE = sqlDataReader[24] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[24]),
                            N_TOTALTRAB = sqlDataReader[25] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[25]),
                            V_IGAFOMCORREC = sqlDataReader[26].ToString(),
                            V_IGAFOMPREV = sqlDataReader[27].ToString(),
                            V_ESTADOIGAFOM = sqlDataReader[28].ToString(),
                            V_RESULTADOS = sqlDataReader[29].ToString(),
                            V_CONCLUSION = sqlDataReader[30].ToString(),
                            V_FECCREACION = sqlDataReader[31].ToString(),
                            V_FECMODIF = sqlDataReader[32].ToString(),
                            V_USUREGISTRO = sqlDataReader[33].ToString(),
                            V_USUMODIF = sqlDataReader[34].ToString(),
                            V_ESTADO = sqlDataReader[35].ToString()

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

        public async Task<IEnumerable<Reinfo>> BuscarReinfo(Reinfo reinfo)
        {
            List<Reinfo> List = new List<Reinfo>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_GET_REINFO";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREIN", reinfo.N_CODREINFO);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);

                    while (sqlDataReader.Read())
                    {
                        Reinfo Obj = new Reinfo()
                        {
                            N_CODREINFO = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            V_RUC = sqlDataReader[1].ToString(),
                            V_PROVEEDOR = sqlDataReader[2].ToString(),
                            V_CODCONSECION = sqlDataReader[3].ToString(),
                            V_NOMCONSECION = sqlDataReader[4].ToString(),
                            N_TMPH = sqlDataReader[5] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[5]),
                            N_TMPS = sqlDataReader[6] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[6]),
                            V_UBIGEO = sqlDataReader[7].ToString(),
                            V_NOMDERECHMINE = sqlDataReader[8].ToString(),
                            V_CODZONAREI = sqlDataReader[9].ToString(),
                            N_NORTE1 = sqlDataReader[10] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[10]),
                            N_ESTE1 = sqlDataReader[11] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[11]),
                            N_NORTE2 = sqlDataReader[12] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[12]),
                            N_ESTE2 = sqlDataReader[13] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[13]),
                            v_CODTIPOACT = sqlDataReader[14].ToString(),
                            V_FECREINFO = sqlDataReader[15].ToString(),
                            V_COMPONENT = sqlDataReader[16].ToString(),
                            v_CODZONACAMP = sqlDataReader[17].ToString(),
                            N_NORTEC = sqlDataReader[18] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[18]),
                            N_ESTEC = sqlDataReader[19] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[19]),
                            N_DIFCORDE = sqlDataReader[20] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[20]),
                            N_SEDE = sqlDataReader[21] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[21]),
                            V_DESCRILABOR = sqlDataReader[22].ToString(),
                            N_CANTHOMBRE = sqlDataReader[23] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[23]),
                            N_CANTMUJE = sqlDataReader[24] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[24]),
                            N_TOTALTRAB = sqlDataReader[25] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[25]),
                            V_IGAFOMCORREC = sqlDataReader[26].ToString(),
                            V_IGAFOMPREV = sqlDataReader[27].ToString(),
                            V_ESTADOIGAFOM = sqlDataReader[28].ToString(),
                            V_RESULTADOS = sqlDataReader[29].ToString(),
                            V_CONCLUSION = sqlDataReader[30].ToString(),
                            V_FECCREACION = sqlDataReader[31].ToString(),
                            V_FECMODIF = sqlDataReader[32].ToString(),
                            V_USUREGISTRO = sqlDataReader[33].ToString(),
                            V_USUMODIF = sqlDataReader[34].ToString(),
                            V_ESTADO = sqlDataReader[35].ToString(),
                            V_SITUACIONINGEMMET = sqlDataReader[36].ToString(),
                            V_SITACIONDECMINERA = sqlDataReader[37].ToString()

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

        public async Task<IEnumerable<Reinfo>> FiltrarReinfo(Reinfo reinfo)
        {
            List<Reinfo> List = new List<Reinfo>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LIST_FILTRARREINFO";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@V_RUC", reinfo.V_RUC);
                    command.Parameters.AddWithValue("@V_PROVEEDOR", reinfo.V_PROVEEDOR);
                    command.Parameters.AddWithValue("@V_CODCONSECION", reinfo.V_CODCONSECION);
                    command.Parameters.AddWithValue("@V_NOMCONSECION", reinfo.V_NOMCONSECION);
                    command.Parameters.AddWithValue("@V_NOMDERECHMINE", reinfo.V_NOMDERECHMINE);
                    command.Parameters.AddWithValue("@V_FECREINFO", reinfo.V_FECREINFO);
                    command.Parameters.AddWithValue("@V_RESULTADOS", reinfo.V_RESULTADOS);
                    command.Parameters.AddWithValue("@N_SEDE", reinfo.N_SEDE);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);

                    while (sqlDataReader.Read())
                    {
                        Reinfo Obj = new Reinfo()
                        {
                            N_CODREINFO = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            V_RUC = sqlDataReader[1].ToString(),
                            V_PROVEEDOR = sqlDataReader[2].ToString(),
                            V_CODCONSECION = sqlDataReader[3].ToString(),
                            V_NOMCONSECION = sqlDataReader[4].ToString(),
                            N_TMPH = sqlDataReader[5] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[5]),
                            N_TMPS = sqlDataReader[6] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[6]),
                            V_UBIGEO = sqlDataReader[7].ToString(),
                            V_NOMDERECHMINE = sqlDataReader[8].ToString(),
                            V_CODZONAREI = sqlDataReader[9].ToString(),
                            N_NORTE1 = sqlDataReader[10] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[10]),
                            N_ESTE1 = sqlDataReader[11] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[11]),
                            N_NORTE2 = sqlDataReader[12] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[12]),
                            N_ESTE2 = sqlDataReader[13] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[13]),
                            v_CODTIPOACT = sqlDataReader[14].ToString(),
                            V_FECREINFO = sqlDataReader[15].ToString(),
                            V_COMPONENT = sqlDataReader[16].ToString(),
                            v_CODZONACAMP = sqlDataReader[17].ToString(),
                            N_NORTEC = sqlDataReader[18] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[18]),
                            N_ESTEC = sqlDataReader[19] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[19]),
                            N_DIFCORDE = sqlDataReader[20] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[20]),
                            N_SEDE = sqlDataReader[21] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[21]),
                            V_DESCRILABOR = sqlDataReader[22].ToString(),
                            N_CANTHOMBRE = sqlDataReader[23] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[23]),
                            N_CANTMUJE = sqlDataReader[24] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[24]),
                            N_TOTALTRAB = sqlDataReader[25] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[25]),
                            V_IGAFOMCORREC = sqlDataReader[26].ToString(),
                            V_IGAFOMPREV = sqlDataReader[27].ToString(),
                            V_ESTADOIGAFOM = sqlDataReader[28].ToString(),
                            V_RESULTADOS = sqlDataReader[29].ToString(),
                            V_CONCLUSION = sqlDataReader[30].ToString(),
                            V_FECCREACION = sqlDataReader[31].ToString(),
                            V_FECMODIF = sqlDataReader[32].ToString(),
                            V_USUREGISTRO = sqlDataReader[33].ToString(),
                            V_USUMODIF = sqlDataReader[34].ToString(),
                            V_ESTADO = sqlDataReader[35].ToString(),
                            V_SITUACIONINGEMMET = sqlDataReader[36].ToString(),
                            V_SITACIONDECMINERA = sqlDataReader[37].ToString(),
                            V_CARGOCORRECT = sqlDataReader[38] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[38]),
                            V_INFOMERCORRECT = sqlDataReader[39] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[39]),
                            V_OTROSCORRECT = sqlDataReader[40] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[40]),
                            V_CARGOPREVENT = sqlDataReader[41] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[41]),
                            V_INFORMEPREVENT = sqlDataReader[42] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[42]),
                            V_OTROSPREVENT = sqlDataReader[43] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[43]),
                            V_CARGOLEVSUS = sqlDataReader[44] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[44]),
                            V_CARGODECMINERA = sqlDataReader[45] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[45]),
                            V_CONTRATO = sqlDataReader[46] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[46]),
                            V_RESOLUCION = sqlDataReader[47] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[47]),
                            V_OTROSDOCS = sqlDataReader[48] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[48]),
                            V_RESOLUCIONIGAFOM = sqlDataReader[49] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[49]),
                            V_2021SEM1 = sqlDataReader[50] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[50]),
                            V_2021SEM2 = sqlDataReader[51] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[51]),
                            V_2022SEM1 = sqlDataReader[52] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[52]),
                            V_2022SEM2 = sqlDataReader[53] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[53]),
                            V_CONTRATOEXPLOTACION = sqlDataReader[54] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[54]),
                            V_CONTRATOCESION = sqlDataReader[55] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[55]),
                            V_CONTRATOTERRESUPERFICIAL = sqlDataReader[56] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[56]),
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

        public async Task<IEnumerable<Reinfo>> ValidaReinfo(Reinfo reinfo)
        {
            List<Reinfo> List = new List<Reinfo>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_GET_VALIDAREINFOEXISTE";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@V_RUC", reinfo.V_RUC);
                    command.Parameters.AddWithValue("@V_CODCONSECION", reinfo.V_CODCONSECION);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);

                    while (sqlDataReader.Read())
                    {
                        Reinfo Obj = new Reinfo()
                        {
                            N_CODREINFO = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            V_RUC = sqlDataReader[1].ToString(),
                            V_PROVEEDOR = sqlDataReader[2].ToString(),
                            V_CODCONSECION = sqlDataReader[3].ToString(),
                            V_NOMCONSECION = sqlDataReader[4].ToString(),
                            N_TMPH = sqlDataReader[5] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[5]),
                            N_TMPS = sqlDataReader[6] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[6]),
                            V_UBIGEO = sqlDataReader[7].ToString(),
                            V_NOMDERECHMINE = sqlDataReader[8].ToString(),
                            V_CODZONAREI = sqlDataReader[9].ToString(),
                            N_NORTE1 = sqlDataReader[10] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[10]),
                            N_ESTE1 = sqlDataReader[11] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[11]),
                            N_NORTE2 = sqlDataReader[12] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[12]),
                            N_ESTE2 = sqlDataReader[13] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[13]),
                            v_CODTIPOACT = sqlDataReader[14].ToString(),
                            V_FECREINFO = sqlDataReader[15].ToString(),
                            V_COMPONENT = sqlDataReader[16].ToString(),
                            v_CODZONACAMP = sqlDataReader[17].ToString(),
                            N_NORTEC = sqlDataReader[18] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[18]),
                            N_ESTEC = sqlDataReader[19] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[19]),
                            N_DIFCORDE = sqlDataReader[20] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[20]),
                            N_SEDE = sqlDataReader[21] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[21]),
                            V_DESCRILABOR = sqlDataReader[22].ToString(),
                            N_CANTHOMBRE = sqlDataReader[23] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[23]),
                            N_CANTMUJE = sqlDataReader[24] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[24]),
                            N_TOTALTRAB = sqlDataReader[25] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[25]),
                            V_IGAFOMCORREC = sqlDataReader[26].ToString(),
                            V_IGAFOMPREV = sqlDataReader[27].ToString(),
                            V_RESULTADOS = sqlDataReader[28].ToString(),
                            V_CONCLUSION = sqlDataReader[29].ToString(),
                            V_FECCREACION = sqlDataReader[30].ToString(),
                            V_FECMODIF = sqlDataReader[31].ToString(),
                            V_USUREGISTRO = sqlDataReader[32].ToString(),
                            V_USUMODIF = sqlDataReader[33].ToString(),
                            V_ESTADO = sqlDataReader[34].ToString()

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

        public async Task<IEnumerable<Reinfo>> FiltrarReinfoGrafico(Reinfo reinfo)
        {
            List<Reinfo> List = new List<Reinfo>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "[TRAZABILIDAD].[TZ_LIST_REINFOGRAFICO]";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@V_ANIO", reinfo.V_ANIO);
                    command.Parameters.AddWithValue("@V_MES", reinfo.V_MES);

                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);

                    while (sqlDataReader.Read())
                    {
                        Reinfo Obj = new Reinfo()
                        {
                            N_SEDE = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            V_ANIO = sqlDataReader[1].ToString(),
                            V_CANTIDAD = sqlDataReader[2].ToString(),

  
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

        public async Task<IEnumerable<Reinfo>> FiltrarDeclarionGrafico(Reinfo reinfo)
        {
            List<Reinfo> List = new List<Reinfo>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "[TRAZABILIDAD].[TZ_LIST_DECLARACIONGRAFICO]";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@V_ANIO", reinfo.V_ANIO);
                    command.Parameters.AddWithValue("@V_SEMESTRE", reinfo.V_SEMESTRE);

                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);

                    while (sqlDataReader.Read())
                    {
                        Reinfo Obj = new Reinfo()
                        {
                            N_SEDE = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_DATOS = Convert.ToInt32(sqlDataReader[1].ToString()),

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
