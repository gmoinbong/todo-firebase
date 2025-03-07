import { FC, MouseEventHandler } from 'react';

interface Props {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<Props> = ({ text, onClick, type = 'button' }) => {
    return (
        <button type={type}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
            onClick={onClick}>
            {text}
        </button>
    );
};
