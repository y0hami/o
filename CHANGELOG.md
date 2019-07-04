# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [2.0.0](https://github.com/hammy2899/o/compare/v1.2.0...v2.0.0) (2019-07-04)

Rewrite the library in typescript and improve performance of some functions.
Also introduced a new build system which has better outputted files with source maps.



## [1.2.1](https://github.com/hammy2899/o/compare/v1.2.0...v1.2.1) (2019-02-17)


### Build

* **package:** add src to files ([bb863ff](https://github.com/hammy2899/o/commit/bb863ff))




# [1.2.0](https://github.com/hammy2899/o/compare/v1.0.1...v1.2.0) (2019-02-17)


### Build

* **deps:** update dependencies



<a name="1.1.2"></a>
# [1.1.2](https://github.com/hammy2899/o/compare/v1.0.1...v1.1.2) (2019-02-05)


### Bug Fixes

* **has:** bug causing cannot read property error ([784d4d8](https://github.com/hammy2899/o/commit/784d4d8)), closes [#37](https://github.com/hammy2899/o/issues/37)


### Features

* **equal, deepEqual:** add equal and deepEqual ([3bf68a9](https://github.com/hammy2899/o/commit/3bf68a9))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/hammy2899/o/compare/v1.0.0...v1.0.1) (2018-12-12)

### Features

* add `module` field to package.json for bundlers
* update dependencies

<a name="1.0.0"></a>
# 1.0.0 (2018-12-07)

### Bug Fixes

* **deflate:** rename flattenKeys import to deflate ([05f75e7](https://github.com/hammy2899/o/commit/05f75e7))
* **each:** return true if the iterator ran else false ([3e5d741](https://github.com/hammy2899/o/commit/3e5d741))
* **filter:** remove object check for follow ([e8d9c3f](https://github.com/hammy2899/o/commit/e8d9c3f))
* **find:** remove object check for follow ([74d99ef](https://github.com/hammy2899/o/commit/74d99ef))
* **find:** return key instead of value ([96e0c97](https://github.com/hammy2899/o/commit/96e0c97))
* **flattenKeys:** export the flattenKeys function ([b576331](https://github.com/hammy2899/o/commit/b576331))
* check if iterator is a function ([9bc97b8](https://github.com/hammy2899/o/commit/9bc97b8))
* **get:** remove object checks ([6124905](https://github.com/hammy2899/o/commit/6124905))
* **has:** remove object checks ([271eebc](https://github.com/hammy2899/o/commit/271eebc))
* **includes:** remove object check ([8c7ff94](https://github.com/hammy2899/o/commit/8c7ff94))
* **keyOf:** remove object checks ([9bc9d61](https://github.com/hammy2899/o/commit/9bc9d61))
* **merge:** change merge to directly export circle-assign ([59ac285](https://github.com/hammy2899/o/commit/59ac285))
* **pathParts:** convert to string before splitting ([1905d5e](https://github.com/hammy2899/o/commit/1905d5e))
* **set:** fix bug with empty objects ([137df5b](https://github.com/hammy2899/o/commit/137df5b))


### Features

* **clean:** add clean function ([eda3001](https://github.com/hammy2899/o/commit/eda3001))
* **clean:** add clean function ([bffb33f](https://github.com/hammy2899/o/commit/bffb33f))
* **clone:** add clone function ([aa7170a](https://github.com/hammy2899/o/commit/aa7170a))
* **del:** add del function ([e66037b](https://github.com/hammy2899/o/commit/e66037b))
* **del:** add del function ([41f7964](https://github.com/hammy2899/o/commit/41f7964))
* **each:** add each function ([55557c6](https://github.com/hammy2899/o/commit/55557c6))
* **each:** add each function ([648faf7](https://github.com/hammy2899/o/commit/648faf7))
* **empty:** add empty function ([055a50a](https://github.com/hammy2899/o/commit/055a50a))
* **every:** add every function ([7777204](https://github.com/hammy2899/o/commit/7777204))
* **every:** add every function ([e4d6262](https://github.com/hammy2899/o/commit/e4d6262))
* **filter:** add filter function ([d7b05e5](https://github.com/hammy2899/o/commit/d7b05e5))
* **filter:** add filter function ([09a36f7](https://github.com/hammy2899/o/commit/09a36f7))
* **find:** add find function ([4399628](https://github.com/hammy2899/o/commit/4399628))
* **find:** add find function ([ef02a0d](https://github.com/hammy2899/o/commit/ef02a0d))
* **flattenKeys:** add flattenKeys function ([9d46d37](https://github.com/hammy2899/o/commit/9d46d37))
* **flattenKeys:** add flattenKeys function ([fdd1c04](https://github.com/hammy2899/o/commit/fdd1c04))
* **flip:** add flip function ([99e2d9e](https://github.com/hammy2899/o/commit/99e2d9e))
* **flip:** add flip function ([fddd3a7](https://github.com/hammy2899/o/commit/fddd3a7))
* **get:** add get function ([7b927e3](https://github.com/hammy2899/o/commit/7b927e3))
* **has:** add has function ([066da0d](https://github.com/hammy2899/o/commit/066da0d))
* **includes:** add includes function ([1b06506](https://github.com/hammy2899/o/commit/1b06506))
* **includes:** add includes function ([bee0209](https://github.com/hammy2899/o/commit/bee0209))
* **index:** export all new function ([4c5fafa](https://github.com/hammy2899/o/commit/4c5fafa))
* **inflate:** add inflate function ([af79c62](https://github.com/hammy2899/o/commit/af79c62))
* **inflate:** add inflate function ([c39a851](https://github.com/hammy2899/o/commit/c39a851))
* **internals:** add getPathParts to parse dot notation paths ([7a9f215](https://github.com/hammy2899/o/commit/7a9f215))
* **is:** add is function ([613d4ed](https://github.com/hammy2899/o/commit/613d4ed))
* **keyOf:** add keyOf function ([98e8d6d](https://github.com/hammy2899/o/commit/98e8d6d))
* **keyOf:** add keyOf function ([bbed4d3](https://github.com/hammy2899/o/commit/bbed4d3))
* **keys:** add keys function ([3c093fc](https://github.com/hammy2899/o/commit/3c093fc))
* **map:** add map function ([bd5c2fe](https://github.com/hammy2899/o/commit/bd5c2fe))
* **map:** add map function ([cc09331](https://github.com/hammy2899/o/commit/cc09331))
* **merge:** add merge function ([95185e8](https://github.com/hammy2899/o/commit/95185e8))
* **merge:** add merge function ([a98e5ce](https://github.com/hammy2899/o/commit/a98e5ce))
* **set:** add set function ([3113bf9](https://github.com/hammy2899/o/commit/3113bf9))
* **size:** add size function ([e4bf546](https://github.com/hammy2899/o/commit/e4bf546))
* **slice:** add slice function ([5588fdf](https://github.com/hammy2899/o/commit/5588fdf))
* **slice:** add slice function ([32d3057](https://github.com/hammy2899/o/commit/32d3057))
* **some:** add some function ([8da55f9](https://github.com/hammy2899/o/commit/8da55f9))
* **some:** add some function ([04aa97d](https://github.com/hammy2899/o/commit/04aa97d))
* **sort:** add sort function ([8709a7b](https://github.com/hammy2899/o/commit/8709a7b))
* **sort:** add sort function ([ea41875](https://github.com/hammy2899/o/commit/ea41875))
* **values:** add values function ([0a4ca87](https://github.com/hammy2899/o/commit/0a4ca87))
* **values:** add values function ([deed825](https://github.com/hammy2899/o/commit/deed825))
