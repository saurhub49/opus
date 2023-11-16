import { useState, useCallback } from 'react';

type InitialStateType<T> = T | (() => T);

const useGenericModal = <T>(initialState: InitialStateType<T>) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalState, setModalState] = useState<T>(initialState);

  const openModalHandler = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModalHandler = useCallback(() => {
    setModalOpen(false);
    setModalState(typeof initialState === 'function' ? (initialState as () => T)() : initialState);
  }, [initialState]);

  const onChangeHandler = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setModalState(prevState => ({ ...prevState, [field]: value }))
}, []);

  return {
    modalOpen,
    modalState,
    setModalState,
    openModalHandler,
    closeModalHandler,
    onChangeHandler,
  };
};

export default useGenericModal;
