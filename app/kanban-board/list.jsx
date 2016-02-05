import React, {Component, PropTypes} from 'react';
import Card from './card';
import { DropTarget } from 'react-dnd';
import constants from './constants';

const listTargetSpec = {
    hover (props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardActions.updateStatus(draggedId, props.id);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

class List extends Component {
    render () {

        const { connectDropTarget } = this.props;

        let cards = this.props.cards.map(card => <Card {...card} key={card.id} {...this.props} />);

        return connectDropTarget(
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );
    }
}

List.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    tasksActions: PropTypes.object,
    cardActions: PropTypes.object,
    connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
