# IG Cookie Manager - Tiện ích Quản lý Cookie Instagram

Một tiện ích mở rộng đơn giản cho Google Chrome giúp bạn dễ dàng lấy chuỗi cookie Instagram hiện tại và đăng nhập nhanh chóng bằng một chuỗi cookie được cung cấp. Hữu ích cho nhà phát triển, kiểm thử viên hoặc quản lý nhiều phiên đăng nhập.

## Tính năng chính

* **Lấy Cookie Hiện tại:** Lấy tất cả cookie Instagram đang hoạt động và hiển thị dưới dạng chuỗi `name=value;...`.
* **Sao chép Nhanh:** Nút sao chép tiện lợi để copy chuỗi cookie từ ô văn bản.
* **Đăng nhập bằng Cookie:** Dán chuỗi cookie (hoặc chuỗi có dấu `|`). Tiện ích sẽ tự động:
    * Tìm chuỗi cookie Instagram hợp lệ đầu tiên (kiểm tra sự tồn tại của `sessionid` hoặc `ds_user_id`).
    * Xóa tất cả cookie Instagram cũ.
    * Thiết lập các cookie mới từ chuỗi hợp lệ đã tìm thấy.
    * Mở tab Instagram mới sau khi đăng nhập thành công.
* **Giao diện Người dùng:** Bao gồm hướng dẫn sử dụng và cảnh báo quan trọng ngay trong popup.
* **Mã nguồn mở:** Toàn bộ mã nguồn có sẵn trên GitHub.

## Cài đặt

<!-- **Cách 1: Từ Chrome Web Store (Khuyên dùng)**

* Truy cập [Liên kết đến Chrome Web Store](YOUR_STORE_LINK_HERE) 
* Nhấn "Thêm vào Chrome". -->

<!-- **Cách 2: Cài đặt thủ công (Cho nhà phát triển)** -->
**Cài đặt thủ công (Cho nhà phát triển)**

1.  Tải về hoặc clone kho lưu trữ này: `git clone https://github.com/fclove01/ig-cookie-easily`
2.  Mở Chrome và truy cập `chrome://extensions/`.
3.  Bật **Chế độ dành cho nhà phát triển** (Developer mode) ở góc trên bên phải.
4.  Nhấn vào nút **Tải tiện ích đã giải nén** (Load unpacked).
5.  Chọn thư mục chứa mã nguồn của tiện ích (thư mục có file `manifest.json`).

## Hướng dẫn sử dụng

1.  Nhấp vào biểu tượng của tiện ích trên thanh công cụ Chrome để mở popup.
2.  **Để lấy cookie hiện tại:**
    * Nhấn nút **GET**. Chuỗi cookie (nếu có) sẽ hiển thị trong ô văn bản.
3.  **Để sao chép chuỗi cookie:**
    * Nhấn vào biểu tượng sao chép (📋) ở góc trên bên phải ô văn bản.
4.  **Để đăng nhập bằng chuỗi cookie:**
    * Sao chép chuỗi cookie Instagram bạn muốn sử dụng.
    * Dán chuỗi đó vào ô văn bản. Bạn có thể dán nhiều chuỗi, cách nhau bởi dấu `|`.
    * Nhấn nút **LOG**.
    * Tiện ích sẽ tìm chuỗi hợp lệ đầu tiên, xóa cookie cũ, đặt cookie mới và mở Instagram.
5.  **Xem thêm thông tin:**
    * Nhấp vào mục **► Hướng dẫn sử dụng** hoặc **⚠️ Cảnh báo & Miễn trừ trách nhiệm** để mở rộng và đọc nội dung chi tiết.

## ⚠️ Cảnh báo Quan trọng

* Cookie chứa thông tin đăng nhập và phiên làm việc **cực kỳ nhạy cảm**.
* **TUYỆT ĐỐI KHÔNG chia sẻ cookie của bạn với bất kỳ ai** hoặc lấy cookie từ những nguồn không đáng tin cậy. Làm như vậy có thể khiến tài khoản của bạn bị đánh cắp.
* Việc đăng nhập bằng cookie có thể vi phạm điều khoản dịch vụ của Instagram trong một số trường hợp.
* **Người dùng hoàn toàn chịu trách nhiệm** về việc sử dụng tiện ích này và mọi hậu quả có thể xảy ra. Nhà phát triển không chịu trách nhiệm cho bất kỳ vấn đề nào liên quan đến tài khoản Instagram của bạn. **Hãy sử dụng một cách thận trọng!**

## Chính sách Quyền riêng tư

Tiện ích này được thiết kế với sự tôn trọng quyền riêng tư của bạn:

* Mọi hoạt động xử lý cookie (đọc, xóa, ghi) đều diễn ra **hoàn toàn cục bộ** trong trình duyệt của bạn.
* Tiện ích **KHÔNG** thu thập, lưu trữ, hoặc gửi bất kỳ dữ liệu nào (bao gồm cookie hoặc thông tin cá nhân) của bạn đến bất kỳ máy chủ bên ngoài nào.
* Vui lòng xem [Chính sách Quyền riêng tư đầy đủ](PRIVACY_POLICY.md) để biết thêm chi tiết.

## Đóng góp

Mọi đóng góp đều được chào đón! Nếu bạn phát hiện lỗi hoặc có ý tưởng cải thiện, vui lòng tạo [Issue](https://github.com/fclove01/ig-cookie-easily/issues) hoặc [Pull Request](https://github.com/fclove01/ig-cookie-easily/pulls) trên kho lưu trữ GitHub.

## Giấy phép

Mã nguồn này được phát hành dưới giấy phép [MIT License](LICENSE).

---

_Chúc bạn sử dụng tiện ích hiệu quả!_