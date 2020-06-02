import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeClassYear = this.onChangeClassYear.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      classyear: '',
      description: '',
      duration: 0,
      yardage: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          classyear: response.data.classyear,
          description: response.data.description,
          duration: response.data.duration,
          yardage: response.data.yardage,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeClassYear(e) {
    this.setState({
      classyear: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })

    if(this.state.description != '' && this.state.duration != 0) {
      // Yardage converter
      switch(this.state.description) {
        case "Diving":
            this.setState({
                yardage: Math.round(this.state.duration*(800/15))
            })
            break;
        case "Dryland":
            this.setState({
                yardage: Math.round(this.state.duration*(1000/15))
            })
            break;
        case "Lifting":
            this.setState({
                yardage: Math.round(this.state.duration*(1000/15))
            })
            break;
        case "Light/Moderate Cardio":
            this.setState({
                yardage: Math.round(this.state.duration*(700/15))
            })
            break;
        case "Intense Cardio":
            this.setState({
                yardage: Math.round(this.state.duration*(1200/15))
            })
            break;
        default:
            this.setState({
                yardage: Math.round(this.state.duration)
            })
          }
    }
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
    switch(this.state.description) {
      case "Diving":
          this.setState({
              yardage: Math.round(e.target.value*(800/15))
          })
          break;
      case "Dryland":
          this.setState({
              yardage: Math.round(e.target.value*(1000/15))
          })
          break;
      case "Lifting":
          this.setState({
              yardage: Math.round(e.target.value*(1000/15))
          })
          break;
      case "Light/Moderate Cardio":
          this.setState({
              yardage: Math.round(e.target.value*(700/15))
          })
          break;
      case "Intense Cardio":
          this.setState({
              yardage: Math.round(e.target.value*(1200/15))
          })
          break;
      default:
          this.setState({
              yardage: Math.round(e.target.value)
          })
    }
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      classyear: this.state.classyear,
      description: this.state.description,
      duration: this.state.duration,
      yardage: this.state.yardage,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <select ref="descriptionInput"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}>
                <option value ="Swimming">Swimming</option>
                <option value ="Diving">Diving</option>
                <option value ="Dryland">Dryland</option>
                <option value ="Lifting">Lifting</option>
                <option value ="Light/Moderate Cardio">Light/Moderate Cardio</option>
                <option value ="Intense Cardio">Intense Cardio</option>
          </select>
        </div>
        <div className="form-group">
          <label>Duration (in Minutes) or Yardage (Swim): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <p>Yardage Value: {this.state.yardage}</p>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}