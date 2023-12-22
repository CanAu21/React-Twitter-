import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const Form = ({ user }) => {
  // tweet yüklenyior mu ?
  const [isLoading, setIsLoading] = useState(false);
  // kolleksiyon referansı alma
  const tweetsCol = collection(db, "tweets");

  // fotoğrafı storage'e kaydet ve url'sini al
  const uploadImage = async (file) => {
    // dosyam resim değilse fonksiyonu durdur
    if (!file || !file.type.startsWith("image")) return null;

    // dosyayı yükleyeceğimiz yerin referansını alma(yer ayırtma)
    const fileRef = ref(storage, file.name.concat(v4()));

    // ayırttığımız yere dosyayı yükleme
    await uploadBytes(fileRef, file);

    // yüklediğimiz dosyanın url'sine erişmes
    return await getDownloadURL(fileRef);
  };

  // tweet gönderilmesi
  const handleSubmit = async (e) => {
    e.preventDefault();

    // yazı ve resim içeriğine erişme
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    // boş tweet gönderilmesin
    if (!textContent && !imageContent) return toast.info("Please Add tweet");

    // yükleniyor mu true'a çekilir
    setIsLoading(true);

    // fotoğrafı storage'e kaydet ve url'sini al
    const url = await uploadImage(imageContent);

    // tweets kolleksiyonuna yeni döküman ekleme
    await addDoc(tweetsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });
    // yükleniyor mu false'a çekilir
    setIsLoading(false);

    // tweet attıktan sonra inputların sıfırlanması
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px] mt-1"
        src={user?.photoURL}
      />

      <div className="w-full">
        <input
          className="w-full bg-transparent my-2 outline-none md:text-lg"
          type="text"
          placeholder="What is happening?"
        />

        <div className="flex justify-between items-center">
          <input className="hidden" id="image" type="file" />
          <label
            htmlFor="image"
            className="hover:bg-gray-800 text-xl transition p-3 rounded-full cursor-pointer"
          >
            <BsCardImage />
          </label>
          <button className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800">
            {isLoading ? <Spinner /> : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
