import dotenv from "dotenv"
import connectDB from "./db/index.js"
import {app} from './app.js'
dotenv.config({ 
    path: './env'
})
/* 
    * app.use() is used while dealing with middleware
*/
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, '0.0.0.0', () => {
        console.log(`   Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGODB connection failed !!!!!", err);
})
