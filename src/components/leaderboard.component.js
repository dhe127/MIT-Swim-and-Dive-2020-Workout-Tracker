import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Leaderboard extends Component {
    constructor(props) {
        super(props);

        this.getClassTotal2020 = this.getClassTotal2020.bind(this)
        this.getClassTotal2021 = this.getClassTotal2021.bind(this)
        this.getClassTotal2022 = this.getClassTotal2022.bind(this)
        this.getClassTotal2023 = this.getClassTotal2023.bind(this)
        this.getClassTotal2024 = this.getClassTotal2024.bind(this)
        
        this.state = {
            exercises2020: 0,
            exercises2021: 0,
            exercises2022: 0,
            exercises2023: 0,
            exercises2024: 0,
            // users: [],
            // dict: {},
        };
    }

    componentDidMount() {
        // axios.get('/users/')
        //     .then(response => {
        //         console.log("RESPONSE", response);
        //         if (response.data.length > 0) {
        //             console.log("hi");
        //             this.setState({
        //                 users: response.data.map(user => user),
        //             })
        //         }
        //     })

        axios.get('/exercises/')
            .then(response => {
                this.setState({ exercises: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
        this.setState({
            exercises2020: this.getClassTotal2020(),
            exercises2021: this.getClassTotal2021(),
            exercises2022: this.getClassTotal2022(),
            exercises2023: this.getClassTotal2023(),
            exercises2024: this.getClassTotal2024()
        })
    }

    // getIndividuals() {
    //     for(user in this.state.users) {
    //         axios.get('/exercises/')
    //         .then(response => {
    //             this.setState({ dict[user]: response.data.filter(el => el.classyear === "2020").reduce((a, b) => a + b.yardage, 0)})
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    //     }
    // }
    getClassTotal2020() {
        axios.get('/exercises/')
            .then(response => {
                console.log("DATA", response.data);
                console.log("FILTERED", response.data.filter(el => el.classyear === "2020"));
                console.log("Reduced", response.data.filter(el => el.classyear === "2020").reduce((a, b) => a + b.yardage, 0));

                this.setState({ exercises2020: response.data.filter(el => el.classyear === "2020").reduce((a, b) => a + b.yardage, 0)})
            })
            .catch((error) => {
                console.log(error);
            })
        console.log(this.state);
        return this.state.exercises2020;
    }

    getClassTotal2021() {
        axios.get('/exercises/')
            .then(response => {
                this.setState({ exercises2021: response.data.filter(el => el.classyear === "2021").reduce((a, b) => a + b.yardage, 0)})
            })
            .catch((error) => {
                console.log(error);
            })
        return this.state.exercises2021;
    }

    getClassTotal2022() {
        axios.get('/exercises/')
            .then(response => {
                this.setState({ exercises2022: response.data.filter(el => el.classyear === "2022").reduce((a, b) => a + b.yardage, 0)})
            })
            .catch((error) => {
                console.log(error);
            })
        return this.state.exercises2022;
    }

    getClassTotal2023() {
        axios.get('/exercises/')
            .then(response => {
                this.setState({ exercises2023: response.data.filter(el => el.classyear === "2023").reduce((a, b) => a + b.yardage, 0)})
            })
            .catch((error) => {
                console.log(error);
            })
        return this.state.exercises2023;
    }

    getClassTotal2024() {
        axios.get('/exercises/')
            .then(response => {
                this.setState({ exercises2024: response.data.filter(el => el.classyear === "2024").reduce((a, b) => a + b.yardage, 0)})
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
        return (
            <div>
                <h3>Leaderboard</h3>


                <p>Class of 2020 Total: {this.state.exercises2020}</p>
                <p>Class of 2021 Total: {this.state.exercises2021}</p>
                <p>Class of 2022 Total: {this.state.exercises2022}</p>
                <p>Class of 2023 Total: {this.state.exercises2023}</p>
                <p>Class of 2024 Total: {this.state.exercises2024}</p>
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
            </div>
        )
    }
}