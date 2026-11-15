# Platinum Technology

Website doanh nghiệp bằng React/Vite, React Router, Node.js/Express và MongoDB/Mongoose. Nội dung công khai, quản trị và yêu cầu tư vấn dùng chung MongoDB. Trợ lý tiếng Việt truy xuất nội dung đã xuất bản rồi gọi Gemini từ máy chủ.

## Chạy trong VS Code (Windows PowerShell)

Cần Node.js 22.12 trở lên và thư mục hiện tại là `Platinum`.

```powershell
npm.cmd ci
if (-not (Test-Path server/.env)) { Copy-Item server/.env.example server/.env }
```

1. Terminal 1 chạy `npm.cmd run db:local`. Lần đầu lệnh tải MongoDB và lưu dữ liệu tại `.local/data`. Dừng bằng Ctrl+C. Nếu đã có MongoDB riêng, dùng máy chủ đó và đặt `MONGODB_URI` trong `server/.env`.
2. Terminal 2 chạy `npm.cmd run seed` để nạp hồ sơ. Lệnh thêm mục còn thiếu và cập nhật các mục vẫn dùng nguyên nội dung khởi tạo cũ. Nội dung đã chỉnh và trạng thái xuất bản trong trang quản trị được giữ lại.
3. Trong terminal 2, chạy `npm.cmd run admin:create` và nhập email cùng mật khẩu ít nhất 12 ký tự. Hệ thống không có tài khoản mặc định.
4. Chạy `npm.cmd run dev` và mở http://127.0.0.1:5173. Trang quản trị ở http://127.0.0.1:5173/quan-tri.

Vite chuyển tiếp `/api` tới cổng 3001. Nếu dùng cổng API khác trong môi trường phát triển, cập nhật đích proxy trong `vite.config.js`. Để chạy bản đã build, dùng `npm.cmd run build` rồi `npm.cmd start` và mở http://127.0.0.1:3001. Cả hai chế độ mặc định chỉ lắng nghe trên máy này.

## Xuất bản nội dung và xử lý liên hệ

Tại trang quản trị, chọn nhóm, tạo hoặc mở bản nháp, nhập nội dung cùng nguồn được duyệt rồi bấm **Lưu bản nháp**. Chọn **Xuất bản bản đã lưu** để công bố. Khi cập nhật mục đang công bố, gỡ xuất bản, chỉnh bản nháp, lưu và xuất bản lại. Đổi slug làm thay đổi đường dẫn của mục. Giữ slug cố định cho `trang-chu`, `gioi-thieu` và `lien-he`.

Các mục Trang có slug `tam-nhin-su-menh` và `doi-ngu` sẽ xuất hiện trong giới thiệu khi được xuất bản. Có thể nhập thông tin liên hệ và địa chỉ đã xác nhận vào nội dung của trang `lien-he`. Vào tab **Yêu cầu tư vấn** để đọc yêu cầu mới và đổi trạng thái. Biểu mẫu lưu trực tiếp trong MongoDB.

Cơ sở dữ liệu hỗ trợ lưu nội dung tiếng Việt, Anh, Nhật và Hàn. Website và chat hiện phục vụ tiếng Việt. Các bản nội dung khác có thể được truy xuất theo trường `locale` ở API khi xây dựng giao diện chuyển ngôn ngữ.

## Bật trợ lý AI

Trong `server/.env`, nhập khóa Google AI Studio vào `GEMINI_API_KEY`. `GEMINI_MODEL` mặc định là `gemini-3.5-flash-lite`. Khởi động lại API. Chỉ nhập khóa vào tệp môi trường cục bộ. Trợ lý dùng trích đoạn công khai để dẫn nguồn khi trả lời về Platinum. Với chủ đề ngoài công ty, trợ lý trả lời từ kiến thức của Gemini và gắn nhãn Kiến thức chung. Phiên đăng nhập và dữ liệu liên hệ nằm trong MongoDB. Khi thiếu khóa, giao diện báo trạng thái và dẫn tới Hỏi đáp hoặc Liên hệ.

- Gemini API: https://ai.google.dev/api/generate-content
- Nguồn dữ liệu công ty: hồ sơ năng lực Platinum do người dùng cung cấp.
- Ảnh `client/public/platinum-hero.jpg` được tạo bằng công cụ ImageGen tích hợp. Prompt: Website hero, cinematic photorealistic editorial 3D render of a sculptural brushed platinum torus made of precise interlocking metallic segments with small cool blue accents, hovering above a reflective dark navy technical grid, deep midnight blue studio, electric indigo rim lighting, premium enterprise technology, composition centered for a right-half landscape crop, no people, no text, no logos, no watermark.

## Kiểm thử

- `npm.cmd test` yêu cầu MongoDB cục bộ ở cổng 27017. Test tự tạo cơ sở dữ liệu riêng, kiểm tra API thực, mô phỏng phản hồi của nhà cung cấp AI và dọn dữ liệu sau khi chạy.
- `npm.cmd run build` tạo bản React ở `dist/`.
- Các tuyến công khai chỉ đọc mục xuất bản. Chat kiểm tra lại trạng thái và phiên bản của nguồn trước khi trả liên kết.

Để kiểm thử trên Chromium với cấu hình AI đang để trống, giữ MongoDB và máy chủ phát triển chạy, cài trình duyệt bằng npx.cmd playwright install chromium rồi chạy node scripts/browser-check.js.

## Nội dung cần Platinum cung cấp

Logo chính thức, địa chỉ cụ thể tại Huế và Đà Nẵng, email và số điện thoại, mô tả được duyệt của từng sản phẩm, dự án tiêu biểu, tầm nhìn, sứ mệnh, thông tin đội ngũ và các bản dịch. Danh mục hiện công bố tên sản phẩm từ hồ sơ. Dự án và các mục giới thiệu thiếu thông tin được lưu ở trạng thái bản nháp.

Ảnh minh họa danh mục sản phẩm được tạo bằng ImageGen tích hợp và lưu tại `client/public/platinum-platform.jpg`.

Prompt: Create a wide photorealistic 3D editorial image for a Vietnamese enterprise technology website. Three layered translucent graphite glass circuit tiles forming a precise stacked modular architecture, sparse lavender light channels, polished platinum edges, subtle dark blue atmospheric background. Diagonal composition across frame, dramatic studio material quality. Premium industrial design, ample breathing room, no text, no logos, no people, no watermark.

Ảnh banner `client/public/platinum-campus.jpg` là ảnh minh họa tạo bằng ImageGen tích hợp. Prompt: Ultra wide cinematic photographic hero for enterprise software consultancy website. Modern glass and dark steel technology research campus at blue hour, architecture and warm interior lights concentrated in right 60 percent, grounded realistic Vietnam contemporary office district without landmarks, camera from street level, restrained navy and silver palette with warm amber light, premium architecture editorial photography, moody navy shadows fading into naturally empty dark left half with uncluttered room for overlay title. No words, marks, branding or company signage.

Nền logo được xử lý bằng ImageGen tích hợp. Các bản PNG được lưu trong `client/public/brand/` và dùng cho đầu trang, cuối trang, Giới thiệu và favicon.

Prompt logo ngang: Background removal only for the provided Platinum Technology corporate logo. Preserve original wide horizontal logo placement, gray chip silhouette with engraved circuits, perfectly unchanged white lowercase pt lettering INSIDE the chip (keep white fully opaque), and the original two lines of gray typography spelling exactly 'platinum' then 'technology'. Remove exterior white background and cut out the white negative space around and between all gray wordmark letters and inside their counters, using real alpha. No new elements, no redesign, no glow. Use a wide horizontal canvas and tight safe margins.

Prompt biểu tượng: Remove only the white background outside this Platinum Technology Pt electronics chip logo, replacing exterior white with real alpha transparency. Preserve the asymmetric rounded-corner square silhouette, all the original gray gradients and engraved circuit details, and the opaque white lowercase p and t inside the chip. Match the original artwork. Center the mark and trim the outside canvas to a small even margin. Square output, no new text or ornament.
