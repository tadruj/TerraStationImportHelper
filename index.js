var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var TerraStationImportHelper_exports = {};
__export(TerraStationImportHelper_exports, {
  decrypt: () => decrypt,
  encrypt: () => encrypt
});
module.exports = __toCommonJS(TerraStationImportHelper_exports);
var import_crypto_js = __toESM(require("crypto-js"));
var import_js_base64 = __toESM(require("js-base64"));
const keySize = 256;
const iterations = 100;
const encrypt = (message, password) => {
  try {
    const salt = import_crypto_js.default.lib.WordArray.random(128 / 8);
    const key = import_crypto_js.default.PBKDF2(password, salt, {
      keySize: keySize / 32,
      iterations
    });
    const iv = import_crypto_js.default.lib.WordArray.random(128 / 8);
    const encrypted = import_crypto_js.default.AES.encrypt(message, key, {
      iv,
      padding: import_crypto_js.default.pad.Pkcs7,
      mode: import_crypto_js.default.mode.CBC
    });
    const transitmessage = salt.toString() + iv.toString() + encrypted.toString();
    return transitmessage;
  } catch (error) {
    console.log(error);
    return "";
  }
};
const decrypt = (transitmessage, password) => {
  try {
    const salt = import_crypto_js.default.enc.Hex.parse(transitmessage.substr(0, 32));
    const iv = import_crypto_js.default.enc.Hex.parse(transitmessage.substr(32, 32));
    const encrypted = transitmessage.substring(64);
    const key = import_crypto_js.default.PBKDF2(password, salt, {
      keySize: keySize / 32,
      iterations
    });
    const decrypted = import_crypto_js.default.AES.decrypt(encrypted, key, {
      iv,
      padding: import_crypto_js.default.pad.Pkcs7,
      mode: import_crypto_js.default.mode.CBC
    });
    return decrypted.toString(import_crypto_js.default.enc.Utf8);
  } catch (error) {
    console.log(error);
    return "";
  }
};
var input = {
  "address": "terra1...",
  "private_key": "replace_with_64_byte_hexadecimal_private_key_here",
  "password": "replace_with_new_password_you_will_enter_in_the_terra_station_password_field"
};
var result = {
  "name": "TerraStationImport",
  "address": input["address"],
  "encrypted_key": encrypt(
    input["private_key"],
    input["password"]
  )
};
console.log("Imported Terra Station wallet name will be", result["name"]);
console.log("\nNow go to Terra Station and select Import wallet\n");
console.log("Paste the following into the Key field:");
console.log(import_js_base64.default.encode(JSON.stringify(result)));
console.log("\nEnter the following into the Password field:");
console.log(input["password"]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  decrypt,
  encrypt
});
