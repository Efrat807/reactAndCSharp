using MongoDB.Driver;
using Repository.Models;
using System.Diagnostics.Metrics;
using System.Net.Http;
using System.Text.Json;

namespace serverExample.Utils
{
    public class FetchApiData
    {
        public static async Task GetAsync(HttpClient HttpClient)
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("ReactAndC#Project");
            var userCollection = database.GetCollection<UserModel>("Users");
            if (userCollection?.Count(_ => true) == 0)
            {
                using HttpResponseMessage response = await HttpClient.GetAsync("https://dummyjson.com/users");

                var jsonResponse = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions
                {
                    IgnoreNullValues = true,
                    PropertyNameCaseInsensitive = true
                };
                //await Console.Out.WriteLineAsync(jsonResponse);
                var objectResponse = JsonSerializer.Deserialize<UserApi>(jsonResponse, options);

                userCollection.InsertMany(objectResponse.users);
            }
        }
    }

    public class UserApi 
    {
       public List<UserModel> users { get; set; }
    }

}
