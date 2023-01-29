import PropTypes from "prop-types";
import { List, Item, Text, Button } from "./ContactList.style";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "redux/contacts-slice";
import { getContacts, getFilter } from "redux/contacts-slice";

export default function ContactList() {
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);
    const filtered = useSelector(getFilter);

    const findContacts = () => {
        const normalizedFilter = filtered.toLowerCase();
        return contacts.filter((contacts) =>
            contacts.name.toLowerCase().includes(normalizedFilter)
        );
    };

    const filteredContacts = findContacts();

    return (
        <List>
            {filteredContacts.map(
                ({
                    id,
                    name,
                    number
                }) => {
                    return (
                        <Item key={id}>
                            <Text> {name}: {number} </Text>
                            <Button type="button" onClick={() => dispatch(deleteContact(id))}>Delete</Button>
                        </Item>
                    );
                }
            )}
        </List>
    );
}

ContactList.prototypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })),
    deleteContact: PropTypes.func.isRequired,
}