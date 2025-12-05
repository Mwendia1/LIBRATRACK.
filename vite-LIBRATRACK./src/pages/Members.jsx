import { useEffect, useState } from "react";

export default function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/members")
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>👥 Members</h2>

      <ul>
        {members.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
}
