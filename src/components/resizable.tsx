import { useEffect, useState } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
    direction: 'horizontal'|'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children}) => {
    let resizableProps: ResizableBoxProps;

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    useEffect(()=>{
        const listener = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener)
        };
    },[])

    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            minConstraints: [windowWidth *  0.2, Infinity],
            maxConstraints: [windowWidth *  0.75, Infinity],
            height: Infinity,
            width: windowWidth *  0.75,
            resizeHandles: ['e'],
        };
    } else {
        resizableProps = {
            minConstraints: [Infinity, 24],
            maxConstraints: [Infinity, windowHeight * 0.9],
            height: windowHeight * 0.45,
            width: Infinity,
            resizeHandles: ['s'],
        };
    }
    return <ResizableBox {...resizableProps}>
            {children}
        </ResizableBox>;
};

export default Resizable;