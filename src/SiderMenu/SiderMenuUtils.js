
import { urlToList } from '../utils/pathTools';
const pathToRegexp = require('path-to-regexp');

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
export const getFlatMenuKeys = (menuData = []) => {
    let keys = [];
    menuData.forEach(item => {
        if (!item) {
            return;
        }
        keys.push(item.path);
        if (item.children) {
            keys = keys.concat(getFlatMenuKeys(item.children));
        }
    });
    return keys;
};
export const getMenuMatches = (flatMenuKeys = [], path) => flatMenuKeys.filter(item => item && pathToRegexp(item).test(path));
/**
 * 获得菜单子节点
 */
export const getDefaultCollapsedSubMenus = (props) => {
    const { location = { pathname: '/' }, flatMenuKeys } = props;
    return urlToList(location.pathname)
        .map(item => getMenuMatches(flatMenuKeys, item)[0])
        .filter(item => item)
        .reduce((acc, curr) => [...acc, curr], ['/']);
};
//# sourceMappingURL=SiderMenuUtils.js.map