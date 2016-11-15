var fs=require('fs');

module.exports = require('yeoman-generator').Base.extend({
	
  'initializing': function(){
	  var dirLayoutsBundles = fs.readdirSync('../../../bundles/src/layouts/');
	  var dirLayoutsPlugins = fs.readdirSync('../../layouts/');
	  this.choicesLayout=[];
	  
	  for(var i in dirLayoutsBundles){
		 var layoutName = dirLayoutsBundles[i].split('.')
		 var layout = {name:layoutName[0], value: layoutName[0]}
		 this.choicesLayout.push(layout); 
		  
	  }
	  
	  for(var i in dirLayoutsPlugins){
		 var layoutName = dirLayoutsPlugins[i].split('.')
		 var layout = {name:layoutName[0], value: layoutName[0]}
		 this.choicesLayout.push(layout); 
		  
	  }	  
	   
	   return this.choicesLayout;
  },	
	
  'prompting' : function () {

    return this.prompt([{
      type    : 'input',
      name    : 'page_name',
      message : 'Your page name',
      default : this.appname // Default to current folder name
    },	{
      type    : 'input',
      name    : 'metatitle',
      message : 'Your page meta title',
      default : this.appname // Default to current folder name
    },{
      type    : 'input',
      name    : 'metakeywords',
      message : 'Your page meta keyworks(separated with ,)',
      default : this.appname // Default to current folder name
    },{
      type    : 'input',
      name    : 'metadescription',
      message : 'Your page description',
      default : this.appname // Default to current folder name
    },{
      type    : 'list',
      name    : 'layout',
      message : 'Choose your layout from the list:',
	  choices: this.choicesLayout
	  
    }]).then(function (answers) {
	  this.props = answers
      this.log('app name', answers.name);
    }.bind(this));


  },

  'writing' : function () {
		
		var pageName = this.props.page_name;
		var metatitle = this.props.metatitle;
		var metakeywords = this.props.metakeywords;
		var metadescription = this.props.metadescription;
		var layout = this.props.layout;
		var path='';
		var content=''; 
		
		content='extends /layouts/'+layout+'\n\n';
		content += 'block header\n';
		content += '	title ' + metatitle + '\n';
		content += '	meta(name="keywords",content="'+metakeywords+'")\n';
		content += '	meta(name="description",content="'+metadescription+'")\n\n';
			
		if(this.fs.exists("../../../bundles/src/layouts/" + layout + '.jade')){
			path = "../../../bundles/src/layouts/" + layout + '.jade';
		}
		else if(this.fs.exists("../../layouts/" + layout + '.jade')){
			path = "../../layouts/" + layout + '.jade';
		}
		else{
			this.log("Error, Layout not found");
		}
		
		file = this.readFileAsString(path);
		
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
		this.fs.write(
			 this.destinationPath(pageName+'.jade'),
			 content
		);		

	}
});