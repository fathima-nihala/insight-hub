const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const router = require('./router/route')

const app = express();

const dotenvConfig = dotenv.config({
    path: path.resolve(__dirname, './config', '.env')
})

if (dotenvConfig.error) {
    console.error('Error loading .env file:', dotenvConfig.error);
}

app.use(express.json());
app.use(cors());
app.use('/upload', express.static(path.join(__dirname, 'upload')));


mongoose.connect(process.env.MONGO,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Database Connected ");
    app.listen(process.env.PORT, ()=>{
      console.log(`Server Connected at ${process.env.PORT}`);
    })
}).catch(error => {
    console.error("Error connecting to database:", error);

})

app.use('/api', router);

module.exports = app;