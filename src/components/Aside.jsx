import { HiDotsHorizontal } from "react-icons/hi";

const Aside = () => {
  return (
    <div className="mx-7 my-10 max-lg:hidden text-neutral-300">
      <div className="w-80 p-2 rounded-xl bg-gray-600">
        <h2 className="mb-1 font-bold text-black text-xl">Subscribe to Premium</h2>
        <p className="mb-2">
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue.
        </p>
        <button className="p-2 w-24 bg-black rounded-full hover:bg-gray-900">Subscribe</button>
      </div>

      <div className="w-80 my-5 p-2 rounded-xl bg-gray-600">
        <h2 className="mb-1 font-bold text-black text-xl">What’s happening</h2>

        <div className="mt-3 mb-4">
          <div className="flex align-center justify-between">
            <p className=" text-neutral-400">Trending in Australia</p>
            <button className=" rounded-full w-auto shadow hover:shadow-black"><HiDotsHorizontal /></button>
          </div>
          <div>
            <p className="font-bold">#BruceLehrmann</p>
          </div>

          <div className="text-neutral-400">5,781 posts</div>
        </div>

        <div className=" mb-4">
          <div className="flex align-center justify-between">
            <p className=" text-neutral-400">Only on X · Trending</p>
            <button className="rounded-full shadow hover:shadow-black"><HiDotsHorizontal /></button>
          </div>
          <div>
            <p className="font-bold">#厦门代孕</p>
          </div>
        </div>

        <div className=" mb-4">
          <div className="flex align-center justify-between">
            <p className=" text-neutral-400">Trending in Australia</p>
            <button className="rounded-full shadow hover:shadow-black"><HiDotsHorizontal /></button>
          </div>
          <div>
            <p className="font-bold">#Prague</p>
          </div>

          <div className="text-neutral-400">143K posts</div>
        </div>

        <div className="mb-3">
          <div className="flex align-center justify-between">
            <p className=" text-neutral-400">Trending in Australia</p>
            <button className="rounded-full shadow hover:shadow-black"><HiDotsHorizontal /></button>
          </div>
          <div>
            <p className="font-bold">Real Madrid</p>
          </div>

          <div className="text-neutral-400">4,955 posts</div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
