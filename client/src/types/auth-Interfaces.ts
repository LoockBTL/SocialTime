export interface LoginData {
  login: string
  password: string
}

export interface LoginSuccess {
  id: string
  img: string
  surname: string
  name: string
  about: string
  dateRegistration: string
  friends: string[]
  groups: string[]
  posts: string[]
  dialogs: string[]
  settings: {
    theme: string
    img: string
    about: string
  }
}

export interface UserSettingsInterface {
  theme: string
  img: string
  about: string
}

export type LoginError = string

export interface RegisterRequest {
  email: string
  login: string
  password: string
  name: string
  surname: string
}

export type RegisterSuccess = string

export type RegisterError = string

export interface LoginStatus {
  user: LoginSuccess | null
  error: string | boolean
}

export interface RegistrationStatus {
  registrationMessage: null | string
  registrationError: null | string
}
