import { useEffect, useState } from "react";
import Form from "./Form";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";
import Spinner from "./Spinner";
import Post from "./Post/index";

const Main = ({ user }) => {
  // kolleksiyonun referansını alma
  const tweetsCol = collection(db, "tweets");
  const [tweets, setTweets] = useState(null);

  // atılan tweetin yukarı
  // filtreleme ayarları tanımla

  useEffect(() => {
    // Tweetlere abone olma
    const unsub = onSnapshot(tweetsCol, (snapshot) => {
      // geçici dizi
      const tempTweets = [];

      // bütün dökümanları dön veri ve id'lerinden oluşan objeleri geçici diziye aktar
      snapshot.forEach((doc) =>
        tempTweets.push({
          id: doc.id,
          ...doc.data(),
        })
      );

      // geçici dizideki verileri state aktar
      setTweets(tempTweets);
    });

    // bileşenden çıkınca abonelik sonlansın
    return () => unsub();
  }, []);

  return (
    <div className="border border-gray-700 overflow-y-auto">
      <header className="font-bold p-4 border-b-[1px] border-gray-700">
        Home
      </header>

      <Form user={user} />

      {/* Tweet List */}
      {!tweets ? (
        <div className="flex justify-center my-10">
          <Spinner style={"w-6 h-6 text-blue-600"} />
        </div>
      ) : (
        tweets.map((tweet) => <Post tweet={tweet} key={tweet.id} />)
      )}
    </div>
  );
};

export default Main;
