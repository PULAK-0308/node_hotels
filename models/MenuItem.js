const mongoose=require('mongoose');

//define person schema
const menuItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],//user inn 3 values me se hi ek dal sakta h 
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    
    num_sales:{
        type:Number,
        default:0
    }
})

//create Person model
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports=MenuItem;