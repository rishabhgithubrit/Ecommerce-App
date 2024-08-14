import  express  from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"
import cors from 'cors'
dotenv.config()
connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/products',productRoute)

app.get('/testing', (req,res)=>{
    res.json({
        success: true,
        msg: "server is working"
    })
})



app.get('/',(req,res)=> {
    res.send("<h1>welcome to ecommerce app MERN STACK Project</h1>") 
})
const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server is Runing on ${process.env.DEV_MODE} mode on port ${PORT}`)
})