using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Authorization;
using WebApi.Helpers;
using WebApi.Entities;
using WebApi.Services;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Services
{
    public interface ICashflowService
    {
        IEnumerable<Cashflow> GetAll(HttpContext context);

        Task<Cashflow> GetById(int id);
    }
    public class CashflowService : ICashflowService
    {
        DataContext context;
        public CashflowService(DataContext _context)
        {
            context = _context;
        }
        public IEnumerable<Cashflow> GetAll(HttpContext context)
        {
            User user = (User)context.Items["User"];

            return user.Cashflows;
        }

        public Task<Cashflow> GetById(int id)
        {
            return getCashflow(id);
        }

        private async Task<Cashflow> getCashflow(int id)
        {
            
            var cashflow = await context.Cashflows
                .FirstOrDefaultAsync(i => i.CashFlowId == id);
            if (cashflow == null) throw new KeyNotFoundException("cashflow not found");

            return cashflow;
        }
    }
}