(function(){
	"use strict";
	var c = document.getElementById("myCanvas");
	/*
	* Figure constructor
	*/
	function Figure() {
		
	}

	Figure.prototype.getArea = function(width, height) {
	  console.log("getting area...");
	};

	Figure.prototype.outputArea = function() {
  		var areaDiv = document.getElementById("area");
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
		var ctx = c.getContext("2d");
		ctx.rect(0, 0, this.getWidth(), this.getHeight());
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
		this.area = this.getWidth() * this.getHeight() / 2;
	 	return this;
	};

	Triangle.prototype.render = function(){
		
		var ctx = c.getContext("2d");
		var x = c.width / 2;
		var y = c.height / 2 - this.getWidth() / 2;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + this.getWidth() / 2, y + this.getHeight());
		ctx.lineTo(x - this.getWidth() / 2, y + this.getHeight());
		ctx.closePath();
		ctx.fill();
	    return this;
	};


	document.getElementById('rectangle_li').onclick = function(){
		if(document.getElementById('rectangle').checked) {
			document.getElementById('rectangle_dimensions').style.display = 'block';
		}else {
		  document.getElementById('rectangle_dimensions').style.display = 'none';
		}
	};


	document.getElementById("ok").onclick = function(e){
		e.preventDefault();
		var selected = document.querySelector('input[name="type"]:checked');
		if(selected !== null) {
			var selectedValue = selected.value;
			var ctx = c.getContext("2d");
			ctx.clearRect(0, 0, c.width, c.height);

			if(selectedValue === 'Rectangle') {
				var rectangleWidthEl = document.getElementById('rectangle_width');
				var rectangleHeightEl = document.getElementById('rectangle_height');

				var rectangle = new Rectangle(rectangleWidthEl.value, rectangleHeightEl.value);
				rectangle.render();
				
				
			} else if(selectedValue === 'Triangle') {
				var triangle = new Triangle(50, 100);
				triangle.getArea().render();
				console.log(triangle)
			} else {

			}
		}
	}
	

} ());