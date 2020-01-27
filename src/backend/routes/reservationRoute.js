
const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
const mysql = require("mysql");
dotenv.config();


const { MYSQL_URL } = process.env;
const connection = mysql.createPool(MYSQL_URL);

// all records from reservations
router.get("/", (req, res) => {
    connection.query(`select * from reservation`, (err, results, fields) => {
        if (err)
            return res.send(err);
        res.json(results);
    });

});

// adding new reservation
router.post("/", (req, res) => {
    const  reservation  = req.body;
    console.log(reservation);
    connection.query(`INSERT into reservation SET ?`, [reservation], (err, results, fields) => {
        if (err)
            return res.send(err);
        res.json(results);

    });

});

// Response 1 reservation found using reservation id through params
router.get('/:reservationIdToFind', (req, res) => {
    const { reservationIdToFind } = req.params;
    connection.query(`SELECT * from reservation where id=${reservationIdToFind}`, (err, results, fields) => {
        if (err)
            return res.send(err);
        if (results.length > 0)
            res.json(results);
        else res.send("record not found");
    });
});

// altering one specific reservation record usnig params
router.put('/:reservationIdToAlter', (req, res) => {
    const { reservationIdToAlter } = req.params;
    const alteredReservation = req.body;
    connection.query(`UPDATE reservation set ? where id=${reservationIdToAlter}`, alteredReservation, (err, results, fields) => {
        if (err)
            return res.send(err);
        if (results.affectedRows > 0)
            res.json(results);
        else
            res.send("No matching record found to update");
    });
});

// deleting one specific reservation record usnig params
router.delete('/:reservationIdToDelete', (req, res) => {
    const { reservationIdToDelete } = req.params;
        connection.query(`DELETE from reservation where id=${reservationIdToDelete}`, (err, results, fields) => {
        if (err)
            return res.send(err);
        if (results.affectedRows > 0)
            res.json(results);
        else
            res.send("No matching record found to delete");
    });
});

module.exports = router;