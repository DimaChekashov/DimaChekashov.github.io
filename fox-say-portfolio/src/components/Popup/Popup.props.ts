export interface PopupProps {
    title: string;
    isOpen: boolean;
    children: React.ReactNode;
    setPopupIsOpen: (status: boolean) => void;
}