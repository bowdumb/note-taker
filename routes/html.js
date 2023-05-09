// Sets the default page
app.get('/', function (req, res) {
    res.sendFile(path.join(_dirname, '../public/index.html'))
  });
  
  app.get('/notes', function (req,res) {
    res.sendFile(path.join(_dirname, '../public/notes.html'));
  });
  