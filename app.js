const express = require("express");
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
const session = require("express-session");
const static = express.static(__dirname + "/public");

const app = express();
app.use("/public", static);

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.use(session({
  name:'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true,
  expires:false
  //cookies:{expires:expiresAt}
})); 

app.engine("handlebars", exphbs({ helpers: require('./config/handlebars-helpers') }));
app.set("view engine", "handlebars");

app.use('/user_homepage',function(request, response, next){
  if(request.session.cookie.expires==false || request.session.cookie.expires==null){
    response.status(403).render('page/loginPage',{error:'you did not login'});
  }
  else{
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});

















