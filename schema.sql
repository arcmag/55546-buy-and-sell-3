--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

-- Started on 2020-04-27 18:23:57

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 16651)
-- Name: categories; Type: TABLE; Schema: public; Owner: academy
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    code character varying(100) NOT NULL
);


ALTER TABLE public.categories OWNER TO academy;

--
-- TOC entry 204 (class 1259 OID 16649)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO academy;

--
-- TOC entry 2898 (class 0 OID 0)
-- Dependencies: 204
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 211 (class 1259 OID 16680)
-- Name: comments; Type: TABLE; Schema: public; Owner: academy
--

CREATE TABLE public.comments (
    id bigint NOT NULL,
    author_id bigint NOT NULL,
    text text NOT NULL,
    date_create timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    offer_id bigint NOT NULL
);


ALTER TABLE public.comments OWNER TO academy;

--
-- TOC entry 210 (class 1259 OID 16678)
-- Name: comments_author_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.comments_author_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_author_id_seq OWNER TO academy;

--
-- TOC entry 2899 (class 0 OID 0)
-- Dependencies: 210
-- Name: comments_author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.comments_author_id_seq OWNED BY public.comments.author_id;


--
-- TOC entry 209 (class 1259 OID 16676)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO academy;

--
-- TOC entry 2900 (class 0 OID 0)
-- Dependencies: 209
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 216 (class 1259 OID 16886)
-- Name: comments_offer_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.comments_offer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_offer_id_seq OWNER TO academy;

--
-- TOC entry 2901 (class 0 OID 0)
-- Dependencies: 216
-- Name: comments_offer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.comments_offer_id_seq OWNED BY public.comments.offer_id;


--
-- TOC entry 208 (class 1259 OID 16661)
-- Name: offers; Type: TABLE; Schema: public; Owner: academy
--

CREATE TABLE public.offers (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    img character varying(255),
    price integer,
    type character varying(100) NOT NULL,
    description text,
    author_id bigint NOT NULL,
    date_create timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.offers OWNER TO academy;

--
-- TOC entry 207 (class 1259 OID 16659)
-- Name: offers_author_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.offers_author_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.offers_author_id_seq OWNER TO academy;

--
-- TOC entry 2902 (class 0 OID 0)
-- Dependencies: 207
-- Name: offers_author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.offers_author_id_seq OWNED BY public.offers.author_id;


--
-- TOC entry 215 (class 1259 OID 16701)
-- Name: offers_category; Type: TABLE; Schema: public; Owner: academy
--

CREATE TABLE public.offers_category (
    id bigint NOT NULL,
    offer_id bigint NOT NULL,
    category_id bigint NOT NULL
);


ALTER TABLE public.offers_category OWNER TO academy;

--
-- TOC entry 214 (class 1259 OID 16699)
-- Name: offers_category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.offers_category_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.offers_category_category_id_seq OWNER TO academy;

--
-- TOC entry 2903 (class 0 OID 0)
-- Dependencies: 214
-- Name: offers_category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.offers_category_category_id_seq OWNED BY public.offers_category.category_id;


--
-- TOC entry 212 (class 1259 OID 16695)
-- Name: offers_category_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.offers_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.offers_category_id_seq OWNER TO academy;

--
-- TOC entry 2904 (class 0 OID 0)
-- Dependencies: 212
-- Name: offers_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.offers_category_id_seq OWNED BY public.offers_category.id;


--
-- TOC entry 213 (class 1259 OID 16697)
-- Name: offers_category_offer_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.offers_category_offer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.offers_category_offer_id_seq OWNER TO academy;

--
-- TOC entry 2905 (class 0 OID 0)
-- Dependencies: 213
-- Name: offers_category_offer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.offers_category_offer_id_seq OWNED BY public.offers_category.offer_id;


--
-- TOC entry 206 (class 1259 OID 16657)
-- Name: offers_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.offers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.offers_id_seq OWNER TO academy;

--
-- TOC entry 2906 (class 0 OID 0)
-- Dependencies: 206
-- Name: offers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.offers_id_seq OWNED BY public.offers.id;


--
-- TOC entry 203 (class 1259 OID 16640)
-- Name: users; Type: TABLE; Schema: public; Owner: academy
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    avatar character varying(255),
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO academy;

--
-- TOC entry 202 (class 1259 OID 16638)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO academy;

--
-- TOC entry 2907 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2725 (class 2604 OID 16654)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 2729 (class 2604 OID 16683)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 2730 (class 2604 OID 16684)
-- Name: comments author_id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.comments ALTER COLUMN author_id SET DEFAULT nextval('public.comments_author_id_seq'::regclass);


--
-- TOC entry 2732 (class 2604 OID 16888)
-- Name: comments offer_id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.comments ALTER COLUMN offer_id SET DEFAULT nextval('public.comments_offer_id_seq'::regclass);


--
-- TOC entry 2726 (class 2604 OID 16664)
-- Name: offers id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.offers ALTER COLUMN id SET DEFAULT nextval('public.offers_id_seq'::regclass);


--
-- TOC entry 2727 (class 2604 OID 16665)
-- Name: offers author_id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.offers ALTER COLUMN author_id SET DEFAULT nextval('public.offers_author_id_seq'::regclass);


--
-- TOC entry 2733 (class 2604 OID 16704)
-- Name: offers_category id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.offers_category ALTER COLUMN id SET DEFAULT nextval('public.offers_category_id_seq'::regclass);


--
-- TOC entry 2734 (class 2604 OID 16705)
-- Name: offers_category offer_id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.offers_category ALTER COLUMN offer_id SET DEFAULT nextval('public.offers_category_offer_id_seq'::regclass);


--
-- TOC entry 2735 (class 2604 OID 16706)
-- Name: offers_category category_id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.offers_category ALTER COLUMN category_id SET DEFAULT nextval('public.offers_category_category_id_seq'::regclass);


--
-- TOC entry 2724 (class 2604 OID 16643)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2881 (class 0 OID 16651)
-- Dependencies: 205
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: academy
--

COPY public.categories (id, name, code) FROM stdin;
\.


--
-- TOC entry 2887 (class 0 OID 16680)
-- Dependencies: 211
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: academy
--

COPY public.comments (id, author_id, text, date_create, offer_id) FROM stdin;
\.


--
-- TOC entry 2884 (class 0 OID 16661)
-- Dependencies: 208
-- Data for Name: offers; Type: TABLE DATA; Schema: public; Owner: academy
--

COPY public.offers (id, title, img, price, type, description, author_id, date_create) FROM stdin;
\.


--
-- TOC entry 2891 (class 0 OID 16701)
-- Dependencies: 215
-- Data for Name: offers_category; Type: TABLE DATA; Schema: public; Owner: academy
--

COPY public.offers_category (id, offer_id, category_id) FROM stdin;
\.


--
-- TOC entry 2879 (class 0 OID 16640)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: academy
--

COPY public.users (id, avatar, name, email, password) FROM stdin;
\.


--
-- TOC entry 2908 (class 0 OID 0)
-- Dependencies: 204
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: academy
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- TOC entry 2909 (class 0 OID 0)
-- Dependencies: 210
-- Name: comments_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: academy
--

SELECT pg_catalog.setval('public.comments_author_id_seq', 1, false);


--
-- TOC entry 2910 (class 0 OID 0)
-- Dependencies: 209
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: academy
--

SELECT pg_catalog.setval('public.comments_id_seq', 4, true);


--
-- TOC entry 2911 (class 0 OID 0)
-- Dependencies: 216
-- Name: comments_offer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: academy
--

SELECT pg_catalog.setval('public.comments_offer_id_seq', 1, false);


--
-- TOC entry 2912 (class 0 OID 0)
-- Dependencies: 207
-- Name: offers_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: academy
--

SELECT pg_catalog.setval('public.offers_author_id_seq', 1, false);


--
-- TOC entry 2913 (class 0 OID 0)
-- Dependencies: 214
-- Name: offers_category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: academy
--

SELECT pg_catalog.setval('public.offers_category_category_id_seq', 1, false);


--
-- TOC entry 2914 (class 0 OID 0)
-- Dependencies: 212
-- Name: offers_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: academy
--

SELECT pg_catalog.setval('public.offers_category_id_seq', 1, false);


--
-- TOC entry 2915 (class 0 OID 0)
-- Dependencies: 213
-- Name: offers_category_offer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: academy
--

SELECT pg_catalog.setval('public.offers_category_offer_id_seq', 1, false);


--
-- TOC entry 2916 (class 0 OID 0)
-- Dependencies: 206
-- Name: offers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: academy
--

SELECT pg_catalog.setval('public.offers_id_seq', 1, true);


--
-- TOC entry 2917 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: academy
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 2739 (class 2606 OID 16656)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 2744 (class 2606 OID 16689)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 2746 (class 2606 OID 16708)
-- Name: offers_category offers_category_pkey; Type: CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.offers_category
    ADD CONSTRAINT offers_category_pkey PRIMARY KEY (id);


--
-- TOC entry 2742 (class 2606 OID 16670)
-- Name: offers offers_pkey; Type: CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (id);


--
-- TOC entry 2737 (class 2606 OID 16648)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2740 (class 1259 OID 16885)
-- Name: index_title_offer; Type: INDEX; Schema: public; Owner: academy
--

CREATE INDEX index_title_offer ON public.offers USING btree (title);


--
-- TOC entry 2748 (class 2606 OID 16690)
-- Name: comments comments_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2749 (class 2606 OID 16896)
-- Name: comments comments_offer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES public.offers(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2747 (class 2606 OID 16671)
-- Name: offers offers_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2751 (class 2606 OID 16714)
-- Name: offers_category offers_category_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.offers_category
    ADD CONSTRAINT offers_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2750 (class 2606 OID 16709)
-- Name: offers_category offers_category_offer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.offers_category
    ADD CONSTRAINT offers_category_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES public.offers(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2020-04-27 18:23:57

--
-- PostgreSQL database dump complete
--

