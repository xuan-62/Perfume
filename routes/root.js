const express = require("express");
const router = express.Router();
const data = require("../data");
const perfumeData = data.Perfume;
const userData = data.users;

router.get("/", async (req, res) => {
    try {
      res.render('page/homepage',{title:"home"});

    } catch (e) {
        res.status(500).render("/page/errorPage",{ error: e });
    }
  });  

module.exports = router;