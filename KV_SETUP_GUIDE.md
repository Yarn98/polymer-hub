# Cloudflare KV 설정 가이드

## 📋 개요
프로젝트 메타데이터를 Cloudflare KV에 저장하여 동적으로 관리하는 방법

---

## 🚀 1단계: KV Namespace 생성

### Cloudflare 대시보드 방법

1. **Cloudflare 대시보드 접속**
   - https://dash.cloudflare.com/

2. **Workers & Pages 메뉴**
   - 왼쪽 메뉴에서 "Workers & Pages" 클릭
   - "KV" 탭 선택

3. **새 Namespace 생성**
   - "Create namespace" 버튼 클릭
   - **Namespace name:** `PROJECTS_KV`
   - "Add" 클릭

4. **Namespace ID 복사**
   - 생성된 Namespace의 ID를 복사 (예: `abc123def456...`)

### CLI 방법 (선택사항)

```bash
wrangler kv:namespace create "PROJECTS_KV"
```

---

## 🔗 2단계: Pages 프로젝트에 KV 바인딩

### 대시보드 방법 (권장)

1. **Pages 프로젝트 설정**
   - Workers & Pages → "polymer-hub" 프로젝트 선택
   - "Settings" 탭 클릭

2. **Functions 섹션**
   - "Functions" → "KV namespace bindings" 찾기
   - "Add binding" 클릭

3. **바인딩 설정**
   - **Variable name:** `PROJECTS_KV`
   - **KV namespace:** 위에서 만든 Namespace 선택
   - "Save" 클릭

### wrangler.toml 방법 (이미 설정됨)

```toml
[[kv_namespaces]]
binding = "PROJECTS_KV"
id = "your-kv-namespace-id"  # 위에서 복사한 ID
```

---

## 📝 3단계: 프로젝트 데이터 추가

### 대시보드 방법

1. **KV Namespace 열기**
   - Workers & Pages → KV → PROJECTS_KV 클릭

2. **새 Key-Value 추가**
   - "Add entry" 클릭
   - **Key:** `projects`
   - **Value:** 아래 JSON 복사

```json
[
  {
    "id": "p3hb-co-4hb",
    "name": "P(3HB-co-4HB) 물성 예측",
    "description": "Physics-informed 모델 기반 코폴리머 물성 예측 시스템. Fox Equation, Flory Theory, V-Shape Crystallinity 적용.",
    "url": "https://4hb-p34hb-properties-modeling.pages.dev/",
    "category": ["prediction", "simulation"],
    "tags": ["Prediction", "Physics", "Interactive"],
    "thumbnail": "📊",
    "thumbnailGradient": "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    "featured": true,
    "status": "active"
  },
  {
    "id": "md-simulation",
    "name": "분자동역학 시뮬레이션",
    "description": "고분자 체인의 분자동역학 시뮬레이션 및 물성 분석 도구",
    "url": "https://md-simulation.pages.dev/",
    "category": ["simulation"],
    "tags": ["MD", "Simulation", "LAMMPS"],
    "thumbnail": "🔬",
    "thumbnailGradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "featured": true,
    "status": "active"
  },
  {
    "id": "polymerization-optimization",
    "name": "중합 반응 최적화",
    "description": "머신러닝 기반 중합 조건 최적화 및 수율 예측 시스템",
    "url": "https://polymerization-opt.pages.dev/",
    "category": ["analysis", "prediction"],
    "tags": ["ML", "Analysis", "Optimization"],
    "thumbnail": "📈",
    "thumbnailGradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "featured": false,
    "status": "coming-soon"
  }
]
```

3. **"Save" 클릭**

### CLI 방법

```bash
# projects.json 파일 생성 후
wrangler kv:key put --binding=PROJECTS_KV "projects" --path=projects.json
```

---

## 🔄 4단계: 새 프로젝트 추가 워크플로우

### 방법 1: 대시보드 (가장 간단)

1. KV Namespace → PROJECTS_KV 열기
2. "projects" key 편집
3. 새 프로젝트 JSON 객체 추가
4. Save

### 방법 2: CLI

```bash
# 현재 프로젝트 목록 가져오기
wrangler kv:key get --binding=PROJECTS_KV "projects" > projects.json

# projects.json 편집 (새 프로젝트 추가)

# 업데이트된 목록 저장
wrangler kv:key put --binding=PROJECTS_KV "projects" --path=projects.json
```

### 방법 3: API (자동화)

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/projects" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  --data @projects.json
```

---

## 📊 프로젝트 JSON 스키마

```typescript
interface Project {
  id: string;                    // 고유 ID (kebab-case)
  name: string;                  // 프로젝트 이름
  description: string;           // 설명 (1-2문장)
  url: string;                   // 프로젝트 URL
  category: string[];            // 카테고리 배열 (prediction, simulation, analysis)
  tags: string[];                // 태그 배열 (최대 3개 권장)
  thumbnail: string;             // 이모지 또는 이미지 URL
  thumbnailGradient: string;     // CSS gradient
  featured: boolean;             // 추천 프로젝트 여부
  status: 'active' | 'coming-soon' | 'archived';  // 상태
}
```

---

## 🎯 예시: 새 프로젝트 추가

```json
{
  "id": "rheology-analyzer",
  "name": "유변학 데이터 분석기",
  "description": "고분자 용융물의 유변학적 특성 분석 및 시각화 도구",
  "url": "https://rheology-analyzer.pages.dev/",
  "category": ["analysis"],
  "tags": ["Rheology", "Data Analysis", "Visualization"],
  "thumbnail": "📉",
  "thumbnailGradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "featured": false,
  "status": "active"
}
```

---

## 🔍 API 엔드포인트

배포 후 다음 엔드포인트로 프로젝트 목록 조회:

```
GET https://polymer-hub.pages.dev/api/projects
```

**응답 예시:**
```json
{
  "success": true,
  "source": "kv",
  "projects": [ ... ]
}
```

---

## ⚡ 캐싱

- KV 조회 결과는 5분간 캐시됨 (Cache-Control: max-age=300)
- 프로젝트 업데이트 후 최대 5분 후 반영
- 즉시 반영이 필요하면 Cloudflare 캐시 퍼지

---

## 🛠️ 트러블슈팅

### KV 바인딩을 찾을 수 없음
- Pages 프로젝트 설정에서 KV 바인딩 확인
- 변수명이 정확히 `PROJECTS_KV`인지 확인

### 프로젝트가 표시되지 않음
- `/api/projects` 엔드포인트 직접 확인
- KV의 "projects" key에 유효한 JSON이 있는지 확인
- 브라우저 캐시 새로고침 (Ctrl+Shift+R)

### JSON 파싱 에러
- JSON Validator로 유효성 검사 (https://jsonlint.com/)
- 따옴표, 쉼표 등 문법 확인

---

## 💰 비용

**Cloudflare Free Tier:**
- KV Reads: 100,000/day (무료)
- KV Writes: 1,000/day (무료)
- KV Storage: 1GB (무료)

**예상 사용량:**
- 프로젝트 목록: ~10KB
- 방문자 1000명/일 = KV Reads ~1000회
- **월 비용: $0** ✨

---

## 📚 참고 자료

- [Cloudflare KV Documentation](https://developers.cloudflare.com/workers/runtime-apis/kv/)
- [Pages Functions + KV](https://developers.cloudflare.com/pages/platform/functions/bindings/#kv-namespaces)
- [Wrangler KV Commands](https://developers.cloudflare.com/workers/wrangler/commands/#kv)
