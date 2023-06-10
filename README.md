# **Peter AI - Cloud Computing**

## 1. Install Module

```bash
npm install express nodemon firebase firebase-admin cookie-parser body-parser jade path dotenv
```

## 2. Run app

```bash
node app.js
```

===

## Documentation

### A. USER

#### 1. Register User

- URL : /register
- Method : POST
- Request Body
  - username as String
  - email as string, must be unique
  - password as string
  - confirmPass, harus sama dengan req.body.password
- Response:
  - 200 : "Akun Berhasil dibuat"
    ```
    {
        "error": false,
        "message": "User Created",
        "data": {
            "username": username
        }
    }
    ```
  - 400 : "Password tidak sama"
  - 409 : "Email sudah digunakan"
  - 500 : "Terjadi kesalahan saat menbuat akun"
- Output
  - hashPassword
- Tambahan: Menggunakan bcrypt untuk membuat enkripsi

#### 2. Login User

- URL : /login
- Method : POST
- Request Body
  - email as string, must be unique
  - password as string
- Response:
  - 200 : "Berhasil login"
    ```
    {
        "error": false,
        "message": "Login Berhasil",
        "data": {
            "username": username
        }
    }
    ```
  - 401 : "Password yang digunakan salah"
  - 404 : "Akun belum terdaftar"
  - 500 : "Terjadi kesalahan saat masuk akun"
- Output
  - refreshToken disimpan di firestore. expired: 1d
  - accessToken disinpan di cache. expired: 30s
- Tambahan: Menggunakan bcrypt untuk deskripsi hash password

#### 3. Lihat Profile

- URL : /user/profile
- Method : GET
- Request Body
  - email as string, must be unique
  - password as string
- Response:
  - 200 : "Berhasil login"
    ```
    {
        "error": false,
        "message": "Lihat Profile Berhasil",
        "data": {
            "id": doc.id
            "email": email
            "username": username
            "bio": bio
            "gender": gender
            "birthDate": birthDate
        }
    }
    ```
  - 404 : "Akun tidak ada"
  - 500 : "Terjadi kesalahan saat lihat profile"
- Tambahan: Authentication menggunakan accessToken

#### 4. Update Profile

- URL : /user/update-profile
- Method : PUT
- Request Body
  - email as String, untuk verifikasi
  - newUsename as string
  - newBio as string
  - newGender as String
  - newBirtDate as String
- Response:
  - 200 : "Berhasil Update Profile"
    ```
    {
        "error": false,
        "message": "Profil berhasil diperbaharui",
        "data": {
            "id": doc.id
            "email": email
            "username": username
            "bio": bio
            "gender": gender
            "birthDate": birthDate
        }
    }
    ```
    - 201 : "Tidak ada perubahan pada profile"
    ```
    {
        "error": false,
        "message": "Profil tidak berubah",
        "data": {
            "id": doc.id
            "email": email
            "username": username
            "bio": bio
            "gender": gender
            "birthDate": birthDate
        }
    }
  - 404 : "Akun tidak ada"
  - 500 : "Terjadi kesalahan saat memperbaharui profile"
- Tambahan: Authentication menggunakan accessToken

#### 5. Change Email (Unavailable)

#### 6. Change Password (Unavailable)

#### 6. Logout User (Unavailable)

#### 6. Delete User (Unavailable)

### B. PRODUCT

#### 1. Add Product

- URL : /add-sayur
- Method : POST
- Request Body
  - idSayur as String
  - judul as String
  - harga as number
  - ukuran as number
  - satuan as String
  - discount as number
  - kategori as String, must be (Bean, Bitter Gourd, Bottle Gourd, Eggplant, Broccoli, Cabbage, Bell Pepper, Carrot, Cauliflower, Cucumber, Papaya, Potato, Pumpkin, Radish, Tomato)
  - deskripsi as String
  - stok as number
- Response:
  - 200 : "Berhasil menambah data Sayur"
    ```
    {
        "error": false,
        "message": "Sayur ditambahkan",
        "data": {
            "idSayur": idSayur,
            "judul": judul,
            "harga": harga,
            "ukuran": ukuran,
            "satuan": satuan,
            "discount": discount,
            "kategori": kategori,
            "deskripsi": deskripsi,
            "stok": stok,
            "hargaDiscount": hargaDiscount
        }
    }
    ```
  - 400 : "Kategori tidak termasuk kategori yang valid" 
  - 409 : "Sayur sudah ada"
  - 500 : "Terjadi kesalahan saat menambah data Sayur"

#### 2. Lihat Product

- URL : /api/sayur/:idSayur
- Method : GET
- URL Params
  - idSayur (string, required) - ID sayur yang akan ditampilkan.
- Contoh Request
  ```
  GET /api/sayur/TR-000001
  ```
- Response:
  - 200 OK
    ```
    {
        "error": false,
        "message": "Berhasil melihat data Sayur",
        "data": {
            "idSayur": "TR-000001",
            "judul": "Terong,
            "harga": 5000,
            "discount": 10,
            "hargaDiscount": harga * 10%
            "ukuran": ukuran,
            "satuan": satuan,
            "kategori": kategori,
            "deskripsi": deskripsi,
            "stok": stok
        }
    }
    ```
  - 404 : "Sayur tidak ada" 
  - 500 : "Terjadi kesalahan saat menambah data Sayur"

#### 3. Update Product (Unavailable)

#### 4. Delete Product (Unavailable)

### C. ADD to CART
Menambahkan item ke keranjang belanja.

- URL: /api/cart/add
- Method: POST
- Request Body
  - idSayur (string, required) - ID produk yang akan ditambahkan ke keranjang.
  - banyak (number, required) - Jumlah produk yang akan ditambahkan ke keranjang.
- Contoh Request
```
  {
    "idSayur": "TR-000001",
    "quantity": 2
  }
```
- Response
  - 200 OK
    ```
    {
      "error": false,
      "message": "Produk berhasil ditambahkan ke keranjang",
      "data": {
            "idSayur": idSayur,
            "banyak": banyak
        }
    }
    ```
  - 400 Bad Request
    ```
    {
      "error": "Permintaan tidak valid. Pastikan Anda memberikan ID produk dan jumlah yang valid."
    }
    ```
  - 404 Not Found
    ```
    {
      "error": "Produk tidak ditemukan."
    }
    ```
  - 500 Internal Server Error
    ```
    {
      "error": "Terjadi kesalahan saat menambahkan produk ke keranjang."
    }
    ```


===========================================================================

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
        "message": "User Created",
        "data": {
            "username": "username"
        }
    }
    ```
  - 400 Bad Request
    - "Password does not match"
  - 409 Conflict
    - "Email already used"
  - 500 Internal Server Error
    - "Error occurred while creating user"
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
        "message": "Login Successful",
        "data": {
            "username": "username"
        }
    }
    ```
  - 401 Unauthorized
    - "Incorrect password"
  - 404 Not Found
    - "Account not registered"
  - 500 Internal Server Error
    - "Error occurred while logging in"
- Output:
  - refreshToken stored in Firestore. Expires in 1 day.
  - accessToken stored in cache. Expires in 30 seconds.
- Additional Information: Use bcrypt for password hashing.

### 3. View Profile
U- RL: /user/profile
- Method: GET
- Request Body:
  -  email (string)
  - password (string)
- Response:
  - 200 OK
    ```
    {
        "error": false,
        "message": "Profile Viewed Successfully",
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
    - "Account not found"
  - 500 Internal Server Error
    - "Error occurred while viewing profile"
- Additional Information: Authentication using accessToken.

### 4. Update Profile
- URL: /user/update-profile
- Method: PUT
- Request Body:
  - email (string) - For verification
  - newUsername (string)
  - newBio (string)
  - newGender (string)
  - newBirthDate (string)
- Response:
  - 200 OK
    ```
    {
        "error": false,
        "message": "Profile Successfully Updated",
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
        "message": "Profile not changed",
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
    - "Account not found"
  - 500 Internal Server Error
    - "Error occurred while updating profile"
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
  - kategori (string, must be one of: Bean, Bitter Gourd, Bottle Gourd, Eggplant, Broccoli, Cabbage, Bell Pepper, Carrot, Cauliflower, Cucumber, Papaya, Potato, Pumpkin, Radish, Tomato)
  - deskripsi (string)
  - stok (number)
- Response:
  - 200 OK
    ```
    {
        "error": false,
        "message": "Sayur Added",
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
    - "Category is not a valid category"
  - 409 Conflict
    - "Product already exists"
  - 500 Internal Server Error
    - "Error occurred while adding product"

### 2. View Product
- URL: /api/sayur/:idSayur
- Method: GET
- URL Params:
  - idSayur (string, required) - The ID of the product to be displayed.
- Example Request:
    ```
    GET /api/sayur/TR-000001
    ```
- Response:
  - 200 OK
    ```
    {
        "error": false,
        "message": "Successfully viewed Sayur data",
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
    - "Product not found"
  - 500 Internal Server Error
    - "Error occurred while adding product"

### 3. Update Product (Unavailable)
### 4. Delete Product (Unavailable)

## C. ADD to CART
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
  GET /api/sayur/search?query=broccoli
  ```
- Response:
  - 200 OK
    ```
    {
        "error": false,
        "message": "Search results for 'broccoli'",
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
  - "Invalid search query"
- 404 Not Found
  - "No matching sayur found"
- 500 Internal Server Error
  -"Error occurred while searching sayur"
