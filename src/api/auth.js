import { del, post } from './client'

/** POST /register — public */
export function register(body, options) {
  return post('/register', body, { auth: false, ...options })
}

/** POST /register/phone — public */
export function sendRegisterPhoneOtp(body, options) {
  return post('/register/phone', body, { auth: false, ...options })
}

/** POST /register/phone/verify — public */
export function verifyRegisterPhoneOtp(body, options) {
  return post('/register/phone/verify', body, { auth: false, ...options })
}

/** POST /forgot-password — public */
export function forgotPassword(body, options) {
  return post('/forgot-password', body, { auth: false, ...options })
}

/** POST /forgot-password/verify — public */
export function verifyForgotPassword(body, options) {
  return post('/forgot-password/verify', body, { auth: false, ...options })
}

/** POST /login — public */
export function login(body, options) {
  return post('/login', body, { auth: false, ...options })
}

/** POST /login/google — public */
export function loginGoogle(body, options) {
  return post('/login/google', body, { auth: false, ...options })
}

/** DELETE /user/logout — Sanctum + role=user */
export function logoutUser(body, options) {
  return del('/user/logout', body, options)
}
