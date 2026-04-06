module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/intsys/onsiteservice/' : '/',
    
    // Dev server config
    devServer: {
        port: 8081, // Dev port
        proxy: {
            // Proxy backend requests to MAMP (port 8080)
            '/intranet': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false
            },
            '/intsys': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false
            }
        }
    }
}