#nullable enable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
  public class Cashflow
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int CashFlowId { get; set; }

    // cash coming in or cash going out
    public string? Type { get; set; }

    public double Amount { get; set; }

    public string? Description { get; set; }

    // describes which business this cash is for
    public string? ProjectType { get; set; }

    [ForeignKey("Id")]
    public virtual string UserId { get; set; }
    public virtual User User { get; set; }
  }
}