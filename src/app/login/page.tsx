"use client";
import { SetLoading } from '@/redux/loadersSlice';
import { Button, Form, message } from 'antd'
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from "next/navigation";
import React from 'react'
import { useDispatch } from 'react-redux';

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      dispatch(SetLoading(true));
      if (!values.username || !values.password) {
        message.error("username or password is invalid");
      }
      const response = await axios.post("/api/login", values);
      message.success(response.data.message);
      
      // localStorage.setItem('info', JSON.stringify(reponse));
      dispatch(SetLoading(false));
      router.push("/");
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };
  
  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-5 w-450">
        <h1 className="text-xl">Learn Test Login</h1>
        <hr />

        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onFinish}
        >
          <Form.Item label="Username" name="username">
            <input type="username" className="input" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <input type="password" className="input" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>




        </Form>
      </div>
    </div>
  )
}

export default page
