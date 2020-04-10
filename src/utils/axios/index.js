import axios from 'axios';
// import ZWheel from 'z-wheel-0201/lib/z-wheel-0201.common';

const Axios = axios.create({
	baseURL: 'http://localhost:8080/api',
	timeout: 100000,
	responseType: 'json',
	withCredentials: false, 
});

Axios.interceptors.request.use( 
	config => {
		// ZWheel.Loading.service({});
		return config;
	}, 
	err => {
		return Promise.reject(err); 
	}
);

Axios.interceptors.response.use( 
	response => {
		// ZWheel.Loading.service.close();

		if (!response) Promise.reject('no response');

		if (response.data && typeof response.data !== 'object') Promise.reject(response);

		if(response.status !== 200) return Promise.reject(response); 

		const { errNo, data, message } = response.data;
        
		if (errNo) {
			console.log(message); // 统一$message
			return Promise.reject(data);
		}
		return data;
	}, 
	err => {
		console.log(err);
		// 鉴权
		return Promise.reject(err);
	}
);

export default Axios;

// https://blog.csdn.net/bamboozjy/article/details/81364290

