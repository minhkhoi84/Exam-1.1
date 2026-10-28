import { useState } from "react";
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography,
} from "@mui/material";

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
    <Box sx={{ maxWidth: 700, width: "100%", p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>Contact</Typography>

      <TextField
        fullWidth
        size="small"
        label="Search contacts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2, bgcolor: "background.paper" }}
      />

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id} hover sx={{ "&:nth-of-type(odd)": { bgcolor: "action.hover" } }}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
              </TableRow>
            ))}

            {filteredContacts.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ color: "text.secondary" }}>
                  No contacts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
