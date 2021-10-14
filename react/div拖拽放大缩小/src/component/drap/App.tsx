import React, {useEffect, useState} from 'react';
import './App.css';
import { throttle } from '../../utils/index'

const throttleFn = throttle(100);

function App() {
    let [active, setActive] = useState(false);
    let [positList, setPositList] = useState(['lt', 'ct', 'rt', 'cl', 'lb', 'cb', 'rb', 'cr']);
    let [defaultStyle, setDefaultStyle] = useState({
        width: '100px',
        height: '100px',
        top: '0',
        left: '20px'
    })

    useEffect(() => {
        document.addEventListener('mousedown', (ev:MouseEvent) => {
            setActive(false)
        })
    }, [])

    const move = (event:React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        event.preventDefault();
        setActive(true)
        let startY = event.clientY;
        let startX = event.clientX;
        function move(event:MouseEvent) {
            let endY = event.clientY;
            let endX = event.clientX;
            let calcY = endY - startY;
            let calcX = endX - startX;
            setDefaultStyle({
                ...defaultStyle,
                top: parseFloat(defaultStyle.top) + calcY + 'px',
                left: parseFloat(defaultStyle.left) + calcX + 'px'
            })
        }
        function up() {
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', up)
        }
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', up)
    }
    const mousedown = (event:React.MouseEvent<HTMLSpanElement>, item: string) => {
        event.stopPropagation();
        event.preventDefault();
        throttleFn(function() {
            console.log(item)
            let startY = event.clientY;
            let startX = event.clientX;
            let w = parseFloat(defaultStyle.width)
            let h = parseFloat(defaultStyle.height)
            let t = parseFloat(defaultStyle.top)
            let l = parseFloat(defaultStyle.left)
            function move(event: MouseEvent) {
                let endY = event.clientY;
                let endX = event.clientX;
                let calcY = endY - startY;
                let calcX = endX - startX;
                switch (item) { // 'lt', 'ct', 'rt', 'cl', 'lb', 'cb', 'rb', 'cr'
                    case 'lt':
                        setDefaultStyle({
                            width: (calcX >= w ? 0 : parseFloat(defaultStyle.width) + -calcX) + 'px',
                            height: (calcY >= h ? 0 : parseFloat(defaultStyle.height) + -calcY) + 'px',
                            top: parseFloat(defaultStyle.top) + (calcY >= h ? h : calcY) + 'px',
                            left: parseFloat(defaultStyle.left) + (calcX >= w ? w : calcX) + 'px'
                        })
                        break;
                    case 'ct':
                        setDefaultStyle({
                            ...defaultStyle,
                            top: parseFloat(defaultStyle.top) + (calcY >= h ? h : calcY) + 'px',
                            height: (calcY >= h ? 0 : parseFloat(defaultStyle.height) + -calcY) + 'px'
                        })
                        break;
                    case 'rt':
                        setDefaultStyle({
                            ...defaultStyle,
                            width: (-calcX >= w ? 0 : parseFloat(defaultStyle.width) + calcX) + 'px',
                            height: (calcY >= h ? 0 : parseFloat(defaultStyle.height) + -calcY) + 'px',
                            top: parseFloat(defaultStyle.top) + (calcY >= h ? h : calcY) + 'px'
                        })
                        break;
                    case 'cl':
                        setDefaultStyle({
                            ...defaultStyle,
                            width: (calcX >= w ? 0 : parseFloat(defaultStyle.width) + -calcX) + 'px',
                            left: parseFloat(defaultStyle.left) + (calcX >= w ? w : calcX) + 'px'
                        })
                        break;
                    case 'lb':
                        setDefaultStyle({
                            ...defaultStyle,
                            width: (calcX >= w ? 0 : parseFloat(defaultStyle.width) + -calcX) + 'px',
                            height: (-calcY >= h ? 0 : parseFloat(defaultStyle.height) + calcY) + 'px',
                            left: parseFloat(defaultStyle.left) + (calcX >= w ? w : calcX) + 'px'
                        })
                        break;
                    case 'cb':
                        setDefaultStyle({
                            ...defaultStyle,
                            // width: parseFloat(defaultStyle.width) + calcX + 'px',
                            height: (-calcY >= h ? 0 : parseFloat(defaultStyle.height) + calcY) + 'px'
                        })
                        break;
                    case 'rb':
                        setDefaultStyle({
                            ...defaultStyle,
                            width: (-calcX >= w ? 0 : parseFloat(defaultStyle.width) + calcX) + 'px',
                            height: (-calcY >= h ? 0 : parseFloat(defaultStyle.height) + calcY) + 'px'
                        })
                        break;
                    case 'cr':
                        setDefaultStyle({
                            ...defaultStyle,
                            width: (-calcX >= w ? 0 : parseFloat(defaultStyle.width) + calcX) + 'px'
                        })
                        break;
                    default:;
                }
            }
            function up() {
                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
            }
            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', up)
        })
    }

    return (
        <div className="App">
            <div className="canvas">
                <div className="testBox" onMouseDown={move} style={defaultStyle}>
                    <div className="box"></div>
                    {
                        active ? <div className="drap">
                            {
                                positList.map((item, index) => <span key={item} onMouseDown={(event) => {
                                    mousedown(event, item)
                                }}></span>)
                            }
                        </div> : ''
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
