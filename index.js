const app = require('./app');
const port = 3000; // port number

app.listen(port, ()=> {
    console.log(`App listening to port ${port}`);
})