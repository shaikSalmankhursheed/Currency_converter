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
    const [data, Setdata] = useState({amount: "", From: "", To: ""})

    const handleSubmit = () => {
       if ( data.amount == "" || data.From== "" || data.To == ""){
         alert("Please input all your values")
       }

       else{
         alert("all values entered")
       }
    }


    useEffect(()=>{
      axios
        .get(`http://demo4088948.mockable.io/all_currencies`).then(function (response) {
          
           console.log(response.data);
          SetCurList(response.data);
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })

    },[])

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
                                (e) => Setdata({
                                    ...data,
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

                        <select className="custom-select" id="inputGroupSelect01 " defaultValue={''}
                            onChange={
                                (e) => {
                                    Setdata({
                                        ...data,
                                        From: e.target.value
                                    })
                                }
                        }>
                            <option value=""  disabled>Choose Currency</option>
                            {
                            curList.map((item,index) => {
                                return <option key={index} value={item}>
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


                        <select className="custom-select" id="inputGroupSelect01" defaultValue={''}
                            onChange={
                                e => Setdata({
                                    ...data,
                                    To: e.target.value
                                })
                        }>
                            <option value=""  disabled>Choose Currency</option>
                            {
                            curList.map((item,index) => {
                                return <option key={index} value={item}>
                                    {item}</option>
                        })
                        } </select>
                        <h1></h1>
                        <div className="btn btn-primary"
                            onClick={handleSubmit}>Convert NOW</div>
                    </div>


                    {' '} </div>


            </div>
        </div>


    );
}

export default App;
