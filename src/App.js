import React, {useState, useEffect} from 'react';

import axios from "axios";
import {
    Button,
    Form,
    Col,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {

    const [curList, SetCurList] = useState([])
    const [data1, Setdata1] = useState({amount: "", From: "", To: ""})
    const [result, Setresult] = useState(null)

    const handleSubmit = () => {
        if (data1.amount == "" || data1.From == "" || data1.To == "") {
            alert("Please input all your values")
        } else if (data1.From == data1.To) {
            alert("Choose a different currency combination")
        } else {
            CallConverterapi(data1)
        }
    }


    useEffect(() => {
        axios.get(`https://demo4088948.mockable.io/all_currencies`).then(function (response) {

            console.log(response.data);
            SetCurList(response.data);

        }).catch(function (error) { // handle error
            console.log(error);
        })

    }, [])


    const updateResult = (x) => {


        Setresult(parseFloat(x[data1.To] / x[data1.From] * data1.amount).toFixed(2));

        // let x = data1.From
        // let y = data1.To

        // console.log (`response.data.rates.${x}`)
        // console.log((  `response.data.rates.${x}` / `response.data.rates.${y}` ) * data.amount)
    }
    const CallConverterapi = (data1) => {

        axios.get(` https://data.fixer.io/api/latest?access_key=899192805559fb4fce628932a976a574&symbols=${
            data1.From
        },${
            data1.To
        }&format=1`).then(function (response) {

            updateResult(response.data.rates)


        }).catch(function (error) { // handle error
            console.log(error);
        })

    }

    return (
        <div className="App">

            <h1>Currency Converter</h1>

            <div className="InnerLayout">


                <div className="row justify-content-center align-items-center">
                    <div className="col-md-4">
                        <h1>Convert</h1>
                    </div>
                </div>


                <div className="row justify-content-center align-items-center">
                    <div className="col-md-4"><input type="number" min="0"
                            onChange={
                                (e) => Setdata1({
                                    ...data1,
                                    amount: e.target.value
                                })
                            }/></div>
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-4">


                        <h1>From</h1>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-4">

                        <select className="custom-select" id="inputGroupSelect01 "
                            defaultValue={''}
                            onChange={
                                (e) => {
                                    Setdata1({
                                        ...data1,
                                        From: e.target.value
                                    })
                                }
                        }>
                            <option value="" disabled>Choose Currency</option>
                            {
                            curList.map((item, index) => {
                                return <option key={index}
                                    value={item}>
                                    {item}</option>
                        })
                        } </select>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-4">


                        <h1>to</h1>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center">


                    <div className="col-md-4">


                        <select className="custom-select" id="inputGroupSelect01"
                            defaultValue={''}
                            onChange={
                                e => Setdata1({
                                    ...data1,
                                    To: e.target.value
                                })
                        }>
                            <option value="" disabled>Choose Currency</option>
                            {
                            curList.map((item, index) => {
                                return <option key={index}
                                    value={item}>
                                    {item}</option>
                        })
                        } </select>
                        <h1></h1>
                        {
                        result ? (
                            <p>Converting {
                                data1.amount
                            }
                                {
                                data1.From
                            }
                                to {
                                data1.To
                            }
                                is
                                <h1>{result}</h1>
                                {
                                data1.To
                            } </p>
                        ) : ("")
                    }

                        {
                        result ? (
                            <div className="btn btn-danger" onClick= { ()=>{window.location.reload();}}>
                                Reset conversion</div>
                        ) : (
                            <div className="btn btn-primary"
                                onClick={handleSubmit}>Convert NOW</div>
                        )
                    } </div>


                    {' '} </div>


            </div>
        </div>


    );
}

export default App;
