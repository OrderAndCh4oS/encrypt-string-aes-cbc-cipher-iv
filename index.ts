import crypto from "crypto";

const IV_LENGTH = 16;
const ALGORITHM = "aes-256-cbc";
const KEY = "32-LONG-CHAR-RANDOM-STRING-xxxxx"; //TODO: Generate a random string of 32 characters

export function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), iv);

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(text: string) {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift()!, "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), iv);

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

const encryptedStr = encrypt("hello");
console.log(encryptedStr);
console.log(decrypt(encryptedStr));
