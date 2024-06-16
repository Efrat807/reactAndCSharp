using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using Repository.Models;

namespace Repository.Services
{
    public class UserService
    {
        private readonly IMongoCollection<UserModel> _users;
        public UserService(IMongoCollection<UserModel> users) 
        {
            _users = users;
        }
        public List<UserModel> GetAllUsers()
        {
            return _users.Find(_ => true).ToList();
        }
        public void UpdateUser(UserModel updateUser) 
        {
            ReplaceOneResult result = _users.ReplaceOne(user=> user.UserId == updateUser.UserId, updateUser);
        }
        public void CreateUser(UserModel user)
        {
            _users.InsertOneAsync(user);
        }
        public void DeleteUser(string id)
        {
            _users.DeleteOne(u=>id==u.UserId);
        }
    }
}
