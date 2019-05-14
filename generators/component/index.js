var Generator = require('yeoman-generator');
var chalk = require('chalk');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
var store = memFs.create();
var fs = editor.create(store);
var mkdirp = require('mkdirp');

module.exports = Generator.extend({
  'prompting' : function () {

    return this.prompt([{
      type    : 'input',
      name    : 'component_name',
      message : 'Your component name(witout component-)',
      default : this.appname // Default to current folder name
    }]).then(function (answers) {
	  this.props = answers
      this.log('app name', answers.name);
    }.bind(this));


  },

  'writing' : function () {

		var componentName = 'component-'+this.props.component_name;
		
		mkdirp(componentName);
		mkdirp(componentName+'/templates');

		if(!this.fs.exists('include_components.pug')){
				this.fs.copy('../../bundles/src/components/include_components.pug','include_components.pug');
		}	

		this.fs.append('./include_components.pug',
			 '\ninclude ./'+componentName+'/view.pug'
		);

		this.fs.copyTpl(
		  this.templatePath(''),
		  this.destinationPath('',componentName+'/'),
		  { component_name: componentName }
		);

		this.fs.write(componentName+'/locale/es/'+this.props.component_name+'.json',
			 '{}',function(){
				 this.log(chalk.bold.green('create ') + this.props.component_name);
			 }
		);
		this.fs.write(componentName+'/locale/en/'+this.props.component_name+'.json',
			 '{}',function(){
				 this.log(chalk.bold.green('create ') + this.props.component_name);
			 }
		);		

	}
});