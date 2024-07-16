import React from 'react';
import styled, { keyframes } from 'styled-components';

const primaryColor = '#BF372A';
const secondaryColor = '#F2D479';
const tertiaryColor = '#F25430';

const titleAnimation = keyframes`
  0% {
    transform: translateY(-50px);
    opacity: 0;
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
  }
  20% {
    transform: translateY(0);
    opacity: 1;
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
  }
  80% {
    transform: translateY(0);
    opacity: 1;
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
  }
`;

const Container = styled.section`
  width: 100%;
  height: 220px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 75px;
  text-transform: uppercase;
  position: absolute;
  width: 45vw;
  @media (max-width: 600px) {
        font-size: 40px;
        text-transform: uppercase;
        margin-top: 140px;
    }
  span {
    width: 100%;
    float: left;
    color: ${tertiaryColor};
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
    transform: translateY(-50px);
    opacity: 0;
    animation-name: ${titleAnimation};
    animation-timing-function: ease;
    animation-duration: 3s;

    &:first-child {
      animation-delay: 0.7s;
    }

    &:last-child {
      color: ${secondaryColor};
      animation-delay: 0.5s;
    }
  }
    
`;

const Subtitle = styled.h2`
  font-size: 75px;
  text-transform: uppercase;
  top: 0;
  position: absolute;
  margin-left: 50vw;
  
  width: 50vw;
  @media (max-width: 600px) {
        font-size: 40px;
        text-transform: uppercase;
        margin-top: 140px;
    }

  span {
    width: 100%;
    float: left;
    color: ${tertiaryColor};
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
    transform: translateY(-50px);
    opacity: 0;
    animation-name: ${titleAnimation};
    animation-timing-function: ease;
    animation-duration: 3s;
    animation-delay: 4.1s;

    &:first-child {
      animation-delay: 4.2s;
    }

    &:last-child {
      color: ${secondaryColor};
      animation-delay: 4s;
    }
  }
`;

const UseChrome = styled.span`
  font-size: 10px;
  color: black;
  font-family: helvetica, arial;
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  left: 0;
`;

const Wrapper = styled.div`
  height: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Baloo Paaji', cursive;
  position: absolute;
  margin-top: 120px;

  @media (max-width: 600px) {
        font-size: 40px;
        text-transform: uppercase;
    }
`;

const AnimatedTitle: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Title className="title">
          <span>Want to</span>
          <span>Grow</span>
          <span>Smart ?</span>
        </Title>
        <Subtitle className="title">
          <span>Optimize</span>
          <span>Your</span>
          <span>Harvest</span>
        </Subtitle>
      </Container>
    </Wrapper>
  );
};

export default AnimatedTitle;