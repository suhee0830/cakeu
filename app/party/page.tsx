"use client";

import { useEffect, useState } from "react";

export default function PartyPage() {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const savedNickname = sessionStorage.getItem("cakeu-nickname");

    if (savedNickname) {
      setNickname(savedNickname);
    }
  }, []);

  const handleNicknameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.value;

    setNickname(name);
    sessionStorage.setItem("cakeu-nickname", name);
  };

  return (
    <main className="min-h-screen bg-[#FFF9F5] px-6">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center">
          <img
            src="/cake.png"
            alt="CAKE:U 케이크"
            className="mb-10 w-[220px] object-contain"
          />

          <h1 className="text-center text-[26px] font-semibold tracking-[-0.04em] text-[#2F2927]">
            CAKE:U에 오신 걸 환영해요!
          </h1>

          <p className="mt-3 text-center text-[16px] leading-7 text-[#817772]">
            어떤 이름으로 함께할까요?
          </p>

          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="이름을 입력해주세요"
            className="mt-8 h-14 w-full rounded-2xl border border-[#E8DDD7] bg-white px-5 text-[16px] text-[#2F2927] outline-none placeholder:text-[#B8AAA3] focus:border-[#E8B7B7]"
          />

          <a
            href="/party/chat"
            className="mt-3 flex h-14 w-full items-center justify-center rounded-2xl bg-[#E8B7B7] text-[16px] font-medium text-white"
          >
            참여하기
          </a>
        </div>
      </div>
    </main>
  );
}