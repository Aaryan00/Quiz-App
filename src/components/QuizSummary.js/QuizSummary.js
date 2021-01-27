import React, {Component, Fragment} from 'react'
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';
import "./QuizSummary.css";

class QuizSummary extends Component {
    constructor(props) {
        super(props);
        console.log(props.location)

        this.state = {
            score: 0,
            numberofQuestions:0,
            numberofAnsweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            fiftyFiftyused: 0,
            hintsUsed: 0
        }
 
    }


    componentDidMount() {
        const {state} = this.props.location;
        if(state) {
            this.setState({
                score: (state.score / state.numberofQuestions) *100,
                numberofQuestions:state.numberofQuestions,
                numberofAnsweredQuestions: state.numberofAnsweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                fiftyFiftyUsed: state.fiftyFiftyUsed,
                hintsUsed: state.hintsUsed
            });
        }
    }

    // handle = () => {
    //     this.setState({
    //             score: 0,
    //             numberofQuestions:0,
    //             numberofAnsweredQuestions: 0,
    //             correctAnswers: 0,
    //             wrongAnswers: 0,
    //             fiftyFiftyUsed: 0,
    //             hintsUsed: 0
    //     });
    // }


    render() {
        // console.log(this.props.location.state.fiftyFiftyUsed)
        const {state} = this.props.location;
        let stats, remark;
        if(this.state.score <= 30){
            remark = "You need More Practice";
        } else if(this.state.score > 30 && this.state.score <= 50 ) {
            remark = "Beetter Luck Next Time";
        } else if(this.state.score > 50 && this.state.score <= 70 ) {
            remark = "You can do better";
        } else if(this.state.score >= 71 && this.state.score <= 84 ) {
            remark = "You did great";
        } else {
            remark = 'You\'re an absolute genius';
        }

        if(state !== undefined) {
            stats = (
            <div className="under">
                    <div className="boxx">
"
                        <div className="heading">Quiz has ended!! </div>
                        {/* <img className="thanks" src="https://media.giphy.com/media/wIVA0zh5pt0G5YtcAL/giphy.gif"></img> */}

                        <div className="remark">{remark}</div><br></br>
                        <div className="score">Score: {this.state.score.toFixed(0)}%</div>
                        <div className="data">
                        Total no. of Questions: {this.state.numberofQuestions}<br></br><br></br>
                        Attempted Questions: {this.state.numberofAnsweredQuestions}<br></br><br></br>
                        Correct Answers: {this.state.correctAnswers}<br></br><br></br>
                        Wrong Answers: {this.state.wrongAnswers}<br></br><br></br>
                        Fifty Fifty used: {this.state.fiftyFiftyUsed}<br></br><br></br>
                        Hints Used: {this.state.hintsUsed}
                        </div>

                        
                        <Link to ="/"><div id="back-button">Back to home</div></Link>
                        {/* <button onClick = {this.handle}>sss</button> */}
                        <Link to ="/play/quiz">
                            <span id="circle">Play Again
                            </span></Link>
                    </div>
            </div>
            );
        } else {
            stats = (<h3>Stats is not available!!!</h3>);
        }


        return (
            <Fragment>
                
                <Helmet><title>Quiz App -- Summary</title></Helmet>
                {stats}
                
                
            </Fragment>
        );
    }
}

export default QuizSummary;