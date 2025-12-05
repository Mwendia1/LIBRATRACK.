from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import jwt

from database import Base, engine, get_db
from models.members import Member
from models.books import Book
from models.borrow import Borrow
from models.users import User 


SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

Base.metadata.create_all(bind=engine)


app = FastAPI()


origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@app.post("/register")
def register(username: str, password: str, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    user = User(username=username, hashed_password=get_password_hash(password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"username": user.username, "id": user.id}

@app.post("/login")
def login(username: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(
        {"sub": user.username}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/members")
def read_members(db: Session = Depends(get_db)):
    return db.query(Member).all()

@app.post("/members")
def create_member(name: str, email: str, db: Session = Depends(get_db)):
    existing = db.query(Member).filter(Member.email == email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")
    new_member = Member(name=name, email=email)
    db.add(new_member)
    db.commit()
    db.refresh(new_member)
    return new_member


@app.get("/books")
def read_books(db: Session = Depends(get_db)):
    return db.query(Book).all()

@app.post("/books")
def create_book(title: str, author: str, db: Session = Depends(get_db)):
    new_book = Book(title=title, author=author)
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book

@app.get("/borrows")
def read_borrows(db: Session = Depends(get_db)):
    return db.query(Borrow).all()

@app.post("/borrows")
def create_borrow(book_id: int, member_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    existing_borrow = db.query(Borrow).filter(Borrow.book_id == book_id).first()
    if existing_borrow:
        raise HTTPException(status_code=400, detail="Book already borrowed")
    borrow = Borrow(book_id=book_id, member_id=member_id, borrowed_at=datetime.utcnow())
    db.add(borrow)
    db.commit()
    db.refresh(borrow)
    return borrow
