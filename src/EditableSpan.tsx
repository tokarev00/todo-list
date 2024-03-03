import React, { useState } from "react";
import { TextField } from "@mui/material";
export type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

function EditableSpan({ title, onChange }: EditableSpanPropsType) {

    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [titleText, setTitleText] = useState<string>('');

    function activeEditMode() {
        setIsEditMode(true);
        setTitleText(title);
    }

    function deactiveEditMode() {
        setIsEditMode(false);
        if (onChange && typeof onChange === 'function') {
            onChange(titleText);
        }
    }

    function onChangeTitleHandler (event: React.ChangeEvent<HTMLInputElement>) {
        setTitleText(event.currentTarget.value)
    }


    return (
        isEditMode 
        ?
            <TextField
                variant="standard"
                value={titleText}
                onBlur={deactiveEditMode}
                onChange={onChangeTitleHandler}
                autoFocus
            />
        :
            <span onDoubleClick={activeEditMode}>{title}</span>
    );
}

export default React.memo(EditableSpan);