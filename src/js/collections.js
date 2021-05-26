import './imports';

import Header from '../components/Header';
import NewsList from '../components/NewsList';
import NoDataTip from '../components/NoDataTip';

;((doc) => {

    const oApp = doc.querySelector('#app');
    const followedList = JSON.parse(localStorage.getItem('followedList') || '[]');

    let oListWrapper = null;

    const init = () => {
        render();
        bindEvent();
    }

    function render() {
        const headerTpl = Header.tpl({
            url: '/',
            title: '我的新闻',
            showLeftIcon: true,
            showRightIcon: false
        });

        if (followedList.length) {
            const listWrapperTpl = NewsList.listTpl(44);
            oApp.innerHTML += (headerTpl + listWrapperTpl);
            oListWrapper = oApp.querySelector('.news-list');
            renderList(followedList);
        } else {
            oApp.innerHTML += (headerTpl + NoDataTip.tpl());
        }
    }

    function renderList(data) {
        const newsListTpl = NewsList.tpl({
            data,
            pageNum: -1
        });
        oListWrapper.innerHTML += newsListTpl;
        NewsList.imgShow();
    }

    function bindEvent() {
        followedList.length && NewsList.bindEvent(oListWrapper, setCurrentNews);
    }

    function setCurrentNews(options) {
        const { index } = options;
        const currentNews = followedList[index];
        localStorage.setItem('currentNews', JSON.stringify(currentNews));
    }

    init();
})(document);