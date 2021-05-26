import './imports';

import { NEWS_TYPE } from '../data';

import Header from '../components/Header';
import NavBar from '../components/NavBar';

;((doc) => {

    const oApp = doc.querySelector('#app');

    const config = {
        type: 'top'
    }

    const init = () => {
        render();
        bindEvent();
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

    init();
})(document);