const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

// define the schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username:{
        required:true,
        type:String

    },
    password:{
        required:true,
        type:String

    }

});

// use an async pre hook without the `next` callback; throwing an error signals failure
personSchema.pre('save', async function () {
    // `this` is the document being saved
    if (!this.isModified('password')) {
        return; // nothing to hash
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        // propagate the error to mongoose
        throw err;
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;

    }
    catch(err){
        throw err;
    }
}

// create model and export
module.exports = mongoose.model('person', personSchema);



/* dummy data
{
  "name": "Rahul Sharma",
  "age": 28,
  "work": "chef",
  "mobile": "9876543210",
  "email": "rahul.sharma@example.com",
  "address": "123 MG Road, Delhi, India",
  "salary": 35000
}
*/