import { Field } from 'formik';

const SelectInputField = ({
    submitCount,
    errors,
    name,
    title,
    values,
}: {
    submitCount: number;
    errors: Record<string, string>;
    name: string;
    title: string;
    values: { key: string | number; value: string }[];
}) => {
    return (
        <>
            <div className={submitCount ? (errors[name] ? 'has-error' : '') : ''}>
                <label htmlFor={name}>{title}</label>
                <Field as="select" name={name} className="form-select">
                    <option value="" disabled>
                        Open this select menu
                    </option>
                    {values.map((value, index) => (
                        <option value={value.key} key={index}>
                            {value.value}
                        </option>
                    ))}
                </Field>
                {submitCount > 0 && errors[name] && <div className="text-danger mt-1">{errors[name]}</div>}
            </div>
        </>
    );
};

export default SelectInputField;
