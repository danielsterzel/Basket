import { api } from "./base-api";

import {
  type UserRegisterSuccess,
  type UserRegister,
  type UserLogin,
  type UserLoginSuccess,
  type UserConfirmEmailRequest,
  type UserConfirmEmailResponse,
  type UserResendEmailRequest,
  type UserResendEmailResponse,
  type UserRead,
  UserResendEmailResponseSchema,
  UserRegistrationSuccessSchema,
  UserLoginSuccessSchema,
  UserConfirmEmailResponseSchema,
  UserReadSchema
} from "./zod-schemas";


// handle PYDANTIC CUSTOM ERRORS
export async function registerUser(registerUserRequest: UserRegister) {
  const endpointPath = "user/register";
  const authRequired = false;
  const response = await api.post<UserRegisterSuccess, UserRegister>(
    endpointPath,
    registerUserRequest,
    authRequired,
  );
  const userRegistrationStatus = UserRegistrationSuccessSchema.parse(response);

  return userRegistrationStatus;
}

export async function loginUser(loginUserRequest: UserLogin) {
  const endpointPath = "user/login";
  const authRequired = false;
  const response = await api.post<UserLoginSuccess, UserLogin>(
    endpointPath,
    loginUserRequest,
    authRequired,
  );
  return UserLoginSuccessSchema.parse(response);
}

export async function confirmUserEmail(confirmUserEmailRequest: UserConfirmEmailRequest)
{

    const endpointPath = "user/confirm_email";
    const authRequired = false;
    const response = await api.post<UserConfirmEmailResponse, UserConfirmEmailRequest>(
        endpointPath,
        confirmUserEmailRequest,
        authRequired
    );
    const confirmEmailStatus = UserConfirmEmailResponseSchema.parse(response);
    return confirmEmailStatus;
}

export async function resendEmail(
  resendEmailRequest: UserResendEmailRequest
)
{
  const endpointPath = "user/resend_email";
  const authRequired = false;
  const response = await api.post<UserResendEmailResponse, UserResendEmailRequest>(
    endpointPath, resendEmailRequest, authRequired
  );

  return UserResendEmailResponseSchema.parse(response);
}

export async function getCurrentUser() {
  const response = await api.get<UserRead>("user/me");

  return UserReadSchema.parse(response);
}
