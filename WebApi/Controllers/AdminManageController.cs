namespace WebApi.Controllers;

using System.Diagnostics;
using AutoMapper;
using global::Helpers.SubscriptionInfo;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Services;

[Authorize]
[ApiController]
[Route("api/admin")]
public class AdminManagerController : ControllerBase
{
    private IUserService _userService;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;


    public AdminManagerController(
        IUserService userService,
        IMapper mapper,
        IOptions<AppSettings> appSettings)
    {
        _userService = userService;
        _mapper = mapper;
        _appSettings = appSettings.Value;

    }
    private bool isNotAdmin()
    {
        return !((User)this.HttpContext.Items["User"]).IsAdmin;
    }
    [AllowAnonymous]
    public IActionResult GetInfo()
    {
        if (isNotAdmin())
        {
            return new BadRequestObjectResult(new { message = "You must be an admin to access subscription info!" });
        }
        SubscriptionInfo info;
        try
        {
            info = SubscriptionInfoService.GetInfo();
        }
        catch (Exception e)
        {
            Debug.WriteLine(e);
            return new StatusCodeResult(404);
        }
        return Ok(new { data = info });
    }
    [AllowAnonymous]
    public IActionResult SetInfo([FromBody] SubscriptionInfo info)
    {
        if (isNotAdmin())
        {
            return new BadRequestObjectResult(new { message = "You must be an admin to change this" });
        }

        try
        {
            SubscriptionInfoService.SetInfo(info);
        }
        catch (Exception e)
        {
            Debug.WriteLine(e);
            return new StatusCodeResult(404);
        }
        return Ok(new { message = "Set new info" });
    }

}