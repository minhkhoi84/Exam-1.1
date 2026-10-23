Đồng hồ bấm giờ cần 3 thứ:

Cần gì                                    |	Dùng gì  |	Vì sao
Số giây hiển thị trên màn hình            |	useState |	Số này đổi thì giao diện phải vẽ lại (re-render)
Lưu id của bộ đếm giờ (setInterval)       |	useRef   |	Cần nhớ id để dừng sau này, nhưng đổi id thì không cần vẽ lại giao diện
Dọn dẹp khi component bị gỡ khỏi màn hình |	useEffect |  Tránh timer chạy ngầm mãi mãi (memory leak)
                                           (hàm cleanup)	