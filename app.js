var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    flash            = require("connect-flash"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    methodOverride   = require("method-override"),
    Campground       = require("./models/campground"),
    Comment          = require("./models/comment"),
    User             = require("./models/user"),
    seedDB           = require("./seeds"),
    config           = require("./config");

//Add Routes
    
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index"),
    apiRoutes = require("./routes/api/api");

var connectionString = "mongodb+srv://" + config.db.user + ":" + config.db.pass + "@" + config.db.url;

mongoose.connect(connectionString, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "./public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();  //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: config.app.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//Requiring Routes
app.use("/", indexRoutes);
app.use("/campgrounds/", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//Requiring API Routes
app.use("/api/", apiRoutes);

app.listen(config.app.port, "localhost", function(){
    console.log("The YelpCamp Server has started.");
});
