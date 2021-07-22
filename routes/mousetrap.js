const express = require("express");
const router = express.Router();
const path = require("path");

// const Mousetrap = require('../models/Mousetrap');

//*getting individual tables
const Isolated = require("../models/Isolated");
const Badpeople = require("../models/Badpeople");
const Pervert = require("../models/Pervert");
const RapePorn = require("../models/RapePorn");

// router.get('/', (req, res) => res.render('landing'));
router.get("/", (req, res) => res.render("layout"));
/*
{
    Mousetrap.findAll()
        .then(fields => res.render('layout', {fields}))
        .catch(err => console.log('error: ' + err));
});
*/
// jsonParser
/*
router.post('/add', (req, res) => {
    let { horizontal, vertical } = req.body;

    Mousetrap.create({
        horizontal,
        vertical
    })
        .then(() => console.log("added to DB"))
        .catch((err) => console.log("error " + err));
});
router.get('/space', (req, res) => {
    Mousetrap.findAll()
        .then(spaces => res.json(spaces))
        .catch(err => console.log('error: ' + err));
});
*/

//TODO: add to table isolated_places
router.post("/isolatedplaces", (req, res) => {
  let { latitude, longitude } = req.body;
/*
  Isolated.create({
    latitude,
    longitude,
  })
    .then((resolvedObject) => res.send(resolvedObject.id))
    .catch((err) => console.log("error " + err));
*/
    const isolated = new Isolated({
        latitude,
        longitude,
      });
      isolated
        .save()
        .then((resolvedObject) => res.send(resolvedObject.id))
        .catch((err) => console.log("error " + err));
});

// router.post('/add',(req,response)=>{});
//TODO: send info from table isolated_places
router.get("/isolatedplaces", (req, res) => {
  /*
  Isolated.findAll()
    .then((resolvedData) => res.json(resolvedData))
    .catch((err) => console.log("error: " + err));
*/
  Isolated.find()
    .then((resolvedData) => res.json(resolvedData))
    .catch((err) => console.log("error: " + err));
});

//TODO: add to table delinquency
router.post("/badpeople", (req, res) => {
  let { latitude, longitude } = req.body;
  /*
  Badpeople.create({
    latitude,
    longitude,
  })
    .then((resolvedObject) => res.send(resolvedObject.id))
    .catch((err) => console.log("error " + err));
*/
  const badPeople = new Badpeople({
    latitude,
    longitude,
  });
  badPeople
    .save()
    .then((resolvedObject) => res.send(resolvedObject.id))
    .catch((err) => console.log("error " + err));
});

// router.post('/add',(req,response)=>{});
//TODO: send info from table delinquency
router.get("/badpeople", (req, res) => {
  /*
  Badpeople.findAll()
    .then((resolvedData) => res.json(resolvedData))
    .catch((err) => console.log("error: " + err));
*/
  Badpeople.find()
    .then((resolvedData) => res.json(resolvedData))
    .catch((err) => console.log("error: " + err));
});

//TODO: add to table pervert_alert
router.post("/perverts", (req, res) => {
  let { latitude, longitude } = req.body;
/*
  Pervert.create({
    latitude,
    longitude,
  })
    .then((resolvedObject) => res.send(resolvedObject.id))
    .catch((err) => console.log("error " + err));
*/
    const pervert = new Pervert({
        latitude,
        longitude,
      });
      pervert
        .save()
        .then((resolvedObject) => res.send(resolvedObject.id))
        .catch((err) => console.log("error " + err));
});

// router.post('/add',(req,response)=>{});
//TODO: send info from table pervert_alert
router.get("/perverts", (req, res) => {
  /*
  Pervert.findAll()
    .then((resolvedData) => res.json(resolvedData))
    .catch((err) => console.log("error: " + err));
    */
  Pervert.find()
    .then((resolvedData) => res.json(resolvedData))
    .catch((err) => console.log("error: " + err));
});

//TODO: send info from table pervert_alert
router.get("/rapeporn", (req, res) => {
  /*
    RapePorn.findAll()
        .then(resolvedData => res.json(resolvedData))
        .catch(err => console.log('error: ' + err));
*/
  RapePorn.find()
    .then((resolvedData) => res.json(resolvedData))
    .catch((err) => console.log("error: " + err));
});

router.get("/admin", (req, res) => {
  res.status(403);
  res.send("access denied chum! back off!!!");
});

router.get("/notes/idea", (req, res) => res.render("briefing"));

router.get("/notes/creators", (req, res) => res.render("about"));
router.get("/info", (req, res) => res.render("attributions"));
router.get("*", (req, res) => res.render("404"));

module.exports = router;
