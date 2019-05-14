var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = Generator.extend({
  'prompting' : function () {

    return this.prompt([{
		type    : 'input',
		name    : 'theme_name',
		message : 'Your theme name(witout theme-)',
		default : this.appname // Default to current folder name
    },{
		
		type    : 'list',
		name    : 'theme',
		message : 'What is the parent theme?',
		choices: [{
				name:'sun-theme', 
				value: 'sun-theme',
				checked: true
			}
		]		
	}
	
	
	]).then(function (answers) {
	  this.props = answers
    }.bind(this));


  },

  'writing' : function () {

		var themeName = this.props.theme_name.trim().toLowerCase()+'-theme';
		var themeParent = this.props.theme;
			
		mkdirp(themeName);	
		mkdirp(themeName + '/templates');	
		mkdirp(themeName + '/css');	
		mkdirp(themeName + '/javascript');	
		mkdirp(themeName + '/images');	
			
		this.fs.copy(
			this.templatePath('custom.scss'),
			this.destinationPath('',themeName+'/css/custom.scss')
		);
		
		this.fs.copyTpl(
		  this.templatePath('build.json'),
		  this.destinationPath('',themeName+'/templates/build.json'),
		  { themeParent: themeParent }
		);		

	}
});