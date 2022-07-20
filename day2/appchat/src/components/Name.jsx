import { useAuth0 } from "@auth0/auth0-react";
export default function Name() {
  const { user, isAuthenticated } = useAuth0();
  if (isAuthenticated === true) {
    return isAuthenticated && user.nickname;
  } else {
    return "Ẩn Danh";
  }
}
