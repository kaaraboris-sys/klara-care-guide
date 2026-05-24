
-- =========== ENUMS ===========
CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TYPE public.app_plan AS ENUM ('free', 'pro');
CREATE TYPE public.app_language AS ENUM ('en', 'de');
CREATE TYPE public.recipient_profile AS ENUM ('autism', 'elderly');

-- =========== PROFILES ===========
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  language public.app_language NOT NULL DEFAULT 'en',
  plan public.app_plan NOT NULL DEFAULT 'free',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles: own select" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Profiles: own update" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Profiles: own insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- =========== USER ROLES ===========
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "User roles: self select" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User roles: admin manage" ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========== AUTO-CREATE PROFILE ON SIGNUP ===========
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========== updated_at trigger ===========
CREATE OR REPLACE FUNCTION public.tg_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
CREATE TRIGGER profiles_set_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- =========== CARE RECIPIENTS ===========
CREATE TABLE public.care_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dob DATE,
  profile_type public.recipient_profile NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.care_recipients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Recipients: owner all" ON public.care_recipients FOR ALL
  USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE TRIGGER recipients_set_updated_at BEFORE UPDATE ON public.care_recipients
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- =========== ASSESSMENT RESPONSES ===========
CREATE TABLE public.assessment_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES public.care_recipients(id) ON DELETE CASCADE,
  module SMALLINT NOT NULL,
  criterion_code TEXT NOT NULL,
  value JSONB,
  notes TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (recipient_id, criterion_code)
);
ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Assessments: owner all" ON public.assessment_responses FOR ALL
  USING (EXISTS (SELECT 1 FROM public.care_recipients r WHERE r.id = recipient_id AND r.owner_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.care_recipients r WHERE r.id = recipient_id AND r.owner_id = auth.uid()));
CREATE TRIGGER assessments_set_updated_at BEFORE UPDATE ON public.assessment_responses
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- =========== DIARY ENTRIES ===========
CREATE TABLE public.diary_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES public.care_recipients(id) ON DELETE CASCADE,
  entry_date DATE NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (recipient_id, entry_date)
);
ALTER TABLE public.diary_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Diary: owner all" ON public.diary_entries FOR ALL
  USING (EXISTS (SELECT 1 FROM public.care_recipients r WHERE r.id = recipient_id AND r.owner_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.care_recipients r WHERE r.id = recipient_id AND r.owner_id = auth.uid()));
CREATE TRIGGER diary_set_updated_at BEFORE UPDATE ON public.diary_entries
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- =========== FORUM ===========
CREATE TABLE public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts: auth read" ON public.forum_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Posts: auth insert" ON public.forum_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Posts: author update" ON public.forum_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Posts: author delete" ON public.forum_posts FOR DELETE USING (auth.uid() = author_id);
CREATE TRIGGER posts_set_updated_at BEFORE UPDATE ON public.forum_posts
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE public.forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Replies: auth read" ON public.forum_replies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Replies: auth insert" ON public.forum_replies FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Replies: author update" ON public.forum_replies FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Replies: author delete" ON public.forum_replies FOR DELETE USING (auth.uid() = author_id);
CREATE TRIGGER replies_set_updated_at BEFORE UPDATE ON public.forum_replies
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- =========== REFERRALS DIRECTORY (public read) ===========
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  bundesland TEXT,
  plz TEXT,
  contact TEXT,
  website TEXT,
  languages TEXT[],
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Referrals: public read" ON public.referrals FOR SELECT USING (true);
CREATE POLICY "Referrals: admin write" ON public.referrals FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========== SUBSCRIPTIONS ===========
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT NOT NULL DEFAULT 'inactive',
  current_period_end TIMESTAMPTZ,
  plan public.app_plan NOT NULL DEFAULT 'free',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Subscriptions: self read" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE TRIGGER subs_set_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- =========== REPORTS ===========
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES public.care_recipients(id) ON DELETE CASCADE,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  summary JSONB NOT NULL DEFAULT '{}'::jsonb,
  pdf_url TEXT
);
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reports: owner all" ON public.reports FOR ALL
  USING (EXISTS (SELECT 1 FROM public.care_recipients r WHERE r.id = recipient_id AND r.owner_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.care_recipients r WHERE r.id = recipient_id AND r.owner_id = auth.uid()));
