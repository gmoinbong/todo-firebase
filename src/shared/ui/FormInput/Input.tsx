import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface InputProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password' | 'number';
    placeholder?: string;
    required?: boolean;

}

export const FormInput: FC<InputProps> = ({ label, name, type = 'text', placeholder = '', required = false }) => {
    const { register } = useFormContext();

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                required={required}
                id={name}
                {...register(name)}
                type={type}
                placeholder={placeholder}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );

}