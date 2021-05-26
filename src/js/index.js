import './imports';

import request from '../models/index';
import { NEWS_TYPE } from '../data';
import { scrollToBottom } from '../libs/utils';

import Header from '../components/Header';
import NavBar from '../components/NavBar';
import NewsList from '../components/NewsList';
import PageLoading from '../components/PageLoading';

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
        window.addEventListener('scroll', scrollToBottom, false);
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
        config.pageNum = 0;
        oListWrapper.innerHTML = '';
        setNewsList();
    }

    async function setNewsList() {
        const { type, count, pageNum } = config;

        if (newsData[type]) {
            renderList(newsData[type][pageNum]);
            return;
        }

        oListWrapper.innerHTML = PageLoading.tpl();
        newsData[type] = await request.getNewsList(type, count);
        setTimeout(() => {
            oListWrapper.innerHTML = '';
            renderList(newsData[type][pageNum]);
        }, 1500);
    }

    init();
})(document);