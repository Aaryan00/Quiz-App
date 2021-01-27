import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import "./Quizinstructions.css";


const Quizinstructions = () => (
    <>
    <div className="backk">
        <Helmet><title>Instructions</title></Helmet>
        <div>
            <span className="heading"><span id = "huray">Hurayyy!!!</span> You are going to attempt the quiz</span>
            <br></br>
            <span className="title">Wait... Let's Read the Instructions First</span>
            <br></br>
            <div className="points">
                <ul className="list">
                    <li>Every Question has 4 options out of which only one is Correct</li>
                    <li>There Will be total of 15 Questions in the quiz</li>
                    <li>Attempting all Questions are not necessary </li>
                    <li>Once You click any option or the next button, you cannot go to previous Question, so please click the option if you are sure</li>
                    <li>If the timer ends or if you quit the quiz then you will be redirected to your Statistics. The Quiz will automatically submitted</li>
                    <li>You will get two 50-50 lifeline in your quiz</li>
                    <li>you will get 5 hints in Your quiz</li>
                    <li>You can use Maximum of 3 hints in one Question. Hint will delete the wrong answer </li>
                    <li>You can use anyone lifeline in one question.</li>
                    <li>I recommend You to not Wate Your Lifeline and not use it unnecessary</li>
                </ul>
            </div>
        </div>
        <div>

        <Link  to = "/">
            <span id = "back-button">
                <span id = "play"><b>Take Me Back</b></span>
            </span>
        </Link>
            <br></br>
            <Link  to = "/play/quiz">
                <span id = "circle">
                    <span id = "play"><b>Let's Play</b></span>
                </span>
            </Link>
        </div>
    </div>
    </>
);

export default Quizinstructions;