# 와이파이 QR 코드 생성기

Modern Next.js application built with TypeScript and cutting-edge technologies.

## 기술 스택

- [Next.js 14](https://nextjs.org/) - React 프레임워크
- [TypeScript](https://www.typescriptlang.org/) - 정적 타입 지원
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 기반 CSS 프레임워크
- [Shadcn UI](https://ui.shadcn.com/) - 재사용 가능한 컴포넌트 라이브러리
- [Zustand](https://zustand-demo.pmnd.rs/) - 상태 관리
- [TanStack Query](https://tanstack.com/query/latest) - 서버 상태 관리
- [Zod](https://zod.dev/) - 스키마 검증

## 시작하기

### 사전 요구사항

- Node.js 18.0.0 이상
- pnpm 8.0.0 이상

### 설치

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)를 열어 결과를 확인하세요.

### 프로덕션 빌드

```bash
pnpm build
pnpm start
```

## 프로젝트 구조

```
├── app/                   # Next.js 14 App Router
├── components/           # 재사용 가능한 컴포넌트
│   ├── ui/              # 기본 UI 컴포넌트
│   └── shared/          # 공통 컴포넌트
├── lib/                 # 유틸리티 함수 및 설정
├── hooks/               # 커스텀 React 훅
├── types/               # TypeScript 타입 정의
└── public/             # 정적 파일
```

## 주요 기능

- 🚀 Server Components를 활용한 최적화된 성능
- 📱 모바일 우선 반응형 디자인
- 🔒 보안 강화 및 입력 검증
- ⚡ 최적화된 이미지 처리
- 🎨 일관된 디자인 시스템

## 개발 가이드

### 코딩 컨벤션

- 함수형 컴포넌트와 선언적 프로그래밍 패턴 사용
- 가능한 한 Server Components 활용
- 일관된 네이밍 컨벤션 (예: `isLoading`, `hasError`)
- 모듈화와 재사용성 강조

### 컴포넌트 작성

```typescript
// 컴포넌트 예시
const ExampleComponent = async ({ param }: { param: string }) => {
  // Server Component 로직
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### 상태 관리

```typescript
// Zustand store 예시
import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
}

export const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

## 테스트

```bash
# 단위 테스트 실행
pnpm test

# 테스트 커버리지 확인
pnpm test:coverage
```

## 배포

이 프로젝트는 Vercel에 최적화되어 있습니다. main 브랜치에 push하면 자동으로 배포됩니다.

## 데모

🌐 [실제 구동되는 데모 사이트 보기](https://wifi-qr-code-generator-x26h.vercel.app)

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 연락처


프로젝트 링크: [https://github.com/tokkaiiii/wifi-qr-code-generator](https://github.com/tokkaiiii/wifi-qr-code-generator)
