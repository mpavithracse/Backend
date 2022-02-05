import { client } from './index.js';
import bcrypt, { hashSync } from 'bcrypt'


export async function InsertNewUser(data) {
    return await client.db('newdb').collection('user').insertOne(data);
  }

  export  async function getUserbyName(name) {
    return await client.db('newdb').collection('user').find({ username: name }).toArray();
  }

  export async function genPassword(password){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword;
  }

  export  async function getClient() {
    return await client.db('newdb').collection('Clients').find().toArray();
  }
  export async function InsertNewClinet(data) {
    return await client.db('newdb').collection('Clients').insertOne(data);
  }

  export  async function getLead() {
    return await client.db('newdb').collection('leads').find().toArray();
  }
  export async function InsertNewLead(data) {
    return await client.db('newdb').collection('leads').insertOne(data);
  }
  export  async function getTickets() {
    return await client.db('newdb').collection('Tickets').find().toArray();
  }
  export async function InsertNewticket(data) {
    return await client.db('newdb').collection('Tickets').insertOne(data);
  }