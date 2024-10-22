export interface PopUpProps {
    open : boolean;
    onClose: () => void;
    message : string;
    isWarning?: boolean;
    type: 'Error' | 'Warning'
}