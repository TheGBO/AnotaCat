const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./api/routes');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/api', routes);

console.log(process.env);

const port = process.env.PORT || 5000;

app.use(express.static("client/build"));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,"client","build","index.html"))
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});