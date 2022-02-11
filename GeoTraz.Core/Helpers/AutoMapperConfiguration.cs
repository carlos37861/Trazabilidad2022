using AutoMapper;


namespace GeoTraz.Core.Helpers
{
    public class AutoMapperConfiguration
    {
        public MapperConfiguration Configure()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<AutoMapperProfiles>();
            });
            return config;
        }
    }
}
