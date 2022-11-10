using AutoMapper;
using WebApi.Helpers;
using WebApi.Entities;
using Microsoft.EntityFrameworkCore;
using WebApi.Models.Cashflows;

namespace WebApi.Services
{
    public interface ICashflowService
    {
        Task<IEnumerable<Cashflow>> GetAll(string userid);
        Task<int> CreateCashflow(CashflowModel cashflowModel, int userid);
        Task<Cashflow> DeleteCashflow(int id);
        Task<int> UpdateCashflow(CashflowModel cashflowRequestData);

        Task<Cashflow> GetById(int id);


        Task<IEnumerable<Cashflow>> searchCashflow(CashflowModel model);
    }
    public class CashflowService : ICashflowService
    {
        DataContext context;

        private readonly IMapper _mapper;
        public CashflowService(DataContext _context, IMapper mapper)
        {
            context = _context;
            _mapper = mapper;
        }

        public Task<Cashflow> GetById(int id)
        {
            return GetCashflow(id);
        }

        private async Task<Cashflow> GetCashflow(int id)
        {
            var cashflow = await context.Cashflows.FindAsync(id);
            if (cashflow == null) throw new KeyNotFoundException("cashflow not found");
            return cashflow;
        }
        public async Task<Cashflow> DeleteCashflow(int id)
        {
            var cashflow = await context.Cashflows.FirstOrDefaultAsync(c => c.CashFlowId == id);
            if (cashflow is null)
            {
                throw new KeyNotFoundException(String.Format("Could not find cashflow with id:{0}", id));
            }

            context.Remove(cashflow);
            context.SaveChanges();

            return cashflow;
        }
        public Task<int> CreateCashflow(CashflowModel cashflowModel, int userId)
        {
            Cashflow cashflow = _mapper.Map<Cashflow>(cashflowModel);

            cashflow.UserId = userId;

            context.Add(cashflow);
            context.SaveChanges();

            return Task.FromResult(StatusCodes.Status200OK);
        }

        public async Task<int> UpdateCashflow(CashflowModel cashflowRequestData)
        {
            var dbCashflow = await (from cashflow in context.Cashflows
                                    where cashflow.CashFlowId == cashflowRequestData.CashFlowId
                                    select cashflow).FirstOrDefaultAsync();

            if (dbCashflow is null)
                return StatusCodes.Status404NotFound;

            dbCashflow.Description = cashflowRequestData.Description ?? dbCashflow.Description;

            dbCashflow.Amount = cashflowRequestData.Amount ?? dbCashflow.Amount;

            dbCashflow.Type = cashflowRequestData.Type ?? dbCashflow.Type;

            dbCashflow.ProjectType = cashflowRequestData.ProjectType ?? dbCashflow.ProjectType;

            await context.SaveChangesAsync();
            return StatusCodes.Status200OK;
        }

        public async Task<IEnumerable<Cashflow>> GetAll(string userId)
        {
            var cashflow = await context.Cashflows
                .Where(c => c.UserId == int.Parse(userId)).ToListAsync();

            if (cashflow == null) throw new KeyNotFoundException("cashflow not found");

            return cashflow;
        }

        public async Task<IEnumerable<Cashflow>> searchCashflow(CashflowModel model)
        {
            var cashflow = await context.Cashflows
                .Where(i => i.Description.ToLower().Contains(model.Description.ToLower())
                || i.CashFlowId.ToString().ToLower().Contains(model.CashFlowId.ToString().ToLower())
                || i.Amount.ToString().ToLower().Contains(model.Amount.ToString().ToLower())
                || i.ProjectType.ToLower().Contains(model.ProjectType.ToLower())
                || i.Type.ToLower().Contains(model.Type.ToLower())
                ).ToListAsync();
            if (cashflow == null) throw new KeyNotFoundException("cashflow not found");
            return cashflow;
        }
    }
}