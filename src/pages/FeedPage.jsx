import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Main from "../components/Main";
import Aside from "../components/Aside";
import { useEffect, useState } from "react";

const FeedPage = () => {
  const [user, setUser] = useState(null);

  // kullanıcının bilgisine abone olma
  useEffect(() => {
    // anlık olarak aktif kullanıcının bilgisine abone olma
    // kullanıcı değiştiği anda mevcıt kullanıcının bilgisi state'e aktarıldı
    const unsub = onAuthStateChanged(auth, (currUser) => setUser(currUser));
    // kullanıcı anasayfadan ayrılırsa aboneliği sonlandırılır
    return () => unsub();
  }, []);

  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default FeedPage;
