import type { Request, Response } from 'express'
import { TarefaService } from '../services/TarefaService'

const service = new TarefaService()

export class TarefaController {
  async create(req: Request, res: Response) {
    try {
      const { title } = req.body
      const tarefa = await service.create({ title })
      return res.status(201).json(tarefa)
    } catch (error: any) {
      return res.status(400).json({ erro: error.message })
    }
  }

  async list(req: Request, res: Response) {
    const tarefas = await service.getAll()
    return res.status(200).json(tarefas)
  }

  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const tarefa = await service.getById(id)
      return res.status(200).json(tarefa)
    } catch (error: any) {
      return res.status(404).json({ erro: error.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const { title, completed } = req.body
      const tarefa = await service.update(id, { title, completed })
      return res.status(200).json(tarefa)
    } catch (error: any) {
      return res.status(404).json({ erro: error.message })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      await service.delete(id)
      return res.status(204).send()
    } catch (error: any) {
      return res.status(404).json({ erro: error.message })
    }
  }
}