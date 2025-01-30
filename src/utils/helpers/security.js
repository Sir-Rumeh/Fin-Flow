// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { jwtDecode } from 'jwt-decode';
import CryptoJS from 'crypto-js';

const defaultKey = import.meta.env.VITE_REACT_APP_ENCRYPTION_KEY;
const iv = import.meta.env.VITE_REACT_APP_ENCRYPTION_IV;

// Pad the client ID to ensure it's 32 bytes for AES-256
const clientIdToKey = (clientId) => {
  let clientKey = clientId.toString();
  while (clientKey.length < 32) {
    clientKey = '0' + clientKey; // Pad with '0' at the end
  }
  return clientKey.slice(0, 32); // Ensure the key is exactly 32 bytes
};

// Ensure the IV is exactly 16 bytes for AES
const adjustIv = (ivString) => {
  let ivKey = ivString.toString();
  while (ivKey.length < 16) {
    ivKey = ivKey + '0'; // Pad with '0' at the end
  }
  return ivKey.slice(0, 16); // Ensure the IV is exactly 16 bytes
};

export const encrypt = (value) => {
  try {
    if (value === null || value === undefined) {
      // Check if value is undefined or null
      throw new Error('Cannot encrypt: value is undefined or null');
    }
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    const key = CryptoJS.enc.Utf8.parse(clientIdToKey(defaultKey));
    const initialVector = CryptoJS.enc.Utf8.parse(adjustIv(iv));

    const encrypted = CryptoJS.AES.encrypt(value, key, {
      iv: initialVector,
      padding: CryptoJS.pad.Pkcs7,
      // padding: CryptoJS.pad.,
      mode: CryptoJS.mode.CBC,
    });

    return encrypted.toString();
  } catch (error) {
    console.error('Encryption error:', error);
  }
};

export const decrypt = (value) => {
  try {
    const key = CryptoJS.enc.Utf8.parse(clientIdToKey(defaultKey));
    const initialVector = CryptoJS.enc.Utf8.parse(adjustIv(iv));

    const decrypted = CryptoJS.AES.decrypt(value, key, {
      iv: initialVector,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
  }
};

export function decodeJwt(token) {
  return jwtDecode(token);
}
