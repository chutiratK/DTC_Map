# DTC_Map

## Features
- **Add Locations**: เพิ่มสถานที่ใหม่พร้อมรายละเอียด ชื่อ, จังหวัด, เขต, รหัสไปรษณีย์, คำอธิบายเพิ่มเติม, ละติจูด และลองจิจูด
- **View Locations List**: ดูรายการสถานที่ทั้งหมด
- **Search Locations**: ค้นหาสถานที่ด้วยชื่อ, จังหวัด, เขตหรือรหัสไปรษณีย์
- **Display Map**: แสดงแผนที่พร้อมเครื่องหมายตามตำแหน่ง
- **Route**: แสดงเส้นทางจากตำแหน่งปัจจุบันของผู้ใช้ไปยังสถานที่ที่เลือก
- **Delete Locations**: ลบสถานที่ที่ต้องการ

## Installation

### Backend Setup
1. Clone the repository:
    ```sh
    git clone https://github.com/chutiratK/DTC_Map.git
    cd DTC_Map/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up MongoDB:
    - Ensure you have a MongoDB running.
        ```js
        mongoose.connect("your-mongodb-connection-string")
        ```

4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the frontend server:
    ```sh
    npm start
    ```

## Usage
1. ใช้แถบค้นหาเพื่อค้นหาสถานที่ตามชื่อ จังหวัด เขต หรือรหัสไปรษณีย์
2. คลิกที่สถานที่จากรายการเพื่อดูรายละเอียดเส้นทางจากตำแหน่งปัจจุบันของผู้ใช้ไปสถานที่ที่เลือกบนแผนที่
3. เพิ่มสถานที่ใหม่โดยการคลิกที่ "Add Location" และกรอกแบบฟอร์ม
4. ลบสถานที่โดยการคลิกที่ไอคอนลบในรายการ
