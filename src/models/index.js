import HTTP from '../libs/http';
import { BASE_URL, KEY } from '../config';
import { setPageData } from '../libs/utils';

class Service extends HTTP {
    getNewsList(type, count) {
        return new Promise((resolve, reject) => {
            this.ajax({
                url: '/api/toutiao/index',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    type,
                    key: KEY
                },
                success(data) {
                    console.log(data);
                    const pageData = setPageData(data.result.data, count);
                    resolve(pageData);
                },
                error(err) {
                    reject(err);
                }
            });
        });
    }
}

export default new Service();