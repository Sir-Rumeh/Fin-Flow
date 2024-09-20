import * as Yup from 'yup';

export const userLoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format, please enter a valid email address')
    .required('Email is required'),
  password: Yup.string().required(
    'Invalid password format, please follow the password requirements',
  ),
});

export const reasonForRejectionSchema = Yup.object().shape({
  reasonForRejection: Yup.string().required('Please enter reason for rejecting'),
});

export const onboardMerchantSchema = Yup.object().shape({
  merchantCIF: Yup.string().required('Merchant CIF is required'),
  merchantCifValidated: Yup.boolean().required('Merchant CIF needs to be validated'),
  merchantName: Yup.mixed().when('merchantCIF', ([merchantCIF], schema) => {
    if (merchantCIF) return Yup.string().required('Merchant Name is required');
    return schema;
  }),
  accountNumber: Yup.mixed().when('merchantCIF', ([merchantCIF], schema) => {
    if (merchantCIF) return Yup.string().required('Account Number is required');
    return schema;
  }),
  rcNumber: Yup.mixed().when('merchantCIF', ([merchantCIF], schema) => {
    if (merchantCIF) return Yup.string().required('RC Number is required');
    return schema;
  }),
  address: Yup.mixed().when('merchantCIF', ([merchantCIF], schema) => {
    if (merchantCIF) return Yup.string().required('Address is required');
    return schema;
  }),
});

export const editMerchantSchema = Yup.object().shape({
  merchantId: Yup.string().required('Merchant ID is required'),
  merchantName: Yup.string().required('Merchant Name is required'),
  merchantCode: Yup.string().required('Merchant Code is required'),
  merchantCIF: Yup.string().required('Merchant CIF is required'),
});
export const addSingleMandateSchema = Yup.object().shape({
  merchantId: Yup.string().required('Merchant ID is required'),
  supportingDocument: Yup.string().required('Supporting Document is required'),
});
