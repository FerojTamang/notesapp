import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import noteRoutes from './routes/noteRoutes.js'
import dotenv from 'dotenv'

//reaading and acessing .env
//pailaa reada garani ani balla tala const port garera bolaxa

//backend ma chai pailaia dotenv file load gar hai vaaneko hamle

dotenv.config() 
// console.log(process.env)

const MONGODB_URI = process.env.MONGODB_URI;
if(!MONGODB_URI){
    console.log("URI is not exists.")
}


const PORT = process.env.PORT || 5000

const app = express()

//middleware

app.use(cors()) //update garda error aaunia yei karaan le ho acors vneko hamle ka bataa excess dini ho 
app.use(express.json()) //ako datalai json formaat maa linxa

//health check endpoint, server test garna lai 

app.get('/', (req , res)=>{
    res.status(200).json({status: 'ok', message:'server is live'})
})


//routes
app.use('/api/notes',noteRoutes) 
//yesko route ma amero aold averisona ni chalnxa vaane hmle v1/api/notes
//kinda avanda aold versiona use garni user ni ahunaa sakxani 

//MONGOOSE Connection, server maa chaai sakesaamma minimum change haru garni matrai hunxa 

mongoose
.connect(MONGODB_URI)
.then(()=> console.log('connect to mongoDB'))
.catch((err) => console.error('Mongodb connection error:', err))

//backend le k k aaairakhxaa sunirakhaxa 
app.listen(PORT, ()=>{
    console.log(`Server running on port: http://localhost:${PORT}`)
}
)


