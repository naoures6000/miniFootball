const express=require('express')
const path = require('node:path');
require("dotenv").config()
const playerRoute=require('./routers/registerplayer.route')
const coachRoute=require('./routers/registercoach.route')
const eventsRoute=require('./routers/events.route')

const eliteRoute=require('./routers/elite.route')
const app=express()
const cors = require("cors")
const mongoose=require('mongoose')
app.use(express.static(__dirname + "/public"));
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(cors());
app.options('*', cors());

//mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
mongoose
    .connect(process.env.database)
    .then((conn) => {
      console.log(`Database Connected`);
    })
    .catch((err) => {
      console.error(`Database Error: ${err}`);
      process.exit(1);
    });
app.use('/',playerRoute)
app.use('/',coachRoute)
app.use('/',eventsRoute)

app.use('/',eliteRoute)


app.listen(7000,()=>console.log('server run in port 7000'));