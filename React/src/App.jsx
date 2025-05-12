import './App.css';
import Light from './Light.jsx';
import { useEffect, useRef, useState } from 'react';

// Coding Question:
// 1.Create a traffic light component with green, yellow, and red lights.
// On clicking a button, the light should change.
// Initially, it should show green.
// After 2 minutes, it should automatically switch to red for 30 seconds,
// then yellow for 10 seconds, and repeat this cycle continuously.

export default function App() {
    const [ currentLight, setCurrentLight ] = useState( 'green' );
    const timerRef = useRef( null );

    const getTimeout = ( light ) => {
        switch ( light ) {
            case 'green': return 2 * 60 * 1000; // 2 minutes
            case 'red': return 30 * 1000; // 30 seconds
            case 'yellow': return 10 * 1000; // 10 seconds
            default: return 0;
        }
    };

    const getNextLight = ( light ) => {
        switch ( light ) {
            case 'green': return 'red';
            case 'red': return 'yellow';
            case 'yellow': return 'green';
            default: return 'green';
        }
    }

    const changeLight = () => {
        setCurrentLight( getNextLight( currentLight ) );
    }

    useEffect(() => {
        if ( timerRef.current ) {
            clearTimeout( timerRef.current );
        }

        timerRef.current = setTimeout(() => {
            setCurrentLight( getNextLight( currentLight ) );
        }, getTimeout( currentLight ) );

        return () => clearTimeout( timerRef.current);
    }, [ currentLight ]);

    return (
        <>
            <Light color='red' on={ 'red' === currentLight } />
            <Light color='yellow' on={ 'yellow' === currentLight  } />
            <Light color='green' on={ 'green' === currentLight } />
            <button onClick={ changeLight }>Change light</button>
        </>
    );
}