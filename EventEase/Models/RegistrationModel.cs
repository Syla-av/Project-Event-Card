using System.ComponentModel.DataAnnotations;

namespace EventEase.Models;

public sealed class RegistrationModel
{
    [Required, StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, EmailAddress, StringLength(254)]
    public string Email { get; set; } = string.Empty;
}
