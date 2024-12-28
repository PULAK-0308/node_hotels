const express = require('express')
const app = express()
const db=require('./db')

const bodyParse=require('body-parser');
app.use(bodyParse.json());

app.get('/', function (req, res) {
  res.send('welcome to my hotel')
})

//import Person Router
const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);

//import menuItem Router
const menuItemRoutes=require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes);


app.listen(3000,()=>{
    console.log("listening on port 3000");
})










