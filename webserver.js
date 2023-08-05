const express = require('express');
const app = express();
const port = 1000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'static'), {
    setHeaders: (res, filePath) => {
        if(filePath.endsWith('.js')){
            res.setHeader('Content-Type', 'application/javascript')
        }
    }
}));
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('index')
});


app.listen(port, () => {
    console.log(`Web server is running on ${port}`);
});