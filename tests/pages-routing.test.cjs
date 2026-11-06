const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const webRoot = path.join(__dirname, '../EventEase/wwwroot');
const redirect = fs.readFileSync(path.join(webRoot, '404.html'), 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const restore = fs.readFileSync(path.join(webRoot, 'pages-redirect.js'), 'utf8');

function restoreRoute(href, baseURI) {
    let restored;
    vm.runInNewContext(restore, {
        URL,
        document: { baseURI },
        window: { location: { href }, history: { replaceState: (_, __, route) => restored = route } }
    });
    return restored;
}

for (const basePath of ['/Project-Event-Card/', '/']) {
    for (const route of ['events/1', 'events/2/register', 'events/999', 'missing-page', 'events/1?note=a%26b#details']) {
        test(`deep-link round trip: ${basePath}${route}`, () => {
            const baseURI = `https://syla-av.github.io${basePath}`;
            const original = new URL(route, baseURI);
            let redirected;
            vm.runInNewContext(redirect, {
                URL,
                document: { baseURI },
                window: { location: {
                    pathname: original.pathname,
                    search: original.search,
                    hash: original.hash,
                    replace: href => redirected = href
                } }
            });
            assert.equal(new URL(redirected).pathname, basePath);
            assert.equal(restoreRoute(redirected, baseURI), original.pathname + original.search + original.hash);
        });
    }
}

test('regular navigation is left unchanged', () => {
    const base = 'https://syla-av.github.io/Project-Event-Card/';
    assert.equal(restoreRoute(base + 'events/1', base), undefined);
});

for (const route of ['https://example.com/steal', '//example.com/steal', '../other-project/', '/outside/']) {
    test(`rejects a route outside the application: ${route}`, () => {
        const base = 'https://syla-av.github.io/Project-Event-Card/';
        const destination = new URL(base);
        destination.searchParams.set('__eventease_route', route);
        assert.equal(restoreRoute(destination.href, base), undefined);
    });
}
