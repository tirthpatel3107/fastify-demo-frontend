import { jwtDecode, type JwtPayload } from 'jwt-decode';

// Utils
import { LOCAL_STORAGE } from 'src/utils/constants/auth';
import { getLocalStorage } from 'src/utils/storage';

export const decodeJwtToken = (): JwtPayload | null | any => {
  const token = getLocalStorage(LOCAL_STORAGE.TOKEN);
  if (token) {
    return jwtDecode<JwtPayload>(token);
  }
  return null;
};

export const isTokenExpired = () => {
  const decoded = decodeJwtToken();

  if (decoded && decoded.exp && decoded.exp * 1000 < new Date().getTime()) {
    return true;
  } else {
    return false;
  }
};
