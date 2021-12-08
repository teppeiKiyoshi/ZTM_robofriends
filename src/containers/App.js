import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

function App() {
    const [robots, setRobots] = useState([])
    const [searchField, setSearchField] = useState('')

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => { setRobots(users) });
    },[])

    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    }

    const filterRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return !robots.length ?
        <h1>Loading...</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>Robot Friends</h1>
                <Searchbox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filterRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
}

export default App;