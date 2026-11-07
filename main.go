package main

import (
	"log"
	"planbee/internal/web"
)

func main() {
	if err := web.ServeWeb(":8086"); err != nil {
		log.Fatal(err)
	}
}
