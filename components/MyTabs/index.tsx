import React, { useState } from 'react';
import './index.scss'
import classNames from 'classnames';

// Tabs组件
const MyTabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = React.Children.toArray(children);
  const tabPanes:any= tabs.filter((child, index) => index % 2 !== 0);
  const tabTitles:any = tabs.filter((child, index) => index % 2 === 0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <div className='tabs_wrapper'>
      <ul className="tabs-titles border_color_theme">
        {tabTitles.map((title, index) => (
          <li
            
            key={index}
            className={classNames('tab-title', { active: activeTab === index })}
            onClick={() => handleTabClick(index)}
          >
            {title}
          </li>
        ))}
      </ul>
      <div className="tabs-content">
        {tabPanes.map((pane, index) =>
          pane.props.children ? (
            <div
              key={index}
              className={activeTab === index ? 'active' : 'hidden'}
            >
              {pane.props.children}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};


export const TabTitle = ({ children }) => {
    return <span>{children}</span>;
  };
  
  // TabPane组件
  export const TabPane = ({ children }) => {
    return <div>{children}</div>;
  };

export default MyTabs