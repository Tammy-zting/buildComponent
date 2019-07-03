import './index.less';
import React, { Component } from 'react';
import { Icon } from 'antd';
import { defaultRenderLogo } from '../SiderMenu/SiderMenu';
import { isBrowser } from '../utils/utils';
const  debounce = require('lodash/debounce');
const defaultRenderCollapsedButton = (collapsed) => <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
export default class GlobalHeader extends Component {
    constructor() {
        super(...arguments);
        this.triggerResizeEvent = debounce(() => {
            const event = document.createEvent('HTMLEvents');
            event.initEvent('resize', true, false);
            if (isBrowser()) {
                window.dispatchEvent(event);
            }
        });
        this.toggle = () => {
            const { collapsed, onCollapse } = this.props;
            if (onCollapse)
                onCollapse(!collapsed);
            this.triggerResizeEvent();
        };
        this.renderCollapsedButton = () => {
            const { collapsed, collapsedButtonRender = defaultRenderCollapsedButton, menuRender, } = this.props;
            if (collapsedButtonRender !== false && menuRender !== false) {
                return  <span className="ant-pro-global-header-trigger" onClick={this.toggle}>
                {collapsedButtonRender(collapsed)}
              </span>
            }
            return null;
        };
    }
    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }
    render() {
        const { isMobile, logo, rightContentRender } = this.props;
        return (
            <div className="ant-pro-global-header">
              {isMobile && (
                <a className="ant-pro-global-header-logo" key="logo">
                  {defaultRenderLogo(logo)}
                </a>
              )}
              {this.renderCollapsedButton()}
              {rightContentRender && rightContentRender(this.props)}
            </div>
          );
    }
}
//# sourceMappingURL=index.js.map