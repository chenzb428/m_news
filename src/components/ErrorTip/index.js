import tpl from './index.tpl';
import './index.scss';
import { tplReplace } from '../../libs/utils';

export default {
    name: 'ErrorTip',
    tpl(options) {
        const { text } = options;
        return tplReplace(tpl, {
            text
        });
    }
}