'use client';
import {useEffect,useRef,useState} from 'react';
import {BookOpen,Check,CheckCircle2,Clock,ExternalLink,Play,Volume2,Square,ChevronRight,Lightbulb,NotebookPen,FlaskConical,ClipboardCheck,ArrowRight,Bot,Send,X,Sparkles,MessageSquareText} from 'lucide-react';
import {useAcademy} from './provider';
import {Link,PageHeading} from './shell';
import {lessons,questions,stages} from '@/lib/academy/data';
import {correct} from '@/lib/academy/engine';
import type {Lesson as LessonType} from '@/lib/academy/types';

export function VideoCard({lesson}:{lesson:LessonType}){const [play,setPlay]=useState(false);const v=lesson.video;return <section className="video-card"><div className="video-heading"><span className="tiny-label">VIDEO BỔ TRỢ</span><a href={v.fallbackUrl} target="_blank" rel="noreferrer">Mở bài gốc <ExternalLink size={14}/></a></div>{v.mode==='official_course'?<div className="official-video"><span className="official-brand">1C<span>Learning</span></span><span className="badge">KHÓA HỌC CHÍNH THỨC</span><h3>{v.title}</h3><p>Video được cung cấp trên nền tảng khóa học 1C.<br/>Có thể cần đăng nhập để xem.</p><a href={v.url} target="_blank" rel="noreferrer" className="button primary"><ExternalLink size={16}/>Xem video bài học</a></div>:play?<iframe className="video-player" title={v.title} src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?rel=0`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>:<div className="youtube-preview"><img src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`} alt="" onError={e=>{e.currentTarget.style.display='none';}}/><div className="video-shade"/><button onClick={()=>setPlay(true)} className="video-play" aria-label="Mở trình phát video"><Play fill="currentColor" size={25}/></button><div className="video-caption"><span>YOUTUBE · VIDEO BỔ TRỢ</span><h3>{v.title}</h3></div></div>}<p className="video-note">{v.accessNote} {v.mode!=='official_course'&&<a href={v.fallbackUrl} target="_blank" rel="noreferrer">Không phát được? Mở liên kết nguồn ↗</a>}</p></section>;}

export function LessonPage({id}:{id:string}){
  const {p,update}=useAcademy();
  const lesson=lessons.find(l=>l.id===id);
  const [tab,setTab]=useState('read');
  const [pre,setPre]=useState<Record<string,string[]>>({});
  const [checked,setChecked]=useState(false);
  const [speaking,setSpeaking]=useState(false);
  const [speechSupported,setSpeechSupported]=useState(false);
  
  // AI Tutor state
  const [tutorOpen,setTutorOpen]=useState(false);
  const [tutorContext,setTutorContext]=useState<{sectionTitle?:string;sectionText?:string}>({});
  const [messages,setMessages]=useState<{role:'user'|'assistant';content:string}[]>([
    {role:'assistant',content:`Chào bạn! Tôi là Gia sư ERP 1C Academy. Bạn có câu hỏi nào về bài ${id} (${lesson?.title}) không? Bạn có thể bấm nút "Hỏi Gia sư đoạn này" hoặc gõ câu hỏi bên dưới nhé!`}
  ]);
  const [inputMsg,setInputMsg]=useState('');
  const [loading,setLoading]=useState(false);
  const chatEndRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{setSpeechSupported('speechSynthesis'in window);return ()=>{if('speechSynthesis'in window)window.speechSynthesis.cancel();};},[]);
  useEffect(()=>{if(lesson)update(old=>({...old,lastLesson:id}));},[id]);
  useEffect(()=>{if(tutorOpen)chatEndRef.current?.scrollIntoView({behavior:'smooth'});},[messages,tutorOpen]);

  if(!lesson)return <PageHeading title="Không tìm thấy bài học" action={<Link href="/roadmap">Về lộ trình</Link>}/>;
  const next=lessons[lessons.indexOf(lesson)+1];
  const qs=questions.filter(q=>q.lessonId===id).slice(0,2);
  const read=p.sections.filter(s=>s.startsWith(id)).length;

  function speak(){
    if(!lesson)return;
    if(speaking){speechSynthesis.cancel();setSpeaking(false);return;}
    const voice=new SpeechSynthesisUtterance(lesson.sections.map(s=>s.title+'. '+s.narration).join('\n'));
    voice.lang='vi-VN';
    voice.rate=.95;
    voice.onend=()=>setSpeaking(false);
    voice.onerror=()=>setSpeaking(false);
    speechSynthesis.speak(voice);
    setSpeaking(true);
  }

  function askSection(title:string,narration:string){
    setTutorContext({sectionTitle:title,sectionText:narration});
    setTutorOpen(true);
    sendMessage(`Em đang đọc phần "${title}". Đoạn này nói: "${narration.slice(0,180)}...". Gia sư có thể giải thích dễ hiểu hơn và cho 1 ví dụ thực tế được không?`, title, narration);
  }

  async function sendMessage(textToSend?:string, ctxTitle?:string, ctxText?:string){
    const msg = textToSend || inputMsg;
    if(!msg.trim() || loading) return;
    const newHist = [...messages, {role:'user' as const, content:msg}];
    setMessages(newHist);
    if(!textToSend) setInputMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/tutor', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          message: msg,
          lessonId: id,
          sectionId: ctxTitle || tutorContext.sectionTitle || '',
          selectedText: ctxText || tutorContext.sectionText || '',
          history: newHist.slice(-6).map(m=>({role:m.role, content:m.content}))
        })
      });
      const data = await res.json();
      setMessages([...newHist, {role:'assistant', content: data.reply || 'Không có phản hồi.'}]);
    } catch {
      setMessages([...newHist, {role:'assistant', content:'Không thể kết nối đến máy chủ gia sư. Hãy kiểm tra lại kết nối mạng.'}]);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <div className="lesson-breadcrumb"><Link href="/roadmap">{stages[lesson.stage-1].title}</Link><ChevronRight size={14}/><span>{id}</span></div>
    <PageHeading eyebrow={`BÀI ${id.slice(1)} · GIAI ĐOẠN ${lesson.stage}`} title={lesson.title} description={`${lesson.estimatedMinutes} phút cho cả bài đọc, video, thực hành và ôn tập`} action={<span className="badge lavender"><BookOpen size={14}/>{read}/3 phần đã đọc</span>}/>
    <nav className="tabs" aria-label="Các phần bài học">
      <button className={tab==='read'?'selected':''} onClick={()=>setTab('read')}><BookOpen size={17}/>Bài giảng</button>
      <Link href={'/practice/'+id}><FlaskConical size={17}/>Thực hành</Link>
      <Link href={'/quiz/'+id}><ClipboardCheck size={17}/>Trắc nghiệm</Link>
      <button className={tab==='notes'?'selected':''} onClick={()=>setTab('notes')}><NotebookPen size={17}/>Ghi chú</button>
    </nav>

    {tab==='notes'?<section className="panel">
      <h2>Ghi lại bằng lời của bạn</h2>
      <p className="muted">Ghi chú được tự động lưu trên thiết bị này.</p>
      <textarea aria-label="Ghi chú bài học" className="notes-input" placeholder="Điều mình đã hiểu, ví dụ và câu hỏi cần tìm hiểu thêm..." value={p.notes[id]??''} onChange={e=>update(old=>({...old,notes:{...old.notes,[id]:e.target.value}}))} maxLength={20000}/>
    </section>:<div className="reader-layout">
      <div className="reader-main">
        <section className="objectives"><span className="tiny-label">SAU BÀI NÀY, BẠN CÓ THỂ</span>{lesson.objectives.map(o=><div key={o}><CheckCircle2 size={17}/><span>{o}</span></div>)}</section>
        <details className="pretest panel"><summary>Khởi động · Bạn đã biết gì? <span>2 câu hỏi</span></summary>{qs.map((q,i)=><div className="pretest-question" key={q.id}><strong>{i+1}. {q.question}</strong>{q.options.map(o=><label key={o.id}><input type="radio" name={'pre-'+q.id} checked={pre[q.id]?.[0]===o.id} onChange={()=>{setPre({...pre,[q.id]:[o.id]});setChecked(false);}}/>{o.text}</label>)}{checked&&<p className={correct(q,pre[q.id])?'feedback-good':'feedback-info'}>{q.explanation}</p>}</div>)}<button className="button secondary" disabled={Object.keys(pre).length<2} onClick={()=>setChecked(true)}>Kiểm tra nhanh</button><small>Khởi động không tính vào điểm thành thạo.</small></details>
        
        <VideoCard lesson={lesson}/>
        
        <div className="section-title narration-heading">
          <h2>Đọc để hiểu bản chất</h2>
          <div className="row">
            {speechSupported&&<button className="button quiet" onClick={speak}>{speaking?<Square size={15}/>:<Volume2 size={17}/>} {speaking?'Dừng đọc':'Nghe bài giảng'}</button>}
            <button className="button secondary" onClick={()=>setTutorOpen(true)}><Bot size={16}/>Gia sư AI</button>
          </div>
        </div>

        {lesson.sections.map((s,i)=><article key={s.id} id={s.id} className="narration-section">
          <div className="section-number">0{i+1}</div>
          <h2>{s.title}</h2>
          <p>{s.narration}</p>
          <div className="takeaway"><Lightbulb size={20}/><div><strong>Điều cần nhớ</strong><p>{s.keyTakeaway}</p></div></div>
          <div className="row between wrap">
            <button className={'read-check '+(p.sections.includes(s.id)?'checked':'')} onClick={()=>update(old=>({...old,sections:old.sections.includes(s.id)?old.sections.filter(id=>id!==s.id):[...old.sections,s.id]}))}><span>{p.sections.includes(s.id)&&<Check size={13}/>}</span>{p.sections.includes(s.id)?'Đã đọc và hiểu phần này':'Đánh dấu đã đọc'}</button>
            <button className="button quiet" onClick={()=>askSection(s.title, s.narration)}><Sparkles size={14}/>Hỏi Gia sư AI đoạn này</button>
          </div>
        </article>)}

        <section className="flow-diagram" aria-label="Luồng dữ liệu mẫu"><span>Danh mục</span><ArrowRight/><span>Chứng từ</span><ArrowRight/><span>Ghi nhận</span><ArrowRight/><span>Báo cáo</span></section>
        <section className="panel pitfalls"><h3>Những điểm dễ nhầm</h3>{lesson.pitfalls.map(t=><p key={t}><span>!</span>{t}</p>)}</section>
        <section className="panel">
          <h3>Nhớ lại mà không nhìn bài</h3>{lesson.recall.map((r,i)=><details key={r}><summary>Ý chính {i+1}: {lesson.sections[i].title}</summary><p>{r}</p></details>)}
          <details><summary>Khi nào mình được đánh dấu nắm vững?</summary><p>Điểm quiz lần gần nhất ≥85% và vượt qua bài thực hành. Dưới 70%: đọc lại bài; 70–84%: sửa lỗi rồi thử lại; từ 95%: có thể chuyển tiếp. Bạn luôn được mở mọi bài.</p></details>
        </section>
        <section className="panel sources"><h3>Nguồn học & tài liệu</h3>{lesson.references.map((r,i)=><a key={r} href={r} target="_blank" rel="noreferrer"><ExternalLink size={15}/>{i===0?'Video / bài học nguồn':'Tài liệu nền tảng chính thức'}</a>)}<small>Lời giảng từ tài liệu bạn cung cấp, không phải bản chép lời video.</small></section>
        <div className="row between lesson-next"><Link href={'/practice/'+id} className="button primary">Áp dụng trong bài thực hành <ArrowRight size={16}/></Link>{next&&<Link href={'/learn/'+next.id} className="text-link">Bài tiếp theo <ArrowRight size={16}/></Link>}</div>
      </div>

      <aside className="lesson-outline">
        <span className="tiny-label">TRONG BÀI HỌC NÀY</span>
        {lesson.sections.map((s,i)=><a href={'#'+s.id} key={s.id}><span>{p.sections.includes(s.id)?<Check size={13}/>:i+1}</span>{s.title}</a>)}
        <div className="outline-progress">
          <h4>Từng bước hoàn thành</h4>
          <p><CheckCircle2 size={15}/>Đọc bài: {read}/3</p>
          <p><FlaskConical size={15}/>Thực hành: {p.labs.includes(id)?'Đã đạt':'Chưa đạt'}</p>
          <p><ClipboardCheck size={15}/>Quiz: {p.quizzes[id]?p.quizzes[id].last+'%':'Chưa làm'}</p>
        </div>
        <div className="study-tip">
          <Bot size={21}/>
          <strong>Gia sư AI đồng hành</strong>
          <p>Chưa hiểu đoạn nào? Bấm nút bên dưới để trao đổi 1-1 với trợ lý học tập.</p>
          <button className="button primary" style={{marginTop:'12px',width:'100%'}} onClick={()=>setTutorOpen(true)}>Mở Gia sư AI</button>
        </div>
      </aside>
    </div>}

    {/* Floating / Slide-over AI Tutor Drawer */}
    {tutorOpen&&<div className="tutor-drawer-overlay" onClick={()=>setTutorOpen(false)}>
      <aside className="tutor-drawer" onClick={e=>e.stopPropagation()}>
        <div className="tutor-header">
          <div className="row">
            <span className="tutor-avatar"><Bot size={20}/></span>
            <div>
              <strong>Gia sư ERP 1C</strong>
              <small>Học tập ngữ cảnh · Bài {id}</small>
            </div>
          </div>
          <button className="icon-button" aria-label="Đóng gia sư AI" onClick={()=>setTutorOpen(false)}><X size={18}/></button>
        </div>

        {tutorContext.sectionTitle&&<div className="tutor-context-badge">
          <span>Ngữ cảnh:</span> <strong>{tutorContext.sectionTitle}</strong>
          <button onClick={()=>setTutorContext({})}>✕</button>
        </div>}

        <div className="tutor-messages">
          {messages.map((m,i)=><div key={i} className={'tutor-msg '+(m.role==='user'?'user':'assistant')}>
            <div className="tutor-msg-content">
              {m.content.split('\n').map((line,li)=><p key={li}>{line}</p>)}
            </div>
          </div>)}
          {loading&&<div className="tutor-msg assistant"><div className="tutor-msg-content"><span className="tutor-loading-dots">Gia sư đang suy nghĩ...</span></div></div>}
          <div ref={chatEndRef}/>
        </div>

        <div className="tutor-quick-prompts">
          <button onClick={()=>sendMessage('Giải thích ngắn gọn 3 ý chính của phần này')}>Tóm tắt 3 ý</button>
          <button onClick={()=>sendMessage('Cho tôi một ví dụ thực tế trong cửa hàng máy tính')}>Ví dụ thực tế</button>
          <button onClick={()=>sendMessage('Hãy đặt cho tôi 1 câu hỏi ngắn để kiểm tra xem tôi đã hiểu chưa')}>Hỏi kiểm tra tôi</button>
        </div>

        <form className="tutor-input-box" onSubmit={e=>{e.preventDefault();sendMessage();}}>
          <input placeholder="Hỏi gia sư về bài học này..." value={inputMsg} onChange={e=>setInputMsg(e.target.value)} disabled={loading}/>
          <button type="submit" className="button primary" disabled={loading||!inputMsg.trim()} aria-label="Gửi câu hỏi"><Send size={15}/></button>
        </form>
      </aside>
    </div>}
  </>;
}
