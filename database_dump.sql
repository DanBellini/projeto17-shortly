--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1 (Ubuntu 15.1-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "userId" integer,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (3, 'bafc0f85-1efd-4588-a92a-8f1a8992b772', 1, '2022-12-23 04:40:03.628631');
INSERT INTO public.sessions VALUES (4, 'f3851127-ee97-430f-8e78-7426be49582b', 1, '2022-12-23 04:51:14.024167');
INSERT INTO public.sessions VALUES (5, '352390bd-efcd-4d00-a17e-d61ea845a904', 3, '2022-12-23 06:08:00.197134');
INSERT INTO public.sessions VALUES (6, 'ffde4e90-1dd9-4fc5-bd33-5e90d8d17a54', 4, '2022-12-23 08:50:08.260996');
INSERT INTO public.sessions VALUES (7, 'a8f5cfc2-1f98-46ee-933a-1c29c6e06c8b', 5, '2022-12-23 10:30:05.06607');
INSERT INTO public.sessions VALUES (8, '2d1bf6a3-26e5-4c8d-bcb5-874b20b7658c', 1, '2022-12-23 11:26:39.459898');
INSERT INTO public.sessions VALUES (9, 'b00076f3-15f3-46c0-b2a9-d4dbf87926cf', 6, '2022-12-23 12:03:16.924634');
INSERT INTO public.sessions VALUES (10, '82ee0db0-b3e8-44a5-ba4c-e792ded41168', 7, '2022-12-23 12:41:11.868434');
INSERT INTO public.sessions VALUES (11, '4a98c4bb-ddf1-4836-b9fa-78b87758427a', 7, '2022-12-23 12:49:36.098743');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 'https://www.youtube.com', 'CLZw5UY7', 0, 1, '2022-12-23 06:50:46.305666');
INSERT INTO public.urls VALUES (3, 'https://https://www.youtube.com', 'cWvY0uVT', 0, 1, '2022-12-23 06:52:10.620359');
INSERT INTO public.urls VALUES (2, 'https://www.youtube.com', 'u2hteW7r', 4, 1, '2022-12-23 06:51:15.581458');
INSERT INTO public.urls VALUES (6, 'http://www.google.com.br', 'XSuXtS5i', 0, 6, '2022-12-23 12:06:31.123528');
INSERT INTO public.urls VALUES (7, 'http://www.google.com.br', 'IR6LEelP', 0, 6, '2022-12-23 12:07:51.098594');
INSERT INTO public.urls VALUES (8, 'https://algumsite.porai.com', 'Osunv0zn', 3, 7, '2022-12-23 12:51:50.175363');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'DANI', 'dan@eu.com', '$2b$10$EtXoUTPyQbiZxYDh3Yne0.tzjIrl/G.gjOXC0j2t0Dj9xhoReZhAK', '2022-12-23 04:29:55.587726');
INSERT INTO public.users VALUES (2, 'DANI', 'dan@euzim.com', '$2b$10$O5PTzhBKlViPDHxIAVnR.eqMvMhvgyeikMJY8Qs1pQDaKf3kFvUcG', '2022-12-23 04:30:30.932299');
INSERT INTO public.users VALUES (3, 'João', 'joao@driven.com.br', '$2b$10$8zgautB8iasi7VpYAhUV3ucTjmjQ9q/lX8zIzjZoX0v7mMSSInXTq', '2022-12-23 06:07:41.758559');
INSERT INTO public.users VALUES (4, 'testeDelete', 'teste@delete.com', '$2b$10$qLVPq17rSs7d69lDRhrt7.XmqgRXARFybAlQbvnAQGbQ00VNzJF2m', '2022-12-23 08:49:48.847893');
INSERT INTO public.users VALUES (5, 'testeRefatoração', 'teste@refatoração.com', '$2b$10$AWd399pUrUfYh27Ecalg7urMdWMo010hON.aD2FIKmgEXHndG8PY2', '2022-12-23 10:29:47.268842');
INSERT INTO public.users VALUES (6, 'teste3', 'teste@3.com', '$2b$10$n17jHoGZN0xzCS11OWu9deVb0u07o/6hUBbXwxunl.axi.CZYzleC', '2022-12-23 12:02:56.291615');
INSERT INTO public.users VALUES (7, 'seraqueacabei', 'tomara@quesim.com', '$2b$10$pCSVcwWpvQRuDM2Yk7mhg.IHsfu7MdZiI2acEK5ihAIWNd96iK4g.', '2022-12-23 12:39:59.237583');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 11, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

