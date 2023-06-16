import * as CryptoJS from 'crypto-js';

export class Crypto {
    private key = CryptoJS.enc.Utf8.parse('7061737323313233');
    private iv = CryptoJS.enc.Utf8.parse('7061737323313233');

    public encrypt(data: any, is_password: boolean) {
        if (is_password) {
            let hash = CryptoJS.HmacSHA256(data, this.key);
            return CryptoJS.enc.Base64.stringify(hash)
        } else {
            return CryptoJS.AES.encrypt(
                CryptoJS.enc.Utf8.parse(data), this.key,
                {
                    keySize: 64 / 8,
                    iv: this.iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }
            );
        }
    }

    public hmacsha1(data: any) {
        let hash = CryptoJS.HmacSHA256(JSON.stringify(data), this.key);
        return CryptoJS.enc.Base64.stringify(hash);
    }

    public decrypt(encrypted: any) {
        var byteCode = CryptoJS.AES.decrypt(
            encrypted, this.key,
            {
                keySize: 128 / 8,
                iv: this.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );

        var decryptedString = byteCode.toString(CryptoJS.enc.Utf8)

        let obj = { 'decrypt_code': byteCode, 'value': decryptedString }
        return (typeof JSON.parse(decryptedString) === 'object' && decryptedString !== null) ? decryptedString : false;
    }

    public validate_password() {
        return true;
    }

    refresh_token(length = 60) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
}