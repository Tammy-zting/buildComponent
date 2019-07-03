import './index.less';
import React from 'react';
import classNames from 'classnames';
export default ({ className, links, copyright }) => {
    const clsString = classNames('ant-pro-global-footer', className);
    return (
        <footer className={clsString}>
          {links && (
            <div className="ant-pro-global-footer-links">
              {links.map(link => (
                <a
                  key={link.key}
                  title={link.key}
                  target={link.blankTarget ? '_blank' : '_self'}
                  href={link.href}
                >
                  {link.title}
                </a>
              ))}
            </div>
          )}
          {copyright && (
            <div className="ant-pro-global-footer-copyright">{copyright}</div>
          )}
        </footer>
      );
};
//# sourceMappingURL=index.js.map