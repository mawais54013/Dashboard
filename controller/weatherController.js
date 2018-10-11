const db = require("../models");

module.exports = {
    findAll: function(req, res){
        db.Weather
        .find({userID: req.user})
        .then(list => res.json(list))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res){
        db.Weather
        .create({userID: req.user, location: [{zip: req.body.zip, favorite: false}]})
        .then(result => res.json(result))
        .catch(err => res.status(422).json(err));
    }
}