

const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
const mysql = require("mysql");
dotenv.config();


const { MYSQL_URL } = process.env;
const connection = mysql.createPool(MYSQL_URL);

// all records from reservations
router.get("/", (req, res) => {
    connection.query(`
    select meal.id, meal.title, meal.location, meal.max_reservations, sum(coalesce(reservation.number_of_guests, 0)) as total_reservations
from meal
left join reservation 
on meal.id = reservation.meal_id
group by meal.id; `, (err, results, fields) => {
        if (err)
            return res.send(err);
        res.json(results);
    });

});




module.exports=router;




// select id,title,location,max_reservations,total_reservations
// from meal
// join 
// (select meal_id,sum(number_of_guests) as total_reservations
// from reservation
// group by meal_id) as res
// on id=meal_id
// where max_reservations > res.total_reservations
