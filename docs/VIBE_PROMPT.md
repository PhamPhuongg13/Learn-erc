# PROMPT VIBE CODE — DÁN VÀO CURSOR / CLAUDE CODE / BOLT / LOVABLE

Hãy xây **website học ERP 1C Academy** hoàn chỉnh (không chỉ demo UI), chuyên giúp tôi luyện vòng 1 cuộc thi **Hackathon Xây dựng giải pháp ERP trên nền tảng 1C 2026**.

**Trước khi code, đọc toàn bộ `SKILL.md`, `curriculum.json`, `question_bank.json` ở thư mục đính kèm. Đó là đặc tả và nội dung seed; KHÔNG tự thay bằng placeholder.**

## Mục tiêu đào tạo
- 4 giai đoạn: ERP nền tảng; quy trình nghiệp vụ; nền tảng 1C; ôn thi.
- 13 bài giảng với **lời giảng đầy đủ bằng tiếng Việt**, mục tiêu, nguồn chính thức, video phù hợp từng bài, trắc nghiệm, bài thực hành và giải thích.
- Hai kỳ thi thử mô phỏng (40 và 50 câu) khi đã đủ câu độc lập, không nhận là đề thật.
- Mini ERP sandbox cho tình huống: tồn đầu 20, post nhập 15 và xuất 8, tồn cuối 27; từ chối xuất > tồn; Draft không ghi kho; chống post hai lần.
- Gia sư AI tương tác trực tiếp tại từng đoạn bài học, người học bôi đen hoặc bấm "Hỏi AI đoạn này" → gửi lesson/section/context/video timestamp (nếu lấy được), bot giải thích như một người thầy bằng tiếng Việt và chủ động hỏi kiểm tra hiểu.

## Thiết kế và UX
- Next.js + TypeScript + Tailwind + shadcn/ui, chất lượng production, nhanh, responsive.
- Desktop: sidebar trái các bài học, trung tâm là video+bài giảng, sidebar phải **Gia sư AI luôn hiện**. Mobile: học bình thường và mở AI tutor bằng bottom sheet.
- Trang: Dashboard, Roadmap, Lesson, Practice, Quiz, Mock Exam, Mistakes, Glossary, Settings. Progress persistent; export/import JSON; dark mode.
- Cấp độ học: lý thuyết → video → thực hành → quiz → chữa lỗi → khuyến nghị học tiếp.
- Không dùng layout rỗng. Mỗi tương tác (tiếp bài, video, hint, nộp quiz, chấm bài, reset lab, chat) phải có hành vi thực.

## Video và nguồn
- Render `video.mode= youtube` bằng YouTube Embed, khi lỗi thì fallback tới watch link.
- `youtube_candidate` là ID công bố trong metadata 1C Skills Hub, **phải** có link đến bài học gốc và fallback; không được nói đã tự kiểm tra video phát thành công.
- `official_course` là nguồn khóa học chính thức có video trong lesson; hiển thị thẻ và nút mở đúng bài trên website nguồn (không giả mạo player hoặc ép iframe khi khóa).
- Lời giảng của website nằm trong JSON tự soạn, không tự sao chép phụ đề/bản quyền của video.

## Gia sư AI
- Tích hợp OpenAI API trên SERVER tại `/api/tutor`, dùng secret `OPENAI_API_KEY` từ env; không gửi key tới client.
- Bot hiểu bài nào, section nào, nội dung bôi đen, trạng thái mini ERP và trạng thái quiz; chế độ đang thi không tiết lộ đáp án trước khi nộp.
- Gợi ý nhanh: “Giải thích dễ hơn”, “Tại sao?”, “Ví dụ thực tế”, “Hỏi lại tôi”, “Tóm tắt 3 ý”.
- Chưa cấu hình API thì UI nói "Chưa kết nối gia sư AI", có hướng dẫn; không mock response để đánh lừa tôi.
- Avatar "Gia sư AI" là giao diện đại diện, không nhận là cùng phiên ChatGPT đang nói chuyện ngoài website.

## Đánh giá
- Dùng câu hỏi đúng từ `question_bank.json`, có phản hồi cụ thể cho từng option sau nộp; lưu câu sai và gợi ý ôn theo concept.
- Mastery >=85% ở quiz kèm lab; mục tiêu 2 mock >=85% và không có nhóm lõi <80%, nhưng không hứa đỗ.
- Khi thiếu tổng số câu đủ cho đề thật, hiển thị Demo (số câu có thật) và cảnh báo, không tạo fake 40/50 câu; có thể bổ sung câu mới đã kiểm chứng vào bank trước khi bật full.
- Hạn đăng ký 20/11/2026 23:59 lấy từ ảnh thể lệ; ngày thi trắc nghiệm chưa được xác nhận, Settings cho người dùng chỉnh ngày thi, không mặc định 20/11 là ngày thi.

## Chất lượng và bàn giao
- Xây mã nguồn hoạt động, `.env.example`, README cài đặt, unit test quiz và kho, `npm run build` pass.
- Thực hiện theo thứ tự: seed dữ liệu → layout → lesson/video → quiz/progress → lab → AI endpoint → review/mock → test.
- Tự kiểm tra tất cả routes và state persisted qua reload. Nếu có chỗ chưa xong, nêu rõ giới hạn chứ không giả là đã có.
- Khi hoàn thành chạy web và trình bày cách sử dụng; ưu tiên hoàn thiện đường đi L01→Video→Lab→Quiz→AI→L02 trước khi mở rộng.

**Bắt đầu tạo toàn bộ ứng dụng ngay. Không hỏi thêm các câu đã được giải thích trong file skill.**
