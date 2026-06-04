# Reliability Checklist — FIT4110 Lab 03

Điền checklist này trước khi nộp Lab 03.

## 1. Functional tests

- [x] Có test cho endpoint health.
- [x] Có test happy path cho endpoint chính.
- [x] Có kiểm tra status code 2xx.
- [x] Có kiểm tra field quan trọng trong response.
- [x] Có ít nhất 1 test đọc dữ liệu danh sách hoặc chi tiết.

## 2. Auth tests

- [x] Có test thiếu token.
- [x] Có test sai token hoặc token rỗng.
- [x] Endpoint public được khai báo rõ nếu không cần auth.
- [x] Test thể hiện đúng expected status 401/403.

## 3. Negative tests

- [x] Có test thiếu field bắt buộc.
- [x] Có test sai kiểu dữ liệu.
- [ ] Có test sai enum hoặc giá trị ngoài miền.
- [x] Lỗi trả về theo cùng một error model.

## 4. Boundary tests

- [x] Có test min/max hoặc dữ liệu sát ngưỡng.
- [ ] Có test limit/pagination nếu endpoint có danh sách.
- [ ] Có test payload lớn hoặc metadata thiếu.
- [x] Có ghi chú kỳ vọng xử lý dữ liệu biên.

## 5. Reliability tests cơ bản

- [x] Có kiểm tra response time.
- [ ] Có mô tả timeout mong muốn.
- [ ] Có test hoặc ghi chú retry/idempotency nếu phù hợp.
- [x] Có consumer-side smoke test với ít nhất 1 mock của nhóm khác.

## 6. Evidence

- [x] Collection export JSON.
- [x] Environment mock export JSON.
- [x] Environment local export JSON.
- [x] Newman report XML/HTML.
- [x] Test-case matrix đã điền.
- [x] Biên bản handshake đã điền.
