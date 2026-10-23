import { useState } from "react";
import "../styles/SearchFilter.css";

// Danh sách gốc: mỗi liên hệ là một object, có id riêng để dùng làm key
const contacts = [
  { id: 1, firstName: "Gus", lastName: "Surridge", email: "gus.surridge@email.com", phone: "214-423-6485" },
  { id: 2, firstName: "Bertine", lastName: "Tibbles", email: "bertine.tibbles@email.com", phone: "214-423-6486" },
  { id: 3, firstName: "Thacher", lastName: "Adkins", email: "thacher.adkins@email.com", phone: "214-423-6487" },
  { id: 4, firstName: "Francisco", lastName: "Greatreax", email: "francisco.g@email.com", phone: "214-423-6488" },
  { id: 5, firstName: "Maye", lastName: "Probbing", email: "maye.probbing@email.com", phone: "214-423-6489" },
  { id: 6, firstName: "Orbadiah", lastName: "Leban", email: "orbadiah.leban@email.com", phone: "214-423-6490" },
  { id: 7, firstName: "Ervin", lastName: "Durie", email: "ervin.durie@email.com", phone: "214-423-6491" },
  { id: 8, firstName: "Deb", lastName: "Bunting", email: "deb.bunting@email.com", phone: "214-423-6492" },
];

export default function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState(""); // chữ người dùng gõ

  const term = searchTerm.trim().toLowerCase();

  // Lọc: liên hệ nào có BẤT KỲ cột nào chứa chữ đang gõ thì giữ lại
  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.phone}`
      .toLowerCase()
      .includes(term)
  );

  return (
    <div className="contact-keeper">
      <h1>Contact </h1>

      <input
        type="text"
        className="search-input"
        placeholder="Search contacts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="contact-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
            </tr>
          ))}

          {filteredContacts.length === 0 && (
            <tr>
              <td colSpan={4} className="no-results">
                No contacts found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}