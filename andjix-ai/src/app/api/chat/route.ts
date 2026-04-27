import Anthropic from "@anthropic-ai/sdk";
import { ANDJIX_SYSTEM_PROMPT } from "@/lib/system-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-opus-4-7";

const client = new Anthropic();

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: Request) {
  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const messages = (body.messages ?? []).filter(
    (m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.length > 0,
  );

  if (messages.length === 0) {
    return new Response("messages array required", { status: 400 });
  }

  if (messages[0].role !== "user") {
    return new Response("first message must be user", { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = client.messages.stream({
          model: MODEL,
          max_tokens: 2048,
          cache_control: { type: "ephemeral" },
          system: ANDJIX_SYSTEM_PROMPT,
          messages,
        });

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`),
            );
          }
        }

        const final = await response.finalMessage();
        const fullText = final.content
          .filter((b) => b.type === "text")
          .map((b) => (b.type === "text" ? b.text : ""))
          .join("");
        const wantsBooking = fullText.includes("[BOOK]");

        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              done: true,
              wants_booking: wantsBooking,
              usage: {
                input: final.usage.input_tokens,
                output: final.usage.output_tokens,
                cache_read: final.usage.cache_read_input_tokens ?? 0,
                cache_write: final.usage.cache_creation_input_tokens ?? 0,
              },
            })}\n\n`,
          ),
        );
        controller.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : "unknown error";
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`),
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
