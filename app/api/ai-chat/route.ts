import { NextRequest, NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const message = String(body.message || "").trim();
    const language = String(body.language || "en");

    const history = Array.isArray(body.history)
      ? (body.history as ChatMessage[])
      : [];

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "GEMINI_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

    const systemInstruction = `
You are AI Krishi Mitra, an agriculture assistant for Indian farmers.

The farmer's selected application language is: ${language}.

IMPORTANT:
- Understand the farmer's question even if it is spoken or typed.
- ALWAYS reply in the same language used by the farmer.
- NEVER switch to English unless the farmer asks in English.
- Use very simple language.
- Give practical farming guidance.
- You can answer questions about crops, irrigation, fertilizer,
  pests, diseases, soil, harvesting, storage and agricultural practices.
- Do not invent live mandi prices or live weather information.
- If current/live information is required, clearly mention that
  live verification is required.
- Do not claim to diagnose a crop disease with certainty from text alone.
- When useful, give clear step-by-step actions.
`;

    const contents = [
      ...history.map((item) => ({
        role: item.role === "assistant" ? "model" : "user",
        parts: [{ text: item.content }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const requestBody = {
      system_instruction: {
        parts: [{ text: systemInstruction }],
      },
      contents,
    };

    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

    // Retry up to 3 times for temporary Gemini overload
    let response: Response | null = null;
    let errorText = "";

    for (let attempt = 1; attempt <= 3; attempt++) {
      response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        break;
      }

      errorText = await response.text();

      console.error(`Gemini API error - attempt ${attempt}:`, errorText);

      // Retry only for temporary overload/rate-limit errors
      if (response.status !== 503 && response.status !== 429) {
        break;
      }

      if (attempt < 3) {
        await new Promise((resolve) =>
          setTimeout(resolve, attempt * 2000)
        );
      }
    }

    if (!response || !response.ok) {
      return NextResponse.json(
        {
          error: "AI service request failed.",
          details: errorText,
        },
        { status: response?.status || 500 }
      );
    }

    const data = await response.json();

    const answer =
      data.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || "")
        .join("")
        .trim() ||
      "Sorry, I could not generate a response.";

    return NextResponse.json({
      answer,
    });
  } catch (error) {
    console.error("AI chat error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while processing the AI request.",
      },
      { status: 500 }
    );
  }
}