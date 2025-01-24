import * as Yup from 'yup';

export const resetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format, please enter a valid email address')
    .required('Email is required'),
});

export const changeForgottenPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Required')
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
  newPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), 'null'], 'Passwords must match'),
});

export const changePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required(
    'Invalid password format, please follow the password requirements',
  ),
  newPassword: Yup.string().required(
    'Invalid password format, please follow the password requirements',
  ),
});

export const userLoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format, please enter a valid email address')
    .required('Email is required'),
  password: Yup.string().required(
    'Invalid password format, please follow the password requirements',
  ),
});

export const OTPValidationSchema = Yup.object().shape({
  otp: Yup.number()
    .test(
      'numbers',
      'Must be exactly 6 digits',
      (value) => !value || /^[0-9]{6}$/.test(value as any),
    )
    .required('OTP is required'),
});

export const reasonForRejectionSchema = Yup.object().shape({
  remark: Yup.string().required('Please enter reason for rejecting'),
});

export const onboardMerchantSchema = Yup.object().shape({
  // merchantCIF: Yup.string().required('Merchant CIF is required'),
  // accountNumber: Yup.mixed().when('merchantCIF', ([merchantCIF], schema) => {
  //   if (merchantCIF)
  //     return Yup.string()
  //       .min(10, 'Invalid Account Number')
  //       .max(10, 'Invalid Account Number')
  //       .required('Account Number is required');
  //   return schema;
  // }),
  accountNumber: Yup.string()
    .min(10, 'Invalid Account Number')
    .max(10, 'Invalid Account Number')
    .required('Account Number is required'),
  merchantAccountValidated: Yup.boolean().required('Merchant Account needs to be validated'),
  merchantName: Yup.mixed().when('accountNumber', ([accountNumber], schema) => {
    if (accountNumber) return Yup.string().required('Merchant Name is required');
    return schema;
  }),
  rcNumber: Yup.mixed().when('accountNumber', ([accountNumber], schema) => {
    if (accountNumber) return Yup.string().required('RC Number is required');
    return schema;
  }),
  address: Yup.mixed().when('accountNumber', ([accountNumber], schema) => {
    if (accountNumber) return Yup.string().required('Address is required');
    return schema;
  }),
  merchantFee: Yup.mixed().when('accountNumber', ([accountNumber], schema) => {
    if (accountNumber)
      return Yup.number()
        .required('Merchant Fee is required')
        .positive('Merchant Fee must be a positive number')
        .typeError('Merchant Fee must be a number');
    return schema;
  }),
});

export const editMerchantSchema = Yup.object().shape({
  merchantName: Yup.string().required('Merchant Name is required'),
  accountNumber: Yup.string()
    .min(10, 'Invalid Account Number')
    .max(10, 'Invalid Account Number')
    .required('Account Number is required'),
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
  accountNumber: Yup.string()
    .min(10, 'Invalid Account Number')
    .max(10, 'Invalid Account Number')
    .required('Account number is required'),
  accountId: Yup.string().required('Account ID is required'),
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
  billerCode: Yup.string().required('Biller Code is required'),
  billerAccountNumber: Yup.string()
    .min(10, 'Invalid Account Number')
    .max(10, 'Invalid Account Number')
    .required('Biller account number is required'),
  // billerAccountName: Yup.string().required('Biller account name id is required'),
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
  firstName: Yup.string().required('Firstname is required'),
  lastName: Yup.string().required('Lastname is required'),
  staffId: Yup.string().required('Employee ID is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Employee email is required'),
  phoneNumber: Yup.string().required('Employee phone number is required'),
  branch: Yup.string().required('Branch is required'),
  role: Yup.string().required('User role is required'),
  address: Yup.string().required('User address is required'),
});

export const createProfileSchema = Yup.object().shape({
  merchantID: Yup.string().required('Merchant ID is required'),
  merchantName: Yup.string().required('Merchant name is required'),
  accountID: Yup.string().required('Account ID is required'),
  accountNumber: Yup.string()
    .min(10, 'Invalid Account Number')
    .max(10, 'Invalid Account Number')
    .required('Account number is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must not exceed 16 characters')
    .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, 'Password must be alphanumeric')
    .matches(/[\W_]/, 'Password must include at least one special character'),
  role: Yup.string().required('User role is required'),
});

export const createAccountSchema = Yup.object().shape({
  merchantId: Yup.string().required('Merchant ID is required'),
  merchantName: Yup.string().required('Merchant name is required'),
  accountName: Yup.string().required('Account name is required'),
  accountNumber: Yup.string()
    .min(10, 'Invalid Account Number')
    .max(10, 'Invalid Account Number')
    .required('Account number is required'),
  cif: Yup.string().required('CIF number is required'),
});

export const addRoleSchema = Yup.object().shape({
  roleName: Yup.string().required('Role name is required'),
  roleDescription: Yup.string().required('Role Description is required'),
  designation: Yup.string().required('Designation is required'),
});

export const assignRoleSchema = Yup.object().shape({
  userId: Yup.string().required('User is required'),
  roleId: Yup.string().required('Role is required'),
});

// export const addRolePermissionSchema = Yup.object().shape({
//   groupId: Yup.string().required('Group name is required'),
//   permissions: Yup.array()
//     .min(1, 'Please select permissions for this group')
//     .nullable()
//     .required('User permission is required'),
// });

export const addRolePermissionSchema = Yup.object().shape({
  groupId: Yup.string().required('Group name is required'),
  permissions: Yup.array()
    .of(
      Yup.object().shape({
        module: Yup.string().required('Module is required'),
        canList: Yup.boolean(),
        canListAll: Yup.boolean(),
        canDelete: Yup.boolean(),
        canRead: Yup.boolean(),
        canCreate: Yup.boolean(),
        canUpdate: Yup.boolean(),
        canEnable: Yup.boolean(),
        canDisable: Yup.boolean(),
        canApprove: Yup.boolean(),
      }),
    )
    .min(1, 'Please select permissions for this group')
    .nullable()
    .required('User permission is required')
    .test(
      'at-least-one-true',
      'Each permission Module must have at least one action enabled (checked).',
      (permissions) =>
        permissions &&
        permissions.every((permission) =>
          Object.entries(permission)
            .filter(([key]) => key.startsWith('can'))
            .some(([, value]) => value === true),
        ),
    ),
});
