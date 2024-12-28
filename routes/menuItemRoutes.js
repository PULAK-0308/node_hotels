const express=require('express');
const router=express.Router();

const MenuItem=require('../models/MenuItem')

//post method to add menu items
router.post('/',async(req,res)=>{

    try{
        const data=req.body;
        const newmenuItem=new MenuItem(data);
        const response=await newmenuItem.save();
        console.log('menu item saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

//get method to fetch menu items
router.get('/',async(req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

//put method to update menu items
router.put('/',async(req,res)=>{
    try{
        const data=await MenuItem.updateOne({name:"spicy paneer"},{$set:{ingredients:["paneer","red gravy","spices","milk"]}});
        console.log('data updated');
        res.status(200).json(data);
    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

router.get('/:tasteType',async(req,res)=>{
    try{
        const tasteType=req.params.tasteType;
        if(tasteType=="spicy" || tasteType=="sweet" || tasteType=="sour")
        {
            const data=await MenuItem.find({taste:tasteType});
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

module.exports=router;
