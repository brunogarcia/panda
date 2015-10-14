# Panda

Plantilla para proyectos de animación e ilustración de Eva Santos

## Instalar dependencias

	$ npm install
	$ bower install

***

## Entorno de desarrollo

Entorno para trabajar en local. Dentro del proyecto, se ubica en la carpeta _dev_.

### Tareas

	$ grunt dev

### Plugins

* [Connect](https://github.com/gruntjs/grunt-contrib-connect)

* [Watch](https://www.npmjs.com/package/grunt-contrib-watch)

* [Sass](https://www.npmjs.com/package/grunt-contrib-sass)

* [JSHint](https://github.com/gruntjs/grunt-contrib-jshint)

***

## Entorno de distribución

Entorno para hacer deploys en los servidores de producción. Dentro del proyecto, se ubica en las carpetas _dist_ y _tmp_.

### Tareas

	$ grunt dist

### Plugins

* [Clean](https://github.com/gruntjs/grunt-contrib-clean)

* [Copy](https://github.com/gruntjs/grunt-contrib-copy)

* [Uglify](https://github.com/gruntjs/grunt-contrib-uglify)

* [Process html](https://www.npmjs.com/package/grunt-processhtml)

* [HTML Min](https://github.com/gruntjs/grunt-contrib-htmlmin)

* [Sass](https://www.npmjs.com/package/grunt-contrib-sass)

* [Cache Breaker](https://www.npmjs.com/package/grunt-cache-breaker)

***

## Utilidades

### Tareas

	$ grunt bowercopy
	$ grunt ftp

### Plugins

* [Bowercopy](https://www.npmjs.com/package/grunt-bowercopy)
* [FTP Deploy](https://github.com/zonak/grunt-ftp-deploy)

***

## Hojas de estilo

* [Normalize](https://necolas.github.io/normalize.css/): A modern, HTML5-ready alternative to CSS resets

* [Bourbon](http://bourbon.io/): A simple and lightweight mixin library for Sass.

