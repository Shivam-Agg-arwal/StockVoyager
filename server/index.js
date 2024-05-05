const express=require('express');
const app=express();

const userRoutes=require('./routes/User');
const profileRoutes=require('./routes/Profile');
const watchlistRoutes=require('./routes/Watchlist');
const stockRoutes=require('./routes/Stock');
const graphRoutes=require('./routes/Graph')

const {dbConnect}=require('./config/database');
const cookieParser=require('cookie-parser');
const fileUpload=require('express-fileupload');
const {cloudinaryConnect}=require('./config/cloudinary');
const cors=require("cors");
require("dotenv").config();


const PORT=process.env.PORT || 5000;


app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
);

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)


dbConnect();
cloudinaryConnect();


app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/watchlist",watchlistRoutes);
app.use("/api/v1/stock",stockRoutes);
app.use("/api/v1/graph",graphRoutes);



app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Default route has been running succesfuly"
    })
});

app.listen(PORT,()=>{
    console.log(`YOur backend is running on ${PORT}`);
})