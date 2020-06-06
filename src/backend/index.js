const express = require("express");
// const dotenv = require("dotenv");
//const mysql = require("mysql");
const dbPool=require("./database")
const bodyParser = require("body-parser");
const mealsRouter = require("./routes/mealsRoute");
const reviewsRouter = require("./routes/reviewRoute");
const reservationRouter = require("./routes/reservationRoute");
const availableReservationsRouter = require("./routes/avalableReservationsRoute")

const app = express();
const PORT = 5000;
// dotenv.config();


//const { MYSQL_URL } = process.env;

//const connection = mysql.createPool(MYSQL_URL);

app.use(bodyParser.json());
app.use(express.static('public'));
//app.use(bodyParser.urlencoded({extended:false}));

app.use('/api/meals', mealsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/availabelreservations', availableReservationsRouter);


// For week4 no need to look into this!
 // Ensures that the client router works on reload aswell.
// Sends all requests back to index.html where the routing lib takes over
// app.get("/*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./../../dist/index.html"), function(err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// }); 


app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
    dbPool.getConnection(err => {
        if (err)
            console.log(`Error connection : ${err}`);
        else
            console.log(`Conection Successful`);
    })

});