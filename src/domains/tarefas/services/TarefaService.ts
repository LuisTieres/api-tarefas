import { Tarefa } from '../models/Tarefa'

interface ICriarTarefa {
  title: string
}

interface IAtualizarTarefa {
  title?: string
  completed?: boolean
}

const tarefas: Tarefa[] = []

export class TarefaService {
  create({ title }: ICriarTarefa): Tarefa {
    if (!title) {
      throw new Error('O título da tarefa é obrigatório')
    }

    const novaTarefa: Tarefa = {
      id: Math.random().toString(36).substring(2, 11),
      title,
      completed: false,
    }

    tarefas.push(novaTarefa)
    return novaTarefa
  }

  list(): Tarefa[] {
    return tarefas
  }

  findById(id: string): Tarefa {
    const tarefa = tarefas.find((t) => t.id === id)
    if (!tarefa) {
      throw new Error('Tarefa não encontrada')
    }
    return tarefa
  }

  update(id: string, data: IAtualizarTarefa): Tarefa {
    const tarefa = this.findById(id)

    if (data.title !== undefined) tarefa.title = data.title
    if (data.completed !== undefined) tarefa.completed = data.completed

    return tarefa
  }

  delete(id: string): void {
    const index = tarefas.findIndex((t) => t.id === id)
    if (index === -1) {
      throw new Error('Tarefa não encontrada')
    }
    tarefas.splice(index, 1)
  }
}