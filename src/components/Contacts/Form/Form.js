import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as nameId } from 'uuid';

import s from './Form.module.css';
nameId();

class Form extends Component {
    state = {
        name: '',
        number: '',
    };

    handleChange = e => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit({ id: nameId(), ...this.state });
        this.reset();
    };
    reset = () => {
        this.setState({ name: '', number: '' });
    };

    render() {
        const { name, number } = this.state;
        const { handleSubmit, handleChange } = this;

        return (
            <form onSubmit={handleSubmit} className={s.form}>
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        required
                        placeholder="Name"
                        value={name}
                        onChange={handleChange}
                        className={s.input}
                    />
                </label>
                <label>
                    Number
                    <input
                        type="tel"
                        name="number"
                        pattern="^[\+?\0-9\-_]+$"
                        required
                        placeholder="Number"
                        value={number}
                        onChange={handleChange}
                        className={s.input}
                    />
                </label>
                <button type="submit" className={s.button}>
                    Add contact
                </button>
            </form>
        );
    }
}

Form.propTypes = { onSubmit: PropTypes.func };

export default Form;
