import PropTypes from "prop-types";
import { List, Item, Text, Button } from "./ContactList.style";

const ContactList = ({ items, deleteContact }) => {
    const elements = items.map(({ name, number, id }) => {
        return (
            <Item key={id}>
                <Text> {name}: {number} </Text>
                <Button type="button" onClick={() => deleteContact(id)}>Delete</Button>
            </Item>
        );
    })

    return (<List>{elements}</List>);
};

export default ContactList;

ContactList.prototypes = {
    items: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.number.isRequired,
        })),
    deleteContact: PropTypes.func.isRequired,
}