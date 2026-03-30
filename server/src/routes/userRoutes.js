const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController')

router.get('/', authMiddleware, roleMiddleware('ADMIN'), getAllUsers)
router.post('/', authMiddleware, roleMiddleware('ADMIN'), createUser)
router.put('/:id', authMiddleware, roleMiddleware('ADMIN'), updateUser)
router.delete('/:id', authMiddleware, roleMiddleware('ADMIN'), deleteUser)

module.exports = router