import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const ListGroupItem = styled.li`
    cursor: pointer;
`;

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then( (itemList) => {
                this.setState({
                    itemList,
                    error: false
                });
            })
            .catch(() => {this.onError()});
    }

    componentDidCatch() {
        this.setState({
            itemList: null,
            error: true
        })
    }

    onError(status){
        this.setState({
            itemList: null,
            error: true
        })
    }

    //renderItems принимает массив потому что из API нам приходит array
    renderItems(arr) {
        return arr.map((item, i) => {
            // const {id} = item;
            const label = this.props.renderItem(item);
            var shortid = require('shortid');

            return (
                <ListGroupItem
                    key={shortid.generate()}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(41 + i)}
                    >
                    {label}
                </ListGroupItem>
            )
        })
    }
    
    render() {

        const {itemList, error} = this.state;

        if (error){
            return <ErrorMessage/>
        }

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}