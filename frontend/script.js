async function summarizeGithub() {
    const githubUrl = document.getElementById('githubInput').value;
    const outputDiv = document.getElementById('repoOutput');
    outputDiv.innerHTML = 'Loading... 🔄';


    // ✨ Show loading spinner immediately
    outputDiv.innerHTML = `
      <div class="flex justify-center items-center h-48">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    `;
  
  
    try {
      const response = await fetch('/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ githubUrl })
      });
  
      const data = await response.json();
      console.log(data);
  
      let filesHtml = '';
      if (data.files && Array.isArray(data.files)) {
        filesHtml = data.files.map(file => `
          <div class="border rounded p-3 my-2">
            <a href="${file.url}" target="_blank" class="text-blue-500 underline font-semibold">${file.filename}</a>
            <p class="text-sm mt-1">${file.description}</p>
          </div>
        `).join('');
      }
  
      outputDiv.innerHTML = `
        <div class="mb-4">
          <strong>👤 Author:</strong> <a href="${data.author.url}" target="_blank" class="text-blue-500 underline">${data.author.name}</a>
        </div>
        <div class="mb-4"><strong>📅 Created:</strong> ${data.date}</div>
        <div class="mb-4"><strong>📂 Type:</strong> ${data.type}</div>
        <div class="mb-4"><strong>📝 Summary:</strong> ${data.summary}</div>
        <div class="mb-4"><strong>🛠️ Languages:</strong> ${data.languages}</div>
        <div class="mb-6">
          <strong>📄 Important Files:</strong>
          ${filesHtml}
        </div>
        <div class="mb-4"><strong>🧩 Flow of Code:</strong> <p class="mt-2">${data.flow}</p></div>
      `;
    } catch (error) {
      outputDiv.innerHTML = 'Error fetching repo details ❌';
      console.error(error);
    }
  }
  
  function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
      body.classList.add('light');
      body.classList.replace('bg-gray-900', 'bg-gradient-to-b');
      body.classList.replace('text-white', 'text-black');
    } else {
      body.classList.remove('light');
      body.classList.add('dark');
      body.classList.replace('bg-gradient-to-b', 'bg-gray-900');
      body.classList.replace('text-black', 'text-white');
    }
  }
  