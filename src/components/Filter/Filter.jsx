import { Input, Label } from "./Filter.style";
import { useDispatch, useSelector } from "react-redux";
import { getFilter, setFilter } from "redux/contacts-slice";

export default function Filter() {
    const dispatch = useDispatch();
    const filter = useSelector(getFilter);
    const onChange = evt => {
        dispatch(setFilter(evt.current.value));
    };

    return (
        <Label> 🕵️‍♂️
            <Input
                type="text"
                name={filter}
                onChange={onChange}
                placeholder="Find contacts by name"
            />
        </Label>
    );
};




