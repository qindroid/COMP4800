using AutoMapper;
using WebApi.Helpers;
using WebApi.Entities;
using Microsoft.EntityFrameworkCore;
using WebApi.Models.Cashflows;

namespace WebApi.Services
{
  public interface ICashflowService
  {
    Task<List<Cashflow>> GetAll(string userid);
    Task<IEnumerable<Cashflow>> GetGlobalAll();
    Task<int> CreateCashflow(CashflowModel cashflowModel, string userid);
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
    public Task<List<Cashflow>> GetAll(string userID)
    {


      return context.Cashflows.Where(x => x.UserId.ToString() == userID).ToListAsync();
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
    public Task<int> CreateCashflow(CashflowModel cashflowModel, string userId)
    {
      Cashflow cashflow = _mapper.Map<Cashflow>(cashflowModel);

      cashflow.UserId = userId.ToString();

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

    public async Task<IEnumerable<Cashflow>> GetGlobalAll()
    {
      var cashflow = await context.Cashflows
          .ToListAsync();

      if (cashflow == null) throw new KeyNotFoundException("cashflow not found");

      return cashflow;
    }

    public async Task<IEnumerable<Cashflow>> searchCashflow(CashflowModel model)
    {
      //search cashflow by model    
      var cashflow = await context.Cashflows
          .Where(i => i.Description.ToLower().Contains(model.Description.ToLower())
          && i.ProjectType.ToLower().Contains(model.ProjectType.ToLower())
          && i.Type.ToLower().Contains(model.Type.ToLower())
          ).ToListAsync();
      if (model.CashFlowId != 0)
      {
        cashflow = cashflow.Where(i => i.CashFlowId == model.CashFlowId).ToList();
      }
      if (model.Amount != 0)
      {
        cashflow = cashflow.Where(i => i.Amount == model.Amount).ToList();
      }
      if (cashflow == null) throw new KeyNotFoundException("cashflow not found");
      return cashflow;
    }
  }
}