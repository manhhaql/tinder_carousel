import axios from 'axios';

class HTTPRequest {
    constructor() { };

    static get({ url = "https://randomuser.me/api/0.4/?randomapi"}) {
        return axios({
            timeout: 36000,
            method: 'get',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
    };
};

export default HTTPRequest;