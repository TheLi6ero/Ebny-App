import { create } from 'zustand';

// 1. تعريف شكل البيانات (Types) - ممكن تعدلها بعدين لو حبيت
interface AppState {
  user: any; // استخدمنا any مؤقتاً لتجنب أخطاء الـ TypeScript
  setUser: (user: any) => void;
  loading: boolean;
  error: string | null;
}

// 2. إنشاء المتجر (Store)
export const useAppStore = create<AppState>((set) => ({
  // البيانات الافتراضية للطفل
  user: {
    id: 'user_1',
    name: 'عبدالله البطل',
    total_points: 1250,
    skills: {
      knowledge: 40,
      speed: 30,
      logic: 40,
      creativity: 20,
      focus: 50,
      consistency: 10
    }
  },
  loading: false,
  error: null,
  
  // الدالة اللي بنستخدمها عشان نحدث بيانات الطفل (لما يخلص درس)
  setUser: (newUser) => set({ user: newUser }),
}));