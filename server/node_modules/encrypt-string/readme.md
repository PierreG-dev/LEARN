# encrypt-string ![Build Status](https://github.com/papb/encrypt-string/workflows/CI/badge.svg)

> Encrypt and decrypt a string using another string (or an `Uint8Array`) as password


## Highlights

* Simple to use, hard to misuse
* Does not reinvent the wheel (based on [encrypt-uint8array](https://github.com/papb/encrypt-unit8array) which in turn is based on [Themis](https://docs.cossacklabs.com/themis/))
* Written in TypeScript (you get autocomplete suggestions in your IDE!)
* The obtained encrypted string is always printable (uses only printable ASCII characters)
* For large strings, the encrypted string length is only about 25% larger than the original string


## Install

```
$ npm install encrypt-string
```


## Usage

```js
const { encryptString, decryptString } = require('encrypt-string');

(async () => {
	const secret = 'This is the secret';
	const password = 'P4s$w0Rd!';

	const encrypted = await encryptString(secret, password);
	console.log(encrypted);
	//=> !!(AP#M4i]$9<c0,iw4;%a4/C%*@EB0jp'+$$pww]yLPd3[G'2/eS`@_u/[@.dfF#$9]Xl2:o:@FkoOA'@jq}=`f$W!>gbX1L678@ghM`.=7V(K:db]M5i{u5[ga~CojWx'M_e7;#~lD-aVDs-D_o)+e16d:-`Dz!bVJ3

	const decrypted = await decryptString(encrypted, password);
	console.log(decrypted);
	//=> 'This is the secret'

	await decryptString(encrypted, 'wrong-password');
	//=> DecryptionError: Unable to decrypt - password is incorrect or data is corrupted.
})();
```

Note: it seems Themis uses some cryptographically secure random bytes in the encryption process, therefore the encryption result is different on each run, even for the same secret and same password. If you run the example above, you will probably get a different encrypted string.

Don't worry, all of them are valid and all of them can be decrypted successfully. You can see this by decrypting the output I received directly:

```js
const { decryptString } = require('encrypt-string');

(async () => {
	const encrypted = '!!(AP#M4i]$9<c0,iw4;%a4/C%*@EB0jp\'+$$pww]yLPd3[G\'2/eS`@_u/[@.dfF#$9]Xl2:o:@FkoOA\'@jq}=`f$W!>gbX1L678@ghM`.=7V(K:db]M5i{u5[ga~CojWx\'M_e7;#~lD-aVDs-D_o)+e16d:-`Dz!bVJ3';
	const password = 'P4s$w0Rd!';

	const decrypted = await decryptString(encrypted, password);
	console.log(decrypted);
	//=> 'This is the secret'
})();
```


## API

### encryptString(data, password)

Async function that encrypts `data` with `password`. Returns an encrypted string, composed only of printable ASCII characters. More precisely, it uses all 94 printable ASCII characters (excluding space).

The output can be different for multiple executions with the same parameters, but all of them will be valid (and they will always have at least the same length).

#### data

Type: `string`

The string to be encrypted.

#### password

Type: `string | Uint8Array`

The string (or `Uint8Array`) to be used as password.

### decryptString(encryptedData, password)

Async function that decrypts `encryptedData` with `password`. Returns the original string.

If `encryptedData` is not valid or the password is incorrect, this function will throw a `DecryptionError`.

#### encryptedData

Type: `string`

The data to be decrypted.

#### password

Type: `string | Uint8Array`

The string (or `Uint8Array`) to be used as password.


## Encrypted length

When you encrypt a string, the length of the encrypted result will be equal to 125% of the original length, plus 140 characters.


## Related packages

* [encrypt-uint8array](https://github.com/papb/encrypt-uint8array) - Encrypt and decrypt an `Uint8Array` using another `Uint8Array` as password


## License

MIT © [Pedro Augusto de Paula Barbosa](https://github.com/papb)
