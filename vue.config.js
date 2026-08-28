module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/intsys/onsiteservice/' : '/',
    
    // Dev server config
    devServer: {
        port: 8081, // Dev port
        proxy: {
            '/intsys': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                ws: true
            },
            '/intranet': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false
            }
        }
    }
}