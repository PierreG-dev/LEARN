# encrypt-uint8array ![Build Status](https://github.com/papb/encrypt-uint8array/workflows/CI/badge.svg)

> Encrypt and decrypt an `Uint8Array` using another `Uint8Array` as password


## Highlights

* Simple to use, hard to misuse
* Does not reinvent the wheel (based on themis)
* Written in TypeScript (you get autocomplete suggestions in your IDE!)


## Install

```
$ npm install encrypt-uint8array
```


## Usage

```js
const {
	encryptUint8Array,
	decryptUint8Array,
	encodeString, // For convenience, but can be done with native TextEncoder
	decodeString  // For convenience, but can be done with native TextDecoder
} = require('encrypt-uint8array');

(async () => {
	const secret = encodeString('This is the secret');
	const password = encodeString('P4s$w0Rd!');
	const encrypted = await encryptUint8Array(secret, password);
	console.log(encrypted);
	//=> Uint8Array [ 0, 1, 1, 65, /* ... */, 103, 26 ]
	const decrypted = await decryptUint8Array(encrypted, password);
	console.log(decrypted);
	//=> Uint8Array [ 84, 104, 105, 115, /* ... */, 101, 116 ]
	console.log(decodeString(decrypted));
	//=> 'This is the secret'

	await decryptUint8Array(encrypted, encodeString('wrong password'));
	//=> DecryptionError: Unable to decrypt - password is incorrect or data is corrupted.
})();
```


## API

### encryptUint8Array(data, password)

Async function that encrypts `data` with `password`. Returns a new `Uint8Array`.

#### data

Type: `Uint8Array`

The data to be encrypted.

#### password

Type: `Uint8Array`

The `Uint8Array` to be used as password.

### decryptUint8Array(encryptedData, password)

Async function that decrypts `encryptedData` with `password`. Returns a new `Uint8Array`.

If `encryptedData` is not valid or the password is incorrect, this function will throw a `DecryptionError`.

#### encryptedData

Type: `Uint8Array`

The data to be decrypted.

#### password

Type: `Uint8Array`

The `Uint8Array` to be used as password.


## License

MIT © [Pedro Augusto de Paula Barbosa](https://github.com/papb)
