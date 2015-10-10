[js-memory](http://aureooms.github.io/js-memory)
==

Memory management code bricks for JavaScript.

```js
let object = pool.alloc( ) ;
pool.free( object ) ;
pool.collect( ) ;
```

[![NPM license](http://img.shields.io/npm/l/aureooms-js-memory.svg?style=flat)](https://raw.githubusercontent.com/aureooms/js-memory/master/LICENSE)
[![NPM version](http://img.shields.io/npm/v/aureooms-js-memory.svg?style=flat)](https://www.npmjs.org/package/aureooms-js-memory)
[![Bower version](http://img.shields.io/bower/v/aureooms-js-memory.svg?style=flat)](http://bower.io/search/?q=aureooms-js-memory)
[![Build Status](http://img.shields.io/travis/aureooms/js-memory.svg?style=flat)](https://travis-ci.org/aureooms/js-memory)
[![Coverage Status](http://img.shields.io/coveralls/aureooms/js-memory.svg?style=flat)](https://coveralls.io/r/aureooms/js-memory)
[![Dependencies Status](http://img.shields.io/david/aureooms/js-memory.svg?style=flat)](https://david-dm.org/aureooms/js-memory#info=dependencies)
[![devDependencies Status](http://img.shields.io/david/dev/aureooms/js-memory.svg?style=flat)](https://david-dm.org/aureooms/js-memory#info=devDependencies)
[![Code Climate](http://img.shields.io/codeclimate/github/aureooms/js-memory.svg?style=flat)](https://codeclimate.com/github/aureooms/js-memory)
[![NPM downloads per month](http://img.shields.io/npm/dm/aureooms-js-memory.svg?style=flat)](https://www.npmjs.org/package/aureooms-js-memory)
[![GitHub issues](http://img.shields.io/github/issues/aureooms/js-memory.svg?style=flat)](https://github.com/aureooms/js-memory/issues)
[![Inline docs](http://inch-ci.org/github/aureooms/js-memory.svg?branch=master&style=shields)](http://inch-ci.org/github/aureooms/js-memory)

Can be managed through [jspm](https://github.com/jspm/jspm-cli),
[duo](https://github.com/duojs/duo),
[component](https://github.com/componentjs/component),
[bower](https://github.com/bower/bower),
[ender](https://github.com/ender-js/Ender),
[jam](https://github.com/caolan/jam),
[spm](https://github.com/spmjs/spm),
and [npm](https://github.com/npm/npm).

## Install

### jspm
```terminal
jspm install github:aureooms/js-memory
# or
jspm install npm:aureooms-js-memory
```
### duo
No install step needed for duo!

### component
```terminal
component install aureooms/js-memory
```

### bower
```terminal
bower install aureooms-js-memory
```

### ender
```terminal
ender add aureooms-js-memory
```

### jam
```terminal
jam install aureooms-js-memory
```

### spm
```terminal
spm install aureooms-js-memory --save
```

### npm
```terminal
npm install aureooms-js-memory --save
```

## Require
### jspm
```js
let memory = require( "github:aureooms/js-memory" ) ;
// or
import memory from 'aureooms-js-memory' ;
```
### duo
```js
let memory = require( "aureooms/js-memory" ) ;
```

### component, ender, spm, npm
```js
let memory = require( "aureooms-js-memory" ) ;
```

### bower
The script tag exposes the global variable `memory`.
```html
<script src="bower_components/aureooms-js-memory/js/dist/memory.min.js"></script>
```
Alternatively, you can use any tool mentioned [here](http://bower.io/docs/tools/).

### jam
```js
require( [ "aureooms-js-memory" ] , function ( memory ) { ... } ) ;
```

## Use

See [test files](https://github.com/aureooms/js-memory/tree/master/test/js/src).
