import PropTypes from "prop-types";
import { Input, Label } from "./Filter.style";

export const Filter = ({ value, onCange }) => (
    <Label> 🕵️‍♂️
        <Input
            type="text"
            name={value}
            onChange={onCange}
            placeholder="Find contacts by name"
        />
    </Label>
);

Filter.prototype = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

