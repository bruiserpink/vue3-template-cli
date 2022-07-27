#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')

// // 创建命令
program
  .command("create <project-name>") // 增加创建指令
  .description("create a new project") // 添加描述信息
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action((projectName, cmd) => {
    // 处理用户输入create 指令附加的参数
    require("../lib/create")(projectName, cmd);
  });

program.on("--help", function () {
  // 前后两个空行调整格式，更舒适
  console.log();
  console.log(
    `Run ${chalk.cyan(
      "zc-cli <command> --help"
    )} for detailed usage of given command.`
  );
  console.log();
});



program.parse(process.argv)