/**
 * Created by thuynghi on 21/06/2016.
 */
function Animal(name, dom, stepMove, imageSrc, widthCanMove, heightCanMove) {
  this.name = name;
  this.dom = dom;
  this.widthCanMove = widthCanMove;
  this.heightCanMove = heightCanMove;
  this.stepMove = stepMove;
  this.imageSrc = imageSrc || '';
}

// calculate new value for left and top
Animal.prototype.move = function (key) {
  this.dom.css({
    left: function(i,v) { return newHeight(v, key); },
    top: function(i,v) { return newWidth(v, key); }
  });
};

function newHeight(v, key) {
  var n = parseInt(v, 10) - (key === 37 ? this.stepMove : 0) + (key === 39 ? this.stepMove : 0);
  return n < 0 ? 0 : n > this.heightCanMove ? this.heightCanMove : n;
}

function newWidth(v, key) {
  var n = parseInt(v, 10) - (key === 38 ? this.stepMove : 0) + (key === 40 ? this.stepMove : 0);
  return n < 0 ? 0 : n > this.widthCanMove ? this.widthCanMove : n;
}