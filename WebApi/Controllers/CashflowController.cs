using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebApi.Entities;
using WebApi.Helpers;
using AutoMapper;

using WebApi.Authorization;
using WebApi.Helpers;
using WebApi.Models.Users;

using WebApi.Services;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CashflowController : Controller
    {
        private readonly DataContext _context;
        private ICashflowService cashflowService;

        public CashflowController(DataContext context, ICashflowService _cashflowService)
        {
            _context = context;
            cashflowService = _cashflowService;
        }

        [HttpGet("/all")]
        public IActionResult GetAll(HttpContext context)
        {
            var users = cashflowService.GetAll(context);

            return Ok(users);
        }

    

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var _cashflow = await cashflowService.GetById(id);

            return Ok(new { data = new { cashflow = _cashflow } });
        }

    }
}
