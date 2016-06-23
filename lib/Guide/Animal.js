function Animal(name, dom, stepSize, imageSrc) {
  this.name = name;
  this.dom = dom;
  this.stepSize = stepSize;
  this.imageSrc = imageSrc || '';
}

function newHeight(v, key, stepSize, wv) {
  var n = parseInt(v, 10) - (key === 38 ? stepSize : 0) + (key === 40 ? stepSize : 0);
  return n < 0 ? 0 : n > wv ? wv : n;
}

function newWidth(v, key, stepSize, wh) {
  var n = parseInt(v, 10) - (key === 37 ? stepSize : 0) + (key === 39 ? stepSize : 0);
  return n < 0 ? 0 : n > wh ? wh : n;
}

// calculate new value for left and top
Animal.prototype.move = function (key, aroundDom, positionImage) {
  var self = this;
  var wh = aroundDom.width() - self.dom.width();
  var wv = aroundDom.height() - self.dom.height();

  self.dom.css({
    left: function(i, v) {
      return newWidth(v, key, self.stepSize, wh);
    },
    top: function(i, v) {
      return newHeight(v, key, self.stepSize, wv);
    },
    backgroundPosition: positionImage
  });
};

Animal.prototype.changeAction = function (positionImage) {
  this.dom.css({
    backgroundPosition: positionImage
  });
};

var pane = $('#pane'),
  box = $('#box'),
  d = {},
  key = 0,
  x = 5,
  i = 0,
  positionImageToRight = ["0px 160px", "32px 160px", "64px 160px", "96px 160px", "128px 160px", "160px 160px"],
  positionImageToLeft = ["0px 96px", "32px 96px", "64px 96px", "96px 96px", "128px 96px", "160px 96px"],
  positionImageToTop = ["0px 0px", "32px 0px", "64px 0px", "96px 0px", "128px 0px", "160px 0px"],
  positionImageToDown = ["0px 128px", "32px 128px", "64px 128px", "96px 128px", "128px 128px", "160px 128px"];

var rectangle = new Animal('AAA', box, 5);

box.css({
  backgroundImage: "url(https://raw.githubusercontent.com/snwfog/nyimpen-dorami/master/Demo1/Content/doraemon-walk.png)",
  backgroundPosition: "0px 160px"
});

$(window).keydown(function(e) { key = e.which; d[e.which] = true; });
$(window).keyup(function(e) { key = -e.which; d[e.which] = false; });

setInterval(function() {
  if(i === 5) {
    i = 0;
  }
  switch(key) {
    case 37:
      rectangle.move(key, pane, positionImageToLeft[i++]);
      break;
    case 39:
      rectangle.move(key, pane, positionImageToRight[i++]);
      break;
    case 38:
      rectangle.move(key, pane, positionImageToTop[i++]);
      break;
    case 40:
      rectangle.move(key, pane, positionImageToDown[i++]);
      break;
  }
}, 40);