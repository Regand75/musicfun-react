import * as z from 'zod';
import { loginResponseSchema, meResponseSchema } from '@/features/auth/model/auth.schemas';

export type MeResponse = z.infer<typeof meResponseSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;

// export type MeResponse = {
//   userId: string;
//   login: string;
// };
//
// export type LoginResponse = {
//   refreshToken: string;
//   accessToken: string;
// };

// Arguments
export type LoginArgs = {
  code: string;
  redirectUri: string;
  rememberMe: boolean;
  accessTokenTTL?: string; // e.g. "3m"
};
