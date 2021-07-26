const {Schema, model, Types} = require("mongoose");

const User = new Schema ({
    name:{type: String},
    birthDay:{type: Date},
    email:{type: String, required: true, unique: true},
    phone:{type:String},
    serialPass:{type:String},
    selectedDatePass:{type: Date},
    provide:{type: String},
    idPassOffice:{type:String},
    idDrivingLicense:{type:String},
    selectedDateDrivingLicence:{type: Date},
    password:{type: String, required: true},
    roles:[{type:String, ref:"Role"}],
    links: [{type: Types.ObjectId, ref: "Link" }]
});
module.exports = model ("User", User);