const util = require('util')
const path = require('path')
const downloadGitRepo = require('download-git-repo')
const ora = require("ora");

class Creator {
	// 项目名称及项目路径
	constructor(name, target) {
		this.name = name
		this.target = target
    // 转化为 promise 方法
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  // 创建项目部分
  create() {
    console.log(this.name, this.target);
  }
  async download(repo, tag) {
    // 模板下载地址
    const templateUrl = 'direct:https://github.com/Bruiser-pink/vue-template.git'
    // 调用 downloadGitRepo 方法将对应模板下载到指定目录
    // 定义一个loading
    const spinner = ora(`clone repository from ${templateUrl}`);
    // 启动loading
    spinner.start();
    setTimeout(() => {
      spinner.color = "yellow";
      spinner.text = "Cloning---";
    }, 1000);
    await this.downloadGitRepo(templateUrl, this.target, { clone: true }, (err) => {
      // loading 成功
      if(err !== undefined) {
        spinner.fail();
      } else {
        // loading 成功
        spinner.text = "done";
        spinner.succeed();
      }
    })
  }
}

module.exports = Creator