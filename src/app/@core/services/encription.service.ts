import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class EncriptionService {

    constructor(private router: Router) { }

    key = 'ddfbccae-b4c4-11';
    iv = 'ddfbccae-b4c4-11';

    aes_encrypt(plaintext: any, key: any, iv: any) {
        key = CryptoJS.enc.Utf8.parse(key);
        iv = CryptoJS.enc.Utf8.parse(iv);
        const srcs = CryptoJS.enc.Utf8.parse(plaintext);
        const encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return encrypted.ciphertext.toString();
    }

    aes_decrypt(ciphertext: any, key: any, iv: any) {
        key = CryptoJS.enc.Utf8.parse(key);
        iv = CryptoJS.enc.Utf8.parse(iv);
        const hex_string = CryptoJS.enc.Hex.parse(ciphertext);
        const srcs = CryptoJS.enc.Base64.stringify(hex_string);
        const decrypt = CryptoJS.AES.decrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        //console.log(decrypt, 'deeee');
        const decrypt2 = decrypt.toString(CryptoJS.enc.Utf8);

        return decrypt2.toString();
    }

    response_decript(response: any) {
        try {
            const plaintext = this.aes_decrypt(response, this.key, this.iv);
            return JSON.parse(JSON.stringify(this.repairJson(plaintext), null, 2));
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    repairJson(data: any) {
        let str, obj;
        data = this.replaceAll(data, 'True', 'true');
        data = this.replaceAll(data, 'False', 'false');
        data = this.replaceAll(data, 'None', '""');

        try {
            str = data.replace(/'/g, '"');
            obj = JSON.parse(str);
        } catch (e) {
            try {
                obj = (0, eval)('(' + data + ')');
            } catch (e) {
                obj = {};
            }
        }

        return obj;
    }

    replaceAll(str: string, find: string, replace: string) {
        const escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
        return str.replace(new RegExp(escapedFind, 'g'), replace);
    }

    request_encript(json_obj: any) {
        try {
            const json_str = JSON.stringify(json_obj);
            // json_str = this.replaceAll(json_str, "'", "\"");
            const ciphertext = this.aes_encrypt(json_str, this.key, this.iv);
            return ciphertext;
        } catch (error) {
            return '';
        }
    }
}
