import styled from 'styled-components';

export const StyledFlexDiv = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
`;

export const StyledHeader = styled.header`
    background-color: #222;
    display: grid;
    grid-template-columns: 2fr 10fr 1fr;
    height: 3rem;
`;

export const StyledLogoContainer = styled(StyledFlexDiv)`
    border-right: 1px solid #264a60;
`;

export const StyledLogo = styled.div`
    color: white;
    font-size: .875rem;
    font-weight: bold;
`;

export const StyledRow = styled.div`
    border-bottom: 1px solid #e0e0e0;
    display: grid;
    grid-template-columns: ${props => props.columnsWidth};
`

export const StyledHeaderRow = styled(StyledRow)`
    border-bottom-width: 2px;
    height: 3rem;
`;

export const StyledDataRow = styled(StyledRow)`
    height: 2.5rem;
`;

export const StyledHeaderCell = styled(StyledFlexDiv)`
    font-size: .875rem;
    text-transform: uppercase;
`;

export const StyledCell = styled(StyledFlexDiv)`
    color: #777677;
    font-size: .875rem;
`;

export const StyledBodyContainer = styled.div`
    height: 22rem;
    overflow-y: scroll; 
`;

export const StyledTableFooter = styled.div`
    border: 1px #e0e0e0;
    border-style: solid none;
    display: grid;
    font-size: 0.90rem;
    grid-template-columns: 35% 30% 35%;
    height: 3rem;
`;

export const StyledButton = styled.button`
    background-color: transparent;
    border: 2px solid #41d6c3;
    border-radius: 3px;
    color: #41d6c3;
    padding: 0.325rem 1.075rem;
    text-decoration: none;
`;