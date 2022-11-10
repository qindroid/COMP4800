using Microsoft.AspNetCore.Mvc;

using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Authorization;
using WebApi.Services;
using WebApi.Models.Users;
using WebApi.Models.Cashflows;

namespace WebApi.Controllers
{
    [Authorize]
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

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var user = (User)this.httpContextAccessor.HttpContext.Items["User"];

            var _cashflows = await cashflowService.GetAll(user.Id);

            return Ok(new { data = new { cashflows = _cashflows } });
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteCashflow(int id)
        {
            var result = await cashflowService.DeleteCashflow(id);

            return Ok(new { data = new { code = StatusCodes.Status200OK, message = "Deleted cashflow Successfully." } });
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var _cashflow = await cashflowService.GetById(id);

            return Ok(new { data = new { cashflow = _cashflow } });
        }

        // [HttpGet("/all")]
        // public async Task<IActionResult> GetAll(int userid)
        // {
        //     var _cashflow = cashflowService.GetAll(userid);

        //     return Ok(new { data = new { cashflow = _cashflow } });
        // }

        [HttpGet("search")]
        public async Task<IActionResult> searchCashflow([FromBody] CashflowModel model)
        {
            var _cashflow = await cashflowService.searchCashflow(model);

            return Ok(new { data = new { cashflow = _cashflow } });
        }

        [HttpPost("update")]
        public IActionResult UpdateCashflow([FromBody] CashflowModel model)
        {
            var _cashflow = cashflowService.UpdateCashflow(model);
            return Ok(new { data = new { cashflow = _cashflow } });
        }

    }
}
