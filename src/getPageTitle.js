const pathToRegexp = require('path-to-regexp');

export const matchParamsPath = (pathname, breadcrumb) => {
    if (breadcrumb) {
        const pathKey = Object.keys(breadcrumb).find(key => pathToRegexp(key).test(pathname));
        if (pathKey) {
            return breadcrumb[pathKey];
        }
    }
    return {
        path: '',
    };
};
const getPageTitle = (props) => {
    const { pathname, breadcrumb, formatMessage, title = 'Ant Design Pro', menu = {
        locale: false,
    }, } = props;
    if (!pathname) {
        return title;
    }
    const currRouterData = matchParamsPath(pathname, breadcrumb);
    if (!currRouterData) {
        return title;
    }
    let pageName = currRouterData.name;
    if (menu.locale && currRouterData.locale) {
        pageName = formatMessage({
            id: currRouterData.locale || '',
            defaultMessage: currRouterData.name,
        });
    }
    if (!pageName) {
        return title;
    }
    return `${pageName} - ${title}`;
};
export default getPageTitle;
//# sourceMappingURL=getPageTitle.js.map