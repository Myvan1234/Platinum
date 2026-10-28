const TO = "contact@platinumtechnology.net";
export async function sendContact(d) {
  const body = [
    `Họ và tên: ${d.fullName}`,
    `Doanh nghiệp: ${d.company || "-"}`,
    `Email: ${d.email}`,
    `Điện thoại: ${d.phone}`,
    `Dịch vụ quan tâm: ${d.service || "-"}`,
    `Ngân sách dự kiến: ${d.budget || "-"}`,
    "",
    d.message,
  ].join("\n");
  const subject = `Yêu cầu tư vấn từ ${d.fullName}`;
  window.location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
