self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('static')
        .then(function(cache) {
            // cache.add('/');
            // cache.add('/index.html');
            // cache.add('/src/js/app.js');
            cache.addAll([
                '/',
                '/index.html',
                '/src/js/app.js',
                '/src/css/app.css',
                '/src/images/pwa.jpg',
                'https://fonts.googleapis.com/css?family=Raleway:400,700'
            ])
        })
    );
    
    console.log('SW installed');
});

self.addEventListener('activate', function() {
    console.log('SW activated');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if(response) {
                return response;
            }
            else {
                return fetch(event.request);
            }
        })
    );
});