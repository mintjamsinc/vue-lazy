# vue-lazy
A reusable lazy directive for [Vue.js](https://github.com/vuejs/vue) 2.x.

## Installation

```sh
npm install --save-dev @mintjamsinc/vue-lazy
```

## Usage

```js
import VueLazy from '@mintjamsinc/vue-lazy';
Vue.use(VueLazy);
```

```vue
<img v-lazy:src="image.jpg">

<div v-lazy:background-image="image.jpg"></div>
```

If you want to register a directive locally:

```js
import lazy from '@mintjamsinc/vue-lazy';
export default {
  directives: {
    lazy,
  },
}
```

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2021 MintJams Inc.