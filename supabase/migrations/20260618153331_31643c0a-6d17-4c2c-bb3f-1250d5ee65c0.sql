
-- Harden user_roles: explicit per-command policies preventing self-escalation
DROP POLICY IF EXISTS "User roles: admin manage" ON public.user_roles;

CREATE POLICY "User roles: admin insert"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "User roles: admin update"
  ON public.user_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "User roles: admin delete"
  ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "User roles: admin select all"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Harden subscriptions: explicitly deny client-side writes (service role bypasses RLS)
CREATE POLICY "Subscriptions: deny client insert"
  ON public.subscriptions FOR INSERT TO authenticated
  WITH CHECK (false);

CREATE POLICY "Subscriptions: deny client update"
  ON public.subscriptions FOR UPDATE TO authenticated
  USING (false) WITH CHECK (false);

CREATE POLICY "Subscriptions: deny client delete"
  ON public.subscriptions FOR DELETE TO authenticated
  USING (false);
