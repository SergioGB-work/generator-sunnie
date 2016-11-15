module.exports = require('yeoman-generator').Base.extend({
  'prompting' : function () {

    return this.prompt([{
		type    : 'input',
		name    : 'site_name',
		message : 'Your site name(witout component-)',
		default : this.appname // Default to current folder name
    },{
		
		type    : 'list',
		name    : 'theme',
		message : 'What theme do you want to applied to your Site?',
		choices: [{
				name:'sun-theme', 
				value: 'sun-theme',
				checked: true
			},{
				name:'Later', 
				value: 'Later'		
			}
		]		
	}
	
	
	]).then(function (answers) {
	  this.props = answers
    }.bind(this));


  },

  'writing' : function () {

		var siteName = this.props.site_name.trim().toLowerCase();
		var theme = this.props.theme;
			
		this.fs.copy(
			this.templatePath('home.jade'),
			this.destinationPath('',siteName+'/home.jade')
		);
		
		this.fs.copyTpl(
		  this.templatePath('build.json'),
		  this.destinationPath('',siteName+'/build.json'),
		  { theme: theme }
		);		

	}
});