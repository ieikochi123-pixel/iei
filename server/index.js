app.get('/api/members', async (req, res) => {
    const { data, error } = await supabase.from('iei_members').select('*');
    if (error) return res.status(500).json(error);
    res.json(data);
});