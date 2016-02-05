import React, {Component, PropTypes} from 'react';
import List from './list';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class KanbanBoard extends Component {
    render () {
        return (<div className="kanban-app">
            <List id="todo" title="To Do Cards" cards={this.props.cards.filter(card => card.status === 'todo')} {..this.props} />
            <List id="in-progress" title="In Progress" cards={this.props.cards.filter(card => card.status === 'in-progress')} {..this.props} />
            <List id="done" title="DONE!" cards={this.props.cards.filter(card => card.status === 'done')} {..this.props} />
        </div>);
    }
}

KanbanBoard.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    tasksActions: PropTypes.object,
    cardActions: PropTypes.object
};

export default DragDropContext(HTML5Backend)(KanbanBoard);
