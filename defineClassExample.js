/**
 * Created by shevchenko on 11/14/15.
 */

// Очень простой класс Rectangle, который предоставляет интерфейс Comparable
var Rectangle = defineClass({
	name: "Rectangle",
	construct: function(w,h) { this.width = w; this.height = h; },
	methods: {
		area: function() { return this.width * this.height; },
		compareTo: function(that) { return this.area( ) - that.area( ); }
	},
	provides: Comparable
});
// Подкласс класса Rectangle, который вызывает по цепочке конструктор своего
// надкласса, наследует методы надкласса, определяет свои методы экземпляра
// и статические методы и заимствует метод equals().
var PositionedRectangle = defineClass({
	name: "PositionedRectangle",
	extend: Rectangle,
	construct: function(x,y,w,h) {
		this.superclass(w,h); // вызов по цепочке
		this.x = x;
		this.y = y;
	},
	methods: {
		isInside: function(x,y) {
			return x > this.x && x < this.x+this.width &&
				y > this.y && y < this.y+this.height;
		}
	},
	statics: {
		comparator: function(a,b) { return a.compareTo(b); }
	},
	borrows: [GenericEquals]
});