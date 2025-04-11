import { Field } from 'formik';

const SingleFileUploadField = ({ submitCount, errors, name, title }: { submitCount: number; errors: Record<string, string>; name: string; title: string }) => {
    return (
        <>
            <div className={submitCount ? (errors[name] ? 'has-error' : '') : ''}>
                <label htmlFor={name}>{title}</label>
                <Field name={name} type="file" id={name} placeholder={`Enter ${title}`} className="form-input" />
                {submitCount > 0 && errors[name] && <div className="text-danger mt-1">{errors[name]}</div>}
            </div>
        </>
    );
};

export default SingleFileUploadField;
