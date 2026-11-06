using EventEase.Models;

namespace EventEase.Services;

// Scoped to this browser app instance; edits survive client-side navigation,
// but are reset on a full reload. This is intentionally mock data.
public sealed class EventStore
{
    private readonly List<EventModel> events =
    [
        new(1, "Future of Work Summit", new DateTime(2027, 3, 12),
            "City Convention Center", "Corporate",
            "Meet industry leaders for conversations about the future of work."),
        new(2, "Community Garden Party", new DateTime(2027, 4, 24),
            "Riverside Gardens", "Social",
            "Spend an afternoon connecting with the community over food and music."),
        new(3, "Creative Connections", new DateTime(2027, 5, 8),
            "The Studio Loft", "Networking",
            "Exchange ideas and build new connections with local creatives.")
    ];

    public IReadOnlyList<EventModel> Events => events.AsReadOnly();

    public EventModel? Find(int id) => events.Find(item => item.Id == id);

    public void Update(EventModel updated)
    {
        var index = events.FindIndex(item => item.Id == updated.Id);
        if (index >= 0)
        {
            events[index] = updated;
        }
    }
}
