import express, { Router } from'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const __dirname = path.resolve();

const app=express();
dotenv.config();

import router from './routes/route.js';
import Connection from './database/db.js';

app.set('trust proxy', 1);


app.use(cors({
  origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
  }));

app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended : true}))
app.use('/',router);

app.use(express.static(path.join(__dirname,"./client/build")));

app.get('*',function(_, res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"),function(err){
    res.status(500).send(err);
  })
})

const PORT = process.env.PORT || 8000;

const URL=process.env.MONGODB_URI;

Connection(URL);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

