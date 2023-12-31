import React, {useState} from "react";
import { IconButton, TextField } from "@mui/material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
type AddItemFormPropsType = {
    initText: string
    onAddItem: (text: string) => void;
}
function AddItemForm({initText, onAddItem}: AddItemFormPropsType) {
    const [text, setText] = useState<string>(initText);
    const [error, setError] = useState<string | null>(null);
    const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setText(event.target.value);
    }
    const handleSubmit = (): void => {
        if (text.trim() === '') {
            setError('Title is required');
        } else {
            setError(null);
            if (onAddItem && typeof onAddItem === 'function') {
                onAddItem(text);
            }
        }
        setText('');
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        setError(null);
        if (event.key === "Enter") {
            handleSubmit()
        }
    }
    return(
        <div>
            <TextField
                label="Type Value"
                variant="outlined"
                type="text"
                onChange={inputOnChange}
                onKeyPress={onKeyPressHandler}
                value={text}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={handleSubmit} color="primary">
                <ControlPointIcon/>
            </IconButton>
            {/* {error && <div className='error-message'>{error}</div>} */}
        </div>
    )
}
export default AddItemForm