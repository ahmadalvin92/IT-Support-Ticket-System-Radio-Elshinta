const express = require('express')
const router = express.Router()
const {
  getStats,
  getRecentReports
} = require('../controllers/publicController')

router.get('/stats', getStats)
router.get('/reports', getRecentReports)

module.exports = router