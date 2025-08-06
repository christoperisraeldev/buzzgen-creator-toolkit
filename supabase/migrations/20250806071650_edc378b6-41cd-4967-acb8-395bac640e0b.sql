-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type TEXT NOT NULL DEFAULT 'creator' CHECK (user_type IN ('creator', 'brand')),
  selected_niche TEXT DEFAULT 'Content Creator',
  display_name TEXT,
  bio TEXT,
  email TEXT,
  manager_email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create links table
CREATE TABLE public.links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scheduled_posts table
CREATE TABLE public.scheduled_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('Instagram', 'YouTube', 'TikTok')),
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics table for tracking
CREATE TABLE public.analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  link_id UUID REFERENCES public.links(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'link_click')),
  source TEXT,
  medium TEXT,
  campaign TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bio_settings table
CREATE TABLE public.bio_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  background_color TEXT DEFAULT '#ffffff',
  accent_color TEXT DEFAULT '#3b82f6',
  show_verified_badge BOOLEAN DEFAULT true,
  show_analytics BOOLEAN DEFAULT true,
  custom_domain TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create social_stats table for media kit
CREATE TABLE public.social_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('Instagram', 'YouTube', 'TikTok', 'Twitter', 'LinkedIn')),
  followers TEXT NOT NULL DEFAULT '0',
  engagement TEXT NOT NULL DEFAULT '0%',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, platform)
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  brand_name TEXT NOT NULL,
  testimonial_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  campaign_name TEXT,
  campaign_results TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bio_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for links
CREATE POLICY "Users can view their own links" ON public.links
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own links" ON public.links
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own links" ON public.links
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own links" ON public.links
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for scheduled_posts
CREATE POLICY "Users can view their own posts" ON public.scheduled_posts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own posts" ON public.scheduled_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" ON public.scheduled_posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" ON public.scheduled_posts
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for analytics
CREATE POLICY "Users can view their own analytics" ON public.analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create analytics events" ON public.analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

-- Create RLS policies for bio_settings
CREATE POLICY "Users can view their own bio settings" ON public.bio_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bio settings" ON public.bio_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bio settings" ON public.bio_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for social_stats
CREATE POLICY "Users can view their own social stats" ON public.social_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own social stats" ON public.social_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own social stats" ON public.social_stats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own social stats" ON public.social_stats
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for testimonials
CREATE POLICY "Users can view their own testimonials" ON public.testimonials
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own testimonials" ON public.testimonials
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own testimonials" ON public.testimonials
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own testimonials" ON public.testimonials
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_links_updated_at
  BEFORE UPDATE ON public.links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_scheduled_posts_updated_at
  BEFORE UPDATE ON public.scheduled_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bio_settings_updated_at
  BEFORE UPDATE ON public.bio_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_social_stats_updated_at
  BEFORE UPDATE ON public.social_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email),
    NEW.email
  );
  
  -- Create default bio settings
  INSERT INTO public.bio_settings (user_id, title, description)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', 'Your Name'),
    'Welcome to my bio link page! ✨'
  );
  
  RETURN NEW;
END;
$$;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_links_user_id ON public.links(user_id);
CREATE INDEX idx_links_position ON public.links(user_id, position);
CREATE INDEX idx_scheduled_posts_user_id ON public.scheduled_posts(user_id);
CREATE INDEX idx_scheduled_posts_date ON public.scheduled_posts(user_id, scheduled_date);
CREATE INDEX idx_analytics_user_id ON public.analytics(user_id);
CREATE INDEX idx_analytics_link_id ON public.analytics(link_id);
CREATE INDEX idx_analytics_created_at ON public.analytics(created_at);

-- Enable realtime for all tables
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.links REPLICA IDENTITY FULL;
ALTER TABLE public.scheduled_posts REPLICA IDENTITY FULL;
ALTER TABLE public.analytics REPLICA IDENTITY FULL;
ALTER TABLE public.bio_settings REPLICA IDENTITY FULL;
ALTER TABLE public.social_stats REPLICA IDENTITY FULL;
ALTER TABLE public.testimonials REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.links;
ALTER PUBLICATION supabase_realtime ADD TABLE public.scheduled_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.analytics;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bio_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.social_stats;
ALTER PUBLICATION supabase_realtime ADD TABLE public.testimonials;