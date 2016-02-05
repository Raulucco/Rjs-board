import React, { Component } from 'react';
import {render} from 'react-dom';
import KanbanBoardContainer from './kanban-board/container';
//import {cards} from './kanban-board/card-fixtures';

class App extends Component {
  render(){
    return (
        <div>
            <h1>Hello World</h1>
            <KanbanBoardContainer />
        </div>
    );
  }
}

render(<App />, document.getElementById('root'));
