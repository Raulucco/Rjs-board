import React, {Component} from 'react';

class GroceryList extends Component {
    render () {
        return (<ul>
            <ListItem quantity="1" name="Bread"></ListItem>
            <ListItem quantity="6" name="Eggs"></ListItem>
            <ListItem quantity="2" name="Milk"></ListItem>
        </ul>);
    }
}

class ListItem extends Component {
    render () {
        return <li>{this.props.quantity} X {this.props.name}</li>;
    }
}