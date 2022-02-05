import express from 'express';
import{getClient , InsertNewClinet} from './helper.js';
const router= express.Router();
import {auth} from './auth.js'

router.post('/',auth, express.json() ,async(req, res) =>{
    const {clientname,clientmailid,company} = req.body
    req.headers['content-type'] = 'application/json';
    const result = await InsertNewClinet({
      clientname :clientname,
      clientmailid:clientmailid,
      company: company,
     });
    res.send(result);  
    })

router.get('/',auth, express.json() ,async(req, res) =>{
        const result = await getClient()
        res.send(result);  
        })

    
    export const clientsRouter =  router;