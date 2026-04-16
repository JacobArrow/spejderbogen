/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';

const worker = self as unknown as ServiceWorkerGlobalScope;
const STATIC_CACHE = `cache${version}`;
const OFFLINE_CACHE = `offline${version}`;
const OFFLINE_PAGE = '/offline.html';

const to_cache = build.concat(files);
const staticAssets = new Set(to_cache);

worker.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(STATIC_CACHE)
			.then((cache) => cache.addAll(to_cache))
			.then(() => worker.skipWaiting())
	);
});

worker.addEventListener('activate', (event) => {
	const keepCaches = new Set([STATIC_CACHE, OFFLINE_CACHE]);
	event.waitUntil(
		caches.keys().then(async (keys) => {
			for (const key of keys) {
				if (!keepCaches.has(key)) await caches.delete(key);
			}
			worker.clients.claim();
		})
	);
});

async function fetchAndCache(request: Request) {
	const cache = await caches.open(OFFLINE_CACHE);

	try {
		const response = await fetch(request);
		cache.put(request, response.clone());
		return response;
	} catch (err) {
		const response = await cache.match(request);
		if (response) return response;

		throw err;
	}
}

worker.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET' || event.request.headers.has('range')) return;

	const url = new URL(event.request.url);

	const isHttp = url.protocol.startsWith('http');
	const isDevServerRequest =
		url.hostname === self.location.hostname && url.port !== self.location.port;
	const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
	const skipBecauseUncached = event.request.cache === 'only-if-cached' && !isStaticAsset;

	if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
		event.respondWith(
			(async () => {
				const cachedAsset = isStaticAsset && (await caches.match(event.request));
				if (cachedAsset) return cachedAsset;

				try {
					return await fetchAndCache(event.request);
				} catch (err) {
					if (event.request.mode === 'navigate') {
						const fallback = await caches.match(OFFLINE_PAGE);
						if (fallback) return fallback;
					}
					throw err;
				}
			})()
		);
	}
});
