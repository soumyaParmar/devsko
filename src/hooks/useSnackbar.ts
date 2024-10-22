import { openSnackbar, OpenSnackbarState } from '@/utils/store/features/snackbar/snackbarSlice';
import { useAppDispatch } from '@/utils/store/hooks';

const useSnackbar = () => {

    const dispatch = useAppDispatch();

    const showSnackbar = ({ message, autohide = 3000, severity = 'success' }: OpenSnackbarState) => {
        dispatch(openSnackbar({ autohide, message, severity }));
    };
    return { showSnackbar }
}

export default useSnackbar