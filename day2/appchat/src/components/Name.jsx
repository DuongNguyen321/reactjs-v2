import { useAuth0 } from "@auth0/auth0-react";
export default function Name() {
  const { user, isAuthenticated } = useAuth0();
  if (isAuthenticated === true) {
    return (
      isAuthenticated && <h3 className="userlogin">Xin Chào {user.nickname}</h3>
    );
  } else {
    return <h3 className="notuser">Ẩn danh</h3>;
  }
}
