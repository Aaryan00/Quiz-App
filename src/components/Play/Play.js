import React,{Component,Fragment} from "react";
import {Helmet} from 'react-helmet';
import questions from '../../questions.json';
import "./Play.css";
import fifty from "../../assets/download.png";
import hint from "../../assets/images.png";

class Play extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            questions: questions,
            previousQuestion: [],
            nextQuestion: [],
            currentQuestion: [],
            answer: '',
            numberofQuestions: 0,
            numberofAnsweredQuestions: 0,
            score: 0,
            currentQuestionIndex: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyFifty: 2,
            usedFiftyFifty: false,
            nextButtonDisabled: true,
            previousButtonDisabled: false,
            previousRandomNumbers: [],
            time: {},
            useOne: 1
        };
        this.interval = null;
    }

    componentDidMount () {
        const {questions, currentQuestion , previousQuestion , nextQuestion} = this.state
        this.displayQuestions(questions , currentQuestion, previousQuestion, nextQuestion);
        this.startTimer();
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion,previousQuestion) => {
        let{ currentQuestionIndex } = this.state;

        const isEmpty = (value) =>
            value === undefined || 
            value == null ||
            (typeof value === 'object' && Object.keys(value).length ===0 ) ||
            (typeof value === 'string' && value.trim().length ===0 )
        

        if(!isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer,
                previousRandomNumbers: []
            }, () => {
                this.showOptions();
                this.handleDisableButton();
            })
        }
    }

    handleOptionCLick = (e) => {
        if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            this.correctAnswer();
        } else {
            this.incorrectAnswer();
        }
    }

    handlePreviousButtonClick = () => {
        if(this.state.previousQuestion !== undefined) {
            this.setState(
                prevstate => ({
                    currentQuestionIndex: prevstate.currentQuestionIndex - 1  
                }), () => {
                    this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.previousQuestion, this.state.nextQuestion)
                }
                )
        }
    }

    handleNextButtonClick = () => {
        if(this.state.nextQuestion !== undefined) {
            this.setState(
                prevstate => ({
                    currentQuestionIndex: prevstate.currentQuestionIndex + 1
                }), () => {
                    this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.previousQuestion, this.state.nextQuestion)
                }
                )
        }
    }

    handleQuitButtonClick = () => {
        if(window.confirm('Are you sure you want to Quit?')) {
            this.endgame();
        }
    }

    showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach(option => {
            option.style.visibility = 'visible';
        });
        this.setState({
            usedFiftyFifty: false,
            useOne:1
        });
    }

    handleFiftyFifty = () => {
        if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false  && this.state.useOne === 1 ) {
            const options = document.querySelectorAll('.option');
            const randomNumbers = [];
            let indexOfAnswer;

            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });

            let count = 0;
            do {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer) {
                    if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                            randomNumbers.push(randomNumber);
                            count ++;
                    } else {
                        while (true) {
                            const newRandomNumber = Math.round(Math.random() * 3);
                            if (!randomNumbers.includes(newRandomNumber) && newRandomNumber !== indexOfAnswer) {
                                randomNumbers.push(newRandomNumber);
                                count ++;
                                break;
                            }
                        }
                    }
                }
            } while (count < 2);

            options.forEach((option, index) => {
                if (randomNumbers.includes(index)) {
                    option.style.visibility = 'hidden';
                }
            });
            this.setState(prevState => ({
                fiftyFifty: prevState.fiftyFifty - 1,
                usedFiftyFifty: true,
                useOne: 0
            }));
        }
    }

    handlehint = () => {
        if(this.state.hints>0 && this.state.useOne !== 0) {
        const options = Array.from(document.querySelectorAll('.option'));
        let indexOfAnswer;

        options.forEach((option, index) => {
            if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                indexOfAnswer = index;
            }
        });

        while(true) {
            const randomNumber = Math.round(Math.random()*3);
            if(randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
                options.forEach((option,index) => {
                    if(index === randomNumber) {
                        option.style.visibility = 'hidden';
                        this.setState((prevstate) => ({
                            hints: prevstate.hints -1,
                            previousRandomNumbers: prevstate.previousRandomNumbers.concat(randomNumber),
                            useOne: 2
                        }));
                    }
                });
                break;
            }
            if(this.state.previousRandomNumbers.length >= 3) break;
        }
    }
    }

    startTimer = () => {
        const countDownTime = Date.now()+ 180000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;
            const minutes = Math.floor ((distance % (1000*60*60))/(1000*60))
            const seconds = Math.floor ((distance % (1000*60))/(1000))
            
            if(distance < 0 ) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endgame();
                });
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                })
            }
        }, 1000)
    }
    
    correctAnswer = () => {
        this.setState(
            prevstate => ({
                score: prevstate.score + 1,
                correctAnswers: prevstate.correctAnswers + 1,
                currentQuestionIndex: prevstate.currentQuestionIndex + 1,
                numberofAnsweredQuestions: prevstate.numberofAnsweredQuestions + 1,
            }), () => {
                if(this.state.nextQuestion === undefined) {
                    this.endgame();
                } else {
                this.displayQuestions(this.state.questions , this.state.currentQuestion, this.state.previousQuestion, this.state.nextQuestion)
                }
            })
    }

    incorrectAnswer = () => {
        this.setState(
            prevstate => ({
                wrongAnswers: prevstate.wrongAnswers + 1,
                currentQuestionIndex: prevstate.currentQuestionIndex + 1,
                numberofAnsweredQuestions: prevstate.numberofAnsweredQuestions + 1,
            }), () => {
                if(this.state.nextQuestion === undefined) {
                    this.endgame();
                } else {
                this.displayQuestions(this.state.questions , this.state.currentQuestion, this.state.previousQuestion, this.state.nextQuestion)
                }
            })
    }

    handleDisableButton = () => {
        if(this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0 ) {
            this.setState({
                previousButtonDisabled: true
            })
        } else {
            this.setState({
                previousButtonDisabled: false
            })
        }

        if(this.state.nextQuestion === undefined || this.state.currentQuestionIndex+1 === this.state.questions.length ) {
            this.setState({
                nextButtonDisabled: true
            })
        } else {
            this.setState({
                nextButtonDisabled: false
            })
        }
    }

    endgame = () => {
        alert("quiz ended!");
        const playerStats = {
            score: this.state.score,
            numberofQuestions: this.state.questions.length,
            numberofAnsweredQuestions : this.state.correctAnswers + this.state.wrongAnswers,
            correctAnswers: this.state.correctAnswers,
            wrongAnswers: this.state.wrongAnswers,
            fiftyFiftyUsed: 2-this.state.fiftyFifty,
            hintsUsed: 5-this.state.hints
        };
        this.props.history.push("/play/summary", playerStats);
    }

    render(){
        const {currentQuestion} = this.state;
        return (
            <Fragment>
                <div className="play-back">

                    <Helmet><title>Quiz Page</title></Helmet>
                    
                    <div className="question">
                    <div className="instruct">
                        Please keep an eye on Timer!!!
                    </div>
                        <div className="lifeline">
                            <span className="lifeline-left" onClick = {this.handleFiftyFifty}>
                                <img className="lifeline-image" src={fifty} alt = "fifty-fifty"></img>
                                <span className="left">:&nbsp;&nbsp;{this.state.fiftyFifty}</span>
                            </span>
                        </div>
                        <div className="lifeline">
                            <span className="lifeline-left" onClick = {this.handlehint}>
                                <img className="lifeline-image" src={hint} alt = "hint"></img>
                                <span className="left">:&nbsp;&nbsp;{this.state.hints}</span>
                            </span>
                        </div>
                        <div className="timer"> 
                            Time: {this.state.time.minutes}:{this.state.time.seconds}
                        </div>
                        <br></br>
                        <div className="number">
                            Question:&nbsp;{this.state.currentQuestionIndex+1} of {this.state.questions.length}
                        </div>
                        <div className="create-question">
                            {currentQuestion.question}
                        </div>
                        <div classname="options">
                            <p className = "option" onClick = {this.handleOptionCLick}>{currentQuestion.optionA}</p>
                            <p className = "option" onClick = {this.handleOptionCLick}>{currentQuestion.optionB}</p>
                        </div>
                        <div className="options">
                            <p className = "option" onClick = {this.handleOptionCLick}>{currentQuestion.optionC}</p>
                            <p className = "option" onClick = {this.handleOptionCLick}>{currentQuestion.optionD}</p>
                        </div>
                        <div>
                            {/* <button disabled = {this.state.previousButtonDisabled === true}
                                onClick = {this.handlePreviousButtonClick}>Previous</button> */}
                            <span disabled = {this.state.nextButtonDisabled === true}
                                onClick = {this.handleNextButtonClick} className="circle" >Next</span>
                            <span onClick = {this.handleQuitButtonClick} className="back-button">Quit</span>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

}

export default Play