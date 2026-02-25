import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";

export function ProtectedRoute({ children, redirectPath = "/login" }) {
    const { isLoogedIn } = useAuthStore();

    if(!isLoogedIn) {
        return <Navigate to={redirectPath} replace />
    }

    return children;
}