
from sqlalchemy import Column, Integer, DateTime, Boolean, String, ForeignKey
from sqlalchemy.sql import func
from database import Base

class BorrowRecord(Base):
    __tablename__ = "borrow_records"

    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, nullable=False)   
    # ideally ForeignKey("members.id")
    book_id = Column(Integer, nullable=False)     
    
    borrowed_at = Column(DateTime(timezone=True), server_default=func.now())
    returned_at = Column(DateTime(timezone=True), nullable=True)
    returned = Column(Boolean, default=False)
    notes = Column(String, nullable=True)
