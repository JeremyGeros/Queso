BIN = `npm bin`

lib/quesoParser.js: lib/grammar.jison lib/tokens.jisonlex
	${BIN}/jison $^ -o $@

test: lib/quesoParser.js
	${BIN}/mocha --reporter spec

watch:
	${BIN}/nodemon -x 'make test' -e 'js jison jisonlex' -q

.PHONY: test watch
