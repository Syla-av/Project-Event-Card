# EventEase — Event Card

A standalone Blazor WebAssembly app for GitHub Pages. The .NET runtime runs in
the browser, so hosting does not require an ASP.NET server.

Website: https://syla-av.github.io/Project-Event-Card/

## Features

- Event cards with name, date, location, and mock event data.
- Expandable card editors with two-way parent/component data binding.
- Event list, details, and registration routes.
- A registration demo with required fields and email validation.
- Responsive styling and direct-link/reload support on GitHub Pages.

Edits remain available during navigation in the current browser app instance.
Reloading resets the mock data. Registration is a demo: it does not store data or
send email.

## GitHub Pages deployment

1. In the repository, open **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Push to `main`, or run **Actions → Deploy EventEase to GitHub Pages → Run workflow**.

The workflow builds the .NET 8 app, sets its base path from the Pages configuration,
uploads the published static files, and deploys them. No deployment secrets are
required: the deployment job uses GitHub's built-in token with Pages permissions.

`404.html` redirects direct requests for routes to the app root. The app restores
the requested route before Blazor starts. Unknown routes show the app's missing-page
message. This supports project URLs such as `/Project-Event-Card/events/1`.

## Open or run locally

Open `EventEase/EventEase.csproj` in Visual Studio with the ASP.NET/web development
workload and a .NET 8 SDK, or use:

```powershell
dotnet run --project EventEase/EventEase.csproj --urls http://localhost:5080
```

The source base path is `/` for local development; only the deployment output is
rewritten for GitHub Pages.

## Code map

| File | Purpose |
| --- | --- |
| `EventEase/Components/Shared/EventCard.razor` | Reusable card and two-way binding |
| `EventEase/Models/EventModel.cs` | Immutable event data model |
| `EventEase/Services/EventStore.cs` | Browser-scoped mock event store |
| `EventEase/Components/Pages/Events.razor` | Event list (`/`, `/events`) |
| `EventEase/Components/Pages/EventDetails.razor` | Details (`/events/{Id:int}`) |
| `EventEase/Components/Pages/Registration.razor` | Registration (`/events/{Id:int}/register`) |
| `.github/workflows/deploy-pages.yml` | Build and Pages deployment |

## Checks for Activity 2

Run the GitHub Pages redirect checks with `node --test tests/pages-routing.test.cjs`.
The deployment workflow also runs these checks before building.

1. Edit a card's name, date, and location; check updates on its details page.
2. Navigate list → details → registration → details → list.
3. Submit blank or invalid registration values; check validation messages.
4. Submit valid sample values; check the demo confirmation.
5. Open or reload `/Project-Event-Card/events/1` directly on the hosted site.
6. Check missing event IDs and unknown routes.
7. Reload to confirm mock edits reset.

Copilot authorship or verification is not claimed. The components can be reviewed
with GitHub Copilot in Visual Studio if required by the activity.
