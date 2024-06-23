import React, { Children } from 'react';
import InputField from '../atoms/InputField';
import TextArea from '../atoms/TextArea';
import Select from '../atoms/Select';
import RangeInput from '../atoms/RangeInput';

type BaseFormFieldProps = {
    label: string;
    value: string | number;
    onChange: (value: any) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    maxLength?: number;
    children?: React.ReactNode;
};

type TextFormFieldProps = BaseFormFieldProps & {
    type: 'text' | 'password' | 'email';
    onChange: (value: string) => void;
};

type NumberFormFieldProps = BaseFormFieldProps & {
    type: 'number';
    onChange: (value: number) => void;
};

type TextAreaFormFieldProps = BaseFormFieldProps & {
    type: 'textarea';
    onChange: (value: string) => void;
    rows?: number;
};

type SelectFormFieldProps = BaseFormFieldProps & {
    type: 'select';
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
};

type RangeFormFieldProps = BaseFormFieldProps & {
    id: string;
    type: 'range';
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
};

type FormFieldProps = TextFormFieldProps | TextAreaFormFieldProps | SelectFormFieldProps | RangeFormFieldProps | NumberFormFieldProps;

const FormField: React.FC<FormFieldProps> = (props) => {
    const {
        label,
        type,
        value,
        children,
        onChange,
        placeholder = '',
        required,
        disabled,
        className = '',
    } = props;

    const handleChange = (newValue: string | number) => {
        onChange(newValue);
    };

    const renderField = () => {
        switch (type) {
            case 'textarea':
                return (
                    <TextArea
                        value={value.toString()}
                        onChange={(v) => handleChange(v)}
                        placeholder={placeholder}
                        rows={props.rows}
                        maxLength={props.maxLength}
                    />
                );
            case 'select':
                return (
                    <Select
                        value={value.toString()}
                        onChange={(v) => handleChange(v)}
                        options={props.options}
                        placeholder={placeholder}
                    />
                );
            case 'range':
                return (
                    <RangeInput
                        id={props.id}
                        label={label}
                        value={Number(value)}
                        onChange={(v) => handleChange(v)}
                        min={props.min}
                        max={props.max}
                        step={props.step}
                    />
                );
            default:
                return (
                    <InputField
                        type={type}
                        value={value.toString()}
                        onChange={onChange as (value: string) => void}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        maxLength={props.maxLength}
                    />
                );
        }
    };

    return (
        <div className={`mb-4 ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            {renderField()}
            {children}
        </div>
    );
};

export default FormField;
