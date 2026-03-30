require('dotenv').config()
const http = require('http')
const app = require('./app')

const PORT = process.env.PORT || 5000

const server = http.createServer(app)

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('error', (err) => {
  console.error('SERVER ERROR:', err)
})

process.on('exit', (code) => {
  console.log('PROCESS EXIT CODE:', code)
})

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err)
})

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason)
})