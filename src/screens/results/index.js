import React from 'react';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      heros: []
    };
  }

  componentDidMount() {
    fetch('https://cors-anywhere.herokuapp.com/' + 'http://adk-fe-onboarding.s3-website-us-east-1.amazonaws.com/all.json')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            heros: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, heros } = this.state;
    console.log(heros)
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {heros.map(hero => (
            <li key={hero.id}>
              {hero.name}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default Results;