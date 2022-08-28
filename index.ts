import CryptoJS from 'crypto-js'
import Base64 from 'js-base64'

const keySize = 256
const iterations = 100

export const encrypt = (
  message: string,
  password: string
): string => {
  try {
    const salt = CryptoJS.lib.WordArray.random(128 / 8)
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: keySize / 32,
      iterations,
    })

    const iv = CryptoJS.lib.WordArray.random(128 / 8)
    const encrypted = CryptoJS.AES.encrypt(message, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    })

    const transitmessage =
      salt.toString() + iv.toString() + encrypted.toString()

    return transitmessage
  } catch (error) {
    console.log(error)
    return ''
  }
}

export const decrypt = (
  transitmessage: string,
  password: string
): string => {
  try {
    const salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32))
    const iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
    const encrypted = transitmessage.substring(64)
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: keySize / 32,
      iterations,
    })

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    })

    return decrypted.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.log(error)
    return ''
  }
}

// CHANGE BELOW

var input = {
  "address": "terra1...", // Native Terra network address
  "private_key": "replace_with_64_byte_hexadecimal_private_key_here", // Private Key
  "password": "replace_with_new_password_you_will_enter_in_the_terra_station_password_field" // Password for imported Terra Station wallet
}

// DON'T CHANGE ANYTHING AFTER THIS

var result = {
  "name": "TerraStationImport", // Name of the imported Wallet in Terra Station
  "address": input["address"],
  "encrypted_key": encrypt(
    input["private_key"],
    input["password"]
    )
}

console.log("Imported Terra Station wallet name will be", result["name"]);
console.log("\nNow go to Terra Station and select Import wallet\n");
console.log("Paste the following into the Key field:");
console.log(Base64.encode(JSON.stringify(result)));
console.log("\nEnter the following into the Password field:");
console.log(input["password"]);
