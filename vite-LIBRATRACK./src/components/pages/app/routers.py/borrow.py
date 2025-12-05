
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.borrow import BorrowRecord
from schemas.borrow import BorrowCreate, BorrowOut

router = APIRouter(prefix="/borrow", tags=["Borrow"])

@router.post("/", response_model=BorrowOut, status_code=status.HTTP_201_CREATED)
def borrow_book(payload: BorrowCreate, db: Session = Depends(get_db)):
   
    br = BorrowRecord(
        member_id=payload.member_id,
        book_id=payload.book_id,
        notes=payload.notes
    )
    db.add(br)
    db.commit()
    db.refresh(br)
    return br

@router.get("/", response_model=list[BorrowOut])
def list_borrows(db: Session = Depends(get_db)):
    return db.query(BorrowRecord).all()

@router.post("/{borrow_id}/return", response_model=BorrowOut)
def return_book(borrow_id: int, db: Session = Depends(get_db)):
    br = db.query(BorrowRecord).filter(BorrowRecord.id == borrow_id).first()
    if not br:
        raise HTTPException(status_code=404, detail="Borrow record not found")
    if br.returned:
        raise HTTPException(status_code=400, detail="Already returned")
    br.returned = True
    from datetime import datetime
    br.returned_at = datetime.utcnow()
    db.add(br)
    db.commit()
    db.refresh(br)
    return br
