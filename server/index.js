import { MongoClient} from 'mongodb' //module type
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { usersRouter } from './user.js';
import { clientsRouter } from './client.js';
import { leadsRouter } from './leads.js';
import { ticketsRouter } from './tickets.js';

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;  
const MONGO_URL = process.env.MONGO_URL

async function CreateConnection(){
    const client = new MongoClient(MONGO_URL)
    await client.connect()
    console.log('connection established');
    return client;
  }
  export const client= await CreateConnection();  

app.use("/users",usersRouter)
app.use("/clients",clientsRouter)
app.use("/leads",leadsRouter)
app.use("/tickets",ticketsRouter)

app.listen(PORT,()=>console.log("The server is started",PORT))
