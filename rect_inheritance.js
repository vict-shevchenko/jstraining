/**
 * Created by shevchenko on 11/14/15.
 */
function Rectangle(w, h) {
	this.width = w;
	this.height = h;
}

Rectangle.prototype.area = function( ) { return this.width * this.height; }

function PositionedRectangle(x, y, w, h) {

	Rectangle.call(this, w, h);

	this.x = x;
	this.y = y;
}

PositionedRectangle.prototype = new Rectangle();

delete PositionedRectangle.prototype.width;
delete PositionedRectangle.prototype.height;

PositionedRectangle.prototype.constructor = PositionedRectangle;

PositionedRectangle.prototype.contains = function(x,y) {
	return (x > this.x && x < this.x + this.width &&
	y > this.y && y < this.y + this.height);
};

var r = new PositionedRectangle(2,2,2,2);

console.log(r.contains(3,3));
console.log(r.area( ));

console.log(r.x + ", " + r.y + ", " + r.width + ", " + r.height); // "2, 2, 2, 2"


console.log(
	r instanceof PositionedRectangle &&
	r instanceof Rectangle &&
	r instanceof Object
);