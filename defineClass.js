/**
 * Created by shevchenko on 11/14/15.
 */


/**
 * defineClass() – вспомогательная функция для определения JavaScriptклассов.
 *
 * Эта функция ожидает получить объект в виде единственного аргумента.
 * Она определяет новый JavaScriptкласс, основываясь на данных в этом
 * объекте, и возвращает функциюконструктор нового класса. Эта функция
 * решает задачи, связанные с определением классов: корректно устанавливает
 * наследование в объектепрототипе, копирует методы из других классов и пр.
 *
 * Объект, передаваемый в качестве аргумента, должен иметь все
 * или некоторые из следующих свойств:
 *
 * name: Имя определяемого класса.
 * 			Если определено, это имя сохранится в свойстве classname объектапрототипа.
 *
 * extend: Конструктор наследуемого класса. В случае отсутствия будет
 * 			использован конструктор Object(). Это значение сохранится
 * 			в свойстве superclass объектапрототипа.
 *
 * construct: Функцияконструктор класса. В случае отсутствия будет использована новая
 * 				пустая функция. Это значение станет возвращаемым значением функции,
 * 				а также сохранится в свойстве constructor объектапрототипа.
 *
 * methods: Объект, который определяет методы (и другие свойства,
 * 				совместно используемые разными экземплярами) экземпляра класса.
 * 				Свойства этого объекта будут скопированы в объектпрототип класса.
 * 				В случае отсутствия будет использован пустой объект.
 * 				Свойства с именами "classname", "superclass" и "constructor"
 * 				зарезервированы и не должны использоваться в этом объекте.
 *
 * statics: Объект, определяющий статические методы (и другие статические
 * 				свойства) класса. Свойства этого объекта станут свойствами
 * 				функцииконструктора. В случае отсутствия будет использован пустой объект.
 *
 * borrows: Функцияконструктор или массив функцийконструкторов.
 * 				Методы экземпляров каждого из заданных классов будут
 * 				скопированы в объектпрототип этого нового класса, таким образом
 * 				новый класс будет заимствовать методы каждого из заданных классов
 * 				Конструкторы обрабатываются в порядке их следования, вследствие
 * 				этого методы классов, стоящих в конце массива, могут переопределить
 * 				методы классов, стоящих выше.
 * 				Обратите внимание: заимствуемые методы сохраняются
 * 				в объектепрототипе до того, как будут скопированы свойства
 * 				и методы вышеуказанных объектов.
 * 				Поэтому методы, определяемые этими объектами, могут
 * 				переопределить заимствуемые. При отсутствии этого свойства
 * 				заимствование методов не производится.
 *
 * provides: Функция конструктор или массив функций конструкторов.
 * 				После того как объектпрототип будет инициализирован, данная функция
 * 				проверит, что прототип включает методы с именами и количеством
 * 				аргументов, совпадающими с методами экземпляров указанных классов.
 * 				Ни один из методов не будет скопирован, она просто убедится,
 * 				что данный класс "предоставляет" функциональность, обеспечиваемую
 * 				указанным классом. Если проверка окажется неудачной, данный метод
 * 				сгенерирует исключение. В противном случае любой экземпляр нового класса
 * 				может рассматриваться (с использованием методики грубого определения типа)
 * 				как экземпляр указанных типов. Если данное свойство не определено,
 * 				проверка выполняться не будет.
 **/


function defineClass(data) {
// Извлечь значения полей из объектааргумента.
// Установить значения по умолчанию.
	var classname = data.name;
	var superclass = data.extend || Object;
	var constructor = data.construct || function () {
		};
	var methods = data.methods || {};
	var statics = data.statics || {};
	var borrows;
	var provides;
// Заимствование может производиться как из единственного конструктора,
// так и из массива конструкторов.
	if (!data.borrows) borrows = [];
	else if (data.borrows instanceof Array) borrows = data.borrows;
	else borrows = [data.borrows];
// То же для предоставляемых свойств.
	if (!data.provides) provides = [];
	else if (data.provides instanceof Array) provides = data.provides;
	else provides = [data.provides];
// Создать объект, который станет прототипом класса.
	var proto = new superclass();
// Удалить все неунаследованные свойства из нового объектапрототипа.
	for (var p in proto)
		if (proto.hasOwnProperty(p)) delete proto[p];
// Заимствовать методы из классовсмесей, скопировав их в прототип.
	for (var i = 0; i < borrows.length; i++) {
		var c = data.borrows[i];
		borrows[i] = c;
// Скопировать методы из прототипа объекта c в наш прототип
		for (var p in c.prototype) {
			if (typeof c.prototype[p] != "function") continue;
			proto[p] = c.prototype[p];
		}
	}
// Скопировать методы экземпляра в объектпрототип
// Эта операция может переопределить методы, скопированные из классовсмесей
	for (var p in methods) proto[p] = methods[p];
// Установить значения зарезервированных свойств "constructor",
// "superclass" и "classname" в прототипе
	proto.constructor = constructor;
	proto.superclass = superclass;
// Свойство classname установить, только если оно действительно задано.
	if (classname) proto.classname = classname;
// Убедиться, что прототип предоставляет все предполагаемые методы.
	for (var i = 0; i < provides.length; i++) { // для каждого класса
		var c = provides[i];
		for (var p in c.prototype) { // для каждого свойства
			if (typeof c.prototype[p] != "function") continue; // только методы
			if (p == "constructor" || p == "superclass") continue;
// Проверить наличие метода с тем же именем и тем же количеством
// объявленных аргументов. Если метод имеется, продолжить цикл
			if (p in proto &&
				typeof proto[p] == "function" &&
				proto[p].length == c.prototype[p].length) continue;
// В противном случае возбудить исключение
			throw new Error("Класс " + classname + " не предоставляет метод " +
			c.classname + "." + p);
		}
	}
// Связать объектпрототип с функциейконструктором
	constructor.prototype = proto;
// Скопировать статические свойства в конструктор
	for (var p in statics) constructor[p] = data.statics[p];
// И в заключение вернуть функциюконструктор
	return constructor;
}