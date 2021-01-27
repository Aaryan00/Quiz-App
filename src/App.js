import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Quizinstructions from './components/Quizinstructions/Quizinstructions';
import Play from './components/Play/Play';
import QuizSummary from './components/QuizSummary.js/QuizSummary';

function App() {
  return (
    <Router>
      <Route path ="/" exact component = {Home} />
      <Route path ="/play/instructions" exact component = {Quizinstructions} />
      <Route path ="/play/quiz" exact component = {Play} />
      <Route path ="/play/summary" exact component = {QuizSummary} />

    </Router>
  );
}

export default App;
