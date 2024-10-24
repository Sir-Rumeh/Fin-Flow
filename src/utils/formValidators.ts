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
  remark: Yup.string().required('Please enter reason for rejecting'),
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
  merchantName: Yup.string().required('Merchant Name is required'),
  accountNumber: Yup.string().required('Account Number is required'),
  rcNumber: Yup.string().required('RC Number is required'),
  address: Yup.string().required('Address is required'),
});

export const addSingleMandateSchema = Yup.object().shape({
  merchantId: Yup.string().required('Merchant ID is required'),
  supportingDocument: Yup.string().required('Supporting Document is required'),
});

export const createMandateSchema = Yup.object().shape({
  mandateType: Yup.string().required('mandate type is required'),
  merchantId: Yup.string().required('Merchant ID is required'),
  merchantCode: Yup.string().required('Merchant Code is required'),
  productId: Yup.string().required('Product ID is required'),
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be a positive number')
    .typeError('Amount must be a number'),
  startDate: Yup.string().required('Start date is required'),
  endDate: Yup.string().required('End date is required'),
  dayToApply: Yup.string().required('Day to apply is required'),
  frequency: Yup.string().required('Frequency is required'),
  service: Yup.string().required('Service is required'),
  accountName: Yup.string().required('Account name is required'),
  accountNumber: Yup.string().required('Account number is required'),
  bankCode: Yup.string().required('Bank code is required'),
  supportingDocument: Yup.string().required('File is required'),
  narration: Yup.string().required('Narration is required'),
  payerName: Yup.string().required('Payer name is required'),
  payerEmailAddress: Yup.string()
    .email('Please enter a valid email address')
    .required('Payer email address is required'),
  payerPhoneNumber: Yup.string().required('Payer phone number is required'),
  payerAddress: Yup.string().required('Payer address is required'),
  payeeName: Yup.string().required('Payee name is required'),
  payeeEmailAddress: Yup.string().required('Payee email address is required'),
  payeePhoneNumber: Yup.string().required('Payee phone number is required'),
  payeeAddress: Yup.string().required('Payee address is required'),
  biller: Yup.string().required('Biller is required'),
  billerId: Yup.string().required('Biller id is required'),
  billerAccountNumber: Yup.string().required('Biller account number id is required'),
  billerAccountName: Yup.string().required('Biller account name id is required'),
  billerBankCode: Yup.string().required('Biller bank code id is required'),
  billerBankName: Yup.string().required('Biller bank name id is required'),
});

export const updateMandateSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be a positive number')
    .typeError('Amount must be a number'),
});

export const createStaffUserSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  firstName: Yup.string().required('Firstname is required'),
  lastName: Yup.string().required('Lastname is required'),
  staffId: Yup.string().required('Employee ID is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Employee email is required'),
  phoneNumber: Yup.string().required('Employee phone number is required'),
  branch: Yup.string().required('Branch is required'),
  role: Yup.string().required('User role is required'),
});

export const createProfileSchema = Yup.object().shape({
  merchantID: Yup.string().required('Merchant ID is required'),
  merchantName: Yup.string().required('Merchant name is required'),
  accountID: Yup.string().required('Account ID is required'),
  accountNumber: Yup.string().required('Account number is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  password: Yup.string().required('Employee ID is required'),
  role: Yup.string().required('User role is required'),
});
export const createAccountSchema = Yup.object().shape({
  merchantId: Yup.string().required('Merchant ID is required'),
  merchantName: Yup.string().required('Merchant name is required'),
  accountName: Yup.string().required('Account name is required'),
  accountNumber: Yup.string().required('Account number is required'),
  cif: Yup.string().required('CIF number is required'),
});

export const addRoleSchema = Yup.object().shape({
  roleName: Yup.string().required('Role name is required'),
  roleDescription: Yup.string().required('Role Description is required'),
});

export const addRolePermissionSchema = Yup.object().shape({
  groupName: Yup.string().required('Group name is required'),
});
