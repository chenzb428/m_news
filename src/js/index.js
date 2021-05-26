import './imports';

import request from '../models/index';
import { NEWS_TYPE } from '../data';

import Header from '../components/Header';
import NavBar from '../components/NavBar';

;((doc) => {

    const oApp = doc.querySelector('#app');

    const config = {
        type: 'top',
        count: 10
    }

    const newsData = {

    }

    const init = async () => {
        render();
        bindEvent();
        await setNewsList();
    }

    function render() {
        const headerTpl = Header.tpl({
            url: '/',
            title: '新闻头条',
            showLeftIcon: false,
            showRightIcon: true
        });
        const navBarTpl = NavBar.tpl(NEWS_TYPE);

        oApp.innerHTML += headerTpl + navBarTpl;
    }

    function bindEvent() {
        NavBar.bindEvent(setType);
    }

    function setType(type) {
        config.type = type;
        console.log(config.type);
    }

    async function setNewsList() {
        const { type, count } = config;

        if (newsData[type]) {
            return;
        }

        newsData[type] = await request.getNewsList(type, count);
        console.log(newsData);
    }

    init();
})(document);