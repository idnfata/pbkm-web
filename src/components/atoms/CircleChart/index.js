import React, { useEffect, useState } from 'react'
import './circle-chart.css';

const CircleChart = ({ percentage }) => {
    // const className = `circular-chart ${color}`
    const [color, setColor] = useState('');
    useEffect(() => {
        console.log(percentage)
        if (percentage < 40) {
            setColor('green');
        }else if(percentage > 40 && percentage <= 80 ) {
            setColor('blue');
        }else if(percentage > 80 && percentage <= 100) {
            setColor('orange');
        }
    }, [])
    
    return (
        <>
        <div className="single-chart">
            <svg className={`circular-chart ${color}`} viewBox="0 0 40 40">
                <path className="circle-bg"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                    strokeDasharray={`${percentage}, 100`}
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{percentage}%</text>
            </svg>
        </div>
        </>
    )
}

export default CircleChart
