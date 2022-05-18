import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{type:String, required:true},
    password:{type:String, required: true},
    email:{type:String, required:true, unique:true},
    age:{type: Number, required: true},
    address:{type:String, required:true},
    phone:{type: Number, required:true},
    avatar:{type: String}
    // avatar:{data:Buffer, contentType: String }
});

// UserSchema.methods.hashPassword = (password) => {
//     return bcrypt.hashSync(password, 10);
// };

// UserSchema.methods.isValidPassword = (password) => {
//     return bcrypt.compareSync(password, this.password);
// };

export {UserSchema}