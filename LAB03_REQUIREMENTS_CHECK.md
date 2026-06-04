# Lab 03 — Yêu cầu kiểm tra

**Ngày kiểm tra:** 2026-06-04  
**Người kiểm tra:** GitHub Copilot  
**Trạng thái:** Đánh giá toàn diện

---

## 1️⃣ OpenAPI Contracts ✅

### ✓ iot-ingestion.openapi.yaml
- [x] Có info, version, servers
- [x] Có 2 endpoints: `/health` (GET), `/telemetry` (POST)
- [x] `/health` trả 200 với response schema
- [x] `/telemetry` trả 202 (happy path) + 400/401/422/500 (error cases)
- [x] Request body sử dụng $ref với components/schemas
- [x] Security: `bearerAuth` defined trong components
- [x] Có examples trong responses
- [x] Có description rõ ràng

### ❓ ai-vision.openapi.yaml
- [ ] *Chưa kiểm tra chi tiết*

---

## 2️⃣ Postman Collection ✅

### ✓ FIT4110_lab03_iot_ingestion.postman_collection.json

#### Cấu trúc 6 Folder
- [x] **01_Functional** — Happy path tests
- [x] **02_Auth** — Authorization tests  
- [x] **03_Negative** — Invalid input tests
- [x] **04_Boundary_Reliability** — Min/max, boundary values
- [x] **05_Consumer_side_Smoke** — Test gọi mock service khác
- [x] **06_Local_only_NonFunctional** — Latency, non-functional tests

#### Variables & Environment
- [x] **{{baseUrl}}** — Không hardcode, lấy từ environment
- [x] **{{authToken}}** — Không hardcode, lấy từ environment
- [x] **{{coreBusinessMockUrl}}** — Cho consumer-side smoke test
- [x] **Authorization header** — Bearer {{authToken}}

#### Tests trong Collection
- [x] Functional tests: `/health` GET, `/telemetry` POST happy path
- [x] Auth tests: Missing token, invalid token
- [x] Negative tests: Invalid payload, wrong field
- [x] Boundary tests: High temperature
- [x] Smoke test: Gọi Core Business /events mock
- [x] Non-functional tests: Response time checks

---

## 3️⃣ Postman Environments ✅

### ✓ FIT4110_lab03_mock.postman_environment.json
```json
{
  "env": "mock",
  "baseUrl": "http://127.0.0.1:4010",
  "authToken": "mock-token-a1",
  "coreBusinessMockUrl": "http://localhost:4016"
}
```
- [x] env = "mock"
- [x] baseUrl = 127.0.0.1:4010 (Prism mock port)
- [x] authToken = mock-token-a1
- [x] coreBusinessMockUrl = localhost:4016

### ✓ FIT4110_lab03_local.postman_environment.json
```json
{
  "env": "local",
  "baseUrl": "http://localhost:4010",
  "authToken": "local-dev-token",
  "coreBusinessMockUrl": "http://localhost:4016"
}
```
- [x] env = "local"
- [x] baseUrl = localhost:4010 (real service)
- [x] authToken = local-dev-token
- [x] coreBusinessMockUrl = localhost:4016

---

## 4️⃣ Mock Data Files ✅

- [x] sensor-reading-valid.json — Valid data cho happy path
- [x] sensor-reading-invalid-missing-device.json — Thiếu device field
- [x] sensor-reading-boundary.json — Boundary values (high temp, etc.)

---

## 5️⃣ GitHub Actions Workflow ✅

### ✓ .github/workflows/newman.yml

#### Steps
- [x] Checkout repository
- [x] Checkout Core Business repository (mới)
- [x] Setup Node.js 20
- [x] Install dependencies
- [x] Lint OpenAPI contracts
- [x] Start Prism IoT mock (port 4010)
- [x] Start Prism Core mock (port 4016) — **MỚI**
- [x] Health check curl loop (thay thế wait-on)
- [x] Run Newman test:mock
- [x] Upload Newman reports artifact

#### Cấu hình
- [x] Triggers: push, pull_request on main
- [x] Runs-on: ubuntu-latest
- [x] Reports uploaded: newman-reports artifact

**⚠️ LƯU Ý:** 
- Vừa update workflow để checkout Core repo thực (`Connectivity-services-ad-PT/lab-3-leanhtg1102`)
- Chưa test xem CI run có pass không với Core repo mới

---

## 6️⃣ Reports ✅

- [x] newman-report-mock.xml — Report chạy trên mock environment
- [x] newman-report-local.xml — Report chạy trên local environment
- [x] newman-report.html — HTML report
- [x] contract-lint-report.txt — Lint report

---

## 7️⃣ Checklists ✅

### ✓ checklists/reliability_checklist.md

#### Functional ✅ (5/5)
- [x] Health endpoint test
- [x] Happy path test
- [x] Status code 2xx check
- [x] Response field check
- [x] Read data test

#### Auth ✅ (4/4)
- [x] Valid token test
- [x] Missing token test
- [x] Invalid/empty token test
- [x] 401/403 expected status

#### Negative ✅ (3/4)
- [x] Missing required field
- [x] Wrong data type
- [ ] ❌ **CHƯA:** Enum/value outside range test
- [x] Error follows ProblemDetails model

#### Boundary ✅ (3/4)
- [x] Min/max boundary test
- [ ] ❌ **CHƯA:** Limit/pagination test
- [ ] ❌ **CHƯA:** Large payload test
- [x] Expected behavior documented

#### Reliability ✅ (2/4)
- [x] Response time check
- [ ] ❌ **CHƯA:** Timeout specification
- [ ] ❌ **CHƯA:** Retry/idempotency note
- [x] Consumer-side smoke test

#### Evidence ✅ (6/6)
- [x] Collection JSON export
- [x] Mock environment JSON export
- [x] Local environment JSON export
- [x] Newman report XML/HTML
- [x] Test-case matrix filled
- [x] Handshake document filled

### ❓ submission_checklist.md
- [ ] *Chưa kiểm tra chi tiết*

---

## 8️⃣ Templates ✅

### ✓ test-case-matrix.csv
```csv
ID,Folder,Endpoint,Method,Scenario,Input file/body,Expected status,Expected response check,Type,Pass/Fail,Evidence
TC01,Functional,/health,GET,Service is alive,-,200,status=ok,functional,Pass,reports/newman-report-mock.xml
TC02,Functional,/telemetry,POST,Create telemetry happy path,inline JSON,202,has batchId/readingCount,functional,Pass,reports/newman-report-mock.xml
TC03,Auth,/telemetry,POST,Missing token,inline JSON,401/403,Problem Details/auth,auth,Pass,reports/newman-report-mock.xml
TC04,Auth,/telemetry,POST,Invalid token,inline JSON,401/403,Problem Details/auth,auth,Pass,reports/newman-report-mock.xml
TC05,Negative,/telemetry,POST,Invalid payload,inline JSON,400/422,Problem Details,negative,Pass,reports/newman-report-mock.xml
TC06,Boundary,/telemetry,POST,High temperature,inline JSON,201/400,warning or validation,boundary,Pass,reports/newman-report-mock.xml
TC07,Consumer_side_Smoke,/events,POST,Smoke to Core Service,inline JSON,200/201/202,connectivity verified,smoke,Pass,reports/newman-report-mock.xml
TC08,Local_only_NonFunctional,/health,GET,Response time check,-,200,responseTime < 1000ms,non-functional,Pass,reports/newman-report-local.xml
```
- [x] Map từng test với folder, endpoint, input, expected status
- [x] Đủ 8 test cases
- [x] Có evidence links

### ✓ consumer-provider-handshake.md
- [x] Thông tin chung (Lab, Ngày, Team)
- [x] Provider/Consumer info
- [x] Contract file reference
- [x] Mock base URL
- [x] Auth method
- [x] Smoke test request/response

---

## 9️⃣ Documentation ✅

- [x] docs/TEAM_TASKS.md — Task assignment
- [x] docs/CONSUMER_SIDE_TESTING.md — Testing guide
- [x] docs/GITHUB_ACTIONS_GUIDE.md — CI setup guide
- [x] README.md — Project overview (không check chi tiết)

---

## 📊 Summary

### Đã Hoàn thành ✅
| Tiêu chí | Điểm | Mô tả |
|---------|-----|-------|
| OpenAPI contract | 1.5 | Schema rõ, response 2xx + 4xx, có examples |
| Cấu trúc collection | 1.5 | Đủ 6 folders, request rõ ràng |
| Test coverage | 2.0/2.5 | Có happy path, auth, negative, boundary, smoke |
| Mock + local environment | 1.5 | Cả mock và local, không hardcode URL/token |
| Newman report + CI | 1.5 | Reports XML/HTML, workflow linting + tests |
| Consumer-side smoke | 1.0 | Có gọi Core Business mock |
| Checklists + matrix | 0.5 | Đủ reliability checklist + test-case matrix |
| **TỔNG** | **~9.5/10** | **HOÀN THÀNH TỐT** |

---

## ⚠️ Điểm Cần Chú Ý

### 1. Reliability Checklist
**4 mục chưa check:**
- [ ] Enum/value boundary test — TC05 nên thêm test cho sai enum sensorType
- [ ] Limit/pagination — Collection có danh sách endpoint không?
- [ ] Large payload test — Có cần test payload > X bytes?
- [ ] Timeout specification — Nên ghi chú timeout mong muốn

**Khuyến cáo:** Check xem endpoints có danh sách hay pagination không, nếu có thêm test

### 2. AI Vision Contract
- [ ] Chưa kiểm tra chi tiết `ai-vision.openapi.yaml`
- Khuyến cáo: Verify schema, response, examples

### 3. Workflow + Core Repo
- [x] Workflow mới sử dụng Core repo thực: `Connectivity-services-ad-PT/lab-3-leanhtg1102`
- [x] Port: IoT=4010, Core=4016 (phân biệt rõ)
- ⚠️ **CHỚ:** Workflow chưa chạy hoàn toàn trên GitHub Actions lần cuối
  - Kiểm tra: Vào GitHub → Actions xem run mới nhất
  - Nếu fail: Check Core repo có `team-core.openapi.yaml` không?

### 4. Environment Thực (Local)
- Local environment chỉ dùng `localhost:4010` (mock hoặc real service)
- Nếu chạy `npm run test:local` cần service thật chạy trên port 4010 hoặc update environment

---

## ✅ Điều Kiện Hoàn Thành

**Hiện tại đã thỏa mãn:**
- [x] Contract lint pass (hoặc có giải thích)
- [x] Collection chạy được trên mock environment
- [x] Collection không hardcode baseUrl/authToken
- [x] Có test: happy path, auth, negative, boundary
- [x] Có consumer-side smoke test
- [x] Newman report được sinh
- [x] Test-case matrix đã điền
- [x] Reliability checklist đã điền
- [x] Consumer-provider handshake đã điền
- [x] GitHub Actions workflow hoàn chỉnh

**Cần kiểm tra thêm:**
- [ ] Chạy GitHub Actions lần cuối để xác nhận pass
- [ ] Verify Core repo có file `team-core.openapi.yaml` trên port 4016

---

## 🎯 Khuyến Cáo Tiếp Theo

1. **Vào GitHub Actions xem workflow mới chạy**
   - URL: `https://github.com/Connectivity-services-ad-PT/lab-3-PhamTheHoan10042005/actions`
   - Kiểm tra step "Start Prism mock server and run Newman contract tests" có pass không
   - Nếu fail: Kiểm tra Core repo structure + contract file

2. **Nếu Core repo workflow fail:**
   - Khả năng: `core/contracts/team-core.openapi.yaml` không tồn tại hoặc sai path
   - Cách fix: Thay path hoặc sử dụng mock:core script từ Core repo

3. **Thêm enum boundary test** (tùy chọn)
   - Ví dụ: Test sensorType = "invalid" → expect 400
   - Thêm vào TC03 hoặc tạo TC09

4. **Local testing**
   - Chạy `npm run test:local` nếu có service thật
   - Hoặc update local environment URL nếu service chạy port khác

---

**Generated:** 2026-06-04 by GitHub Copilot  
**Lab:** FIT4110 Lab 03 — Postman Mock Testing & Contract Testing
