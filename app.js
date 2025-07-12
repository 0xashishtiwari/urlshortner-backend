const express = require('express');
const   mongoose  = require('mongoose');
const userRoute = require('./routes/userRoute');
const app = express();
const cors = require('cors');
require('dotenv').config();


async function main() {
  await mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
    console.log('Db connected successfully');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main();
app.use(cors({
  origin: ['http://localhost:5173','https://urldash.netlify.app']  ,// React dev server (Vite)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/',userRoute)

app.listen(process.env.PORT, ()=>{
    console.log('server started');
})
