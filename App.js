const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Todo = require('./models/Todo');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.get('/api/todos', (req, res) => {
  Todo.find()
    .then((todo) => {
      res.json({todo});
    })
});

app.post('/api/todos', async(req, res) => {
  Todo.create(req.body)
    .then((todo) => {
      res.json(todo);
    })
});


app.delete('/api/todos/:id', async(req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then((todo) => {
      res.json(todo);
    })
});

mongoose.connection("localhost://127.0.0.1/ZAYNYASEEN").then(()=>{
    console.log("The connection has established Succesfully")
}).catch(err=>{
    console.log('The connection has not established yet: ');
})
app.listen(5000);
