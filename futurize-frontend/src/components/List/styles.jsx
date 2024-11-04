import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 15px;
  height: 100%;
  flex: 0 0 320px;
  opacity: ${(props) => (props.done ? 0.6 : 1)};

  & + div {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;
    margin-bottom: 20px;

    h2 {
      font-weight: 500;
      font-size: 16px;
      padding: 0 10px;
      margin-top: 10px;
    }

    button {
      width: 42px;
      height: 42px;
      border-radius: 18px;
      background: #3b5bfd;
      border: 0;
      cursor: pointer;
    }
  }

  .CamadaTime {
    display: flex;
    margin-left: 10px;
    color: #c8c8c8;
    gap: 25px;
    margin-bottom: 15px;
  }

  .Camada {
    display: flex;
  }

  .Time {
    display: flex;
  }

  ul {
    margin-top: 15px;
    display: block;
  }
`;
