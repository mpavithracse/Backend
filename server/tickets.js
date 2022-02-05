import express from 'express';
import{getTickets , InsertNewticket} from './helper.js';
const router= express.Router();
import {auth} from './auth.js'

router.post('/',auth, express.json() ,async(req, res) =>{
    const {QuerySubject,QueryDescription,Status,Assignedto} = req.body
    req.headers['content-type'] = 'application/json';
    const result = await InsertNewticket({
        QuerySubject:QuerySubject,
        QueryDescription:QueryDescription,
        Status:Status,
        Assignedto:Assignedto
     });
    res.send(result);  
    })

router.get('/',auth,express.json() ,async(req, res) =>{
        const result = await getTickets()
        res.send(result);  
        })

    
    export const ticketsRouter =  router;