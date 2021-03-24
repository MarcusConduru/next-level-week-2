import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// GET: Buscar ou listar uma informação
// POST: Criar alguma nova informação
// PUT: Atualizar uma informação
// DELETE: Deletar uma informação existente

// corpo(request Body): Dados para criação ou atualização de um registro
// Route params: identificar qual recurso eu quero atualizar ou deletar
// Query params: Paginação, filtros, ordenação

app.listen(3333);