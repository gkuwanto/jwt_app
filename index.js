const app = require('express')();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', require('./controllers/auth'));
app.use('/dummy', require('./controllers/dummy'));

app.use(require('./middlewares/error-handler'));

app.all('*', (req,res)=>{
    return res.status(404).send({msg:'page not found'});
});

app.listen(PORT, ()=>{
    /* eslint-disable no-console */
    console.log(`Server is running on port ${PORT}.`);
    console.log(`Started at ${new Date().toUTCString()}`);
    /* eslint-enable no-console */
});