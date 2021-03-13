const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.json({ extended: true }));
app.use(fileUpload());


app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/posts', require('./routes/post.routes'));
app.use('/api/comments', require('./routes/comment.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => { console.log(`Сервер был запущен на порте ${PORT}`); });
    } catch (e) {
        console.log('Server error', e);
        process.exit(1);
    }
}

start();