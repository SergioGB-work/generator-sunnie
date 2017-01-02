module.exports = require('yeoman-generator').Base.extend({
  'prompting' : function () {

    return this.prompt([{
		type    : 'input',
		name    : 'site_name',
		message : 'Your site name',
		default : this.appname // Default to current folder name
    },
	{
		type    : 'input',
		name    : 'site_url',
		message : 'Your site url(witout /)',
		default : this.appname // Default to current folder name
    },	
	
	{
		
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
		var siteUrl = this.props.site_url.trim().toLowerCase().replace(" ","-").replace(".","-").replace("/","");
		
		if(siteUrl[0]!= '/'){
			siteUrl= '/' + siteUrl;
		}
		
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

		this.fs.copyTpl(
		  this.templatePath('sitemap.json'),
		  this.destinationPath('',siteName+'/sitemap.json'),
		  { siteName: siteName, siteUrl: siteUrl}
		);			

	}
});