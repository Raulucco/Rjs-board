import React, {Component, PropTypes} from 'react';
import CheckList from './check-list';
import marked from 'marked';
import ReactCssTRansitionGroup from 'react-addons-css-transition-group';
import { DragSource } from 'react-dnd';
import constants from './constants';

let titlePropType = (props, propName, componentName) => {
    let value = props[propName] || null;
    if (typeof value === 'string' && value.length > 80) {
        return new Error(`${propName} in ${componentName} is not valid`);
    }
};

const cardDragSpec = {
    beginDrag (props) {
        return {
            id: props.id
        };
    }
};

let collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    };
};

class Card extends Component {

    constructor () {
        super(...arguments);
        this.state = {
            showDetails: false
        };
    }

    render () {

        const { connectDragSource } = this.props;

        let details = this.state.showDetails ? (
            <div className="card_details">
                <p dangerouslySetInnerHTML={{__html: marked(this.props.description)}}></p>
                <CheckList cardId={this.props.id} tasks={this.props.tasks} tasksActions={this.props.tasksActions} />
            </div>
        ) : '';

        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color
        };

        return connectDragSource(
            <div className="card">
                <div style={sideColor}></div>
                <div className={this.state.showDetails ? "card__title card__title--is-open" : "card__title"}
                onClick={this.onClickHandler.bind(this)}>{this.props.title}</div>
                <ReactCssTRansitionGroup transitionName="toggle"
                        transitionEnterTimeout={250}
                        transitionLeaveTimeout={250}>
                    {details}
                </ReactCssTRansitionGroup>
            </div>);

    }

    onClickHandler () {
        this.setState({
            showDetails: !this.state.showDetails
        });
    }
}

Card.propTypes = {
    id: PropTypes.number,
    title: titlePropType,
    description: PropTypes.string,
    color: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.object),
    tasksActions: PropTypes.object,
    cardActions: PropTypes.object,
    connectDragSource: PropTypes.func.isRequired
};

export default DragSource( constants.CARD, cardDragSpec, collectDrag )(Card);
