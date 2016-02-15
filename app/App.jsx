import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import KanbanBoardContainer from './kanban-board/container';
import KanbanBoard from './kanban-board/board';
import NewCard from './kanban-board/new-card';
import EditCard from './kanban-board/edit-card';
import createBrowserHistory from 'history/lib/createBrowserHistory';
//import {cards} from './kanban-board/card-fixtures';

class App extends Component {
  render(){
    return (
        <Router history={createBrowserHistory()}>
            <Route component={KanbanBoardContainer}>
                <Route path="/" component="KanbanBoard">
                    <Route path="new" component={NewCard}></Route>
                    <Route path="edit/:card_id" component={EditCard}></Route>
                </Route>
            </Route>
        </Router>
    );
  }
}

render(<App />, document.getElementById('root'));
