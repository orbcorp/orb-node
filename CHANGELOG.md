# Changelog

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
