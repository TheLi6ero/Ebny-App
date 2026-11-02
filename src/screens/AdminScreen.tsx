import React, { useState } from 'react';
import { ArrowRight, Database, UploadCloud, PlusCircle } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';

export const AdminScreen = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
  
  // بيانات الإدخال الفردي
  const [country, setCountry] = useState('EG');
  const [grade, setGrade] = useState('KG1');
  const [subject, setSubject] = useState('arabic');
  const [lessonId, setLessonId] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [qText, setQText] = useState('');
  const [qCorrect, setQCorrect] = useState('');
  const [qOptions, setQOptions] = useState('');

  // بيانات الإدخال المجمع (JSON)
  const [jsonData, setJsonData] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 1. إضافة درس وسؤال مفرد
  const handleAddSingle = async () => {
    if (!lessonId || !lessonTitle || !qText || !qCorrect || !qOptions) {
      setMessage('❌ يرجى ملء جميع الحقول');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const curriculumId = `${country}_${grade}_${subject}`.toLowerCase();
      
      // إنشاء المنهج لو مش موجود
      await setDoc(doc(db, 'curriculums', curriculumId), {
        country, grade, subject, title: `منهج ${country} - ${grade}`
      }, { merge: true });

      // إنشاء الدرس
      const lessonRef = doc(db, 'curriculums', curriculumId, 'lessons', lessonId);
      await setDoc(lessonRef, {
        title: lessonTitle,
        order: 1,
        type: 'lesson'
      }, { merge: true });

      // إضافة السؤال
      const questionsRef = collection(db, 'curriculums', curriculumId, 'lessons', lessonId, 'questions');
      await addDoc(questionsRef, {
        text: qText,
        correct: qCorrect,
        options: qOptions.split(',').map(opt => opt.trim())
      });

      setMessage('✅ تم إضافة الدرس والسؤال بنجاح!');
      setLessonId(''); setLessonTitle(''); setQText(''); setQCorrect(''); setQOptions('');
    } catch (error) {
      console.error(error);
      setMessage('❌ حدث خطأ أثناء الإضافة');
    }
    setLoading(false);
  };

  // 2. إضافة مجمعة (Bulk)
  const handleBulkUpload = async () => {
    if (!jsonData) {
      setMessage('❌ يرجى لصق كود JSON أولاً');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const parsedData = JSON.parse(jsonData);
      
      // لوب على المناهج
      for (const cur of parsedData) {
        const curriculumId = cur.id;
        await setDoc(doc(db, 'curriculums', curriculumId), {
          country: cur.country, grade: cur.grade, subject: cur.subject, title: cur.title
        }, { merge: true });

        if (cur.lessons) {
          for (const lesson of cur.lessons) {
            const lessonRef = doc(db, 'curriculums', curriculumId, 'lessons', lesson.id);
            await setDoc(lessonRef, {
              title: lesson.title, order: lesson.order, type: lesson.type
            }, { merge: true });

            if (lesson.questions) {
              for (const q of lesson.questions) {
                const qRef = doc(db, 'curriculums', curriculumId, 'lessons', lesson.id, 'questions', q.id);
                await setDoc(qRef, {
                  text: q.text, correct: q.correct, options: q.options
                });
              }
            }
          }
        }
      }
      setMessage('✅ تم رفع جميع البيانات بنجاح!');
      setJsonData('');
    } catch (error) {
      console.error(error);
      setMessage('❌ تأكد من صحة كود JSON');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', padding: '20px', direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '500px', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <button onClick={onBack} style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '50%', color: 'white', border: 'none', cursor: 'pointer' }}>
          <ArrowRight size={24} />
        </button>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Database color="#10b981" /> لوحة الإدارة
        </h1>
      </div>

      {/* التابات */}
      <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '500px', marginBottom: '20px' }}>
        <button onClick={() => { setActiveTab('single'); setMessage(''); }} style={{ flex: 1, padding: '15px', borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'single' ? '#10b981' : '#1e293b', color: 'white' }}>
          إضافة فردية
        </button>
        <button onClick={() => { setActiveTab('bulk'); setMessage(''); }} style={{ flex: 1, padding: '15px', borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'bulk' ? '#10b981' : '#1e293b', color: 'white' }}>
          رفع مجمع (JSON)
        </button>
      </div>

      {message && (
        <div style={{ width: '100%', maxWidth: '500px', padding: '15px', borderRadius: '10px', backgroundColor: message.includes('✅') ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)', color: message.includes('✅') ? '#10b981' : '#f43f5e', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
          {message}
        </div>
      )}

      {/* شاشة الإضافة الفردية */}
      {activeTab === 'single' && (
        <div style={{ width: '100%', maxWidth: '500px', backgroundColor: '#1e293b', padding: '20px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '15px', border: '2px solid #334155' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="كود الدولة (EG)" value={country} onChange={e => setCountry(e.target.value)} style={styles.input} />
            <input placeholder="الصف (KG1)" value={grade} onChange={e => setGrade(e.target.value)} style={styles.input} />
          </div>
          <input placeholder="كود الدرس (alef)" value={lessonId} onChange={e => setLessonId(e.target.value)} style={styles.input} />
          <input placeholder="اسم الدرس (حرف الألف)" value={lessonTitle} onChange={e => setLessonTitle(e.target.value)} style={styles.input} />
          <input placeholder="نص السؤال" value={qText} onChange={e => setQText(e.target.value)} style={styles.input} />
          <input placeholder="الإجابة الصحيحة (مثال: أسد)" value={qCorrect} onChange={e => setQCorrect(e.target.value)} style={styles.input} />
          <input placeholder="الخيارات (مفصولة بفاصلة: أسد, تفاح, موز)" value={qOptions} onChange={e => setQOptions(e.target.value)} style={styles.input} />
          
          <button onClick={handleAddSingle} disabled={loading} style={{ padding: '15px', borderRadius: '15px', backgroundColor: '#10b981', color: 'white', fontWeight: 'bold', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <PlusCircle size={20} /> {loading ? 'جاري الحفظ...' : 'حفظ الدرس والسؤال'}
          </button>
        </div>
      )}

      {/* شاشة الرفع المجمع */}
      {activeTab === 'bulk' && (
        <div style={{ width: '100%', maxWidth: '500px', backgroundColor: '#1e293b', padding: '20px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '15px', border: '2px solid #334155' }}>
          <p style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>الصق كود JSON الخاص بالمناهج هنا (زي اللي جيميناي اقترحه):</p>
          <textarea 
            placeholder='[{"id":"eg_kg1_arabic", "country":"EG", ...}]' 
            value={jsonData} 
            onChange={e => setJsonData(e.target.value)} 
            style={{ ...styles.input, height: '200px', resize: 'vertical', fontFamily: 'monospace', direction: 'ltr' }} 
          />
          
          <button onClick={handleBulkUpload} disabled={loading} style={{ padding: '15px', borderRadius: '15px', backgroundColor: '#3b82f6', color: 'white', fontWeight: 'bold', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <UploadCloud size={20} /> {loading ? 'جاري الرفع (قد يستغرق دقيقة)...' : 'رفع البيانات المجمعة'}
          </button>
        </div>
      )}

    </div>
  );
};

// ستايل سريع للـ Inputs
const styles = {
  input: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '10px',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box' as const
  }
};