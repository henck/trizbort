(function() {
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['alan2'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return "LOCATION "
    + container.escapeExpression((helpers.className || (depth0 && depth0.className) || alias1).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"className","hash":{},"data":data}))
    + " NAME "
    + ((stack1 = container.lambda((depth0 != null ? depth0.name : depth0), depth0)) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.connections : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "END LOCATION.\n"
    + ((stack1 = helpers["if"].call(depth0,(helpers.isStartRoom || (depth0 && depth0.isStartRoom) || alias1).call(depth0,depth0,{"name":"isStartRoom","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.objects : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  DESCRIPTION\n    \""
    + ((stack1 = container.lambda((depth0 != null ? depth0.description : depth0), depth0)) != null ? stack1 : "")
    + "\"\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing, alias2=container.escapeExpression;

  return "  EXIT "
    + alias2((helpers.dirToStr || (depth0 && depth0.dirToStr) || alias1).call(depth0,(depth0 != null ? depth0.startDir : depth0),(depth0 != null ? depth0.startType : depth0),{"name":"dirToStr","hash":{},"data":data}))
    + " TO "
    + alias2((helpers.className || (depth0 && depth0.className) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.room : depth0)) != null ? stack1.name : stack1),{"name":"className","hash":{},"data":data}))
    + ".\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "START AT "
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + ".\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return "OBJECT "
    + container.escapeExpression((helpers.className || (depth0 && depth0.className) || alias1).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"className","hash":{},"data":data}))
    + " NAME "
    + ((stack1 = (helpers.objName || (depth0 && depth0.objName) || alias1).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"objName","hash":{},"data":data})) != null ? stack1 : "")
    + " AT "
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias1).call(depth0,(depths[1] != null ? depths[1].name : depths[1]),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "END OBJECT.\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.rooms : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});

templates['alan3'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return "The "
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias1).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + " Isa location\n  Name '"
    + ((stack1 = container.lambda((depth0 != null ? depth0.name : depth0), depth0)) != null ? stack1 : "")
    + "'\n"
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.dark : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.connections : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "End The "
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias1).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + ".\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.objects : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  Description\n    \""
    + ((stack1 = container.lambda((depth0 != null ? depth0.description : depth0), depth0)) != null ? stack1 : "")
    + "\"\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "Is not lit.";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return "  Exit "
    + container.escapeExpression((helpers.dirToStr || (depth0 && depth0.dirToStr) || alias1).call(depth0,(depth0 != null ? depth0.startDir : depth0),(depth0 != null ? depth0.startType : depth0),{"name":"dirToStr","hash":{},"data":data}))
    + " To "
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.room : depth0)) != null ? stack1.name : stack1),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + ".\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.alan3Object,depth0,{"name":"alan3Object","hash":{"location":depths[1],"object":depth0},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "Start at "
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || helpers.helperMissing).call(depth0,((stack1 = ((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.startRoom : stack1)) != null ? stack1.name : stack1),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + ".\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.rooms : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(depth0,((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.startRoom : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useDepths":true});

templates['alan3Object'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  Description\n    \""
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.description : stack1), depth0)) != null ? stack1 : "")
    + "\"\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return "The "
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.name : stack1),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + " Isa object At "
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.location : depth0)) != null ? stack1.name : stack1),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + "\n  Name "
    + ((stack1 = (helpers.objName || (depth0 && depth0.objName) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.name : stack1),{"name":"objName","hash":{},"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(depth0,((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.description : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "End The "
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.name : stack1),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + ".\n";
},"useData":true});

templates['inform7'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.title : stack1), depth0)) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "Untitled Adventure";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "by \""
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.author : stack1), depth0)) != null ? stack1 : "")
    + "\"";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return "Part "
    + ((stack1 = (helpers.validName || (depth0 && depth0.validName) || alias1).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"validName","hash":{},"data":data})) != null ? stack1 : "")
    + "\n\nThere is a room called "
    + ((stack1 = (helpers.validName || (depth0 && depth0.validName) || alias1).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"validName","hash":{},"data":data})) != null ? stack1 : "")
    + ". "
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.dark : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(depth0,(helpers.isStartRoom || (depth0 && depth0.isStartRoom) || alias1).call(depth0,depth0,{"name":"isStartRoom","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.connections : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.objects : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "It is dark.";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "The player is in "
    + ((stack1 = (helpers.validName || (depth0 && depth0.validName) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"validName","hash":{},"data":data})) != null ? stack1 : "")
    + ".";
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing, alias2=container.escapeExpression;

  return alias2((helpers.capitalize || (depth0 && depth0.capitalize) || alias1).call(depth0,(helpers.dirToStr || (depth0 && depth0.dirToStr) || alias1).call(depth0,(depth0 != null ? depth0.startDir : depth0),(depth0 != null ? depth0.startType : depth0),{"name":"dirToStr","hash":{},"data":data}),{"name":"capitalize","hash":{},"data":data}))
    + " of "
    + ((stack1 = (helpers.validName || (depth0 && depth0.validName) || alias1).call(depth0,(depths[1] != null ? depths[1].name : depths[1]),{"name":"validName","hash":{},"data":data})) != null ? stack1 : "")
    + " is "
    + alias2((helpers.dirToStr || (depth0 && depth0.dirToStr) || alias1).call(depth0,(depth0 != null ? depth0.endDir : depth0),(depth0 != null ? depth0.endType : depth0),{"name":"dirToStr","hash":{},"data":data}))
    + " of "
    + ((stack1 = (helpers.validName || (depth0 && depth0.validName) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.room : depth0)) != null ? stack1.name : stack1),{"name":"validName","hash":{},"data":data})) != null ? stack1 : "")
    + ".\n";
},"14":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.inform7Object,depth0,{"name":"inform7Object","hash":{"container":depths[1],"object":depth0},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\""
    + ((stack1 = helpers["if"].call(depth0,((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.title : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(3, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\" "
    + ((stack1 = helpers["if"].call(depth0,((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.author : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.rooms : stack1),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useDepths":true});

templates['inform7Object'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.inform7Object,depth0,{"name":"inform7Object","hash":{"container":depths[1],"object":depth0},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda;

  return "A "
    + ((stack1 = alias1((depth0 != null ? depth0.name : depth0), depth0)) != null ? stack1 : "")
    + " is in "
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.container : depth0)) != null ? stack1.name : stack1), depth0)) != null ? stack1 : "")
    + ".\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.content : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useDepths":true});

templates['quest'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<author>"
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.author : stack1), depth0)) != null ? stack1 : "")
    + "</author>";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<description>"
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.description : stack1), depth0)) != null ? stack1 : "")
    + "</description>";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "\n  <object name=\""
    + ((stack1 = alias1((depth0 != null ? depth0.name : depth0), depth0)) != null ? stack1 : "")
    + "\">\n    <attr name=\"grid_label\">"
    + ((stack1 = alias1((depth0 != null ? depth0.name : depth0), depth0)) != null ? stack1 : "")
    + "</attr>\n    <attr name=\"grid_width\" type=\"int\">"
    + alias3((helpers.gridWidth || (depth0 && depth0.gridWidth) || alias2).call(depth0,(depth0 != null ? depth0.width : depth0),{"name":"gridWidth","hash":{},"data":data}))
    + "</attr>\n    <attr name=\"grid_length\" type=\"int\">"
    + alias3((helpers.gridLength || (depth0 && depth0.gridLength) || alias2).call(depth0,(depth0 != null ? depth0.height : depth0),{"name":"gridLength","hash":{},"data":data}))
    + "</attr>"
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.dark : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <inherit name=\"editor_room\" />  "
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  "
    + ((stack1 = helpers["if"].call(depth0,(helpers.isStartRoom || (depth0 && depth0.isStartRoom) || alias2).call(depth0,depth0,{"name":"isStartRoom","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.connections : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.objects : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n  </object>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "<dark />";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n    <description>"
    + ((stack1 = container.lambda((depth0 != null ? depth0.description : depth0), depth0)) != null ? stack1 : "")
    + "</description>";
},"10":function(container,depth0,helpers,partials,data) {
    return "\n    <object name=\"player\">\n      <inherit name=\"editor_object\" />\n      <inherit name=\"editor_player\" />\n    </object>\n    ";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing, alias2=container.escapeExpression;

  return "\n    <exit alias=\""
    + alias2((helpers.dirToStr || (depth0 && depth0.dirToStr) || alias1).call(depth0,(depth0 != null ? depth0.startDir : depth0),(depth0 != null ? depth0.startType : depth0),{"name":"dirToStr","hash":{},"data":data}))
    + "\" to=\""
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0.room : depth0)) != null ? stack1.name : stack1), depth0)) != null ? stack1 : "")
    + "\">\n      <inherit name=\""
    + alias2((helpers.dirToStr || (depth0 && depth0.dirToStr) || alias1).call(depth0,(depth0 != null ? depth0.startDir : depth0),(depth0 != null ? depth0.startType : depth0),{"name":"dirToStr","hash":{},"data":data}))
    + "direction\" />\n    </exit>\n    ";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = container.invokePartial(partials.questObject,depth0,{"name":"questObject","hash":{"object":depth0},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + " ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!--Saved by Trizbort.io -->\n<asl version=\"550\">\n  <include ref=\"English.aslx\" />\n  <include ref=\"Core.aslx\" />\n  <game name=\""
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.title : stack1), depth0)) != null ? stack1 : "")
    + "\">\n    <gameid>9bb19c30-fec2-492b-b3f3-3a94e624b662</gameid>\n    <version>1.0</version>\n    <firstpublished>2018</firstpublished>"
    + ((stack1 = helpers["if"].call(depth0,((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.author : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <category>Uncategorized</category>"
    + ((stack1 = helpers["if"].call(depth0,((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.description : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n  </game>\n   "
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.rooms : stack1),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</asl>";
},"usePartial":true,"useData":true});

templates['questObject'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.questObject,depth0,{"name":"questObject","hash":{"object":depth0},"data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<object name=\""
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.name : stack1), depth0)) != null ? stack1 : "")
    + "\">\n  <inherit name=\"editor_object\" />\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.content : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</object>\n";
},"usePartial":true,"useData":true});

templates['tads'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "location = "
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || helpers.helperMissing).call(depth0,((stack1 = ((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.startRoom : stack1)) != null ? stack1.name : stack1),{"name":"className","hash":{},"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda;

  return container.escapeExpression((helpers.className || (depth0 && depth0.className) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"className","hash":{},"data":data}))
    + ": "
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.dark : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + " '"
    + ((stack1 = alias1((depth0 != null ? depth0.name : depth0), depth0)) != null ? stack1 : "")
    + "'\n  \""
    + ((stack1 = alias1((depth0 != null ? depth0.description : depth0), depth0)) != null ? stack1 : "")
    + "\"\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.connections : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ";\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.objects : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "DarkRoom";
},"6":function(container,depth0,helpers,partials,data) {
    return "Room";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return "  "
    + container.escapeExpression((helpers.dirToStr || (depth0 && depth0.dirToStr) || alias1).call(depth0,(depth0 != null ? depth0.startDir : depth0),(depth0 != null ? depth0.startType : depth0),{"name":"dirToStr","hash":{},"data":data}))
    + ": "
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.room : depth0)) != null ? stack1.name : stack1),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + " \n";
},"10":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((helpers.buildObject || (depth0 && depth0.buildObject) || helpers.helperMissing).call(depth0,depth0,{"name":"buildObject","hash":{},"data":data}));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda;

  return "#charset \"us-ascii\"\n\n#include <adv3.h>\n#include <en_us.h>\n\nversionInfo: GameID\n  name = '"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.title : stack1), depth0)) != null ? stack1 : "")
    + "'\n  byline = 'by "
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.author : stack1), depth0)) != null ? stack1 : "")
    + "'\n  version = '1.0'\n  desc = '"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.description : stack1), depth0)) != null ? stack1 : "")
    + "'\n\ngameMain: GameMainDef\n  initialPlayerChar = me\n\n+ me: Actor\n  "
    + ((stack1 = helpers["if"].call(depth0,((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.startRoom : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n;\n\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.rooms : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

templates['tadsObject'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda;

  return " "
    + container.escapeExpression((helpers.kindToStr || (depth0 && depth0.kindToStr) || helpers.helperMissing).call(depth0,((stack1 = (depth0 != null ? depth0.obj : depth0)) != null ? stack1.kind : stack1),{"name":"kindToStr","hash":{},"data":data}))
    + " '"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.obj : depth0)) != null ? stack1.name : stack1), depth0)) != null ? stack1 : "")
    + "'\n  \""
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.obj : depth0)) != null ? stack1.description : stack1), depth0)) != null ? stack1 : "")
    + "\"\n;\n\n";
},"useData":true});

templates['textadventurejs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda;

  return "    '"
    + container.escapeExpression((helpers.className || (depth0 && depth0.className) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"className","hash":{},"data":data}))
    + "': {\n      firstVisit: true,\n      displayName: '"
    + ((stack1 = alias1((depth0 != null ? depth0.name : depth0), depth0)) != null ? stack1 : "")
    + "',\n      description: '"
    + ((stack1 = alias1((depth0 != null ? depth0.description : depth0), depth0)) != null ? stack1 : "")
    + "',\n      items: {\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.objects : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      },\n      exits: {\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.connections : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      },\n    },\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, alias2=container.lambda;

  return "          "
    + alias1((helpers.className || (depth0 && depth0.className) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"className","hash":{},"data":data}))
    + ": {\n            displayName: '"
    + alias1(alias2((depth0 != null ? depth0.name : depth0), depth0))
    + "',\n            description: '"
    + alias1(alias2((depth0 != null ? depth0.description : depth0), depth0))
    + "'\n          },\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing, alias2=container.escapeExpression;

  return "          "
    + alias2((helpers.dirToStr || (depth0 && depth0.dirToStr) || alias1).call(depth0,(depth0 != null ? depth0.startDir : depth0),(depth0 != null ? depth0.startType : depth0),{"name":"dirToStr","hash":{},"data":data}))
    + ": {\n            displayName: '"
    + alias2((helpers.capitalizeDirToStr || (depth0 && depth0.capitalizeDirToStr) || alias1).call(depth0,(depth0 != null ? depth0.startDir : depth0),{"name":"capitalizeDirToStr","hash":{},"data":data}))
    + "',\n            destination: '"
    + alias2((helpers.className || (depth0 && depth0.className) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.room : depth0)) != null ? stack1.name : stack1),{"name":"className","hash":{},"data":data}))
    + "'\n          },\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "// === Game Data ===\nvar gameData = {\n  commandCounter : 0,\n  gameOver : false,\n  introText : 'Welcome to the game!',\n  outroText : 'Thanks For playing!',\n  player : {\n    currentLocation : '"
    + container.escapeExpression((helpers.className || (depth0 && depth0.className) || helpers.helperMissing).call(depth0,((stack1 = ((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.startRoom : stack1)) != null ? stack1.name : stack1),{"name":"className","hash":{},"data":data}))
    + "',\n    inventory : {}\n  },\n  map : {\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.rooms : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  }\n};\n\n// === Game Actions ===\nvar gameActions = {\n}\n\n// === Necessary Exports ===\nmodule.exports.gameData = gameData;\nmodule.exports.gameActions = gameActions;\n\n";
},"useData":true});

templates['yaml'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  description: > \n"
    + ((stack1 = container.invokePartial(partials.DescriptionPartial,depth0,{"name":"DescriptionPartial","hash":{"content":((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.description : stack1)},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.escapeExpression;

  return "  "
    + alias1((helpers.className || (depth0 && depth0.className) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"className","hash":{},"data":data}))
    + ":\n    name: "
    + alias1(container.lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "\n"
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    "
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.dark : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(depth0,((stack1 = (depth0 != null ? depth0.connections : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0,((stack1 = (depth0 != null ? depth0.objects : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    description: >\n"
    + ((stack1 = container.invokePartial(partials.DescriptionPartial,depth0,{"name":"DescriptionPartial","hash":{"content":(depth0 != null ? depth0.description : depth0)},"data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "dark: true";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    exits:\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.connections : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return "      "
    + container.escapeExpression((helpers.dirToStr || (depth0 && depth0.dirToStr) || alias1).call(depth0,(depth0 != null ? depth0.startDir : depth0),(depth0 != null ? depth0.startType : depth0),{"name":"dirToStr","hash":{},"data":data}))
    + ": "
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.room : depth0)) != null ? stack1.name : stack1),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + " \n";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "    objects:\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.objects : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.yamlObject,depth0,{"name":"yamlObject","hash":{"container":depths[1],"object":depth0},"data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda;

  return "game:\n  name: "
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.title : stack1), depth0)) != null ? stack1 : "")
    + "\n  author: "
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.author : stack1), depth0)) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(depth0,((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.description : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "rooms: \n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.rooms : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useDepths":true});

templates['yamlDescription'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper)))
    + "\n";
},"useData":true});

templates['yamlObject'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  description: > \n"
    + ((stack1 = container.invokePartial(partials.DescriptionPartial,depth0,{"name":"DescriptionPartial","hash":{"content":(depth0 != null ? depth0.description : depth0)},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "  objects:\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.content : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.yamlObject,depth0,{"name":"yamlObject","hash":{"container":depths[1],"object":depth0},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.className || (depth0 && depth0.className) || alias1).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + ":\n  kind: "
    + ((stack1 = (helpers.kindToStr || (depth0 && depth0.kindToStr) || alias1).call(depth0,(depth0 != null ? depth0.kind : depth0),{"name":"kindToStr","hash":{},"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0,((stack1 = (depth0 != null ? depth0.content : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useDepths":true});

templates['zil'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.escapeExpression;

  return "<ROOM "
    + alias1((helpers.zilName || (depth0 && depth0.zilName) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"zilName","hash":{},"data":data}))
    + "\n  (LOC ROOMS)\n  (DESC \""
    + alias1(container.lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "\")\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.connections : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  (FLAGS "
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.dark : depth0),{"name":"unless","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ")\n  >\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.objects : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing, alias2=container.escapeExpression;

  return "  ("
    + alias2((helpers.upperDirToStr || (depth0 && depth0.upperDirToStr) || alias1).call(depth0,(depth0 != null ? depth0.startDir : depth0),(depth0 != null ? depth0.startType : depth0),{"name":"upperDirToStr","hash":{},"data":data}))
    + " TO "
    + alias2((helpers.zilName || (depth0 && depth0.zilName) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.room : depth0)) != null ? stack1.name : stack1),{"name":"zilName","hash":{},"data":data}))
    + ")\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "ONBIT";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.zilObject,depth0,{"name":"zilObject","hash":{"container":depths[1],"object":depth0},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.rooms : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useDepths":true});

templates['zilObject'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "TAKEBIT";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.zilObject,depth0,{"name":"zilObject","hash":{"container":depths[1],"object":depth0},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing, alias2=container.escapeExpression, alias3=container.lambda;

  return "<OBJECT "
    + alias2((helpers.zilName || (depth0 && depth0.zilName) || alias1).call(depth0,(depth0 != null ? depth0.name : depth0),{"name":"zilName","hash":{},"data":data}))
    + "\n  (LOC "
    + alias2((helpers.zilName || (depth0 && depth0.zilName) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.container : depth0)) != null ? stack1.name : stack1),{"name":"zilName","hash":{},"data":data}))
    + ")\n  (DESC \""
    + alias2(alias3((depth0 != null ? depth0.name : depth0), depth0))
    + "\")\n  (FDESC \""
    + alias2(alias3((depth0 != null ? depth0.description : depth0), depth0))
    + "\")\n  (LDESC \""
    + alias2(alias3((depth0 != null ? depth0.description : depth0), depth0))
    + "\")\n  (FLAGS "
    + ((stack1 = helpers["if"].call(depth0,(helpers.isItem || (depth0 && depth0.isItem) || alias1).call(depth0,(depth0 != null ? depth0.kind : depth0),{"name":"isItem","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ")\n>\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.objects : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"usePartial":true,"useData":true,"useDepths":true});

templates['idCheck'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"form-check\">\n  <label><input type=\"checkbox\" value=\"\">"
    + container.escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n</div>";
},"useData":true});

templates['idColorPicker'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "      <id-popup class=\"alpha\"></id-popup>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"color-picker\">\n  <div>\n    <div class=\"hsl\">\n      <canvas></canvas>\n      <div class=\"selection\">\n        <div class=\"current-color\"></div>\n        <div class=\"hover-color\"></div>\n      </div>\n    </div>\n    <canvas></canvas>\n  </div>\n  <p>Recent colors</p>\n  <div class=\"recent\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.recentcolors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n  <p>Standard colors</p>\n  <div class=\"standard\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.standardcolors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n</div>";
},"useData":true});

templates['idConnectorType'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=container.escapeExpression;

  return "<id-radio class=\"js-default\" data-label=\"Default\" data-name=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\"></id-radio> \n<id-radio class=\"js-in\" data-label=\"In\" data-name=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\"></id-radio>\n<id-radio class=\"js-out\" data-label=\"Out\" data-name=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\"></id-radio>\n<id-radio class=\"js-up\" data-label=\"Up\" data-name=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\"></id-radio>\n<id-radio class=\"js-down\" data-label=\"Down\" data-name=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\"></id-radio>";
},"useData":true});

templates['idInput'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"form-group\">\n  <label>"
    + container.escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "\n    <input type=\"text\">\n    <div class=\"input-line\"></div>\n  </label>\n</div>";
},"useData":true});

templates['idLineStyle'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=container.escapeExpression;

  return "<label>"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n<div style=\"display: flex; flex-wrap: no-wrap\">\n  <id-popup class=\"js-linestyle-solid\">\n    <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#line-solid\"></use></svg>\n  </id-popup>\n  <id-popup class=\"js-linestyle-dash\">\n    <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#line-dash\"></use></svg>\n  </id-popup>\n  <id-popup class=\"js-linestyle-dashdot\">\n    <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#line-dashdot\"></use></svg>\n  </id-popup>\n  <id-popup class=\"js-linestyle-dashdotdot\">\n    <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#line-dashdotdot\"></use></svg>\n  </id-popup>\n  <id-popup class=\"js-linestyle-dot\">\n    <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#line-dot\"></use></svg>\n  </id-popup>\n  <id-popup class=\"js-linestyle-none\" style=\"display:"
    + alias3(((helper = (helper = helpers.noneDisplay || (depth0 != null ? depth0.noneDisplay : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"noneDisplay","hash":{},"data":data}) : helper)))
    + "\"></id-popup>\n</div>";
},"useData":true});

templates['idObjectEditor'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div style=\"display: flex; flex-direction: column; border: solid 1px #999; border-radius: 3px; margin-top: 8px\">\n  <div style=\"display: flex; flex-direction: row\">\n    <div class=\"handle\" style=\"background: #eee; width: 15px; border-top-left-radius: 3px; border-bottom-left-radius: 3px; border-right: solid 1px #999\">\n    </div>\n    <div style=\"flex: 1; padding: 8px 8px 6px 8px\">\n      <div style=\"display: flex; align-items: flex-start\">\n        <div style=\"flex:1\">\n          <id-input class=\"js-name\" data-label=\"Name\"></id-input>\n          <id-input class=\"js-description\" data-label=\"Description\"></id-input>\n        </div>\n        <a href=\"#\" title=\"Delete object\">\n          <svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#trash\"></use></svg> \n        </a>\n      </div>\n      <div style=\"display: flex\">\n        <id-popup class=\"js-actor\" title=\"Actor\">\n          <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#actor\"></use></svg>\n        </id-popup>\n        <id-popup class=\"js-item\" title=\"Item\">\n          <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#item\"></use></svg>\n        </id-popup>\n        <id-popup class=\"js-scenery\" title=\"Scenery\">\n          <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#scenery\"></use></svg>\n        </id-popup> \n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"drop-child\"></div>\n<div class=\"drop\"></div>\n\n";
},"useData":true});

templates['idPopup'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"popup-button\">\n</div>";
},"useData":true});

templates['idQuickColor'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "    <id-popup class=\"alpha\"></id-popup>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div style=\"display: flex; flex-wrap: wrap\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.colors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

templates['idRadio'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=container.escapeExpression;

  return "<div class=\"form-check\">\n  <label><input type=\"radio\" name=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n</div>";
},"useData":true});

templates['idRange'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=container.escapeExpression;

  return "<div class=\"form-group\">\n  <label>"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n  <div style=\"display: flex; flex-direction: row; flex-wrapping: nowrap; align-items: center\">\n    <input type=\"range\" min=\""
    + alias3(((helper = (helper = helpers.min || (depth0 != null ? depth0.min : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"min","hash":{},"data":data}) : helper)))
    + "\" max=\""
    + alias3(((helper = (helper = helpers.max || (depth0 != null ? depth0.max : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"max","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"range-label\" style=\"width:40px; text-align:right\">0</div>\n  </div>\n</div>";
},"useData":true});

templates['idShape'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<label>"
    + container.escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n<div style=\"display: flex; flex-wrap: no-wrap\">\n  <id-popup class=\"js-rectangle\">\n    <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#rectangle\"></use></svg>\n  </id-popup>\n  <id-popup class=\"js-ellipse\">\n    <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#ellipse\"></use></svg>\n  </id-popup>\n  <id-popup class=\"js-octagon\">\n    <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#octagon\"></use></svg>\n  </id-popup>\n</div>";
},"useData":true});

templates['idTextarea'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"form-group\" style=\"margin-top:25px\">\n  <label>"
    + container.escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "\n    <textarea style=\"height:400px\"></textarea>\n    <div class=\"input-line\"></div>\n  </label>\n</div>";
},"useData":true});

templates['idToast'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<span><svg><use xlink:href=\"dist/icons.svg#times\"></use></svg></span>\n<h3></h3>\n<p></p>\n\n";
},"useData":true});

templates['blockPanel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.closePanel,depth0,{"name":"closePanel","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n<h2>Block</h2>\n\n<div class=\"tabs\">\n  <div class=\"tab selected\" data-body=\"tab-block-info\">Info</div>\n  <div class=\"tab\" data-body=\"tab-block-style\">Style</div>\n</div>\n\n<div class=\"tab-body\" id=\"tab-block-info\">\n  <id-shape class=\"js-shape\" data-label=\"Block shape\"></id-shape>  \n  <id-range class=\"js-rounding\" data-min=\"0\" data-max=\"100\" data-label=\"Rectangle rounding\"></id-range>\n</div>\n\n<div class=\"tab-body\" id=\"tab-block-style\">\n  <id-linestyle class=\"js-linestyle\" data-none=\"true\" data-label=\"Border style\"></id-linestyle>\n  <id-range class=\"js-linewidth\" data-min=\"1\" data-max=\"10\"></id-range>  \n  <label>Colors</label>\n  <div style=\"display: flex\">\n    <div style=\"display: flex; flex-direction: column; flex-wrap: wrap\">\n      <id-popup title=\"Block fill\" class=\"colortype selected\" data-type=\"fill\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#block-fill\"></use></svg>\n      </id-popup>\n      <id-popup title=\"Block border\" class=\"colortype\" data-type=\"border\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#block-border\"></use></svg>\n      </id-popup>\n    </div>\n    <id-colorpicker class=\"js-color\"></id-colorpicker>\n  </div>\n</div>";
},"usePartial":true,"useData":true});

templates['closePanel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"panel-close\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#times\"></use></svg>\n</div>";
},"useData":true});

templates['connectorPanel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.closePanel,depth0,{"name":"closePanel","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n<h2>Connector</h2> \n\n<div class=\"tabs\">\n  <div class=\"tab selected\" data-body=\"tab-connector-info\">Info</div>\n  <div class=\"tab\" data-body=\"tab-connector-style\">Style</div>\n</div>\n\n<div class=\"tab-body\" id=\"tab-connector-info\">\n  <id-input class=\"js-name\" data-label=\"Connector name\"></id-input>\n  <id-check class=\"js-curve\" data-label=\"Curve\"></id-check>\n  <id-check class=\"js-oneway\" data-label=\"One way\"></id-check>\n  <button class=\"btn-primary js-reverse\">Reverse</button>\n\n  <div style=\"display: flex; margin-top: 20px\">\n    <div style=\"flex: 1; display: flex; flex-direction: column; padding-right: 10px\">\n      <label>Start type</label>\n      <id-connector-type class=\"js-starttype\"></id-connector-type>\n      <id-input style=\"margin-top:20px\" class=\"js-startlabel\" data-label=\"Start label\"></id-input>\n    </div>\n    <div style=\"flex: 1; display: flex; flex-direction: column; padding-left: 10px\">\n      <label>End type</label>\n      <id-connector-type class=\"js-endtype\"></id-connector-type>\n      <id-input style=\"margin-top:20px\" class=\"js-endlabel\" data-label=\"End label\"></id-input>\n    </div>\n  </div>\n</div>\n\n<div class=\"tab-body\" id=\"tab-connector-style\">\n  <id-linestyle class=\"js-linestyle\" data-label=\"Line style\"></id-linestyle>\n  <id-range class=\"js-linewidth\" data-min=\"1\" data-max=\"10\"></id-range>\n  <label>Line color</label>  \n  <id-colorpicker class=\"js-color\"></id-colorpicker>\n</div>";
},"usePartial":true,"useData":true});

templates['mapPanel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.closePanel,depth0,{"name":"closePanel","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n<h2>Map settings</h2>\n\n<div class=\"tabs\"> \n  <div class=\"tab selected\" data-body=\"tab-map-info\">Info</div>\n</div> \n\n<div class=\"tab-body\" id=\"tab-map-info\">\n  <id-input class=\"js-title\" data-label=\"Map title\"></id-input>\n  <id-input class=\"js-author\" data-label=\"Map author\"></id-input>\n  <id-textarea class=\"js-description\" data-label=\"Description\"></id-textarea>\n</div>\n";
},"usePartial":true,"useData":true});

templates['menuPanel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input id=\"inputLoad\" type=\"file\" style=\"display:none\" accept=\".json\">\n<input id=\"inputImport\" type=\"file\" style=\"display:none\" accept=\".trizbort\">\n\n<div class=\"menugroup\">\n  <a href=\"#\" id=\"group-file\">File</a>\n  <div>\n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-new\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#map\"></use></svg> New map</a>\n    </div>\n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-load\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#open\"></use></svg> Load map</a>\n    </div>    \n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-import\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#open\"></use></svg> Import Trizbort map</a>\n    </div>    \n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-save\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#save\"></use></svg> Save map</a>\n    </div>\n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-image\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#scenery\"></use></svg> Export as image</a>\n    </div>\n  </div>\n</div>\n\n<div class=\"menugroup\">\n  <a href=\"#\" id=\"group-settings\">Settings</a>\n  <div style=\"display:none\">\n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-map\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#settings\"></use></svg> Map settings</a>\n    </div>\n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-render\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#paintbrush\"></use></svg> Render settings</a>\n    </div>\n  </div>\n</div>\n\n<div class=\"menugroup\">\n  <a href=\"#\" id=\"group-export\">Export</a>\n  <div style=\"display:none\">\n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-export-tads\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#code\"></use></svg> TADS</a> \n    </div>\n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-export-inform7\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#code\"></use></svg> Inform 7</a> \n    </div>  \n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-export-alan2\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#code\"></use></svg> Alan 2</a> \n    </div>  \n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-export-alan3\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#code\"></use></svg> Alan 3</a> \n    </div>  \n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-export-quest\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#code\"></use></svg> Quest</a> \n    </div>  \n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-export-textadventurejs\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#code\"></use></svg> TextAdventure.js</a> \n    </div>    \n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-export-yaml\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#code\"></use></svg> YAML</a> \n    </div>       \n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-export-zil\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#code\"></use></svg> ZIL</a> \n    </div>    \n  </div>\n</div>\n\n<div class=\"menugroup\">\n  <a href=\"#\" id=\"group-help\">Help</a>\n  <div style=\"display:none\">\n    <div class=\"menuitem\">\n      <a href=\"#\" id=\"menu-help\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#help\"></use></svg> Keyboard help</a>\n    </div>\n  </div>\n</div>";
},"useData":true});

templates['notePanel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.closePanel,depth0,{"name":"closePanel","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n<h2>Note</h2>\n\n<div class=\"tabs\">\n  <div class=\"tab selected\" data-body=\"tab-note-info\">Info</div>\n  <div class=\"tab\" data-body=\"tab-note-style\">Style</div>\n</div>\n\n<div class=\"tab-body\" id=\"tab-note-info\">\n  <id-shape class=\"js-shape\" data-label=\"Note shape\"></id-shape>   \n  <id-range class=\"js-rounding\" data-min=\"0\" data-max=\"100\" data-label=\"Rectangle rounding\"></id-range>\n  <id-textarea class=\"js-text\" data-label=\"Note text\"></id-textarea>\n</div>\n\n<div class=\"tab-body\" id=\"tab-note-style\">\n  <id-linestyle class=\"js-linestyle\" data-none=\"true\" data-label=\"Border style\"></id-linestyle>\n  <id-range class=\"js-linewidth\" data-min=\"1\" data-max=\"10\"></id-range>  \n  <label>Colors</label>\n  <div style=\"display: flex\">\n    <div style=\"display: flex; flex-direction: column; flex-wrap: wrap\">\n      <id-popup title=\"Note fill\" class=\"colortype selected\" data-type=\"fill\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#note-fill\"></use></svg>\n      </id-popup>\n      <id-popup title=\"Note border\" class=\"colortype\" data-type=\"border\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#note-border\"></use></svg>\n      </id-popup>\n      <id-popup title=\"Note text\" class=\"colortype\" data-type=\"text\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#note-text\"></use></svg>\n      </id-popup>\n    </div>\n    <id-colorpicker class=\"js-color\"></id-colorpicker>\n  </div>\n</div>";
},"usePartial":true,"useData":true});

templates['renderPanel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.closePanel,depth0,{"name":"closePanel","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n<h2>Render settings</h2>\n\n<div class=\"tabs\"> \n  <div class=\"tab selected\" data-body=\"tab-settings-basic\">Basic</div>\n  <div class=\"tab\" data-body=\"tab-settings-rooms\">Room</div>\n  <div class=\"tab\" data-body=\"tab-settings-connectors\">Line</div>\n  <div class=\"tab\" data-body=\"tab-settings-notes\">Note</div>\n  <div class=\"tab\" data-body=\"tab-settings-blocks\">Block</div>\n</div>\n\n<div class=\"tab-body\" id=\"tab-settings-basic\">\n  <id-check class=\"js-grid-visible\" data-label=\"Visible\"></id-check>\n  <id-check class=\"js-grid-origin\" data-label=\"Show origin\"></id-check>\n  <id-check class=\"js-grid-snap\" data-label=\"Snap to grid\"></id-check>\n  <id-range class=\"js-grid-size\" data-min=\"16\" data-max=\"128\" data-label=\"Grid size\"></id-range>\n\n  <label>Map colors</label>\n  <div style=\"display: flex\">\n    <div style=\"display: flex; flex-direction: column; flex-wrap: wrap\">\n      <id-popup title=\"Map background\" class=\"map-colortype selected\" data-type=\"background\">\n      </id-popup>\n      <id-popup title=\"Grid\" class=\"map-colortype\" data-type=\"grid\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#grid\"></use></svg>\n      </id-popup>\n    </div>\n    <id-colorpicker class=\"js-map-color\"></id-colorpicker>\n  </div>  \n\n  <label>Quick themes</label>\n  <div class=\"menuitem\">\n    <a href=\"#\" class=\"js-theme-default\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#paintbrush\"></use></svg> Default</a>\n  </div>  \n  <div class=\"menuitem\">\n    <a href=\"#\" class=\"js-theme-obsidian\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#paintbrush\"></use></svg> Obsidian</a>\n    <a href=\"#\" class=\"js-theme-hand-drawn\"><svg class=\"icon small\"><use xlink:href=\"dist/icons.svg#paintbrush\"></use></svg> Hand Drawn</a>\n  </div>\n</div>\n\n<div class=\"tab-body\" id=\"tab-settings-rooms\">\n  <id-range class='js-room-width' data-min=\"64\" data-max=\"256\" data-label=\"Default room width\"></id-range>\n  <id-range class='js-room-height' data-min=\"64\" data-max=\"256\" data-label=\"Default room height\"></id-range>\n  <id-range class='js-room-darkness-size' data-min=\"50\" data-max=\"100\" data-label=\"Darkness stripe size\"></id-range>\n  <id-shape class=\"js-room-shape\" data-label=\"Default room shape\"></id-shape>   \n  <id-range class='js-room-rounding' data-min=\"0\" data-max=\"30\" data-label=\"Default room rounding\"></id-range>\n  <id-linestyle class=\"js-room-line\" data-none=\"true\" data-label=\"Default room border style\"></id-linestyle>\n  <id-range class='js-room-linewidth' data-min=\"1\" data-max=\"10\"></id-range>\n\n  <label>Default room colors</label>\n  <div style=\"display: flex\">\n    <div style=\"display: flex; flex-direction: column; flex-wrap: wrap\">\n      <id-popup title=\"Room fill\" class=\"room-colortype selected\" data-type=\"fill\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#room-fill\"></use></svg>\n      </id-popup>\n      <id-popup title=\"Room border\" class=\"room-colortype\" data-type=\"border\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#room-border\"></use></svg>\n      </id-popup>\n      <id-popup title=\"Room name\" class=\"room-colortype\" data-type=\"name\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#room-name\"></use></svg>\n      </id-popup>\n      <id-popup title=\"Room subtitle\" class=\"room-colortype\" data-type=\"subtitle\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#room-subtitle\"></use></svg>\n      </id-popup>\n      <id-popup title=\"Darkness stripe\" class=\"room-colortype\" data-type=\"dark\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#room-darkness\"></use></svg>\n      </id-popup>\n      <id-popup title=\"Start room\" class=\"room-colortype\" data-type=\"start\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#room-start\"></use></svg>\n      </id-popup>\n      <id-popup title=\"End room\" class=\"room-colortype\" data-type=\"end\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#room-end\"></use></svg>\n      </id-popup>                  \n    </div>\n    <id-colorpicker class=\"js-room-color\"></id-colorpicker>\n  </div>\n</div>\n\n<div class=\"tab-body\" id=\"tab-settings-connectors\">\n  <id-linestyle class=\"js-connector-line\" data-label=\"Default connector line style\"></id-linestyle>\n  <id-range class='js-connector-linewidth' data-min=\"1\" data-max=\"10\"></id-range>  \n  <id-range class='js-connector-stalk' data-min=\"16\" data-max=\"64\" data-label=\"Default connector stalk length\"></id-range>    \n  <id-range class='js-connector-label-distance' data-min=\"10\" data-max=\"20\" data-label=\"Label distance\"></id-range>    \n  <id-range class='js-connector-arrow-size' data-min=\"3\" data-max=\"10\" data-label=\"One-way arrow size\"></id-range>      \n  <id-check class=\"js-connector-curve\" data-label=\"Use curves\"></id-check>\n  <id-range class='js-connector-curve-strength' data-min=\"1\" data-max=\"8\" data-label=\"Default connector curve strength\"></id-range>      \n\n  <label>Default connector color</label>\n  <id-colorpicker class=\"js-connector-color\"></id-colorpicker>\n</div>\n\n<div class=\"tab-body\" id=\"tab-settings-notes\">\n  <id-range class='js-note-width' data-min=\"64\" data-max=\"256\" data-label=\"Default note width\"></id-range>\n  <id-range class='js-note-height' data-min=\"64\" data-max=\"256\" data-label=\"Default note height\"></id-range>\n  <id-shape class=\"js-note-shape\" data-label=\"Default note shape\"></id-shape>   \n  <id-range class='js-note-rounding' data-min=\"0\" data-max=\"30\" data-label=\"Default note rounding\"></id-range>\n  <id-linestyle class=\"js-note-line\" data-none=\"true\" data-label=\"Default note border style\"></id-linestyle>\n  <id-range class='js-note-linewidth' data-min=\"1\" data-max=\"10\"></id-range>\n\n  <label>Default note colors</label>\n  <div style=\"display: flex\">\n    <div style=\"display: flex; flex-direction: column; flex-wrap: wrap\">\n      <id-popup title=\"Note fill\" class=\"note-colortype selected\" data-type=\"fill\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#note-fill\"></use></svg>\n      </id-popup>\n      <id-popup title=\"Note border\" class=\"note-colortype\" data-type=\"border\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#note-border\"></use></svg>\n      </id-popup>\n      <id-popup title=\"Note text\" class=\"note-colortype\" data-type=\"text\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#note-text\"></use></svg>\n      </id-popup>\n    </div>\n    <id-colorpicker class=\"js-note-color\"></id-colorpicker>  \n  </div>\n</div>\n\n<div class=\"tab-body\" id=\"tab-settings-blocks\">\n  <id-range class='js-block-width' data-min=\"64\" data-max=\"256\" data-label=\"Default block width\"></id-range>\n  <id-range class='js-block-height' data-min=\"64\" data-max=\"256\" data-label=\"Default block height\"></id-range>\n  <id-shape class=\"js-block-shape\" data-label=\"Default block shape\"></id-shape>    \n  <id-range class='js-block-rounding' data-min=\"0\" data-max=\"30\" data-label=\"Default block rounding\"></id-range>\n  <id-linestyle class=\"js-block-line\" data-none=\"true\" data-label=\"Default block border style\"></id-linestyle>\n  <id-range class='js-block-linewidth' data-min=\"1\" data-max=\"10\"></id-range>\n\n  <label>Default block colors</label>\n  <div style=\"display: flex\">\n    <div style=\"display: flex; flex-direction: column; flex-wrap: wrap\">\n      <id-popup title=\"Block fill\" class=\"block-colortype selected\" data-type=\"fill\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#block-fill\"></use></svg>\n      </id-popup>\n      <id-popup title=\"Block border\" class=\"block-colortype\" data-type=\"border\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#block-border\"></use></svg>\n      </id-popup>\n    </div>\n    <id-colorpicker class=\"js-block-color\"></id-colorpicker>  \n  </div>\n</div>";
},"usePartial":true,"useData":true});

templates['roomPanel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.closePanel,depth0,{"name":"closePanel","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n<h2>Room</h2>\n\n<div class=\"tabs\"> \n  <div class=\"tab selected\" data-body=\"tab-room-info\">Info</div>\n  <div class=\"tab\" data-body=\"tab-room-objects\">Objects</div>\n  <div class=\"tab\" data-body=\"tab-room-style\">Style</div>\n</div>\n\n<div class=\"tab-body\" id=\"tab-room-info\">\n  <id-input class=\"js-name\" data-label=\"Room name\"></id-input>\n  <in-input class=\"js-subtitle\" data-label=\"Room subtitle\"></in-input>\n  <id-check class=\"js-dark\" data-label=\"Dark\"></id-check>\n  <id-check class=\"js-startroom\" data-label=\"Start room\"></id-check>\n  <id-check class=\"js-endroom\" data-label=\"End room\"></id-check>\n  <id-shape class=\"js-shape\" data-label=\"Room shape\"></id-shape>\n  <id-range class=\"js-rounding\" data-min=\"0\" data-max=\"100\" data-label=\"Rectangle rounding\"></id-range>\n  <id-textarea class=\"js-description\" data-label=\"Room description\"></id-textarea>\n</div>\n\n<div class=\"tab-body\" id=\"tab-room-objects\">\n  <div class=\"js-object-list\"></div> \n  <div style=\"display: flex; justify-content: flex-end; margin-top: 10px\">\n    <button class=\"btn btn-primary js-add-object\">Add object</button>\n  </div>\n</div>\n\n<div class=\"tab-body\" id=\"tab-room-style\">\n  <id-linestyle class=\"js-linestyle\" data-none=\"true\" data-label=\"Border style\"></id-linestyle>\n  <id-range class=\"js-linewidth\" data-min=\"1\" data-max=\"10\"></id-range>\n  <label>Colors</label>\n  <div style=\"display: flex\">\n    <div style=\"display: flex; flex-direction: column; flex-wrap: wrap\">\n      <id-popup title=\"Room fill\" class=\"colortype selected\" data-type=\"fill\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#room-fill\"></use></svg>\n      </id-popup>\n      <id-popup title=\"Room border\" class=\"colortype\" data-type=\"border\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#room-border\"></use></svg>\n      </id-popup>\n      <id-popup title=\"Room name\" class=\"colortype\" data-type=\"name\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#room-name\"></use></svg>\n      </id-popup>\n      <id-popup title=\"Room subtitle\" class=\"colortype\" data-type=\"subtitle\">\n        <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#room-subtitle\"></use></svg>\n      </id-popup>\n    </div>\n    <id-colorpicker class=\"js-color\"></id-colorpicker>\n  </div>\n</div>\n";
},"usePartial":true,"useData":true});

templates['toolPanel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<id-popup title=\"Cursor\" class=\"tool-none\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#arrow\"></use></svg>\n</id-popup>\n<id-popup title=\"Add room (R)\" class=\"tool-room\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#room\"></use></svg>\n</id-popup>\n<id-popup title=\"Add note (N)\" class=\"tool-note\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#note\"></use></svg>\n</id-popup>\n<id-popup title=\"Add block (B)\" class=\"tool-block\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#block\"></use></svg>\n</id-popup>";
},"useData":true});

templates['blockPopup'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<id-popup class=\"js-fill\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#paintbrush\"></use></svg>\n  <div class=\"popup-overlay\" style=\"width:168px\">\n    <id-quick-color class=\"js-color\"></id-quick-color> \n  </div>      \n</id-popup>\n<id-popup class=\"js-line\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#line-solid\"></use></svg>\n  <div class=\"popup-overlay\">\n    <id-linestyle class=\"js-linestyle\" data-none=\"true\"></id-linestyle>\n    <id-range class=\"js-linewidth\" data-min=\"1\" data-max=\"10\"></id-range>\n  </div>      \n</id-popup>\n<id-popup class=\"js-position\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#position\"></use></svg>\n  <div class=\"popup-overlay\" style=\"width: 150px; padding-bottom: 8px\">\n    <div class=\"menuitem\"><a href=\"#\" class=\"js-front\">Bring to Front</a></div>\n    <div class=\"menuitem\"><a href=\"#\" class=\"js-forward\">Bring Forward</a></div>\n    <div class=\"menuitem\"><a href=\"#\" class=\"js-backward\">Send Backward</a></div>\n    <div class=\"menuitem\"><a href=\"#\" class=\"js-back\">Send to Back</a></div>\n  </div>  \n</id-popup>\n<id-popup class=\"js-delete\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#trash\"></use></svg>\n</id-popup>\n<id-popup class=\"js-more\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#ellipsis-h\"></use></svg>\n</id-popup>";
},"useData":true});

templates['connectorPopup'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<id-popup class=\"js-fill\" title=\"Connector color\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#paintbrush\"></use></svg>\n  <div class=\"popup-overlay\" style=\"width:168px\">\n    <id-quick-color class=\"js-color\"></id-quick-color>\n  </div>     \n</id-popup>\n<id-popup class=\"js-line\" title=\"Connector line style\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#line-solid\"></use></svg>\n  <div class=\"popup-overlay\">\n    <id-linestyle class=\"js-linestyle\"></id-linestyle>\n    <id-range class=\"js-linewidth\" data-min=\"1\" data-max=\"10\"></id-range>\n  </div>      \n</id-popup>\n<id-popup class=\"js-basic\" title=\"Connector details\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#font\"></use></svg>\n  <div class=\"popup-overlay\" style=\"width:168px\">\n    <id-input class=\"js-name\" data-label=\"Name\"></id-input>\n  </div>\n</id-popup>\n<id-popup class=\"js-delete\" title=\"Delete connector\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#trash\"></use></svg>\n</id-popup>\n<id-popup class=\"js-more\" title=\"More connector details\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#ellipsis-h\"></use></svg>\n</id-popup>";
},"useData":true});

templates['notePopup'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<id-popup class=\"js-basic\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#font\"></use></svg>\n  <div class=\"popup-overlay\" style=\"width:168px\">\n    <id-textarea class=\"js-text\" data-label=\"Text\"></id-textarea>\n  </div>\n</id-popup>    \n<id-popup class=\"js-fill\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#paintbrush\"></use></svg>\n  <div class=\"popup-overlay\" style=\"width:168px\">\n    <id-quick-color class=\"js-color\"></id-quick-color>\n  </div>      \n</id-popup>\n<id-popup class=\"js-line\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#line-solid\"></use></svg>\n  <div class=\"popup-overlay\">\n    <id-linestyle class=\"js-linestyle\" data-none=\"true\"></id-linestyle>\n    <id-range class=\"js-linewidth\" data-min=\"1\" data-max=\"10\"></id-range>\n  </div>      \n</id-popup>\n<id-popup class=\"js-position\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#position\"></use></svg>\n  <div class=\"popup-overlay\" style=\"width: 150px; padding-bottom: 8px\">\n    <div class=\"menuitem\"><a href=\"#\" class=\"js-front\">Bring to Front</a></div>\n    <div class=\"menuitem\"><a href=\"#\" class=\"js-forward\">Bring Forward</a></div>\n    <div class=\"menuitem\"><a href=\"#\" class=\"js-backward\">Send Backward</a></div>\n    <div class=\"menuitem\"><a href=\"#\" class=\"js-back\">Send to Back</a></div>\n  </div>  \n</id-popup>\n<id-popup class=\"js-delete\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#trash\"></use></svg>\n</id-popup>\n<id-popup class=\"js-more\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#ellipsis-h\"></use></svg>\n</id-popup>";
},"useData":true});

templates['roomPopup'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<id-popup class=\"js-basic\" title=\"Room details\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#font\"></use></svg>\n  <div class=\"popup-overlay\" style=\"width:168px\">\n    <id-input class=\"js-name\" data-label=\"Name\"></id-input>\n    <id-input class=\"js-subtitle\" data-label=\"Subtitle\"></id-input>\n  </div>\n</id-popup>    \n<id-popup class=\"js-fill\" title=\"Fill color\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#paintbrush\"></use></svg>\n  <div class=\"popup-overlay\" style=\"width:168px\">\n    <id-quick-color class=\"js-color\"></id-quick-color>\n  </div>      \n</id-popup>\n<id-popup class=\"js-border\" title=\"Border style\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#line-solid\"></use></svg>\n  <div class=\"popup-overlay\">\n    <id-linestyle class=\"js-linestyle\" data-none=\"true\"></id-linestyle>\n    <id-range class=\"js-linewidth\" data-min=\"1\" data-max=\"10\"></id-range>\n  </div>      \n</id-popup>\n<id-popup class=\"js-position\" title=\"Room position\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#position\"></use></svg>\n  <div class=\"popup-overlay\" style=\"width: 150px; padding-bottom: 8px\">\n    <div class=\"menuitem\"><a href=\"#\" class=\"js-front\">Bring to Front</a></div>\n    <div class=\"menuitem\"><a href=\"#\" class=\"js-forward\">Bring Forward</a></div>\n    <div class=\"menuitem\"><a href=\"#\" class=\"js-backward\">Send Backward</a></div>\n    <div class=\"menuitem\"><a href=\"#\" class=\"js-back\">Send to Back</a></div>\n  </div>  \n</id-popup>\n<id-popup class=\"js-delete\"  title=\"Delete room\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#trash\"></use></svg>\n</id-popup>\n<id-popup class=\"js-more\" title=\"More details\">\n  <svg class=\"icon\"><use xlink:href=\"dist/icons.svg#ellipsis-h\"></use></svg>\n</id-popup>";
},"useData":true});
}());