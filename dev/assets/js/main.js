( function( $ ) {

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

    function progress(event) {
        var percent = Math.round(event.loaded * 100);
        $('#progress').html(percent + '%');
    }

    function complete(event) {
        insertAssets();
    }

    function insertAssets() {

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

        stopLoading();

    }

    function stopLoading () {
        var $spinner = $('#spinner_wrapper');
        $spinner.slideUp();
    }

    function playSound () {
        createjs.Sound.play('sonido');
    }

    function stopSound () {
        createjs.Sound.stop('sonido');
    }

// Load Manifiest
queue.loadManifest(manifest);

// Sound
queue.installPlugin(createjs.Sound);

queue.loadFile({
    id:"sonido",
    src:"assets/sonido/sonido.mp3"
});

// Listeners
queue.addEventListener("progress", progress);

queue.addEventListener("complete", complete);

// Animations
jQuery( document ).ready(function( $ ) {

    var $animation = $("#animation");

    $animation.mouseenter(function() {
        playSound();
    });

    $animation.mouseleave(function() {
        stopSound();
    });
});

} )( jQuery );

