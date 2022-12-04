export interface WorkPopupProps {
    title: string;
    isOpen: boolean;
    children: React.ReactNode;
    setPopupIsOpen: (status: boolean) => void;
}