import React from "react";
import GenericInputFieldProps from "../interfaces/GenericInputFieldProps";
import { TextField } from "@mui/material";

const GenericTextField = <T, K extends keyof T>(props: GenericInputFieldProps<T, K>) => {
    const { label, required, value, field, onChange, sx } = props;

    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedValue = event.target.value as unknown as T[K];
        onChange(field, updatedValue);
    }, [field, onChange]);

    return (
        <TextField
            variant="standard"
            required={required}
            value={value}
            label={label}
            onChange={handleChange}
            sx={sx}
            fullWidth
        />
    );
};

export default GenericTextField;