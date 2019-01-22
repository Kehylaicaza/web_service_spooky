
var http = require('http'),
express  = require('express'),
bodyParser  = require('body-parser');

var multer = require('multer'); 
const pg    = require('pg');

pg.defaults.ssl = true;
var conString = "postgres://uhylhutdyevcbs:e6283c49398c23069debbac422b5c6326f63821f71d0f59d5c93672bfa9b98cc@ec2-54-235-68-3.compute-1.amazonaws.com:5432/dfmd7unrd6bl2t";
var express = require('express');
var http = require('http'),
    formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra');

function enterCD(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

var app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.use(enterCD);


app.get('/', (req, res) => res.send('Hello World!'));

app.get('/verUsers', (req, res, next) => {
    const client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM usuario', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            console.log(result);
            client.end();

            return res.json(result.rows);

        });
    });

});
app.post('/createUser', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        
        console.log("prueba"+util.inspect(req,false,null));
        
        client.query("INSERT INTO  usuario  (name,usuario,pass,sexo,edad,contacto) VALUES ('"+req.body.name+"', '"+req.body.user+"', '"+req.body.pass+"', '"+req.body.sexo+"', '"+req.body.edad+"', '"+req.body.contacto"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
        
          
            client.end();
            return res.json(result.rows);
            
        });
        
    });
});

app.put('/actualizarInformacion',(req,res)=>{
    var client = new pg.Client(conString);
    var id=req.body.id;
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
  
        client.query("UPDATE usuario SET edad='"+req.body.edad+"' WHERE id='" + id + "';", function(err, result) {
            
            if(err) {
                  return console.error('error running query', err);
            }
            
           
            client.end();
            return res.json(result);
        });
     });
});



app.delete('/deleteUser',(req,res)=>{
    var client = new pg.Client(conString);
    var id=req.body.id;
  
    client.connect(function(err) {
       if(err) {
           return console.error('could not connect to postgres', err);
           return res.status(500).json({success: false, data: err});
       }

       client.query('DELETE FROM usuario WHERE id = $1', [1], function(err, result) {
          
           if(err) {
               return console.error('error running query', err);
           }
          
           //console.log(result);
            client.end();
           return res.json(result);
       });
   });
  
  
});
 
