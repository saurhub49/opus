import React from "react";
import GenericInputFieldProps from "../interfaces/GenericInputFieldProps";
import { Checkbox, FormControlLabel } from "@mui/material";

type GenericCheckboxProps<T, K extends keyof T> = {
    value: boolean;
} & Omit<GenericInputFieldProps<T, K>, 'value'>

const GenericCheckbox = <T, K extends keyof T>(props: GenericCheckboxProps<T, K>) => {
    const { label, required, value, field, onChange, sx } = props;

    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedValue = event.target.checked as unknown as T[K];
        onChange(field, updatedValue);
    }, [field, onChange]);

    return (
        <FormControlLabel
            control={<Checkbox
                required={required}
                checked={!!value}
                onChange={handleChange}
            />}
            label={label}
            sx={sx}
        />
    );
};

export default GenericCheckbox;