import React, { useMemo, useState } from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import {Link as RouterLink} from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingWithEmailPassword } from '../../store/auth/thunks'

const formData = {
  email:'santiago@gmail.com',
  password:'123456',
  displayName:'Santiago Moreno'
}

const formValidations = {
  email:[(value)=>value.includes('@'),'El correo debe tener una @'],
  password:[(value)=>value.length >= 6 ,'El password debe tener mas de 6 caracteres'],
  displayName:[(value)=>value.length>1,'El nombre es obligatorio']
}
export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const {displayName,email,password,onInputChange,formState,isFormValid
  ,displayNameValid,emailValid,passwordValid,} = useForm(formData,formValidations)
    console.log(displayNameValid)
  const dispatch = useDispatch()
  const {status,errorMessage} = useSelector(state => state.auth)
  const isCheckingAuthentication = useMemo(()=> status === 'checking',[status])

  const onSubmit = (event)=>{

    event.preventDefault()
    if(!isFormValid) return;
    setFormSubmitted(true)
    dispatch(startCreatingWithEmailPassword(formState))
  }
  return (
    <AuthLayout title = "Register">

    <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'
>
      <h1>FormValid {isFormValid?'VALIDO':'INCORRECTO'}</h1>
      <Grid container>
      <Grid item xs={12} sx = {{mt:2}}>
          <TextField label = "Nombre completo" type="text" placeholder='John doe' fullWidth
          name = "displayName" value = {displayName} onChange={onInputChange}
          error={!!displayNameValid &&formSubmitted}
          helperText={displayNameValid}/>
        </Grid>
        <Grid item xs={12} sx = {{mt:2}}>
          <TextField label = "Correo" type="email" placeholder='correo@google.com' fullWidth
          name = "email" value = {email} onChange={onInputChange}
          error={!!emailValid &&formSubmitted}
          helperText={emailValid}/>
        </Grid>
        <Grid item xs={12} sx = {{mt:2}}>
          <TextField label = "Contrasena" type="password" placeholder='correo@google.com' fullWidth
          name = "password" value = {password} onChange={onInputChange}
          error={!!passwordValid &&formSubmitted}
          helperText={passwordValid}/>
        </Grid>
        <Grid container spacing = {2} sx = {{mb:2,mt:1}}>
        <Grid item xs = {12} >
              <Button type='submit' variant = 'contained' fullWidth disabled = {isCheckingAuthentication}>Crear cuenta</Button>
          </Grid>

          <Grid item xs = {12} display={!!errorMessage ? '':'none'}>
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
          <Grid item xs = {12}>
        
          </Grid>
        </Grid>

        <Grid container direction='row' justifyContent='end'>
          <Typography sx = {{mr:1}}>Ya tienes cuenta?</Typography>
          <Link component = {RouterLink} color = 'inherit' to = "/auth/login">
           Ingresar
          </Link>
       
        </Grid>
      </Grid>
    </form>
</AuthLayout>
  )
}
