const {Schema, model, Types} = require("mongoose")

const CommentSchema = new Schema({
    Content: {
        type: String,
        require: true,
    },

    blogId:{
        type: Schema.Types.ObjectId,
        ref: "blog",

    },

    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "user",
    },
},{
    timestamps: true
})


const Coments =  model("Coments", CommentSchema);
module.exports = Coments;