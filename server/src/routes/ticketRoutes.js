const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

const {
  createTicket,
  getMyTickets,
  getAllTickets,
  updateTicket,
  deleteTicket
} = require('../controllers/ticketController')

router.post('/', authMiddleware, roleMiddleware('USER', 'ADMIN'), createTicket)
router.get('/my', authMiddleware, roleMiddleware('USER', 'ADMIN'), getMyTickets)
router.get('/', authMiddleware, roleMiddleware('ADMIN'), getAllTickets)
router.put('/:id', authMiddleware, roleMiddleware('ADMIN'), updateTicket)
router.delete('/:id', authMiddleware, roleMiddleware('ADMIN'), deleteTicket)

module.exports = router