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
    <main
      className="min-h-screen px-6"
      style={{
        backgroundImage: "url('/background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center -50px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center">
        <div
  className="mb-10 h-[155px] w-[155px] translate-y-16 bg-contain bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/cake.svg')" }}
  aria-label="CAKE:U 케이크"
/>

          <h1 className="text-center text-[18px] font-semibold tracking-[-0.04em] text-[#2F2927] translate-y-10">
            CAKE:U에 오신 걸 환영해요!
          </h1>

          <p className="mt-3 translate-y-8 text-center text-[16px] leading-7 text-[#817772]">
            어떤 이름으로 함께할까요?
          </p>

          <div className="mt-8 flex translate-y-6 items-center justify-center gap-3">
            <img
              src="/input-left.svg"
              alt=""
              className="h-5 w-5 object-contain"
            />

            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="이름을 입력해주세요"
              className="h-10 w-[240px] rounded-full border border-[#FF68FF] bg-white px-5 text-[16px] text-black outline-none placeholder:text-[#B8AAA3] focus:border-[#FF68FF]"
            />

            <img
              src="/input-right.svg"
              alt=""
              className="h-5 w-5 object-contain"
            />
          </div>

          <a
            href="/party/chat"
            className="mt-3 translate-y-8 flex h-10 w-[130px] items-center justify-center rounded-full bg-[#28FFFF] text-[15px] font-medium text-black"
          >
            참여하기
          </a>
        </div>
      </div>
    </main>
  );
}