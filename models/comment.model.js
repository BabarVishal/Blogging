const {Schema, model, Types} = require("mongoose")

const CommentSchema = new Schema({
    Content: {
        type: String,
        require: true,
    },

    blogId:{
        type: Schema.Types.ObjectId,
        req: "Blog"

    },

    createdBy:{
        type: Schema.Types.ObjectId,
        req: "user"
    },
},{
    timestamps: true
})


const Coments =  model("Coments", CommentSchema);
module.exports = Coments;