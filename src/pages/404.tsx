import React from 'react';
import Link from 'next/link';
import { Container, Title } from '../styles/pages/Home';

const NotFound: React.FC = () => {
  return (
    <Container>
      <Title>Pagina não encontrada</Title>
      <Title>Você está perdido?</Title>
      <Link href="/">
        <a>Voltar para Home</a>
      </Link>
    </Container>
  );
};

export default NotFound;
