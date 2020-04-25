PGDMP     #    /                x            buy_and_sell    12.2    12.2 :    L           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            M           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            N           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            O           1262    16629    buy_and_sell    DATABASE     j   CREATE DATABASE buy_and_sell WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';
    DROP DATABASE buy_and_sell;
                academy    false            �            1259    16651 
   categories    TABLE     �   CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    code character varying(100) NOT NULL
);
    DROP TABLE public.categories;
       public         heap    academy    false            �            1259    16649    categories_id_seq    SEQUENCE     z   CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public          academy    false    205            P           0    0    categories_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
          public          academy    false    204            �            1259    16680    comments    TABLE     �   CREATE TABLE public.comments (
    id bigint NOT NULL,
    author_id bigint NOT NULL,
    text text NOT NULL,
    date_create timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.comments;
       public         heap    academy    false            �            1259    16678    comments_author_id_seq    SEQUENCE        CREATE SEQUENCE public.comments_author_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.comments_author_id_seq;
       public          academy    false    211            Q           0    0    comments_author_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.comments_author_id_seq OWNED BY public.comments.author_id;
          public          academy    false    210            �            1259    16676    comments_id_seq    SEQUENCE     x   CREATE SEQUENCE public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.comments_id_seq;
       public          academy    false    211            R           0    0    comments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
          public          academy    false    209            �            1259    16661    offers    TABLE     A  CREATE TABLE public.offers (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    img character varying(255),
    price integer,
    type character varying(100) NOT NULL,
    description text,
    author_id bigint NOT NULL,
    date_create timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.offers;
       public         heap    academy    false            �            1259    16659    offers_author_id_seq    SEQUENCE     }   CREATE SEQUENCE public.offers_author_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.offers_author_id_seq;
       public          academy    false    208            S           0    0    offers_author_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.offers_author_id_seq OWNED BY public.offers.author_id;
          public          academy    false    207            �            1259    16701    offers_category    TABLE        CREATE TABLE public.offers_category (
    id bigint NOT NULL,
    offer_id bigint NOT NULL,
    category_id bigint NOT NULL
);
 #   DROP TABLE public.offers_category;
       public         heap    academy    false            �            1259    16699    offers_category_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.offers_category_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.offers_category_category_id_seq;
       public          academy    false    215            T           0    0    offers_category_category_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.offers_category_category_id_seq OWNED BY public.offers_category.category_id;
          public          academy    false    214            �            1259    16695    offers_category_id_seq    SEQUENCE        CREATE SEQUENCE public.offers_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.offers_category_id_seq;
       public          academy    false    215            U           0    0    offers_category_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.offers_category_id_seq OWNED BY public.offers_category.id;
          public          academy    false    212            �            1259    16697    offers_category_offer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.offers_category_offer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.offers_category_offer_id_seq;
       public          academy    false    215            V           0    0    offers_category_offer_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.offers_category_offer_id_seq OWNED BY public.offers_category.offer_id;
          public          academy    false    213            �            1259    16725    offers_comment    TABLE     }   CREATE TABLE public.offers_comment (
    id bigint NOT NULL,
    offer_id bigint NOT NULL,
    comment_id bigint NOT NULL
);
 "   DROP TABLE public.offers_comment;
       public         heap    academy    false            �            1259    16723    offers_comment_comment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.offers_comment_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.offers_comment_comment_id_seq;
       public          academy    false    219            W           0    0    offers_comment_comment_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.offers_comment_comment_id_seq OWNED BY public.offers_comment.comment_id;
          public          academy    false    218            �            1259    16719    offers_comment_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.offers_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.offers_comment_id_seq;
       public          academy    false    219            X           0    0    offers_comment_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.offers_comment_id_seq OWNED BY public.offers_comment.id;
          public          academy    false    216            �            1259    16721    offers_comment_offer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.offers_comment_offer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.offers_comment_offer_id_seq;
       public          academy    false    219            Y           0    0    offers_comment_offer_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.offers_comment_offer_id_seq OWNED BY public.offers_comment.offer_id;
          public          academy    false    217            �            1259    16657    offers_id_seq    SEQUENCE     v   CREATE SEQUENCE public.offers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.offers_id_seq;
       public          academy    false    208            Z           0    0    offers_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.offers_id_seq OWNED BY public.offers.id;
          public          academy    false    206            �            1259    16640    users    TABLE     �   CREATE TABLE public.users (
    id bigint NOT NULL,
    avatar character varying(255),
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);
    DROP TABLE public.users;
       public         heap    academy    false            �            1259    16638    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          academy    false    203            [           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          academy    false    202            �
           2604    16654    categories id    DEFAULT     n   ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
 <   ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
       public          academy    false    205    204    205            �
           2604    16683    comments id    DEFAULT     j   ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
 :   ALTER TABLE public.comments ALTER COLUMN id DROP DEFAULT;
       public          academy    false    211    209    211            �
           2604    16684    comments author_id    DEFAULT     x   ALTER TABLE ONLY public.comments ALTER COLUMN author_id SET DEFAULT nextval('public.comments_author_id_seq'::regclass);
 A   ALTER TABLE public.comments ALTER COLUMN author_id DROP DEFAULT;
       public          academy    false    210    211    211            �
           2604    16664 	   offers id    DEFAULT     f   ALTER TABLE ONLY public.offers ALTER COLUMN id SET DEFAULT nextval('public.offers_id_seq'::regclass);
 8   ALTER TABLE public.offers ALTER COLUMN id DROP DEFAULT;
       public          academy    false    208    206    208            �
           2604    16665    offers author_id    DEFAULT     t   ALTER TABLE ONLY public.offers ALTER COLUMN author_id SET DEFAULT nextval('public.offers_author_id_seq'::regclass);
 ?   ALTER TABLE public.offers ALTER COLUMN author_id DROP DEFAULT;
       public          academy    false    207    208    208            �
           2604    16704    offers_category id    DEFAULT     x   ALTER TABLE ONLY public.offers_category ALTER COLUMN id SET DEFAULT nextval('public.offers_category_id_seq'::regclass);
 A   ALTER TABLE public.offers_category ALTER COLUMN id DROP DEFAULT;
       public          academy    false    215    212    215            �
           2604    16705    offers_category offer_id    DEFAULT     �   ALTER TABLE ONLY public.offers_category ALTER COLUMN offer_id SET DEFAULT nextval('public.offers_category_offer_id_seq'::regclass);
 G   ALTER TABLE public.offers_category ALTER COLUMN offer_id DROP DEFAULT;
       public          academy    false    213    215    215            �
           2604    16706    offers_category category_id    DEFAULT     �   ALTER TABLE ONLY public.offers_category ALTER COLUMN category_id SET DEFAULT nextval('public.offers_category_category_id_seq'::regclass);
 J   ALTER TABLE public.offers_category ALTER COLUMN category_id DROP DEFAULT;
       public          academy    false    214    215    215            �
           2604    16728    offers_comment id    DEFAULT     v   ALTER TABLE ONLY public.offers_comment ALTER COLUMN id SET DEFAULT nextval('public.offers_comment_id_seq'::regclass);
 @   ALTER TABLE public.offers_comment ALTER COLUMN id DROP DEFAULT;
       public          academy    false    219    216    219            �
           2604    16729    offers_comment offer_id    DEFAULT     �   ALTER TABLE ONLY public.offers_comment ALTER COLUMN offer_id SET DEFAULT nextval('public.offers_comment_offer_id_seq'::regclass);
 F   ALTER TABLE public.offers_comment ALTER COLUMN offer_id DROP DEFAULT;
       public          academy    false    219    217    219            �
           2604    16730    offers_comment comment_id    DEFAULT     �   ALTER TABLE ONLY public.offers_comment ALTER COLUMN comment_id SET DEFAULT nextval('public.offers_comment_comment_id_seq'::regclass);
 H   ALTER TABLE public.offers_comment ALTER COLUMN comment_id DROP DEFAULT;
       public          academy    false    218    219    219            �
           2604    16643    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          academy    false    202    203    203            �
           2606    16656    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            academy    false    205            �
           2606    16689    comments comments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            academy    false    211            �
           2606    16708 $   offers_category offers_category_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.offers_category
    ADD CONSTRAINT offers_category_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.offers_category DROP CONSTRAINT offers_category_pkey;
       public            academy    false    215            �
           2606    16732 "   offers_comment offers_comment_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.offers_comment
    ADD CONSTRAINT offers_comment_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.offers_comment DROP CONSTRAINT offers_comment_pkey;
       public            academy    false    219            �
           2606    16670    offers offers_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.offers DROP CONSTRAINT offers_pkey;
       public            academy    false    208            �
           2606    16648    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            academy    false    203            �
           2606    16690     comments comments_author_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_author_id_fkey;
       public          academy    false    211    2747    203            �
           2606    16671    offers offers_author_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.offers DROP CONSTRAINT offers_author_id_fkey;
       public          academy    false    2747    203    208            �
           2606    16714 0   offers_category offers_category_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.offers_category
    ADD CONSTRAINT offers_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.offers_category DROP CONSTRAINT offers_category_category_id_fkey;
       public          academy    false    215    205    2749            �
           2606    16709 -   offers_category offers_category_offer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.offers_category
    ADD CONSTRAINT offers_category_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES public.offers(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.offers_category DROP CONSTRAINT offers_category_offer_id_fkey;
       public          academy    false    215    208    2751            �
           2606    16738 -   offers_comment offers_comment_comment_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.offers_comment
    ADD CONSTRAINT offers_comment_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.offers_comment DROP CONSTRAINT offers_comment_comment_id_fkey;
       public          academy    false    211    2753    219            �
           2606    16733 +   offers_comment offers_comment_offer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.offers_comment
    ADD CONSTRAINT offers_comment_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES public.offers(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.offers_comment DROP CONSTRAINT offers_comment_offer_id_fkey;
       public          academy    false    208    2751    219           