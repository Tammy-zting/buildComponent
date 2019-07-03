import './index.less';
import React, { Component } from 'react';
import { defaultRenderLogo } from '../SiderMenu/SiderMenu';
import BaseMenu from '../SiderMenu/BaseMenu';
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';
import { isBrowser } from '../utils/utils';
export default class TopNavHeader extends Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.maim = null;
    }
    static getDerivedStateFromProps(props) {
        const { contentWidth } = props;
        const innerWidth = isBrowser() ? window.innerWidth : 0;
        return {
            maxWidth: (contentWidth === 'Fixed' && innerWidth > 1200 ? 1200 : innerWidth) -
                280 -
                120,
        };
    }
    render() {
        const { theme, menuData, logo, title, contentWidth, rightContentRender, } = this.props;
        const { maxWidth } = this.state;
        const flatMenuKeys = getFlatMenuKeys(menuData);
        const baseClassName = 'ant-pro-top-nav-header';
        return (
            <div className={`${baseClassName} ${theme === 'light' ? 'light' : ''}`}>
              <div
                ref={ref => {
                  this.maim = ref;
                }}
                className={`${baseClassName}-main ${
                  contentWidth === 'Fixed' ? 'wide' : ''
                }`}
              >
                <div className={`${baseClassName}-left`}>
                  <div className={`${baseClassName}-logo`} key="logo" id="logo">
                    <a>
                      {defaultRenderLogo(logo)}
                      <h1>{title}</h1>
                    </a>
                  </div>
                </div>
                <div
                  style={{ maxWidth, flex: 1 }}
                  className={`${baseClassName}-menu`}
                >
                  <BaseMenu {...this.props} flatMenuKeys={flatMenuKeys} />
                </div>
                {rightContentRender &&
                  rightContentRender({
                    ...this.props,
                  })}
              </div>
            </div>
          );
    }
}
//# sourceMappingURL=index.js.map