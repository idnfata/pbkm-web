import Get from './Get';
import Post from './Post';
import Put from './Put';
import Delete from './Delete';
import { userData, userLogin, userLogout, userDelete } from './Auth';
import { getHRDashboard } from './HR';




const getNewsBlog = () => Get('url1', 'posts?_sort=id&order=desc')

//url, endpoint,  menerima data dari yang memamnggil dan data dikirimkan ke fungsi Post
const postNewsBlog = (data) => Post('url2', 'posts', data);

const updateNewsBlog = (data, id) => Put('url2', `posts/${id}`, data);

const deleteNewsBlog = (id) => Delete('url2', `posts/${id}`);

const API = {
    userLogin,
    userLogout,
    userData,
    userDelete,
    getHRDashboard
}


export default API;

export * from './Auth'