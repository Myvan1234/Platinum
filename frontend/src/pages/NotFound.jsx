import { Link } from "react-router-dom";
import { Page, Head } from "../components/Shared";

export function NotFound() {
  return (
    <Page title="Không tìm thấy trang" desc="Trang bạn tìm không tồn tại.">
      <Head
        h="404 – Không tìm thấy trang"
        p="Đường dẫn không tồn tại hoặc đã được thay đổi."
      />
      <div className="wrap sec">
        <Link to="/" className="btn">
          Về trang chủ
        </Link>
      </div>
    </Page>
  );
}
