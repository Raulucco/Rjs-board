import React, { Component, PropTypes } from 'react';
import CardForm from './card-form';

class NewCard extends Component {
    componentWillMount () {
        this.setState({
            id: Date.now(),
            title: '',
            description: '',
            status: 'todo',
            color: '#c9c9c9',
            tasks: []
        });
    }

    changeHandler (fild, value) {
        this.setState({[field]: value});
    }

    submitHandler (event) {
        e.preventDefault();
        this.props.cardActions.addCard(this.state);
        this.closeHandler(event);
    }

    closeHandler (event) {
        this.props.history.pushState(null, '/');
    }

    render () {
        return (
            <CardForm draftCard={this.state}
                buttonLabel="Create"
                changeAction={this.changeHandler.bind(this)}
                submitAction={this.submitHandler.bind(this)}
                closeAction={this.closeHandler.bind(this)} />
        );
    }
}

NewCard.propTypes = {
    cardActions: PropTypes.object
};

export default NewCard;