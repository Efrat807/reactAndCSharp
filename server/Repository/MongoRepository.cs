using MongoDB.Driver;
using Repository.Models;
using System.Diagnostics.Metrics;
using Repository.Services;

namespace Repository
{
    public class MongoRepository
    {
        private readonly IMongoDatabase database;
        private readonly IMongoCollection<UserModel> countries;
        public UserService UserService { get; set; }
        public MongoRepository(IDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            database = client.GetDatabase(databaseSettings.DatabaseName);

            countries = database.GetCollection<UserModel>(databaseSettings.CollectionsNames.Users);
            UserService = new UserService(countries);
        }
    }
}