#!/usr/bin/env node
import chalk from 'chalk'
import program from 'commander'
import create from '../lib/create.js'
import createPage from '../lib/createPage.js'
// 创建项目命令
program
  .command("create <project-name>") // 增加创建指令
  .description("create a new project") // 添加描述信息
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action((projectName, cmd) => {
    // 处理用户输入create 指令附加的参数
    create(projectName, cmd);
  });

// 创建page
program
  .command("page <page-name>") // 增加创建指令
  .description("create a new page") // 添加描述信息
  .action((pageName, cmd) => {
    // 处理用户输入create 指令附加的参数
    createPage(pageName, cmd);
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