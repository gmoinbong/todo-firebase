import React, { FC } from 'react'

interface Props {
    children: React.ReactNode;
    onSubmit: () => void;
}

export const Form: FC<Props> = ({ children, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} action="" className="w-full max-w-md space-y-8 bg-gray-300  p-8 rounded-xl shadow-lg flex flex-col">
            {children}
        </form>
    )
}