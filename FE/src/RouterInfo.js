import Intro from './pages/Intro/Intro';
import LogIn from './pages/Login/LogIn';
import SignUp from './pages/SignUp/SignUp';
import PersonalInfo from './pages/SignUp/PersonalInfo';
import Interview from './pages/SignUp/Interview';
import NcsIntro from './pages/SignUp/NcsIntro';
import Ncs from './pages/SignUp/Ncs';
import SignUpFinal from './pages/SignUp/SignUpFinal';
import DailyReport from 'pages/Report/DailyReport';
import Feeds from './pages/Feed/Feeds';
import Report from './pages/Report/Report';
import MainCalendar from 'pages/MainPage/MainCalendar';
import Email from 'pages/Email/Email';
import CreateEmail from 'pages/Email/CreateEmail';
import RecievedEmail from 'pages/Email/RecievedEmail';
import SentEmail from 'pages/Email/SentEmail';
import TrashEmail from 'pages/Email/TrashEmail';
import InterestEmail from 'pages/Email/InterestEmail';
import DetailEmail from 'pages/Email/DetailEmail';
import Calendar from 'pages/Calendar/prac';
import Chat from 'pages/Chat/Chat';
////////////////////////////////
////////////////////////////////mobile
import FirstPage from './pages/FirstPage';
import KakaoLogin from 'pages/Login/KakaoLogin';
import MobileCommute from 'pages/MobileCommute';
import MainTodo from 'pages/NewMainPage/MainTodo';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Global } from '@emotion/react';
import { globalStyle } from './themes/reset';
////////////////////////////////
import MainPage from './pages/NewMainPage/MainPage';
import PageNotFound from 'pages/PageNotFound';

export const RouterInfo = [
  { path: '/', element: <FirstPage />, withAuthorization: false },
  { path: '/intro', element: <Intro />, withAuthorization: false },
  {
    path: '/signup',
    element: <SignUp />,
    withAuthorization: false,
    children: [
      {
        path: 'personalinfo',
        element: <PersonalInfo />,
        withAuthorization: false,
      },
      { path: 'interview', element: <Interview />, withAuthorization: false },
      { path: 'ncsintro', element: <NcsIntro />, withAuthorization: false },
      { path: 'ncs', element: <Ncs />, withAuthorization: false },
      { path: 'final', element: <SignUpFinal />, withAuthorization: false },
    ],
  },
  { path: '/login', element: <LogIn />, withAuthorization: false },
  { path: '/kakaoLogin', element: <KakaoLogin />, withAuthorization: false },
  {
    path: '/main',
    element: <MainPage />,
    withAuthorization: true,
    children: [
      { path: '', element: <MainTodo />, withAuthorization: false },
      { path: 'feed', element: <Feeds />, withAuthorization: false },
      { path: 'report', element: <DailyReport />, withAuthorization: false },
      { path: 'calendar', element: <Calendar />, withAuthorization: false },
      { path: 'chat', element: <Chat />, withAuthorization: false },
    ],
  },
  {
    path: '/email',
    element: <Email />,
    withAuthorization: true,
    children: [
      { path: 'create', element: <CreateEmail />, withAuthorization: false },
      {
        path: 'received',
        element: <RecievedEmail />,
        withAuthorization: true,
      },
      { path: 'sent', element: <SentEmail />, withAuthorization: false },
      { path: 'trash', element: <TrashEmail />, withAuthorization: false },
      {
        path: 'interest',
        element: <InterestEmail />,
        withAuthorization: false,
      },
      {
        path: 'detail/:type/:id',
        element: <DetailEmail />,
        withAuthorization: false,
      },
    ],
  },
  { path: '/reporttest', element: <Report />, withAuthorization: true },
  { path: '/commute/checkIn', element: <MobileCommute />, withAuthorization: true },
  { path: '/prac', element: <Calendar />, withAuthorization: true },
  { path: '/todo', element: <MainTodo />, withAuthorization: true },
  { path: '*', element: <PageNotFound />, withAuthorization: false },
];
