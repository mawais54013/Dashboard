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
        .create({userID: req.user._id, locations: [{zip: req.body.zip, favorite: false}]})
        .then(result => res.json(result))
        .catch(err => res.status(422).json(err));
    },
    update: function(req, res){
        db.Weather
        .update({userID: req.user}, {$push: {locations: {zip: req.body.zip, favorite: false} }})
        .catch(err => res.status(422).json(err));
    },
    favorite: function(req, res){
        db.Weather
        .findOne({userID: req.user})
        .then(list => {
            let updatedList = list.locations.map(location => {
                if(location.zip === req.body.zip) {
                    return({zip: location.zip, favorite: req.body.favorite})
                }
                else return location;
            })
            db.Weather
                .update({userID: req.user}, {$set: {locations: updatedList}})
                .catch(err => res.status(422).json(err));
        });  
    },
    remove: function(req, res){
        db.Weather
        .findOne({userID: req.user})
        .then(list => {
            let updatedList = list.locations.filter(location => {
                if(location.zip != req.body.zip) {
                    return (location);
                }
            })
                console.log(updatedList)
            db.Weather
                .update({userID: req.user}, {$set: {locations: updatedList}})
                .then(result => res.json(result))
                .catch(err => res.status(422).json(err));
        }).catch(err => res.status(422).json(err));
     
    }
}