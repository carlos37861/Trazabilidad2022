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
    class ArchivosRepository :  Repository, IArchivosRepository
    {
        public ArchivosRepository(SqlConnection context, SqlTransaction transaction)
        {
            _context = context;
            _transaction = transaction;
        }

        public async Task<int> AgregarArchivo(IEnumerable<Archivos> Archivos)
        {
            var exec = 0;
            try
            {
                foreach (var objArchivo in Archivos)
                {
                    using (var command = CreateCommand())
                    {
                        command.CommandText = "TRAZABILIDAD.TZ_INS_ARCHIVO";
                        command.CommandType = CommandType.StoredProcedure;
                        //command.Parameters.AddWithValue("@N_CODARCHIVO", objArchivo.N_CODARCHIVO);
                        command.Parameters.AddWithValue("@N_CODREIN", objArchivo.N_CODREIN);
                        command.Parameters.AddWithValue("@N_CODIGAFOM", objArchivo.N_CODIGAFOM);
                        command.Parameters.AddWithValue("@V_TIPOIGAFOM", objArchivo.V_TIPOIGAFOM);
                        command.Parameters.AddWithValue("@V_TIPOARCH", objArchivo.V_TIPOARCH);
                        command.Parameters.AddWithValue("@V_TIPOIMAG", objArchivo.V_TIPOIMAG);
                        command.Parameters.AddWithValue("@V_EXTENSION", objArchivo.V_EXTENSION);
                        command.Parameters.AddWithValue("@V_NOMBRE", objArchivo.V_NOMBRE);
                        command.Parameters.AddWithValue("@N_TAMANIO", objArchivo.N_TAMANIO);
                        command.Parameters.AddWithValue("@V_RUTA", objArchivo.V_RUTA);
                        command.Parameters.AddWithValue("@V_USUREGISTRO", objArchivo.V_USUREGISTRO);
                        command.Parameters.AddWithValue("@V_ESTADO", "A");
                        command.Parameters.AddWithValue("@V_DESCRIPARCH", objArchivo.V_DESCRIPARCH);
                        if (objArchivo.V_FECMODIF == null)
                        {
                            command.Parameters.AddWithValue("@V_FECMODIF", "");
                        }
                        else
                        {
                            command.Parameters.AddWithValue("@V_FECMODIF", objArchivo.V_FECMODIF);
                        }
                        
                        exec = Convert.ToInt32(await command.ExecuteNonQueryAsync());
                    }
                }
            }
            catch (Exception ex)
            {

                throw new ArgumentOutOfRangeException("error", ex);
            }
            
            return Convert.ToInt32(exec);
        }

        public async Task<int> EditarArchivo(Archivos objArchivo)
        {
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_UPD_ARCHIVO";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODARCHIVO", objArchivo.N_CODARCHIVO);
                    command.Parameters.AddWithValue("@N_CODREIN", objArchivo.N_CODREIN);
                    command.Parameters.AddWithValue("@V_TIPOIGAFOM", objArchivo.V_TIPOIGAFOM);
                    command.Parameters.AddWithValue("@N_CODIGAFOM", objArchivo.N_CODIGAFOM);
                    command.Parameters.AddWithValue("@V_TIPOARCH", objArchivo.V_TIPOARCH);
                    command.Parameters.AddWithValue("@V_TIPOIMAG", objArchivo.V_TIPOIMAG);
                    command.Parameters.AddWithValue("@V_EXTENSION", objArchivo.V_EXTENSION);
                    command.Parameters.AddWithValue("@V_NOMBRE", objArchivo.V_NOMBRE);
                    command.Parameters.AddWithValue("@N_TAMANIO", objArchivo.N_TAMANIO);
                    command.Parameters.AddWithValue("@V_RUTA", objArchivo.V_RUTA);
                    command.Parameters.AddWithValue("@V_USUMODIF", objArchivo.V_USUMODIF);
                    command.Parameters.AddWithValue("@v_CODTIPOACT", objArchivo.V_ESTADO);
                    command.Parameters.AddWithValue("@V_DESCRIPARCH", objArchivo.V_DESCRIPARCH);

                    return Convert.ToInt32(await command.ExecuteNonQueryAsync());

                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }

        public async Task<int> EliminarArchivo(Archivos archivos)
        {
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_DEL_ARCHIVO";
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@N_CODREIN", archivos.N_CODREIN);

                    return Convert.ToInt32(await command.ExecuteNonQueryAsync());

                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }

        public async Task<int> EliminarArchivoId(Archivos archivos)
        {
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_DEL_ARCHIVOID";
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@N_CODARCHIVO", archivos.N_CODARCHIVO);

                    return Convert.ToInt32(await command.ExecuteNonQueryAsync());

                }
            }
            catch (Exception ex)
            {
                throw new ArgumentOutOfRangeException("error", ex);
            }
        }

        public async Task<IEnumerable<Archivos>> ListarArchivo(Archivos archivos)
        {
            List<Archivos> List = new List<Archivos>();
            try
            {
                using (var command = CreateCommand())
                {
                    if (archivos.N_CODREIN == 0 && archivos.N_CODIGAFOM==0)
                    {
                        command.CommandText = "TRAZABILIDAD.TZ_LST_DOCUMENTOAYUDA";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@V_TIPOIMAG", archivos.V_TIPOIMAG);
                        command.Parameters.AddWithValue("@V_TIPOIGAFOM", archivos.V_TIPOIGAFOM);
                    }
                    //else if (archivos.N_CODREIN == 0 && archivos.N_CODIGAFOM ==6)
                    //{
                    //    command.CommandText = "TRAZABILIDAD.TZ_LST_DOCUMENTOAYUDA";
                    //    command.CommandType = CommandType.StoredProcedure;
                    //    command.Parameters.AddWithValue("@V_TIPOIMAG", archivos.V_TIPOIMAG);
                    //    command.Parameters.AddWithValue("@V_TIPOIGAFOM", archivos.V_TIPOIGAFOM);
                    //}
                    else
                    {
                        command.CommandText = "TRAZABILIDAD.TZ_LST_ARCHIVO";
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@N_CODREIN", archivos.N_CODREIN);
                        command.Parameters.AddWithValue("@N_CODIGAFOM", archivos.N_CODIGAFOM);
                        command.Parameters.AddWithValue("@V_TIPOIMAG", archivos.V_TIPOIMAG);
                        command.Parameters.AddWithValue("@V_TIPOIGAFOM", archivos.V_TIPOIGAFOM);

                    }

                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);
                    while (sqlDataReader.Read())
                    {
                        Archivos Obj = new Archivos()
                        {
                            N_CODARCHIVO = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_CODREIN = Convert.ToInt32(sqlDataReader[1]),
                            N_CODIGAFOM = Convert.ToInt32(sqlDataReader[2]),
                            V_TIPOIGAFOM = sqlDataReader[3].ToString(),
                            V_TIPOARCH = sqlDataReader[4].ToString(),
                            V_TIPOIMAG = sqlDataReader[5].ToString(),
                            V_EXTENSION = sqlDataReader[6].ToString(),
                            V_NOMBRE = sqlDataReader[7].ToString(),
                            N_TAMANIO = sqlDataReader[8] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[8]),
                            V_RUTA = sqlDataReader[9].ToString(),
                            V_FECCREACION = sqlDataReader[10].ToString(),
                            V_FECMODIF = sqlDataReader[11].ToString(),
                            V_USUREGISTRO = sqlDataReader[12].ToString(),
                            V_USUMODIF = sqlDataReader[13].ToString(),
                            V_ESTADO = sqlDataReader[14].ToString(),
                            V_DESCRIPARCH = sqlDataReader[15].ToString(),
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

        public async Task<IEnumerable<Archivos>> ListarFiltraArchivo(Archivos archivos)
        {
            List<Archivos> List = new List<Archivos>();
            try
            {
                using (var command = CreateCommand())
                {
  
                    command.CommandText = "TRAZABILIDAD.TZ_LST_FILTRARARCHIVOS";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODIGAFOM", archivos.N_CODIGAFOM);
                    command.Parameters.AddWithValue("@V_TIPOIGAFOM", archivos.V_TIPOIGAFOM);
                    command.Parameters.AddWithValue("@V_TIPOARCH", archivos.V_TIPOARCH);
                    command.Parameters.AddWithValue("@V_TIPOIMAG", archivos.V_TIPOIMAG);
                    command.Parameters.AddWithValue("@V_NOMBRE", archivos.V_NOMBRE);
                    command.Parameters.AddWithValue("@V_DESCRIPARCH", archivos.V_DESCRIPARCH);
                    command.Parameters.AddWithValue("@V_FECMODIFINICIO", archivos.V_FECMODIFINICIO);
                    command.Parameters.AddWithValue("@V_FECMODIFFIN", archivos.V_FECMODIFFIN);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);
                    while (sqlDataReader.Read())
                    {
                        Archivos Obj = new Archivos()
                        {
                            N_CODARCHIVO = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_CODREIN = Convert.ToInt32(sqlDataReader[1]),
                            N_CODIGAFOM = Convert.ToInt32(sqlDataReader[2]),
                            V_TIPOIGAFOM = sqlDataReader[3].ToString(),
                            V_TIPOARCH = sqlDataReader[4].ToString(),
                            V_TIPOIMAG = sqlDataReader[5].ToString(),
                            V_EXTENSION = sqlDataReader[6].ToString(),
                            V_NOMBRE = sqlDataReader[7].ToString(),
                            N_TAMANIO = sqlDataReader[8] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[8]),
                            V_RUTA = sqlDataReader[9].ToString(),
                            V_FECCREACION = sqlDataReader[10].ToString(),
                            V_FECMODIF = sqlDataReader[11].ToString(),
                            V_USUREGISTRO = sqlDataReader[12].ToString(),
                            V_USUMODIF = sqlDataReader[13].ToString(),
                            V_ESTADO = sqlDataReader[14].ToString(),
                            V_DESCRIPARCH = sqlDataReader[15].ToString(),
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

        public async Task<IEnumerable<Archivos>> BuscarImagen(Archivos archivos)
        {
            List<Archivos> List = new List<Archivos>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_GET_IMAGEN";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODARCHIVO", archivos.N_CODARCHIVO);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);
                    while (sqlDataReader.Read())
                    {
                        Archivos Obj = new Archivos()
                        {
                            N_CODARCHIVO = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_CODREIN = Convert.ToInt32(sqlDataReader[1]),
                            N_CODIGAFOM = Convert.ToInt32(sqlDataReader[2]),
                            V_TIPOIGAFOM = sqlDataReader[3].ToString(),
                            V_TIPOARCH = sqlDataReader[4].ToString(),
                            V_TIPOIMAG = sqlDataReader[5].ToString(),
                            V_EXTENSION = sqlDataReader[6].ToString(),
                            V_NOMBRE = sqlDataReader[7].ToString(),
                            N_TAMANIO = sqlDataReader[8] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[8]),
                            V_RUTA = sqlDataReader[9].ToString(),
                            V_FECCREACION = sqlDataReader[10].ToString(),
                            V_FECMODIF = sqlDataReader[11].ToString(),
                            V_USUREGISTRO = sqlDataReader[12].ToString(),
                            V_USUMODIF = sqlDataReader[13].ToString(),
                            V_ESTADO = sqlDataReader[14].ToString(),
                            V_DESCRIPARCH = sqlDataReader[15].ToString()


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

        public async Task<IEnumerable<Archivos>> Listar4Archivo(Archivos archivos)
        {
            List<Archivos> List = new List<Archivos>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LST_4ARCHIVOS";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREIN", archivos.N_CODREIN);
                    command.Parameters.AddWithValue("@N_CODIGAFOM", archivos.N_CODIGAFOM);
                    command.Parameters.AddWithValue("@V_TIPOIMAG", archivos.V_TIPOIMAG);
                    command.Parameters.AddWithValue("@V_TIPOIGAFOM", archivos.V_TIPOIGAFOM);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);
                    while (sqlDataReader.Read())
                    {
                        Archivos Obj = new Archivos()
                        {
                            N_CODARCHIVO = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_CODREIN = Convert.ToInt32(sqlDataReader[1]),
                            N_CODIGAFOM = Convert.ToInt32(sqlDataReader[2]),
                            V_TIPOIGAFOM = sqlDataReader[3].ToString(),
                            V_TIPOARCH = sqlDataReader[4].ToString(),
                            V_TIPOIMAG = sqlDataReader[5].ToString(),
                            V_EXTENSION = sqlDataReader[6].ToString(),
                            V_NOMBRE = sqlDataReader[7].ToString(),
                            N_TAMANIO = sqlDataReader[8] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[8]),
                            V_RUTA = sqlDataReader[9].ToString(),
                            V_FECCREACION = sqlDataReader[10].ToString(),
                            V_FECMODIF = sqlDataReader[11].ToString(),
                            V_USUREGISTRO = sqlDataReader[12].ToString(),
                            V_USUMODIF = sqlDataReader[13].ToString(),
                            V_ESTADO = sqlDataReader[14].ToString(),
                            V_DESCRIPARCH=sqlDataReader[15].ToString()
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


        public async Task<IEnumerable<Archivos>> ValidaCargo(Archivos archivos)
        {
            List<Archivos> List = new List<Archivos>();
            try
            {
                using (var command = CreateCommand())
                {
                    command.CommandText = "TRAZABILIDAD.TZ_LST_VALIDACARGOS";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@N_CODREIN", archivos.N_CODREIN);
                    command.Parameters.AddWithValue("@V_TIPOIMAG", archivos.V_TIPOIMAG);
                    SqlDataReader sqlDataReader = await command.ExecuteReaderAsync(CommandBehavior.SingleResult);
                    while (sqlDataReader.Read())
                    {
                        Archivos Obj = new Archivos()
                        {
                            N_CODARCHIVO = sqlDataReader[0] == DBNull.Value ? 0 : Convert.ToInt32(sqlDataReader[0]),
                            N_CODREIN = Convert.ToInt32(sqlDataReader[1]),
                            N_CODIGAFOM = Convert.ToInt32(sqlDataReader[2]),
                            V_TIPOIGAFOM = sqlDataReader[3].ToString(),
                            V_TIPOARCH = sqlDataReader[4].ToString(),
                            V_TIPOIMAG = sqlDataReader[5].ToString(),
                            V_EXTENSION = sqlDataReader[6].ToString(),
                            V_NOMBRE = sqlDataReader[7].ToString(),
                            N_TAMANIO = sqlDataReader[8] == DBNull.Value ? 0 : Convert.ToDouble(sqlDataReader[8]),
                            V_RUTA = sqlDataReader[9].ToString(),
                            V_FECCREACION = sqlDataReader[10].ToString(),
                            V_FECMODIF = sqlDataReader[11].ToString(),
                            V_USUREGISTRO = sqlDataReader[12].ToString(),
                            V_USUMODIF = sqlDataReader[13].ToString(),
                            V_ESTADO = sqlDataReader[14].ToString(),
                            V_DESCRIPARCH = sqlDataReader[15].ToString()
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
