const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

/* middlewares */
const { errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

app.use(express.json());
app.use(cors());
require('./utils');

app.get('/',(req, res) => {
    res.send('API')
})

app.listen(port, () => {
    console.log('corriendo en el puerto ' + port);
})


/* pasamos la app al router */
routerApi(app);
app.use(boomErrorHandler);
app.use(errorHandler);
