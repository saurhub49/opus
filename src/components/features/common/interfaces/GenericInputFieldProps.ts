import { SxProps, Theme } from "@mui/material/styles";

interface GenericInputFieldProps<T, K extends keyof T> {
    field: K;
    label: string;
    required: boolean;
    value: T[K];
    onChange: (field: K, value: T[K]) => void;
    sx?: SxProps<Theme>
};

export default GenericInputFieldProps;