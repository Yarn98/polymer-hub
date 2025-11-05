# 🧬 Polymer Engineering Research Hub

고분자 공학(Polymer Engineering) 및 중합(Polymerization) 연구 프로젝트를 한눈에 볼 수 있는 통합 포털

![Polymer Hub](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-3D-000000?logo=three.js&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## ✨ 주요 기능

### 🎨 3D 분자 시각화
- **Three.js** 기반 실시간 폴리머 체인 3D 렌더링
- P(3HB-co-4HB) 분자 구조 애니메이션
- 인터랙티브 회전 및 파티클 효과

### 📚 프로젝트 카탈로그
- 물성 예측, 시뮬레이션, 분석 도구 통합
- 카테고리별 필터링 (Prediction, Simulation, Analysis)
- 태그 기반 검색

### 🔄 동적 콘텐츠 관리
- Cloudflare KV 기반 프로젝트 메타데이터 관리
- API 엔드포인트로 실시간 업데이트
- 정적 fallback 지원

### 🎯 사용자 친화적 디자인
- 반응형 레이아웃 (모바일/태블릿/데스크탑)
- 다크 테마 + 고분자 공학 브랜딩
- 부드러운 애니메이션 및 전환 효과

---

## 🚀 빠른 시작

### 로컬 개발

```bash
# 저장소 클론
git clone https://github.com/yourusername/polymer-hub.git
cd polymer-hub

# 로컬 서버 실행 (Python)
python -m http.server 8000

# 또는 Node.js
npx serve .

# 브라우저에서 열기
open http://localhost:8000
```

### Cloudflare Pages 배포

#### 방법 1: GitHub 연동 (권장)

1. GitHub 저장소 생성 및 코드 푸시
2. [Cloudflare Pages](https://dash.cloudflare.com/) 접속
3. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
4. 저장소 선택: `polymer-hub`
5. 빌드 설정:
   ```
   Framework preset: None
   Build command: (비워두기)
   Build output directory: /
   Root directory: (비워두기)
   ```
6. **Save and Deploy** 클릭

#### 방법 2: CLI 배포

```bash
# Wrangler 설치
npm install -g wrangler

# 로그인
wrangler login

# 배포
wrangler pages deploy . --project-name=polymer-hub
```

---

## 🔧 Cloudflare KV 설정

동적 프로젝트 관리를 위해 KV Namespace 설정이 필요합니다.

### 1단계: KV Namespace 생성

```bash
wrangler kv:namespace create "PROJECTS_KV"
```

### 2단계: wrangler.toml 업데이트

```toml
[[kv_namespaces]]
binding = "PROJECTS_KV"
id = "your-namespace-id"  # 위에서 생성된 ID
```

### 3단계: 프로젝트 데이터 업로드

```bash
wrangler kv:key put --binding=PROJECTS_KV "projects" --path=projects.json
```

**자세한 가이드:** [KV_SETUP_GUIDE.md](./KV_SETUP_GUIDE.md)

---

## 📁 프로젝트 구조

```
polymer-hub/
├── index.html                 # 메인 페이지
├── wrangler.toml              # Cloudflare Pages 설정
├── functions/
│   └── api/
│       └── projects.js        # KV에서 프로젝트 로드 API
├── KV_SETUP_GUIDE.md          # KV 설정 가이드
└── README.md                  # 이 파일
```

---

## 🎯 새 프로젝트 추가하기

### 1. 새 프로젝트 개발 및 배포

```bash
cd my-new-project
# ... 개발 ...
git push  # Cloudflare Pages 자동 배포
```

### 2. KV에 메타데이터 추가

Cloudflare 대시보드 → KV → PROJECTS_KV → "projects" key 편집

```json
{
  "id": "new-project-id",
  "name": "새 프로젝트",
  "description": "프로젝트 설명",
  "url": "https://new-project.pages.dev/",
  "category": ["simulation"],
  "tags": ["Tag1", "Tag2"],
  "thumbnail": "🔬",
  "thumbnailGradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "featured": false,
  "status": "active"
}
```

### 3. 완료!

메인 페이지에 자동으로 표시됩니다.

---

## 🎨 커스터마이징

### 색상 테마 변경

`index.html`의 CSS 변수 수정:

```css
:root {
  --primary: #1e3c72;        /* 주 색상 */
  --secondary: #00d4ff;      /* 보조 색상 */
  --accent: #ff6b6b;         /* 강조 색상 */
}
```

### 3D 분자 구조 수정

`index.html`의 `init3D()` 함수 수정:

```javascript
const chainLength = 25;      // 체인 길이
const spacing = 2;           // 원자 간격
// 색상, 크기, 애니메이션 속도 등 커스터마이징
```

---

## 📊 API 엔드포인트

### GET /api/projects

프로젝트 목록 조회

**응답:**
```json
{
  "success": true,
  "source": "kv",
  "projects": [
    {
      "id": "p3hb-co-4hb",
      "name": "P(3HB-co-4HB) 물성 예측",
      ...
    }
  ]
}
```

---

## 🛠️ 기술 스택

- **Frontend:**
  - Vanilla JavaScript (ES6+)
  - Three.js r128 (3D 시각화)
  - CSS3 (Animations, Grid, Flexbox)

- **Backend:**
  - Cloudflare Pages Functions
  - Cloudflare KV (Key-Value Storage)

- **Deployment:**
  - Cloudflare Pages (Global CDN)
  - GitHub Actions (자동 배포)

---

## 📈 성능

- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s
- **Lighthouse Score:** 95+
- **Global CDN:** Cloudflare 네트워크 (200+ 도시)

---

## 🌍 현재 프로젝트

### ✅ 활성 프로젝트

1. **P(3HB-co-4HB) 물성 예측**
   - Physics-informed 모델 기반 예측 시스템
   - 🔗 [4hb-p34hb-properties-modeling.pages.dev](https://4hb-p34hb-properties-modeling.pages.dev/)

### 🔜 예정 프로젝트

- 분자동역학 시뮬레이션
- 중합 반응 최적화
- 유변학 데이터 분석기

---

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

---

## 📧 연락처

- **Email:** sorisem98@gmail.com
- **GitHub:** [@Yarn98](https://github.com/Yarn98)

---

## 🙏 감사의 말

- **Three.js** - 3D 시각화
- **Cloudflare** - 호스팅 및 KV 스토리지
- **Open Source Community** - 영감과 도구

---

## 🔗 관련 문서

- [Architecture Recommendation](../4HB_P34HB-properties-modeling/ARCHITECTURE_RECOMMENDATION.md)
- [Cloudflare Bindings Guide](../4HB_P34HB-properties-modeling/CLOUDFLARE_BINDINGS_GUIDE.md)
- [KV Setup Guide](./KV_SETUP_GUIDE.md)

---

Made with 💙 for Polymer Engineering Research
