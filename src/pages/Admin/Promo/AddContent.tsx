import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { showMessage } from '../../../components/common/ShowMessage';
import InputField from '../../../components/common/Inputs/InputField';
import SelectInputField from '../../../components/common/Inputs/SelectInputField';
import SingleFileUploadField from '../../../components/common/Inputs/SingleFileUploadField';
import { categoriesData, subcategoriesData } from '../../../data';

const AddContent = () => {
    const SubmittedForm = Yup.object().shape({
        promoName: Yup.string().notRequired(),
    });
    return (
        <>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/promo/dashboard" className="text-primary hover:underline">
                        Promo Dashboard
                    </Link>
                </li>
                {/* <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/admin/state" className="text-primary hover:underline">
                        <span>Promo</span>
                    </Link>
                </li> */}
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Content</span>
                </li>
            </ul>
            <Formik
                initialValues={{
                    promoName: '',
                    phone: '',
                    category: '',
                    subCategory: '',
                    logo: '',
                    title: '',
                    description: '',
                    notification: '',
                    posterImage: '',
                    latLong: '',
                    localityName: '',
                    pinCode: '',
                    iconInternalLink: '',
                    iconExternalLink: '',
                    visibilityFrom: '',
                    visibilityTo: '',
                    publishStatus: '',
                }}
                validationSchema={SubmittedForm}
                onSubmit={() => {
                    showMessage('Form submitted successfully', 'success');
                    console.log('submiting');
                }}
            >
                {({ errors, submitCount, touched }) => (
                    <Form className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <InputField submitCount={submitCount} errors={errors} name={'promoName'} title={'Promo Name'} />
                            <InputField submitCount={submitCount} errors={errors} name={'phone'} title={'Phone Number'} />
                            <SelectInputField
                                submitCount={submitCount}
                                errors={errors}
                                name={'category'}
                                title={'Category'}
                                values={categoriesData.map((category) => ({
                                    key: category.id,
                                    value: category.categoryName,
                                }))}
                            />
                            <SelectInputField
                                submitCount={submitCount}
                                errors={errors}
                                name={'subCategory'}
                                title={'Sub Category'}
                                values={subcategoriesData.map((subcategory) => ({
                                    key: subcategory.id,
                                    value: subcategory.subcategoryName,
                                }))}
                            />
                            <SingleFileUploadField submitCount={submitCount} errors={errors} name="logo" title="Logo" />
                            <InputField submitCount={submitCount} errors={errors} name={'title'} title={'Title'} />
                            <InputField submitCount={submitCount} errors={errors} name={'description'} title={'Description'} />
                            <InputField submitCount={submitCount} errors={errors} name={'notification'} title={'Notification'} />
                            <SingleFileUploadField submitCount={submitCount} errors={errors} name="posterImage" title="Poster Image" />
                            <InputField submitCount={submitCount} errors={errors} name={'latLong'} title={'Latitude, Longitude'} />
                            <InputField submitCount={submitCount} errors={errors} name={'localityName'} title={'Locality Name'} />
                            <InputField submitCount={submitCount} errors={errors} name={'pinCode'} title={'Pin Code'} />
                        </div>
                        <button type="submit" className="btn btn-primary !mt-6">
                            Submit Form
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default AddContent;
