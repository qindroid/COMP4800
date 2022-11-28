namespace WebApi.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Users;
using WebApi.Services;

[ApiController]
[Route("api/user")]
public class UsersController : ControllerBase
{
    private IUserService _userService;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;
    private IHttpContextAccessor httpContextAccessor;

    public UsersController(
        IUserService userService,
        IMapper mapper,
        IOptions<AppSettings> appSettings,
        IHttpContextAccessor accessor)
    {
        _userService = userService;
        _mapper = mapper;
        _appSettings = appSettings.Value;
        httpContextAccessor = accessor;
    }
    private User getUser()
    {
        // get login user
        var user = httpContextAccessor.HttpContext.User;
        Console.WriteLine(httpContextAccessor.HttpContext.User.Identity.Name + " is the user");
        return httpContextAccessor.HttpContext.Items["User"] as User;
    }

    [HttpPost("login")]
    public IActionResult Authenticate(AuthenticateRequest model)
    {
       
        var response = _userService.Authenticate(model);
        return Ok(new { code = StatusCodes.Status200OK,  data = response, message="Success"});
    }

    [HttpPost("signup")]
    public IActionResult Register(RegisterRequest model)
    {
        Console.WriteLine("Register:" + model.Username + model.Password);
        _userService.Register(model);
        _mapper.Map<User>(model);
        return Ok(new { message = "Registration successful" });
    }

    [HttpPost("password/{password}")]
    public IActionResult Password(string password)
    {
        Console.WriteLine(password);
        _userService.Password(getUser().Id, password);
        return Ok(new { message = "Password changed successful" });
    }

    [HttpPost("logout")]
    public IActionResult Logout(int id) {
        // todo
        return Ok(new {message = ""});
    }
    
    [HttpGet("info")]
    public IActionResult GetInfo()
    {
        // todo
        return Ok(new { message = "" });
    }

    [HttpGet("admin")]
    public IActionResult GetAdmin()
    {
        // todo
        return Ok(new { isAdmin = getUser().IsAdmin });
    }


    [HttpGet("list")]
    public IActionResult GetAll()
    {
        var users = _userService.GetAll();

        return Ok(users);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {        
        var user = _userService.GetById(id);

        return Ok(user);
    }

    [HttpPut("{id}")]
    public IActionResult Update(string id, UpdateRequest model)
    {
        _userService.Update(id, model);
        return Ok(new { message = "User updated successfully" });
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        _userService.Delete(id);
        return Ok(new { message = "User deleted successfully" });
    }
}