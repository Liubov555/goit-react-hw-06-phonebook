import React, { useState } from "react";
import { nanoid } from "nanoid";
import PropTypes from 'prop-types';

import { Form, Label, Input, FormButton } from "./ContactForm.styles";


export default function ContactForm({ onSubmit }) {

    const [state, setState] = useState({
        name: '',
        number: ''
    });

    const id = nanoid();

    const handleChange = evt => {
        const { name, value } = evt.currentTarget;
        setState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        const { name, number } = state;
        onSubmit({ name, number });
        reset();
    };

    const reset = () => {
        setState({ name: '', number: '' })
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Label>Name:
                <Input
                    id={id}
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </Label>
            <Label>Number:
                <Input
                    id={id}
                    type="tel"
                    name="number"
                    value={state.number}
                    onChange={handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </Label>
            <FormButton type="submit">Add contact</FormButton>
        </Form>
    );
};


ContactForm.prototypes = {
    onSubmit: PropTypes.func.isRequired,
}