import styled from 'styled-components';

export const ContainerBoard = styled.div`
  display: flex;
  padding: 30px 0;
  height: calc(100vh - 102px);
  overflow-x: auto;
  position: absolute;
  bottom: 0;
  
  /* Estilos da barra de rolagem */
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    padding: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #F4F4F4;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #79A2FE;
    border-radius: 10px;
  }
`;