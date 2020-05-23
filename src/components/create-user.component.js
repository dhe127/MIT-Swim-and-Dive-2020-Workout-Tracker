import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeClassYear = this.onChangeClassYear.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            classyear: '',
            users: []
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeClassYear(e) {
        this.setState({
            classyear: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            classyear: this.state.classyear,
        }

        console.log(user);

        axios.post('/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            username: '',
            classyear: ''
        })

        window.alert("User: " + user.username + " added!");
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username (Please use kerb): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <div className="form-group">
                        <label>Class/Graduation Year: </label>
                        <select ref="classYearInput"
                            required
                            className="form-control"
                            value={this.state.classyear}
                            onChange={this.onChangeClassYear}>
                                <option value ="">Select your class year</option>
                                <option value ="2020">2020</option>
                                <option value ="2021">2021</option>
                                <option value ="2022">2022</option>
                                <option value ="2023">2023</option>
                                <option value ="2024">2024</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}