import React, { useEffect } from 'react';
// import "./LoginPage.scss";
import { Heading } from '../../components/Typography/Heading/Heading';
import { RegistrationInfo } from '../../components/RegistrationInfo/RegistrationInfo';
import { AppButton } from '../../components/UI/AppButton/AppButton';
import { AppInput } from '../../components/UI/AppInput/AppInput';
import { LoginStyle } from './LoginPage.style';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from '../../store/userSlice';
import { RootState } from '../../store/store';

const mockUser = {
  mail: 'geremy@email.com',
  phone_number: '98589565',
  user_id: 1,
  name: 'Vasya',
  reg_date: new Date().toISOString,
  city: 'Mahachkala',
};

const loginPageFields = {
  userEmail: '',
  userPassword: '',
};

const loginValidationSchema = yup.object({
  userEmail: yup
    .string()
    .required('Обязательное поле')
    .email('Формат должен соответствовать формату email'),
  userPassword: yup
    .string()
    .required('Обязательное поле')
    .min(4, 'Пароль должен содержать как минимум 4 символа'),
});

export const LoginPage = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: loginPageFields,
    resolver: yupResolver(loginValidationSchema),
  });

  const user = useSelector((state: RootState) => state.userSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoginFormSubmit = (data: any) => {
    // console.log(data);
    // if (data) {
    //   navigate('/main-page')
    // }
    dispatch(changeUser(mockUser));
  };

  useEffect(() => {
    console.log('USER:', user);
    if (user?.user_id) {
      navigate('/profile-page');
    }
  }, [user]);

  return (
    <LoginStyle>
      <Heading headingType="h1" headingText="Авторизация" />
      <form onSubmit={handleSubmit(onLoginFormSubmit)}>
        <Controller
          name="userEmail"
          control={control}
          render={({ field }) => (
            <AppInput
              hasError={!!errors.userEmail}
              errorText={errors.userEmail?.message as string}
              placeholder="Эл. почта"
              {...field}
            />
          )}
        />
        <Controller
          name="userPassword"
          control={control}
          render={({ field }) => (
            <AppInput
              type="password"
              hasError={!!errors.userPassword}
              errorText={errors.userPassword?.message as string}
              placeholder="Пароль"
              {...field}
            />
          )}
        />
        <AppButton type="submit" buttonLabel="Войти" />
      </form>
      <a href="#">Забыли пароль?</a>
      <RegistrationInfo
        text="У вас нет аккаунта?"
        path="/registration-page"
        text2=" Зарегистрироваться"
      />
    </LoginStyle>
  );
};
