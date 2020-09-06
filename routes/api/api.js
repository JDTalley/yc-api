var express = require("express");
var router = express.Router();
var Campground = require("../../models/campground");
var middleware = require("../../middleware");
var passport = require("passport");
var User = require("../../models/user");

/******
 * Campgrounds
 */

//INDEX
router.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.send({campgrounds:allCampgrounds});
        }
    });
});

//CREATE
router.post("/campgrounds", function(req, res){
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
        }
    });
});

//SHOW
router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.send({campground: foundCampground});
        }
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.send(err);
        } else {
            res.send({campground: updatedCampground._id});
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, deletedCampground){
        if(err){
            res.send(err);
        } else {
            res.send({campground: deletedCampground._id});
        }
    });
});


/*******
 * Registration and Logins
 */

 //handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect(path + "/campgrounds");
        });
    });
});

 // handling login logic
router.post("/login", passport.authenticate("local"), 
    function(req, res){
        res.send(req.user.username)
    }
);

// logout route
router.get("/logout", function(req, res){
    req.logout();
});



module.exports = router;