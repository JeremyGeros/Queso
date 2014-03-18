Queso
=====

Exploring how JISON and language parsers work, by building a CSS preprocessor

To generate quesoParser.js file run
```
make
```

To generate the outputted css us the provided bin/queso
```
bin/queso samples/plain.css

body#home { font: 10px Arial; font-weight: bold; margin: 10px; }
body#home .nestedRule { padding: 10px; }
h1 { font-size: 30px; }
```
This can also be passed a second argument to output either compressed or indented css
```
bin/queso samples/plain.css compress

body#home{font:10px Arial;font-weight:bold;margin:10px;}body#home .nestedRule{padding:10px;}h1{font-size:30px;}

bin/queso samples/plain.css indent

body#home { font: 10px Arial; font-weight: bold; margin: 10px; }
  body#home .nestedRule { padding: 10px; }
h1 { font-size: 30px; }
```





Tests
=====

run the tests with

```
make test
```
Or to watch the files and re-run the test on changes with

```
make watch
```
