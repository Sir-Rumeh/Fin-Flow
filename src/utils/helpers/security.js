// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { jwtDecode } from 'jwt-decode';
import CryptoJS from 'crypto-js';

const defaultKey = import.meta.env.VITE_REACT_APP_ENCRYPTION_KEY;
const iv = import.meta.env.VITE_REACT_APP_ENCRYPTION_IV;

const clientIdToKey = (clientId) => {
  let clientKey = clientId.toString();
  while (clientKey.length < 24) {
    clientKey = `0 + ${clientKey}`;
  }
  return clientKey;
};

const asciiToHex = (str) => {
  const arr1 = [];
  for (let n = 0, l = str?.toString().length; n < l; n += 1) {
    const hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
};

export const encrypt = (value) => {
  try {
    if (value === null || undefined) {
      // Check if value is undefined or null
      throw new Error('Cannot encrypt: value is undefined or null');
    }
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    const key = CryptoJS.enc.Hex.parse(asciiToHex(clientIdToKey(defaultKey)));
    const initialVector = CryptoJS.enc.Hex.parse(asciiToHex(iv));
    const encrypted = CryptoJS.AES.encrypt(value, key, {
      iv: initialVector,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
      keySize: 192,
    });
    if (encrypted) {
      const transitMessage = encrypted?.toString();
      console.log('aes encrypt', transitMessage);
      return transitMessage;
    }
  } catch (error) {
    console.log('error', error);
  }
};

export const decrypt = (value) => {
  const key = CryptoJS.enc.Hex.parse(asciiToHex(clientIdToKey(defaultKey)));

  const initialVector = CryptoJS.enc.Hex.parse(asciiToHex(iv));

  const decrypted = CryptoJS.AES.decrypt(value, key, {
    iv: initialVector,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
    keySize: 192,
  });

  const transitMessage = decrypted?.toString(CryptoJS.enc.Utf8);
  return transitMessage;
};

export function decodeJwt(token) {
  return jwtDecode(token);
}
