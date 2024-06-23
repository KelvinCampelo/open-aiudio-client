import React from 'react';
import InputField from '../atoms/InputField';
import TextArea from '../atoms/TextArea';
import Select from '../atoms/Select';
import RangeInput from '../atoms/RangeInput';

type BaseFormFieldProps = {
    label: string;
    value: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    maxLength?: number;
};

type TextFormFieldProps = BaseFormFieldProps & {
    type: 'text' | 'password' | 'email' | 'number';
};

type TextAreaFormFieldProps = BaseFormFieldProps & {
    type: 'textarea';
    rows?: number;
};

type SelectFormFieldProps = BaseFormFieldProps & {
    type: 'select';
    options: { value: string; label: string }[];
};

type RangeFormFieldProps = BaseFormFieldProps & {
    id: string;
    type: 'range';
    min: number;
    max: number;
    step: number;
};

type FormFieldProps = TextFormFieldProps | TextAreaFormFieldProps | SelectFormFieldProps | RangeFormFieldProps;

const FormField: React.FC<FormFieldProps> = (props) => {
    const {
        label,
        type,
        value,
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
        </div>
    );
};

export default FormField;
