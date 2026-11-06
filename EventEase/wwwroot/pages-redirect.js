(() => {
    const url = new URL(window.location.href);
    const route = url.searchParams.get("__eventease_route");
    if (!route) return;

    const base = new URL(document.baseURI);
    const target = new URL(route, base);
    // Restore only same-origin routes under this app's base path.
    if (target.origin === base.origin && target.pathname.startsWith(base.pathname)) {
        window.history.replaceState(null, "", target.pathname + target.search + target.hash);
    }
})();
