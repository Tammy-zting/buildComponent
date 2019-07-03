import './Header.less';
import React, { Component } from 'react';
import { Layout } from 'antd';
import GlobalHeader from './GlobalHeader';
import TopNavHeader from './TopNavHeader';
const { Header } = Layout;
class HeaderView extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            visible: true,
        };
        this.ticking = false;
        this.oldScrollTop = 0;
        this.getHeadWidth = () => {
            const { isMobile, collapsed, fixedHeader, layout, siderWidth = 256, } = this.props;
            if (isMobile || !fixedHeader || layout === 'topmenu') {
                return '100%';
            }
            return collapsed ? 'calc(100% - 80px)' : `calc(100% - ${siderWidth}px)`;
        };
        this.handScroll = () => {
            const { autoHideHeader } = this.props;
            const { visible } = this.state;
            if (!autoHideHeader) {
                return;
            }
            const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
            if (!this.ticking) {
                this.ticking = true;
                requestAnimationFrame(() => {
                    if (this.oldScrollTop > scrollTop) {
                        this.setState({
                            visible: true,
                        });
                    }
                    else if (scrollTop > 300 && visible) {
                        this.setState({
                            visible: false,
                        });
                    }
                    else if (scrollTop < 300 && !visible) {
                        this.setState({
                            visible: true,
                        });
                    }
                    this.oldScrollTop = scrollTop;
                    this.ticking = false;
                });
            }
        };
        this.renderContent = () => {
            const { isMobile, handleMenuCollapse, navTheme, layout, headerRender, } = this.props;
            const isTop = layout === 'topmenu';
            let defaultDom = <GlobalHeader onCollapse={handleMenuCollapse} {...this.props} />
            if (isTop && !isMobile) {
                defaultDom = (
                    <TopNavHeader
                      theme={navTheme}
                      mode="horizontal"
                      onCollapse={handleMenuCollapse}
                      {...this.props}
                    />
                )
            }
            if (headerRender) {
                return headerRender(this.props);
            }
            return defaultDom;
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (!props.autoHideHeader && !state.visible) {
            return {
                visible: true,
            };
        }
        return null;
    }
    componentDidMount() {
        document.addEventListener('scroll', this.handScroll, { passive: true });
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.handScroll);
    }
    render() {
        const { fixedHeader } = this.props;
        const { visible } = this.state;
        const width = this.getHeadWidth();
        return visible ? (
            <Header
              style={{ padding: 0, width, zIndex: 2 }}
              className={fixedHeader ? 'ant-pro-fixed-header' : ''}
            >
              {this.renderContent()}
            </Header>
          ) : null;
    }
}
export default HeaderView;
//# sourceMappingURL=Header.js.map