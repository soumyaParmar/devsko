export interface PopUpProps {
    isVisible : boolean;
    onClose: () => void;
    message : string;
    isWarning?: boolean;
    type: 'Error' | 'Warning'
}