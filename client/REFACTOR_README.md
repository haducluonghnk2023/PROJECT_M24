# Refactor Documentation

## Cấu trúc mới sau khi refactor

### 📁 Folder Structure
```
src/
├── components/           # Reusable components
│   ├── common/          # Common UI components
│   │   ├── FormField.tsx
│   │   ├── Button.tsx
│   │   ├── SearchInput.tsx
│   │   ├── Pagination.tsx
│   │   └── index.ts
│   ├── auth/            # Authentication components
│   │   ├── AuthForm.tsx
│   │   └── index.ts
│   ├── layout/          # Layout components
│   │   ├── UserHeader.tsx
│   │   ├── UserNavbar.tsx
│   │   ├── UserFooter.tsx
│   │   ├── Carousel.tsx
│   │   └── index.ts
│   └── course/          # Course related components
│       ├── CourseList.tsx
│       ├── CourseDetail.tsx
│       └── index.ts
├── hooks/               # Custom hooks
│   ├── useAuth.ts
│   ├── useForm.ts
│   └── index.ts
├── layouts/             # Layout wrappers
│   ├── UserLayout.tsx
│   └── AdminLayout.tsx
├── pages/               # Page components
│   ├── auth/            # Authentication pages
│   │   ├── LoginPage.tsx
│   │   ├── AdminLoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── user/            # User pages
│   │   ├── HomePage.tsx
│   │   └── CoursePage.tsx
│   └── admin/           # Admin pages
│       └── DashboardPage.tsx
├── services/            # API services
│   ├── authService.ts
│   ├── courseService.ts
│   ├── testService.ts
│   └── index.ts
├── utils/               # Utility functions
│   ├── validation.ts
│   └── api.ts
├── constants/           # App constants
│   └── index.ts
├── types/               # TypeScript types
│   └── index.ts
└── store/               # Redux store (existing)
    ├── interface/
    ├── reducers/
    └── store.ts
```

## 🔄 Những thay đổi chính

### 1. **Tách component có thể tái sử dụng**
- `AuthForm`: Form đăng nhập/đăng ký chung cho cả user và admin
- `FormField`: Input field với validation
- `Button`: Button component với nhiều variant
- `SearchInput`: Search input với debounce
- `Pagination`: Component phân trang

### 2. **Custom Hooks**
- `useAuth`: Quản lý authentication state
- `useForm`: Xử lý form với validation

### 3. **Service Layer**
- `authService`: API calls liên quan đến authentication
- `courseService`: API calls liên quan đến courses
- `testService`: API calls liên quan đến tests

### 4. **Utility Functions**
- `validation.ts`: Form validation logic
- `api.ts`: API configuration và interceptors

### 5. **Constants**
- `ROUTES`: Tất cả routes trong app
- `API_ENDPOINTS`: API endpoints
- `VALIDATION_RULES`: Validation rules
- `STORAGE_KEYS`: Local storage keys

### 6. **Layout Components**
- `UserLayout`: Layout cho user pages
- `AdminLayout`: Layout cho admin pages

## 🎯 Lợi ích của refactor

### ✅ **Code Reusability**
- Các component có thể tái sử dụng được tách riêng
- Logic chung được đưa vào custom hooks
- API calls được tổ chức trong service layer

### ✅ **Maintainability**
- Cấu trúc folder rõ ràng, dễ tìm kiếm
- Tách biệt concerns (UI, logic, API)
- Naming convention nhất quán

### ✅ **Type Safety**
- TypeScript types được định nghĩa tập trung
- Interface rõ ràng cho các component

### ✅ **Performance**
- Lazy loading có thể dễ dàng implement
- Component được tối ưu hóa

### ✅ **Testing**
- Component nhỏ, dễ test
- Logic tách biệt khỏi UI

## 🚀 Cách sử dụng

### Import components
```typescript
import { FormField, Button } from '@/components/common';
import { AuthForm } from '@/components/auth';
import { useAuth, useForm } from '@/hooks';
```

### Sử dụng services
```typescript
import { authService, courseService } from '@/services';
```

### Sử dụng constants
```typescript
import { ROUTES, API_ENDPOINTS } from '@/constants';
```

## 📝 Notes

- Tất cả component cũ đã được thay thế bằng component mới
- Redux store vẫn giữ nguyên cấu trúc
- Styling vẫn sử dụng SCSS và Tailwind CSS
- API calls được centralize trong service layer
