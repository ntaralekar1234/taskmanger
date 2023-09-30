const path = require('path');
const fs = require("fs");
const routes = require('express').Router();
const taskData = require('../tasks.json');
const validator = require('../helpers/validator');
const bodyParser = require('body-parser');

routes.use(bodyParser.json());


routes.get('/',(req,res) => {
    let tasks = taskData;
    res.status(200);
    res.send(tasks);
})

routes.get('/:id',(req,res) => {
    let tasks = taskData.filter((task) => {
        return task.id == req.params.id;
    });
    res.status(200);
    res.send(tasks);
})

routes.post('/', (req, res) => {
    const taskDetails = req.body;
    let writePath = path.join(__dirname, '..', 'tasks.json');
    let validateData = validator.validateTaskInfo(taskDetails, taskData);
    if(validateData.status) {
      let taskDataModified = JSON.parse(JSON.stringify(taskData));
      taskDataModified.push(taskDetails);
      fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {encoding:'utf8', flag:'w'});
      res.status(200);
      res.json(validateData);
    } else {
      res.status(400);
      res.json(validateData)
    }
  });

  routes.put('/:id', (req, res) => {
    const taskDetails = req.body;
    let writePath = path.join(__dirname, '..', 'tasks.json');
    let validateData = validator.validateTaskUpdateInfo(taskDetails);
    if(validateData.status) {
        let taskDataModified = JSON.parse(JSON.stringify(taskData));
        for(const task of taskDataModified) {
            if(task.id == req.params.id) {
              task.title = taskDetails.title
              task.description = taskDetails.description
              task.completed = taskDetails.completed
             
              break;
            }
        }
      fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {encoding:'utf8', flag:'w'});
      res.status(200);
      res.json(validateData);
    } else {
      res.status(400);
      res.json(validateData)
    }
  });

  routes.delete('/:id', (req, res) => {
    let writePath = path.join(__dirname, '..', 'tasks.json');
    let taskDetailsData = JSON.parse(JSON.stringify(taskData));
    taskDataModified = taskDetailsData.filter((task) => task.id != req.params.id)
       
    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {encoding:'utf8', flag:'w'});
    res.status(200);
    res.json({ "status" : true,"message": `Task ${req.params.id} has been removed !`} );

  });

  module.exports = routes;