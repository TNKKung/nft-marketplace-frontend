import { useDispatch, useSelector } from "react-redux";
import {
  addRefreshJWT as addRefreshJWTAction,
  removeRefreshJWT as removeRefreshJWTAction,
} from ".";
import { JWTProps } from "../type";

export const useJWToken = (): {
  refreshJWToken: string;
  reducer: {
    handleSetRefreshJWToken: (jwToken: string) => void;
    handleRemoveRefreshJWToken: () => void;
  };
} => {
  const refreshJWToken = useSelector(
    (state: { jwt: JWTProps }) => state.jwt.refreshJWT
  );

  const dispatch = useDispatch();

  const handleSetRefreshJWToken = (jwToken: string) => {
    dispatch(addRefreshJWTAction({ refresh: jwToken }));
  };

  const handleRemoveRefreshJWToken = () => {
    dispatch(removeRefreshJWTAction());
  };

  return {
    refreshJWToken,
    reducer: { handleSetRefreshJWToken, handleRemoveRefreshJWToken },
  };
};
