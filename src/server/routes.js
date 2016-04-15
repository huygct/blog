var router = require('express').Router();
var multer  =   require('multer');
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.post('/uploadFile', uploadFile);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

/**
 * config multer to upload file
 */
//var storage =   multer.diskStorage({
//    destination: function (req, file, callback) {
//        callback(null, './images');
//    },
//    filename: function (req, file, callback) {
//        callback(null, Date.now() + '-' + file.originalname);
//    },
//    onFileUploadComplete: function (file) {
//        console.log(file.fieldname + ' uploaded to  ' + file.path)
//    }
//});
//var upload = multer({ storage : storage}).single('file');

// multer
var express = require('express');
var app = express();
app.use(multer({ dest: './images',
    rename: function (fieldname, filename) {
        return filename+Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done=true;
    }
}));

//////////////

function getPeople(req, res, next) {
    res.status(200).send(data.people);
}

function getPerson(req, res, next) {
    var id = +req.params.id;
    var person = data.people.filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        res.status(200).send(person);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}

function uploadFile(req,res){
    //upload(req,res,function(err, files) {
    //    if(err) {
    //        return res.end("Error uploading file.");
    //    }
    //    console.log(req.body); // form fields
    //    console.log(req.files); // form files
    //    res.json({status: 200, files: files})
    //});
    console.log(req.files);
    res.end("File uploaded");
}
