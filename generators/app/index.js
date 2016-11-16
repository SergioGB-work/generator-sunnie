module.exports = require('yeoman-generator').Base.extend({
  'initializing' : function () {
    this.composeWith('base-component:component');
    this.composeWith('base-component:layout');
    this.composeWith('base-component:site');
    this.composeWith('base-component:theme');
    this.composeWith('base-component:page');
    this.composeWith('base-component:init');
  }
});
