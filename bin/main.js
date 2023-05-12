#!/usr/bin/env node
import chalk from 'chalk'
import program from 'commander'
import create from '../lib/create.js'
import createPage from '../lib/createPage.js'
import CompCreator from '../lib/CompCreator.js'
// 创建项目命令
program
  .command("create <project-name>") // 创建项目
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action((projectName, cmd) => {
    // 处理用户输入create 指令附加的参数
    create(projectName, cmd);
  });

// 创建page
program
  .command("page <page-name>") // 创建page
  .description("create a new page")
  .action((pageName, cmd) => {
    createPage(pageName, cmd);
  });

// 创建组件
program
.command("comp <component path>") // 创建组件
.description("create a new component")
.option("-g, --global", "create comp in src/components") // 在公共组件目录下创建
.option("-c, --children", "create comp in parent path and append route config") // 创建一个路由子组件
.action((path, options) => {
  const creator = new CompCreator()
  creator.checkPath(path, options)
  creator.create()
});

//创建二级路由组件
program
.command("child <parent path>") // 创建子级路由组件
.description("create a new child router component")
.option("-f, --force", "")
.action((path, cmd) => {
  // 处理用户输入create 指令附加的参数
  const creator = new CompCreator()
  creator.checkPath(path, cmd)
  creator.create()
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