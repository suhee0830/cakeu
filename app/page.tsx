"use client";

import { useState } from "react";

export default function Home() {
  const [nickname, setNickname] = useState("");

  return (
    <main className="min-h-screen bg-[#FFF9F5] flex items-center justify-center px-6">
      <div className="w-full max-w-[430px] flex flex-col items-center text-center">
        
        {/* Cake */}
        <div className="mb-10">
          <div className="relative w-32 h-24">
            {/* Candle */}
            <div className="absolute left-1/2 -top-10 -translate-x-1/2">
              <div className="w-2 h-10 bg-[#F5C8C8] rounded-full" />
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xl">
                ✦
              </div>
            </div>

            {/* Cake */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-[#F7D8C8] rounded-[18px] shadow-sm" />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#FFF1E8] rounded-full" />

            {/* Cream dots */}
            <div className="absolute bottom-[42px] left-5 w-3 h-3 bg-white rounded-full" />
            <div className="absolute bottom-[39px] left-14 w-3 h-3 bg-white rounded-full" />
            <div className="absolute bottom-[42px] right-5 w-3 h-3 bg-white rounded-full" />
          </div>
        </div>

        {/* Text */}
        <div className="mb-10">
          <h1 className="text-[26px] font-semibold tracking-[-0.04em] text-[#2F2927]">
            CAKE:U에 오신 걸 환영해요!
          </h1>

          <p className="mt-3 text-[16px] leading-7 text-[#817772]">
            어떤 이름으로 함께할까요?
          </p>
        </div>

        {/* Nickname input */}
        <div className="w-full">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="이름을 입력해주세요"
            className="w-full h-14 rounded-2xl border border-[#E8DDD7] bg-white px-5 text-[16px] text-[#2F2927] outline-none placeholder:text-[#B8AAA3] focus:border-[#E8B7B7]"
          />

          <button
            className="mt-3 w-full h-14 rounded-2xl bg-[#E8B7B7] text-[16px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!nickname.trim()}
            onClick={() => {
              sessionStorage.setItem("cakeu-nickname", nickname.trim());
              window.location.href = "/party";
            }}
          >
            참여하기
          </button>
        </div>

        <p className="mt-6 text-[12px] text-[#B8AAA3]">
          함께 축하하고 싶은 마음을 남겨보세요.
        </p>
      </div>
    </main>
  );
}