import styled from 'styled-components';
export const CellContainer = styled.div`
  display: flex;
  cursor: pointer;
  padding: 5px;
  min-height: 90px;
  margin: 4px 0;
  box-shadow: rgba(0, 0, 0, 0.21) 0px 0px 3px 1px;
  flex-direction: column;
  line-height: 1;
  position: relative;
  transition: all 0.3s ease-in-out;
  
  &:hover  {
    box-shadow: rgba(0, 0, 0, 0.21) 0px 0px 12px 5px;
  }
`;
export const CellContent = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  line-height: 1;
`;
export const CellContentRight = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis:50%;
  justify-content: end;
  padding: 5px;
  line-height: 1;
  color: #64b76d;
`;
export const CellContentLeft = styled.div`
  display: flex;
  flex-basis:50%;
  flex-direction: column;
  text-align: left;
  padding: 5px;
  line-height: 1;
`;