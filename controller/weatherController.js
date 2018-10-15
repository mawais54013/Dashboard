const db = require("../models");

module.exports = {
    findAll: function(req, res){
        db.Weather
        .find({userID: req.user})
        .then(list => res.json(list))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res){
        console.log(req.body)
        console.log(`setting up ${req.user} with weather for ${req.body.zip}`);
        db.Weather
        .create({userID: req.user._id, locations: [{zip: req.body.zip, favorite: false}]})
        .then(result => res.json(result))
        .catch(err => res.status(422).json(err));
    },
    update: function(req, res){
        db.Weather
        .update({userID: req.user}, {$push: {locations: {zip: req.body.zip, favorite: false} }})
        .catch(err => res.status(422).json(err));
    }
}