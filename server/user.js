import express from 'express';
import { InsertNewUser,genPassword, getUserbyName } from './helper.js';
import bcrypt, { hashSync } from 'bcrypt'
const router = express.Router();
import jwt from 'jsonwebtoken';


router.post('/signup', express.json() ,async(req, res) =>{
    const {firstname,lastname,username,type,password} = req.body
    req.headers['content-type'] = 'application/json';
    const isUserexists = await getUserbyName(username)
     if(isUserexists.length!=0){
      res.status(400).send({message:"Username already exists"})
      return;
    }
      if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)){
        res.status(400).send({message:"Password is not strong enough"})  
        return;
      }
    const hashedpassword = await genPassword(password)
    const result = await InsertNewUser({
      firstname :firstname,
      lastname : lastname,
      username: username,
      type:type,
      password: hashedpassword});
    res.send(result);  
    })
  
router.post('/signin', express.json() ,async(req, res) =>{
    const {firstname,lastname,username,type,password} = req.body
    req.headers['content-type'] = 'application/json';
    const userDetails = await getUserbyName(username)
     if(userDetails.length==0){
      res.status(400).send({message:"Invalid Credentials"})
      return;
    }
    const storedPassword = userDetails[0].password
    console.log(storedPassword)
    const isPasswordMatch = await bcrypt.compare(password,storedPassword)
    if(isPasswordMatch)
    {
      const token = jwt.sign({id: userDetails[0]._id},process.env.SECRET_KEY);
      res.send({message:"Sucessfull login",token:token})
    
    }
    else
    {
      res.status(400).send({message:"Invalid Credentials"})
      return;
    }
     res.send(isPasswordMatch);  
    })

export const usersRouter =  router;