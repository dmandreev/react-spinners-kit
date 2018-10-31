import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% { 
        transform: rotate(1440deg); 
        opacity: 0.05;
    }
`;

const getBalls = ({ countBalls, radius, angle, color, size, ballSize }) => {
    const balls = [];
    const offset = ballSize / 2;
    for (let i = 0; i < countBalls; i++) {
        const y = Math.sin(angle * i * (Math.PI / 180)) * radius - offset;
        const x = Math.cos(angle * i * (Math.PI / 180)) * radius - offset;
        balls.push(
            <Ball
                color={color}
                ballSize={ballSize}
                size={size}
                x={y}
                y={x}
                key={i.toString()}
                index={i}
            />,
        );
    }
    return balls;
};

export const RotateSpinner = ({ size, color, loading }) => {
    const radius = size / 2;
    const countBalls = 8;
    const ballSize = size / 5;
    const angle = 360 / countBalls;
    return (
        loading && (
            <Wrapper size={size}>
                {getBalls({
                    countBalls,
                    radius,
                    angle,
                    color,
                    size,
                    ballSize,
                })}
            </Wrapper>
        )
    );
};

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
`;

const Ball = styled.div`
    position: absolute;
    left: 50%;
    top: 0%;
    width: ${props => props.ballSize}px;
    height: ${props => props.ballSize}px;
    border-radius: 50%;
    background-color: ${props => props.color};
    transform: translateX(-50%) translateY(100%);
    transform-origin: 0 250% 0;
    animation: ${rotate} 4s both infinite;
    animation-timing-function: cubic-bezier(
        0.5,
        ${props => props.index * 0.3},
        0.9,
        0.9
    );
`;

RotateSpinner.defaultProps = {
    loading: true,
    size: 45,
    color: "#00ff89",
};

RotateSpinner.propTypes = {
    loading: PropTypes.bool,
    size: PropTypes.number,
    color: PropTypes.string,
};
