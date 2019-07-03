/**
 * Entrypoint of the Remote Component.
 */
import BasicLayout from './BasicLayout';
import DefaultHeader from './Header';
import SettingDrawer from './SettingDrawer';
import DefaultFooter from './Footer';
import GridContent from './GridContent';
import PageHeaderWrapper from './PageHeaderWrapper';
import RouteContext from './RouteContext';
import getMenuData from './utils/getMenuData';
import getPageTitle from './getPageTitle';

const AntdProLayout ={ BasicLayout, RouteContext, GridContent, DefaultHeader, DefaultFooter, SettingDrawer, getPageTitle, getMenuData, PageHeaderWrapper };
exports.name = 'AntdProLayout';
exports.default = AntdProLayout;
export default AntdProLayout;