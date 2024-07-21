import { FieldProps } from "formik";
import React from "react";

interface TextInputFieldProps {
    label: string;
}

const TextInputField: React.FC<FieldProps & TextInputFieldProps> = ({
    field,
    form: { touched, errors },
    label,
    ...props
}) => {
    return touched[field.name] && errors[field.name] ? (
        <div className="flex flex-col md:w-2/4">
            <label htmlFor={field.name} className="text-lg text-red-600">
                {label}
            </label>
            <input
                type="text"
                id={field.name}
                autoComplete="off"
                {...field}
                {...props}
                className="h-10 rounded border-2 border-red-600 p-2"
            />
            <div className="text-red-600">{errors[field.name]?.toString()}</div>
        </div>
    ) : (
        <div className="flex flex-col md:w-2/4">
            <label htmlFor={field.name} className="text-lg text-black">
                {label}
            </label>
            <input
                type="text"
                id={field.name}
                autoComplete="off"
                {...field}
                {...props}
                className="h-10 rounded border-2 text-black p-2"
            />
            <div className="hidden"></div>
        </div>
    );
};

export default TextInputField;
