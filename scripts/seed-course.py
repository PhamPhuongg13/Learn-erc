import re,json,pathlib
root=pathlib.Path(__file__).resolve().parent.parent
text=(root/'docs/LESSON_GUIDE.md').read_text()
video_rows={}
for line in (root/'docs/VIDEO_CATALOG.md').read_text().splitlines():
 if re.match(r'\| L\d+',line):
  cols=[x.strip() for x in line.split('|')[1:-1]]
  link=re.search(r'\[(.*?)\]\((.*?)\)',cols[1]); fall=re.search(r'\[.*?\]\((.*?)\)',cols[3])
  video_rows[cols[0]]={'title':link[1],'url':link[2],'mode':cols[2].strip('`'),'fallbackUrl':fall[1] if fall else link[2]}
concepts=['erp,integration,shared-data','modules,crm,scm','master-data,transaction-data,implementation','o2c,invoice,payment','p2p,three-way-match,roles','stock,posting,integrity','platform,configuration,modes','infobase,metadata,data-object','catalog,attributes,reference','document,draft,posting','register,dimensions,resources','query,report,roles','recap,posting,workflow']
lessons=[]
for n,chunk in enumerate(re.split(r'\n## ',text)[1:]):
 head,body=chunk.split('\n',1); match=re.match(r'(L\d+) · (.*?) \((\d+) phút\)',head); lid,title,minutes=match.groups()
 sections=[]
 for i,(heading,content) in enumerate(re.findall(r'### (.*?)\n(.*?)(?=\n### |\Z)',body,re.S)):
  if heading=='Bài thực hành': continue
  narration, takeaway=content.split('**Chốt:**',1)
  sections.append({'id':f'{lid}-s{i+1}','title':heading,'narration':narration.strip().replace('`',''),'keyTakeaway':takeaway.strip()})
 objectives=re.search(r'\*\*Mục tiêu:\*\* (.*)',body)[1].split('; ')
 pitfalls=re.search(r'\*\*Bẫy trắc nghiệm:\*\* (.*)',body)[1].split('; ')
 steps=re.findall(r'^\d+\. (.*)',body,re.M)
 video=video_rows[lid]
 if 'youtube' in video['mode']: video['youtubeId']=video['url'].split('v=')[-1]
 video['accessNote']='Có thể cần đăng nhập 1C Skills Hub hoặc 1C Academy.' if video['mode']=='official_course' else ('ID từ metadata LMS; chưa xác thực phát nhúng. Nếu video không phát, hãy mở bài gốc.' if video['mode']=='youtube_candidate' else 'Video bổ trợ của tác giả độc lập. Nếu không phát nhúng, hãy mở trên YouTube.')
 lessons.append({'id':lid,'stage':1 if n<3 else 2 if n<6 else 3 if n<12 else 4,'title':title,'estimatedMinutes':int(minutes),'priority':'required','prerequisites':[] if n==0 else [f'L{n:02}'],'objectives':objectives,'concepts':concepts[n].split(','),'sections':sections,'video':video,'lab':{'id':lid,'title':'Tình huống '+lid,'steps':steps,'expected':re.search(r'\*\*Yêu cầu đạt:\*\* (.*)',body)[1]},'pitfalls':pitfalls,'recall':[s['keyTakeaway'] for s in sections],'references':[video['fallbackUrl'],'https://1c-dn.com/learning/1c_enterprise_first_step_beginners_course/' if n>=6 else 'https://learning.sap.com/courses/managing-purchase-orders-in-sap-ariba-buying-and-invoicing/define-the-purchase-order-lifecycle']})
(root/'data/curriculum.json').write_text(json.dumps(lessons,ensure_ascii=False,indent=2)+'\n')
print(f'Seeded {len(lessons)} lessons / {sum(len(l["sections"]) for l in lessons)} full sections')
questions=[]
counts={}
for line in (root/'data/questions-source.txt').read_text().splitlines():
 if not line:continue
 lid,q,right,wrong1,wrong2,explanation=line.split('|');counts[lid]=counts.get(lid,0)+1
 n=int(lid[1:]); opts=[{'id':'a','text':right,'explanation':'Đúng. '+explanation},{'id':'b','text':wrong1,'explanation':'Chưa đúng. '+explanation},{'id':'c','text':wrong2,'explanation':'Chưa đúng. '+explanation}]
 # Rotate display order while retaining IDs; no answer-position pattern.
 k=counts[lid]%3;opts=opts[k:]+opts[:k]
 questions.append({'id':lid+'-Q'+str(counts[lid]),'lessonId':lid,'category':'erp' if n<4 else 'business' if n<7 else '1c','difficulty':'medium','tags':[concepts[n-1].split(',')[(counts[lid]-1)%3]],'question':q,'options':opts,'correctAnswer':['a'],'explanation':explanation})
(root/'data/question_bank.json').write_text(json.dumps(questions,ensure_ascii=False,indent=2)+'\n')
print(f'Seeded {len(questions)} original practice questions; mock mode = demo')
