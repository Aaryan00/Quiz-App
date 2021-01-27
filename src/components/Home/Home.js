import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import "./Home.css";

const Home = () => (

    <>
        <div className="back">
            <Helmet><title>Home page</title></Helmet>
            <div className="home-box">
                <span id="name">
                    <h1>Quiz Time </h1>
                </span>
                <div className = "image">
                    <img src="https://i.gifer.com/4wd8.gif" alt = "Quiz"></img>
                </div>
                <div className = "about">
                    <h3>So Are You Ready For This Amazing   ---Quiz---</h3>
                </div>
                <Link  to = "/play/instructions">
                    <span id = "circle">
                        <span id = "play"><b>Play</b></span>
                    </span>
                </Link>
            </div>
        </div>
    </>

    ) 

export default Home