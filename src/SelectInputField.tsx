import { FieldProps } from "formik";
import React from "react";

interface SelectInputFieldProps {
    label: string;
}

const TextInputField: React.FC<FieldProps & SelectInputFieldProps> = ({
    field,
    form: { touched, errors },
    label,
    ...props
}) => {
    return touched[field.name] && errors[field.name] ? (
        <div className="flex flex-col md:w-2/6">
            <label
                htmlFor={field.name}
                className="whitespace-nowrap text-lg text-red-600"
            >
                {label}
            </label>
            <select
                id={field.name}
                autoComplete="off"
                {...field}
                {...props}
                className="h-10 rounded border-2 border-red-600 p-2"
            ></select>
            <div className="text-red-600">{errors[field.name]?.toString()}</div>
        </div>
    ) : (
        <div className="flex flex-col md:w-2/6">
            <label
                htmlFor={field.name}
                className="whitespace-nowrap text-lg text-black"
            >
                {label}
            </label>
            <select
                id={field.name}
                autoComplete="off"
                {...field}
                {...props}
                className="h-10 rounded border-2 p-2 text-black"
            ></select>
            <div className="hidden"></div>
        </div>
    );
};

export default TextInputField;
