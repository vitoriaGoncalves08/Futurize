import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  border-top: 20px solid rgba(230, 236, 245, 0.4);
  cursor: grab;

  header {
    position: absolute;
    top: -22px;
    left: 15px;
  }

  p {
    display: flex;
    align-items: center;
    font-size: 15px;
  }

  .Data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    color: #c8c8c8;
  }

  .Checkdata {
    display: flex;
  }

  .Prioridade p {
    display: flex;
  }

  .TempoPerfil {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .Pessoa {
    display: flex;
  }

  Perfil,
  img {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: 1px solid;
    margin-top: 7px;
  }

  ${(props) =>
    props.isDragging &&
    css`
      border: 2px dashed rgba(0, 0, 0, 0.2);
      padding-top: 31px;
      border-radius: 0;
      background: transparent;
      box-shadow: none;
      cursor: grabbing;

      p,
      img,
      header {
        opacity: 0;
      }
    `}
`;

export const Label = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  display: inline-block;
  background: ${(props) => props.color};
`;
