/** @type {import('next').NextConfig} */
const path = require('path');
const withPWA = require('next-pwa')({
    dest: 'public',
    disable: true, // Deshabilitar PWA completamente para debug
    // register: true,
    // scope: '/app',
    // sw: 'service-worker.js',
    //...
});

module.exports = withPWA({
    images: {
  domains: ['nutrirargentina.org','www.nutrirargentina.org'],
  remotePatterns: [
    { protocol: 'https', hostname: 'nutrirargentina.org',     pathname: '/media/**' },
    { protocol: 'http',  hostname: 'nutrirargentina.org',     pathname: '/media/**' },
    { protocol: 'https', hostname: 'www.nutrirargentina.org', pathname: '/media/**' },
    { protocol: 'http',  hostname: 'www.nutrirargentina.org', pathname: '/media/**' },
  ],
},
});