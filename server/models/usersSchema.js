const mongoose = require("mongoose");

const validator = require("validator"); //to validate emails


//create users schema

const usersSchema=new mongoose.Schema({

    firstname: {
        type:String,  //string datatype
        required: true, //it is necessary to fill firstname
        trim:true //trim extra whitespace from start and end of the name

    },

    email:{

        type:String,  //string datatype
        required: true, //it is necessary to fill firstname
        unique:true, //so that one email can add only a single time

        validate(value) //check that the given email type is valid or not
        {
            if(!validator.isEmail(value))
            {
                throw Error("Not Calid Email");
            }

        }

    },
    mobile:{

        type:String,  //string datatype
        required: true, //it is necessary to fill firstname
        unique:true, //so that one email can add only a single time
        minlength:10, //minimum 10 digits should be there
        maxlength:10 //maxlength is also 10


    },

    gender:{

        type:String,  //string datatype
        required: true, //it is necessary to fill firstname

    },

    status:{
        type:String,  //string datatype

        enum: ["Active","In-Active"],
        default:"Active"
    },

    datecreated:Date,
    dateupdated:Date

});


//define model

const users = new mongoose.model("users",usersSchema);

//export users

module.exports=users;
 