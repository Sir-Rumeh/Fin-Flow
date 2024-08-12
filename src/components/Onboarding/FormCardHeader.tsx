import React from 'react';

interface FormCardHeaderProps {
  children: React.ReactNode;
}

const FormCardHeader = ({ children }: FormCardHeaderProps) => {
  return <div>{children}</div>;
};

export default FormCardHeader;
