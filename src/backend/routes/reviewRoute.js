
const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
const mysql = require("mysql");
dotenv.config();


const { MYSQL_URL } = process.env;
const connection = mysql.createPool(MYSQL_URL);


router.get("/", (req, res) => {
    connection.query(`select * from review`, (err, results, fields) => {
        if (err)
            return res.send(err);
        res.json(results);
    });
});

router.post("/", (req, res) => {
    const  review  = req.body;
    console.log(review);
    connection.query('INSERT into review SET ?', review, (err, results, fields) => {
        if (err)
            return res.send(err);
        res.json(results);

    });

});

// Response 1 review found using review id through params
router.get('/:reviewIdToFind', (req, res) => {
    const { reviewIdToFind } = req.params;
    connection.query(`SELECT * from review where id=${reviewIdToFind}`, (err, results, fields) => {
        if (err)
            return res.send(err);
        if (results.length > 0)
            res.json(results);
        else res.send("record not found");
    });
});

// altering one specific review record usnig params
router.put('/:reviewIdToAlter', (req, res) => {
    const { reviewIdToAlter } = req.params;
    const alteredReview = req.body;
    connection.query(`UPDATE review set ? where id=${reviewIdToAlter}`, alteredReview, (err, results, fields) => {
        if (err)
            return res.send(err);
        if (results.affectedRows > 0)
            res.json(results);
        else
            res.send("No matching record found to update");
    });
});

// deleting one specific review record usnig params
router.delete('/:reviewIdToDelete', (req, res) => {
    const { reviewIdToDelete } = req.params;
        connection.query(`DELETE from review where id=${reviewIdToDelete}`, (err, results, fields) => {
        if (err)
            return res.send(err);
        if (results.affectedRows > 0)
            res.json(results);
        else
            res.send("No matching record found to delete");
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