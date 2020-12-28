const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json({ extended: true }));
app.use(fileUpload());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/posts', require('./routes/post.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        app.listen(PORT, () => { console.log(`Сервер был запущен на порте ${PORT}`); });
    } catch (e) {
        console.log('Server error', e);
        process.exit(1);
    }
}

start();