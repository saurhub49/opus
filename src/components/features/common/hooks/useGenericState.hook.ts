import { useState, useCallback } from 'react';

type InitialStateType<T> = T | (() => T);

const useGenericState = <T>(initialState: InitialStateType<T>) => {
    const [state, setState] = useState<T>(initialState);

    const onChangeHandler = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
        setState(prevState => ({ ...prevState, [field]: value }))
    }, []);

    return {
        state,
        onChangeHandler,
    };
};

export default useGenericState;
