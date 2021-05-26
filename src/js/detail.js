import './imports';
import { getUrlQueryValue } from '../libs/utils';

import Header from '../components/Header';
import NewsFrame from '../components/Iframe';
import Follow from '../components/Follow';

;((doc) => {

    const oApp = doc.querySelector('#app');
    const currentNews = JSON.parse(localStorage.getItem('currentNews'));
    const followedList = JSON.parse(localStorage.getItem('followedList') || '[]');

    const init = () => {
        render();
        bindEvent();
    }

    function render() {
        const headerTpl = Header.tpl({
            url: getUrlQueryValue('path'),
            title: '新闻详情',
            showLeftIcon: true,
            showRightIcon: false
        });
        const newsFrameTpl = NewsFrame.tpl(currentNews.url);
        const followTpl = createFollowTpl();

        oApp.innerHTML += headerTpl + newsFrameTpl + followTpl;
    }

    function bindEvent() {
        Follow.bindEvent(doFollow);
    }

    function createFollowTpl() {
        const isExist = followedList.find(item => item.uniquekey === currentNews.uniquekey);

        return isExist ? Follow.follow() : Follow.unfollow();
    }

    function doFollow(status) {
        let followedList = JSON.parse(localStorage.getItem('followedList') || '[]');

        if (status) {
            followedList.push(currentNews);
        } else {
            followedList = followedList.filter(item => item.uniquekey !== currentNews.uniquekey);
        }

        localStorage.setItem('followedLiat', JSON.stringify(followedList));
    }

    init();
})(document);