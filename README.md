# CDN Free

###  Installation
```bash
npm install @tinyhref/cdn-free
or
yarn add @tinyhref/cdn-free
```

## Use It

```js
import { uploadCdn } from '@tinyhref/cdn-free';

uploadCdn({
  npmToken: 'npm_xxx',
  packageVersion: '1.1.1',
  packageDescription: '',
  dataFile,
  packageNames: ['cdn-free']
})
```