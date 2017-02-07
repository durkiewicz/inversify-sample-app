import * as React from 'react';

interface InputProps {
    value: string;
    placeholder?: string;
    onChange?: React.FormEventHandler;
}

export function Input (props: InputProps) {
    return (
        <div className='input-field'>
            <input
                className='validate'
                type='text'
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                />
        </div>
    );
}
