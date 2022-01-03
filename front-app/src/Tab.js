import React from 'react';
import styled from 'styled-components';

const StyledTab = styled.li`
  color: #1d3649;
  cursor: pointer;
  padding: 1rem 1rem;
  position: relative;
  &:hover {
    color: #a6266e;
  }
  &:before {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #a6266e;
    content: '';
    height: ${ props => (props.active ? '2px' : '0px') };
  }
`;

const Tab = ({ active, label, onClick }) => { 

    const handleClick = () => {
      onClick(label);
    }

    return (
      <StyledTab id={label} active={active} onClick={handleClick}> 
        {label} 
      </StyledTab>
    );
}

export default Tab;