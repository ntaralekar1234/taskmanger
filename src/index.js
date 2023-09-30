const express = require('express');
const routes = require('express').Router();
const taskRoutes = require('./routes/routes');

let port = 3000;
let app = express();
app.use(routes);

routes.use('/tasks', taskRoutes);

app.listen(port,()=> {
    console.log(`server is running on port ${port} `);
})