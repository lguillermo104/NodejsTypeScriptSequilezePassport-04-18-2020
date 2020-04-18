export default { 
    jwtSecret: process.env.JWTSECRET || 'somesecrettoken',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb',
        USER: process.env.MONGODB_USER || '',
        PASSWORD: process.env.MONGODB_PASSWORD || ''
    }
}