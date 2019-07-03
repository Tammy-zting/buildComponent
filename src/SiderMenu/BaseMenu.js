import './index.less';
import { Icon, Menu } from 'antd';
import React, { Component } from 'react';
import classNames from 'classnames';
import defaultSettings from '../defaultSettings';
import { getMenuMatches } from './SiderMenuUtils';
import { isUrl } from '../utils/utils';
import { urlToList } from '../utils/pathTools';
const { SubMenu } = Menu;
let IconFont = Icon.createFromIconfontCN({
    scriptUrl: defaultSettings.iconfontUrl,
});
// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,
const getIcon = (icon) => {
    if (typeof icon === 'string') {
        if (isUrl(icon)) {
          return (
            <Icon
              component={() => (
                <img src={icon} alt="icon" className="ant-pro-sider-menu-icon" />
              )}
            />
          );
        }
        if (icon.startsWith('icon-')) {
          return <IconFont type={icon} />;
        }
        return <Icon type={icon} />;
      }
      return icon;
};
export default class BaseMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        /**
         * 获得菜单子节点
         */
        this.getNavMenuItems = (menusData = []) => menusData
            .filter(item => item.name && !item.hideInMenu)
            .map(item => this.getSubMenuOrItem(item))
            .filter(item => item);
        // Get the currently selected menu
        this.getSelectedMenuKeys = (pathname) => {
            const { flatMenuKeys } = this.props;
            return urlToList(pathname)
                .map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop())
                .filter(item => item);
        };
        /**
         * get SubMenu or Item
         */
        this.getSubMenuOrItem = (item) => {
            if (
                Array.isArray(item.children) &&
                !item.hideChildrenInMenu &&
                item.children.some(child => child && !!child.name)
              ) {
                const name = this.getIntlName(item);
                return (
                  <SubMenu
                    title={
                      item.icon ? (
                        <span>
                          {getIcon(item.icon)}
                          <span>{name}</span>
                        </span>
                      ) : (
                        name
                      )
                    }
                    key={item.path}
                  >
                    {this.getNavMenuItems(item.children)}
                  </SubMenu>
                );
              }
              return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
        };
        this.getIntlName = (item) => {
            const { name, locale } = item;
            const { menu = {
                locale: false,
            }, formatMessage, } = this.props;
            if (locale && menu.locale && formatMessage) {
                return formatMessage({
                    id: locale,
                    defaultMessage: name,
                });
            }
            return name;
        };
        /**
         * 判断是否是http链接.返回 Link 或 a
         * Judge whether it is http link.return a or Link
         * @memberof SiderMenu
         */
        this.getMenuItemPath = (item) => {
            const itemPath = this.conversionPath(item.path);
            const icon = getIcon(item.icon);
            const {
              location = { pathname: '/' },
              isMobile,
              onCollapse,
              menuItemRender,
            } = this.props;
            const { target } = item;
            // if local is true formatMessage all name。
            const name = this.getIntlName(item);
            let defaultItem = (
              <>
                {icon}
                <span>{name}</span>
              </>
            );
            const isHttpUrl = isUrl(itemPath);
            // Is it a http link
            if (isHttpUrl) {
              defaultItem = (
                <a href={itemPath} target={target}>
                  {icon}
                  <span>{name}</span>
                </a>
              );
            }
            if (menuItemRender) {
              return menuItemRender(
                {
                  ...item,
                  isUrl: isHttpUrl,
                  itemPath,
                  isMobile,
                  replace: itemPath === location.pathname,
                  onClick: () => onCollapse && onCollapse(true),
                },
                defaultItem,
              );
            }
            return defaultItem;
        };
        this.conversionPath = (path) => {
            if (path && path.indexOf('http') === 0) {
                return path;
            }
            return `/${path || ''}`.replace(/\/+/g, '/');
        };
        this.getPopupContainer = (fixedHeader, layout) => {
            if (fixedHeader && layout === 'topmenu' && this.warp) {
                return this.warp;
            }
            return document.body;
        };
        this.getRef = (ref) => {
            this.warp = ref;
        };
        const { iconfontUrl } = props;
        // reset IconFont
        if (iconfontUrl) {
            IconFont = Icon.createFromIconfontCN({
                scriptUrl: iconfontUrl,
            });
        }
    }
    static getDerivedStateFromProps(props) {
        const { iconfontUrl } = props;
        // reset IconFont
        if (iconfontUrl) {
            IconFont = Icon.createFromIconfontCN({
                scriptUrl: iconfontUrl,
            });
        }
        return null;
    }
    render() {
        const { openKeys, theme, mode, location = {
            pathname: '/',
        }, className, collapsed, handleOpenChange, style, fixedHeader = false, layout = 'sidemenu', menuData, } = this.props;
        // if pathname can't match, use the nearest parent's key
        let selectedKeys = this.getSelectedMenuKeys(location.pathname);
        if (!selectedKeys.length && openKeys) {
            selectedKeys = [openKeys[openKeys.length - 1]];
        }
        let props = {};
        if (openKeys && !collapsed && layout === 'sidemenu') {
            props = {
                openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
            };
        }
        const cls = classNames(className, {
            'top-nav-menu': mode === 'horizontal',
        });
        return (
            <>
              <Menu
                {...props}
                key="Menu"
                mode={mode}
                theme={theme}
                onOpenChange={handleOpenChange}
                selectedKeys={selectedKeys}
                style={style}
                className={cls}
                getPopupContainer={() => this.getPopupContainer(fixedHeader, layout)}
              >
                {this.getNavMenuItems(menuData)}
              </Menu>
              <div ref={this.getRef} />
            </>
          );
    }
}
BaseMenu.defaultProps = {
    flatMenuKeys: [],
    onCollapse: () => undefined,
    isMobile: false,
    openKeys: [],
    collapsed: false,
    handleOpenChange: () => undefined,
    menuData: [],
    onOpenChange: () => undefined,
};
//# sourceMappingURL=BaseMenu.js.map