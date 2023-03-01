import { useDispatch, useSelector } from "react-redux"
import { addRefreshJWT } from ".";
import { JWTProps } from "../type"

export const useJWToken = () => {
    const refreshJWToken = useSelector(
        (state: { jwt: JWTProps }) => state.jwt.refreshJWT
    );
    const dispatch = useDispatch();

    const setRefreshJWToken = (jwToken:string) => {
        dispatch(addRefreshJWT(jwToken));
    }

    return {
        refreshJWToken,
        setRefreshJWToken
    }
}