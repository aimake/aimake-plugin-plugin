export default {
  // 定义命令选项
  options: [
    // ['-r, --registry <registry>', 'change npm registry']
  ],
  run(argument, options) {
    // argument 命令参数
    // options  命令配置
    console.log('<%- name %> plugin run');
  },
};
