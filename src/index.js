import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from "./components/Home";
import Interface from "./components/Interface";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Interface" component={Interface} />
        </Switch>
    </Router>,
    document.getElementById('root')
);