import { useState } from "react";
import { auth, provider } from "./../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage = () => {
  // Kaydol modunda mıyız? state'i
  const [isSignUp, setIsSignUp] = useState(false);
  // email ve passwordu state ile tutma
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  // şifre değiştirme butonu state tutma
  const [isForgetPass, setIsForgetPass] = useState(false);
  // giriş yapınca yönlendirme
  const navigate = useNavigate();

  // hesaba giriş yap veya oluşturma kısmı
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // yeni hesap oluştur
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Hesabınız başarıyla oluşturuldu");
          navigate("/feed");
        })
        .catch((err) => toast.error(`Üzgünüz bir hata oluştu : ${err.code}`));
    } else {
      // varolan hesapta oturum aç
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Hesabınıza giriş yapıldı");
          navigate("/feed");
        })
        .catch((err) => {
          // şifre yanlış girildiğinde butonun ortaya çıkması
          if (err.code === "auth/invalid-credential") {
            setIsForgetPass(true);
          }
          toast.error(`Üzgünüz bir hata oluştu : ${err.code}`);
        });
    }
  };

  // şifre sıfırlama posta gönderme
  const sendMail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Şifre sıfırlama bağlantısı mail yoluyla gönderildi");
      })
      .catch(() => {
        toast.error("Mail gönderilemedi");
      });
  };

  // Google ile giriş
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then(() => navigate("/feed"));
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="flex flex-col bg-black gap-10 py-16 px-32 rounded-lg ">
        {/* logo */}
        <div className="flex justify-center">
          <img className="h-[60px]" src="/x-logo.webp" />
        </div>

        <h1 className="text-center fond-bold text-xl">Twitter'a giriş yap</h1>

        {/* Google button */}
        <button
          onClick={loginWithGoogle}
          className="flex items-center bg-white py-2 px-10 rounded-full text-black cursor-pointer gap-3 transition hover:bg-gray-300"
        >
          <img className="h-[20px]" src="/google-logo.svg" />
          <span className="whitespace-nowrap">Google ile giriş yap</span>
        </button>

        {/* Giriş Formu */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            required
            className="text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-[gray]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="mt-5">Şifre</label>
          <input
            type="password"
            required
            className="text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-[gray] transition"
            onChange={(e) => setPass(e.target.value)}
          />

          <button className="bg-white text-black mt-7 rounded-full p-1 font-bold transition hover:bg-gray-300">
            {!isSignUp ? "Giriş Yapın" : "Kaydolun"}
          </button>

          <p className="mt-5 flex gap-1">
            <span className="text-gray-500">Hesabınız yoksa</span>
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 cursor-pointer select-none"
            >
              {isSignUp ? "Giriş Yapın" : "Kaydolun"}
            </span>
          </p>
        </form>

        {/* Şifre yanlış girilirse göster */}
        {isForgetPass && (
          <p
            onClick={sendMail}
            className="text-center text-red-500 cursor-pointer"
          >
            Şifrenizi mi unuttunuz ?
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
