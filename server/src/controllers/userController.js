const bcrypt = require('bcrypt')
const prisma = require('../config/db')

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      }
    })

    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { name, email, role } = req.body

    const user = await prisma.user.update({
      where: { id },
      data: { name, email, role }
    })

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id)

    await prisma.user.delete({
      where: { id }
    })

    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
}