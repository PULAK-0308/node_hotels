const express=require('express');
const router=express.Router();

const Person=require('../models/Person')

router.post('/',async(req,res)=>{

    try{
        const data=req.body;
        const newPerson=new Person(data);
        const response=await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})


// router.put('/',async(req,res)=>{
//     try{
//         const data=await Person.updateOne({name:"Alice"},{$set:{age:22}});
//         console.log('data updated');
//         res.status(200).json(data);
//     }catch(err)
//     {
//         console.log(err);
//         res.status(500).json({error:'internal server error'});
//     }
// })

router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;//extract id from url parameter
        const updatedPersonData=req.body;//updated data for person

        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,//return updated document
            runValidators:true//run mongoose validation
        })

        if(!response){
            return res.status(400).json({error:'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

router.get('/',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

router.get('/:workType',async(req,res)=>{
    try{

        const workType=req.params.workType;
        if(workType=="chef" || workType=="waiter" || workType=="manager")
        {
            const data=await Person.find({work:workType});
            console.log('data fetched');
            res.status(200).json(data);
        }
        else{
            res.status(400).json({error:'invalid work type'})
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;//extract id from url parameter
        
        const response=await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(400).json({error:'Person not found'});
        }

        console.log('data deleted');
        res.status(200).json({message:"person deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

module.exports=router;
