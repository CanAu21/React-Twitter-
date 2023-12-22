import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/config";

const ProtectedRoute = () => {
  // aktif kullanıcıyı state ile tutma
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    // anlık olarak kulalnıcının oturumunu izler
    onAuthStateChanged(auth, (user) => {
      console.log(user);

      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  // kullanıcı aktif kullanıcı değilse logine yönelndir
  if (isAuth === false) {
    return <Navigate to={"/"} replace={true} />;
  }

  // Kullanıcının yetkisi varsa alt route'a geçmesine izin verilir
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
