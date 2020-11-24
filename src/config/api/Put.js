import axios from 'axios';
import { Auth, HR, Asset } from './ResourceURL';


/* 
    ini adalah fungsi untuk menangani request PUT API
    ketika request berhasil resolve dijalankan
    ketika request gagal reject dijalankan
*/
const Put = (url, path, data) => {
    const promise = new Promise((resolve, reject) => {
        axios.put(`${ url === 'auth' ? Auth : url === 'hr' ? HR : url === 'asset' ? Asset : null }/${path}`, data).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        })
    })

    return promise;
}

export default Put;