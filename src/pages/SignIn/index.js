import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/Auth';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';
import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';
import useSignIn from '../../hooks/api/useSignIn';
import QueryString from 'qs';
import axios from 'axios';
export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loadingSignIn, signIn } = useSignIn();
  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleGitHubLogin = async() => {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize?';
    const params = {
      response_type: 'code',
      scope: 'user',
      client_id: 'ec78846bc23b00734918',
      redirect_uri: 'http://localhost:3000/sign-in'
    };
    
    const queryString = QueryString.stringify(params);
    const authURL = `${GITHUB_URL}${queryString}`;
    try {  
      window.location.href = authURL;
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');
      if (code) { 
        try {
          const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/sign-in/github?code=${code}`);
          console.log(data);
          setUserData({ data });
          toast('Login realizado com sucesso!');
          navigate('/dashboard');
        } catch (error) {
          return error;
        }
      }
    } catch (error) {
      console.log('error', error);
      toast('Não foi possível fazer login com o GitHub');
    }
  };

  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      console.log('response dentro do login comum', userData);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
        </form>
      </Row>
      <Row>
        <button onClick= {() => { handleGitHubLogin();}} className="login">Logar com o GitHub</button>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}
