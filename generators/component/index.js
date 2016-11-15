module.exports = require('yeoman-generator').Base.extend({
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
		
		this.mkdir(componentName);
			
		this.fs.copyTpl(
		  this.templatePath(''),
		  this.destinationPath('',componentName+'/'),
		  { component_name: componentName }
		);

	}
});