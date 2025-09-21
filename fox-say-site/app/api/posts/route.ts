import { NextRequest, NextResponse } from "next/server";

// GET /api/posts
export async function GET(request: NextRequest) {
  try {
    const posts = [
      { id: 1, title: "Первый пост", content: "Содержание первого поста" },
      { id: 2, title: "Второй пост", content: "Содержание второго поста" },
    ];

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при получении постов" },
      { status: 500 }
    );
  }
}

// POST /api/posts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Заголовок и содержание обязательны" },
        { status: 400 }
      );
    }

    const newPost = {
      id: Date.now(),
      title: body.title,
      content: body.content,
      createdAt: new Date(),
    };

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при создании поста" },
      { status: 500 }
    );
  }
}
