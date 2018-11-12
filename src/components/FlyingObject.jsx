import React from 'react';
import FlyingObjectTop from "./FlyingObjectTop";
import FlyingObjectBase from "./FlyingObjectBase";
import PropTypes from 'prop-types';
import styled, {keyframes} from "styled-components";
import {gameHeight} from '../utils/constants';

const moveVertically = keyframes`
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(${gameHeight}px);
        }
    `;

const Move = styled.g`
        animation: ${moveVertically} 4s linear;
    `;

const FlyingObject = (props) => (
    <Move>
        <FlyingObjectTop position={props.position} />
        <FlyingObjectBase position={props.position} />
    </Move>
);

FlyingObject.propTypes = {
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    key: PropTypes.number.isRequired,
};

export default FlyingObject;