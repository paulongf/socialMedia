import express from "express";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
const app = express();
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

//middlewares 
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
})
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });

const upload = multer({storage: storage});

app.post("/backend/upload", upload.single("file"), (req, res) =>{
    const file = req.file;
    res.status(200).json({ fileName: file.filename, filePath: `/upload/${file.filename}` });
});


app.use("/backend/auth", authRoutes);
app.use("/backend/users", userRoutes);
app.use("/backend/posts", postRoutes);
app.use("/backend/comments", commentRoutes);
app.use("/backend/likes", likeRoutes);
app.use("/backend/relationships", relationshipRoutes);

app.listen(8800, ()=>{
    console.log("Connected to backend!")
});

