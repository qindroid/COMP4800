namespace WebApi.Entities;

using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;


public class User : IdentityUser
{
    public User() : base() { }
    public string Name { get; set; }

    [DataType(DataType.Date)]
    // [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
    public DateTime Expired { get; set; }
    public bool IsAdmin { get; set; }
    public virtual ICollection<Cashflow> Cashflows { get; set; }
}