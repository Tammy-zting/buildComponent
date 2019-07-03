import './GridContent.less';
import React from 'react';
import RouteContext from '../RouteContext';
const GridContent = props => (<RouteContext.Consumer>
    {value => {
      const { children, contentWidth: propsContentWidth } = props;
      const contentWidth = propsContentWidth || value.contentWidth;
      let className = 'ant-pro-grid-content';
      if (contentWidth === 'Fixed') {
        className = 'ant-pro-grid-content wide';
      }
      return <div className={className}>{children}</div>;
    }}
  </RouteContext.Consumer>
  );
export default GridContent;
//# sourceMappingURL=index.js.map