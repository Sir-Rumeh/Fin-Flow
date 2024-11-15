// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { jwtDecode } from 'jwt-decode';
import CryptoJS from 'crypto-js';

const defaultKey = import.meta.env.VITE_REACT_APP_ENCRYPTION_KEY;
const iv = import.meta.env.VITE_REACT_APP_ENCRYPTION_IV;

const clientIdToKey = (clientId: any) => {
  let clientKey = clientId.toString();
  while (clientKey.length < 24) {
    clientKey = `0 + ${clientKey}`;
  }
  return clientKey;
};

const asciiToHex = (str: any) => {
  const arr1 = [];
  for (let n = 0, l = str?.toString().length; n < l; n += 1) {
    const hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
};

export const encrypt = (value: any) => {
  if (value === null) {
    // Check if value is undefined or null
    throw new Error('Cannot encrypt: value is undefined or null');
  }

  if (typeof value === 'object') {
    value = JSON.stringify(value); // eslint-disable-line no-param-reassign
    const key = CryptoJS.enc.Hex.parse(asciiToHex(clientIdToKey(defaultKey)));
    const initialVector = CryptoJS.enc.Hex.parse(asciiToHex(iv));

    const encrypted = CryptoJS.AES.encrypt(value, key, {
      iv: initialVector,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
      keySize: 192,
    });
    console.log('aes encrypt', encrypted);
    const transitMessage = encrypted?.toString();
    return transitMessage;
  }
};

export const decrypt = (value: any) => {
  const key = CryptoJS.enc.Hex.parse(asciiToHex(clientIdToKey(defaultKey)));

  const initialVector = CryptoJS.enc.Hex.parse(asciiToHex(iv));

  const decrypted = CryptoJS.AES.decrypt(value, key, {
    iv: initialVector,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
    keySize: 192,
  });

  const transitMessage = decrypted.toString(CryptoJS.enc.Utf8);
  return transitMessage;
};

export function decodeJwt(token: string) {
  return jwtDecode(token);
}
