import React, { useEffect } from "react";
import IndexNav from "../../IndexNav";
import { useNavigate } from "react-router-dom";
import indexImage from '../../../Images/indexImage.png'
import {
  Container,
  Content,
  LeftSide,
  RightSide,
  LeftWrapper,
  Title,
  Text,
  Button,
  SvgItem,
} from "./Styled";

const Index = () => {
  let navigate = useNavigate();
  useEffect(() => {
    document.title = "TaskFlow"
  }, [])
  return (
    <>
      <IndexNav />
      <Container>
        <Content>
          <LeftSide>
            <LeftWrapper>
              <Title>TaskFlow TaskManagement System.</Title>
              <Text>
                Collaborate, manage projects, and reach new productivity peaks.
                From high rises to the home office, the way your team works is
                unique—accomplish it all with TaskFlow.
              </Text>
              <Button onClick={() => navigate("/register")}>
                Sign up - it's free
              </Button>
            </LeftWrapper>
          </LeftSide>
          <RightSide>
            <SvgItem src={indexImage} />
          </RightSide>
        </Content>
      </Container>
    </>
  );
};

export default Index;
