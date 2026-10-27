import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "./lib/firebase";

export const seedDatabase = async () => {
  try {
    // 1. إضافة المنهج (Curriculum)
    const curriculumRef = doc(db, "curriculums", "eg_kg1_arabic");
    await setDoc(curriculumRef, {
      country: "EG",
      grade: "KG1",
      subject: "arabic",
      title: "اللغة العربية - كي جي 1"
    });

    // 2. إضافة الدرس (Lesson)
    const lessonRef = doc(db, "curriculums", "eg_kg1_arabic", "lessons", "alef");
    await setDoc(lessonRef, {
      title: "حرف الألف",
      order: 1,
      type: "lesson"
    });

    // 3. إضافة السؤال (Question)
    const questionsRef = collection(db, "curriculums", "eg_kg1_arabic", "lessons", "alef", "questions");
    await addDoc(questionsRef, {
      text: "اختر الشكل الذي يبدأ بحرف الألف:",
      correct: "أسد",
      options: ["أسد", "تفاح", "موز", "قطة"]
    });

    alert("تم إدخال البيانات بنجاح! ✅");
  } catch (error) {
    console.error("Error seeding data: ", error);
    alert("حدث خطأ أثناء إدخال البيانات! ❌");
  }
};