import React, { Component, PropTypes } from 'react';

class CardForm extends Component {

    changeHandler (field, event) {
        this.props.changeAction(field, event.target.value);
    }

    closeHandler (event) {
        event.preventDefault();
        this.props.closeAction();
    }

    render () {
        return (
            <div>
                <div className="card big">
                    <form onSubmit={this.props.submitAction.bind(this)}>
                        <input type="text" value={this.props.draftCard.title}
                            onChange={this.changeHandler.bind(this, 'title')}
                            placeholder="Title" required={true} autofocus={true}/>
                        <textarea value={this.props.draftCard.description}
                            onChange={this.changeHandler.bind(this, 'description')}
                            placeholder="Description" required={true}/>
                        <label htmlFor="status">Satus</label>
                        <select id="status" value={this.props.draftCard.status}
                             onChange={this.changeHandler.bind(this, 'status')}>
                             <option value="todo">To Do</option>
                             <option value="in-progress">In Progress</option>
                             <option value="done">Done</options>
                        </select>
                        <br />
                        <label htmlFor="color">Color</label>
                        <input id="color"
                            value={this.props.draftCard.color}
                            onChange={this.changeHandler.bind(this, 'color')}
                            type="color"
                            defaultValue="#ff0000"
                         />
                         <div className="actions">
                            <button type="submit">{this.props.buttonLabel}</button>
                         </div>
                    </form>
                </div>
                <div className="overlay" onClick={this.closeHandler.bind(this)}></div>
            </div>
        );
    }
}

CardForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    draftCard: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        status: PropTypes.string,
        color: PropTypes.string
    }).isRequired,
    changeAction: PropTypes.func.isRequired,
    submitAction: PropTypes.func.isRequired,
    closeAction: PropTypes.func.isRequired
};

export default CardForm;