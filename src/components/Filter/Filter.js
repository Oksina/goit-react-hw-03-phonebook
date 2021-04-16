import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

const Filter = ({ value, onChange }) => {
    return (
        <div>
            <label className={s.label}>
                Find contacts by name
                <input
                    type="text"
                    name="filter"
                    placeholder="Name"
                    onChange={onChange}
                    value={value}
                    className={s.input}
                />
            </label>
        </div>
    );
};

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Filter;
