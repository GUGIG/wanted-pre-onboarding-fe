# 프로젝트의 실행 방법

## 1. install dependencies

```bash
npm install
```

## 2. run project

```bash
npm start
```

# 데모 영상

[youtube 링크](https://youtu.be/THAmOb82bIw)

# 개요

## 1. 홈페이지 (로그인, 회원가입)

- 로그인, 회원가입 form 컴포넌트
- 로그인, 회원가입시 http 요청 겹치는 부분 많아 utils 모듈로 분리 (auth.utils.js)
- 각 form의 validation 정의, input 데이터 관리 등 hook으로 캡슐화 (useFieldValidation)

## 2. Todo 페이지

- 데이터가 nesting된 여러 컴포넌트에서 활용될 필요 있어 context api로 상태관리
  - provider 컴포넌트 (value, action)
  - rest api로 백엔드와 통신하는 crud 함수 정의
- render 최적화 (context를 consume하는 리스트 아이템이 모두 리렌더되는 현상 피한다)
  - 전달되는 콜백 함수 memoize (useCallback)
  - 전, 이후 렌더간 변화 없는 컴포넌트의 memoize (React.memo)
