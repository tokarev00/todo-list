import React, {useState} from "react";

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
            <input
                type="text"
                onChange={inputOnChange}
                onKeyPress={onKeyPressHandler}
                value={text}
                className={error ? 'error' : ''}
            />
            <button onClick={handleSubmit}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}
export default AddItemForm