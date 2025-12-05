# schemas/borrow.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class BorrowCreate(BaseModel):
    member_id: int
    book_id: int
    notes: Optional[str] = None

class BorrowOut(BaseModel):
    id: int
    member_id: int
    book_id: int
    borrowed_at: datetime
    returned_at: Optional[datetime]
    returned: bool
    notes: Optional[str]

    class Config:
        orm_mode = True
