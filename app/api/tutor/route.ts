import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, lessonId, sectionId, selectedText, labStateSummary, quizState, history } = body;

    const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        ok: true,
        configured: false,
        reply: `💡 **Gia sư AI đang ở chế độ chờ kết nối API Key.**

Để kích hoạt tính năng giải đáp trực tiếp theo bài học và đoạn văn bản bạn bôi đen, bạn chỉ cần thêm khóa API vào file \`.env\` trong thư mục \`erp-1c-academy\`:
\`\`\`env
OPENAI_API_KEY=sk-...
\`\`\`

*(Trong thời gian chưa cấu hình API, toàn bộ 13 bài giảng tiếng Việt, video học tập, phòng thực hành Mini ERP và ngân hàng 90 câu trắc nghiệm vẫn hoạt động hoàn toàn miễn phí & đầy đủ trên trình duyệt của bạn!)*`
      });
    }

    const systemPrompt = `Bạn là Gia sư ERP 1C Academy, nói tiếng Việt, mục tiêu giúp người học hiểu bản chất và vượt qua vòng 1 cuộc thi Hackathon ERP 1C.
Bạn nhận được ngữ cảnh người học:
- Bài học: ${lessonId || 'Tổng quan'}
- Phần kiến thức: ${sectionId || 'Không xác định'}
- Trích đoạn đang đọc: ${selectedText ? `"${selectedText}"` : 'Không có'}
- Trạng thái kho mô phỏng: ${labStateSummary ? JSON.stringify(labStateSummary) : 'Không có'}
- Trạng thái kiểm tra: ${quizState ? JSON.stringify(quizState) : 'Học lý thuyết'}

Quy tắc sư phạm:
1. Giải thích chính xác, dùng ngôn từ trực quan, dễ hiểu, ưu tiên ví dụ thực tế cửa hàng bán máy tính.
2. Trả lời cô đọng trong khoảng 100–220 từ; nêu bật bản chất tại sao hệ thống lại thiết kế như vậy.
3. Nếu người học đang làm bài thi thử chưa nộp: TUYỆT ĐỐI không tiết lộ đáp án A/B/C/D; chỉ gợi ý cách tư duy và khái niệm liên quan để người học tự suy luận.
4. Kết thúc bằng 1 câu hỏi ngắn gợi mở để kiểm tra độ hiểu của học viên.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(Array.isArray(history) ? history.slice(-6) : []),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({
        ok: false,
        configured: true,
        reply: `Lỗi kết nối API AI (${response.status}): Vui lòng kiểm tra lại hạn mức hoặc API Key.`
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Xin lỗi, tôi chưa nhận được câu trả lời từ mô hình.';

    return NextResponse.json({
      ok: true,
      configured: true,
      reply,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      configured: false,
      reply: 'Có lỗi xảy ra khi xử lý yêu cầu tới Gia sư AI.'
    }, { status: 500 });
  }
}
