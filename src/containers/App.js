import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";


function App() {
  // constructor() {
  //   super();
  //   this.state = {
  //     robots: [],
  //     searchfield: "",
  //   };
  // }
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchFrield] = useState('');
  // componentDidMount() {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((users) => this.setState({ robots: users }));
  // }
  useEffect(() =>{
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => {setRobots(users)});
  },[])
  const onSearchChange = (event) => {
    setSearchFrield(event.target.value);
  };

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase());
  });

  return !robots.length ? <h1>Loading</h1> :
    (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  
}

export default App;
