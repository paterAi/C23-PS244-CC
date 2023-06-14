# **Peter AI - Cloud Computing**

## 1. Install Module

```bash
npm install express nodemon firebase firebase-admin cookie-parser body-parser jade path dotenv bcrypt cors debug http-errors jsonwebtoken logger morgan multer path regex
```

## 2. Run app

```bash
node app.js

## for testing mode: $ npm test
```

===
# Documentation API

## A. USER
### 1. Register User
- URL: /register
- Method: POST
- Request Body:
  - username (string)
  - email (string, must be unique)
  - password (string)
  - confirmPass (string, must be the same as req.body.password)
- Response:
  - 200 OK
    ```
    {
        "error": false,
        "message": "Akun berhasil dibuat",
        "data": {
            "username": "username"
        }
    }
    ```
  - 400 Bad Request
    - "Password tidak sama"
  - 409 Conflict
    - "Email sudah digunakan"
  - 500 Internal Server Error
    - "Terjadi kesalahan saat membuat akun"
- Output:
  - hashPassword
- Additional Information: Use bcrypt for password encryption.

### 2. Login User
- URL: /login
- Method: POST
- Request Body:
  - email (string)
  - password (string)
- Response:
  - 200 OK
    ```
    {
        "error": false,
        "message": "Login Berhasil",
        "data": {
            "username": "username"
        }
    }
    ```
  - 401 Unauthorized
    - "Password salah
  - 404 Not Found
    - "Akun belum terdaftar"
  - 500 Internal Server Error
    - "Ada kesalahan saat login"
- Output:
  - refreshToken stored in Firestore. Expires in 1 day.
  - accessToken stored in cache. Expires in 60 seconds.
- Additional Information: Use bcrypt for password hashing.

### 3. View Profile
- URL: /user/profile
- Method: GET
- Headers
  - Authorization: Bearer <token>
- Response:
  - 200 OK
    ```
    {
        "error": false,
        "message": "Profile berhasil dilihat",
        "data": {
            "id": "doc.id",
            "email": "email",
            "username": "username",
            "bio": "bio",
            "gender": "gender",
            "birthDate": "birthDate"
        }
    }
    ```
  - 404 Not Found
    - "Akun tidak ada"
  - 500 Internal Server Error
    - "Ada yang salah saat melihat profile"
- Additional Information: Authentication using accessToken.

### 4. Update Profile
- URL: /user/update-profile
- Method: PUT
- Headers:
  - Authorization: Bearer <token>
- Request Body:
  - newUsername (string)
  - newBio (string)
  - newGender (string)
  - newBirthDate (string)
- Response:
  - 200 OK
    ```
    {
        "error": false,
        "message": "Profile berhasil diubah",
        "data": {
            "id": "doc.id",
            "email": "email",
            "username": "username",
            "bio": "bio",
            "gender": "gender",
            "birthDate": "birthDate"
        }
    }
    ```
  - 201 Created
    ```
    {
        "error": false,
        "message": "Profile tidak berubah'",
        "data": {
            "id": "doc.id",
            "email": "email",
            "username": "username",
            "bio": "bio",
            "gender": "gender",
            "birthDate": "birthDate"
        }
    }
    ```
  - 404 Not Found
    - "Akun tidak ada"
  - 500 Internal Server Error
    - "Ada yang salah saat update profile"
- Additional Information: Authentication using accessToken.

### 5. Change Email (Unavailable)
### 6. Change Password (Unavailable)
### 7. Logout User (Unavailable)
### 8. Delete User (Unavailable)

## B. PRODUCT
### 1. Add Product
- URL: /add-sayur
- Method: POST
- Request Body:
  - idSayur (string)
  - judul (string)
  - harga (number)
  - ukuran (number)
  - satuan (string)
  - discount (number)
  - kategori (string, must be Kacang, Pare, Labu Botol, Terong,Brokoli, Kubis, Paprika, Wortel, Kembang Kol,Timun, Pepaya,Kentang, Labu, Lobak, and Tomat)
  - deskripsi (string)
  - stok (number)
- Response:
  - 200 OK
    ```
    {
        "error": false,
        "message": "Sayur Berhasil ditambahkan",
        "data": {
            "idSayur": "idSayur",
            "judul": "judul",
            "harga": "harga",
            "ukuran": "ukuran",
            "satuan": "satuan",
            "discount": "discount",
            "kategori": "kategori",
            "deskripsi": "deskripsi",
            "stok": "stok",
            "hargaDiscount": "hargaDiscount"
          }
      }
      ```
  - 400 Bad Request
    - "Kategori tidak valid"
  - 409 Conflict
    - "Sayur dengan ID tersebut sudah ada"
  - 500 Internal Server Error
    - "Ada yang salah saat menambah sayur"

### 2. View Product
- URL: /api/sayur/:idSayur
- Method: GET
- URL Params:
  - idSayur (string, required) - The ID of the product to be displayed.
- Example Request:
    ```
    GET /api/sayur?idSayur=TR-000001
    ```
- Response:
  - 200 OK
    ```
    {
        "error": false,
        "message": "Berhasil melihat data sayur",
        "data": {
            "idSayur": "TR-000001",
            "judul": "Terong",
            "harga": 5000,
            "discount": 10,
            "hargaDiscount": "harga * 10%",
            "ukuran": "ukuran",
            "satuan": "satuan",
            "kategori": "kategori",
            "deskripsi": "deskripsi",
            "stok": "stok"
        }
    }
    ```
  - 404 Not Found
    - "Sayur tidak ditemukan"
  - 500 Internal Server Error
    - "Ada yang salah saat melihat data sayur"

### 3. Update Product (Unavailable)
### 4. Delete Product (Unavailable)

## C. ADD to CART (Unavailable)
Add an item to the shopping cart.

- URL: /api/cart/add
- Method: POST
- Request Body:
  - idSayur (string, required) - The ID of the product to be added to the cart.
  - quantity (number, required) - The quantity of the product to be added to the cart.
- Example Request:
  ```
  {
    "idSayur": "TR-000001",
    "quantity": 2
  }
  ```
- Response:
  - 200 OK
    ```
    {
      "error": false,
      "message": "Product added to cart successfully",
      "data": {
            "idSayur": "idSayur",
            "quantity": "quantity"
        }
    }
    ```
  - 400 Bad Request
    ```
    {
      "error": "Invalid request. Make sure you provide a valid product ID and quantity."
    }
    ```
  - 404 Not Found
    ```
    {
      "error": "Product not found."
    }
    ```
  - 500 Internal Server Error
    ```
    {
      "error": "An error occurred while adding the product to the cart."
    }
    ```
## D. Search

- URL: /api/sayur/search
- Method: GET
- Query Parameters:
  - query (string, required) - The search query to find matching sayur.
- Example Request:
  ```
  GET /api/sayur/search?query=brokoli
  ```
- Response:
  - 200 OK
    ```
    {
        "error": false,
        "message": "Hasil pencarian 'brokoli'",
        "data": [
            {
                "idSayur": "TR-000002",
                "judul": "Broccoli",
                "harga": 8000,
                "discount": 0,
                "hargaDiscount": 8000,
                "ukuran": "Medium",
                "satuan": "Biji",
                "kategori": "Broccoli",
                "deskripsi": "Fresh and nutritious broccoli.",
                "stok": 10
            },
            {
                "idSayur": "TR-000006",
                "judul": "Broccoli Seeds",
                "harga": 2000,
                "discount": 0,
                "hargaDiscount": 2000,
                "ukuran": "Small",
                "satuan": "Biji",
                "kategori": "Broccoli",
                "deskripsi": "Seeds for growing broccoli at home.",
                "stok": 50
            }
        ]
    }
    ```
- 400 Bad Request
  - "Katakunci salah"
- 404 Not Found
  - "Hasil pencarian tidak ditemukan"
- 500 Internal Server Error
  -"Ada yang salah saat mencari sayur"

{
  chart {
    list_product {
      id pesanan: 0 {
        count: 1,
        id: diambil dari id sayur pada collection vegetables,
        name: diambil dari name sayur pada collection vegetables
        photo_url: diambil dari photo_url sayur pada collection vegetables
        price: diambil dari price sayur pada collection vegetables
        total_price: dcoun * price
        weight: diambil dari weight sayur pada collection vegetables
      }
      id pesanan: 1 {
        count: 1,
        id: diambil dari id sayur pada collection vegetables,
        name: diambil dari name sayur pada collection vegetables
        photo_url: diambil dari photo_url sayur pada collection vegetables
        price: diambil dari price sayur pada collection vegetables
        total_price: dcoun * price
        weight: diambil dari weight sayur pada collection vegetables
      }
      total_price: total harga dari seluruh id pesanan
    }
    uid: diambil dari doc.uid user
  }
}

{
  id: id sayur diambil dari id document
  name: nama sayur
  photo_url: link dari storage untuk gambar sayur
  price: harga sayur
  weight: berat sayur
}