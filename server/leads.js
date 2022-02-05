import express from 'express';
import{getLead , InsertNewLead} from './helper.js';
const router= express.Router();
import {auth} from './auth.js'

router.post('/',auth, express.json() ,async(req, res) =>{
    const {customername,customermailid,status} = req.body
    req.headers['content-type'] = 'application/json';
    const result = await InsertNewLead({
        customername:  customername,
        customermailid : customermailid,
        status  : status
     });
    res.send(result);  
    })

router.get('/',auth, express.json() ,async(req, res) =>{
        const result = await getLead()
        res.send(result);  
        })

    
    export const leadsRouter =  router;