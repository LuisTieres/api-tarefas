import type { Request, Response } from 'express'
import { TarefaService } from '../services/TarefaService'

const service = new TarefaService()

export class TarefaController {
  create(req: Request, res: Response) {
    try {
      const { title } = req.body
      const tarefa = service.create({ title })
      return res.status(201).json(tarefa)
    } catch (error: any) {
      return res.status(400).json({ erro: error.message })
    }
  }

  list(req: Request, res: Response) {
    const tarefas = service.list()
    return res.status(200).json(tarefas)
  }

  findById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const tarefa = service.findById(id)
      return res.status(200).json(tarefa)
    } catch (error: any) {
      return res.status(404).json({ erro: error.message })
    }
  }

  update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { title, completed } = req.body
      const tarefa = service.update(id, { title, completed })
      return res.status(200).json(tarefa)
    } catch (error: any) {
      return res.status(404).json({ erro: error.message })
    }
  }

  delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      service.delete(id)
      return res.status(204).send()
    } catch (error: any) {
      return res.status(404).json({ erro: error.message })
    }
  }
}