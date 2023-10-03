const express = require("express");

const app = express();
app.use(express.json());

var todo = [];

//find index function
function findindex(arr, id) {
  for (i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return i;
    }
  }
  return -1;
}

//remoteAtindex

function removeAtIndex(arr, index) {
  const newArray = [];
  console.log(index);
  for (let i = 0; i < arr.length; i++) {
    if (i != index) {
      newArray.push(arr[i]);
    }
  }

  return newArray;
}

// create todo
app.post("/todo", (req, res) => {
  const todoobj = {
    id: Math.floor(Math.random() * 100000),
    title: req.body.title,
    description: req.body.description,
  };

  todo.push(todoobj);
  res.status(201).json(todoobj);
});

// delete todo
app.delete("/delete/:id", (req, res) => {
  const index = findindex(todo, parseInt(req.params.id));

  if (index == -1) {
    return res.status(401).send();
  }

  todo = removeAtIndex(todo, index);

  return res.status(200).json("Todo Deleted");
});
// get All todos
app.get("/gettodo", (req, res) => {
  res.json(todo);
});

// update Todo

app.put("/update", (req, res) => {
  const updatedtodo = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
  };

  index = findindex(todo, req.body.id);
  if (index === -1) {
    return res.status("Data Not Found");
  }
  todo[index] = updatedtodo;
  return res.status(200).json(todo[index]);
});

app.listen(5000, () => {
  console.log("Server is running on 5000");
});
