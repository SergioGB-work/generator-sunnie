var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');
var chalk = require('chalk');

module.exports = Generator.extend({
  'prompting' : function () {

    return;


  },

  'writing' : function () {
	  
		this.log(chalk.bold.cyan('Initializing plugins dir...'))
		
		mkdirp('plugins');	
		this.log(chalk.bold.green('create') + ' /plugins')

		mkdirp('plugins/themes');	
		this.log(chalk.bold.green('create') + ' /plugins/themes');	
		
		mkdirp('plugins/layouts');
		this.log(chalk.bold.green('create') + ' /plugins/layouts');	
		
		mkdirp('plugins/components');
		this.log(chalk.bold.green('create') + ' /plugins/components');

		mkdirp('plugins/fragments');
		this.log(chalk.bold.green('create') + ' /plugins/fragments');		
		
		mkdirp('plugins/sites');	
		this.log(chalk.bold.green('create') + ' /plugins/sites')
	}
});