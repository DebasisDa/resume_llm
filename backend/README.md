

POST http://localhost:3000/auth/signup
Content-Type: application/json

{
  "email": "john@example.com",
  "username": "john",
  "password": "123456"
}

Reponse:
{
  "message": "Signup successful",
  "user": {
    "email": "john@example.com",
    "username": "john"
  }
}


POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}

Response:
{
    "message": "Login successful",
    "token": "<>",
    "user": {
        "email": "john@example.com",
        "username": "john"
    }
}

postman request 'http://localhost:3000/test-prompt?text=How%20are%20you%3F' \
  --header 'Authorization: Bearer <>' \
  --auth-bearer-token '<>'


  postman request POST 'http://localhost:3000/analyze' \
  --header 'Content-Type: multipart/form-data' \
  --header 'Authorization: Bearer <>' 'resume=@"/Users/debasisdas/Desktop/Skills/AI/Gen AI/student_project/resume_llm/files/resume.txt"' 'jd=@"/Users/debasisdas/Desktop/Skills/AI/Gen AI/student_project/resume_llm/files/jd.txt"' \
  --auth-bearer-token '<>'

