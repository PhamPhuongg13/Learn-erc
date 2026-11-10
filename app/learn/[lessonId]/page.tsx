import {LessonPage} from '@/components/academy/lesson';
export default async function Page({params}:{params:Promise<{lessonId:string}>}){const {lessonId}=await params;return <LessonPage key={lessonId} id={lessonId}/>;}
