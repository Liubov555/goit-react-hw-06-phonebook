import React, { useState } from "react";
import { nanoid } from "nanoid";
import PropTypes from 'prop-types';
import { addContact } from "redux/contacts-slice";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "redux/contacts-slice";

import { Form, Label, Input, FormButton } from "./ContactForm.styles";


export default function ContactForm() {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const nameId = nanoid();
    const numberId = nanoid();

    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();

    const handleChange = evt => {
        const { name, value } = evt.currentTarget;

        switch (name) {
            case 'name':
                setName(value);
                break;

            case 'number':
                setNumber(value);
                break;

            default:
                return;
        }
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        const contact = {
            name,
            number,
            id: nanoid()
        };

        const checkContact = contacts.some(
            (contact) => contact.name.toLowerCase() === name.toLowerCase()
        );

        checkContact ?
            alert(`&{name} is already in contacts`)
            : dispatch(addContact(contact));

        resetSubmit();
    };

    const resetSubmit = () => {
        setName('');
        setNumber('');
    };

    return (
        <Form action="" onSubmit={handleSubmit}>
            <Label >
                Name:
                <Input
                    id={nameId}
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </Label>
            <Label>
                Number:
                <Input
                    id={numberId}
                    type="tel"
                    name="number"
                    value={number}
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
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
}