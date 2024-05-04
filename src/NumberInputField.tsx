import { FieldProps } from "formik";
import React from "react";

interface NumberInputFieldProps {
    label: string;
}

const NumberInputField: React.FC<FieldProps & NumberInputFieldProps> = ({
    field,
    form: { touched, errors },
    label,
    ...props
}) => {
    return touched[field.name] && errors[field.name] ? (
        <div className="flex flex-col md:w-2/6">
            <label htmlFor={field.name} className="text-lg text-red-600">
                {label}
            </label>
            <input
                type="number"
                id={field.name}
                autoComplete="off"
                {...field}
                {...props}
                className="h-8 rounded border-2 border-red-600"
            />
            <div className="text-red-600">{errors[field.name]?.toString()}</div>
        </div>
    ) : (
        <div className="flex flex-col md:w-2/6">
            <label htmlFor={field.name} className="text-lg text-black">
                {label}
            </label>
            <input
                type="number"
                id={field.name}
                autoComplete="off"
                {...field}
                {...props}
                className="h-8 rounded border-2 text-black"
            />
            <div className="text-white">Error placeholder</div>
        </div>
    );
};

export default NumberInputField;
