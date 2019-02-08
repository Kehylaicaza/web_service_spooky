
var http = require('http'),
	express  = require('express'),
	bodyParser   = require('body-parser');

var multer = require('multer'); 
const pg    = require('pg');

pg.defaults.ssl = true;
var conString = "postgres://uhylhutdyevcbs:e6283c49398c23069debbac422b5c6326f63821f71d0f59d5c93672bfa9b98cc@ec2-54-235-68-3.compute-1.amazonaws.com:5432/dfmd7unrd6bl2t";

var express = require('express');
var http = require('http'),
    formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra');
function permitirCrossDomain(req, res, next) {
  //en vez de * se puede definir SÓLO los orígenes que permitimos
  res.header('Access-Control-Allow-Origin', '*'); 
  //metodos http permitidos para CORS
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));
app.use(permitirCrossDomain);


app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/listUsers', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
    
        client.query('SELECT * FROM usuario', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
    
            client.end();
            return res.json(result.rows);
            
        });
    });
});

app.get('/lisUser/:id',(req,res)=>{
    var client = new pg.Client(conString);
    var id=req.params.id;

    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM usuario WHERE id=' + id + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
                client.end();
            return res.json(result.rows);
        
        });
        
    });
});
app.put('/updateUser',(req,res)=>{
    var client = new pg.Client(conString);
    var id=req.body.id;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("UPDATE usuario SET name='"+req.body.name+"', usuario='"+req.body.usuario+"',  pass='"+req.body.pass+"',  usuario='"+req.body.usuario+"', sexo='"+req.body.sexo+"',edad='"+req.body.edad+"',peso='"+req.body.peso+"',altura='"+req.body.altura+"', calorias='"+req.body.calorias+"' WHERE id='" + id + "';", function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
                client.end();
            return res.json(result);
        });
    });
});
app.post('/SaveUser', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        
        console.log("ouch "+util.inspect(req,false,null));
        
        client.query("INSERT INTO  usuario  (name,usuario,pass,edad,sexo,peso,altura,calorias) VALUES ('"+req.body.name+"', '"+req.body.usuario+"', '"+req.body.pass+"', '"+req.body.edad+"', '"+req.body.sexo+"', '"+req.body.peso+"', '"+req.body.altura+"','"+req.body.calorias+"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
        
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
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
    
        client.query('DELETE FROM usuario WHERE id=' + id + ';', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
                client.end();
            return res.json(result);
        });
    });


});

app.listen(process.env.PORT || 8080, function(){console.log("the server is running");});

