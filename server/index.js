const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const app = express()
const PORT = process.env.PORT || config.get('serverPort')
const authRouter = require('./routes/auth.routes')
const fileRouter = require('./routes/file.routes')
const corsMiddleWare = require('./middleware/cors.middleware')
const fileUpload = require('express-fileupload')
const filePathMiddleWare = require('./middleware/filepath.middleware')
const path = require('path')

app.use(fileUpload({}))
app.use(corsMiddleWare)
app.use(filePathMiddleWare(path.resolve(__dirname, 'files')))
app.use(filePathMiddleWare(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(express.static('files'))
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)


const start = async () => { 
    try {
        await mongoose.connect(config.get('dbUrl'), {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => {
            console.log(`Server is working on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()


