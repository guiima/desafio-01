const express = require("express");

const server = express();

server.use(express.json());

let qtdResquest = 0;

const projects = [
  {
    id: "1",
    title: "novo projeto7",
    tasks: ["tarefa1", "tarefa2", "tarefa3"]
  },
  {
    id: "2",
    title: "novo projeto7",
    tasks: ["tarefa1", "tarefa2", "tarefa3"]
  },
  {
    id: "3",
    title: "novo projeto7",
    tasks: ["tarefa1", "tarefa2", "tarefa3"]
  }
];

//    Midllewares

server.use((req, res, next) => {
  qtdResquest++;
  console.log(`Quantidade de requisições feitas até o momento: ${qtdResquest}`);
  return next();
});

function checkIdExists(req, res, next) {
  const { id } = req.params;
  const find = projects.find(item => {
    if (item.id == id) {
      return next();
    }
    return res.status(400).json({ error: "Id not found" });
  });
}

//    Rotas
server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;

  const find = projects.find(function(item) {
    return item.id == id;
  });

  return res.json(find);
});

server.post("/projects", (req, res) => {
  const project = req.body;

  projects.push(project);

  return res.json(projects);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const find = projects.find(item => {
    if (item.id == id) {
      item.title = title;
      return item;
    }
  });

  res.json(find);
});

server.delete("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;

  const find = projects.find(item => {
    return item.id == id;
  });

  const index = projects.indexOf(find);

  if (index != -1) {
    projects.splice(index, 1);
    return res.json(projects);
  }
  return res.json(projects);
});

server.post("/projects/:id/:tasks", checkIdExists, (req, res) => {
  const { id, tasks } = req.params;

  const find = projects.find(item => {
    if (item.id == id) {
      item.tasks.push(tasks);
      return item;
    }
  });

  return res.json(find);
});

server.listen(3000);
