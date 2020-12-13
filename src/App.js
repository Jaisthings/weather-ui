
import './App.css';
import { Component } from 'react';


class App extends Component{
    base_url;

    constructor(props){
      super(props);
      this.state = {
        resultCity: "",
        city:"London",
      };
      this.base_url = process.env.REACT_APP_WEATHER_API_ENDPOINT;
      this.base_url = (this.base_url === undefined || this.base_url.trim() === "")? "http://localhost:9090/weather":this.base_url;      
    }

    componentDidMount(){
      this.fetchWeather();
    }

    onInputChanged(event){
      this.setState({city: event.target.value});
    }

    fetchWeather(){
      let {city} = this.state;
      if(city.trim()!==""){
        console.log("Base Url ",this.base_url);
        let url = this.base_url+"/"+city; 
        fetch(url)
        .then(response => response.json())
        .then(data => {this.setState({resultCity:data.name, weather:data.weather[0].description, temp:data.main.temp,isLoading:false,showError:false}); console.log(data);
                          this.setState({city:""});})
        .catch(err => {console.error(err); this.setState({error:"Tsk, tsk. Something went wrong. "+err,showError:true})});
      }
    }

    render(){
      const {resultCity,weather, temp,error,showError} = this.state;

      return (
        <div className="App">
          <span className="badge badge-danger">&nbsp;@jaisthings&nbsp;</span>
          <header className="App-header">
            <div className="jumbotron">
                <h1 className="display-4">Know the Weather </h1>
                <p className="lead">Enter the city to check the current weather..</p>
                <hr className="my-4" />
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">City</span>
                  </div>
                  <input type="text" className="form-control" id="basic-url" value={this.state.city} aria-describedby="basic-addon3" onChange={this.onInputChanged.bind(this)}/>
                  <div className="input-group-append">
                    <button className="btn btn-info" type="button" onClick={this.fetchWeather.bind(this)}>Submit</button>
                  </div>
                </div> 
                {showError &&
                  <div className="alert alert-danger show" role="alert">
                    <p>{error}</p>
                  </div>
                }
                <br />
                <hr className="my-4" />
                <p>{resultCity} is </p>
                <button type="button" className="btn btn-success">
                  {weather}&nbsp;&nbsp; <span className="badge badge-light">{temp}&nbsp;&#8451;</span>
                </button>
            </div>  
          </header>
        </div>
      );
    }
}

export default App;
