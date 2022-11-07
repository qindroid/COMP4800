namespace WebApi.Entities;

using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations; 
using System.ComponentModel.DataAnnotations.Schema;

public class User
{
    [Key]
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public DateTime Created { get; set; }
    public DateTime expired { get; set; }
    public bool IsAdmin { get; set; }
    [JsonIgnore]
    public string PasswordHash { get; set; }
    public virtual ICollection<Cashflow> Cashflows { get; set; }
}