Grunt Hang
==========

If you use grunt to build your files during development then you have probably experienced this issue. The time it takes for you to save an edited file, switch to the browser and refresh may not have been long enough for grunt to finish building. This means when you refresh you may not end up with the files you expected. Either because the files you want do not exist or are out of date.

This module provides a connect middleware that will hang connect/express requests in an application until the grunt build is complete.

Installation
============

    $ npm install grunt-hang --save-dev

Usage
=====

It is important that you do not use this module in production. It watches files and reads from disk syncronously.

In Express:
```js
var hang = require('grunt-hang');

app.use(hang('path/to/project/root/'));
```

Add this line to your project's grunt.js gruntfile:
```js
grunt.loadNpmTasks('grunt-hang');
```

Then use the tasks `buildStart` and `buildEnd` when defining you build tasks eg.
```js
grunt.registerTask("default", 'buildStart clean lint test buildEnd');
```

License
-------

MIT
