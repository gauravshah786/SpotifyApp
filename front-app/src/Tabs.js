import React, { useState } from 'react';
import styled from 'styled-components';

import Tab from './Tab';

const StyledTabList = styled.ul`
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  height: 3rem;
  list-style: none;
`;

const Tabs = (props) => {
    const [activeTab, setActiveTab] = useState(props.defaultTab);
    
    const onClickTabItem = (tab) => {
      setActiveTab(tab);
    }

    return (
      <>
        <StyledTabList>
          {props.children.map((child) => {
            const { label } = child.props;
            const active = label === activeTab;
            return (
              <Tab
                key={label}
                active={active}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </StyledTabList>
        <div>
          {props.children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </>
    );
};

export default Tabs;
  