import axios from 'axios';

let csrfToken : string = '';

axios.interceptors.response.use(
    (response) => {
        // 응답 200번대일 때 헤더에서 CSRF 토큰을 추출하여 변수에 저장
        csrfToken = response.headers['x-csrf-token'];
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const addCsrfToken = (/** @type {{}} */ headers : {}) => {
    // API 요청 시 헤더에 CSRF 토큰 추가
    if (csrfToken !== '') {
        return {
            ...headers,
            'X-CSRF-Token': csrfToken,
        };
    } else {
        return headers;
    }
};


const send = async ({ method='', path='', data={} }) => {
    const commonUrl = '/api';
    const url = commonUrl + path;

    const options = { // 만들어진 값들을 모아 객체로 만듦
        method,
        url,
        data,
        withCredentials: true,
        // 프론트-백 포트 다름, 이 옵션 true로 설정해야 정상적으로 서버에 쿠키 작성
        headers: addCsrfToken({
            "SameSite": "None",
        }),
    };

    try {
        return await axios(options); // 만들어진 값들 호출
    }
    catch(err) {
        throw err
    }
};

const getApi = async ({path=''}) => {
    return await send({method: 'GET', path});
}

const postApi = async ({path='', data={}}) => {
    return await send({method: 'POST', path, data});
}

const patchApi = async ({path='', data={}}) => {
    return await send({method: 'PATCH', path, data});
}

const delApi = async ({path='', data={}}) => {
    return await send({method: 'DELETE', path, data});
}

const errHandler = (status : number) => {
    switch (status) {
        case 400:
            alert('잘못된 요청입니다. 다시 시도해 주세요.');
            break;
        case 401:
            alert('로그인이 필요한 서비스입니다. 로그인 후 이용해 주세요.');
            break;
        case 403:
            alert('접근 권한이 없습니다.');
            break;
        case 404:
            alert('요청하신 페이지를 찾을 수 없습니다.');
            break;
        case 422:
            alert('요청한 데이터가 올바르지 않습니다.');
            break;
        case 500:
            alert('서버에 문제가 발생했습니다.');
            break;
        default:
            alert('오류가 발생했습니다.');
            break;
    }
}

export {
    getApi,
    postApi,
    patchApi,
    delApi,
    errHandler,
}