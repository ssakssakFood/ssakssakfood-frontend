# 📱 Mobile Web App (React + Vite + TypeScript)

<p align="center">
  <img src="https://img.shields.io/badge/Package_Manager-pnpm-orange?logo=pnpm" />
  <img src="https://img.shields.io/badge/Framework-React-blue?logo=react" />
  <img src="https://img.shields.io/badge/Build-Vite-purple?logo=vite" />
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript" />
  <img src="https://img.shields.io/badge/Style-TailwindCSS-06B6D4?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Lint-ESLint-4B32C3?logo=eslint" />
  <img src="https://img.shields.io/badge/Format-Prettier-F7B93E?logo=prettier" />
  <img src="https://img.shields.io/badge/Router-React_Router_Dom-CA4245?logo=reactrouter" />
</p>

---

## 🛠️ Tech Stack

- **Package Manager** : [pnpm](https://pnpm.io/)
- **Framework & Build** : [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language** : [TypeScript](https://www.typescriptlang.org/)
- **Style** : [Tailwind CSS v4](https://tailwindcss.com/)
- **Etc** : ESLint, Prettier, React Router Dom

---

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev
```

## 📂 File Structure

```bash
src/
├── assets/             # 이미지, 폰트 등 정적 자원
├── components/         # 재사용 가능한 UI 컴포넌트 (Dumb Components)
│   ├── ui/             # 버튼, Input 등 디자인 시스템의 기본 요소
│   └── common/         # 헤더, 푸터, 레이아웃 등 공통 요소
├── constants/          # 전역 상수 및 설정 값
├── hooks/              # Custom Hooks (e.g., useUser, useFetch)
├── lib/                # 외부 라이브러리 설정/유틸 (e.g., Axios instance)
├── pages/              # 라우팅과 1:1 매칭되는 페이지 컴포넌트
│   ├── Home.tsx        # "/" 경로 페이지
├── styles/             # 전역 CSS (e.g., index.css)
├── types/              # 전역 타입 정의
├── utils/              # 유틸 함수 (e.g., formatDate, debounce)
├── App.tsx             # 최상위 컴포넌트 & 레이아웃
├── main.tsx            # React 앱 진입점 (BrowserRouter 설정)
└── Router.tsx          # 라우팅 정의 파일
```

## 🎨 Layout Rule

- 모바일 웹 앱 형태 최적화
- 메인 컨테이너는 max-w-[401px]으로 제한 → PC에서도 모바일 사이즈 유지
- 작은 화면(401px 이하)에서는 w-full 적용 → 전체 너비 활용
- 화면은 중앙 정렬로 배치되어 반응형 디자인 지원
