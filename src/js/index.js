import './imports';

import request from '../models/index';
import { NEWS_TYPE } from '../data';

import Header from '../components/Header';
import NavBar from '../components/NavBar';
import NewsList from '../components/NewsList';

;((doc) => {

    const oApp = doc.querySelector('#app');
    let oListWrapper = null;

    const config = {
        type: 'top',
        count: 10,
        pageNum: 0,

    }

    const newsData = {

    }

    const init = async () => {
        render();
        await setNewsList();
        bindEvent();
    }

    function bindEvent() {
        NavBar.bindEvent(setType);
    }

    function render() {
        const headerTpl = Header.tpl({
            url: '/',
            title: '新闻头条',
            showLeftIcon: false,
            showRightIcon: true
        });
        const navBarTpl = NavBar.tpl(NEWS_TYPE);
        const newsListTpl = NewsList.listTpl(82);

        oApp.innerHTML += headerTpl + navBarTpl + newsListTpl;
        oListWrapper = oApp.querySelector('.news-list');
    }

    function renderList(data) {
        const { pageNum } = config;
        const newsItemTpl = NewsList.tpl({
            data,
            pageNum
        });
        oListWrapper.innerHTML += newsItemTpl;
        NewsList.imgShow();
    }

    function setType(type) {
        config.type = type;
        console.log(config.type);
    }

    async function setNewsList() {
        const { type, count, pageNum } = config;

        if (newsData[type]) {
            return;
        }

        newsData[type] = await request.getNewsList(type, count);
        renderList(newsData[type][pageNum]);
    }

    init();
})(document);