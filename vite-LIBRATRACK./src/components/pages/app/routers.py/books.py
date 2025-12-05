from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.book import Book
from app.schemas.book import BookCreate, BookResponse

router = APIRouter(prefix="/books", tags=["Books"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=BookResponse)
def add_book(book: BookCreate, db: Session = Depends(get_db)):
    new_book = Book(**book.dict())
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book


@router.get("/", response_model=list[BookResponse])
def list_books(db: Session = Depends(get_db)):
    return db.query(Book).all()
