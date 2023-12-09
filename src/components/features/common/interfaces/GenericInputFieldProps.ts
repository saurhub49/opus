
interface GenericInputFieldProps<T, K extends keyof T> {
    field: K;
    value: T[K];
    onChange: (field: K, value: T[K]) => void;
    variant?: 'filled' | 'outlined' | 'standard';
};

export default GenericInputFieldProps;