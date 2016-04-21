var router = require('express').Router();
var multer = require('multer');
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

/**
 * config multer to upload file
 */
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './images');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = multer({storage: storage}).single('file');
router.post('/uploadFile', upload, uploadFile);
//-----------------------------------------------------------------------------------------

function getPeople(req, res, next) {
    res.status(200).send(data.people);
}

function getPerson(req, res, next) {
    var id = +req.params.id;
    var person = data.people.filter(function (p) {
        return p.id === id;
    })[0];

    if (person) {
        res.status(200).send(person);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}

function uploadFile(req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.json({status: 204, files: req.file})
    });
}
