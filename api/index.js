import express from 'express'
import dotenv from 'dotenv'
import usersRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import { db } from "./db.js"
const app= express()

dotenv.config();

app.use(express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;

  res.status(200).json(file.filename);
});


/*  QUICK METHOD FOR IMAGE UPLOAD
const upload=multer({dest: 'uploads/'})
app.post('/api/upload',upload.single('file'), function (req,res){
res.status(200).json('Image has been uploaded')
})*/
app.use('/api/auth',authRoutes)
app.use('/api/users',usersRoutes)
app.use('/api/posts',postRoutes)

app.listen(5000, ()=>{

    console.log("Connected!!")

})


