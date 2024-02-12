import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import routers from "./routers"
import connectDatabase from "./helpers/database/connectDatabase"
import customErrorHandler from "./middlewares/errors/customErrorHandler"
import bodyParser from "body-parser"
//.env dosyasından gizli bilgileri çekmek için kullanıyoruz(veri tabanı bağlantısı gibi)
dotenv.config()

//veri tabanı bağlantısı
connectDatabase()
const app = express()

// Kaynak paylaşımı izinleri
app.use(cors())

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
//json formatında işlem yapıyoruz
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use("/api", routers)
app.use(customErrorHandler)

//server başlatılıyor
app.listen(PORT, () => {
    console.log(`App started on ${PORT}`)
})