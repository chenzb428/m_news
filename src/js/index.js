import './imports';

import request from '../models/index';
import { NEWS_TYPE } from '../data';
import { scrollToBottom } from '../libs/utils';

import Header from '../components/Header';
import NavBar from '../components/NavBar';
import NewsList from '../components/NewsList';
import PageLoading from '../components/PageLoading';
import MoreLoading from '../components/MoreLoading';
import ErrorTip from '../components/ErrorTip';

;((doc) => {

    const oApp = doc.querySelector('#app');
    let oListWrapper = null;
    let t = null;

    const config = {
        type: 'top',
        count: 10,
        pageNum: 0,
        isLoading: false
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
        NewsList.bindEvent(oListWrapper, setCurrentNews);
        window.addEventListener('scroll', scrollToBottom.bind(null, getMoreList), false);
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
        MoreLoading.remove(oListWrapper);
        oListWrapper.innerHTML += newsItemTpl;
        config.isLoading = false;
        NewsList.imgShow();
    }

    function setType(type) {
        config.type = type;
        config.pageNum = 0;
        config.isLoading = false;
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
        newsData[type] = await request.getNewsList(type, count).catch(error => {
            oListWrapper.innerHTML = '';
            oListWrapper.innerHTML += ErrorTip.tpl({
                text: '没有找到网络！'
            });
        });
        if (newsData[type]) {
            setTimeout(() => {
                oListWrapper.innerHTML = '';
                renderList(newsData[type][pageNum]);
            }, 1500);
        }
    }

    function getMoreList() {
        if (!config.isLoading) {
            config.pageNum ++;
            clearTimeout(t);
            const { pageNum, type } = config;
            if (pageNum >= newsData[type].length) {
                MoreLoading.add(oListWrapper, false);
            } else {
                config.isLoading = true;
                MoreLoading.add(oListWrapper, true);
                t = setTimeout(() => {
                    setNewsList();
                }, 1500);
            }
        }
    }

    function setCurrentNews(options) {
        const { index, pageNum } = options;
        const currentNews = newsData[config.type][pageNum][index];
        localStorage.setItem('currentNews', JSON.stringify(currentNews));
    }

    init();
})(document);