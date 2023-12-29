const { default: mongoose } = require("mongoose");

const schema= new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength : [6,"Length is short!!"],
        select:false
    }

});

mongoose.models={};
export const User=mongoose.model("User",schema);