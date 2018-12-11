var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f3c878a3eeb5b0_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non semper purus. Quisque ac orci metus. Nam eu nunc ut neque mollis maximus consectetur eu arcu. Praesent ut auctor tellus, a varius lorem. Donec nisi neque, laoreet nec gravida et, interdum et urna. Donec porttitor efficitur ultrices. Donec luctus, elit ac vestibulum posuere, elit ligula accumsan velit, vel blandit est augue eget sapien. Vestibulum fringilla aliquet lectus eu mattis. Donec diam ipsum, ornare nec molestie eget, ultrices sed nulla. "
    },
    {
        name: "Angel's Peak",
        image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f3c878a3eeb5b0_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non semper purus. Quisque ac orci metus. Nam eu nunc ut neque mollis maximus consectetur eu arcu. Praesent ut auctor tellus, a varius lorem. Donec nisi neque, laoreet nec gravida et, interdum et urna. Donec porttitor efficitur ultrices. Donec luctus, elit ac vestibulum posuere, elit ligula accumsan velit, vel blandit est augue eget sapien. Vestibulum fringilla aliquet lectus eu mattis. Donec diam ipsum, ornare nec molestie eget, ultrices sed nulla. "
    },
    {
        name: "Beast's Edge",
        image: "https://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f3c878a3eeb5b0_960.jpg&user=Pexels",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non semper purus. Quisque ac orci metus. Nam eu nunc ut neque mollis maximus consectetur eu arcu. Praesent ut auctor tellus, a varius lorem. Donec nisi neque, laoreet nec gravida et, interdum et urna. Donec porttitor efficitur ultrices. Donec luctus, elit ac vestibulum posuere, elit ligula accumsan velit, vel blandit est augue eget sapien. Vestibulum fringilla aliquet lectus eu mattis. Donec diam ipsum, ornare nec molestie eget, ultrices sed nulla. "
    }
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    
                    //add a few comments
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                            campground.comments.push(comment);
                            campground.save();
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;