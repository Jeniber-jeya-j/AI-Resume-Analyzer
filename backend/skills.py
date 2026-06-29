SKILLS_DB = [
    "python",
    "java",
    "javascript",
    "react",
    "react native",
    "flutter",
    "html",
    "css",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",
    "fastapi",
    "sql",
    "mongodb",
    "firebase",
    "nodejs",
    "docker",
    "aws",
    "git",
    "opencv",
    "nlp",
]


def extract_skills(resume_text):
    found_skills = []

    resume_text = resume_text.lower()

    for skill in SKILLS_DB:
        if skill.lower() in resume_text:
            found_skills.append(skill)
    return found_skills