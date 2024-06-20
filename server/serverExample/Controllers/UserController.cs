using Microsoft.AspNetCore.Mvc;
using Repository;
using Repository.Models;

namespace serverExample.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        public readonly MongoRepository Repository;

        public UserController(MongoRepository mongoRepository)
        {
            Repository = mongoRepository;
        }

        [HttpGet]
        public ActionResult GetAllUsers()
        {
            try
            {
                List<UserModel> users = Repository.UserService.GetAllUsers();
                return Ok(users);
            }
            catch (Exception e)
            {
                return BadRequest($"get all users faild. {e.Message}");
            }
        }

        [HttpGet("{id}")]
        public ActionResult GetUser(string id)
        {
            try
            {
                UserModel user = Repository.UserService.GetUser(id);
                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest($"faild to get user: {id}. {e.Message}");
            }
        }

        [HttpPut]
        public ActionResult UpdateUser(UserModel updateUser)
        {
            try
            {
                Repository.UserService.UpdateUser(updateUser);
                return Ok(updateUser);
            }
            catch (Exception e)
            {
                return BadRequest($"update user: ${updateUser.UserId} faild. {e.Message}");
            }


        }

        [HttpPost]
        public ActionResult CreateUser(UserModel user)
        {
            try
            {
               Repository.UserService.CreateUser(user);
                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete] 
        public ActionResult DeleteUser(string id)
        {
            try
            {
                Repository.UserService.DeleteUser(id);
                return Ok(id);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
