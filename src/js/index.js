import './imports';

import request from '../models/index';

async function getData() {
    const data = await request.getNewsList('top', 10);
    console.log(data);
}

getData();