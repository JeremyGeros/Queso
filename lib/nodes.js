var Context = require('./context').Context;

function StyleSheet(rules) {
  this.rules = rules;
}
exports.StyleSheet = StyleSheet;

StyleSheet.prototype.toCSS = function(format) {
  var context = new Context(undefined, undefined, format);
  var rules = this.rules.map(function(rule) { return rule.toCSS(context); }).
                  filter(function(value) { return typeof value !== 'undefined' })
  
  
  if (context.getFormat() === 'compress') {
    rules = rules.join("");

  } else {
    rules = rules.join("\n");
  }

  return rules
};






function Rule(selector, declarations) {
  this.selector = selector;
  this.declarations = declarations;
}
exports.Rule = Rule;

Rule.prototype.toCSS = function(parentContext) {
  var propertyCSS = [],
      nestRulesCSS = [],
      context = new Context(this, parentContext);

  this.declarations.forEach(function(declaration) {
    var css = declaration.toCSS(context);

    if (declaration instanceof Property) {
      propertyCSS.push(css);
    } else if (declaration instanceof Rule) {
      nestRulesCSS.push(css);
    }
  });

  if (context.getFormat() === 'compress') {
    propertyCSS = propertyCSS.join('');
  } else {
    propertyCSS = propertyCSS.join(' ');
  }

  var indent = ''
  if (context.getFormat() === 'indent') indent = Array(context.selectors().length).join("  ");

  var rule = [ indent + context.selector() + ' { ' + propertyCSS + ' }' ].
          concat(nestRulesCSS)

  if (context.getFormat() === 'compress') return rule.join("").replace(' { ', '{').replace(' }', '}')

  return rule.join("\n");
};





function Property(name, values) {
  this.name = name;
  this.values = values;
}

exports.Property = Property;

Property.prototype.toCSS = function(context) {
  var valuesCSS = this.values.map(function(value) { return value.toCSS(context)})
  var property = this.name + ': ' + valuesCSS.join(" ") + ';';

  if (context.getFormat() === 'compress') return property.replace(': ', ':');

  return property;
};




function Literal(value) {
  this.value = value;
}
exports.Literal = Literal;

Literal.prototype.toCSS = function(context) {
  return this.value;
}




function Variable(name) {
  this.name = name;
}
exports.Variable = Variable;

Variable.prototype.toCSS = function(context) {
  return context.get(this.name);
}



function Assign (name, values) {
  this.name = name;
  this.values = values;
}
exports.Assign = Assign;

Assign.prototype.toCSS = function (context) {
  var valuesCSS = this.values.map(function(value) { return value.toCSS(context) });
  context.set(this.name, valuesCSS.join(' '));
}

