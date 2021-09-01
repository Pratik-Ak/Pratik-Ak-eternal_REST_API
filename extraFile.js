
// Nodejs encryption with CTR
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(password) {
    console.log('1 >>>>>>',password)
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 console.log('2 >>>>>>',cipher)
 let encrypted = cipher.update(password);
 console.log('3 >>>>>>',encrypted)
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 console.log('4 >>>>>>',encrypted)
 var aData = { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
 console.log('5 >>>>>>',aData)
 //console.log('>>>>>>>>>>>',encrypted)
 console.log(aData)
 return aData;
}

function decrypt(password) {
    console.log('1 >>>>>>',password)
 let iv = Buffer.from(password.iv, 'hex');
 console.log('2 >>>>>>>',iv)
 let encryptedText = Buffer.from(password.encryptedData, 'hex');
 console.log('3 >>>>>',encryptedText)
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
 console.log('4 >>>>>>',decipher)
 let decrypted = decipher.update(encryptedText);
 console.log('5 >>>>>',decrypted)
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 console.log('6 >>>>>',decrypted)
console.log(decrypted.toString())
 return decrypted.toString();
}

var hw = encrypt("Some serious stuff")
console.log(hw)
console.log(decrypt(hw))