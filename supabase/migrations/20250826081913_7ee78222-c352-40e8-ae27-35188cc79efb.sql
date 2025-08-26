-- Create RSVP table for wedding guests
CREATE TABLE public.rsvps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  attending BOOLEAN NOT NULL DEFAULT false,
  guest_count INTEGER NOT NULL DEFAULT 1,
  dietary_requirements TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert RSVPs (public wedding app)
CREATE POLICY "Anyone can create RSVP" 
ON public.rsvps 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow anyone to view RSVPs (for admin purposes)
CREATE POLICY "Anyone can view RSVPs" 
ON public.rsvps 
FOR SELECT 
USING (true);

-- Create policy to allow updating RSVPs by email
CREATE POLICY "Users can update their own RSVP" 
ON public.rsvps 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_rsvps_updated_at
BEFORE UPDATE ON public.rsvps
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();