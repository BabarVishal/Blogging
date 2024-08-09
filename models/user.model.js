const { Schema, model }  = require("mongoose")
const {createHmac, randomBytes} = require("crypto");

const userSchema = new Schema({
    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    salt:{
        type: String,
    },
    password:{
        type: String,
        require: true,
    },
    profileImgURL:{
        type: String,
        default: "./imgs/default.png",
    },
    role:{
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
},
{
    timestamps:true,
}
);

userSchema.pre("save", function(next){
    const user = this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashpassword = createHmac('sha256', salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashpassword;

    next();

})

userSchema.static("matchPassword", async function(email, password){
     const user = await this.findOne({email});
     if(!user) throw new Error("User not Found!")

     const salt = user.salt;
     const hashpassword = user.password;

     const userProvidedHash = createHmac('sha256', salt)
     .update(password)
     .digest("hex");

     if(hashpassword !== userProvidedHash) throw new Error("Incorrect password!")
 
     return user;
})

const user = model("user", userSchema);

module.exports = user;