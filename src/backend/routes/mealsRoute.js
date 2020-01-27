
const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
const mysql = require("mysql");
dotenv.config();

const { MYSQL_URL } = process.env;
const connection = mysql.createPool(MYSQL_URL);

//Response all meals
router.get('/', (req, res) => {
    if (isEmpty(req.query)) {

        //Response all meals
        connection.query('SELECT * from meal', (err, results, fields) => {
            if (err)
                return res.send(err);
            res.json(results);
        });
    }
    // meals resonse with maxPrice limit
    else {
        if (req.query.hasOwnProperty("maxPrice")) {
            const { maxPrice } = req.query;
            connection.query(`SELECT * from meal where price <=${maxPrice}`, (err, results, fields) => {
                if (err)
                    return res.send(err);
                if (results.length > 0)
                    res.json(results);
                else res.send("NO meal fount .. check with different maxPrice limit");
            });
        }
        // meals resonse having a key word in field 'title'
        else if (req.query.hasOwnProperty("title")) {
            const { title } = req.query;
            connection.query(`SELECT * from meal where title like '%${title}%'`, (err, results, fields) => {
                if (err)
                    return res.send(err);
                if (results.length > 0)
                    res.json(results);
                else
                    res.send("No matching record found");
            });
        }


        // meals created after asked date using query param 'date'

        else if (req.query.hasOwnProperty("createdAfter")) {
            const { createdAfter } = req.query;
            connection.query(`SELECT * from meal where created_date > ${createdAfter}`, (err, results, fields) => {
                if (err)
                    return res.send(err);
                if (results.length > 0)
                    res.json(results);
                else
                    res.send("No matching record found");
            });
        }


        // showing limited no of meals using query param 'limit' 
        else if (req.query.hasOwnProperty("limit")) {
            const limit = parseInt(req.query.limit);
            connection.query(`SELECT * from meal limit ${limit}`, (err, results, fields) => {
                if (err)
                    return res.send(err);
                if (results.length > 0)
                    res.json(results);
                else
                    res.send("No matching record found");
            });
        }

    }

});

//query string returning meals that still has reservations available

// {`select id,title,location,max_reservations,meal_id,total_reservations
// from meal
// join 
// (select meal_id,sum(number_of_guests) as total_reservations
// from reservation
// group by meal_id) as res
// -- on meal.id=meal_id
// where max_reservations > res.total_reservations and id = meal_id;
// `}

// responding with meals priced less then said price using query params 
// router.get('/?maxPrice', (req, res) => {
//     const { maxPrice } = req.query;
//     connection.query(`SELECT * from meal where price <=${maxPrice}`, (err, results, fields) => {
//         if (err)
//             return res.send(err);
//         if (results.length > 0)
//             res.json(results);
//         else res.send("check with different maxPrice limit");
//     });
// });


// Response 1 meal found using meal id through params
router.get('/:mealIdToFind', (req, res) => {
    const { mealIdToFind } = req.params;
    connection.query(`SELECT * from meal where id=${mealIdToFind}`, (err, results, fields) => {
        if (err)
            return res.send(err);
        if (results.length > 0)
            res.json(results);
        else res.send("record not found");
    });
});

// altering one specific meal record usnig params
router.put('/:mealIdToFind', (req, res) => {
    const { mealIdToFind } = req.params;
    const meal = req.body;
    connection.query(`UPDATE meal set ? where id=${mealIdToFind}`, meal, (err, results, fields) => {
        if (err)
            return res.send(err);
        if (results.affectedRows > 0)
            res.json(results);
        else
            res.send("No matching record found to update");
    });
});

// adding new meal
router.post('/', (req, res) => {
    const meal = req.body;
    console.log('constact=' + meal);
    connection.query('INSERT into meal SET ?', meal, (err, results, fields) => {
        if (err)
            return res.send(err);
        res.json(results);
    })
});

// deleting specific meal using params
router.delete('/:mealIdToDelete', (req, res) => {
    const { mealIdToDelete } = req.params;
    connection.query(`DELETE from meal where id=${mealIdToDelete}`, (err, results, fields) => {
        if (err)
            return res.send(err);
        if (results.affectedRows > 0)
            res.json(results);
        else res.send("record not found");
    });
});



function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

module.exports = router;