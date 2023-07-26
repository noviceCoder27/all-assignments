export {};
const express = require('express');
const { authenticateJwt, SECRET } = require("../middleware/index");
const { Todo } = require("../db");
import { Request,Response } from "express";
const router = express.Router();

interface RequestObject extends Request {
  userId : string
}

interface Todo {
  title: string,
  description : string,
  done: boolean,
  userId: string
}

router.post('/todos', authenticateJwt, (req: RequestObject, res: Response) => {
  const { title, description } = req.body;
  const done = false;
  const userId = req.userId;

  const newTodo = new Todo({ title, description, done, userId });

  newTodo.save()
    .then((savedTodo: Todo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err: object) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


router.get('/todos', authenticateJwt, (req: RequestObject, res: Response) => {
  const userId = req.userId;

  Todo.find({ userId })
    .then((todos: Array<Todo>) => {
      res.json(todos);
    })
    .catch((err: object) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

router.patch('/todos/:todoId/done', authenticateJwt, (req: RequestObject, res: Response) => {
  const { todoId } = req.params;
  const userId = req.userId;

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo: Todo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch((err: object) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});

module.exports = router;