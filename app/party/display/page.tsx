
"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../../lib/supabase";

type Message = {
  id: number;
  name: string;
  text: string;
  created_at: string;
};

export default function PartyDisplayPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = chatContainerRef.current;
  
    if (!container) return;
  
    requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [messages]);

  useEffect(() => {
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id, name, text, created_at")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("메시지 불러오기 실패:", error);
        return;
      }

      setMessages(data ?? []);
    };

    loadMessages();

    const channel = supabase
      .channel("cakeu-display-room")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMessage = payload.new as Message;

          setMessages((prev) => {
            if (prev.some((item) => item.id === newMessage.id)) {
              return prev;
            }

            return [...prev, newMessage];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main className="relative min-h-[100dvh] overflow-hidden px-5">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-no-repeat"
        style={{
          backgroundImage: "url('/background.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center -180px",
        }}
      />

      <div className="mx-auto flex h-[100dvh] w-full max-w-[760px] flex-col">
        <header className="pt-8 pb-5 text-center">
          <p className="text-[22px] font-semibold tracking-[-0.04em] text-[#FCFE71]">
            CAKE:U
          </p>

          <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.04em] text-white">
            오늘의 축하 한 조각
          </h1>
        </header>

        <section
          ref={chatContainerRef}
          className="min-h-0 flex-1 overflow-y-auto pb-8"
        >
          {messages.length === 0 ? (
            <div className="flex min-h-[50vh] items-center justify-center">
              <p className="text-[16px] text-[#B8AAA3]">
                아직 남겨진 마음이 없어요.
              </p>
            </div>
          ) : (
            <div className="ml-6 flex flex-col gap-5 pt-25">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="flex flex-col items-start"
                >
                  <div className="mb-2 flex items-center gap-3 px-1">
                    <span className="text-[18px] font-medium text-[#4B403C]">
                      {message.name}
                    </span>

                    <span className="text-[14px] text-[#B8AAA3]">
                      {new Date(message.created_at).toLocaleTimeString(
                        "ko-KR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>

                  <div className="max-w-[95%] rounded-[22px] rounded-tl-[6px] bg-white px-5 py-4 shadow-[0_2px_10px_rgba(80,50,40,0.04)]">
                    <p className="whitespace-pre-wrap break-words text-[20px] leading-7 text-[#403633]">
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}