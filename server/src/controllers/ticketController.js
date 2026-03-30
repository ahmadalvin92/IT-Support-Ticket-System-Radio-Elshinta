const prisma = require('../config/db')

const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' })
    }

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        userId: req.user.id
      }
    })

    res.status(201).json(ticket)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getMyTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    })

    res.json(tickets)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json(tickets)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateTicket = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { status, resolution } = req.body

    const ticket = await prisma.ticket.update({
      where: { id },
      data: { status, resolution }
    })

    res.json(ticket)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteTicket = async (req, res) => {
  try {
    const id = Number(req.params.id)

    await prisma.ticket.delete({
      where: { id }
    })

    res.json({ message: 'Ticket deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createTicket,
  getMyTickets,
  getAllTickets,
  updateTicket,
  deleteTicket
}