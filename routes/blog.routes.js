const {Router} = require("express");
const router = Router();
const path = require("path");
const Blog = require("../models/blog.model")

const multer = require("multer");
const Coments = require("../models/comment.model");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName);
    }
  })
  
  const upload = multer({ storage: storage })


router.get("/add-new",(req, res) => {
    return res.render("addBlog",{
        user: req.user,
    })
})

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Coments.find({ blogId: req.params.id }).populate("createdBy");
    return res.render("Blog", {
      user: req.user,
      blog,
      comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});



router.post("/", upload.single("coverImage"), async(req, res) => {
   const {title, body} = req.body;
 const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`
   })
     return res.redirect(`/blog/${blog._id}`);
})

router.post("/comment/:blogId", async(req, res) => {
   await Coments.create({
    Content: req.body.Content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  })
   return res.redirect(`/blog/${req.params.blogId}`)
})


module.exports = router;