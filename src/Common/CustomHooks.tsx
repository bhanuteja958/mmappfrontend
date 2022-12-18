import React, {useState} from 'react';

export const useToast = (duration: number) => {
    const [text, setText] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);

    const displayToast = (text:string, type:string) => {
        setText(text);
        setType(type);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, duration);
    }

    return { text, type, showToast, displayToast}
}