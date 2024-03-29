const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        Phone:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            
        },
        credits:{
            type: Number
        }
        

    }
);

module.exports = mongoose.model('Passenger', userSchema);