(function(){
	"use strict";
	var c = document.getElementById("myCanvas"),
		ctx = c.getContext("2d"),
		okEl = document.getElementById("ok"),
		areaDiv = document.getElementById("area"),

		rectangleEl = document.getElementById('rectangle'),
		rectangleLiEl = document.getElementById('rectangle_li'),
		rectangleDimensionsEl = document.getElementById('rectangle_dimensions'),
		rectangleWidthEl = document.getElementById('rectangle_width'),
		rectangleHeightEl = document.getElementById('rectangle_height'),

		triangleEl = document.getElementById('triangle'),
		triangleLiEl = document.getElementById('triangle_li'),
		triangleDimensionsEl = document.getElementById('triangle_dimensions'),
		triangleWidthEl = document.getElementById('triangle_width'),
		triangleHeightEl = document.getElementById('triangle_height'),

		circleEl = document.getElementById('circle'),
		circleLiEl = document.getElementById('circle_li'),
		circleDimensionsEl = document.getElementById('circle_dimensions'),
		circleRadiusEl = document.getElementById('circle_radius');

	/*
	* Figure constructor
	*/
	function Figure() {
		
		
	}

	Figure.prototype.getArea = function(width, height) {
		console.log("getting area...");
	};

	Figure.prototype.cleanCanvas = function() {
		ctx.beginPath();
		ctx.clearRect(0, 0, c.width, c.height);
	};

	Figure.prototype.outputArea = function() {
		areaDiv.innerHTML = "Area is " + this.getArea();
	};


	/*
	* Rectangle constructor
	*/
	function Rectangle(width, height) {
		var rectWidth = width;
		var rectHeight = height;

		this.getWidth = function(){
			return rectWidth;
		};
		this.setWidth = function(value){
			rectWidth = value;
		};

		this.getHeight = function(){
			return rectHeight;
		};
		this.setHeight = function(value){
			rectHeight = value;
		}		
	}

	Rectangle.prototype = Object.create(Figure.prototype);

	/*
	* Override Figure getArea()
	*/
	Rectangle.prototype.getArea = function(){
		return this.getWidth() * this.getHeight();
	};


	Rectangle.prototype.render = function(){
		this.cleanCanvas();

		ctx.rect(0, 0, this.getWidth(), this.getHeight());
		ctx.fill();
		ctx.stroke();

		this.outputArea();
	};

	/*
	* Triangle constructor
	*/
	function Triangle(width, heigh) {
		var trWidth = width;
		var trHeight = heigh;

		this.getWidth = function(){
			return trWidth;
		};
		this.setWidth = function(value){
			trWidth = value;
		};

		this.getHeight = function(){
			return trHeight;
		};
		this.setHeight = function(value){
			trHeight = value;
		}

	}

	Triangle.prototype = Object.create(Figure.prototype);

	/*
	* Override Figure getArea()
	*/
	Triangle.prototype.getArea = function(){
		return this.getWidth() * this.getHeight() / 2;
	 	
	};

	Triangle.prototype.render = function(){
		this.cleanCanvas();

		var x = c.width / 2;
		var y = c.height / 2 - this.getWidth() / 2;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + this.getWidth() / 2, y + this.getHeight());
		ctx.lineTo(x - this.getWidth() / 2, y + this.getHeight());
		ctx.closePath();
		ctx.fill();

		this.outputArea();
	    return this;
	};



	/*
	* Circle constructor
	*/
	function Circle(radius) {
		var circleRadius = radius;

		this.getRadius = function(){
			return circleRadius;
		};
		this.setRadius = function(value){
			circleRadius = value;
		};
	}

	Circle.prototype = Object.create(Figure.prototype);

	/*
	* Override Figure getArea()
	*/
	Circle.prototype.getArea = function(){
		return 3.14 *  Math.pow(this.getRadius(), 2);
	};

	Circle.prototype.render = function(){
		this.cleanCanvas();

		ctx.beginPath();
		ctx.arc(100,75,this.getRadius(),0,2*Math.PI);
		ctx.fill();
		ctx.stroke();

		this.outputArea();
	    return this;
	};




	rectangleLiEl.onclick = function(){
		if(rectangleEl.checked) {
			rectangleDimensionsEl.style.display = 'block';
			triangleDimensionsEl.style.display = 'none';
			circleDimensionsEl.style.display = 'none';
		}
	};
	triangleLiEl.onclick = function(){
		if(triangleEl.checked) {
			triangleDimensionsEl.style.display = 'block';
			rectangleDimensionsEl.style.display = 'none';
			circleDimensionsEl.style.display = 'none';
		}
	};
	circleLiEl.onclick = function(){
		if(circleEl.checked) {
			circleDimensionsEl.style.display = 'block';
			rectangleDimensionsEl.style.display = 'none';
			triangleDimensionsEl.style.display = 'none';
		}
	};


	okEl.onclick = function(e){
		e.preventDefault();
		var selected = document.querySelector('input[name="type"]:checked');
		if(selected !== null) {
			var selectedValue = selected.value;

			if(selectedValue === 'Rectangle') {
				if(rectangleWidthEl.value && rectangleHeightEl.value){
					var figure = new Rectangle(rectangleWidthEl.value, rectangleHeightEl.value);
				}
			} else if(selectedValue === 'Triangle') {
				if(+triangleWidthEl.value && +triangleHeightEl.value) {
					var figure = new Triangle(+triangleWidthEl.value, +triangleHeightEl.value);
				}
			} else {
				if(circleRadiusEl.value){
					var figure = new Circle(circleRadiusEl.value);
				}
			}
			if(figure !== undefined) {
				figure.render();
			} else {
				alert("Insert values!");
			}
		} else {
			alert("Select a figure!");
		}
	}
	

} ());