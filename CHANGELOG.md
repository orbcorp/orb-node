# Changelog

## 3.0.1 (2024-07-25)

Full Changelog: [v3.0.0...v3.0.1](https://github.com/orbcorp/orb-node/compare/v3.0.0...v3.0.1)

### Bug Fixes

* **compat:** remove ReadableStream polyfill redundant since node v16 ([#241](https://github.com/orbcorp/orb-node/issues/241)) ([ad290c4](https://github.com/orbcorp/orb-node/commit/ad290c452f41ef1c2f61451b8f12f2a0530eef80))


### Chores

* **tests:** update prism version ([#239](https://github.com/orbcorp/orb-node/issues/239)) ([3d42c76](https://github.com/orbcorp/orb-node/commit/3d42c76165954546c638956031293c7c46e67f0f))

## 3.0.0 (2024-07-18)

Full Changelog: [v2.11.2...v3.0.0](https://github.com/orbcorp/orb-node/compare/v2.11.2...v3.0.0)

### ⚠ BREAKING CHANGES

* **api:** endpoint expects amount of new allocation price to be a string, not a number ([#226](https://github.com/orbcorp/orb-node/issues/226))
* **api:** add semi_annual cadence and remove metadata from update items ([#217](https://github.com/orbcorp/orb-node/issues/217))

### Features

* **api:** add 'status' to plan creation params ([#230](https://github.com/orbcorp/orb-node/issues/230)) ([0d738b9](https://github.com/orbcorp/orb-node/commit/0d738b9fb973d56e081901264253886718fdc270))
* **api:** add methods to prices and invoices ([#235](https://github.com/orbcorp/orb-node/issues/235)) ([1c50e27](https://github.com/orbcorp/orb-node/commit/1c50e27f94d60647bdf99bbd2eef9c7cd0539190))
* **api:** add semi_annual cadence and remove metadata from update items ([#217](https://github.com/orbcorp/orb-node/issues/217)) ([c1134f1](https://github.com/orbcorp/orb-node/commit/c1134f19e4d29b422fa601874b62a5894959f9a5))
* **api:** add support for adding allocation price to subscription ([#223](https://github.com/orbcorp/orb-node/issues/223)) ([2b73c46](https://github.com/orbcorp/orb-node/commit/2b73c469e6b19ea95ff5c7ced1f6c556eaec6f25))
* **api:** add support for query param include_all_blocks ([#227](https://github.com/orbcorp/orb-node/issues/227)) ([cbf7f33](https://github.com/orbcorp/orb-node/commit/cbf7f33382499d8d5196c74ac95f5e032fb4a258))
* **api:** external connections made optional when updating items ([#224](https://github.com/orbcorp/orb-node/issues/224)) ([1fada3b](https://github.com/orbcorp/orb-node/commit/1fada3b670af7bfd426678b111511f8202047ad3))
* **api:** updates ([#221](https://github.com/orbcorp/orb-node/issues/221)) ([69af019](https://github.com/orbcorp/orb-node/commit/69af019189172ffd10d418b9aead6b6ca6b1f326))
* support `application/octet-stream` request bodies ([#219](https://github.com/orbcorp/orb-node/issues/219)) ([d4dbb98](https://github.com/orbcorp/orb-node/commit/d4dbb9885cbd6c5f123234827fb8772c234e3bdd))


### Bug Fixes

* **api:** endpoint expects amount of new allocation price to be a string, not a number ([#226](https://github.com/orbcorp/orb-node/issues/226)) ([2595cad](https://github.com/orbcorp/orb-node/commit/2595cadb368f042cfdc16720f30afd520046a92d))
* **api:** escape browser check string ([#220](https://github.com/orbcorp/orb-node/issues/220)) ([ce68fda](https://github.com/orbcorp/orb-node/commit/ce68fdacc0b32cffac21c045f62a8bfdfe827d93))


### Chores

* **ci:** also run workflows for PRs targeting `next` ([#231](https://github.com/orbcorp/orb-node/issues/231)) ([bf5cbd5](https://github.com/orbcorp/orb-node/commit/bf5cbd59fb5e93200d024395fecc423287e9f3a5))
* **ci:** limit release doctor target branches ([#237](https://github.com/orbcorp/orb-node/issues/237)) ([91cd764](https://github.com/orbcorp/orb-node/commit/91cd7642cbb8beaa0b3ffb04f4a0f0dd491a6fa4))
* **docs:** improve Coupon description ([#222](https://github.com/orbcorp/orb-node/issues/222)) ([df63181](https://github.com/orbcorp/orb-node/commit/df631819cd356a83fe2b64879480eed963707edf))
* **docs:** mention support of web browser runtimes ([#234](https://github.com/orbcorp/orb-node/issues/234)) ([60a2812](https://github.com/orbcorp/orb-node/commit/60a2812d215238569787787233c5fdd4fdffe293))
* **docs:** minor update to formatting of API link in README ([#233](https://github.com/orbcorp/orb-node/issues/233)) ([bc2ab56](https://github.com/orbcorp/orb-node/commit/bc2ab563a742a31df5994c028004020ab5724123))
* **docs:** updates price intervals docs ([#228](https://github.com/orbcorp/orb-node/issues/228)) ([e640a63](https://github.com/orbcorp/orb-node/commit/e640a63783cd6d141e7947348bcc22bf0908c574))
* **docs:** use client instead of package name in Node examples ([#236](https://github.com/orbcorp/orb-node/issues/236)) ([15ec443](https://github.com/orbcorp/orb-node/commit/15ec443a3a31b2f27ac9d203543e57d078446838))
* gitignore test server logs ([#229](https://github.com/orbcorp/orb-node/issues/229)) ([6e9959f](https://github.com/orbcorp/orb-node/commit/6e9959f99678f58b9febe2e642913e2a662b50a1))
* **internal:** minor reformatting ([#225](https://github.com/orbcorp/orb-node/issues/225)) ([1a7b1c3](https://github.com/orbcorp/orb-node/commit/1a7b1c3b19c839161e010c4bd38a3aad9ca6a5e8))


### Documentation

* **examples:** update example values ([#232](https://github.com/orbcorp/orb-node/issues/232)) ([7315dbc](https://github.com/orbcorp/orb-node/commit/7315dbc65581cbfbb4270d909345c66857e9889a))

## 2.11.2 (2024-06-04)

Full Changelog: [v2.11.1...v2.11.2](https://github.com/orbcorp/orb-node/compare/v2.11.1...v2.11.2)

### Bug Fixes

* Prefix node.js imports with "node:" ([88eda87](https://github.com/orbcorp/orb-node/commit/88eda87109c8868d777a4067a70cedcccc3236c7))


### Chores

* fix lint ([9303eb1](https://github.com/orbcorp/orb-node/commit/9303eb1c269d954f16be9ba19a3ba27644697812))

## 2.11.1 (2024-05-31)

Full Changelog: [v2.11.0...v2.11.1](https://github.com/orbcorp/orb-node/compare/v2.11.0...v2.11.1)

### Bug Fixes

* allow git imports for pnpm ([#213](https://github.com/orbcorp/orb-node/issues/213)) ([25ea079](https://github.com/orbcorp/orb-node/commit/25ea0795acda956700e947cc66ee2be598522bf0))

## 2.11.0 (2024-05-29)

Full Changelog: [v2.10.0...v2.11.0](https://github.com/orbcorp/orb-node/compare/v2.10.0...v2.11.0)

### Features

* **api:** pricing model updates ([97f4cce](https://github.com/orbcorp/orb-node/commit/97f4ccef52c3fdd91a5360f28f9efe2edcc56ab7))
* **api:** update item endpoint ([#212](https://github.com/orbcorp/orb-node/issues/212)) ([97f4cce](https://github.com/orbcorp/orb-node/commit/97f4ccef52c3fdd91a5360f28f9efe2edcc56ab7))


### Documentation

* **readme:** add bundle size badge ([#210](https://github.com/orbcorp/orb-node/issues/210)) ([4b80558](https://github.com/orbcorp/orb-node/commit/4b80558f5a456eb5d0c9596a5f73cdfa031c8b99))

## 2.10.0 (2024-05-23)

Full Changelog: [v2.9.0...v2.10.0](https://github.com/orbcorp/orb-node/compare/v2.9.0...v2.10.0)

### Features

* **api:** updates ([#208](https://github.com/orbcorp/orb-node/issues/208)) ([ce9e336](https://github.com/orbcorp/orb-node/commit/ce9e336a9a0e54b19a9bd507a4d04414f885813d))

## 2.9.0 (2024-05-22)

Full Changelog: [v2.8.0...v2.9.0](https://github.com/orbcorp/orb-node/compare/v2.8.0...v2.9.0)

### Features

* **api:** updates ([#206](https://github.com/orbcorp/orb-node/issues/206)) ([c315c94](https://github.com/orbcorp/orb-node/commit/c315c9426d5b385261b847d34366d261c8011380))


### Bug Fixes

* **types:** correct index signature type ([#207](https://github.com/orbcorp/orb-node/issues/207)) ([a6b66c2](https://github.com/orbcorp/orb-node/commit/a6b66c2185133095e0680c131638a9729def3d1a))


### Chores

* **internal:** add slightly better logging to scripts ([#204](https://github.com/orbcorp/orb-node/issues/204)) ([37e69d8](https://github.com/orbcorp/orb-node/commit/37e69d8c9af13301aaf636eb5ab1cf21b6cf4953))

## 2.8.0 (2024-05-14)

Full Changelog: [v2.7.0...v2.8.0](https://github.com/orbcorp/orb-node/compare/v2.7.0...v2.8.0)

### Features

* **api:** updates ([#203](https://github.com/orbcorp/orb-node/issues/203)) ([c07669e](https://github.com/orbcorp/orb-node/commit/c07669e7dcc75392fb372f5a5062ca8c0f384b54))


### Refactors

* change import paths to be relative ([#201](https://github.com/orbcorp/orb-node/issues/201)) ([843b1a9](https://github.com/orbcorp/orb-node/commit/843b1a9a6f3ef095c9a85288dc4903de1f8c89e0))

## 2.7.0 (2024-05-13)

Full Changelog: [v2.6.1...v2.7.0](https://github.com/orbcorp/orb-node/compare/v2.6.1...v2.7.0)

### Features

* **api:** updates ([#200](https://github.com/orbcorp/orb-node/issues/200)) ([61505d5](https://github.com/orbcorp/orb-node/commit/61505d5f0beaa363f95c797a73f135c4da9a0735))


### Chores

* **docs:** add SECURITY.md ([#198](https://github.com/orbcorp/orb-node/issues/198)) ([794c13f](https://github.com/orbcorp/orb-node/commit/794c13f0928bdec7dce33e57fc08150a79ee2c8a))

## 2.6.1 (2024-05-10)

Full Changelog: [v2.6.0...v2.6.1](https://github.com/orbcorp/orb-node/compare/v2.6.0...v2.6.1)

### Bug Fixes

* **api:** remove alert parameters and method that aren't supported by the live API ([#197](https://github.com/orbcorp/orb-node/issues/197)) ([66999d9](https://github.com/orbcorp/orb-node/commit/66999d9db101bff76d53b47a50d7e32b8d65032e))


### Chores

* **docs:** improve alert endpoints descriptions ([#194](https://github.com/orbcorp/orb-node/issues/194)) ([23ee7ed](https://github.com/orbcorp/orb-node/commit/23ee7ed33bc17e63be63dff60d74ad19c957ce95))
* rebuild project due to oas spec rename ([#196](https://github.com/orbcorp/orb-node/issues/196)) ([1afa7de](https://github.com/orbcorp/orb-node/commit/1afa7defea4a549657dded707b77208ae2b3befa))

## 2.6.0 (2024-05-09)

Full Changelog: [v2.5.1...v2.6.0](https://github.com/orbcorp/orb-node/compare/v2.5.1...v2.6.0)

### Features

* **api:** add alert methods and models ([#191](https://github.com/orbcorp/orb-node/issues/191)) ([21a22ae](https://github.com/orbcorp/orb-node/commit/21a22ae1f617900dc9f7b4e94d0d965d3b25053f))

## 2.5.1 (2024-05-08)

Full Changelog: [v2.5.0...v2.5.1](https://github.com/orbcorp/orb-node/compare/v2.5.0...v2.5.1)

### Chores

* remove unintentional file inclusion ([71a97f9](https://github.com/orbcorp/orb-node/commit/71a97f9114b56b7f9b4bc60b638028d046859b62))

## 2.5.0 (2024-05-08)

Full Changelog: [v2.4.1...v2.5.0](https://github.com/orbcorp/orb-node/compare/v2.4.1...v2.5.0)

### Features

* **api:** add method to enable alerts ([#186](https://github.com/orbcorp/orb-node/issues/186)) ([e8b9215](https://github.com/orbcorp/orb-node/commit/e8b9215034f2c507ff148d2b1c7e39c6c4597d92))

## 2.4.1 (2024-05-03)

Full Changelog: [v2.4.0...v2.4.1](https://github.com/orbcorp/orb-node/compare/v2.4.0...v2.4.1)

### Bug Fixes

* **package:** revert recent client file change ([#182](https://github.com/orbcorp/orb-node/issues/182)) ([682eecb](https://github.com/orbcorp/orb-node/commit/682eecb4c8ccf726e81d1ea088cb0f966e545aa6))

## 2.4.0 (2024-05-02)

Full Changelog: [v2.3.0...v2.4.0](https://github.com/orbcorp/orb-node/compare/v2.3.0...v2.4.0)

### Features

* **api:** add effective_date field ([#163](https://github.com/orbcorp/orb-node/issues/163)) ([7a5d9af](https://github.com/orbcorp/orb-node/commit/7a5d9afe4f578cfc7f1e8a03767f75bad3579751))
* **api:** add param to backfill create ([#174](https://github.com/orbcorp/orb-node/issues/174)) ([9379644](https://github.com/orbcorp/orb-node/commit/93796449184a9b4823a83ead1fa88b3557459588))
* **api:** add subscription update endpoint ([#168](https://github.com/orbcorp/orb-node/issues/168)) ([d7ee5ba](https://github.com/orbcorp/orb-node/commit/d7ee5bae793278692eb62159152dd5ad1f015bc9))
* **api:** add the shared model PaginationMetadata ([#164](https://github.com/orbcorp/orb-node/issues/164)) ([85956fe](https://github.com/orbcorp/orb-node/commit/85956fea41477392b725778e7d8364616236cad9))
* **api:** price evaluation endpoint generally available ([#169](https://github.com/orbcorp/orb-node/issues/169)) ([c1e2b83](https://github.com/orbcorp/orb-node/commit/c1e2b837cad4c1786ca553b0ea9fbabfc4623880))
* **api:** updates ([#154](https://github.com/orbcorp/orb-node/issues/154)) ([0f7c989](https://github.com/orbcorp/orb-node/commit/0f7c989eac9d033b1c8a03420efed405d3af4b88))
* **api:** updates ([#159](https://github.com/orbcorp/orb-node/issues/159)) ([ca602ea](https://github.com/orbcorp/orb-node/commit/ca602eaa69dcf615f4785c41a0c078b9a20af029))
* **api:** updates ([#179](https://github.com/orbcorp/orb-node/issues/179)) ([86b9015](https://github.com/orbcorp/orb-node/commit/86b9015532a7c165a605f77938c4bbadee24d452))


### Bug Fixes

* **api:** add shared model BillingCycleRelativeDate ([#167](https://github.com/orbcorp/orb-node/issues/167)) ([bb6764e](https://github.com/orbcorp/orb-node/commit/bb6764e1eed1bce9f1629e853de6a08eef0166cd))
* **api:** some path params were incorrectly typed as nullable ([#166](https://github.com/orbcorp/orb-node/issues/166)) ([bafd0a9](https://github.com/orbcorp/orb-node/commit/bafd0a9e007ad993fc129dd18836583074cd6b86))
* use UTC timezone for verifying webhook signature ([5eb9d2c](https://github.com/orbcorp/orb-node/commit/5eb9d2c50f5312d4ef82bc18bb94f95d1120b906)), closes [#156](https://github.com/orbcorp/orb-node/issues/156)


### Chores

* **internal:** add link to openapi spec ([#176](https://github.com/orbcorp/orb-node/issues/176)) ([fd77e6a](https://github.com/orbcorp/orb-node/commit/fd77e6a266b2ba7a82821552afa227eb26d69443))
* **internal:** add scripts/test and scripts/mock ([#173](https://github.com/orbcorp/orb-node/issues/173)) ([495558b](https://github.com/orbcorp/orb-node/commit/495558b5f58d1729e3cc059e1c0acdaa039640af))
* **internal:** add scripts/test, scripts/mock and add ci job ([#177](https://github.com/orbcorp/orb-node/issues/177)) ([4440933](https://github.com/orbcorp/orb-node/commit/4440933b3f3d51740d8fcfd4ab188856b09967e9))
* **internal:** formatting ([#161](https://github.com/orbcorp/orb-node/issues/161)) ([b4ae917](https://github.com/orbcorp/orb-node/commit/b4ae9171619c0a23f368c92cc3e4b415859ac6af))
* **internal:** forward arguments in scripts/test ([#178](https://github.com/orbcorp/orb-node/issues/178)) ([0564bfe](https://github.com/orbcorp/orb-node/commit/0564bfe383da0efbe642ad5801c0ef9484f9f36c))
* **internal:** move client class to separate file ([#180](https://github.com/orbcorp/orb-node/issues/180)) ([9f56e13](https://github.com/orbcorp/orb-node/commit/9f56e13cce2e88d6a4a95a73215bd348a2685a9e))
* **internal:** refactor scripts ([#175](https://github.com/orbcorp/orb-node/issues/175)) ([76f4954](https://github.com/orbcorp/orb-node/commit/76f49549e07628aea9747f2190766c6e966c3d2e))
* **internal:** update gitignore ([#160](https://github.com/orbcorp/orb-node/issues/160)) ([bbd39e8](https://github.com/orbcorp/orb-node/commit/bbd39e830f21ef19b95dc7cd3ff06450906c360e))
* **internal:** use @swc/jest for running tests ([#165](https://github.com/orbcorp/orb-node/issues/165)) ([50ad2b0](https://github.com/orbcorp/orb-node/commit/50ad2b09e4d415050660adb28b4549c55a0730f1))
* **internal:** use actions/checkout@v4 for codeflow ([#171](https://github.com/orbcorp/orb-node/issues/171)) ([dcf2157](https://github.com/orbcorp/orb-node/commit/dcf21575dda07240093966cb560585f3eb08643c))
* use debug instead of console log for webhook signature logging ([590cbf1](https://github.com/orbcorp/orb-node/commit/590cbf17e37a7eb071d6d31295b3f9cc9bb46579))


### Build System

* configure UTF-8 locale in devcontainer ([#162](https://github.com/orbcorp/orb-node/issues/162)) ([b1b8a5a](https://github.com/orbcorp/orb-node/commit/b1b8a5a1a586305e71183cd0c02f24a70513f3b1))

## 2.3.0 (2024-04-24)

Full Changelog: [v2.2.0...v2.3.0](https://github.com/orbcorp/orb-node/compare/v2.2.0...v2.3.0)

### Features

* **api:** add effective_date field ([#163](https://github.com/orbcorp/orb-node/issues/163)) ([96a98bd](https://github.com/orbcorp/orb-node/commit/96a98bd315ceb6f2239dee6267bcf0b3a7e84a39))
* **api:** add subscription update endpoint ([#168](https://github.com/orbcorp/orb-node/issues/168)) ([09b5798](https://github.com/orbcorp/orb-node/commit/09b5798769187bcb18c92210c8b336b169f72343))
* **api:** add the shared model PaginationMetadata ([#164](https://github.com/orbcorp/orb-node/issues/164)) ([15f5af3](https://github.com/orbcorp/orb-node/commit/15f5af31b39a66ef8a626af50d09abf3202afc8f))
* **api:** price evaluation endpoint generally available ([#169](https://github.com/orbcorp/orb-node/issues/169)) ([492a728](https://github.com/orbcorp/orb-node/commit/492a72833150267df706054e5d8c1ce998b27999))
* **api:** updates ([#154](https://github.com/orbcorp/orb-node/issues/154)) ([01aef6d](https://github.com/orbcorp/orb-node/commit/01aef6d41d2fd0f6174eb6116ac2a670cfc96882))
* **api:** updates ([#159](https://github.com/orbcorp/orb-node/issues/159)) ([5b6287c](https://github.com/orbcorp/orb-node/commit/5b6287c047ed1a5eab7e498690838062c233a1a7))


### Bug Fixes

* **api:** add shared model BillingCycleRelativeDate ([#167](https://github.com/orbcorp/orb-node/issues/167)) ([8677375](https://github.com/orbcorp/orb-node/commit/867737537ddecdfcaaf33bb0bd3fe29532f265c4))
* **api:** some path params were incorrectly typed as nullable ([#166](https://github.com/orbcorp/orb-node/issues/166)) ([eeb81d4](https://github.com/orbcorp/orb-node/commit/eeb81d4ade556528cf564b850b0d1b932fbfd999))
* use UTC timezone for verifying webhook signature ([9a0b87a](https://github.com/orbcorp/orb-node/commit/9a0b87a704a84608383c66cb5acb73f55aa97b3c)), closes [#156](https://github.com/orbcorp/orb-node/issues/156)


### Chores

* **internal:** formatting ([#161](https://github.com/orbcorp/orb-node/issues/161)) ([db765d8](https://github.com/orbcorp/orb-node/commit/db765d86efc540e6301fc15912360ba66218c673))
* **internal:** update gitignore ([#160](https://github.com/orbcorp/orb-node/issues/160)) ([7a2c39f](https://github.com/orbcorp/orb-node/commit/7a2c39f468ea6aba7133d6fdfd28c632c119e145))
* **internal:** use @swc/jest for running tests ([#165](https://github.com/orbcorp/orb-node/issues/165)) ([c744e70](https://github.com/orbcorp/orb-node/commit/c744e70bf74385171fea39d73c9611f792661a3c))
* use debug instead of console log for webhook signature logging ([590cbf1](https://github.com/orbcorp/orb-node/commit/590cbf17e37a7eb071d6d31295b3f9cc9bb46579))


### Build System

* configure UTF-8 locale in devcontainer ([#162](https://github.com/orbcorp/orb-node/issues/162)) ([aa09c7d](https://github.com/orbcorp/orb-node/commit/aa09c7dfc261b6e05e8e944f23a55463f80d13da))

## 2.2.0 (2024-04-08)

Full Changelog: [v2.1.2...v2.2.0](https://github.com/orbcorp/orb-node/compare/v2.1.2...v2.2.0)

### Features

* add webhooks verification helpers ([2beaa01](https://github.com/orbcorp/orb-node/commit/2beaa019f1f4e58ee6fde3cab29f500964dc3bc1))
* **api:** add `invoice_source` to invoice ([#153](https://github.com/orbcorp/orb-node/issues/153)) ([8a9b15e](https://github.com/orbcorp/orb-node/commit/8a9b15e6560c1f82888bf4f7b09536ac8d3fee01))
* **api:** add tiered package with minimum price ([#150](https://github.com/orbcorp/orb-node/issues/150)) ([6c53952](https://github.com/orbcorp/orb-node/commit/6c53952ea49a49b1565df1133f132cb0fef30215))
* **api:** remove accidental null ([#146](https://github.com/orbcorp/orb-node/issues/146)) ([e66a755](https://github.com/orbcorp/orb-node/commit/e66a7556055d4f3638245f338769a8565cdddddc))
* **api:** timeframe_end and timeframe_start accept null ([#148](https://github.com/orbcorp/orb-node/issues/148)) ([bab2d25](https://github.com/orbcorp/orb-node/commit/bab2d25a0e37deb6058ed9890560f5bcc6dc53cb))
* **api:** updates ([#141](https://github.com/orbcorp/orb-node/issues/141)) ([c14e608](https://github.com/orbcorp/orb-node/commit/c14e60853f9ec7a3954c83ee8bb9275ee97e5797))
* **client:** add webhook secret argument ([#143](https://github.com/orbcorp/orb-node/issues/143)) ([46c215a](https://github.com/orbcorp/orb-node/commit/46c215aac68387a5c43c2bc0fb620486369dcbf5))


### Chores

* **deps:** bump yarn to v1.22.22 ([#151](https://github.com/orbcorp/orb-node/issues/151)) ([4ab1e0e](https://github.com/orbcorp/orb-node/commit/4ab1e0e4e2b5e9e62c2d27c99aedc35bc8e3c00f))
* **deps:** remove unused dependency digest-fetch ([#149](https://github.com/orbcorp/orb-node/issues/149)) ([567dbb4](https://github.com/orbcorp/orb-node/commit/567dbb4edd942bb04eb952c8dd19e8a8af8ff24e))
* **docs:** revise currency description ([#152](https://github.com/orbcorp/orb-node/issues/152)) ([1508146](https://github.com/orbcorp/orb-node/commit/15081469303ea1b6327b2c5b3ea38650c76b8ee8))
* **internal:** bump dependencies ([#145](https://github.com/orbcorp/orb-node/issues/145)) ([94acc13](https://github.com/orbcorp/orb-node/commit/94acc135e32597d32cce614aa4c25758600838ca))

## 2.1.2 (2024-03-25)

Full Changelog: [v2.1.1...v2.1.2](https://github.com/orbcorp/orb-node/compare/v2.1.1...v2.1.2)

### Bug Fixes

* **client:** correctly send deno version header ([#139](https://github.com/orbcorp/orb-node/issues/139)) ([b144fb1](https://github.com/orbcorp/orb-node/commit/b144fb1b5ea7c7024d6e3f28a01922c15b945154))

## 2.1.1 (2024-03-21)

Full Changelog: [v2.1.0...v2.1.1](https://github.com/orbcorp/orb-node/compare/v2.1.0...v2.1.1)

### Bug Fixes

* handle process.env being undefined in debug func ([#137](https://github.com/orbcorp/orb-node/issues/137)) ([a5bdbc9](https://github.com/orbcorp/orb-node/commit/a5bdbc9fc05aa3b4d8b0b472ee9c0d6d01fe6c2b))

## 2.1.0 (2024-03-21)

Full Changelog: [v2.0.1...v2.1.0](https://github.com/orbcorp/orb-node/compare/v2.0.1...v2.1.0)

### Features

* **api:** introduce credits status ([e719163](https://github.com/orbcorp/orb-node/commit/e7191637842912dbf05d98f2f811fbbde69645b1))
* **api:** remove `scaling_factor` ([#136](https://github.com/orbcorp/orb-node/issues/136)) ([e719163](https://github.com/orbcorp/orb-node/commit/e7191637842912dbf05d98f2f811fbbde69645b1))


### Chores

* **errors:** fallback to empty array for validation errors ([#135](https://github.com/orbcorp/orb-node/issues/135)) ([50352c2](https://github.com/orbcorp/orb-node/commit/50352c2d8a1e148b7251894fee8e8d1a752deffd))


### Documentation

* **readme:** consistent use of sentence case in headings ([#132](https://github.com/orbcorp/orb-node/issues/132)) ([ef902e3](https://github.com/orbcorp/orb-node/commit/ef902e3165d5c83ca7a3154f80d226f514509279))
* **readme:** document how to make undocumented requests ([#134](https://github.com/orbcorp/orb-node/issues/134)) ([a84bdad](https://github.com/orbcorp/orb-node/commit/a84bdad2e586a6aa9cee16a79213cc2d4c261162))

## 2.0.1 (2024-03-19)

Full Changelog: [v2.0.0...v2.0.1](https://github.com/orbcorp/orb-node/compare/v2.0.0...v2.0.1)

### Bug Fixes

* **internal:** make toFile use input file's options ([#131](https://github.com/orbcorp/orb-node/issues/131)) ([3dcf78e](https://github.com/orbcorp/orb-node/commit/3dcf78ef86120dd23d70c4c0207b7e261767f1c8))


### Chores

* **internal:** update generated pragma comment ([#129](https://github.com/orbcorp/orb-node/issues/129)) ([a981349](https://github.com/orbcorp/orb-node/commit/a9813499738e9790135030ae5b35ba3d09cf82bd))


### Documentation

* fix typo in CONTRIBUTING.md ([#127](https://github.com/orbcorp/orb-node/issues/127)) ([bfbc496](https://github.com/orbcorp/orb-node/commit/bfbc49621d93dabf52800163a304f3f50b7916d5))
* updated invoice description ([#130](https://github.com/orbcorp/orb-node/issues/130)) ([f73fa8c](https://github.com/orbcorp/orb-node/commit/f73fa8c79ec9f881fb4e89db72367783bec3b5aa))

## 2.0.0 (2024-03-15)

Full Changelog: [v1.41.0...v2.0.0](https://github.com/orbcorp/orb-node/compare/v1.41.0...v2.0.0)

### ⚠ BREAKING CHANGES

* remove brackets from array param names ([#109](https://github.com/orbcorp/orb-node/issues/109))

### Features

* **api:** add matrix with allocation price ([#125](https://github.com/orbcorp/orb-node/issues/125)) ([6f5326c](https://github.com/orbcorp/orb-node/commit/6f5326cf9880d411ef0195a6b30cdb7b28efb1ba))
* **api:** create invoice metadata param ([#126](https://github.com/orbcorp/orb-node/issues/126)) ([fbd1fe2](https://github.com/orbcorp/orb-node/commit/fbd1fe2359c84af7e96e75be593d3802f104273e))
* **api:** updates ([#123](https://github.com/orbcorp/orb-node/issues/123)) ([da21006](https://github.com/orbcorp/orb-node/commit/da21006557813e5840ad5c976cbc5f7cdb490d80))
* **api:** updates ([#124](https://github.com/orbcorp/orb-node/issues/124)) ([b38e885](https://github.com/orbcorp/orb-node/commit/b38e885c10405d866051b49bec3110c388ebaa38))


### Bug Fixes

* remove brackets from array param names ([#109](https://github.com/orbcorp/orb-node/issues/109)) ([eb8d87a](https://github.com/orbcorp/orb-node/commit/eb8d87ab56e1c0f0aa1550488e1be9adfb82b46c))


### Chores

* **ci:** update actions/setup-node action to v4 ([#114](https://github.com/orbcorp/orb-node/issues/114)) ([cb18285](https://github.com/orbcorp/orb-node/commit/cb182857aab933915d07299375cec7556e64b22a))
* **ci:** uses Stainless GitHub App for releases ([#111](https://github.com/orbcorp/orb-node/issues/111)) ([b32a3db](https://github.com/orbcorp/orb-node/commit/b32a3db0956464737a7692d47dee726a58870aa2))
* **docs:** mention install from git repo ([#118](https://github.com/orbcorp/orb-node/issues/118)) ([80ab072](https://github.com/orbcorp/orb-node/commit/80ab072ce57e6caf6490e57302b67900c7a00702))
* fix error handler in readme ([#119](https://github.com/orbcorp/orb-node/issues/119)) ([91ab80e](https://github.com/orbcorp/orb-node/commit/91ab80e3e3e07e9af2f6065594f29cae558a48e0))
* **interal:** make link to api.md relative ([#104](https://github.com/orbcorp/orb-node/issues/104)) ([10b9053](https://github.com/orbcorp/orb-node/commit/10b9053e1cf9afc7a6ce3750650f9cee91ff5890))
* **internal:** enable building when git installed ([#107](https://github.com/orbcorp/orb-node/issues/107)) ([9d6c4aa](https://github.com/orbcorp/orb-node/commit/9d6c4aa517116a5c5f9e2a242429f52cd86f88b8))
* **internal:** re-order pagination import ([#106](https://github.com/orbcorp/orb-node/issues/106)) ([3869080](https://github.com/orbcorp/orb-node/commit/38690803e060a343400da766e4b783d4cc8b0d2a))
* **internal:** refactor release environment script ([#112](https://github.com/orbcorp/orb-node/issues/112)) ([73a6e40](https://github.com/orbcorp/orb-node/commit/73a6e409f780f9961d22a2515f861d32a639e0ba))
* **internal:** update deps ([#115](https://github.com/orbcorp/orb-node/issues/115)) ([42f5dcd](https://github.com/orbcorp/orb-node/commit/42f5dcd408f813ee4371a50095bb454d1173f30e))
* respect `application/vnd.api+json` content-type header ([#110](https://github.com/orbcorp/orb-node/issues/110)) ([af334b3](https://github.com/orbcorp/orb-node/commit/af334b32adc1f446cb65b25f0fa670bbc18da170))


### Documentation

* add a CONTRIBUTING.md ([#108](https://github.com/orbcorp/orb-node/issues/108)) ([97829ba](https://github.com/orbcorp/orb-node/commit/97829ba3cef5cf3435bfa6bd467b24e83676168f))
* **contributing:** improve wording ([#116](https://github.com/orbcorp/orb-node/issues/116)) ([154baf1](https://github.com/orbcorp/orb-node/commit/154baf11174879ba98ec0f8b6b298c69496ab537))
* fix example of fetch overwrite ([d3cf8c0](https://github.com/orbcorp/orb-node/commit/d3cf8c0b94c49cc88ec0c5f70a36e85e121b13a8))
* **readme:** fix https proxy example ([#120](https://github.com/orbcorp/orb-node/issues/120)) ([e284311](https://github.com/orbcorp/orb-node/commit/e2843116e45bbae8d532ebcc10bd9e0c84ff806c))
* remove extraneous --save and yarn install instructions ([#121](https://github.com/orbcorp/orb-node/issues/121)) ([38785df](https://github.com/orbcorp/orb-node/commit/38785df64cf6ddaf07a103967856fbce3a56674c))

## 1.41.0 (2024-02-01)

Full Changelog: [v1.40.0...v1.41.0](https://github.com/orbcorp/orb-node/compare/v1.40.0...v1.41.0)

### Features

* **api:** add `version` to plan ([#103](https://github.com/orbcorp/orb-node/issues/103)) ([79d5e78](https://github.com/orbcorp/orb-node/commit/79d5e782ef96c336f1533b49856443c7571d3cf8))


### Chores

* **internal:** support pre-release versioning ([#101](https://github.com/orbcorp/orb-node/issues/101)) ([fde3f1e](https://github.com/orbcorp/orb-node/commit/fde3f1e11401994115d4b82ece010d27b3742687))

## 1.40.0 (2024-01-30)

Full Changelog: [v1.39.0...v1.40.0](https://github.com/orbcorp/orb-node/compare/v1.39.0...v1.40.0)

### Features

* **api:** price schema updates ([#99](https://github.com/orbcorp/orb-node/issues/99)) ([c7dfa82](https://github.com/orbcorp/orb-node/commit/c7dfa82aebebb5bd3c225447c972a50cf3851f8d))

## 1.39.0 (2024-01-30)

Full Changelog: [v1.38.0...v1.39.0](https://github.com/orbcorp/orb-node/compare/v1.38.0...v1.39.0)

### Features

* **api:** add `external_customer_id` ([#97](https://github.com/orbcorp/orb-node/issues/97)) ([b974b31](https://github.com/orbcorp/orb-node/commit/b974b31004e59ca863cde0cfa376b007a6ba6757))

## 1.38.0 (2024-01-22)

Full Changelog: [v1.37.4...v1.38.0](https://github.com/orbcorp/orb-node/compare/v1.37.4...v1.38.0)

### Features

* **api:** introduce per-price cost v2, credit top-ups ([#96](https://github.com/orbcorp/orb-node/issues/96)) ([13451c5](https://github.com/orbcorp/orb-node/commit/13451c50e8a1a4926c7be5b6b44a0d84077fcb23))


### Chores

* **internal:** add internal helpers & improve build scripts ([#94](https://github.com/orbcorp/orb-node/issues/94)) ([66e335a](https://github.com/orbcorp/orb-node/commit/66e335a74e67d3a409fc74bbe91b6282c469070c))

## 1.37.4 (2024-01-18)

Full Changelog: [v1.37.3...v1.37.4](https://github.com/orbcorp/orb-node/compare/v1.37.3...v1.37.4)

### Bug Fixes

* allow body type in RequestOptions to be null ([#92](https://github.com/orbcorp/orb-node/issues/92)) ([6a4506f](https://github.com/orbcorp/orb-node/commit/6a4506f1bef90976fc5d3eae3adb9656fa1e3bb4))

## 1.37.3 (2024-01-18)

Full Changelog: [v1.37.2...v1.37.3](https://github.com/orbcorp/orb-node/compare/v1.37.2...v1.37.3)

### Bug Fixes

* **ci:** ignore stainless-app edits to release PR title ([#90](https://github.com/orbcorp/orb-node/issues/90)) ([29a405c](https://github.com/orbcorp/orb-node/commit/29a405ce6ddfeaa4c9177cb285df159a16805961))

## 1.37.2 (2024-01-17)

Full Changelog: [v1.37.1...v1.37.2](https://github.com/orbcorp/orb-node/compare/v1.37.1...v1.37.2)

### Bug Fixes

* **types:** accept undefined for optional client options ([#89](https://github.com/orbcorp/orb-node/issues/89)) ([b0566d0](https://github.com/orbcorp/orb-node/commit/b0566d0e24e3556352a127306a03858eadddd161))


### Chores

* **internal:** debug logging for retries; speculative retry-after-ms support ([#87](https://github.com/orbcorp/orb-node/issues/87)) ([97db8bc](https://github.com/orbcorp/orb-node/commit/97db8bc873502e3d2eef1647748e067b0fc5490c))

## 1.37.1 (2024-01-17)

Full Changelog: [v1.37.0...v1.37.1](https://github.com/orbcorp/orb-node/compare/v1.37.0...v1.37.1)

### Bug Fixes

* use `Accept: */*` as a default Header for void endpoints ([#85](https://github.com/orbcorp/orb-node/issues/85)) ([b9f2713](https://github.com/orbcorp/orb-node/commit/b9f2713c20f691fc91a5b538d0bd56860ba093bb))

## 1.37.0 (2024-01-17)

Full Changelog: [v1.36.0...v1.37.0](https://github.com/orbcorp/orb-node/compare/v1.36.0...v1.37.0)

### Features

* **api:** updates ([#83](https://github.com/orbcorp/orb-node/issues/83)) ([1b4638b](https://github.com/orbcorp/orb-node/commit/1b4638b31ef22d3555ae672e2fd8ad5a57091765))

## 1.36.0 (2024-01-15)

Full Changelog: [v1.35.0...v1.36.0](https://github.com/orbcorp/orb-node/compare/v1.35.0...v1.36.0)

### Features

* **api:** updates ([#82](https://github.com/orbcorp/orb-node/issues/82)) ([555e380](https://github.com/orbcorp/orb-node/commit/555e380da29de37420b3f5925fcdc92a90585c33))


### Chores

* formatting ([#79](https://github.com/orbcorp/orb-node/issues/79)) ([0e02096](https://github.com/orbcorp/orb-node/commit/0e02096f3bb435b489e653d7c97b7e788c423ccd))


### Documentation

* fix missing async in readme code sample ([#81](https://github.com/orbcorp/orb-node/issues/81)) ([a0f6c26](https://github.com/orbcorp/orb-node/commit/a0f6c262a8fcf40844ba39ebc402cb0f89f8a7ea))

## 1.35.0 (2024-01-12)

Full Changelog: [v1.34.2...v1.35.0](https://github.com/orbcorp/orb-node/compare/v1.34.2...v1.35.0)

### Features

* **api:** add beta evaluate price endpoint ([#78](https://github.com/orbcorp/orb-node/issues/78)) ([a0dbd55](https://github.com/orbcorp/orb-node/commit/a0dbd55d9b98efbf6d2797e0a4fc5d8a74bbc90f))


### Chores

* **internal:** narrow type into stringifyQuery ([#75](https://github.com/orbcorp/orb-node/issues/75)) ([f93f20f](https://github.com/orbcorp/orb-node/commit/f93f20fb9d631ee71deabefa2ae6e318822c349b))


### Documentation

* **readme:** improve api reference ([#77](https://github.com/orbcorp/orb-node/issues/77)) ([680bcb0](https://github.com/orbcorp/orb-node/commit/680bcb0216a90ee5e4a985b611f534dcd5539763))

## 1.34.2 (2024-01-10)

Full Changelog: [v1.34.1...v1.34.2](https://github.com/orbcorp/orb-node/compare/v1.34.1...v1.34.2)

### Bug Fixes

* use default base url if BASE_URL env var is blank ([#74](https://github.com/orbcorp/orb-node/issues/74)) ([ad971d0](https://github.com/orbcorp/orb-node/commit/ad971d0fab1418375db9fdc3a3d5fbec22afb01c))


### Chores

* add .keep files for examples and custom code directories ([#73](https://github.com/orbcorp/orb-node/issues/73)) ([5bebfd9](https://github.com/orbcorp/orb-node/commit/5bebfd9d5d81ef44786882cb580b872289d7479b))
* **internal:** improve type signatures ([#71](https://github.com/orbcorp/orb-node/issues/71)) ([453e66e](https://github.com/orbcorp/orb-node/commit/453e66ec72e92ed94672f4be150c96e5bbb173f2))

## 1.34.1 (2024-01-04)

Full Changelog: [v1.34.0...v1.34.1](https://github.com/orbcorp/orb-node/compare/v1.34.0...v1.34.1)

### Bug Fixes

* **headers:** always send lowercase headers and strip undefined (BREAKING in rare cases) ([#69](https://github.com/orbcorp/orb-node/issues/69)) ([b05815f](https://github.com/orbcorp/orb-node/commit/b05815fe17d2596b65f32af0c5e095b2a27af6f6))

## 1.34.0 (2024-01-01)

Full Changelog: [v1.33.1...v1.34.0](https://github.com/orbcorp/orb-node/compare/v1.33.1...v1.34.0)

### Features

* **api:** add currency fields ([#67](https://github.com/orbcorp/orb-node/issues/67)) ([7147ea7](https://github.com/orbcorp/orb-node/commit/7147ea7e24352f824a44038373294f1a7cd55ac5))

## 1.33.1 (2023-12-26)

Full Changelog: [v1.33.0...v1.33.1](https://github.com/orbcorp/orb-node/compare/v1.33.0...v1.33.1)

### Bug Fixes

* use brackets instead of commas for array query params ([#66](https://github.com/orbcorp/orb-node/issues/66)) ([1bb118c](https://github.com/orbcorp/orb-node/commit/1bb118cf59d4aace1adcdb8f809f3d0daedf0fb2))


### Chores

* **ci:** run release workflow once per day ([#59](https://github.com/orbcorp/orb-node/issues/59)) ([719bda1](https://github.com/orbcorp/orb-node/commit/719bda1f38042a018828838f1a7839845d421226))
* **deps:** update dependency ts-jest to v29.1.1 ([#60](https://github.com/orbcorp/orb-node/issues/60)) ([a011800](https://github.com/orbcorp/orb-node/commit/a0118008c2f18ad16ae93222053d98e40739cdd7))
* **deps:** update jest ([#61](https://github.com/orbcorp/orb-node/issues/61)) ([7c35eb0](https://github.com/orbcorp/orb-node/commit/7c35eb094855e67758614435cec8ebea8ef71d80))
* **internal:** minor updates to pagination ([#64](https://github.com/orbcorp/orb-node/issues/64)) ([993b3d0](https://github.com/orbcorp/orb-node/commit/993b3d0337dce7158ddf3a14668d0ff72af6c8c9))
* update dependencies ([#58](https://github.com/orbcorp/orb-node/issues/58)) ([cea16a0](https://github.com/orbcorp/orb-node/commit/cea16a0f158912dcf840cda52e2fc1d5d1063ee8))


### Documentation

* **api:** updates ([#62](https://github.com/orbcorp/orb-node/issues/62)) ([f601aa0](https://github.com/orbcorp/orb-node/commit/f601aa0d60bb6429259383ec6b57dabf3c3410cf))
* avoid normalizing trailing space ([#56](https://github.com/orbcorp/orb-node/issues/56)) ([e127ac0](https://github.com/orbcorp/orb-node/commit/e127ac017cb0e60eceacf7a3ce71b437067d6065))
* reformat README.md ([#65](https://github.com/orbcorp/orb-node/issues/65)) ([390cb50](https://github.com/orbcorp/orb-node/commit/390cb507d8f45277374b9bc98d70a27041a4db8b))


### Refactors

* write jest config in typescript ([#63](https://github.com/orbcorp/orb-node/issues/63)) ([43d6bf7](https://github.com/orbcorp/orb-node/commit/43d6bf7abf0b7c7adbb337183944641fddf228ae))

## 1.33.0 (2023-12-11)

Full Changelog: [v1.32.0...v1.33.0](https://github.com/orbcorp/orb-node/compare/v1.32.0...v1.33.0)

### Features

* **api:** updates ([#55](https://github.com/orbcorp/orb-node/issues/55)) ([1a22a28](https://github.com/orbcorp/orb-node/commit/1a22a28cf0b2800ecfbd8204f2e8dc502e73abd2))


### Build System

* specify `packageManager: yarn` ([#53](https://github.com/orbcorp/orb-node/issues/53)) ([78de30f](https://github.com/orbcorp/orb-node/commit/78de30fb75637d6848d1793f6c5ff6315446668f))

## 1.32.0 (2023-12-08)

Full Changelog: [v1.31.0...v1.32.0](https://github.com/orbcorp/orb-node/compare/v1.31.0...v1.32.0)

### Features

* **api:** remove unsupported field ([#52](https://github.com/orbcorp/orb-node/issues/52)) ([58cd13d](https://github.com/orbcorp/orb-node/commit/58cd13de2af144cfd8f8f9e105b316f311e51ac4))

## 1.31.0 (2023-12-04)

Full Changelog: [v1.30.0...v1.31.0](https://github.com/orbcorp/orb-node/compare/v1.30.0...v1.31.0)

### Features

* **client:** support reading the base url from an env variable ([#48](https://github.com/orbcorp/orb-node/issues/48)) ([e147a4a](https://github.com/orbcorp/orb-node/commit/e147a4a96b0f798ba98a7f12eabe2f8bb40b3021))


### Documentation

* **readme:** update example snippets ([#46](https://github.com/orbcorp/orb-node/issues/46)) ([3ec5d0b](https://github.com/orbcorp/orb-node/commit/3ec5d0bc95b7522153ff57836aa7c234e363089c))

## 1.30.0 (2023-11-28)

Full Changelog: [v1.29.0...v1.30.0](https://github.com/orbcorp/orb-node/compare/v1.29.0...v1.30.0)

### Features

* **api:** updates ([#45](https://github.com/orbcorp/orb-node/issues/45)) ([7a04e1a](https://github.com/orbcorp/orb-node/commit/7a04e1aab11063627d2ef73701864d60d0c1cbbe))


### Chores

* **internal:** remove file import and conditionally run prepare ([#43](https://github.com/orbcorp/orb-node/issues/43)) ([c65b596](https://github.com/orbcorp/orb-node/commit/c65b5961a26fa2eda9fe806a2214dfe518f6e447))


### Documentation

* **api:** update metadata docstrings ([#41](https://github.com/orbcorp/orb-node/issues/41)) ([4334af2](https://github.com/orbcorp/orb-node/commit/4334af25186dae687ad96ab323d5fa53d15b220f))

## 1.29.0 (2023-11-22)

Full Changelog: [v1.28.1...v1.29.0](https://github.com/orbcorp/orb-node/compare/v1.28.1...v1.29.0)

### Features

* allow installing package directly from github ([#37](https://github.com/orbcorp/orb-node/issues/37)) ([8791b26](https://github.com/orbcorp/orb-node/commit/8791b26c93d33807434ad51f40f4e998567216f7))
* **api:** updates ([#40](https://github.com/orbcorp/orb-node/issues/40)) ([2a17035](https://github.com/orbcorp/orb-node/commit/2a1703539b5c4df7c2b1dc6a5a10b720fa53fa0d))


### Chores

* **internal:** don't call prepare in dist ([#39](https://github.com/orbcorp/orb-node/issues/39)) ([986847c](https://github.com/orbcorp/orb-node/commit/986847ce30bdf30bb5e8b8f5e7269b146e726a9c))

## 1.28.1 (2023-11-20)

Full Changelog: [v1.28.0...v1.28.1](https://github.com/orbcorp/orb-node/compare/v1.28.0...v1.28.1)

### Chores

* **internal:** update some test values ([#36](https://github.com/orbcorp/orb-node/issues/36)) ([5fbb843](https://github.com/orbcorp/orb-node/commit/5fbb8434dae21355c7ef55981212b254c71291d9))


### Documentation

* **readme:** fix link to docs website ([#34](https://github.com/orbcorp/orb-node/issues/34)) ([3f8f962](https://github.com/orbcorp/orb-node/commit/3f8f962deb0771ccfda27de253035016fe298356))

## 1.28.0 (2023-11-16)

Full Changelog: [v1.27.0...v1.28.0](https://github.com/orbcorp/orb-node/compare/v1.27.0...v1.28.0)

### Features

* **api:** updates ([#33](https://github.com/orbcorp/orb-node/issues/33)) ([5e82f4c](https://github.com/orbcorp/orb-node/commit/5e82f4c7df7b492122884c590a3f0fc9c8572a37))


### Chores

* **internal:** update APIResource structure ([#32](https://github.com/orbcorp/orb-node/issues/32)) ([27b274a](https://github.com/orbcorp/orb-node/commit/27b274a8629933d77ec4ef1829f4f42c2a28617b))
* **internal:** update jest config ([#30](https://github.com/orbcorp/orb-node/issues/30)) ([bb4611b](https://github.com/orbcorp/orb-node/commit/bb4611bbf3f5f6ef18be0c080585de881f9354d3))

## 1.27.0 (2023-11-09)

Full Changelog: [v1.26.0...v1.27.0](https://github.com/orbcorp/orb-node/compare/v1.26.0...v1.27.0)

### Features

* **api:** updates ([#29](https://github.com/orbcorp/orb-node/issues/29)) ([9370826](https://github.com/orbcorp/orb-node/commit/937082653f43b84e36f13e5527d33579802545cc))


### Chores

* **ci:** update release-please config ([#25](https://github.com/orbcorp/orb-node/issues/25)) ([2dedc58](https://github.com/orbcorp/orb-node/commit/2dedc582e117e04783f279dd787f6a85d113d5b8))
* **docs:** fix github links ([#27](https://github.com/orbcorp/orb-node/issues/27)) ([2e036e2](https://github.com/orbcorp/orb-node/commit/2e036e276d24b6a3f092aef9f490b830d45f7b64))
* **internal:** update tsconfig ([#28](https://github.com/orbcorp/orb-node/issues/28)) ([cc08246](https://github.com/orbcorp/orb-node/commit/cc0824649ad32cccc6ecd857cc9e89012c0b9425))

## 1.26.0 (2023-11-06)

Full Changelog: [v1.25.0...v1.26.0](https://github.com/orbcorp/orb-node/compare/v1.25.0...v1.26.0)

### Features

* **api:** remove unsupported params ([#24](https://github.com/orbcorp/orb-node/issues/24)) ([546f564](https://github.com/orbcorp/orb-node/commit/546f564868e19b571bea8ec595007a104c89f7a6))
* **client:** allow binary returns ([#21](https://github.com/orbcorp/orb-node/issues/21)) ([6cfaacb](https://github.com/orbcorp/orb-node/commit/6cfaacbc2d5604c31709c7dd94351de64c931a4b))
* **github:** include a devcontainer setup ([#19](https://github.com/orbcorp/orb-node/issues/19)) ([cd00cda](https://github.com/orbcorp/orb-node/commit/cd00cda07f404de71c96df25ddc9362c45be5dc7))


### Documentation

* document customizing fetch ([#22](https://github.com/orbcorp/orb-node/issues/22)) ([34c9fe6](https://github.com/orbcorp/orb-node/commit/34c9fe66cb1514cc2b2596493398745126ddf655))
* **readme:** remove redundant whitespace ([#23](https://github.com/orbcorp/orb-node/issues/23)) ([a3e47e1](https://github.com/orbcorp/orb-node/commit/a3e47e1baaa0693e5e7367c1a87d4044f455cedf))

## 1.25.0 (2023-10-27)

Full Changelog: [v1.24.2...v1.25.0](https://github.com/orbcorp/orb-node/compare/v1.24.2...v1.25.0)

### Features

* **api:** updates ([#15](https://github.com/orbcorp/orb-node/issues/15)) ([7bdafeb](https://github.com/orbcorp/orb-node/commit/7bdafebaa6625706e97eb2452800590703d4c305))

## 1.24.2 (2023-10-26)

Full Changelog: [v1.24.1...v1.24.2](https://github.com/orbcorp/orb-node/compare/v1.24.1...v1.24.2)

### Bug Fixes

* **client:** include more detail in error messages ([#13](https://github.com/orbcorp/orb-node/issues/13)) ([178571c](https://github.com/orbcorp/orb-node/commit/178571c28fc3be1593670b0aaf5122cb60afb366))

## 1.24.1 (2023-10-26)

Full Changelog: [v1.24.0...v1.24.1](https://github.com/orbcorp/orb-node/compare/v1.24.0...v1.24.1)

### Bug Fixes

* rename customer.credits.ledger.create_entry_by_exteral_id and RequestValidationErrors ([#11](https://github.com/orbcorp/orb-node/issues/11)) ([02404a8](https://github.com/orbcorp/orb-node/commit/02404a880c4620f4baa2d9b359ee0b88bf5efa0a))

## 1.24.0 (2023-10-26)

Full Changelog: [v1.23.0...v1.24.0](https://github.com/orbcorp/orb-node/compare/v1.23.0...v1.24.0)

### Features

* **api:** updates ([#9](https://github.com/orbcorp/orb-node/issues/9)) ([441d209](https://github.com/orbcorp/orb-node/commit/441d2098994ecbee04177150845ef73c5d70099e))

## 1.23.0 (2023-10-25)

Full Changelog: [v1.22.0...v1.23.0](https://github.com/orbcorp/orb-node/compare/v1.22.0...v1.23.0)

### Features

* **client:** adjust retry behavior to be exponential backoff ([#5](https://github.com/orbcorp/orb-node/issues/5)) ([dd376c4](https://github.com/orbcorp/orb-node/commit/dd376c4cec8b12df0df7fbf3914b3dc3c02fcf69))


### Bug Fixes

* typo in build script ([#8](https://github.com/orbcorp/orb-node/issues/8)) ([780d50d](https://github.com/orbcorp/orb-node/commit/780d50d23fb1543dd7e3b80e1b3ca2fb2ee5c23b))

## 1.22.0 (2023-10-23)

Full Changelog: [v1.21.0...v1.22.0](https://github.com/orbcorp/orb-node/compare/v1.21.0...v1.22.0)

### Features

* **init:** initial commit ([c0c9395](https://github.com/orbcorp/orb-node/commit/c0c93952f0c3e5fabd96c50f2c7ece64ea84a8b7))


### Chores

* correct version ([ee0d2f2](https://github.com/orbcorp/orb-node/commit/ee0d2f2a2980c6e8a2f1c34a80062c96efd081da))


### Documentation

* improve code examples ([441bf4f](https://github.com/orbcorp/orb-node/commit/441bf4f10f3be6b87a183f6e478687ef62553530))
