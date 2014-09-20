var TiCarousel = require('com.obscure.ticarousel');


var win = Ti.UI.createWindow();


// --- carousel transform -----
var txopts = {
      arc: Math.PI / 2.0,
      radius: 220.0,
      tilt: 0.9,
      spacing: 1.0,
      yoffset: 20.0,
      zoffset: -400.0
   };

// -- carousel ---
var	iconList = [
		{ image: 'images/add-text.png', id: 'text' },
		{ image: 'images/add-photo.png', id: 'photo' },
		{ image: 'images/add-button.png', id: 'button' },
		{ image: 'images/add-link.png', id: 'link' },
		{ image: 'images/add-video.png', id: 'video' }
	];

var buttons = [];

for (var i=0; i<iconList.length; i++) {
	var icon = iconList[i];
	var button = Ti.UI.createImageView({
		image: icon.image,
		width: 60,
		height: 60
	});
	buttons.push(button);
}

var carousel = TiCarousel.createCarouselView({
    carouselType: TiCarousel.CAROUSEL_TYPE_WHEEL,
    views: buttons,
    height: 190,
    itemWidth: 60,
    numberOfVisibleItems: 5,
    wrap: false,
    transformOptions: txopts,
    bounceDistance: 10
});
carousel.addEventListener('select', function() {
	showMenu = !showMenu;
	
	carouselHolder.animate({
		opacity: showMenu ? 1 : 0,
		duration: 500
	});
});

var addBtn = Ti.UI.createImageView({
	image: 'images/add.png',
	bottom: 0,
	zIndex: 100
});
win.add(addBtn);

var showMenu = false;

var carouselHolder = Ti.UI.createView({
	height: 200,
	bottom: 0,
	opacity: showMenu ? 1 : 0
});
carouselHolder.add(carousel);
win.add(carouselHolder);
carousel.reloadData();


addBtn.addEventListener('click', function() {
	showMenu = !showMenu;
			
	carouselHolder.animate({
		opacity: showMenu ? 1 : 0,
		duration: 500
	});

	carousel.scrollToIndex(2);
});

win.open();
