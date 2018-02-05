import fs from 'fs';
import path from 'path';
import glob from 'glob';
import ejs from 'ejs';
import mkdirp from 'mkdirp';

export default {
  command: 'plugin <name>',
  // 定义命令选项
  options: [

  ],
  run(argument) {
    const name = argument;
    const templateDir = path.join(__dirname, '../templates');
    console.log(templateDir);

    console.log('Start creating file...');

    const targetDir = `aimake-plugin-${name}`;

    mkdirp.sync(targetDir);

    glob.sync('**', {
      cwd: templateDir,
    }).forEach((_source) => {
      let source = _source;
      const target = path.join(targetDir, source.replace(/^_/, '.'));
      console.log(target);
      source = path.join(templateDir, source);
      const stat = fs.lstatSync(source);
      if (stat.isDirectory()) {
        mkdirp.sync(target);
        return;
      }
      const tpl = fs.readFileSync(source, 'utf-8');
      fs.writeFileSync(target, ejs.render(tpl, {
        name,
      }));
    });

    console.log('File created.');
  },
};
