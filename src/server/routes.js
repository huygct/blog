var router = require('express').Router();
var multer = require('multer');
var Jimp = require("jimp");
var http = require('http');
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/people', getPeople);
router.get('/product/:id', getProduct);
router.get('/person/:id', getPerson);
router.get('/*', four0four.notFoundMiddleware);
router.delete('/deleteFile', deleteFile);

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

var uploadMulti = multer({storage: storage}).array('photos', 6);
router.post('/uploadPhotos', uploadMulti, uploadPhotos);

router.post('/uploadIcons', uploadMulti, uploadIconImage);
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
            return res.end('Error uploading file.');
        }
        res.json({status: 204, files: req.file});
    });
}

function uploadIconImage(req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end('Error uploading file.');
    }
    var files = req.files;
    // create file icon
    for(var i = 0; i < files.length; i++) {
      resizePhoto(files[i], './images/icons/', 175, 200); // nen xem lai
    }

    res.json({status: 204, files: req.files});
  });
}

function uploadPhotos(req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end('Error uploading file.');
    }
    var files = req.files;
    // create file thumbs
    for(var i = 0; i < files.length; i++) {
      resizePhoto(files[i], './images/thumbs/', 50, 50); // nen xem lai
    }

    res.json({status: 204, files: req.files});
  });
}

function resizePhoto(photo, address, width, height) {
  Jimp.read(photo.path)
    .then(function (p) {
      p.resize(width, height) // resize
        .write(address + photo.originalname); // save
    }).catch(function (err) {
      console.error(err);
    });
}

//-------------------------------------------------------------------------------------------

var options = {
    host: '128.199.125.94',
    port: 1337,
    path: '',
    method: 'GET'
};

var SITE_ROOT = 'http://128.199.125.94:9000/';

function getProduct(req, res, next) {
    var productId = req.params.id;
    options.path = '/product?id=' + productId;

    http.request(options, function(response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            var product = JSON.parse(chunk);
            var data = {
                title: 'Cây Cảnh bon bon',
                description: product.description,
                image: SITE_ROOT + product.imageSmallUrl,
                siteName: product.name,
                url: SITE_ROOT + 'product/' + productId + '/' + product.category.id,
                href: SITE_ROOT + 'api/product/' + productId
            };
            res.status(200).send(makePage(data));
        });
    }).end();
}

function makePage(data) {
    return '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html; charset=utf-8">' +
      '<meta name="generator" content="Powered by Cay Canh Bon Bon">' +
      '<meta property="og:title" content="Cây Cảnh bon bon">' +
      '<title>Cây Cảnh bon bon</title>' +
      '<link rel="canonical" href="' + data.href + '"/>' +
      '<meta property="og:description" content="' + data.description + '"/>' +
      '<meta property="og:image" content="' + data.image + '"/>' +
      '<meta property="og:type" content="website" />' +
      '<meta property="og:site_name" content="' + data.siteName +  '"/>' +
      '<meta property="og:url" content="' + data.url + '"/>' +
      '<meta property="og:image:width" content="400" />' +
      '<meta property="og:image:height" content="300" />' +
      '</head>' +
      '<body>' +
      '<p>' + data.description + '</p>' +
      '<img src="' + data.image + '">' +
      '</body>' +
      '</html>';
}
