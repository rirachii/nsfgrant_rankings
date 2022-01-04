const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const cors = require('cors');
app.listen(process.env.PORT || 5000)

let all = [];


let db = new sqlite3.Database('server/data/json_2000_2022.db', (err) => {
if (err) {
    return console.error(err.message);
}
console.log('Connected to SQlite database.');
});   
let sql = "SELECT json FROM json_2000_2022 ORDER BY total DESC LIMIT 100;"
db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        all.push(JSON.parse(row.json));
    }); 

});
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});

app.get('/', cors(), (_, res) => {
    res.send("Research Institution Grants API from 2000-2022. To view data, visit: https://research-institution-grants.herokuapp.com/api/2000-2022");
});

app.get('/api/2000-2022', cors(), (_, res) => {
    res.json(all);
});
