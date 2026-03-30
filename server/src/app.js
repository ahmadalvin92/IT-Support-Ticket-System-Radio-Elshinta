const express = require('express')
const cors = require('cors')

console.log('APP STARTING...')

const authRoutes = require('./routes/authRoutes')
const ticketRoutes = require('./routes/ticketRoutes')
const userRoutes = require('./routes/userRoutes')
const publicRoutes = require('./routes/publicRoutes')

const app = express() // ✅ HARUS di atas sebelum dipakai

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API is running' })
})

// routes
app.use('/api/auth', authRoutes)
app.use('/api/tickets', ticketRoutes)
app.use('/api/users', userRoutes)
app.use('/api/public', publicRoutes) // ✅ cukup sekali di sini

module.exports = app