import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Leaderboard extends Component {
    constructor(props) {
        super(props);

        this.getClassTotal2020 = this.getClassTotal2020.bind(this)
        this.getClassTotal2021 = this.getClassTotal2021.bind(this)
        this.getClassTotal2022 = this.getClassTotal2022.bind(this)
        this.getClassTotal2023 = this.getClassTotal2023.bind(this)
        this.getClassTotal2024 = this.getClassTotal2024.bind(this)
        this.getIndividuals = this.getIndividuals.bind(this)
        this.getIndTotal = this.getIndTotal.bind(this)

        this.state = {
            exercises: [],
            exercises2020: 0,
            exercises2021: 0,
            exercises2022: 0,
            exercises2023: 0,
            exercises2024: 0,
            users: [],
            indTotal: {},
        };
    }


    async componentDidMount() {

        // do a try catch
        const usersResponse = await axios.get('/users/');
        const exercisesResponse = await axios.get('/exercises/');

        if (usersResponse.data.length > 0 && exercisesResponse.data.length > 0) {
            const users = usersResponse.data.map(user => user.username);
            console.log("hi" + users);
            this.setState({
                ...this.state,
                users: users,
                exercises: exercisesResponse.data,
                indTotal: this.getIndTotal(users, exercisesResponse.data),
                // would rather use await, too many indents this way
                // function () {}
            })
        };

        this.setState({
            ...this.state,
            exercises2020: this.getClassTotal2020(),
            exercises2021: this.getClassTotal2021(),
            exercises2022: this.getClassTotal2022(),
            exercises2023: this.getClassTotal2023(),
            exercises2024: this.getClassTotal2024(),
        })

    }

    getIndividuals() {
        // var dict = {};

        console.log("UUUUSERS", this.state.users);
        // this.setState({indExercises: dict});
        return this.state.users;
    }

    getIndTotal(users, exercises) {
        console.log("austistic users", users);
        const dict = {};
        for (const user of users) {
            console.log("individual user", user);
            
            let yardage = 0;
            yardage = exercises.filter(el => el.username === user).reduce((a, b) => a + b.yardage, 0);
            console.log("user: ", user, "yardage: ", yardage);
            dict[user] = yardage;
        }

        return dict;
    }

    getClassTotal2020() {
        axios.get('/exercises/')
            .then(response => {
                // console.log("DATA", response.data);
                // console.log("FILTERED", response.data.filter(el => el.classyear === "2020"));
                // console.log("Reduced", response.data.filter(el => el.classyear === "2020").reduce((a, b) => a + b.yardage, 0));

                this.setState({ exercises2020: response.data.filter(el => el.classyear === "2020").reduce((a, b) => a + b.yardage, 0) })
            })
            .catch((error) => {
                console.log(error);
            })
        // console.log(this.state);
        return this.state.exercises2020;
    }

    getClassTotal2021() {
        axios.get('/exercises/')
            .then(response => {
                this.setState({ exercises2021: response.data.filter(el => el.classyear === "2021").reduce((a, b) => a + b.yardage, 0) })
            })
            .catch((error) => {
                console.log(error);
            })
        return this.state.exercises2021;
    }

    getClassTotal2022() {
        axios.get('/exercises/')
            .then(response => {
                this.setState({ exercises2022: response.data.filter(el => el.classyear === "2022").reduce((a, b) => a + b.yardage, 0) })
            })
            .catch((error) => {
                console.log(error);
            })
        return this.state.exercises2022;
    }

    getClassTotal2023() {
        axios.get('/exercises/')
            .then(response => {
                this.setState({ exercises2023: response.data.filter(el => el.classyear === "2023").reduce((a, b) => a + b.yardage, 0) })
            })
            .catch((error) => {
                console.log(error);
            })
        return this.state.exercises2023;
    }

    getClassTotal2024() {
        axios.get('/exercises/')
            .then(response => {
                this.setState({ exercises2024: response.data.filter(el => el.classyear === "2024").reduce((a, b) => a + b.yardage, 0) })
            })
            .catch((error) => {
                console.log(error);
            })
        return this.state.exercises2024;
    }

    // exerciseList() {
    //     return this.state.exercises.map(currentexercise => {
    //         return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    //     })
    // }

    render() {
        const options = {
            animationEnabled: true,
            theme: "dark1",
            title: {
                text: "Official Leaderboard"
            },
            axisX: {
                title: "Class Year",
                reversed: true,
                titleFontSize: 20,
                titleFontWeight: "bold",
            },
            axisY: {

                title: "Average Yardage Per Person",
                labelFormatter: this.addSymbols,
                titleFontSize: 20,
                titleFontWeight: "bold",
            },
            data: [{
                type: "bar",
                dataPoints: [
                    { y: this.state.exercises2020 / 11, label: "2020" },
                    { y: this.state.exercises2021 / 9, label: "2021" },
                    { y: this.state.exercises2022 / 16, label: "2022" },
                    { y: this.state.exercises2023 / 22, label: "2023" },
                    { y: this.state.exercises2024 / 26, label: "2024" },
                ]
            }]
        }

        const dict = this.state.indTotal;

        const items = Object.keys(dict).map(function(key) {
            return [key, dict[key]];
          });

        items.sort(function(first, second) {
            return second[1] - first[1];
          });
        
        let leaderboardHTML = '';
        for (var person of items) {
            leaderboardHTML +=  '<tr><td>' + person[0] + '</td><td>' + person[1] + '</td></tr>';
        }

        return (
            <div>
                <div>
                    <CanvasJSChart options={options}
                    /* onRef={ref => this.chart = ref} */
                    />
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                </div>

                {/* <table className="table"
                    <thead className="thead-light">
                        <tr>
                            <th>2020</th>
                            <th>2021</th>
                            <th>2022</th>
                            <th>2023</th>
                            <th>2024</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.getClassTotal2020(), this.getClassTotal2021, this.getClassTotal2022, this.getClassTotal2023, this.getClassTotal2024 }
                    </tbody>
                </table> */}

                <h3>Total Yardage</h3>


                <p>Class of 2020 Total: {this.state.exercises2020}</p>
                <p>Class of 2021 Total: {this.state.exercises2021}</p>
                <p>Class of 2022 Total: {this.state.exercises2022}</p>
                <p>Class of 2023 Total: {this.state.exercises2023}</p>
                <p>Class of 2024 Total: {this.state.exercises2024}</p>
{/* 
                <div>Individuals: {Object.keys(this.state.indTotal).map(key => {
                    return <p>{key}</p>;
                })} </div> */}

                <div >Individual Leaderboard: 
                {/* {Object.keys(this.state.indTotal).map(key => {
                    return <p>{key + ' ' + this.state.indTotal[key]}</p>;
                })} */}
                    {items.map((person, index) => {
                    index += 1; 
                    return <p>{index + '. ' + person[0] + ' ' + person[1]}</p>;
                })}
                </div> 


            </div>
        )
    }
}