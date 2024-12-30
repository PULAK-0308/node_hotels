const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
//define person schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],//user inn 3 values me se hi ek dal sakta h 
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


personSchema.pre('save',async function(next){
    const person=this;

    //hash the password only if it has been modified (or is new)
    if(!person.isModified('password'))
        return next();
    try{
        //hash password gneration
        const salt=await bcrypt.genSalt(10);

        //hash password
        const hashedPassword=await bcrypt.hash(person.password,salt);
        console.log(hashedPassword)
        person.password=hashedPassword;
        console.log(this.password)
        console.log(person.password)
        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        console.log(this.password)
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}


//create Person model
const Person = mongoose.model('Person', personSchema);

module.exports=Person;