import './ThemeColor.less';
import { Icon, Tooltip } from 'antd';
import React from 'react';
const Tag = ({ color, check, ...rest }) => <div {...rest} style={{ backgroundColor: color }}>
{check ? <Icon type="check" /> : ''}
</div>
const ThemeColor = ({ colors, title, value, onChange, formatMessage, }) => {
    const colorList = colors || [
        {
            key: 'dust',
            color: '#F5222D',
        },
        {
            key: 'volcano',
            color: '#FA541C',
        },
        {
            key: 'sunset',
            color: '#FAAD14',
        },
        {
            key: 'cyan',
            color: '#13C2C2',
        },
        {
            key: 'green',
            color: '#52C41A',
        },
        {
            key: 'daybreak',
            color: '#1890FF',
        },
        {
            key: 'geekblue',
            color: '#2F54EB',
        },
        {
            key: 'purple',
            color: '#722ED1',
        },
    ];
    return (
        <div className="theme-color">
          <h3 className="theme-color-title">{title}</h3>
          <div className="theme-color-content">
            {colorList.map(({ key, color }) => (
              <Tooltip
                key={color}
                title={formatMessage({ id: `app.setting.themecolor.${key}` })}
              >
                <Tag
                  className="theme-color-block"
                  color={color}
                  check={value === color}
                  onClick={() => onChange && onChange(color)}
                />
              </Tooltip>
            ))}
          </div>
        </div>
      );
};
export default ThemeColor;
//# sourceMappingURL=ThemeColor.js.map