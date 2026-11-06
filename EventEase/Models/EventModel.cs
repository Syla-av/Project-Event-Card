namespace EventEase.Models;

// Immutable values let the card notify its parent instead of mutating a parameter.
public sealed record EventModel(
    int Id,
    string Name,
    DateTime Date,
    string Location,
    string Category,
    string Description);
