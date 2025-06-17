'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Frame from '../../../_components/frame';
import { useForm } from 'react-hook-form';

interface FormValues {
  email: string;
  password: string;
  confirm: string;
  agree: boolean;
}

export default function SignUpPage() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormValues>();

  // watch를 사용하여 실시간으로 값 감시
  const watchEmail = watch('email');
  const watchPassword = watch('password');
  const watchConfirm = watch('confirm');

  // 실시간 유효성 검사
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailPattern.test(watchEmail || '');
  const isPasswordValid = (watchPassword || '').length >= 6;
  const isConfirmValid = watchPassword === watchConfirm;

  // 실시간 에러 메시지
  const getEmailError = () => {
    if (!watchEmail) return '';
    return !isEmailValid ? '유효한 이메일 형식이 아닙니다.' : '';
  };

  const getPasswordError = () => {
    if (!watchPassword) return '';
    return !isPasswordValid ? '비밀번호는 6자리 이상이어야 합니다.' : '';
  };

  const getConfirmError = () => {
    if (!watchConfirm) return '';
    return !isConfirmValid ? '비밀번호가 일치하지 않습니다.' : '';
  };

  // onSubmit 함수 추가
  const onSubmit = async (data: FormValues) => {
    setError('');
    setSuccess('');
    if (!data.agree) {
      setError('약관에 동의해야 합니다.');
      return;
    }
    if (data.password !== data.confirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const res = await fetch('/api/user/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const result = await res.json();
      if (result.ok) {
        setSuccess('회원가입이 완료되었습니다!');
        reset();
      } else {
        setError('이미 존재하는 이메일이거나 서버 오류입니다.');
      }
    } catch {
      setError('서버 오류가 발생했습니다.');
    }
  };

  return (
    <Frame>
      <Bg>
        <SignUpBox>
          <Title>New Account</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Label>email</Label>
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              {...register('email', { 
                required: '이메일을 입력하세요.',
                pattern: {
                  value: emailPattern,
                  message: "유효한 이메일 형식이 아닙니다."
                }
              })}
            />
            {getEmailError() && <ErrorMsg>{getEmailError()}</ErrorMsg>}

            <Label>password</Label>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              {...register('password', { 
                required: '비밀번호를 입력하세요.',
                minLength: {
                  value: 6,
                  message: '비밀번호는 6자리 이상이어야 합니다.'
                }
              })}
            />
            {getPasswordError() && <ErrorMsg>{getPasswordError()}</ErrorMsg>}

            <Label>confirm password</Label>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              {...register('confirm', { 
                required: '비밀번호 확인을 입력하세요.',
                validate: (value) => value === watchPassword || '비밀번호가 일치하지 않습니다.'
              })}
            />
            {getConfirmError() && <ErrorMsg>{getConfirmError()}</ErrorMsg>}

            <Terms>
              <input
                type="checkbox"
                {...register('agree', { required: true })}
                id="terms"
              />
              <label htmlFor="terms">
                <span>
                  I agree to the{' '}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#3b6be4', textDecoration: 'underline' }}
                  >
                    terms
                  </a>
                  .
                </span>
              </label>
            </Terms>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            {success && <SuccessMsg>{success}</SuccessMsg>}
            <SignUpBtn 
              type="submit"
              disabled={!isEmailValid || !isPasswordValid || !isConfirmValid}
            >
              Submit
            </SignUpBtn>
          </Form>
        </SignUpBox>
      </Bg>
    </Frame>
  );
}


const Bg = styled.div`
  min-height: 100vh;
  background: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const SignUpBox = styled.div`
  width: 340px;
  background: #fcffdc;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 32px 20px 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px; /* 화면 위쪽으로 올림 */
`;

const Title = styled.h2`
  font-size: 2rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  color: #000;
  margin-bottom: 24px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
  color: #000;
  margin-bottom: 2px;
`;

const Input = styled.input`
  width: 100%;
  height: 38px;
  border-radius: 100px;
  border: none;
  background: #fff;
  font-size: 1rem;
  padding: 0 16px;
  margin-bottom: 4px;
  box-sizing: border-box;
`;

const Terms = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0 0 0;
  font-size: 0.95rem;
`;

const ErrorMsg = styled.div`
  color: #e74c3c;
  font-size: 0.95rem;
  margin-top: 2px;
`;

const SuccessMsg = styled.div`
  color: #27ae60;
  font-size: 0.95rem;
  margin-top: 2px;
`;

const SignUpBtn = styled.button`
  width: 100%;
  height: 38px;
  background: #d9d9d9;
  border: none;
  border-radius: 100px;
  font-size: 1.2rem;
  color: #222;
  margin-top: 16px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
