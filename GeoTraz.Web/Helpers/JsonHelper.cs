using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GeoTraz.Web.Helpers
{
    public class JsonHelper
    {
        private static string logFile;
        public static IConfiguration Configuration { get; set; }
        public static string GetSection(string option)
        {
            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("connections.json");
            string men= Directory.GetCurrentDirectory();
            Configuration = builder.Build();
            logFile = Configuration.GetValue<string>("ConnectionStrings:" +
            option);
            return logFile;
        }
        public static string GetDefaultEmpresa(string option)
        {
            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("connections.json");
            string men= Directory.GetCurrentDirectory();
            Configuration = builder.Build();
            logFile = Configuration.GetValue<string>("Initial:" + option);
            return logFile;
        }
        public static string GetFTP(string option)
        {
            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("connections.json");
            string men = Directory.GetCurrentDirectory();
            Configuration = builder.Build();
            logFile = Configuration.GetValue<string>("Initial:" + option);
            return logFile;
        }

    }
}
