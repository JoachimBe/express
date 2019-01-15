const express = require('express');
const router = express.Router();
"use strict";
const nodemailer =require('nodemailer');
const multer = require('multer');
const upload = multer({ dest: 'tmp/', limits: {fileSize: 3*1024*1024} });
const fs = require('fs');

const smtpTransport  = nodemailer.createTransport( {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: "projetpfb@gmail.com",
    pass:"4wcsjecode"
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/superMiddleware', function(req, res, next){
  console.log('hello middleware');
  next();
}, function (req,res,next) {
  res.send('hello world');
  next();
});

// UPLOAD FFICHIER
router.post('/uploaddufichier', upload.array('monfichier', 3), function(req, res, next){
  for(let i = 0; i < req.files.length; i++){
    fs.rename(req.files[i].path, 'public/images/' + req.files[i].originalname, function(err){
      if(err){
        res.send('problème durant le déplacement');
      } else{
        res.send(req.files);
      }
    });
  }
})

router.use('/askForCookiesRecipe', function(req, res, next){
  
  smtpTransport.sendMail({
    from:"Deer wild <deer@wild.com>",
    to: "supergrandma@yopmail.com",
    subject: "Coucou",
    text: "Salut Mami c'est quoi la recette des zezettes de Sete? Tu peux l'envoyer? CIMER! ",
    html: "<b> Cookie click generator </b>"
  }, (error, response) => {
    if(error){
      console.log(error);
    }else{
      console.log("Message sent:" + response.response);
    }
  });
  next();
});

module.exports = router;
