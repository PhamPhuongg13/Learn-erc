---
name: erp-1c-round1-academy
version: 1.0.0
language: vi-VN
description: Build and teach a Vietnamese interactive ERP/1C learning web app aimed at preparation for Round 1 of the 2026 NEU–1C Hackathon, with verified learning references, lesson videos, practice labs, quizzes, a persistent contextual AI tutor, and mastery tracking.
---

# ERP 1C ROUND 1 ACADEMY — SKILL CHÍNH

> **Mục đích:** Dùng file này làm đặc tả bắt buộc cho AI coding agent (Cursor, Claude Code, Windsurf, Bolt, Lovable...) khi vibe-code một **web học tập THỰC SỰ DÙNG ĐƯỢC**. Nội dung tiếng Việt, giải thích từng bước, ưu tiên kiến thức có khả năng xuất hiện ở vòng 1: ERP, quy trình nghiệp vụ và khái niệm nền tảng 1C.
>
> **Giới hạn sự thật:** Không có đề cương chi tiết/đề mẫu chính thức vòng 1. Mọi điểm ưu tiên, bài tập và đề thử bên dưới là **đề xuất học tập**, KHÔNG phải đề thi thật, không đảm bảo lọt Top 10. Theo ảnh form người học cung cấp: đăng ký 06–20/11/2026 (23:59), vòng 1 có trắc nghiệm trực tuyến; dự kiến thông báo Top 10 ngày 23/11/2026 và đào tạo 23/11–07/12. **Ngày thi trắc nghiệm cụ thể chưa được xác thực**; sản phẩm phải cho chỉnh ngày thi trong Settings, không hardcode countdown tùy tiện.

## A. LỆNH CHÍNH CHO CODING AGENT — VIBE BUILD PROMPT

> Bạn là **principal full-stack engineer + product designer + instructional designer + gia sư ERP/1C**. Hãy xây một ứng dụng học tập hoàn chỉnh tên **ERP 1C Academy**, dành cho một người học tiếng Việt đang chuẩn bị vòng 1 cuộc thi Hackathon xây dựng giải pháp ERP trên nền tảng 1C. Mục tiêu: **hiểu chắc, luyện thực hành, làm tốt trắc nghiệm** chứ không xây một dashboard rỗng.
>
> Đọc và tuân thủ toàn bộ `SKILL.md`, `curriculum.json` và `question_bank.json`. **Dùng dữ liệu thật trong các file**, không dùng placeholder/lorem ipsum, không dựng các nút bấm giả, không tự nhận đã kết nối AI nếu chưa có API. Nếu chỉ có một file, SKILL.md là nguồn chân lý và hãy sinh dữ liệu bài học đúng nội dung ở đây.
>
> **Stack mặc định:** Next.js App Router + TypeScript + Tailwind CSS + shadcn/ui + Lucide + React Hook Form + Zod + Zustand (hoặc Context). Lưu progress bền qua reload bằng localStorage/IndexedDB, có nút Export/Import JSON. AI tutor: endpoint Next.js server `/api/tutor` tích hợp **OpenAI API qua secret phía server**, tuyệt đối không đưa API key vào client. Nếu chưa có `OPENAI_API_KEY`, hiển thị trạng thái "Chưa kết nối gia sư AI" + giải pháp thiết lập và vẫn sử dụng được bài giảng, video, quiz, lab. Có thể dùng DB (SQLite/Prisma) sau khi hoàn tất MVP; mặc định local-first cho 1 người dùng.
>
> **Thiết kế:** clean, premium edtech, Vietnamese-first; desktop layout 3 cột `Sidebar khóa học | Nội dung học + video | Gia sư AI cố định`, mobile sidebar dạng drawer và gia sư AI dạng bottom sheet. Giao diện sáng chủ đạo white/cream với màu điểm nhấn vàng nhẹ–indigo, dark mode tùy chọn; typography dễ đọc; progress, streak, mastery chart, cards, skeleton/loading/empty/error states, responsive, accessible keyboard; đừng để màu hoặc hiệu ứng lấn át việc học.
>
> **Bắt buộc làm thật:** `/dashboard`, `/roadmap`, `/learn/[lessonId]`, `/practice/[labId]`, `/quiz/[quizId]`, `/mock-exam`, `/review/mistakes`, `/glossary`, `/settings`; navigation, video, bài giảng nhiều section, FAQ, flashcards, quiz chấm có giải thích từng đáp án, lab tương tác và lưu tiến độ đều phải hoạt động. Có `Course Seed` từ các file và ít nhất một bài mỗi giai đoạn hoàn chỉnh ngay lần chạy đầu.
>
> **CỰC KỲ QUAN TRỌNG:** Mỗi *bài giảng* có (1) **lời giảng tiếng Việt do nội dung của skill cung cấp**, (2) **một video liên quan** (nhúng YouTube khi được phép; không nhúng được thì hiển thị link trực tiếp đúng bài học chính thức và giải thích), (3) **Gia sư AI xuất hiện liên tục ngay cạnh nội dung** để học viên hỏi bất cứ đoạn chưa hiểu, (4) 1 bài thực hành, (5) quiz với giải thích. Nhấn "Hỏi AI về đoạn này" tại từng đoạn sẽ gửi context: lessonId, sectionId, trích đoạn đang đọc, timestamp video nếu có, câu hỏi, bài lab/quiz hiện tại; AI trả lời ngắn gọn, gợi mở và không tiết lộ đáp án trong chế độ thi. Có chế độ "Giải thích dễ hơn", "Ví dụ mới", "Vì sao đáp án kia sai?", "Kiểm tra tôi".
>
> **Quy trình xây:** 1) types+seed; 2) layout+routes; 3) lesson reader+video; 4) quiz engine+progress; 5) mini ERP lab; 6) contextual AI tutor; 7) mock exam+weakness review; 8) QA end-to-end. Đừng chỉ tả UI: phải tạo mã nguồn chạy được, với README, lệnh `npm install`, `npm run dev`, `.env.example`, kiểm tra typecheck/test/build.

## B. LUẬT DẠY HỌC

1. Phong cách: như gia sư 1-1, không giả định người học biết ERP; giải thích các từ tiếng Anh lần đầu; liên hệ với tư duy lập trình đã có; ưu tiên ví dụ cửa hàng máy tính.
2. Mỗi lesson có `objective`, `prerequisites`, `coreConcepts`, `narration` (ít nhất 3 section đã viết, không chỉ bullet), `video`, `lab`, `quickChecks`, `examTraps`, `summary`, `references`, `estimatedMinutes` và `masteryCriteria`.
3. Mẫu flow: **pretest 2 câu → lời giảng 10–15 phút → xem video → hỏi AI ở chỗ chưa hiểu → thực hành 10–25 phút → quiz 5–10 câu → review**.
4. Lời giảng PHẢI nằm trong web và tự học được không cần AI. AI tutor là lớp bổ sung, không là nguồn nội dung duy nhất.
5. Không khóa cứng không thể chuyển bài. Gợi ý ôn lại nếu <70%; 70–84% cần sửa lỗi; ≥85% được đánh dấu `mastered` khi đã làm lab hoặc bài tình huống; 95% khuyến khích chuyển tiếp. Khi đã pass có thể xem lại bất cứ lúc nào.
6. Câu hỏi thực hành/quiz phải gắn `conceptTags`; review sai có spaced repetition `+1, +3, +7 ngày` (có thể điều chỉnh), học lại theo lỗi, không chỉ tính % tổng thể.
7. Trong chế độ luyện tập: hiển thị giải thích *sau khi chọn/nộp*. Trong mock exam: không hiển thị đáp án/hint trước khi nộp toàn bài.
8. Tỷ trọng ôn tập gợi ý: ERP 30%, nghiệp vụ 30%, 1C 30%, luyện tổng hợp 10%. Đây là **phân bổ thời gian học**, không phải phân bố điểm đề thật.
9. Giới hạn trước vòng 1: không đâm sâu 1C Script, API, deploy, cloud, kế toán nâng cao; vẫn giải thích nhận biết `Reports`, `Roles`, `Forms`, `Queries`, `Posting`.
10. Video: ưu tiên nguồn 1C chính thức, YouTube của tác giả hợp lệ và SAP Learning/Microsoft Learn về nghiệp vụ. Không sao chép video, không tách audio phụ đề trái phép. Không gán timestamp giả. LMS có thể yêu cầu đăng nhập; videoId trong metadata course chỉ là **ứng viên nhúng** và phải có fallback external-link.
11. Tránh "hallucination ngữ cảnh video": không nói đã xem hoặc biết nội dung tại phút xx nếu chưa có transcript đáng tin cậy; trả lời theo nội dung bài hoặc yêu cầu người học dẫn lời video.
12. Đánh giá khả năng qua vòng 1 bằng **mock mastery**, không hiển thị "chắc chắn Top 10"; điều kiện mục tiêu: 2 lần mock ≥85%, kiến thức lõi mỗi nhóm ≥80%, giải thích được lỗi từng câu.

## C. CẤU TRÚC KHÓA HỌC — 4 GIAI ĐOẠN / 13 BÀI GIẢNG / 2 ĐỀ THỬ

### Giai đoạn I — ERP nền tảng (L01–L03; bắt buộc)
- **L01 – ERP là gì?** Định nghĩa, quy trình tích hợp, dữ liệu dùng chung, lợi ích, giới hạn. Lab: phát hiện vấn đề dữ liệu nằm rải rác; đề xuất một nguồn sự thật. Bẫy: ERP ≠ một ứng dụng chỉ quản lý kho.
- **L02 – Các phân hệ ERP** Sales, Purchasing, Inventory, Accounting, HRM, Production; CRM và SCM liên hệ thế nào với ERP. Lab: phân loại yêu cầu vào module và xác định dữ liệu cần trao đổi. Bẫy: CRM ≠ ERP; ERP không chỉ dùng cho tập đoàn.
- **L03 – ERP triển khai và dữ liệu** master/transaction data, quy trình As-Is/To-Be, data consistency, vai trò, chi phí và kháng cự thay đổi. Lab: rà lỗi thông tin khách hàng bị trùng. Bẫy: "ERP tự động sửa quy trình doanh nghiệp" là sai.

### Giai đoạn II — Nghiệp vụ (L04–L06; bắt buộc)
- **L04 – Bán hàng Order-to-Cash** báo giá → sales order → giao hàng/đảm bảo xuất kho → invoice → thu tiền; thứ tự có biến thể theo doanh nghiệp. Lab: mô phỏng 4 đơn hàng với kho đủ/thiếu. Bẫy: có Sales Order chưa đồng nghĩa thu tiền.
- **L05 – Mua hàng Procure-to-Pay** yêu cầu mua → phê duyệt → purchase order → nhận hàng → kiểm invoice → thanh toán; so sánh 3-way matching (PO, goods receipt, invoice). Lab: kiểm toán 1 hóa đơn lệch với phiếu nhận.
- **L06 – Kho, tồn kho và chứng từ** opening stock + receipts − issues; giá trị tồn kho khác số lượng tồn; kiểm soát over-selling; ghi nhận theo sự kiện. Lab: 20 + 15 − 8 = 27; từ chối xuất > tồn.

### Giai đoạn III — 1C:Enterprise nền tảng (L07–L12; bắt buộc theo trọng tâm)
- **L07 – 1C và các chế độ** Platform, Configuration, Designer, Enterprise mode, Low-code. Lab: ghép công cụ và vai trò sử dụng. Bẫy: Platform ≠ một configuration nghiệp vụ cụ thể.
- **L08 – Infobase và Metadata** tạo infobase, metadata class/object, data object, configuration. Lab: lập sơ đồ các đối tượng sẽ cần cho cửa hàng.
- **L09 – Catalogs, Attributes, Subsystems** tạo Products, Customers; thuộc tính, kiểu dữ liệu, reference, hierarchy; phân biệt danh mục với giao dịch. Lab: tạo 3 bản ghi sản phẩm, tìm kiếm, chống trùng mã.
- **L10 – Documents và trạng thái** document, tabular section, number/date, saved vs posted, document journal, posting; lab: phiếu nhập kho có nhiều dòng. Bẫy: lưu một document chưa chắc cập nhật stock.
- **L11 – Registers và Posting** Accumulation Register (quantity balance/turnover), Dimensions, Resources, Recorder, Information Register; lab: post receipt/issue và tính tồn theo location.
- **L12 – Queries, Reports, Roles, Mini ERP** report, query, forms/roles mức nhận biết. Lab: làm một báo cáo tồn kho và giải thích chuỗi Catalog→Document→Register→Report. Phân quyền xem báo cáo/ký chứng từ.

### Giai đoạn IV — Tổng ôn và mô phỏng (L13, R01–R02)
- **L13 – Tổng ôn 1C/ERP và cạm bẫy:** 12 cặp khái niệm dễ nhầm, bảng so sánh, mini case tích hợp; video hệ thống hóa 1C; thực hành gỡ 10 nhận định đúng/sai.
- **R01 – Ôn lỗi + cheat sheet:** so sánh 12 cặp thuật ngữ dễ nhầm; flashcards; đề thử 40 câu/45 phút.
- **R02 – Thi thử tổng hợp:** đề thử 50 câu/55 phút, phân phối ~ERP 30%/nghiệp vụ 30%/1C 40% cho *đề thử của web*, không phải tỷ trọng thật. Chế độ clock, nộp bài, phân tích yếu theo tags, tạo kế hoạch sửa lỗi.

## D. LỊCH GỢI Ý 10 NGÀY VÀ GATE

| Ngày tham chiếu | Mục tiêu | Đầu ra |
|---|---|---|
| 10/11 | L01–L02 | ERP và phân hệ, quiz ≥85% |
| 11/11 | L03–L04 | Master data, O2C, 1 case hoàn chỉnh |
| 12/11 | L05–L06 | P2P, 3-way match, tồn kho |
| 13/11 | L07–L08 | 1C architecture, infobase |
| 14/11 | L09 | Catalog Products/Customers |
| 15/11 | L10 | Documents, posted state |
| 16/11 | L11 | Accumulation/Information Registers |
| 17/11 | L12 | Report, roles, recap mini ERP |
| 18/11 | L13 + R01 | Cheat sheet, đề 40 câu + sai ở đâu học lại ở đó |
| 19–20/11 | R02, đăng ký | Đề 50 câu, checklist, đăng ký đúng hạn |

Đây là kế hoạch cá nhân hóa nhằm hoàn thành lõi trước 20/11; không gán ngày thi vòng 1 là 20/11. Người học có thể chọn ngày bắt đầu và mỗi ngày có chế độ 60/90/150 phút, web tự phân bổ backlog theo độ ưu tiên.

## E. TRẢI NGHIỆM BÀI GIẢNG (CỰC QUAN TRỌNG)

**Giao diện `/learn/[lessonId]`:**
- Header: breadcrumb Giai đoạn/Bài, thời gian, mục tiêu, tags bắt buộc, tiến độ từng section.
- Main: thẻ "Mình sẽ học được gì?"; `VideoLessonCard` tỉ lệ 16:9, thumbnail, video provider, trạng thái nhúng, link "Mở bản gốc"; ngay dưới là `LessonNarration` dạng bài đọc có diagram, cards, ví dụ, glossary tooltip và "Hỏi gia sư đoạn này" trên từng section.
- Tab `Bài giảng | Thực hành | Trắc nghiệm | Ghi chú`; mỗi bài có checklist hoàn thành (không phụ thuộc xem 100% video).
- Right sidebar `AI Tutor` **có mặt thực sự** khi đọc, xem video, làm bài (sticky). Hiển thị `Đang học: L10 → Documents → Posting`. Chat real-time khi server key sẵn; gợi ý câu hỏi context, trả lời theo mô hình 3 mức: ngắn gọn → ví dụ → giải thích kỹ nếu yêu cầu.
- Khi bấm `Hỏi AI về đoạn này`, prefill context bằng selected text và section id, không tự phán về video. Có nút **Dừng video và hỏi** (khi player API cho phép), sau khi hỏi xong có thể tiếp tục xem.
- Quiz có giải thích vì sao cả đáp án đúng và sai, trạng thái confidence `chắc/đoán/chưa biết`, nhấn `Giải thích với AI` sau chấm.
- Có nút text-to-speech lời giảng dùng `speechSynthesis` *nếu trình duyệt hỗ trợ* và hỗ trợ voice input tùy chọn, không giả lập realtime voice call.
- Có thể hiển thị mascot/avatar đại diện **Gia sư AI**, nhưng **không được nói đó là phiên ChatGPT hiện tại đang ở trong website**. Đây là bot chạy bằng OpenAI API độc lập và phải được cấu hình.

**Điều kiện để được gọi video cho một bài:** video có thể nhúng hợp lệ HOẶC có nút mở đúng bài gốc có nội dung video. Không dùng ảnh tĩnh giả video. Nếu bài nguồn course yêu cầu tài khoản, ghi rõ "Có thể cần đăng nhập 1C Skills Hub".

## F. VIDEO & TÀI NGUYÊN

Các URL tham khảo trong `curriculum.json` đã được đối chiếu với các trang xuất bản/chương trình học. `videoSource.mode` phải hỗ trợ:
- `youtube`: nhúng qua player YouTube theo videoId từ URL thực; nếu tác giả chặn embed, fallback liên kết watch.
- `youtube_candidate`: ID được khai báo trong metadata của lớp học 1C; hãy thử embed nếu hợp lệ, và bắt buộc có `fallbackUrl` đến **đúng bài trên Skills Hub**.
- `official_course`: card "Xem video bài học trên 1C Skills Hub" + open in new tab; không iframe một LMS trang không cho nhúng.

Video và bài chính thức: 
- ERP intro: https://www.youtube.com/watch?v=rJR-ti3QdPw
- ERP + sales integration: https://www.youtube.com/watch?v=7qgVrMsnlgA
- ERP implementation challenges: https://www.youtube.com/watch?v=_N7tRlJ9yIM
- Procurement case: https://www.youtube.com/watch?v=7xblSp7SCwA
- 1C First Step course outline (22 bài video): https://skillshub.1c-dn.com/courses/course-v1%3A1C%2B1C_MAIN_FS_24%2B2024_T4/course/
- 1C First Step official description: https://1c-dn.com/learning/1c_enterprise_first_step_beginners_course/
- 1C Academy course episodes: https://academy.1ci.com/courses/1c-enterprise-first-start
- 1C getting started infobase: https://1c-dn.com/1c_enterprise/getting_started/
- 1C training version download: https://1c-dn.com/developer_tools/1c_enterprise_8_platform_training_version/
- SAP O2C: https://help.sap.com/docs/SAP_CX/fe1b9a180649472eb58843ec01732ed9/758552771a5643eda7736cc92f13e722.html
- SAP P2P: https://learning.sap.com/courses/managing-purchase-orders-in-sap-ariba-buying-and-invoicing/define-the-purchase-order-lifecycle
- 1C accumulation register reference: https://kb.1ci.com/1C_Enterprise_Platform/Tutorials/Practical_developer_guide_8.3/Lesson_6._Accumulation_registers/Understanding_accumulation_registers/

**Không tự tải video YouTube vào project; không scrape captions/transcripts nếu không được phép.** Bài giảng do ứng dụng tự viết, có kiểm tra nội dung với nguồn, video chỉ là bổ trợ.

## G. MINI ERP SIMULATOR — THỰC HÀNH CÓ THẬT

`/practice/mini-erp` là sandbox riêng trên web (không giả vờ là phần mềm 1C). Seed: `KB-01 Bàn phím`, tồn đầu 20; `MS-02 Chuột`, tồn đầu 12; kho `HN-01`; supplier `S-01`, customer `C-01`. Bài lab: lập `Receipt` 15 KB-01, `Issue` 8 KB-01; tồn cuối phải là 27. Cho thử xuất 40 chiếc để kiểm tra lỗi `INSUFFICIENT_STOCK`.

- Cho người học tạo, chỉnh, lưu `Draft` rồi `Post` phiếu nhập/phiếu xuất. **Chỉ post mới ghi nhận movement**, giữ log `time, documentId, productId, delta, warehouse`. Nghiêm cấm double-post (idempotence), nếu đổi/xóa posted document phải reversal hợp lệ, có record audit.
- Tính balance từ initial stock + sum(posted movements), không tăng trực tiếp bằng thao tác "lưu draft". Hỗ trợ nhiều mặt hàng/dòng chứng từ, validate quantity >0, SKU tồn tại, tồn không âm, phát hiện duplicate document number.
- Giao diện 3 tab `Catalogs | Documents | Register/Stock Report`. Mỗi thao tác có tooltip nối lý thuyết: `Product → Catalog`, `Receipt → Document`, `Stock movement → Accumulation Register`, `Stock balance → Report`.
- Kèm thử thách "Tồn chưa đổi vì sao?" (đáp án: document vẫn Draft, chưa Post) và "Vì sao xuất 40 thất bại?" (tồn không đủ), đánh giá bằng state thực sự thay vì người học tự tick.
- Có reset scenario, 3 mức: guided / unguided / challenge. Không gắn nhãn đây là app 1C thật; có mục "Thực hành trên 1C thật" liên kết bài video/trang cài đặt.

## H. QUIZ ENGINE + KNOWLEDGE STATE

- `question_bank.json` gồm câu mẫu *tự biên soạn* với IDs, lessonId, category, difficulty, question, options, correctAnswer, explanation và optionExplanations. Thêm được câu mới nhưng phải kiểm chứng, không tạo câu nhập nhằng. **Những câu trong file KHÔNG phải câu hỏi chính thức của ban tổ chức.**
- Single select + multi-select nếu câu thực sự có nhiều đáp án. Randomize order bằng seeded shuffle trong bài ôn, giữ option IDs bất biến. Review cả đáp án đúng/sai sau khi nộp; cấu trúc trợ giúp: *kiến thức cần nhớ, vì sao sai, ví dụ mới*.
- 2 mocks: R01 40 câu/45 phút; R02 50 câu/55 phút. Vì ngân hàng mẫu ban đầu có thể chưa đủ 90 câu không trùng, engine phải **không bịa số câu**: trước khi đủ dữ liệu, cho chế độ `Demo 20–30 câu` và hiển thị "Chưa đủ câu cho đề 40/50"; chỉ mở nhãn full khi đã seed đủ câu. Coding agent được phép tạo thêm câu, nhưng kiểm tra đúng/sai, unique concept, đa dạng hóa trước khi mở đề chính thức.
- `mastery = weighted rolling accuracy per concept`; `reviewQueue` sắp xếp theo chủ đề yếu nhất, gần ngày thi nhất; biểu đồ rõ diễn giải và không nhận là tỷ lệ đỗ thật.
- Hiển thị thời gian làm bài, cờ đánh dấu câu, thay đổi đáp án, nộp bài, auto-submit khi hết giờ nếu user đồng ý trước, kết quả theo từng loại; không cho refresh xóa bài đang thi (lưu session).

## I. GIA SƯ AI THẬT — PROMPT HỆ THỐNG CHO `/api/tutor`

```
Bạn là Gia sư ERP 1C Academy, nói tiếng Việt, mục tiêu giúp người học vượt vòng kiến thức ERP/1C.
Ưu tiên sách/bài học đã cung cấp và tài liệu nguồn chính thức; KHÔNG bịa câu hỏi chính thức hay thông tin tổ chức.
Bạn nhận context: lessonId, title, sectionId, selectedText, currentVideoTimeSec (nếu player cung cấp), labStateSummary, quizState, userQuestion, weakConceptTags.
Hãy giải thích đúng đoạn người học đang học, bằng thuật ngữ chính xác, ngôn ngữ dễ hiểu, ví dụ cửa hàng bán máy tính.
Mặc định trả lời 100–220 từ, sử dụng ví dụ trực quan; hỏi lại 1 câu kiểm tra hiểu nếu thích hợp.
Nếu user nói chưa hiểu, giải thích lại theo 3 tầng: trực giác → ví dụ → thuật ngữ chuẩn.
Nếu đang trong bài thi chưa nộp, tuyệt đối không nêu đáp án trực tiếp; chỉ gợi ý cách tư duy và khái niệm liên quan. Sau khi nộp mới giải thích đáp án.
Không suy đoán đã nhìn/ nghe nội dung video hoặc timestamp, trừ khi context chứa transcript thực sự hợp pháp/đã có sẵn.
Nếu không chắc phiên bản 1C/luật nghiệp vụ cụ thể, nói rõ giới hạn và trích dẫn nguồn chính thức được cung cấp.
Không tự đánh dấu bài học hoàn thành, không tự sửa điểm hoặc quiz state từ tin nhắn người học.
```

**Payload mẫu từ client sang server (không để bí mật API ở client):**
```json
{
  "lessonId":"L10",
  "sectionId":"posting",
  "selectedText":"Lưu chứng từ khác với posting",
  "videoTimeSec":null,
  "labStateSummary":{"documentStatus":"draft","stockKB01":20},
  "quizState":{"mode":"practice","submitted":false},
  "weakConceptTags":["posting","register"],
  "message":"Tại sao đã tạo phiếu nhập mà tồn kho không tăng?"
}
```

**Backend security:** server-side API key; Zod validation + rate limit; context lọc/giới hạn độ dài; không gửi toàn bộ answer key của mock exam chưa nộp vào model; request IDs và timeout, trạng thái offline; lưu chat local opt-in, có xóa lịch sử.

## J. DATA TYPES TỐI THIỂU

```ts
type VideoSource = {
  mode: 'youtube'|'youtube_candidate'|'official_course';
  title: string;
  url: string;
  youtubeId?: string;
  fallbackUrl?: string;
  accessNote?: string;
};
type Lesson = {
  id: string; stage: number; title: string; priority: 'required'|'high';
  estimatedMinutes: number; prerequisites: string[]; objectives: string[];
  concepts: string[]; sections: {id: string; title: string; narration: string; keyTakeaway: string}[];
  video: VideoSource;
  lab: {id:string; title:string; steps:string[]; expected:string; automated?:boolean};
  pitfalls: string[]; recall: string[]; references: string[];
};
type Question = {
  id:string; lessonId:string; category:'erp'|'business'|'1c';
  difficulty:'easy'|'medium'|'hard'; tags:string[]; question:string;
  options:{id:string; text:string; explanation:string}[];
  correctAnswer:string[]; explanation:string;
};
type Progress = {
  completedSections: string[]; videoLastPositionSec?:number;
  lessonQuizzes: Record<string,{attempts:number;best:number;last:number}>;
  labStatus:Record<string,'not_started'|'in_progress'|'passed'>;
  mistakes:Record<string,{count:number;lastSeen:string;nextReviewAt:string}>;
};
```

## K. KIỂM TRA CHẤT LƯỢNG & YÊU CẦU HOÀN THÀNH

- [ ] Mở trang chủ thấy đầy đủ 4 giai đoạn, 13 lesson, 2 mock/review, có nội dung bài giảng tiếng Việt ngay, không phải chỉ tiêu đề.
- [ ] Mỗi lesson có **video resource**: player hoạt động hoặc external-link đúng bài có video, fallback rõ ràng.
- [ ] Mọi bài học có gia sư AI hiện bên cạnh; nếu API chưa cấu hình, người dùng thấy hướng dẫn thiết lập minh bạch, không có phản hồi AI giả.
- [ ] Gửi context từ một section và chat có giải thích đúng nội dung; không tiết lộ đáp án của mock đang làm.
- [ ] Lab tạo Receipt +15 và Issue −8 từ stock 20 cho đúng 27, không double post, stock âm bị chặn, reset hoạt động.
- [ ] Quiz lấy câu thật từ `question_bank.json`, chấm điểm đúng, feedback chi tiết, câu sai xuất hiện ở Mistakes, progress bền qua reload.
- [ ] Có 2 mock theo cấu hình khi đủ câu; nếu chưa đủ thì có chế độ demo minh bạch, không bịa dữ liệu.
- [ ] Mobile dùng được video, lab, quiz, AI drawer; keyboard focus và aria-label đủ.
- [ ] Có `.env.example`, README, clean code, typecheck, test lab engine, test scoring, test save/reload, build thành công.
- [ ] Disclaimer: "Bộ đề luyện tự xây dựng, không phải đề thi chính thức; điểm luyện không bảo đảm Top 10".

## L. SOURCE QUALITY / CAVEAT

- Form: người học cung cấp ảnh thể lệ; chưa có đề cương câu hỏi chính thức. Hạn đăng ký theo ảnh là 20/11/2026; đừng diễn đạt như chắc chắn thời điểm thi trắc nghiệm.
- Chương trình học/video: 1C Learning Center và 1C Skills Hub (có 22 chủ đề trong chương trình First Step), 1C Academy (22 episodes); video course đôi khi cần sign-in/không cho nhúng. Video ID nếu đọc từ metadata course là ứng viên, không đồng nghĩa đã test player.
- SAP Learning/Help và Microsoft Learn dùng để tham khảo quy trình phổ quát; thực tế Order-to-Cash/Procure-to-Pay có nhiều biến thể, không coi một quy trình cụ thể là chân lý tuyệt đối.
- Không sử dụng nhãn/logo "đối tác chính thức NEU/1C" hoặc sao chép nhận diện cuộc thi như một website chính thức. Đây là website **tự học cá nhân**.

**Kết quả mong muốn:** một hệ thống học hoàn chỉnh, thẩm mỹ cao nhưng ưu tiên tương tác giáo dục thực, nhất là video + lời giảng + AI tutor theo đúng đoạn + thực hành ERP + quiz giải thích lỗi. Đừng dừng ở wireframe. Xây và kiểm thử từ seed files đến khi các luồng chính hoạt động.
