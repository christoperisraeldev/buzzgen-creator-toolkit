-- Create function to increment link clicks
CREATE OR REPLACE FUNCTION public.increment_clicks(link_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.links 
  SET clicks = clicks + 1 
  WHERE id = link_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;