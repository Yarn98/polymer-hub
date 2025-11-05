# 🚀 Cloudflare Pages 배포 및 KV 설정 완벽 가이드

## 📋 개요
Polymer Hub를 Cloudflare Pages에 배포하고 KV를 설정하여 4개 프로젝트를 동적으로 표시하는 방법

---

## 1단계: Cloudflare Pages 배포

### A. GitHub 연동 배포 (권장)

1. **Cloudflare 대시보드 접속**
   - https://dash.cloudflare.com/bd6ae5a199903795d34f072006bb6918

2. **Pages 프로젝트 생성**
   - 왼쪽 메뉴 → **Workers & Pages** 클릭
   - **Create application** 버튼 클릭
   - **Pages** 탭 선택
   - **Connect to Git** 클릭

3. **GitHub 저장소 연결**
   - **Connect GitHub** 클릭 (권한 승인)
   - 저장소 검색: `polymer-hub`
   - **Begin setup** 클릭

4. **빌드 설정**
   ```
   Project name: polymer-hub
   Production branch: main

   Build settings:
   ├── Framework preset: None
   ├── Build command: (비워두기)
   ├── Build output directory: /
   └── Root directory: (비워두기)
   ```

5. **배포 시작**
   - **Save and Deploy** 클릭
   - 1-2분 대기
   - ✅ 배포 완료!

6. **URL 확인**
   - 예: `https://polymer-hub.pages.dev`
   - 또는 Custom Domain 설정 가능

---

## 2단계: KV Namespace 생성

### KV란?
Cloudflare Workers KV는 Key-Value 저장소로, 프로젝트 메타데이터를 저장하는데 사용됩니다.

### 생성 방법

1. **KV 메뉴 접속**
   - Cloudflare 대시보드 → **Workers & Pages** → **KV** 탭

2. **새 Namespace 생성**
   - **Create namespace** 버튼 클릭
   - **Namespace name:** `PROJECTS_KV` (정확히 입력!)
   - **Add** 클릭

3. **Namespace ID 복사**
   - 생성된 Namespace 클릭
   - ID 복사 (예: `abc123def456...`)
   - 나중에 사용할 것이므로 메모해두기

---

## 3단계: Pages 프로젝트에 KV 바인딩

### 바인딩이란?
Pages Functions에서 KV에 접근할 수 있도록 연결하는 작업입니다.

### 설정 방법

1. **polymer-hub 프로젝트 설정**
   - Workers & Pages → **polymer-hub** 클릭
   - **Settings** 탭 클릭

2. **Functions 섹션 찾기**
   - 스크롤 다운 → **Functions** 섹션
   - **KV namespace bindings** 찾기
   - **Add binding** 클릭

3. **바인딩 설정**
   ```
   Variable name: PROJECTS_KV
   KV namespace: (위에서 만든 PROJECTS_KV 선택)
   ```
   - **Save** 클릭

4. **재배포**
   - **Deployments** 탭 → **Retry deployment** 클릭
   - 또는 GitHub에 새 커밋 푸시 시 자동 재배포

---

## 4단계: KV에 프로젝트 데이터 추가

### 데이터 준비
이미 `projects.json` 파일에 4개 프로젝트 데이터가 준비되어 있습니다:
1. P(3HB-co-4HB) 물성 예측
2. PHA 공정 도구
3. 빨대 최적화 도구
4. 컴파운딩 노트북

### 방법 1: 대시보드에서 직접 추가 (가장 쉬움) ⭐

1. **KV Namespace 열기**
   - Workers & Pages → **KV** → **PROJECTS_KV** 클릭

2. **새 Key-Value 추가**
   - **Add entry** 버튼 클릭
   - **Key name:** `projects` (정확히 입력!)
   - **Value:** 아래 JSON 전체 복사

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
    "id": "pha-process-tool",
    "name": "PHA 공정 도구",
    "description": "Polyhydroxyalkanoate(PHA) 생산 공정 최적화 및 모니터링 도구",
    "url": "https://pha-process-tool-v2.pages.dev/",
    "category": ["analysis", "simulation"],
    "tags": ["PHA", "Process", "Optimization"],
    "thumbnail": "🏭",
    "thumbnailGradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "featured": true,
    "status": "active"
  },
  {
    "id": "straw-optimizer",
    "name": "빨대 최적화 도구",
    "description": "생분해성 빨대 소재 및 제조 조건 최적화 시스템",
    "url": "https://straw-optimizer-v2.pages.dev/",
    "category": ["analysis", "prediction"],
    "tags": ["Biodegradable", "Optimization", "Manufacturing"],
    "thumbnail": "🥤",
    "thumbnailGradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "featured": true,
    "status": "active"
  },
  {
    "id": "compounding-notebook",
    "name": "컴파운딩 노트북",
    "description": "고분자 컴파운딩 배합 설계 및 실험 데이터 관리 시스템",
    "url": "https://compouding-notebook.pages.dev/",
    "category": ["analysis"],
    "tags": ["Compounding", "Data", "Formulation"],
    "thumbnail": "📓",
    "thumbnailGradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "featured": false,
    "status": "active"
  }
]
```

3. **저장**
   - **Add entry** 버튼 클릭
   - ✅ 완료!

### 방법 2: Wrangler CLI (선택사항)

```bash
# projects.json 파일이 있는 디렉토리에서
cd /home/user/polymer-hub

wrangler kv key put --binding=PROJECTS_KV --namespace-id=YOUR_NAMESPACE_ID "projects" --path=projects.json
```

---

## 5단계: 테스트 및 확인

### A. API 엔드포인트 테스트

1. **브라우저에서 API 직접 호출**
   ```
   https://polymer-hub.pages.dev/api/projects
   ```

2. **예상 응답**
   ```json
   {
     "success": true,
     "source": "kv",
     "projects": [...]
   }
   ```

3. **source 확인**
   - `"source": "kv"` → KV에서 성공적으로 로드됨 ✅
   - `"source": "static"` → KV 바인딩 안됨 (3단계 재확인)
   - `"source": "fallback"` → KV 데이터 없음 (4단계 재확인)

### B. 메인 페이지 확인

1. **홈페이지 접속**
   ```
   https://polymer-hub.pages.dev/
   ```

2. **확인 사항**
   - ✅ 3D 폴리머 체인 애니메이션
   - ✅ 4개 프로젝트 카드 표시
   - ✅ 각 프로젝트 Launch 버튼 작동
   - ✅ 필터 버튼 작동 (전체/시뮬레이션/예측/분석)

### C. 브라우저 개발자 도구 확인

1. **F12 → Console 탭**
2. **에러 메시지 확인**
   - 에러 없으면 OK ✅
   - 에러 있으면 아래 트러블슈팅 참고

---

## 🎯 완료 체크리스트

- [ ] Cloudflare Pages 배포 완료
- [ ] 배포 URL 접속 가능
- [ ] KV Namespace 생성 (`PROJECTS_KV`)
- [ ] Pages 프로젝트에 KV 바인딩
- [ ] KV에 `projects` key 추가
- [ ] `/api/projects` 엔드포인트 테스트
- [ ] 메인 페이지에서 4개 프로젝트 표시 확인
- [ ] 필터 기능 작동 확인

---

## 🛠️ 트러블슈팅

### 문제 1: "Loading projects..."에서 멈춤

**원인:** API 호출 실패

**해결:**
1. 브라우저 콘솔 확인 (F12)
2. `/api/projects` 직접 접속하여 응답 확인
3. Cloudflare Pages Functions 로그 확인

### 문제 2: source가 "static" 또는 "fallback"

**원인:** KV 바인딩 안됨 또는 데이터 없음

**해결:**
1. **3단계 재확인:** KV 바인딩 설정
   - Variable name: `PROJECTS_KV` (대소문자 정확히)
   - Namespace 선택 확인
2. **4단계 재확인:** KV에 데이터 추가
   - Key: `projects` (정확히)
   - Value: JSON 형식 확인
3. **재배포:** Settings → Deployments → Retry deployment

### 문제 3: 프로젝트 카드가 제대로 표시 안됨

**원인:** JSON 형식 오류 또는 렌더링 버그

**해결:**
1. KV의 JSON 형식 검증: https://jsonlint.com/
2. 브라우저 캐시 삭제 (Ctrl+Shift+R)
3. Cloudflare 캐시 퍼지

### 문제 4: 필터 버튼이 작동 안함

**원인:** 프로젝트가 아직 로드되지 않음

**해결:**
1. 페이지 완전히 로드될 때까지 대기
2. `initializeFilters()` 함수가 호출되었는지 콘솔 확인

---

## 🔄 새 프로젝트 추가하기

나중에 프로젝트를 추가하려면:

1. **KV의 projects key 편집**
   - Workers & Pages → KV → PROJECTS_KV
   - `projects` key 클릭 → **Edit**

2. **JSON에 새 프로젝트 추가**
   ```json
   {
     "id": "new-project",
     "name": "새 프로젝트 이름",
     "description": "설명",
     "url": "https://new-project.pages.dev/",
     "category": ["simulation"],
     "tags": ["Tag1", "Tag2"],
     "thumbnail": "🔬",
     "thumbnailGradient": "linear-gradient(135deg, #color1, #color2)",
     "featured": false,
     "status": "active"
   }
   ```

3. **Save**
   - 5분 이내에 자동 반영 (캐시 TTL)
   - 즉시 반영: Cloudflare 캐시 퍼지

---

## 📊 프로젝트 스키마

```typescript
interface Project {
  id: string;                    // 고유 ID (kebab-case)
  name: string;                  // 프로젝트 이름
  description: string;           // 설명 (1-2문장)
  url: string;                   // 프로젝트 URL
  category: string[];            // ["prediction", "simulation", "analysis"]
  tags: string[];                // 태그 배열 (최대 3개 권장)
  thumbnail: string;             // 이모지 (📊, 🔬, 🥤 등)
  thumbnailGradient: string;     // CSS gradient
  featured: boolean;             // 추천 프로젝트
  status: "active" | "coming-soon" | "archived";
}
```

---

## 💰 비용

**Cloudflare Free Tier (무료):**
- ✅ Pages: 무제한 프로젝트
- ✅ KV Reads: 100,000/day
- ✅ KV Writes: 1,000/day
- ✅ KV Storage: 1GB
- ✅ Bandwidth: 무제한

**예상 사용량:**
- 프로젝트 데이터: ~5KB
- 방문자 1,000명/일 = KV Reads ~1,000회
- **월 비용: $0** ✨

---

## 📚 참고 자료

- [Cloudflare Pages 공식 문서](https://developers.cloudflare.com/pages/)
- [KV Documentation](https://developers.cloudflare.com/workers/runtime-apis/kv/)
- [Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [KV Setup Guide](./KV_SETUP_GUIDE.md)

---

## ✅ 완료 후

모든 설정이 완료되면:

1. **URL 공유**
   - `https://polymer-hub.pages.dev/`

2. **4개 프로젝트 접근**
   - P(3HB-co-4HB) 물성 예측
   - PHA 공정 도구
   - 빨대 최적화 도구
   - 컴파운딩 노트북

3. **향후 관리**
   - 새 프로젝트: KV만 업데이트
   - 코드 수정: Git push → 자동 배포
   - 롤백: Deployments → 이전 버전 선택

---

**문의사항이 있으시면 Issues에 남겨주세요!**

GitHub: https://github.com/Yarn98/polymer-hub
