const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    street: String,
    city: String

})

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 150
    },
    email: {
        type: String,
        minLength: 5,
        required: true,
        uppercase: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),

    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),

    },
    hobbies: [String],
    address: addressSchema,
})

userSchema.methods.sayHi = function(){
    console.log(`Hi, my name is ${this.name}`)
}

userSchema.statics.findByName = function(name){
    return this.find({name: RegExp(name, 'i')})
}

userSchema.query.byName = function(name){
    return this.where({name: RegExp(name, 'i')})
}

userSchema.virtual('namedEmail').get(function(){
    return `${this.name}< ${this.email}>`
})

userSchema.pre("save", function(next){
    this.updateAt = Date.now()
    next()
})

userSchema.post("save", function(doc, next){
    doc.sayHi()
    next()
})

module.exports = mongoose.model("User", userSchema)