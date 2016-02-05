import React, {Component, PropTypes} from 'react';

class CheckList extends Component {
    render () {
        let tasks = this.props.tasks.map((task, index) => {
            console.log(task, 'tasks');
            return (
                <li className="checklist__task" key={task.id}>
                    <label>
                        <input type="checkbox" defaultChecked={task.done}
                        onChange={this.props.tasksActions.toggle.bind(null, this.props.cardId, task.id, index)}/>
                        {' '}{task.name}
                    </label>{' '}
                    <a href="#" className="checklist__task--remove"
                    onClick={this.props.tasksActions.delete.bind(null, this.props.cardId, task.id, index)}>Remove</a>
                </li>
            );
        });

        return (<div className="checklist">
            <ul>{tasks}</ul>
            <div><input type="text" placeholder="Type then hit enter to add a task" className="checklist--add-task"
                onKeyPress={this.keyPressProxy.bind(this)}
             /></div>
        </div>);
    }

    keyPressProxy (event) {
        if (event.key === 'Enter') {
            this.props.tasksActions.add(this.props.cardId, event.target.value);
            event.target.value = '';
        }
    }
}

CheckList.propTypes = {
    cardId: PropTypes.number,
    tasks: PropTypes.arrayOf(PropTypes.object),
    tasksActions: PropTypes.object
};

export default CheckList;
