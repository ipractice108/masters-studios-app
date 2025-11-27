-- Masters & Studios Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create instructors table
CREATE TABLE IF NOT EXISTS instructors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    disciplines TEXT[] NOT NULL,
    custom_discipline TEXT,
    stations TEXT[] NOT NULL,
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    price DECIMAL(10, 2) NOT NULL,
    group_training BOOLEAN DEFAULT false,
    individual_training BOOLEAN DEFAULT false,
    employment_status TEXT CHECK (employment_status IN ('selfEmployed', 'individual')),
    experience TEXT NOT NULL,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create studios table
CREATE TABLE IF NOT EXISTS studios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    stations TEXT[] NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    main_photo_url TEXT,
    additional_photos_urls TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_requests table
CREATE TABLE IF NOT EXISTS job_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
    discipline TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    station TEXT NOT NULL,
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    training_type TEXT CHECK (training_type IN ('group', 'individual')),
    payment DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'filled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    instructor_id UUID REFERENCES instructors(id) ON DELETE CASCADE,
    job_request_id UUID REFERENCES job_requests(id) ON DELETE CASCADE,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_instructors_disciplines ON instructors USING GIN (disciplines);
CREATE INDEX IF NOT EXISTS idx_instructors_stations ON instructors USING GIN (stations);
CREATE INDEX IF NOT EXISTS idx_job_requests_discipline ON job_requests(discipline);
CREATE INDEX IF NOT EXISTS idx_job_requests_station ON job_requests(station);
CREATE INDEX IF NOT EXISTS idx_job_requests_status ON job_requests(status);
CREATE INDEX IF NOT EXISTS idx_job_requests_date ON job_requests(date);
CREATE INDEX IF NOT EXISTS idx_applications_instructor_id ON applications(instructor_id);
CREATE INDEX IF NOT EXISTS idx_applications_job_request_id ON applications(job_request_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_instructors_updated_at
    BEFORE UPDATE ON instructors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_studios_updated_at
    BEFORE UPDATE ON studios
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_requests_updated_at
    BEFORE UPDATE ON job_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your authentication requirements)
-- For now, allow all operations for development
CREATE POLICY "Allow all operations on instructors" ON instructors FOR ALL USING (true);
CREATE POLICY "Allow all operations on studios" ON studios FOR ALL USING (true);
CREATE POLICY "Allow all operations on job_requests" ON job_requests FOR ALL USING (true);
CREATE POLICY "Allow all operations on applications" ON applications FOR ALL USING (true);

-- Note: In production, replace these permissive policies with more restrictive ones
-- based on authenticated users and their roles
