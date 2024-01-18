import React from "react";
import GenericInputFieldProps from "../interfaces/GenericInputFieldProps";
import { TextField, TextFieldProps } from "@mui/material";

type GenericTextFieldProps<T, K extends keyof T> = GenericInputFieldProps<T, K>
    & Omit<TextFieldProps, 'variant' | 'value' | 'field' | 'onChange'>

const GenericTextField = <T, K extends keyof T>(props: GenericTextFieldProps<T, K>) => {
    const { field, onChange, variant = 'standard' } = props;

    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedValue = event.target.value as unknown as T[K];
        onChange(field, updatedValue);
    }, [field, onChange]);

    return (
        <TextField
            {...props}
            variant={variant}
            onChange={handleChange}
            fullWidth
        />
    );
};

export default GenericTextField;