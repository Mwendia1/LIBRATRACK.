from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.members import Member
from schemas.members import MemberCreate, MemberOut

router = APIRouter(prefix="/members", tags=["Members"])

@router.post("/", response_model=MemberOut)
def add_member(member: MemberCreate, db: Session = Depends(get_db)):
    new_member = Member(name=member.name, email=member.email)
    db.add(new_member)
    db.commit()
    db.refresh(new_member)
    return new_member

@router.get("/", response_model=list[MemberOut])
def list_members(db: Session = Depends(get_db)):
    return db.query(Member).all()
