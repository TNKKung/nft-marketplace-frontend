import { useDispatch, useSelector } from "react-redux";
import { addRefreshJWT as addRefreshJWTAction } from ".";
import { JWTProps } from "../type";

export const useJWToken = (): {
  refreshJWToken: string;
  reducer: { handleSetRefreshJWToken: (jwToken: string) => void };
} => {
  const refreshJWToken = useSelector(
    (state: { jwt: JWTProps }) => state.jwt.refreshJWT
  );

  const dispatch = useDispatch();

  const handleSetRefreshJWToken = (jwToken: string) => {
    dispatch(addRefreshJWTAction({ refresh: jwToken }));
  };

  return {
    refreshJWToken,
    reducer: { handleSetRefreshJWToken },
  };
};
