import itemTpl from './tpl/item.tpl';
import listTpl from './tpl/index.tpl'
import './index.scss';

import { tplReplace } from '../../libs/utils';
import { scrollToTop } from '../../libs/utils';

export default {
    name: 'NavBar',
    _curIdx: 0,
    tpl(options) {
        let itemList = '';

        options.forEach(({ type, title }, index) => {
            itemList += tplReplace(itemTpl, {
                isCurrent: !index ? 'current' : '',
                type,
                title
            });
        });

        return tplReplace(listTpl, {
            itemList,
            wrapperW: .6 * options.length
        });
    },
    bindEvent(setType) {
        const oNavBar = document.querySelector('.nav'),
              oNavItems = document.querySelectorAll('.item');

        oNavBar.addEventListener('click', this._setNav.bind(this, oNavItems, setType), false);
    },
    _setNav(items, setType) {
        const target = arguments[2].target,
              className = target.className.trim();
        
        if (className === 'item') {
            const type = target.dataset.type;
            setType(type);
            scrollToTop();
            items[this._curIdx].className = 'item';
            this._curIdx = [].indexOf.call(items, target);
            items[this._curIdx].className += ' current';
        }
    }
}