export interface ErrorPopUpProps {
    errorPopup : boolean;
    setErrorPopup?: React.Dispatch<React.SetStateAction<boolean>>;
    errorMsg : string;
}