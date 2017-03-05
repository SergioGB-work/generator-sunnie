var fs=require('fs');
var path = [];
var lastLevel = [];
var positionToAdd=0;
var chalk = require('chalk');

module.exports = require('yeoman-generator').Base.extend({
	
	initializing: function(){
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

		var siteMap = this.readFileAsString('./sitemap.json')
		
		siteMap = JSON.parse(siteMap);
		this.siteMap = [];
		
		this.siteMap.push({name:'Add to this level',value:0});
		
		for(var i=1; i <= siteMap.pages.length;i++){
			var page = {name:'('+i+')'+siteMap.pages[i-1].name,value:i}
			this.siteMap.push(page);
		}
		
		
		return this.choicesLayout,this.siteMap;
	},
	
	askCommon: function () {
		
		done = this.async();
		
		var pageNameQuestion = {
		  type    : 'input',
		  name    : 'page_name',
		  message : 'Your page name',
		  default : this.appname // Default to current folder name
		};
		var pageSrcQuestion = {
		  type    : 'input',
		  name    : 'src',
		  message : 'Your page file(example: home(without .jade) )'
		};		
		var pageUrlQuestion = {
		  type    : 'input',
		  name    : 'url',
		  message : 'Your page URL(example: /home )',
		  default : this.appname // Default to current folder name
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
		  
		}
		var pageSitemapFirstLevelQuestion= {
		  type    : 'list',
		  name    : 'firstLevelSitemap',
		  message : 'where do you want to add your page?',
		  choices: this.siteMap	  
		  
		};	
		
		this.prompt([pageNameQuestion,pageSrcQuestion,pageUrlQuestion,pageMetatitleQuestion,pageMetadescriptionQuestion,pageMetakeywordsQuestion,pageLayoutQuestion,pageSitemapFirstLevelQuestion]).
		
		then(function (props) {
			
			this.props = props;
			
			position = props.firstLevelSitemap;
			
			if(position==0){
				lastLevel = this.siteMap;
				this.addToPosition();
			}
			
			else{
				path.push(position-1);
				this.nextLevel(path);
			}
			
		}.bind(this));  	
	},
	
	nextLevel : function(path){
		var pages = [];
		
		var siteMap = this.readFileAsString('./sitemap.json');
		siteMap = JSON.parse(siteMap);
		var aux = siteMap.pages;
		
		for(var i in path){
			
			if(aux[path[i]].childs){
				aux = aux[path[i]].childs;
			}
			else{
				aux = [];
			}
		}
		
		pages.push({name:'(0)Add to this level',value:0});
		
		for(var i=1; i <= aux.length;i++){
			var page = {name:'('+i+')' + aux[i-1].name,value:i}
			pages.push(page);
		}		
		
		lastLevel = pages;
		
		var levelQuestion = {
			type    : 'list',
			name    : 'position',
			message : 'where do you want to add your page?',
			choices: pages	    
		};	
		
		
		this.prompt(levelQuestion).
		
		then(function (props) {
		
			if(props.position==0){
				this.addToPosition();
			}
			else{
				path.push(props.position-1);
				this.nextLevel(path);
			}
		
		}.bind(this));
		
	},

	addToPosition : function(pos){
		
		var positions = []
		
		lastLevel.shift();
		
		positions.push({name: 'At to the beginning',value:'0'});
		
		for(var i=1 ; i < lastLevel.length; i++){
			
			var item = lastLevel[i-1].name.split(')');
			
			positions.push({name:'After '+item[1],value: i});
		}
		
		positions.push({name: 'At to the end',value:lastLevel.length});
		
		var position = {
			type    : 'list',
			name    : 'position',
			message : 'What position do you want to add your page in',
			choices: positions   
		};		
		
		this.prompt(position).
		
		then(function (props) {
			positionToAdd = props.position;
			this.writing();
		}.bind(this));		
	},

	writing : function () {
		
		/************* CREATING PAGE ***********/	
		var pageName = this.props.page_name.trim();
		var pageSrc = this.props.src.trim().replace(" ","-").replace(".","-").replace("/","") || pageName.trim().replace(" ","-").replace("/","");
		
		
		var url = this.props.url.toLowerCase().trim().replace(" ","-") || pageSrc;
		
		if(url[0]!='/'){
			url = "/" + url;
		}
		if(url[url.length - 1]!="/"){
			url = url + "/"
		}
		else{
			url = url + ""
		}		
		
		var metatitle = this.props.metatitle;
		var metakeywords = this.props.metakeywords;
		var metadescription = this.props.metadescription;
		var layout = this.props.layout;
		var pathLayout='';
		var content=''; 
		
		content='extends /layouts/'+layout+'\n\n';
		content += 'block header\n';
		content += '	title ' + metatitle + '\n';
		content += '	meta(name="keywords",content="'+metakeywords+'")\n';
		content += '	meta(name="description",content="'+metadescription+'")\n\n';
			
		if(this.fs.exists("../../../bundles/src/layouts/" + layout + '.jade')){
			pathLayout = "../../../bundles/src/layouts/" + layout + '.jade';
		}
		else if(this.fs.exists("../../layouts/" + layout + '.jade')){
			pathLayout = "../../layouts/" + layout + '.jade';
		}
		else{
			this.log("Error, Layout not found");
		}
		
		file = this.readFileAsString(pathLayout);
		
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
		fs.writeFile(pageSrc+'.jade',
			 content,function(){
				c.log(chalk.bold.green('create ') + pageSrc+'.jade' );
			}
		);

		/****************** ADDING TO SITEMAP *****************/
		var siteMap = this.readFileAsString('./sitemap.json');
		var newPage = {"name": pageName,"url": url,"src": "/"+pageSrc+'.html',"childs": []};
		
		var pages = JSON.parse(siteMap).pages;
		
		newSitemap = pushJson(pages,newPage,path,path.length,0,positionToAdd);
		siteMap = JSON.parse(siteMap);
		siteMap.pages = newSitemap;	
		
		siteMap = JSON.stringify(siteMap, null, '\t');
		
		fs.writeFile('./sitemap.json',
			siteMap
		);
		

	}
});


function pushJson(array,json,path,length,i,pos){
	
	if(i == (length)){	
		array.splice(pos,0,json);
		return array;
	}
	else{
		pushJson(array[path[i]].childs,json,path,length,i+1,pos);
		return array
	}
}

