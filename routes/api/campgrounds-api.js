var express = require("express");
var router = express.Router();
var Campground = require("../../models/campground");
var middleware = require("../../middleware");

// Configure Sub Path
//var path = "/yelpcamp";
var path = "";

//INDEX
router.get("/", function(req, res){
    //Get all campgrounds from DB
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.send({campgrounds:allCampgrounds});
            //res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});

//CREATE
router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author:author};
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.send({campground: newlyCreated._id});
            //res.redirect(path + "/campgrounds");
        }
    });
});

// NEW
// Not used in API
//router.get("/new", middleware.isLoggedIn, function(req, res){
//   res.render("campgrounds/new"); 
//});

//SHOW
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.send({campground: foundCampground});
            //res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT CAMPGROUND ROUTE
// Not used in API
// router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
//     Campground.findById(req.params.id, function(err, foundCampground){
//         if(err){
//             res.redirect("back");
//         } else {
//             res.render("campgrounds/edit", {campground: foundCampground});
//         }
//     });
// });

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.send(err);
        } else {
            res.send({campground: updatedCampground._id});
            //res.redirect(path + "/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send(err);
        } else {
            res.send({campground: deletedCampground._id});
            //res.redirect(path + "/campgrounds");
        }
    });
});

module.exports = router;
