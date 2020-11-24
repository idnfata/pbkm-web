import axios from 'axios';
import { Auth, HR, Asset } from './ResourceURL';

/* 
    ini adalah fungsi untuk menangani request POST API
    ketika request berhasil resolve dijalankan
    ketika request gagal reject dijalankan
*/
const Post = (url, path, data) => {
    const promise = new Promise((resolve, reject) => {
        axios.post(`${ url === 'auth' ? Auth : url === 'hr' ? HR : url === 'asset' ? Asset : null }/${path}`, data).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        })
    })

    return promise;
}

export default Post;