
from fastapi import FastAPI
from database import Base, engine


from routes.members import router as members_router
from routes.borrow import router as borrow_router
from routes.auth import router as auth_router


Base.metadata.create_all(bind=engine)

app = FastAPI(title="LibraTrack")

app.include_router(auth_router)
app.include_router(members_router)
app.include_router(borrow_router)


@app.get("/")
def root():
    return {"message": "LibraTrack API running"}
