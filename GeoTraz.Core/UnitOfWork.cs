using GeoTraz.Core.Repositories.Concretes;
using GeoTraz.Core.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GeoTraz.Core
{
    public class UnitOfWork : IUnitOfWork
    {
        private SqlConnection _connection;
        private SqlTransaction _transaction;
        private bool _disposed;

        #region Repositories
        public IReinfoRepository ReinfoRepository { get; }
        public IArchivosRepository ArchivosRepository { get; }

        public IReporteRepository ReporteRepository { get; }
        public IDeclaracionMineraRepository DeclaracionMineraRepository { get; }
        public IReporteDetRepository ReporteDetRepository { get; }
        public IEquiposAmbientesRepository EquiposAmbientesRepository { get; }

        public IReporteDetEquiposAmbientesRepository ReporteDetEquiposAmbientesRepository { get;  }

        public IFirmantesRepository FirmantesRepository { get; }

        #endregion


        public UnitOfWork()
        {
            #region Conexion
          _connection = new SqlConnection("Data Source = LMSIS07\\SQLEXPRESS; Initial Catalog = bdtrazabilidad; Persist Security Info = True; User ID = sa; Password = 123; ");
            // _connection = new SqlConnection("Data Source = .; Initial Catalog = bdtrazabilidad; Persist Security Info = True; User ID = sa; Password = 123; ");
            _connection.Open();
            _transaction = _connection.BeginTransaction();
            #endregion

            #region Repositorios
            ReinfoRepository= new ReinfoRepository(_connection, _transaction);
            ArchivosRepository = new ArchivosRepository(_connection, _transaction);
            DeclaracionMineraRepository= new DeclaracionMineraRepository(_connection,_transaction);
            ReporteRepository = new ReporteRepository(_connection, _transaction);
            ReporteDetRepository = new ReporteDetRepository(_connection, _transaction);
            EquiposAmbientesRepository= new EquiposAmbientesRepository(_connection, _transaction);
            ReporteDetEquiposAmbientesRepository = new ReporteDetEquiposAmbientesRepository(_connection, _transaction);
            FirmantesRepository = new FirmantesRepository(_connection, _transaction);

            #endregion

        }
        public void Commit()
        {
            _transaction.Commit();
        }
        public void Rollback()
        {
            _transaction.Rollback();
        }
        public void Dispose()
        {
            dispose(true);
            GC.SuppressFinalize(this);
        }
        private void dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    if (_transaction != null)
                    {
                        _transaction.Dispose();
                    }
                    if (_connection != null)
                    {
                        _connection.Close();
                        _connection.Dispose();

                    }
                }
                _disposed = true;
            }
        }
    }
}
