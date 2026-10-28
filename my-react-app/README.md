# Bài tập React Hooks: Stopwatch & Search Filter

Dự án gồm 2 bài tập nhỏ để luyện các hook cơ bản của React:

1. **Stopwatch**: đồng hồ bấm giờ có Start / Stop / Reset.
2. **SearchFilter**: bảng danh bạ, gõ chữ vào ô tìm kiếm để lọc.

## Chạy dự án

```bash
npm install     # cài thư viện (chỉ cần lần đầu)
npm run dev     # chạy, rồi mở http://localhost:5173
```

Muốn xem bài nào thì bật/tắt component tương ứng trong `src/App.jsx`:

```jsx
<Stopwatch />
{/* <SearchFilter /> */}
```

## Cấu trúc thư mục

```
src/
  main.jsx            ← điểm khởi động: gắn <App /> vào trang, import index.css
  App.jsx             ← component gốc, chứa các bài tập
  index.css           ← CSS chung cho cả app (body, #root, box-sizing)
  components/         ← các component (logic + giao diện)
    Stopwatch.jsx
    SearchFilter.jsx
```

**Giao diện dùng [MUI](https://mui.com/material-ui/)** (`@mui/material`): `Button`, `TextField`, `Table`… Style viết qua prop `sx` ngay trong component, nên không cần file CSS riêng.

---

## Kiến thức nền: 3 hook dùng trong bài

| Hook        | Dùng để                                   | Khi giá trị thay đổi thì…        |
| ----------- | ----------------------------------------- | -------------------------------- |
| `useState`  | Lưu dữ liệu **hiển thị** lên màn hình     | React **vẽ lại** (re-render)     |
| `useRef`    | Lưu dữ liệu cần **nhớ** nhưng không hiển thị | **Không** vẽ lại                |
| `useEffect` | Chạy code "bên lề" (timer, gọi API…) và dọn dẹp | Chạy sau khi render         |

### useState

```jsx
const [counter, setCounter] = useState(0);
```

- `counter`: giá trị hiện tại. `setCounter`: hàm để đổi giá trị. `0`: giá trị ban đầu.
- **Không được** gán trực tiếp `counter = 5`. Phải gọi `setCounter(5)` thì React mới biết để vẽ lại.
- Mỗi lần render, component chạy lại **từ đầu đến cuối**. Biến thường (`let x = ...`) sẽ bị tạo lại, chỉ state và ref là được giữ lại.

### useRef

```jsx
const timerIdRef = useRef(null);
timerIdRef.current = 123;   // đọc/ghi qua .current
```

- Giống một "cái hộp" giữ giá trị qua các lần render.
- Đổi `.current` **không** làm giao diện vẽ lại. Hợp để lưu những thứ như id của timer.

### useEffect

```jsx
useEffect(() => {
  // code chạy sau khi render
  return () => {
    // hàm cleanup: chạy khi component bị gỡ, hoặc trước lần effect chạy lại
  };
}, [/* dependencies */]);
```

Mảng thứ hai (dependencies) quyết định khi nào effect chạy:

| Viết           | Effect chạy khi…                         |
| -------------- | ---------------------------------------- |
| `[]`           | Chỉ 1 lần sau lần render đầu tiên        |
| `[isRunning]`  | Lần đầu + mỗi khi `isRunning` thay đổi   |
| (bỏ trống)     | Sau **mọi** lần render (ít khi dùng)     |

---

## Bài 1: Stopwatch

File: `src/components/Stopwatch.jsx`

### Cần gì, dùng gì

| Cần gì                                    | Dùng gì                 | Vì sao                                                       |
| ----------------------------------------- | ----------------------- | ------------------------------------------------------------ |
| Số giây hiển thị trên màn hình            | `useState`              | Số này đổi thì giao diện phải vẽ lại                         |
| Lưu id của bộ đếm giờ (`setInterval`)     | `useRef`                | Cần nhớ id để dừng sau này, nhưng đổi id thì không cần vẽ lại |
| Dọn dẹp khi component bị gỡ khỏi màn hình | `useEffect` (cleanup)   | Tránh timer chạy ngầm mãi mãi (memory leak)                  |

### setInterval / clearInterval

```js
const id = setInterval(() => { /* ... */ }, 1000); // cứ 1000ms chạy 1 lần
clearInterval(id);                                  // dừng lại
```

`setInterval` trả về một **id**. Muốn dừng thì phải có đúng id đó, nên ta cất nó vào `timerIdRef.current`. Nếu quên lưu id thì không bao giờ dừng được timer.

### Từng nút làm gì

**Start**

```js
if (timerIdRef.current !== null) return;   // đang chạy rồi thì thôi
timerIdRef.current = setInterval(() => {
  setCounter((prev) => prev + 1);
}, 1000);
```

- Dòng `if` chặn việc bấm Start nhiều lần, nếu không mỗi lần bấm sẽ tạo thêm một timer, đồng hồ chạy nhanh gấp đôi, gấp ba.
- Dùng `setCounter((prev) => prev + 1)` thay vì `setCounter(counter + 1)`. Hàm trong `setInterval` được tạo **một lần** nên nó chỉ "thấy" giá trị `counter` lúc tạo (luôn là 0), gọi là **stale closure**. Viết dạng hàm `prev => prev + 1` thì React luôn đưa vào giá trị mới nhất.

**Stop**

```js
clearInterval(timerIdRef.current);
timerIdRef.current = null;   // đánh dấu "đang dừng" để lần sau Start được
```

**Reset**: gọi `stopHandler()` rồi `setCounter(0)`.

**Cleanup**

```js
useEffect(() => {
  return () => clearInterval(timerIdRef.current);
}, []);
```

Nếu component bị gỡ khỏi màn hình (chuyển trang, ẩn đi) mà timer vẫn chạy, nó sẽ gọi `setCounter` lên một component không còn tồn tại, gây rò rỉ bộ nhớ.

### Định dạng giờ:phút:giây

```js
const hours   = String(Math.floor(counter / 3600)).padStart(2, "0");
const minutes = String(Math.floor((counter % 3600) / 60)).padStart(2, "0");
const seconds = String(counter % 60).padStart(2, "0");
```

- `Math.floor(a / b)`: phép chia lấy phần nguyên. `a % b`: phép chia lấy dư.
- 1 giờ = 3600 giây, 1 phút = 60 giây. Ví dụ `counter = 3725`:
  - giờ = 3725 / 3600 = **1**
  - phút = (3725 % 3600) / 60 = 125 / 60 = **2**
  - giây = 3725 % 60 = **5**
- `padStart(2, "0")` thêm số 0 phía trước cho đủ 2 chữ số: `"5"` → `"05"`. Kết quả: `01:02:05`.

Các dòng này đặt ngay trên `return` vì chúng **tính ra từ state**, mỗi lần render tính lại là xong, không cần state riêng.

---

## Bài 2: SearchFilter

File: `src/components/SearchFilter.jsx`

### Controlled input (ô nhập được React điều khiển)

```jsx
const [searchTerm, setSearchTerm] = useState("");

<input
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

Vòng lặp: người dùng gõ → `onChange` → `setSearchTerm` → React vẽ lại → ô input hiện giá trị mới. State là "nguồn sự thật" duy nhất cho nội dung ô nhập.

### Lọc danh sách: tính ra, không lưu vào state

```js
const term = searchTerm.trim().toLowerCase();

const filteredContacts = contacts.filter((contact) =>
  `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.phone}`
    .toLowerCase()
    .includes(term)
);
```

- `trim()`: bỏ khoảng trắng thừa ở hai đầu. `toLowerCase()`: đổi về chữ thường để tìm **không phân biệt hoa thường**.
- Ghép tất cả các cột thành một chuỗi rồi dùng `includes(term)` để kiểm tra có chứa chữ đang gõ không.
- `filter` trả về **mảng mới** gồm các phần tử thỏa điều kiện, mảng gốc `contacts` không bị đổi.
- Khi ô tìm kiếm trống, `term = ""` và chuỗi nào cũng "chứa" chuỗi rỗng, nên hiện toàn bộ danh sách.

**Vì sao không dùng `useState` cho `filteredContacts`?** Vì nó tính được hoàn toàn từ `contacts` và `searchTerm`. Lưu thêm vào state sẽ phải tự đồng bộ hai thứ, dễ sinh lỗi. Nguyên tắc: **cái gì tính ra được thì đừng lưu vào state** (gọi là *derived state*).

### Hiển thị danh sách bằng map + key

```jsx
{filteredContacts.map((contact) => (
  <tr key={contact.id}> ... </tr>
))}
```

- `map` biến mỗi object thành một dòng `<tr>`.
- `key` giúp React nhận ra dòng nào là dòng nào khi danh sách thay đổi. Key phải **duy nhất** và **ổn định**, nên dùng `id`; tránh dùng index của mảng khi danh sách có thể bị lọc hoặc sắp xếp.

### Hiển thị có điều kiện bằng &&

```jsx
{filteredContacts.length === 0 && (
  <tr><td colSpan={4}>No contacts found</td></tr>
)}
```

`điều_kiện && <JSX>`: nếu điều kiện đúng thì hiện JSX, sai thì không hiện gì. `colSpan={4}` cho ô này trải dài cả 4 cột.

---

## Tóm tắt

- Dữ liệu **hiển thị** → `useState`. Dữ liệu cần **nhớ nhưng không hiển thị** → `useRef`.
- Timer, gọi API… phải **dọn dẹp** trong cleanup của `useEffect`.
- Cập nhật state dựa trên giá trị cũ → dùng dạng hàm `setX(prev => ...)`.
- Giá trị **tính ra được** từ state (giờ:phút:giây, danh sách đã lọc) → tính thẳng khi render, không tạo state mới.
- Render danh sách → `map` + `key` duy nhất.
