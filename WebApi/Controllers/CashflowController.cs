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
      // get login user
      var user = httpContextAccessor.HttpContext.User;
      Console.WriteLine(httpContextAccessor.HttpContext.User.Identity.Name  + " is the user");
      return httpContextAccessor.HttpContext.Items["User"] as User;
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
      Console.WriteLine(getUser());
      var _cashflows = await cashflowService.GetAll(getUser().Id);

      return Ok(new { data = new { cashflows = _cashflows } });
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
      var _cashflow = await cashflowService.searchCashflow(model);

      return Ok(new { data = new { cashflow = _cashflow } });
    }

    [AllowAnonymous]
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
        return BadRequest(new { message = "User not found" });
      }
      var _cashflow = cashflowService.CreateCashflow(model, id);
      return Ok(new { data = new { cashflow = _cashflow } });
    }


    [HttpGet("global")]
    public async Task<IActionResult> GetGlobalAll()
    {
      getUser();
      if (getUser() != null) {
        if (getUser().IsAdmin) {
          var _cashflows = await cashflowService.GetGlobalAll();
          return Ok(new { data = new { cashflows = _cashflows } });
        } else {
          var _cashflows = await cashflowService.GetAll(getUser().Id);
          return Ok(new { data = new { cashflows = _cashflows } });
        }
      } else {
          var _cashflows = await cashflowService.GetGlobalAll();
          return Ok(new { data = new { cashflows = _cashflows } });
      }
      //print
      
    }
  }
}
