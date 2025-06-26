from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EnhanceRequest(BaseModel):
    section: str
    content: str

class ResumeData(BaseModel):
    resume: dict

stored_resume = {}

@app.post("/ai-enhance")
async def enhance_section(req: EnhanceRequest):
    enhanced = f"[Enhanced] {req.content}"
    return {"enhanced": enhanced}

@app.post("/save-resume")
async def save_resume(data: ResumeData):
    global stored_resume
    stored_resume = data.resume
    return {"status": "saved"}
