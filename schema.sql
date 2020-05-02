--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

-- Started on 2020-05-02 11:53:55

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
-- TOC entry 203 (class 1259 OID 16462)
-- Name: categories; Type: TABLE; Schema: public; Owner: academy
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    code character varying(100) NOT NULL
);


ALTER TABLE public.categories OWNER TO academy;

--
-- TOC entry 202 (class 1259 OID 16455)
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
-- TOC entry 204 (class 1259 OID 16465)
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
-- TOC entry 205 (class 1259 OID 16472)
-- Name: offers_category; Type: TABLE; Schema: public; Owner: academy
--

CREATE TABLE public.offers_category (
    id bigint NOT NULL,
    offer_id bigint NOT NULL,
    category_id bigint NOT NULL
);


ALTER TABLE public.offers_category OWNER TO academy;

--
-- TOC entry 206 (class 1259 OID 16475)
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
-- TOC entry 2849 (class 0 OID 16462)
-- Dependencies: 203
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: academy
--



--
-- TOC entry 2848 (class 0 OID 16455)
-- Dependencies: 202
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: academy
--



--
-- TOC entry 2850 (class 0 OID 16465)
-- Dependencies: 204
-- Data for Name: offers; Type: TABLE DATA; Schema: public; Owner: academy
--



--
-- TOC entry 2851 (class 0 OID 16472)
-- Dependencies: 205
-- Data for Name: offers_category; Type: TABLE DATA; Schema: public; Owner: academy
--



--
-- TOC entry 2852 (class 0 OID 16475)
-- Dependencies: 206
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: academy
--



--
-- TOC entry 2709 (class 2606 OID 16491)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 2707 (class 2606 OID 16494)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 2714 (class 2606 OID 16506)
-- Name: offers_category offers_category_pkey; Type: CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.offers_category
    ADD CONSTRAINT offers_category_pkey PRIMARY KEY (id);


--
-- TOC entry 2711 (class 2606 OID 16484)
-- Name: offers offers_pkey; Type: CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (id);


--
-- TOC entry 2716 (class 2606 OID 16482)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2712 (class 1259 OID 16492)
-- Name: offers_title_index; Type: INDEX; Schema: public; Owner: academy
--

CREATE INDEX offers_title_index ON public.offers USING btree (title);


--
-- TOC entry 2717 (class 2606 OID 16495)
-- Name: comments comments_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2718 (class 2606 OID 16500)
-- Name: comments comments_offer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES public.offers(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2719 (class 2606 OID 16485)
-- Name: offers offers_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2721 (class 2606 OID 16512)
-- Name: offers_category offers_category_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.offers_category
    ADD CONSTRAINT offers_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2720 (class 2606 OID 16507)
-- Name: offers_category offers_category_offer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.offers_category
    ADD CONSTRAINT offers_category_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES public.offers(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


-- Completed on 2020-05-02 11:53:55

--
-- PostgreSQL database dump complete
--
