import React, { Component } from 'react';
import Form from './components/Contacts/Form/Form';
import List from './components/Contacts/List/List';
import Filter from './components/Filter/Filter';

import './index.css';
import './App.css';

class App extends Component {
    state = {
        contacts: [],
        filter: '',
    };

    formSubmitHandler = e => {
        const { contacts } = this.state;
        const existingName = contacts.find(
            contact => contact.name.toLowerCase() === e.name.toLowerCase(),
        );
        const existingNumber = contacts.find(
            contact => contact.number.toLowerCase() === e.number.toLowerCase(),
        );
        const existingContact =
            (existingName && 'name') || (existingNumber && 'number');

        existingName || existingNumber
            ? alert(`The ${existingContact} is already in contacts.`)
            : this.setState(prevState => ({
                  contacts: [e, ...prevState.contacts],
              }));
    };

    changeFilter = e => {
        e.preventDefault();
        this.setState({ filter: e.currentTarget.value });
    };

    getVisibleContacts = () => {
        const { filter, contacts } = this.state;
        console.log(filter);
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter),
        );
    };

    deleteContact = id => {
        const { contacts } = this.state;
        this.setState({
            contacts: contacts.filter(contact => contact.id !== id),
        });
    };

    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);

        if (parsedContacts) {
            this.setState({ contacts: parsedContacts });
        }

        console.log(parsedContacts);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Update contacts');
        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem(
                'contacts',
                JSON.stringify(this.state.contacts),
            );
        }
    }

    render() {
        const {
            formSubmitHandler,
            changeFilter,
            getVisibleContacts,
            deleteContact,
        } = this;
        const { filter } = this.state;
        return (
            <div className="main">
                <h1>Phonebook</h1>
                <Form onSubmit={formSubmitHandler} />
                <h2>Contacts </h2>
                <Filter value={filter} onChange={changeFilter} />
                <List
                    contacts={getVisibleContacts()}
                    deleteContact={deleteContact}
                />
            </div>
        );
    }
}

export default App;
