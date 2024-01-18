# Changelog

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
