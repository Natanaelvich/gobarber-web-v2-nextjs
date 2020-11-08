import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container loading={Number(loading)}>
      <button disabled={loading} type="button" {...rest}>
        {loading ? 'Enviado...' : children}
      </button>
    </Container>
  );
};

export default Button;
