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
        private User getUser()
        {
            return httpContextAccessor.HttpContext.Items["User"] as User;
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            Console.WriteLine("dokeokeodkodeed");
            var _cashflows = await cashflowService.GetAll(getUser().Id);

            return Ok(new { data = new { cashflows = _cashflows } });
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteCashflow(int id)
        {
            var result = await cashflowService.DeleteCashflow(id);

            var cashflows = cashflowService.GetAll(getUser().Id);
            return Ok(cashflows);
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


        [AllowAnonymous]
        [HttpGet("global")]
        public async Task<IActionResult> GetGlobalAll()
        {
            var _cashflows = await cashflowService.GetGlobalAll();

            return Ok(new { data = new { cashflows = _cashflows } });
        }
    }
}
