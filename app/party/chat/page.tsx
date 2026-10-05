```tsx
"use client";

import { useEffect, useState } from "react";

import { supabase } from "../../../lib/supabase";

type Message = {
  id: number;
  name: string;
  text: string;
  created_at: string;
};

export default function PartyChatPage() {
  const [nickname, setNickname] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const savedNickname = sessionStorage.getItem("cakeu-nickname");

    if (savedNickname) {
      setNickname(savedNickname);
    }
  }, []);

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
      .channel("cakeu-party-room")
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
            const exists = prev.some(
              (item) => item.id === newMessage.id
            );

            if (exists) {
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

  const handleSend = async () => {
    const trimmedText = text.trim();
    const trimmedNickname = nickname.trim();

    if (!trimmedText || !trimmedNickname || sending) {
      return;
    }

    setSending(true);

    const { error } = await supabase.from("messages").insert({
      name: trimmedNickname,
      text: trimmedText,
    });

    if (error) {
      console.error("메시지 전송 실패:", error);
      setSending(false);
      return;
    }

    setText("");
    setSending(false);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await handleSend();
  };

  return (
    <main className="min-h-screen bg-[#FFF9F5] px-5">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col">
        <header className="pt-8 pb-5">
          <h1 className="text-[26px] font-semibold tracking-[-0.04em] text-[#2F2927]">
            오늘의 축하 한 조각
          </h1>

          <p className="mt-2 text-[15px] leading-6 text-[#817772]">
            지금, 전하고 싶은 마음을 남겨주세요.
          </p>
        </header>

        <section className="flex-1 pb-28">
          {messages.length === 0 ? (
            <div className="flex min-h-[50vh] items-center justify-center">
              <p className="text-[14px] text-[#B8AAA3]">
                아직 남겨진 마음이 없어요.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 pt-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="flex flex-col items-start"
                >
                  <div className="mb-1 flex items-center gap-2 px-1">
                    <span className="text-[14px] font-medium text-[#4B403C]">
                      {message.name}
                    </span>

                    <span className="text-[11px] text-[#B8AAA3]">
                      {new Date(message.created_at).toLocaleTimeString(
                        "ko-KR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>

                  <div className="max-w-[85%] rounded-[20px] rounded-tl-[6px] bg-white px-4 py-3 shadow-[0_2px_10px_rgba(80,50,40,0.04)]">
                    <p className="whitespace-pre-wrap break-words text-[15px] leading-6 text-[#403633]">
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="fixed bottom-0 left-0 right-0 bg-[#FFF9F5]/95 px-5 pb-5 pt-3 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-[430px]">
            <form
              onSubmit={handleSubmit}
              className="flex w-full items-center gap-2"
            >
              <input
                type="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="메시지를 작성해주세요"
                autoComplete="off"
                className="h-12 min-w-0 flex-1 rounded-2xl border border-[#E8DDD7] bg-white px-4 text-[15px] text-[#2F2927] outline-none placeholder:text-[#B8AAA3] focus:border-[#E8B7B7]"
              />

              <button
                type="submit"
                disabled={sending}
                className="flex h-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8B7B7] px-5 text-[15px] font-medium text-white disabled:opacity-50"
              >
                {sending ? "전송 중" : "보내기"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
```
