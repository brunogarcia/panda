var queue = new createjs.LoadQueue();

var manifest = [
	{
	   'id': 'fondo',
	   'src': 'assets/img/fondo.png'
	},
	{
	   'id': 'contenedor',
	   'src': 'assets/img/contenedor.png'
	},
	{
	   'id': 'animation',
	   'src': 'assets/img/animation.png'
	},
	{
	   'id': 'title',
	   'src': 'assets/img/title.png'
	}
];

// Cargar Manifiesto
queue.loadManifest(manifest);

// Sound
queue.installPlugin(createjs.Sound);
queue.loadFile({
	id:"sonido",
	src:"assets/sonido/sonido.mp3"
});

// Listeners
queue.addEventListener("progress", pandaProgress);
queue.addEventListener("complete", pandaComplete);

jQuery( document ).ready(function( $ ) {

    $("#animation").mouseenter(function() {
        pandaPlaySound();
    });

    $("#animation").mouseleave(function() {
        pandaStopSound();
    });
});

function PandaLoadingStop() {
	$('#spinner_wrapper').slideUp();
}

function pandaProgress(event) {

	var percent = Math.round(event.loaded * 100);
    $('#progress').html(percent + '%');
}

function pandaComplete(event) {
	pandaInsertAssets();
}

function pandaInsertAssets() {

	var $fondo = $('#fondo');
	var $contenedor = $('#contenedor');
	var $animation = $('#animation');
	var $title = $('.title');

	$fondo.css({
		'background-image': 'url(' + queue.getResult('fondo').src + ')'
	});

	$contenedor.css({
		'background-image': 'url(' + queue.getResult('contenedor').src + ')'
	});

	$animation.css({
		'background-image': 'url(' + queue.getResult('animation').src + ')'
	});

	$title.css({
		'background-image': 'url(' + queue.getResult('title').src + ')'
	});

	pandaLoading();

}

function pandaPlaySound () {
  createjs.Sound.play('sonido');
}

function pandaStopSound () {
  createjs.Sound.stop('sonido');
}

function pandaLoading () {
	var $spinner = $('#spinner_wrapper');
	$spinner.slideUp();
}
