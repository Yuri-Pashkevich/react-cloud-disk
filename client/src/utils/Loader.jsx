import React from 'react'
import styled from 'styled-components'

export const Loader = () => {
    return (
        <LoadAnimation>
            <div className="bean-eater">
                <div className="load">
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </LoadAnimation>
    )
}

const LoadAnimation = styled.div`

    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    align-items: center;

    @keyframes load-1 {
        0% { transform: rotate(0deg) }
        50% { transform: rotate(-45deg) }
        100% { transform: rotate(0deg) }
    }
    @keyframes load-2 {
        0% { transform: rotate(180deg) }
        50% { transform: rotate(225deg) }
        100% { transform: rotate(180deg) }
    }
    @keyframes load-3 {
        0% { transform: translate(190px,0); opacity: 0 }
        20% { opacity: 1 }
        100% { transform: translate(70px,0); opacity: 1 }
    }
    .load > div:nth-child(2) {
        transform: translate(-15px,0);
    }
    .load > div:nth-child(2) div {
        position: absolute;
        top: 40px;
        left: 40px;
        width: 120px;
        height: 60px;
        border-radius: 120px 120px 0 0;
        background: #f8b26a;
        animation: load-1 1s linear infinite;
        transform-origin: 60px 60px
    }
    .load > div:nth-child(2) div:nth-child(2) {
        animation: load-2 1s linear infinite
    }
    .load > div:nth-child(2) div:nth-child(3) {
        transform: rotate(-90deg);
        animation: none;
    }
    .load > div:nth-child(1) {
        display: block;
    }
    .load > div:nth-child(1) div {
        position: absolute;
        top: 92px;
        left: -8px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #e15b64;
        animation: load-3 1s linear infinite
    }
    .load > div:nth-child(1) div:nth-child(1) { animation-delay: -0.67s }
    .load > div:nth-child(1) div:nth-child(2) { animation-delay: -0.33s }
    .load > div:nth-child(1) div:nth-child(3) { animation-delay: 0s }
    .bean-eater {
        width: 200px;
        height: 200px;
        display: inline-block;
        overflow: hidden;
        background: transparent;
    }
    .load {
        width: 100%;
        height: 100%;
        position: relative;
        transform: translateZ(0) scale(1);
        backface-visibility: hidden;
        transform-origin: 0 0; 
    }
    .load div { box-sizing: content-box; }
`