const API_URL = 'https://ton-backend-url/api'; // à remplacer par ton backend Replit ou serveur

// LOGIN
const loginForm = document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`${API_URL}/auth/login`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({email,password})
    });
    const data = await res.json();
    document.getElementById('loginMessage').innerText = data.message;
    if(data.token) localStorage.setItem('token', data.token);
  });
}

// REGISTER
const registerForm = document.getElementById('registerForm');
if(registerForm){
  registerForm.addEventListener('submit', async e => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`${API_URL}/auth/register`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({username,email,password})
    });
    const data = await res.json();
    document.getElementById('registerMessage').innerText = data.message;
  });
}

// CREATE ARTICLE
const articleForm = document.getElementById('articleForm');
if(articleForm){
  articleForm.addEventListener('submit', async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const title = document.getElementById('articleTitle').value;
    const content = document.getElementById('articleContent').value;

    const res = await fetch(`${API_URL}/articles`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token
      },
      body: JSON.stringify({title,content})
    });
    const data = await res.json();
    alert(data.message);
  });
}