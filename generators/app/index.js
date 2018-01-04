'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  'initializing' : function () {
    this.composeWith('base-component:component');
    this.composeWith('base-component:layout');
    //this.composeWith('base-component:page');
  } 
});
