# ERP 1C Academy

Website tự học tiếng Việt chuyên sâu theo `docs/SKILL.md`, `docs/LESSON_GUIDE.md` và `docs/VIDEO_CATALOG.md`. Hỗ trợ học tập qua bài giảng, video chính thức, phòng thực hành Mini ERP, ngân hàng 90 câu trắc nghiệm thi thử và Gia sư AI đồng hành theo ngữ cảnh.

## Chạy trên máy

Yêu cầu Node.js >=22.13 (đã kiểm thử Node 24 trên macOS).

```sh
cd /Users/vuphuongpham/Desktop/Learn-ERC/erp-1c-academy
npm install
npm run dev
```

Mở http://localhost:5173. Stack: TypeScript, React 19, Next.js App Router qua Vinext/Vite (tương thích hosting Sites), Tailwind CSS, Lucide, Zod và React Context. Không bắt buộc cấu hình `.env` hay database ngoài. Ứng dụng local-first dành cho người học; dữ liệu nằm trong localStorage theo trình duyệt/origin.

## Nội dung và các luồng

- 13 bài L01–L13, 39 section lời giảng được biên soạn chi tiết từ LESSON_GUIDE, mục tiêu, video, nguồn, khởi động 2 câu, ghi chú, đọc thành tiếng bằng Web Speech API.
- Mỗi bài có trắc nghiệm kiểm tra và bài thực hành được chấm bằng lựa chọn/state thực. Các bài L06, L09–L12 dùng sandbox kho cùng bài tình huống.
- **Gia sư AI ngữ cảnh (`/api/tutor`)**: Thanh trợ lý AI học tập 1-1 bên cạnh bài giảng. Hỗ trợ nút "Hỏi Gia sư AI đoạn này" tại từng section, tóm tắt ý chính và đưa ví dụ thực tế (hỗ trợ OpenAI API qua file `.env`, có fallback an toàn khi chưa có key).
- **Mini ERP Simulator**: Catalogs sản phẩm, chứng từ nhiều dòng, sửa Draft, Post, đảo chứng từ với audit trail. Kiểm soát SKU, quantity, số chứng từ, cộng gộp dòng trùng SKU để kiểm tra tồn, không post trùng và không âm kho. Có 2 kho HN-01/HCM-01; seed 20 bàn phím và 12 chuột tại HN-01.
- **Ngân hàng 90 câu hỏi chuẩn hóa** trong `data/question_bank.json`, có giải thích cho mỗi lựa chọn.
- **Mở khóa 2 đề thi thử độc lập**:
  - **R01**: 40 câu / 45 phút (ERP 12 + Nghiệp vụ 12 + 1C 16).
  - **R02**: 50 câu / 55 phút (ERP 15 + Nghiệp vụ 15 + 1C 20).
- Lưu đáp án, mức tự tin, cờ đánh dấu, deadline đếm ngược và kết quả qua reload. Hết giờ khóa sửa; chỉ tự nộp nếu đã đồng ý trước.
- Thành thạo: quiz lần gần nhất >=85% và vượt qua lab. Rolling mastery tính theo 20 lượt gần nhất; Mistakes có lịch nhắc ôn +1/+3/+7 ngày tùy chỉnh.
- Lộ trình theo ngày bắt đầu, backlog và quỹ thời gian 60/90/150 phút.
- 28 thuật ngữ và flashcards, dark mode, menu mobile, tìm kiếm bài, export/import JSON an toàn có Zod validation.

## Routes

`/`, `/dashboard`, `/roadmap`, `/learn/[lessonId]`, `/practice/[labId]`, `/practice/mini-erp`, `/quiz/[quizId]`, `/quiz/review`, `/mock-exam`, `/review/mistakes`, `/glossary`, `/settings`.

## Kiểm tra

```sh
npm run typecheck
npm test
npm run build
```

`tests/engine.test.ts` kiểm tra tồn, double-post, atomic stock validation, reversal, dimension theo kho, scoring (kể cả nhiều đáp án), review schedule, idempotent submission, save/reload, import validation và tính đầy đủ dữ liệu seed.

`node tests/browser.mjs` chạy kiểm thử tương tác trên dev server bằng Playwright. Script mặc định dùng Chrome ở đường dẫn macOS; thay `executablePath` hoặc dùng Chromium của Playwright trên hệ điều hành khác. Ảnh QA nằm ở `outputs/` (không đưa vào Git).

Sinh lại seed khi sửa tài liệu hoặc ngân hàng câu hỏi:

```sh
python3 scripts/seed-course.py
```

## Video và các giới hạn đã biết

Các URL dùng đúng VIDEO_CATALOG của người dùng. YouTube chỉ tải iframe khi người học bấm phát, luôn có fallback URL. `youtube_candidate` chưa được xác thực playback. 1C Skills Hub/Academy có thể cần tài khoản; dùng liên kết nguồn, không ép iframe LMS. Không tải/copy video hoặc transcript. Lời giảng đủ để tự học mà không cần video hay dịch vụ AI.

Ngày thi chưa được xác thực, mặc định để trống và có thể chỉnh ở Settings. Hạn đăng ký trong tài liệu không phải ngày thi. Website tự học cá nhân, không nhận là đối tác hay trang chính thức của NEU/1C; điểm luyện không bảo đảm Top 10.

Không gửi progress đến server. Dữ liệu vẫn có thể mất khi xóa dữ liệu trình duyệt; dùng Export JSON để sao lưu. Khi chuyển từ localhost sang site đã publish cần Export rồi Import vì hai origin có bộ nhớ riêng.

## Hosting

Sites project ID được giữ trong `.openai/hosting.json`. Build ra Cloudflare Worker `dist/server/index.js` cùng tài nguyên client. Site được tạo với quyền riêng tư mặc định; không cần OpenAI API hay dịch vụ trả phí để học. Các script hỗ trợ Sites trong `scripts/` và `worker/` giữ nguyên tích hợp hosting.

Nguồn chính thức đã đối chiếu:

- https://academy.1ci.com/courses/1c-enterprise-first-start
- https://1c-dn.com/learning/1c_enterprise_first_step_beginners_course/
- https://learning.sap.com/courses/managing-purchase-orders-in-sap-ariba-buying-and-invoicing/define-the-purchase-order-lifecycle
