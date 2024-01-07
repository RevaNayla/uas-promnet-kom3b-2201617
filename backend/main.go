package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

// Book struct represents the book entity in the database
type Book struct {
	ID             string `json:"id"`
	Judul          string `json:"judul"`
	Jumlah         int    `json:"jumlah"`
	NamaPeminjam   string `json:"nama_peminjam"`
	AlamatPeminjam string `json:"alamat_peminjam"`
	NoHpPeminjam   string `json:"no_hp_peminjam"`
	TanggalPinjam  string `json:"tanggal_pinjam"`
	TanggalKembali string `json:"tanggal_kembali"`
	LamaPeminjaman string `json:"lama_peminjaman"`
}

func main() {
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/books", GetBooks).Methods("GET")
	router.HandleFunc("/books", CreateBook).Methods("POST")
	router.HandleFunc("/books/{id}", GetBookByID).Methods("GET")
	router.HandleFunc("/books/{id}", UpdateBook).Methods("PUT")
	router.HandleFunc("/books/{id}", DeleteBook).Methods("DELETE")
	http.ListenAndServe(":9080", &CORSRouterDecorator{R: router})
}

/***************************************************/

// Get all books
func GetBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var books []Book

	result, err := db.Query("SELECT id, judul, jumlah, nama_peminjam, alamat_peminjam, no_hp_peminjam, tanggal_pinjam, tanggal_kembali, lama_peminjaman FROM peminjamanbuku_revanaylan")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var book Book
		err := result.Scan(&book.ID, &book.Judul, &book.Jumlah, &book.NamaPeminjam, &book.AlamatPeminjam, &book.NoHpPeminjam, &book.TanggalPinjam, &book.TanggalKembali, &book.LamaPeminjaman)
		if err != nil {
			panic(err.Error())
		}
		books = append(books, book)
	}
	json.NewEncoder(w).Encode(books)
}

// Create book
func CreateBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO peminjamanbuku_revanaylan(judul, jumlah, nama_peminjam, alamat_peminjam, no_hp_peminjam, tanggal_pinjam, tanggal_kembali, lama_peminjaman) VALUES(?,?,?,?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	var book Book
	json.Unmarshal(body, &book)
	_, err = stmt.Exec(book.Judul, book.Jumlah, book.NamaPeminjam, book.AlamatPeminjam, book.NoHpPeminjam, book.TanggalPinjam, book.TanggalKembali, book.LamaPeminjaman)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "New book was added")
}

// Get book by ID
func GetBookByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT id, judul, jumlah, nama_peminjam, alamat_peminjam, no_hp_peminjam, tanggal_pinjam, tanggal_kembali, lama_peminjaman FROM peminjamanbuku_revanaylan WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var book Book
	for result.Next() {
		err := result.Scan(&book.ID, &book.Judul, &book.Jumlah, &book.NamaPeminjam, &book.AlamatPeminjam, &book.NoHpPeminjam, &book.TanggalPinjam, &book.TanggalKembali, &book.LamaPeminjaman)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(book)
}

// Update book
func UpdateBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE peminjamanbuku_revanaylan SET judul=?, jumlah=?, nama_peminjam=?, alamat_peminjam=?, no_hp_peminjam=?, tanggal_pinjam=?, tanggal_kembali=?, lama_peminjaman=? WHERE id=?")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	var book Book
	json.Unmarshal(body, &book)

	// Handle empty input for jumlah
	if book.Jumlah == 0 {
		book.Jumlah = 0
	}

	_, err = stmt.Exec(book.Judul, book.Jumlah, book.NamaPeminjam, book.AlamatPeminjam, book.NoHpPeminjam, book.TanggalPinjam, book.TanggalKembali, book.LamaPeminjaman, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Book with ID=%s was updated", params["id"])
}

// Delete book
func DeleteBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM peminjamanbuku_revanaylan WHERE id=?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Book with ID=%s was deleted", params["id"])
}

var db *sql.DB
var err error

// InitDB initializes the database connection
func InitDB() {
	db, err = sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/db_2201617_revanaylan_uas_pilkomb")
	if err != nil {
		panic(err.Error())
	}

	err = db.Ping()
	if err != nil {
		panic(err.Error())
	}
}

/***************************************************/

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type, YourOwnHeader")
	}
	// Stop here if its Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
