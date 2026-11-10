import {Quiz} from '@/components/academy/quiz';
export default async function Page({params}:{params:Promise<{quizId:string}>}){const {quizId}=await params;return <Quiz key={quizId} id={quizId} review={quizId==='review'}/>;}
