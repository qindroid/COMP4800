using Microsoft.AspNetCore.Mvc;

using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Authorization;
using WebApi.Services;
using WebApi.Models.Users;
using WebApi.Models.Cashflows;

namespace WebApi.Controllers
{
  [ApiController]
  [Route("api/cashflow")]
  public class CashflowController : Controller
  {
    private readonly DataContext _context;
    private IHttpContextAccessor httpContextAccessor;
    private ICashflowService cashflowService;

    public CashflowController(DataContext context, ICashflowService _cashflowService, IHttpContextAccessor accessor)
    {
      httpContextAccessor = accessor;
      _context = context;
      cashflowService = _cashflowService;
    }
    private User getUser()
    {
      // var user = httpContextAccessor.HttpContext.Items["User"];
      // Console.WriteLine(user.ToString()  + " is the user!!!!!!!!!");
      var user = httpContextAccessor.HttpContext.Items["User"];
      return (User)user;
      // return Config.loginUser;
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
      Console.WriteLine(getUser().Id + " is the user!");
      Console.WriteLine(Config.loginUser.UserName + " is the userName");
      var _cashflows = await cashflowService.GetAll(getUser().Id);
      return Ok(new { data = new { cashflows = _cashflows } });
      // return Ok(new { data = new { cashflows = new List<Cashflow>() } });
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteCashflow(int id)
    {
      var result = await cashflowService.DeleteCashflow(id);
      var cashflows = cashflowService.GetGlobalAll();
      return Ok(cashflows);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
      var _cashflow = await cashflowService.GetById(id);

      return Ok(new { data = new { cashflow = _cashflow } });
    }


    [HttpPost("search")]
    public async Task<IActionResult> searchCashflow([FromBody] CashflowModel model)
    {
      var _cashflow = await cashflowService.searchCashflow(model, getUser().Id);

      return Ok(new { data = new { cashflow = _cashflow } });
    }

    [HttpPost("update")]
    public IActionResult UpdateCashflow([FromBody] CashflowModel model)
    {
      var _cashflow = cashflowService.UpdateCashflow(model);
      return Ok(new { data = new { cashflow = _cashflow } });
    }

    [HttpPost("create")]
    public IActionResult CreateCashflow([FromBody] CashflowModel model)
    { 
      string id = "";
      if (getUser() == null)
      {
        id = "1";
      }
      var _cashflow = cashflowService.CreateCashflow(model, getUser().Id);
      return Ok(new { data = new { cashflow = _cashflow } });
    }


    [HttpGet("global")]
    public async Task<IActionResult> GetGlobalAll()
    {
      if (getUser().IsAdmin == true)
      {
          var _cashflows = await cashflowService.GetGlobalAll();
          return Ok(new { data = new { cashflows = _cashflows } });
      } else {
          var _cashflows = await cashflowService.GetAll(getUser().Id);
          // var _cashflows = await cashflowService.GetGlobalAll();
          return Ok(new { data = new { cashflows = _cashflows } });
      }
    }
  }
}
