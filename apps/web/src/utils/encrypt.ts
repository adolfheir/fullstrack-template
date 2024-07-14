import CryptoJS from 'crypto-js';
import logger from './logger';

// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse('1145269856854722');
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse('6369854158663549');

/**
 * 加密方法
 * @param data
 * @returns {string}
 */

//由于后端密码强度要求，暂时不进行加密
export function encrypt_canRun(data: any) {
  if (typeof data === 'object') {
    try {
      // eslint-disable-next-line no-param-reassign
      data = JSON.stringify(data);
    } catch (error) {
      logger.error('encrypt error:', error);
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
}

export function encrypt(data: any) {
  return data;
}

/**
 * 解密方法
 * @param data
 * @returns {string}
 */
export function decrypt(data: any) {
  if (!data) return;
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

export function encodeBase64(plainText: string): string {
  const encodedData = CryptoJS.enc.Utf8.parse(plainText).toString(CryptoJS.enc.Base64);
  return encodedData;
}

export function parseBase64(base64String: string) {
  // 解码
  const decodedData = CryptoJS.enc.Base64.parse(base64String).toString(CryptoJS.enc.Utf8);
  return decodedData;
}
