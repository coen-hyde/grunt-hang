var path = require('path')
  , fs = require('fs')
  , EventEmitter = require('events').EventEmitter
  , building = false
  , vent = new EventEmitter();

hanger = function(projectRoot) {
  var buildFile = path.resolve(projectRoot)+'/.grunthang'

  if (!fs.existsSync(buildFile)) {
    fs.writeFileSync(buildFile, '-');
  }

  fs.watch(buildFile, function(event) {
    // This is sync but this npm should only be used in development anyway.
    contents = fs.readFileSync(buildFile, 'utf8');
    if ('+' === contents) {
      vent.emit('build:start');
    }
    else if ('-' === contents) {
      vent.emit('build:end');
    }
  });

  return function(req, res, next) {
    if (!building) {
      return next();
    }

    vent.once('build:end', next);
  };
};

vent.on('build:start', function() {
  building = true;
});

vent.on('build:end', function() {
  building = false;
});

hanger.vent = vent;

module.exports = hanger;