var Generator = require('yeoman-generator');
var fs=require('fs');

module.exports = Generator.extend({

	'initializing': function(){
		var dirThemesBundles = fs.readdirSync('../../bundles/src/themes/');
		var dirThemesPlugins = fs.readdirSync('../themes/');

		this.choicesTheme=[];
		
		for(var i in dirThemesBundles){
			var themeName = dirThemesBundles[i].split('.')
			var theme = {name:themeName[0], value: themeName[0]}
			this.choicesTheme.push(theme); 
		  
		}

		for(var i in dirThemesPlugins){
			var themeName = dirThemesPlugins[i].split('.')
			var theme = {name:themeName[0], value: themeName[0]}
			this.choicesTheme.push(theme); 
		  
		}
		
		return this.choicesTheme;
	},

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
		choices: this.choicesTheme		
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
			this.templatePath('home.pug'),
			this.destinationPath('',siteName+'/home.pug')
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

		this.fs.copyTpl(
		  this.templatePath('locale/es/lang.json'),
		  this.destinationPath('',siteName+'/locale/es/'+siteName+'.json'),
		  { theme: theme }
		);
		this.fs.copyTpl(
		  this.templatePath('locale/en/lang.json'),
		  this.destinationPath('',siteName+'/locale/en/'+siteName+'.json'),
		  { theme: theme }
		);					

	}
});