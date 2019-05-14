var chalk = require('chalk');
var fs=require('fs');
var rows = [];  
var columnDistribution =[];
var layoutName;
var picture='';	
var done;
var Generator = require('yeoman-generator');


module.exports = Generator.extend({

			  askLayoutName: function () {
				done = this.async();
				
				var layoutNameQuestion = {
					type    : 'input',
					name    : 'layout_name',
					message : 'Choose the layout name(witout layout-)',
					default : this.appname // Default to current folder name
				};
			  
				
				 this.prompt(layoutNameQuestion).then(function (props) {
					layoutName = props.layout_name;
					this.askRowColumns();
					
				  }.bind(this));  
			  
			  },
			  
				askRowColumns: function () { 

				var addTypeQuestion = {
				  type    : 'list',
				  name    : 'addType',
				  message : 'What do you want to do to your Layout?',
					choices: [{
							name:'Add Row', 
							value: 'row',
							checked: true
						},{
							name:"It's Done", 
							value: 'done'		
						}			
					]
				}; 
				
				this.prompt(addTypeQuestion).then(function (props) {
				  
					if(props.addType == 'row'){
						this.askDistribution();
					}
					else{
						this.wt();
					}
				
				}.bind(this));  
			  
			},

			   askDistribution: function () { 
				
				var fluidNotFluidQuestion = {
				  type    : 'list',
				  name    : 'fluidNotFluid',
				  message : 'Do you want a Row Fluid(100%) or a not Fluid(fixed container)?',
					choices: [{
							name:'Not Fluid', 
							value: 'notfluid',
							checked: true
						},{
							name:'Fluid', 
							value: 'fluid',		
						}	
					]
				};	
				
				var numberColumnsQuestion = {
				  type    : 'list',
				  name    : 'numberColumns',
				  message : 'How many columns do you need?',
					choices: [{
							name:'1', 
							value: '1',
							checked: true
						},{
							name:'2', 
							value: '2',		
						}	
						,{
							name:'3', 
							value: '3',		
						}	
						,{
							name:'4', 
							value: '4',		
						}				
					]
				};		
				
			  
			  this.prompt([fluidNotFluidQuestion,numberColumnsQuestion]).then(function (props) {
				  
				  rows.push(props.fluidNotFluid);
				  
					switch(props.numberColumns){
						case '1':
							this.ask1ColumnsWidths();
							break;
						
						case '2':
							this.ask2ColumnsWidths();
							break;

						case '3':
							this.ask3ColumnsWidths();
							break;	

						case '4':
							this.ask4ColumnsWidths();
							break;					
					}
				

			  }.bind(this));

			  },
				
			ask1ColumnsWidths: function(){
				
			var width1ColumnQuestion = {
				  type    : 'list',
				  name    : 'width1Columns',
				  message : 'What distribution of columns do you need?',
					choices: [{
							name:'12', 
							value: '12',
							checked: true
						}
					]
				};		  	
				
			  this.prompt(width1ColumnQuestion).then(function (props) {
				  columnDistribution.push(props.width1Columns);
				  this.showCurrentDesign(props.width1Columns);	
				  this.askRowColumns();

			  }.bind(this));	
			  
			},

			ask2ColumnsWidths: function(){
				
				var width2ColumnQuestion = {
				  type    : 'list',
				  name    : 'width2Columns',
				  message : 'What distribution of columns do you need?',
					choices: [{
							name:'6 - 6', 
							value: '6-6',
							checked: true
						},{
							name:'4 - 8', 
							value: '8-4'
						},{
							name:'8 - 4', 
							value: '8-4'
						},{
							name:'7 - 5', 
							value: '7-5'
						},{
							name:'5 - 7', 
							value: '5-7'
						},{
							name:'3 - 9', 
							value: '3-9'
						},{
							name:'9 - 3', 
							value: '9-3'
						}				
					]		
				};	  	
				
			  this.prompt(width2ColumnQuestion).then(function (props) {
				  columnDistribution.push(props.width2Columns);
				  this.showCurrentDesign(props.width2Columns);	
				  this.askRowColumns();

			  }.bind(this));	
			  
			},

			ask3ColumnsWidths: function(){
				
			var width3ColumnQuestion = {
				  type    : 'list',
				  name    : 'width3Columns',
				  message : 'What distribution of columns do you need?',
					choices: [{
							name:'4 - 4 - 4', 
							value: '4-4-4',
							checked: true
						},{
							name:'3 - 3 - 6', 
							value: '3-3-6'
						},{
							name:'3 - 6 - 3', 
							value: '3-6-3'
						},{
							name:'6 - 3 - 3', 
							value: '6-3-3'
						},{
							name:'3 - 4 - 5', 
							value: '3-4-5'
						},{
							name:'4 - 3 - 5', 
							value: '4-3-5'
						},{
							name:'4 - 5 - 3', 
							value: '4 - 5 - 3'
						},{
							name:'5 - 4 - 3', 
							value: '5-4-3'
						}				
					]		
				};    	
				
			  this.prompt(width3ColumnQuestion).then(function (props) {
				  columnDistribution.push(props.width3Columns);
				  this.showCurrentDesign(props.width3Columns);	
				  this.askRowColumns();

			  }.bind(this));	
			  
			},

			ask4ColumnsWidths: function(){
				
			var width4ColumnQuestion = {
				  type    : 'list',
				  name    : 'width4Columns',
				  message : 'What distribution of columns do you need?',
					choices: [{
							name:'3 - 3 - 3 - 3', 
							value: '3-3-3-3',
							checked: true
						}
					]		
				}; 	
				
			  this.prompt(width4ColumnQuestion).then(function (props) {
				  columnDistribution.push(props.width4Columns);
				  this.showCurrentDesign(props.width4Columns);	
				  this.askRowColumns();

			  }.bind(this));	
			  
			},

			showCurrentDesign: function(distribution){

				distribution = distribution.split('-');
				this.log(distribution);
				for(var i in distribution){
					switch(distribution[i]){
						
						case '3':
							picture+='/--- '+chalk.bold.yellow('3')+' ---/ ';
							break;
							
						case '4':
							picture+='/---- '+chalk.bold.yellow('4')+' ----/ ';
							break;

						case '5':
							picture+='/-------- '+chalk.bold.yellow('5')+' --------/ ';
							break;

						case '6':
							picture+='/--------- '+chalk.bold.yellow('6')+' ---------/ ';
							break;						

						case '7':
							picture+='/---------- '+chalk.bold.yellow('7')+' ---------/ ';
							break;		

						case '8':
							picture+='/-------------- '+chalk.bold.yellow('8')+' --------------/ ';
							break;	

						case '9':
							picture+='/--------------- '+chalk.bold.yellow('9')+' --------------/ ';
							break;								

						case '12':
							picture+='/------------------- '+chalk.bold.yellow('12')+' --------------------/ ';
							break;
							
					}
				}
				
				picture += '\n';
				
				
				this.log('         ');
				this.log('         ');
				this.log(chalk.bold.cyan(picture));
				this.log('         ');
				this.log('         ');	
				
				
			},
	
	wt: function () {

		var componentName = 'layout-'+layoutName+'.pug';
		
		var content = 'mixin layout-12-9-3-12(content)\n';
		var index=0;
		
		for (var i in rows){
			var columns = columnDistribution[i].split('-');
			for(var column in columns){
				content += '	- var content_upper = content.column'+index+'\n';
				index++;
			}
		}	

		content += '\n	div(id="layout-'+layoutName+'",class="layout",role="main",data-layout-id="layout-'+layoutName+'")\n';
		
		var index=0;
		
		for (var i in rows){

			switch(rows[i]){
				
				case 'fluid':
					content+='		div(class="container-fluid")\n\n';
					break;
					
				case 'notfluid':
					content+='		div(class="container")\n\n';
					break;				
				
			}
			
			content += '			div(class="layout-row row")\n\n';
			var columns = columnDistribution[i].split('-');
			for(var column in columns){
				switch (columns[column]){
					case '3':
						content += '				div(class="column col-md-3 col-xs-12",data-layout-column="'+index+'")\n';
						break;
						
					case '4':
						content += '				div(class="column col-md-4 col-xs-12",data-layout-column="'+index+'")\n';
						break;

					case '5':
						content += '				div(class="column col-md-5 col-xs-12",data-layout-column="'+index+'")\n';
						break;

					case '6':
						content += '				div(class="column col-md-6 col-xs-12",data-layout-column="'+index+'")\n';
						break;						
						
					case '7':
						content += '				div(class="column col-md-7 col-xs-12",data-layout-column="'+index+'")\n';
						break;

					case '8':
						content += '				div(class="column col-md-8 col-xs-12",data-layout-column="'+index+'")\n';
						break;

					case '9':
						content += '				div(class="column col-md-9 col-xs-12",data-layout-column="'+index+'")\n';
						break;	
						
					case '12':
						content += '				div(class="column col-md-12 col-xs-12",data-layout-column="'+index+'")\n';
						break;				
				}
			
			content += '					each component,index in column'+index+' \n';
			content += '						+component({"name":component.name || "" , "id":component.id || "","content":component.content || "", "title":component.title || "","showTitle":component.showTitle || "true", "full":component.full || "false","classes":component.classes || "", "index":index})\n\n';
			index++;
		}
			
	}  
	
	var c = this;
	fs.writeFile(componentName,
		 content,function(){
			 c.log(chalk.bold.green('create ') + componentName);
		 }
	);	
	
 	return;
	
 }
});