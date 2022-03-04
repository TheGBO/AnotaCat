const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./api/routes');

require('dotenv').config({path:"./config/.env"});
app.use(cors());
app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({success:true});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});