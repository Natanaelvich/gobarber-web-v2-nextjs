import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/Logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErros from '../../utils/getValidationErros';
import { useToast } from '../../hooks/modules/ToastContext';
import api from '../../services/api';

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();
  const location = useLocation();

  const hanleSingnIn = useCallback(
    async (data: { confirm_password: string; password: string }) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          confirm_password: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas não batem!',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, confirm_password } = data;

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          confirm_password,
          token,
        });

        addToast({
          type: 'success',
          title: 'Senha resetada',
        });

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente!',
        });
      }
    },
    [addToast, history, location],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="" />

          <Form ref={formRef} onSubmit={hanleSingnIn}>
            <h1>Resetar senha </h1>

            <Input
              placeholder="Senha"
              type="password"
              icon={FiLock}
              name="password"
            />

            <Input
              placeholder="Confirmar Senha"
              type="password"
              icon={FiLock}
              name="confirm_password"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
