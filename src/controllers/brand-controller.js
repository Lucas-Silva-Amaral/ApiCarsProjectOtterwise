import { prisma } from "../helpers/utils.js"

export const index = async (_, reply) => {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: [
        {
          id: "asc",
        },
      ],
    })
    return reply.send(brands)
  } catch (error) {
    console.error(error)
    return reply.status(500).send(error)
  }
}

export const create = async (req, reply) => {
  const { name } = req.body
  console.log(req.body)
  if (!name) return reply.status(400).send("Campo nome não preenchido")

  try {
    const brand = await prisma.brand.create({
      data: {
        name,
      },
    })
    return reply.status(203).send(brand)
  } catch (error) {
    console.error(error)
    return reply.status(500).send(error)
  }
}

export const update = async (req, reply) => {
  const { id } = req.params
  const { name } = req.body

  if (!name) return reply.status(400).send("Campo nome não preenchido")

  try {
    const brand = await prisma.brand.update({
      where: { id: parseInt(id) },
      data: { name },
    })
    return reply.status(200).send(brand)
  } catch (error) {
    console.error(error)
    return reply.status(500).send(error)
  }
}

export const remove = async (req, reply) => {
  const { id } = req.params

  try {
    const brand = await prisma.brand.delete({ where: { id: parseInt(id) } })
    return reply.status(200).send(brand)
  } catch (error) {
    console.error(error)
    return reply.status(500).send(error)
  }
}
