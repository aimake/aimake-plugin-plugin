'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  command: 'plugin <name>',
  // 定义命令选项
  options: [],
  run: function run(argument) {
    var name = argument;
    var templateDir = _path2.default.join(__dirname, '../templates');
    console.log(templateDir);

    console.log('Start creating file...');

    var targetDir = 'aimake-plugin-' + name;

    _mkdirp2.default.sync(targetDir);

    _glob2.default.sync('**', {
      cwd: templateDir
    }).forEach(function (_source) {
      var source = _source;
      var target = _path2.default.join(targetDir, source.replace(/^_/, '.'));
      console.log(target);
      source = _path2.default.join(templateDir, source);
      var stat = _fs2.default.lstatSync(source);
      if (stat.isDirectory()) {
        _mkdirp2.default.sync(target);
        return;
      }
      var tpl = _fs2.default.readFileSync(source, 'utf-8');
      _fs2.default.writeFileSync(target, _ejs2.default.render(tpl, {
        name: name
      }));
    });

    console.log('File created.');
  }
};