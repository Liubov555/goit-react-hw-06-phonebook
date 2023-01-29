
import React from "react";
import { useState, useEffect } from "react";
import { Section } from "./App.styles";
import { nanoid } from "nanoid";

import ContactForm from '../ContactForm/ContactForm';
import ContactList from "../ContactList/ContactList";
import { Filter } from "../Filter/Filter";


export default function App() {

  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    return (
      contacts ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    return () => {
      localStorage.removeItem('contacts');
    };
  }, []);

  const addContact = contact => {
    if (isDublicate(contact)) {
      return alert(`${contact.name} is already exist`);
    }

    setContacts(prev => {
      const newContact = {
        id: nanoid(),
        ...contact
      };

      return [...prev, newContact];
    });
  };

  const deleteContact = id => {
    setContacts(prev => {
      const newContacts = prev.filter(item => item.id !== id);
      return newContacts;
    });
  };

  const handleChange = evt => {
    const { value } = evt.currentTarget;
    setFilter(value);
  };

  const isDublicate = ({ name }) => {
    const result = contacts.find(item => item.name === name);
    return result;
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizeFilter = filter.toLocaleLowerCase();

    const filterContacts = contacts.filter(({ name }) => {
      const normalizeName = name.toLocaleLowerCase();
      const result = normalizeName.includes(normalizeFilter);
      return result;
    });
    return filterContacts;
  };

  const filteredContacts = getFilteredContacts();

  return (
    <Section>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter
          value="filter"
          onChange={handleChange}
        />
        <ContactList
          items={filteredContacts}
          deleteContact={deleteContact} />
      </div>
    </Section >
  );
};

