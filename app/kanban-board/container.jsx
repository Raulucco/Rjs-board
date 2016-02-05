import React, {Component} from 'react';
import KanbanBoard from './kanban-board';
import update from 'react-addons-update';
import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'any-string-you-like'// The Authorization is not needed for local server
};

class KanbanBoardContainer extends Component {

    constructor () {
        super(...arguments);
        this.state = {
            cards: []
        };
    }

    componentDidMount () {
        fetch(`${API_URL}/cards`, {headers: API_HEADERS})
            .then((response) => response.json())
            .then((data) => this.setState({cards: data}))
            .catch((error) => console.log(error));
    }

    render () {
        let tasksActions = {
            toggle: this.toggleTask.bind(this),
            delete: this.deleteTask.bind(this),
            add: this.addTasks.bind(this)
        };

        return (
            <KanbanBoard cards={this.state.cards}
                 tasksActions={tasksActions}
                 cardActions={{
                     updateStatus: this.updateCardStatus.bind(this),
                     updatePosition: this.updateCardPosition.bind(this)
                 }}/>
        );
    }

    addTasks (cardId, taskName) {
        let cardIndex = this.retrieveCardIndex(cardId);
        let task = {name: taskName, done: false, id: Math.floor(Math.random() * Date.now())};
        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(task)
        }).then(() => {
            let cards = update(this.state.cards, {
                [cardIndex]: {
                    tasks: {
                        $push: [task]
                    }
                }
            });
            this.setState({cards: cards});
        }).catch(function (e) {
            console.log(e);
        });
    }

    deleteTask (cardId, taskId, taskIndex) {
        let cardIndex = this.retrieveCardIndex(cardId);
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        }).then((response) => {
            let cards = update(this.state.cards, {[cardIndex]: {tasks: {$splice: [[taskIndex, 1]]}}});
            this.setState({cards: cards});
        }).catch(function err (e) {
            console.log(e);
        });
    }

    toggleTask (cardId, taskId, taskIndex) {
        let cardIndex = this.retrieveCardIndex(cardId);
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done: !this.state.cards[cardIndex].tasks[taskIndex].done})
        }).then((response) => {
            let cards = update(this.state.cards, {
                [cardIndex]: {
                    tasks: {
                        [taskIndex]: {
                            done: {
                                $apply: (done) => !done
                            }
                        }
                    }
                }
            });
            this.setState({cards: cards});
        }).catch(function err (e) {
            console.log(e);
        });
    }

    updateCardStatus (cardId, listId) {
        let cardIndex = this.retrieveCardIndex(cardId);
        let card = this.state.cards[cardIndex];

        if (card.status !== listId) {// only proceed if hovering over a different object
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: {$set: listId}
                    }
                }
            }));
        }
    }

    updateCardPosition (cardId, afterId) {
        if (cardId !== afterId) {// process if hovering over a different card
            let cardIndex = this.retrieveCardIndex(cardId);
            let card = this.state.cards[cardIndex];
            let afterIndex = this.retrieveCardIndex(afterId);
            this.setState(update(this.state, {
                cards: {
                    $plice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }));
        }
    }

    retrieveCardIndex (cardId) {
        return this.state.cards.findIndex((card) => cardId === card.id);
    }
}

export default KanbanBoardContainer;
