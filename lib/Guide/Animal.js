function Animal(name, dom, stepMove, widthCanMove, heightCanMove, imageSrc) {
  this.name = name;
  this.dom = dom;
  this.widthCanMove = widthCanMove;
  this.heightCanMove = heightCanMove;
  this.stepMove = stepMove;
  this.imageSrc = imageSrc || '';
}

// calculate new value for left and top
Animal.prototype.move = function (key) {
  var self = this;
  self.dom.css({
    left: function(i,v) { return newHeight(v, key); },
    top: function(i,v) { return newWidth(v, key); }
  });

  function newHeight(v, key, animal) {
    var n = parseInt(v, 10) - (key === 37 ? self.stepMove : 0) + (key === 39 ? self.stepMove : 0);
    return n < 0 ? 0 : n > self.heightCanMove ? self.heightCanMove : n;
  }

  function newWidth(v, key) {
    var n = parseInt(v, 10) - (key === 38 ? self.stepMove : 0) + (key === 40 ? self.stepMove : 0);
    return n < 0 ? 0 : n > self.widthCanMove ? self.widthCanMove : n;
  }
};




var pane = $('#pane'),
  box = $('#box'),
  wh = pane.width() - box.width(),
  wv = pane.height() - box.height(),
  d = {},
  key = 0,
  x = 5;

var rectangle = new Animal('AAA', box, 5, wh, wv);

$(window).keydown(function(e) { key = e.which; d[e.which] = true; });
$(window).keyup(function(e) { key = -e.which; d[e.which] = false; });

setInterval(function() {
  rectangle.move(key);
  wh = pane.width() - box.width();
  wv = pane.height() - box.height();

  rectangle.widthCanMove = pane.width() - box.width();
  rectangle.heightCanMove = pane.height() - box.height();
}, 20);