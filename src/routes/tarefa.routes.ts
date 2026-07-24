import type { Request, Response } from 'express'

const { Router } = require('express')
const { TarefaController } = require('../domains/tarefas/controllers/TarefaController')

const tarefaRoutes = Router()
const controller = new TarefaController()

tarefaRoutes.post('/', (req: Request, res: Response) => controller.create(req, res))
tarefaRoutes.get('/', (req: Request, res: Response) => controller.list(req, res))
tarefaRoutes.get('/:id', (req: Request, res: Response) => controller.findById(req, res))
tarefaRoutes.put('/:id', (req: Request, res: Response) => controller.update(req, res))
tarefaRoutes.delete('/:id', (req: Request, res: Response) => controller.delete(req, res))

module.exports = { tarefaRoutes }