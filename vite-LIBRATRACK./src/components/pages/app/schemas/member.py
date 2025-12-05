from pydantic import BaseModel

class MemberBase(BaseModel):
    name: str
    email: str

class MemberCreate(MemberBase):
    pass

class MemberOut(MemberBase):
    id: int

    class Config:
        orm_mode = True
