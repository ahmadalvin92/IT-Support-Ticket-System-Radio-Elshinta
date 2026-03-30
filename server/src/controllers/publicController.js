const prisma = require('../config/db')

const getStats = async (req, res) => {
  try {
    const totalTickets = await prisma.ticket.count()
    const totalUsers = await prisma.user.count()
    const resolved = await prisma.ticket.count({
      where: { status: 'DONE' }
    })

    res.json({
      totalTickets,
      totalUsers,
      resolved
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getRecentReports = async (req, res) => {
  try {
    const reports = await prisma.ticket.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    })

    res.json(reports)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getStats, getRecentReports }