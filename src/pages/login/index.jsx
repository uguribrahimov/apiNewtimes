
import axios from '../../interseptor/axiosInstance'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, CardHeader, CardTitle, Col, Container, Input, Label, Row, Button } from 'reactstrap'
import axiosInstance from '../../interseptor/axiosInstance'

const Login = () => {
  const { control, handleSubmit, } = useForm()
  const navigate = useNavigate()

  const login = async (values) => {
      try { const data = await axiosInstance.post('login',values)
        
      localStorage.setItem("token", data.data.token)
      console.log(data.data.token);
      navigate("/roles")
      } catch (error) {
        console.log(error);
        
      }
       
  }

  return (
    <Container className='mt-5'>
      <Row className="justify-content-center">
        <Col sm={12} md={4}>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(login)}>
                <Controller
                rules={{required:true}}
                  name="email"
                  control={control}
                  render={({field: {value, onChange }, fieldState:{error}}) => (
                    <div className="mb-3">
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        value={value}
                        onChange={onChange}
                        invalid={error}
                        
                      />
                    </div>
                  )}
                />

                <Controller 
                rules={{required:true}}
                  name="password"
                  control={control}
                  render={({field: {value, onChange }, fieldState:{error}}) => (
                    <div className="mb-3">
                      <Label htmlFor='password'>Password</Label>
                      <Input
                        id='password'
                        type='password'
                        value={value}
                        onChange={onChange}
                        invalid={error}
                   
                      />
                    </div>
                  )}
                />

                <Button color="primary" type="submit">Login</Button>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login









