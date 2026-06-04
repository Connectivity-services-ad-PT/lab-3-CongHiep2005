# Consumer–Provider Handshake

## Thông tin chung

- Lab: FIT4110 Lab 03
- Ngày: 2026-06-04
- Provider team: team-analytics
- Consumer team: team-iot
- Provider service: Core Business Event API (mock)
- Consumer service: IoT Ingestion API

## Contract

- Contract file: contracts/iot-ingestion.openapi.yaml
- Mock base URL: http://localhost:4010
- Auth method: Bearer token in Authorization header
- Endpoint được test: POST /telemetry

## Smoke test

### Request

```http
POST /events
Authorization: Bearer {{authToken}}
Content-Type: application/json
```

```json
{
  "eventType": "ACCESS_CHECK",
  "eventId": "550e8400-e29b-41d4-a716-446655440000",
  "gateId": "GATE-01",
  "cardId": "RFID-2026-001",
  "decision": "ALLOW",
  "timestamp": "2026-06-03T21:00:00Z"
}
```

### Expected response

```json
{
  "status": "accepted",
  "message": "Event received"
}
```

## Kết quả

- [x] Consumer gọi mock thành công.
- [x] Consumer parse được field cần dùng.
- [x] Consumer hiểu lỗi 4xx/5xx provider trả về.
- [x] Có Newman report hoặc screenshot.

## Ghi chú thay đổi hợp đồng

| Nội dung | Trước | Sau | Người đồng ý |
|---|---|---|---|
| | | | |

## Xác nhận

- Provider representative:
- Consumer representative:
