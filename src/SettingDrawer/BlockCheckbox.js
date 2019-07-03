import { Icon, Tooltip } from 'antd';
import React from 'react';
const baseClassName = 'ant-pro-setting-drawer-block-checbox';
const BlockCheckbox = ({ value, onChange, list, }) =>  <div className={baseClassName} key={value}>
{list.map(item => (
  <Tooltip title={item.title} key={item.key}>
    <div
      className={`${baseClassName}-item`}
      onClick={() => onChange(item.key)}
    >
      <img src={item.url} alt={item.key} />
      <div
        className={`${baseClassName}-selectIcon`}
        style={{
          display: value === item.key ? 'block' : 'none',
        }}
      >
        <Icon type="check" />
      </div>
    </div>
  </Tooltip>
))}
</div>
export default BlockCheckbox;
//# sourceMappingURL=BlockCheckbox.js.map