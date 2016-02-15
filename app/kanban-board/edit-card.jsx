import React, { Component, PropTypes } from 'react';
import CardForm from './card-form';

class EditCard extends Component {
    componentWillMount () {
        let card = this.props.cards.find((card) => card.id === this.props.params.card_id);
        this.setState({ ...card });
    }

    changeHandler (fild, value) {
        this.setState({[field]: value});
    }

    submitHandler (event) {
        e.preventDefault();
        this.props.cardActions.updateCard(this.state);
        this.closeHandler(event);
    }

    closeHandler (event) {
        this.props.history.pushState(null, '/');
    }

    render () {
        return (
            <CardForm draftCard={this.state}
                buttonLabel="Edit"
                changeAction={this.changeHandler.bind(this)}
                submitAction={this.submitHandler.bind(this)}
                closeAction={this.closeHandler.bind(this)} />
        );
    }
}

EditCard.propTypes = {
    cardActions: PropTypes.object
};

export default EditCard;
