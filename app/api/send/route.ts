import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const name = url.searchParams.get("name");
  const text = url.searchParams.get("text");

  if (!name || !text || !name.trim() || !text.trim()) {
    return NextResponse.redirect(
      new URL("/party/chat", request.url)
    );
  }

  const { error } = await supabase.from("messages").insert({
    name: name.trim(),
    text: text.trim(),
  });

  if (error) {
    console.error("메시지 저장 실패:", error);

    return NextResponse.redirect(
      new URL("/party/chat", request.url)
    );
  }

  return NextResponse.redirect(
    new URL("http://172.30.1.95:3000/party/chat")
  );
}