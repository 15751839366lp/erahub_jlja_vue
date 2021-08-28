import vue from '@vitejs/plugin-vue'

export default {
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    },
    server: {
        host: "127.0.0.1",
        port: 9999,
        proxy: {
            // string shorthand
            // '/foo': 'http://localhost:4567',
            // with options
            '/api': {
                target: 'http://127.0.0.1:8888',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            // // with RegEx
            // '^/fallback/.*': {
            //     target: 'http://jsonplaceholder.typicode.com',
            //     changeOrigin: true,
            //     rewrite: (path) => path.replace(/^\/fallback/, '')
            // },
            // Using the proxy instance
            // '/api': {
            //     target: 'http://jsonplaceholder.typicode.com',
            //     changeOrigin: true,
            //     configure: (proxy, options) => {
            //         // proxy will be an instance of 'http-proxy'
            //     }
            // }
        }
    }
}