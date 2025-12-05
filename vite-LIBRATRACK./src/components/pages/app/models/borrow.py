from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Borrow(Base):
    __tablename__ = "borrows"

    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)
    member_id = Column(Integer, ForeignKey("members.id"), nullable=False)
    borrowed_at = Column(DateTime, default=datetime.utcnow)

    book = relationship("Book")
    member = relationship("Member")

    def __repr__(self):
        return f"<Borrow(book_id={self.book_id}, member_id={self.member_id}, borrowed_at={self.borrowed_at})>"
