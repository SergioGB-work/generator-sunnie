var Generator = require('yeoman-generator');
var chalk = require('chalk');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
var mkdirp = require('mkdirp');
var wiring = require('html-wiring');
var path = [];
var fs = require('fs');

module.exports = Generator.extend({
	
	initializing: function(){
		var dirLayoutsPlugins = fs.readdirSync('./layouts/');

		this.choicesLayout=[];
		

		for(var i in dirLayoutsPlugins){
			var layoutName = dirLayoutsPlugins[i].split('.')
			var layout = {name:layoutName[0], value: layoutName[0]}
			this.choicesLayout.push(layout); 
		  
		}	  
		
		return this.choicesLayout;
	},
	
	askCommon: function () {
		
		done = this.async();
		var pageSrcQuestion = {
		  type    : 'input',
		  name    : 'src',
		  message : 'Your page file(example: home(without .pug) )'
		};			
		var pageMetatitleQuestion= {
		  type    : 'input',
		  name    : 'metatitle',
		  message : 'Your page meta title',
		  default : this.appname // Default to current folder name
		};
		var pageMetakeywordsQuestion= {
		  type    : 'input',
		  name    : 'metakeywords',
		  message : 'Your page meta keyworks(separated with ,)',
		  default : this.appname // Default to current folder name
		};
		var pageMetadescriptionQuestion= {
		  type    : 'input',
		  name    : 'metadescription',
		  message : 'Your page description',
		  default : this.appname // Default to current folder name
		};
		var pageLayoutQuestion= {
		  type    : 'list',
		  name    : 'layout',
		  message : 'Choose your layout from the list:',
		  choices: this.choicesLayout
		  
		};	
		
		this.prompt([pageSrcQuestion,pageMetatitleQuestion,pageMetadescriptionQuestion,pageMetakeywordsQuestion,pageLayoutQuestion]).
		
		then(function (props) {

			this.props = props;
			this.writing();
		}.bind(this));  	
	},

	writing : function () {
		
		/************* CREATING PAGE ***********/	
		var pageSrc = this.props.src.trim().replace(" ","-").replace(".","-").replace("/","");		
		var metatitle = this.props.metatitle;
		var metakeywords = this.props.metakeywords;
		var metadescription = this.props.metadescription;
		var layout = this.props.layout;
		var pathLayout='';
		var content=''; 
		
		content='extends ./layouts/'+layout+'\n\n';
		content += 'block header\n';
		content += '	title ' + metatitle + '\n';
		content += '	meta(name="keywords",content="'+metakeywords+'")\n';
		content += '	meta(name="description",content="'+metadescription+'")\n\n';
			

		if(this.fs.exists("./layouts/" + layout + '.pug')){
			pathLayout = "./layouts/" + layout + '.pug';
		}
		else{
			this.log("Error, Layout not found");
		}
		
		file = wiring.readFileAsString(pathLayout);
		
		var blocks = [];
		
		file = file.split('header');
		file = file[1].split('block ');
		
		for(var i in file){
			
			if(i>1){
				
				var block = file[i].replace('\n',' ').replace('\t',' ').replace('\r',' ').split(' ');

				content +='block ' + block[0 ] + '\n\n';
				content += '	+component("component-sample","","Lorem ipsum","Hello World")\n\n';
				
			}
			
		}
		var c = this;
		if(pageSrc!=''){
			fs.writeFile(pageSrc+'.pug',
				 content,function(){
					c.log(chalk.bold.green('create ') + pageSrc+'.pug' );
				}
			);
		}
		else{
			this.log('Error: Pagina no creada. No has introducido un nombre');
		}	
	}
});

