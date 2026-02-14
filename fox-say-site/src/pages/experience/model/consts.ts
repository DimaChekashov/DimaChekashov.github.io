import react from "@/shared/assets/images/technologies/react.svg";
import nextjs from "@/shared/assets/images/technologies/nextjs.svg";
import html5 from "@/shared/assets/images/technologies/html5.svg";
import css3 from "@/shared/assets/images/technologies/css3.svg";
import figma from "@/shared/assets/images/technologies/figma.svg";
import typescript from "@/shared/assets/images/technologies/typescript.svg";
import javascript from "@/shared/assets/images/technologies/javascript.svg";
import tailwindcss from "@/shared/assets/images/technologies/tailwindcss.svg";
import zustand from "@/shared/assets/images/technologies/zustand.svg";

import python from "@/shared/assets/images/technologies/python.svg";
import django from "@/shared/assets/images/technologies/django.svg";
import fastapi from "@/shared/assets/images/technologies/fastapi.svg";
import docker from "@/shared/assets/images/technologies/docker.svg";
import express from "@/shared/assets/images/technologies/express.svg";
import mongodb from "@/shared/assets/images/technologies/mongodb.svg";
import postgresql from "@/shared/assets/images/technologies/postgresql.svg";
import nodejs from "@/shared/assets/images/technologies/nodejs.svg";
import redis from "@/shared/assets/images/technologies/redis.svg";

import type { Education, TechDirection, Work } from "./types";

export const techDirections: TechDirection[] = [
  {
    id: "frontend",
    title: "Frontend",
    techs: [
      {
        id: "react",
        title: "React",
        icon: react,
      },
      {
        id: "nextjs",
        title: "Next.js",
        icon: nextjs,
      },
      {
        id: "html5",
        title: "HTML5",
        icon: html5,
      },
      {
        id: "css3",
        title: "CSS3",
        icon: css3,
      },
      {
        id: "javascript",
        title: "JavaScript",
        icon: javascript,
      },
      {
        id: "tailwindcss",
        title: "Tailwind CSS",
        icon: tailwindcss,
      },
      {
        id: "zustand",
        title: "Zustand",
        icon: zustand,
      },
      {
        id: "typescript",
        title: "TypeScript",
        icon: typescript,
      },
      {
        id: "figma",
        title: "Figma",
        icon: figma,
      },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    techs: [
      {
        id: "python",
        title: "Python",
        icon: python,
      },
      {
        id: "django",
        title: "Django",
        icon: django,
      },
      {
        id: "fastapi",
        title: "FastAPI",
        icon: fastapi,
      },
      {
        id: "nodejs",
        title: "Node.js",
        icon: nodejs,
      },
      {
        id: "express",
        title: "Express.js",
        icon: express,
      },
      {
        id: "docker",
        title: "Docker",
        icon: docker,
      },
      {
        id: "postgresql",
        title: "PostgreSQL",
        icon: postgresql,
      },
      {
        id: "redis",
        title: "Redis",
        icon: redis,
      },
      {
        id: "mongodb",
        title: "MongoDB",
        icon: mongodb,
      },
    ],
  },
];

export const education: Education[] = [
  {
    id: "university",
    place: "Инженерно-экономический колледж КФУ",
    period: "Сентябрь 2015 — Июню 2019",
    details: "Программирование в компьютерных системах, Техник-программист",
  },
  {
    id: "courses",
    place: "JavaScript.ru",
    period: "16.09.2025 — 07.10.2025",
    details: "Курс по разработке на Next.js",
  },
];

export const works: Work[] = [
  {
    id: "unknown",
    company: "Скрытая компания",
    place: "Москва, Россия",
    period: "Мерта 2025 - Настоящее время",
    role: "Инженер-программист",
    responsibilities: [],
  },
  {
    id: "rebrain",
    company: "ООО «Ребреин»",
    place: "Москва, Россия",
    period: "Июнь 2021 - Ноябрь 2024",
    role: "Фуллстек-разработчик",
    responsibilities: [
      "Проектировал и разрабатывал бэкенд на Django и Django REST Framework",
      "Создавал и оптимизировал модели данных, писал сложные запросы к базе данных",
      "Интегрировал платежные системы и обрабатывал вебхуки",
      "Разрабатывал REST API для взаимодействия с фронтендом",
      "Настраивал админ-панель Django для управления контентом",
      "Создавал REST API для клиентской части",
      "Разрабатывал обучщающую платформу для devops-инженеров на React и Next.js",
    ],
  },
  {
    id: "community-phone",
    company: "Community Phone",
    place: "Удаленно, Бостон, США",
    period: "Март 2022 - Август 2022",
    role: "Фронтенд-разработчик",
    responsibilities: [
      "Разабатаывал сервис управления телефонными системами на React и Next.js",
      "Разрабатывал адаптивные интерфейсы и веб-компоненты",
    ],
  },
  {
    id: "it-chelny",
    company: "ООО «Айти Челны»",
    place: "Набережные Челны, Россия",
    period: "Март 2017 - Ноябрь 2019 | Январь 2021 - Июнь 2021",
    role: "Фронтенд-разработчик",
    responsibilities: [
      "Занимался разработкой и поддержкой веб-приложений на React",
      "Разрабатывал Интернет-магазины, Порталы, новостные сайты и корпоративные сайты",
      "Добавлял адаптивность для сущестующих проектов",
      "Оптимизировал и ускорялял сайты по результатам аудита PageSpeed Insights",
      "Участвовал в планировании и оценке задач, а также в код-ревью",
      "Разрабатывал JavaScript-виджеты",
    ],
  },
];
