import React from "react";
import "animate.css";
import "tailwindcss/tailwind.css";

const Landing = () => {
  return (
    <div className="mx-auto flex flex-col justify-center items-center h-screen snap-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black animate__animated animate__fadeIn">
          🌎探索、点击、连接
        </h1>
        <h2 className="text-2xl min-[320px]:text-xl mt-5 text-black animate__animated animate__fadeIn">
          🎓独博网，您通往全球博士机会的窗口
        </h2>
      </div>
      <h3 className="text-7xl min-[320px]:text-3xl font-bold mt-10 text-black animate__animated animate__headShake">
        🔥Coming Soon🔥
      </h3>
    </div>
  );
};

export default Landing;
