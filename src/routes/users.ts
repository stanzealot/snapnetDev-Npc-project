import express from 'express';
var router = express.Router();

router.get('/new',(req,res)=>{
    res.send('welcome');
});




export default router;
