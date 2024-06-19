import styled from "styled-components";
import { lg, sm } from "../../../BreakPoints";

export const Container = styled.div`
  background: linear-gradient(rgb(234, 230, 255), rgb(255, 255, 255)) no-repeat;
  color: rgb(9, 30, 66);
  width: 100%;
  display: flex;
  justify-content: center;
  color: #091e42;
`;

export const Content = styled.section`
  display: flex;
  min-height: 100vh;
  padding-top: 4rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10%;
  ${lg({
    flexDirection: "column-reverse",
    paddingTop: "6rem",
    alignItems: "stretch",
    gap: "5%",
  })}

  ${sm({
    flexDirection: "column-reverse",
    paddingTop: "4rem",
    alignItems: "stretch",
    gap: "5%",
  })}

  
`;

export const LeftSide = styled.div`
  box-sizing: border-box;
  flex: 1;
`;
export const LeftWrapper = styled.div`
  width: 39rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  ${lg({
    width: "30rem",
    alignItems: "center",
  })}

  ${sm({
    width: "19rem",
    alignItems: "center",
  })}
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  padding-top:50px;
  ${lg({
    fontSize: "2rem",
    textAlign: "center",
  })}

  ${sm({
    fontSize: "1.5rem",
    textAlign: "center",
  })}
`;

export const Text = styled.h3`
  margin-top: 0.5rem;
  font-family: "Charlie Text", sans-serif;
  font-size: 1.3rem;
  text-align: left;
  line-height: 1.5;
  ${lg({
    fontSize: "1.1rem",
    textAlign: "center",
    padding: "0 2rem",
  })}

  ${sm({
    fontSize: "1rem",
    textAlign: "center",
    padding: "0 1rem",
  })}
`;

export const Button = styled.button`
  margin-top: 2rem;
  font-size: 1.25rem;
  background-color: #0065ff;
  width: fit-content;
  border-radius: 0.4rem;
  padding: 0.75rem 2rem;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0952cc;
  }

  ${lg({
    marginTop: "1.5rem",
    width: "100%",
  })}

  ${sm({
    marginTop: "1.5rem",
    width: "100%",
  })}
`;

export const RightSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  ${lg({
    maxHeight: "300px",
  })}

  ${sm({
    maxHeight: "200px",
  })}
`;

export const SvgItem = styled.img`
  width: 600px;
  aspect-ratio: auto 465.5 / 602.5;
  height: 600px

  ${lg({
    width: "500px",
    height: "500px",
  })}

  ${sm({
    width: "300px",
    height: "300px",
  })}
`;
