-- TIGER TRAIL DATABASE SCHEMA
-- This file contains the relational SQL schema required to run Tiger Trail in a traditional PostgreSQL / Supabase environment.
-- Note: This is for migration out of Figma Make. Do NOT run this in the Make environment.

-- 1. USERS TABLE
-- Extends Supabase auth.users to store profile data
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role TEXT NOT NULL CHECK (role IN ('student', 'advisor', 'it')),
    display_name TEXT NOT NULL,
    emblem TEXT DEFAULT 'User',
    theme_color TEXT DEFAULT '#F76902',
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. QUESTS TABLE (Content Management)
-- Stores custom quests created by IT Admins
CREATE TABLE public.quests (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    track TEXT NOT NULL CHECK (track IN ('academic', 'career', 'out-of-classroom')),
    term TEXT NOT NULL CHECK (term IN ('fall', 'spring', 'summer')),
    year INTEGER NOT NULL CHECK (year BETWEEN 1 AND 5),
    required BOOLEAN DEFAULT false,
    xp INTEGER DEFAULT 100,
    is_branch BOOLEAN DEFAULT true,
    url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. GUIDES TABLE (Content Management)
-- Stores custom Field Guide entries created by IT Admins
CREATE TABLE public.guides (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL CHECK (category IN ('Survival', 'Navigation', 'Lore', 'MCET')),
    title TEXT NOT NULL,
    short_desc TEXT NOT NULL,
    content TEXT NOT NULL,
    icon TEXT DEFAULT 'Hexagon',
    url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. STUDENT PROGRESS TABLE
-- Stores arrays of completed IDs for each student
CREATE TABLE public.student_progress (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    completed_quests TEXT[] DEFAULT '{}',
    unlocked_achievements TEXT[] DEFAULT '{}',
    read_guides TEXT[] DEFAULT '{}',
    favorited_events INTEGER[] DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. PLACEMENTS TABLE (Map & Advisor Control)
-- Stores where a student has dragged a quest, or if an advisor has locked it.
CREATE TABLE public.quest_placements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    quest_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('bank', 'placed')),
    year INTEGER,
    term TEXT CHECK (term IN ('fall', 'spring', 'summer')),
    is_locked BOOLEAN DEFAULT false, -- True if an advisor placed/locked it
    UNIQUE(user_id, quest_id)
);

-- ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quest_placements ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all profiles (for Advisor view), but only edit their own.
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Quests & Guides: Everyone can read. Only IT Admin can write/edit.
-- (Assuming IT Admin validation is handled via edge function or a secure auth claim, 
--  but here is a basic implementation checking the profile role).
CREATE POLICY "Content is viewable by everyone" ON public.quests FOR SELECT USING (true);
CREATE POLICY "Only IT can insert quests" ON public.quests FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'it')
);
CREATE POLICY "Only IT can update quests" ON public.quests FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'it')
);
CREATE POLICY "Only IT can delete quests" ON public.quests FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'it')
);

CREATE POLICY "Content is viewable by everyone" ON public.guides FOR SELECT USING (true);
CREATE POLICY "Only IT can insert guides" ON public.guides FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'it')
);
CREATE POLICY "Only IT can update guides" ON public.guides FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'it')
);
CREATE POLICY "Only IT can delete guides" ON public.guides FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'it')
);

-- Student Progress: Students can read/update their own. Advisors can read.
CREATE POLICY "Students can view own progress" ON public.student_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Advisors can view all progress" ON public.student_progress FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'advisor')
);
CREATE POLICY "Students can update own progress" ON public.student_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Students can insert own progress" ON public.student_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Placements: Students can read/update their own (if not locked). Advisors can read/update all.
CREATE POLICY "Students can view own placements" ON public.quest_placements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Advisors can view all placements" ON public.quest_placements FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'advisor')
);
CREATE POLICY "Students can update own placements if not locked" ON public.quest_placements FOR UPDATE USING (
    auth.uid() = user_id AND is_locked = false
);
CREATE POLICY "Students can insert own placements" ON public.quest_placements FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Advisors can update all placements" ON public.quest_placements FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'advisor')
);
