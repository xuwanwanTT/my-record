import React, { useState } from 'react';
import './login.less';
import MyInput from '../../component/form/module/MyInput';
import axios from 'axios';

const BASEURL = window.BASEURL;

export default () => {
  const [email, setEmail] = useState(window.localStorage.getItem('email'));
  const [password, setPassword] = useState(window.localStorage.getItem('password'));

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const submit = () => {
    axios({
      baseURL: BASEURL,
      method: 'post',
      url: '/my-record/login',
      data: {
        email,
        password
      }
    }).then(res => {
      const data = res.data.data;
      console.log(data);
      if (data) {
        window.localStorage.setItem('email', data.email);
        window.localStorage.setItem('password', data.password);
        window.localStorage.setItem('userId', data.user_id);
        window.location.hash = '/';
      } else {
        alert('存档认证失败,请检查密码或邮箱');
      }
    }).catch(err => {
      alert(err);
    })
  };

  return (
    <div className={'login-page'}>

      <MyInput value={email}
        placeholder={'请输入邮箱'}
        onChange={changeEmail} />

      <MyInput value={password}
        placeholder={'请输入密码'}
        type={'password'}
        onChange={changePassword} />

      <div className={'link-start'} onClick={submit}> Link Start </div>

    </div>
  );
};
