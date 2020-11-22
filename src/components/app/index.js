import React from 'react';

import CardComponent from '../card';



class App extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if(!localStorage.getItem("favorites")) {
            localStorage.setItem("favorites", "[]")
        }
    }
    render() {
        return (
            <div className="App">
                <div className="App__bg-top"></div>
                <CardComponent/>
                <div className="App__bg-bottom"></div>
                
            </div>
        );
    }
}

export default App;
