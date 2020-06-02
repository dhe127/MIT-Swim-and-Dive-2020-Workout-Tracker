import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
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
        axios.get('/users/')
            .then(response => {
                console.log("RESPONSE", response);
                if (response.data.length > 0) {
                    console.log("hi");
                    this.setState({
                        users: response.data.map(user => user),
                        username: response.data[0].username
                    })
                }
            })
        console.log("users", this.state.users);
    }

    onChangeUsername(e) {
        const userObject = e.target.value.split(",");
        console.log("User Object", userObject);
        this.setState({
            username: userObject[0],
            classyear: parseInt(userObject[1])
        });
        console.log(this);
    }

    onChangeClassYear(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });

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
                        yardage: Math.round(this.state.duration*(600/15))
                    })
                    break;
                case "Intense Cardio":
                    this.setState({
                        yardage: Math.round(this.state.duration*(800/15))
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
        });
        
        // Yardage converter
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
                    yardage: Math.round(e.target.value*(600/15))
                })
                break;
            case "Intense Cardio":
                this.setState({
                    yardage: Math.round(e.target.value*(800/15))
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
        });
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

        axios.post('/exercises/add', exercise)
        .then(res => console.log(res.data));

        window.alert("Exercise: " + exercise.description + " on " + exercise.date + " added!");
    }
    render() {
        console.warn(this.state.users);
        return (
            <div>
                <h3>Log your Workout!</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username </label>
                        <select ref="userInput"
                            required   
                            className="form-control"
                            value={this.state.username + "," + this.state.classyear}
                            onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user) {
                                        return <option
                                            key={user.username}
                                            value={user.username + "," + user.classyear}>{user.username}
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
                                <option value ="">Choose a Workout Type!</option>
                                <option value ="Swimming">Swimming</option>
                                <option value ="Diving">Diving</option>
                                <option value ="Dryland">Dryland</option>
                                <option value ="Lifting">Lifting</option>
                                <option value ="Light/Moderate Cardio">Light/Moderate Cardio</option>
                                <option value ="Intense Cardio">Intense Cardio</option>
                        </select>
                        {/* <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            /> */}
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
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}