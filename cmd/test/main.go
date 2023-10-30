package main

import (
	"fmt"
	"log"
	"net/http"

	console "github.com/aserto-dev/go-topaz-ui"
)

func main() {
	fmt.Println("Embedded console dir contents:")
	list, err := console.FS.ReadDir("console")
	if err != nil {
		log.Fatal(err)
	}
	for _, file := range list {
		fmt.Println("-", file.Name())
	}
	fmt.Println(">>> serving console on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", http.FileServer(http.FS(console.FS))))
}
