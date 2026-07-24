const express = require('express')
const { tarefaRoutes } = require('./routes/tarefa.routes')

const app = express()
const PORT = 3333

app.use(express.json())

app.use('/tasks', tarefaRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
})