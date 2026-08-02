import { prisma } from '../../../config/prismaClient'
import { Prisma } from '../../../../generated/prisma/client'

interface ICriarTarefa {
  title: string
}

interface IAtualizarTarefa {
  title?: string
  completed?: boolean
}

export class TarefaService {
  async create({ title }: ICriarTarefa) {
    if (!title) {
      throw new Error('O título da tarefa é obrigatório')
    }

    return prisma.task.create({
      data: { title },
    })
  }

  async getAll() {
    return prisma.task.findMany()
  }

  async getById(id: number) {
    const tarefa = await prisma.task.findUnique({ where: { id } })
    if (!tarefa) {
      throw new Error('Tarefa não encontrada')
    }
    return tarefa
  }

  async update(id: number, data: IAtualizarTarefa) {
    try {
      return await prisma.task.update({ where: { id }, data })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new Error('Tarefa não encontrada')
      }
      throw error
    }
  }

  async delete(id: number) {
    try {
      await prisma.task.delete({ where: { id } })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new Error('Tarefa não encontrada')
      }
      throw error
    }
  }
}
