#nullable enable
namespace WebApi.Models.Cashflows
{
    public class CashflowModel
    {
         public int CashFlowId { get; set; }

        // cash coming in or cash going out
        public string? Type { get; set; }

        public double? Amount { get; set; }

        public string? Description { get; set; }

        // describes which business this cash is for
        public string? ProjectType { get; set; }
    }
}