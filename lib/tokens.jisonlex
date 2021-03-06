// Jison lexer grammar
//
// http://zaach.github.io/jison/docs/#lexical-analysis
// http://dinosaur.compilertools.net/flex/flex_6.html#SEC6
//
// Order is important. Rules are matches from top to bottom.

//// Macros
DIGIT                 [0-9]
NUMBER                {DIGIT}+(\.{DIGIT}+)? // matches: 10 and 3.14
NAME                  [a-zA-Z][\w\-]*       // matches: body, background-color and myClassName
SELECTOR              (\.|\#|\:\:|\:){NAME} // matches: #id, .class, :hover and ::before

%%

//// Rules


{NAME}\s{NAME}            return 'IDENTIFIER'
{SELECTOR}\s{SELECTOR}        return 'IDENTIFIER'


\s+                   //ignore whitespace

//NUMBERS
{NUMBER}(px|em|\%)    return 'DIMENSION'
{NUMBER}              return 'NUMBER'
\#[0-9A-Fa-f]{3,6}    return 'COLOR'


//SELECTORS
{SELECTOR}            return 'SELECTOR'
{NAME}{SELECTOR}      return 'SELECTOR'

\@{NAME}              return 'VARIABLE' // @VARAIBLE


{NAME}                return 'IDENTIFIER'


.                     return yytext

<<EOF>>               return 'EOF'
